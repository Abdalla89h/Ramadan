/* Ramadan Dashboard v2 — Google Maps + Prayer Times + minimal input.
   Put your Google Maps API key below.
*/
const GOOGLE_MAPS_API_KEY = "PUT_YOUR_KEY_HERE"; // <-- replace
const WORK_HOURS = 6.5; // Strict: no prayer-break additions
const LS_LOG = "ramadan_log_gmaps_v2";
const LS_TRAFFIC = "ramadan_hotspots_gmaps_v2";

const $ = (id)=>document.getElementById(id);
const pad2 = (n)=>String(n).padStart(2,'0');
let toastTimer=null;

function toast(t,b=""){
  $('toastT').textContent=t;
  $('toastB').textContent=b;
  $('toast').style.display='block';
  clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>$('toast').style.display='none', 2600);
}

function parseHM(hm){ const m=/^(\d{2}):(\d{2})$/.exec(hm||""); return m? (Number(m[1])*60+Number(m[2])):null; }
function hm(min){ min=Math.round(min); const base=((min%1440)+1440)%1440; return `${pad2(Math.floor(base/60))}:${pad2(base%60)}`; }
function dur(min){ min=Math.round(Math.max(0,min)); const h=Math.floor(min/60), m=min%60; return h===0?`${m} د`:`${h} س ${m} د`; }
function esc(s){ return String(s||'').replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

function ammanNow(){
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone:'Asia/Amman', year:'numeric', month:'2-digit', day:'2-digit',
    hour:'2-digit', minute:'2-digit', second:'2-digit', hour12:false }).formatToParts(new Date());
  const get=(t)=>parts.find(p=>p.type===t)?.value;
  return new Date(`${get('year')}-${get('month')}-${get('day')}T${get('hour')}:${get('minute')}:${get('second')}`);
}
function todayISO(){ const d=ammanNow(); return `${d.getFullYear()}-${pad2(d.getMonth()+1)}-${pad2(d.getDate())}`; }

function setApi(state, text){
  $('apiStatus').textContent = text;
  $('apiDot').className = 'dot ' + (state==='ok'?'ok':state==='bad'?'bad':'warn');
}

let PT=null, HIJRI=null;
function stripTime(s){ const m=String(s||'').match(/(\d{1,2}:\d{2})/); return m? m[1].padStart(5,'0'):""; }

async function fetchPT(){
  setApi('warn','تحديث…');
  try{
    const r = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=Amman&country=Jordan&method=4`, {cache:'no-store'});
    const j = await r.json();
    if(!j || j.code !== 200) throw new Error('bad');

    PT = {
      Fajr: stripTime(j.data.timings.Fajr),
      Sunrise: stripTime(j.data.timings.Sunrise),
      Dhuhr: stripTime(j.data.timings.Dhuhr),
      Asr: stripTime(j.data.timings.Asr),
      Maghrib: stripTime(j.data.timings.Maghrib),
      Isha: stripTime(j.data.timings.Isha),
    };
    HIJRI = j.data.date?.hijri || null;

    // Tiles
    $('ptFajr').textContent = PT.Fajr || '—';
    $('ptMag').textContent = PT.Maghrib || '—';
    $('ptIsha').textContent = PT.Isha || '—';
    $('fajrTime').textContent = PT.Fajr || '—';
    $('maghribTime').textContent = PT.Maghrib || '—';

    $('methodNote').textContent = "Prayer times source: AlAdhan API • City: Amman • Method: MWL";

    if(HIJRI){
      const day = Number(HIJRI.day);
      const mAr = HIJRI.month?.ar || HIJRI.month?.en || '';
      const wd = HIJRI.weekday?.ar || HIJRI.weekday?.en || '';
      const y = HIJRI.year;
      $('hijriLine').textContent = `${wd} • ${day} ${mAr} ${y}هـ`;

      if(Number(HIJRI.month?.number)===9){
        $('ramadanLine').textContent = `${day} رمضان`;
        $('ramDay').textContent = String(day);
        renderDaily(day);
      }else{
        $('ramadanLine').textContent = `ليس رمضان حالياً`;
        $('ramDay').textContent = '—';
        renderDaily(null);
      }
    }else{
      $('hijriLine').textContent = '—';
      $('ramadanLine').textContent = '—';
      $('ramDay').textContent = '—';
      renderDaily(null);
    }

    setApi('ok','جاهز');
    updateAll();
  }catch(e){
    console.error(e);
    setApi('bad','بدون إنترنت');
  }
}

function randomTip(){ $('tipBox').textContent = RAMADAN_TIPS[Math.floor(Math.random()*RAMADAN_TIPS.length)]; }
function historicalForDay(day){
  const h = RAMADAN_HISTORY.find(x=>x.day===day);
  if(h) return h;
  const pool = [
    {title:"رمضان والقرآن", text:"شهر رمضان مرتبط بإنزال القرآن؛ خصّص وقتاً ثابتاً ولو 10 دقائق.", tag:"رمضان"},
    {title:"ليلة القدر", text:"ليلة القدر في العشر الأواخر؛ اغتنمها بخطة بسيطة.", tag:"العشر الأواخر"},
    {title:"ثقافة الإطعام", text:"إطعام الطعام في رمضان من أعظم أبواب الأجر.", tag:"رمضان"},
  ];
  return pool[day % pool.length];
}

function renderDaily(day){
  if(!day){
    $('themeTitle').textContent = "معلومة اليوم";
    $('themeText').textContent = "—";
    $('ayahRef').textContent = "آية: —";
    $('hadithRef').textContent = "حديث: —";
    $('duaText').textContent = "—";
    $('actionTag').textContent = "عمل اليوم: —";
    const h = historicalForDay(1);
    $('histText').textContent = `${h.title}: ${h.text}`;
    $('histTag').textContent = h.tag;
    return;
  }
  const d = RAMADAN_DAILY[(day-1) % RAMADAN_DAILY.length];
  $('themeTitle').textContent = `يوم ${day}: ${d.theme}`;
  $('themeText').textContent = d.takeaway;
  $('ayahRef').textContent = `آية: ${d.ayah}`;
  $('hadithRef').textContent = `حديث: ${d.hadith}`;
  $('duaText').textContent = d.dua;
  $('actionTag').textContent = `عمل اليوم: ${d.action}`;

  const h = historicalForDay(day);
  $('histText').textContent = `${h.title}: ${h.text}`;
  $('histTag').textContent = h.tag;
}

function updateIftar(){
  if(!PT) return;
  const d = ammanNow();
  const nowMin = d.getHours()*60 + d.getMinutes();
  const sec = d.getSeconds();

  const mag = parseHM(PT.Maghrib);
  const fajr = parseHM(PT.Fajr);

  let dm = mag - nowMin;
  if(dm < 0) dm += 1440;

  const totalSec = dm*60 - sec;
  const sLeft = (totalSec % 60 + 60) % 60;
  const minLeft = Math.floor(totalSec/60);
  const hLeft = Math.floor(minLeft/60);
  const mLeft = minLeft % 60;

  $('tH').textContent = pad2(hLeft);
  $('tM').textContent = pad2(mLeft);
  $('tS').textContent = pad2(sLeft);
  $('iftarAt').textContent = `المغرب ${PT.Maghrib}`;

  if(fajr!=null && mag!=null){
    let start = fajr, end = mag, cur = nowMin;
    if(end <= start) end += 1440;
    if(cur < start) cur += 1440;
    const pct = Math.max(0, Math.min(1, (cur - start)/(end - start)));
    $('fastProg').textContent = `${Math.round(pct*100)}%`;
    $('fastProgS').textContent = `من ${PT.Fajr} إلى ${PT.Maghrib}`;
  }
}

function updateNextPrayer(){
  if(!PT) return;
  const d = ammanNow();
  const nowMin = d.getHours()*60 + d.getMinutes();
  const order = [
    ['الفجر', parseHM(PT.Fajr), PT.Fajr],
    ['الشروق', parseHM(PT.Sunrise), PT.Sunrise],
    ['الظهر', parseHM(PT.Dhuhr), PT.Dhuhr],
    ['العصر', parseHM(PT.Asr), PT.Asr],
    ['المغرب', parseHM(PT.Maghrib), PT.Maghrib],
    ['العشاء', parseHM(PT.Isha), PT.Isha],
  ].filter(x=>x[1]!=null);

  let next = order.find(x=>x[1] > nowMin);
  if(!next) next = [order[0][0], order[0][1]+1440, order[0][2]];

  const diff = next[1] - nowMin;
  $('nextPrayer').textContent = next[0];
  $('nextPrayerS').textContent = `بعد ${dur(diff)} • ${hm(next[1])}`;
}

function expectedOut(inMin){ return inMin + Math.round(WORK_HOURS*60); }

function updateWork(){
  const inHM = $('inTime').value;
  const inMin = parseHM(inHM);

  if(inMin==null){
    $('kOut').textContent = '—';
    $('kOutS').textContent = 'أدخل وقت الدخول';
    $('kLeft').textContent = '—';
    $('kLeftS').textContent = '—';
    $('workPct').textContent = '—';
    $('workBar').style.width = '0%';
    return;
  }

  const outMin = expectedOut(inMin);
  const outHM = hm(outMin);
  $('kOut').textContent = outHM;
  $('kOutS').textContent = `ثابت: ${WORK_HOURS} ساعة`;

  const now = ammanNow();
  let nowAbs = now.getHours()*60 + now.getMinutes() + now.getSeconds()/60;
  let inAbs = inMin;
  let outAbs = outMin;

  if(outAbs < inAbs) outAbs += 1440;
  if(nowAbs < inAbs) nowAbs += 1440;

  const total = Math.max(1, outAbs - inAbs);
  const elapsed = Math.max(0, Math.min(total, nowAbs - inAbs));
  const pct = elapsed / total;

  $('workPct').textContent = `${Math.round(pct*100)}%`;
  $('workBar').style.width = `${Math.round(pct*100)}%`;

  const left = outAbs - nowAbs;
  if(left > 0){
    $('kLeft').textContent = dur(left);
    $('kLeftS').textContent = `الخروج المتوقع ${outHM}`;
  }else{
    $('kLeft').textContent = 'تم';
    $('kLeftS').textContent = 'تجاوزت وقت الخروج';
    $('workPct').textContent = '100%';
    $('workBar').style.width = '100%';
  }
}

function updateClock(){
  const d=ammanNow();
  $('nowClock').textContent = `${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}`;
}

function loadLog(){ try{ return JSON.parse(localStorage.getItem(LS_LOG)||'[]'); }catch{ return []; } }
function saveLog(arr){ localStorage.setItem(LS_LOG, JSON.stringify(arr)); }

function addLog(){
  const name = $('name').value.trim();
  const inHM = $('inTime').value;
  if(!name){ toast('Name required'); return; }
  if(!inHM){ toast('Entrance time required'); return; }
  const inMin = parseHM(inHM);
  const outMin = expectedOut(inMin);
  const arr = loadLog();
  arr.push({date: todayISO(), name, inTime: inHM, expectedOut: hm(outMin), createdAt: new Date().toISOString()});
  saveLog(arr);
  renderLog();
  toast('Saved','Local log updated.');
}

function renderLog(){
  const arr = loadLog();
  const tb = $('logBody');
  if(!tb) return;
  if(!arr.length){
    tb.innerHTML = `<tr><td colspan="4" class="tiny">لا يوجد سجل بعد.</td></tr>`;
    $('logStats').textContent = '—';
    return;
  }
  tb.innerHTML = arr.slice().reverse().slice(0,20).map(x=>`
    <tr><td>${x.date}</td><td>${esc(x.name)}</td><td>${x.inTime}</td><td>${x.expectedOut}</td></tr>
  `).join('');
  const today = todayISO();
  const todayRows = arr.filter(x=>x.date===today);
  const avgIn = todayRows.length ? (todayRows.reduce((a,b)=>a+parseHM(b.inTime),0)/todayRows.length) : null;
  $('logStats').textContent = `سجلات اليوم: ${todayRows.length}` + (avgIn!=null ? ` • متوسط الدخول: ${hm(avgIn)}` : '');
}

function exportCSV(){
  const arr = loadLog();
  if(!arr.length){ toast('No data'); return; }
  const hdr = ['date','name','in_time','expected_out'];
  const rows = arr.map(x=>[x.date, x.name, x.inTime, x.expectedOut].map(v=>`"${String(v??'').replace(/"/g,'""')}"`).join(','));
  const csv = hdr.join(',') + '\n' + rows.join('\n');
  const blob = new Blob([csv], {type:'text/csv;charset=utf-8;'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `ramadan_log_${todayISO()}.csv`;
  a.click();
  URL.revokeObjectURL(a.href);
}
function clearLog(){
  if(!confirm('مسح السجل المحلي؟')) return;
  localStorage.removeItem(LS_LOG);
  renderLog();
  toast('Cleared');
}

/* Google Maps (TrafficLayer + hotspot highlights) */
let map=null, trafficLayer=null;
let hotspotCircles = new Map();
let hotspotMarkers = new Map();

function loadTraffic(){ try{ return JSON.parse(localStorage.getItem(LS_TRAFFIC)||'{}'); }catch{ return {}; } }
function saveTraffic(obj){ localStorage.setItem(LS_TRAFFIC, JSON.stringify(obj)); }

function statusInfo(st){
  if(st==="heavy") return {txt:"Heavy", cls:"heavy", color:"#ff6b87"};
  if(st==="med") return {txt:"Medium", cls:"med", color:"#ffd166"};
  if(st==="light") return {txt:"Light", cls:"light", color:"#43d39e"};
  return {txt:"Unset", cls:"med", color:"#7fd6ff"};
}
function cycleStatus(cur){ return (cur==="unk") ? "heavy" : (cur==="heavy") ? "med" : (cur==="med") ? "light" : "unk"; }

function ensureGMapsScript(){
  if(!GOOGLE_MAPS_API_KEY || GOOGLE_MAPS_API_KEY === "PUT_YOUR_KEY_HERE"){
    toast("Google Maps key missing", "Open docs/app.js and set GOOGLE_MAPS_API_KEY then redeploy.");
    return;
  }
  const s = document.createElement("script");
  s.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(GOOGLE_MAPS_API_KEY)}&callback=initMap&v=weekly`;
  s.async = true; s.defer = true;
  window.initMap = initMap;
  document.head.appendChild(s);
}

function initMap(){
  const amman = {lat:31.9539, lng:35.9106};
  map = new google.maps.Map(document.getElementById("map"), {
    center: amman, zoom: 12,
    mapTypeControl:false, streetViewControl:false, fullscreenControl:true
  });
  trafficLayer = new google.maps.TrafficLayer();
  trafficLayer.setMap(map);
  renderHotspots();
  toast("Map ready", "Traffic layer enabled.");
}

function renderHotspots(){
  const st = loadTraffic();
  const container = $("hotspots");
  if(!container) return;
  const rank = (s)=> s==="heavy"?0 : s==="med"?1 : s==="light"?2 : 3;
  const sorted = AMMAN_HOTSPOTS.slice().sort((a,b)=>rank(st[a.id]?.status||"unk")-rank(st[b.id]?.status||"unk"));

  container.innerHTML = sorted.map(h=>{
    const info = statusInfo(st[h.id]?.status || "unk");
    const upd = st[h.id]?.updatedAt ? new Date(st[h.id].updatedAt) : null;
    const updTxt = upd ? `• ${pad2(upd.getHours())}:${pad2(upd.getMinutes())}` : "";
    return `
      <div class="hot" data-id="${h.id}">
        <div>
          <div class="name">${esc(h.name)}</div>
          <div class="meta">${esc(h.meta)} ${updTxt}</div>
        </div>
        <div class="pill ${info.cls}">${info.txt}</div>
      </div>
    `;
  }).join("");

  container.querySelectorAll(".hot").forEach(node=>{
    node.addEventListener("click", ()=> onHotspotClick(node.getAttribute("data-id")));
  });

  if(map && google?.maps){
    for(const h of AMMAN_HOTSPOTS){
      const status = st[h.id]?.status || "unk";
      upsertHotspotOverlay(h, status);
    }
  }
}

function upsertHotspotOverlay(h, status){
  const info = statusInfo(status);

  if(!hotspotMarkers.has(h.id)){
    const marker = new google.maps.Marker({ position:{lat:h.lat, lng:h.lon}, map, title:h.name });
    hotspotMarkers.set(h.id, marker);
  }

  const opacity = status==="unk" ? 0.05 : (status==="light"?0.12: status==="med"?0.16:0.20);

  if(!hotspotCircles.has(h.id)){
    const circle = new google.maps.Circle({
      strokeColor: info.color, strokeOpacity: 0.85, strokeWeight: 2,
      fillColor: info.color, fillOpacity: opacity,
      map, center:{lat:h.lat, lng:h.lon}, radius: 700
    });
    hotspotCircles.set(h.id, circle);
  }else{
    const circle = hotspotCircles.get(h.id);
    circle.setOptions({ strokeColor: info.color, fillColor: info.color, fillOpacity: opacity });
  }
}

function onHotspotClick(id){
  const h = AMMAN_HOTSPOTS.find(x=>x.id===id);
  if(!h) return;

  if(map){ map.panTo({lat:h.lat, lng:h.lon}); map.setZoom(14); }

  const st = loadTraffic();
  const cur = st[id]?.status || "unk";
  const next = cycleStatus(cur);
  st[id] = {status: next, updatedAt: new Date().toISOString()};
  saveTraffic(st);

  renderHotspots();
  toast("Updated", `${h.name}: ${statusInfo(next).txt}`);
}

function toggleTraffic(){ if(!trafficLayer) return; trafficLayer.setMap(trafficLayer.getMap() ? null : map); }
function resetMap(){ if(!map) return; map.setZoom(12); map.panTo({lat:31.9539, lng:35.9106}); }

function updateAll(){
  updateClock();
  updateIftar();
  updateNextPrayer();
  updateWork();
  renderLog();
}

document.addEventListener("DOMContentLoaded", ()=>{
  randomTip();

  $('newTip').addEventListener('click', randomTip);
  $('refreshPT').addEventListener('click', fetchPT);
  $('saveBtn').addEventListener('click', addLog);
  $('calcBtn').addEventListener('click', updateAll);
  $('exportCSV').addEventListener('click', exportCSV);
  $('clearLog').addEventListener('click', clearLog);

  $('toggleTraffic').addEventListener('click', toggleTraffic);
  $('resetMap').addEventListener('click', resetMap);

  ['name','inTime'].forEach(id=>{
    $(id).addEventListener('input', updateAll);
    $(id).addEventListener('change', updateAll);
  });

  renderDaily(null);
  renderLog();
  renderHotspots();

  fetchPT();
  updateAll();
  ensureGMapsScript();

  setInterval(updateAll, 1000);
  setInterval(()=>{ const d = new Date(); if(d.getMinutes()%30===0 && d.getSeconds()===0) fetchPT(); }, 1000);
});
