/* Ramadan Dashboard v2 — clean modern Islamic UI (RTL) */
:root{
  --bg0:#040812; --bg1:#071528; --bg2:#0a1f23; --bg3:#0c2c2a;
  --card:rgba(255,255,255,.06);
  --card2:rgba(255,255,255,.09);
  --line:rgba(255,255,255,.12);
  --txt:rgba(255,255,255,.92);
  --muted:rgba(255,255,255,.72);
  --muted2:rgba(255,255,255,.55);
  --gold:#d7b56d; --gold2:#f6e3b4;
  --emerald:#39d5b0; --sky:#7fd6ff;
  --ok:#43d39e; --warn:#ffd166; --bad:#ff6b87;
  --shadow:0 22px 56px rgba(0,0,0,.42);
  --r:22px;
  --blur:12px;
}

*{box-sizing:border-box}
html,body{height:100%}
body{
  margin:0;
  font-family:"Tajawal", system-ui, -apple-system, Segoe UI, Arial, sans-serif;
  color:var(--txt);
  background:
    radial-gradient(1200px 740px at 80% 12%, rgba(127,214,255,.16), transparent 60%),
    radial-gradient(980px 640px at 16% 8%, rgba(215,181,109,.12), transparent 62%),
    radial-gradient(980px 700px at 52% 112%, rgba(57,213,176,.10), transparent 55%),
    linear-gradient(180deg,var(--bg0), var(--bg1) 42%, var(--bg2) 72%, var(--bg3));
  overflow-x:hidden;
}

.bg{
  position:fixed; inset:-40px; pointer-events:none; opacity:.18; mix-blend-mode:overlay;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240' viewBox='0 0 240 240'%3E%3Cg fill='none' stroke='%23ffffff' stroke-opacity='0.35' stroke-width='1'%3E%3Cpath d='M120 14 L152 46 L120 78 L88 46 Z'/%3E%3Cpath d='M120 78 L152 110 L120 142 L88 110 Z'/%3E%3Cpath d='M120 142 L152 174 L120 206 L88 174 Z'/%3E%3Cpath d='M14 120 L46 88 L78 120 L46 152 Z'/%3E%3Cpath d='M78 120 L110 88 L142 120 L110 152 Z'/%3E%3Cpath d='M142 120 L174 88 L206 120 L174 152 Z'/%3E%3C/g%3E%3C/svg%3E");
  background-size:240px 240px;
  filter: blur(.2px);
}

.wrap{max-width:1260px; margin:auto; padding:18px 18px 44px; position:relative}
.mono{font-variant-numeric: tabular-nums; font-feature-settings:"tnum" 1}

.topbar{
  display:flex; gap:14px; justify-content:space-between; align-items:flex-end; flex-wrap:wrap;
  padding:10px 6px 14px;
}
.brand{display:flex; gap:12px; align-items:center}
.logo{
  width:56px; height:56px; border-radius:18px;
  background:
    radial-gradient(circle at 35% 35%, rgba(246,227,180,.30), rgba(215,181,109,.12) 55%, rgba(255,255,255,.04)),
    linear-gradient(180deg, rgba(255,255,255,.06), transparent);
  border:1px solid rgba(215,181,109,.35);
  box-shadow:0 18px 48px rgba(0,0,0,.30);
  display:grid; place-items:center;
}
.title{font-weight:900; font-size:20px; letter-spacing:.2px}
.subtitle{color:var(--muted); font-size:13px; line-height:1.55; margin-top:3px}
.subtitle b{color:rgba(255,255,255,.92)}

.statusRow{display:flex; gap:8px; flex-wrap:wrap; align-items:center}
.pillStatus{
  display:flex; gap:10px; align-items:center;
  padding:9px 12px; border-radius:999px;
  border:1px solid var(--line);
  background:rgba(255,255,255,.06);
  box-shadow:0 12px 28px rgba(0,0,0,.22);
  backdrop-filter: blur(var(--blur));
}
.pillStatus .k{color:var(--muted2); font-size:12px; font-weight:900}
.pillStatus .v{font-weight:900; font-size:13px}
.dot{width:9px;height:9px;border-radius:50%; background:var(--sky); box-shadow:0 0 0 6px rgba(127,214,255,.10)}
.dot.ok{background:var(--ok); box-shadow:0 0 0 6px rgba(67,211,158,.12)}
.dot.warn{background:var(--warn); box-shadow:0 0 0 6px rgba(255,209,102,.12)}
.dot.bad{background:var(--bad); box-shadow:0 0 0 6px rgba(255,107,135,.12)}

.hero{
  display:grid;
  grid-template-columns: 1.08fr 0.92fr;
  gap:14px;
  margin-top:6px;
}
@media (max-width:1020px){
  .hero{grid-template-columns:1fr; }
}

.heroLeft{
  padding:16px 8px 8px 6px;
}
.heroKicker{
  display:inline-flex; gap:10px; align-items:center;
  padding:8px 12px; border-radius:999px;
  background:rgba(215,181,109,.10);
  border:1px solid rgba(215,181,109,.25);
  color:rgba(255,255,255,.86);
  font-weight:900; font-size:12px;
  width:fit-content;
}
.heroLeft h1{
  margin:12px 0 8px;
  font-size:clamp(26px,3.3vw,44px);
  line-height:1.12;
  letter-spacing:.2px;
}
.heroLeft p{
  margin:0 0 12px;
  color:var(--muted);
  font-size:14px;
  line-height:1.7;
  max-width:54ch;
}

.quickGrid{
  display:grid;
  grid-template-columns: repeat(3, 1fr);
  gap:10px;
  margin-top:12px;
}
@media (max-width:860px){
  .quickGrid{grid-template-columns:1fr; }
}
.qcard{
  border-radius:18px;
  background:rgba(255,255,255,.05);
  border:1px solid rgba(255,255,255,.10);
  padding:12px;
  box-shadow:0 16px 36px rgba(0,0,0,.22);
  backdrop-filter: blur(var(--blur));
}
.qk{color:var(--muted2); font-weight:900; font-size:12px}
.qv{font-weight:900; font-size:26px; margin-top:6px}
.qs{color:var(--muted); font-size:12px; margin-top:6px}

.heroRight{display:flex}
.glass{
  width:100%;
  border-radius:var(--r);
  background:rgba(255,255,255,.06);
  border:1px solid rgba(255,255,255,.12);
  box-shadow:var(--shadow);
  backdrop-filter: blur(var(--blur));
  overflow:hidden;
  transform: translateZ(0);
}
.glassTop{
  padding:14px 16px;
  display:flex; justify-content:space-between; align-items:center; gap:10px; flex-wrap:wrap;
  background:
    radial-gradient(900px 240px at 84% 0%, rgba(215,181,109,.16), transparent 62%),
    radial-gradient(900px 240px at 18% 0%, rgba(57,213,176,.10), transparent 62%),
    linear-gradient(180deg, rgba(255,255,255,.06), transparent);
  border-bottom:1px solid rgba(255,255,255,.08);
}
.glassTitle{font-weight:900; font-size:16px}
.badge{
  padding:7px 10px; border-radius:999px;
  border:1px solid rgba(255,255,255,.12);
  background:rgba(0,0,0,.18);
  color:rgba(255,255,255,.86);
  font-weight:900; font-size:12px;
}

.form{
  padding:14px 16px 8px;
  display:grid;
  grid-template-columns: 1fr 1fr;
  gap:10px;
}
@media (max-width:560px){
  .form{grid-template-columns:1fr}
}
.field label{display:block; font-size:12px; color:var(--muted2); margin-bottom:6px; font-weight:900}
input{
  width:100%;
  padding:12px 12px;
  border-radius:14px;
  border:1px solid rgba(255,255,255,.14);
  background:rgba(0,0,0,.22);
  color:var(--txt);
  outline:none;
}
input::placeholder{color:rgba(255,255,255,.42)}

.result{padding:10px 16px 12px}
.big{
  border-radius:18px;
  background:rgba(255,255,255,.05);
  border:1px solid rgba(255,255,255,.10);
  padding:12px;
}
.bigK{color:var(--muted2); font-weight:900; font-size:12px}
.bigV{font-size:34px; font-weight:900; margin-top:6px}
.bigS{color:var(--muted); font-size:12px; margin-top:4px; line-height:1.6}

.miniGrid{
  display:grid;
  grid-template-columns: repeat(3, 1fr);
  gap:10px;
  margin-top:10px;
}
@media (max-width:860px){
  .miniGrid{grid-template-columns:1fr}
}
.mini{
  border-radius:18px;
  background:rgba(255,255,255,.05);
  border:1px solid rgba(255,255,255,.10);
  padding:12px;
}
.mk{color:var(--muted2); font-weight:900; font-size:12px}
.mv{font-weight:900; font-size:18px; margin-top:6px}
.ms{color:var(--muted); font-size:12px; margin-top:4px; line-height:1.55}

.barWrap{margin-top:12px}
.bar{
  height:12px;
  border-radius:999px;
  background:rgba(255,255,255,.08);
  border:1px solid rgba(255,255,255,.10);
  overflow:hidden;
}
.barFill{
  height:100%;
  width:0%;
  background:linear-gradient(90deg, rgba(57,213,176,.95), rgba(127,214,255,.85), rgba(215,181,109,.95));
  border-radius:999px;
  transition: width .35s ease;
}
.barHint{margin-top:8px; color:var(--muted2); font-weight:900; font-size:12px}

.actions{
  padding:0 16px 14px;
  display:grid;
  grid-template-columns: 1fr 1fr;
  gap:10px;
}
@media (max-width:560px){ .actions{grid-template-columns:1fr} }
button{
  font-family:inherit;
  cursor:pointer;
  width:100%;
  padding:12px 12px;
  border-radius:14px;
  border:1px solid rgba(255,255,255,.14);
  background:rgba(255,255,255,.08);
  color:var(--txt);
  font-weight:900;
}
button.primary{
  border:none;
  color:#061517;
  background:linear-gradient(135deg, var(--gold), var(--gold2));
  box-shadow:0 14px 28px rgba(0,0,0,.25);
}
button.ghost{
  background:rgba(255,255,255,.06);
}
button.danger{
  border-color:rgba(255,107,135,.35);
  background:rgba(255,107,135,.08);
}

.drawer{
  margin:0 16px 14px;
  background:rgba(255,255,255,.05);
  border:1px solid rgba(255,255,255,.10);
  border-radius:18px;
  padding:10px 12px;
}
.drawer summary{cursor:pointer; font-weight:900}
.drawerBody{padding-top:10px}
.tiny{font-size:12px; color:var(--muted); line-height:1.7}
.footnote{margin-top:10px; color:rgba(255,255,255,.58); font-size:12px; line-height:1.7}

.tableWrap{overflow:auto; margin-top:10px}
table{width:100%; border-collapse:collapse; font-size:13px}
th,td{padding:8px; border-bottom:1px solid rgba(255,255,255,.08); text-align:right}
th{color:var(--muted); font-size:12px}
tr:last-child td{border-bottom:none}
.actions2{display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-top:10px}
@media (max-width:560px){ .actions2{grid-template-columns:1fr} }

.grid{
  display:grid;
  grid-template-columns: 1fr 1.25fr;
  gap:14px;
  margin-top:14px;
}
@media (max-width:1100px){
  .grid{grid-template-columns:1fr}
}

.card{
  border-radius:var(--r);
  background:rgba(255,255,255,.06);
  border:1px solid rgba(255,255,255,.12);
  box-shadow:var(--shadow);
  backdrop-filter: blur(var(--blur));
  overflow:hidden;
}
.cardHead{
  padding:14px 16px;
  display:flex; justify-content:space-between; align-items:flex-start; gap:10px; flex-wrap:wrap;
  background:
    radial-gradient(900px 220px at 84% 0%, rgba(215,181,109,.16), transparent 62%),
    radial-gradient(900px 220px at 18% 0%, rgba(57,213,176,.10), transparent 62%),
    linear-gradient(180deg, rgba(255,255,255,.06), transparent);
  border-bottom:1px solid rgba(255,255,255,.08);
}
.cardTitle{font-weight:900; font-size:16px}
.cardSub{color:var(--muted); font-size:12.5px; line-height:1.7; margin-top:4px}
.cardTools{display:flex; gap:10px; flex-wrap:wrap}
.cardTools button{width:auto; padding:10px 12px; border-radius:999px}

.cardBody{padding:14px 16px 16px}
.tiles{
  display:grid;
  grid-template-columns: repeat(4, 1fr);
  gap:10px;
}
@media (max-width:900px){
  .tiles{grid-template-columns: repeat(2, 1fr);}
}
.tile{
  border-radius:18px;
  background:rgba(255,255,255,.05);
  border:1px solid rgba(255,255,255,.10);
  padding:12px;
}
.tile.gold{border-color:rgba(215,181,109,.30); background:rgba(215,181,109,.08)}
.tile.sky{border-color:rgba(127,214,255,.30); background:rgba(127,214,255,.08)}
.tile.green{border-color:rgba(57,213,176,.30); background:rgba(57,213,176,.08)}
.tk{color:var(--muted2); font-weight:900; font-size:12px}
.tv{font-weight:900; font-size:22px; margin-top:6px}
.ts{color:var(--muted); font-size:12px; margin-top:4px}

.contentGrid{
  display:grid;
  grid-template-columns: 1fr 1fr;
  gap:10px;
  margin-top:12px;
}
@media (max-width:900px){ .contentGrid{grid-template-columns:1fr} }

.contentCard{
  border-radius:18px;
  background:rgba(255,255,255,.05);
  border:1px solid rgba(255,255,255,.10);
  padding:12px;
}
.cTop{display:flex; justify-content:space-between; align-items:flex-start; gap:10px; flex-wrap:wrap}
.cTitle{font-weight:900; font-size:14px}
.cText{margin:8px 0 0; color:var(--muted); font-size:12.5px; line-height:1.9}
.chipRow{display:flex; gap:8px; flex-wrap:wrap}
.chip{
  display:inline-flex; align-items:center; gap:6px;
  padding:6px 10px; border-radius:999px;
  border:1px solid rgba(255,255,255,.12);
  background:rgba(0,0,0,.14);
  font-weight:900; font-size:12px; color:rgba(255,255,255,.84);
}
.chip.gold{border-color:rgba(215,181,109,.35); background:rgba(215,181,109,.10)}
.chip.sky{border-color:rgba(127,214,255,.35); background:rgba(127,214,255,.10)}
.chip.green{border-color:rgba(67,211,158,.35); background:rgba(67,211,158,.10)}

.tall .cardBody{padding:0}
.mapLayout{
  display:grid;
  grid-template-columns: 1fr 360px;
  min-height:560px;
}
@media (max-width:1100px){
  .mapLayout{grid-template-columns:1fr}
}
.mapWrap{
  position:relative;
  border-left:1px solid rgba(255,255,255,.10);
  background:rgba(0,0,0,.18);
}
.map{width:100%; height:100%}
.legend{
  position:absolute; left:14px; bottom:14px;
  display:flex; gap:8px; flex-wrap:wrap;
  padding:10px;
  border-radius:16px;
  background:rgba(4,8,18,.60);
  border:1px solid rgba(255,255,255,.12);
  backdrop-filter: blur(var(--blur));
}
.lg{
  padding:6px 10px; border-radius:999px; font-size:12px; font-weight:900;
  border:1px solid rgba(255,255,255,.12);
}
.lg.heavy{border-color:rgba(255,107,135,.45); background:rgba(255,107,135,.14)}
.lg.med{border-color:rgba(255,209,102,.45); background:rgba(255,209,102,.14)}
.lg.light{border-color:rgba(67,211,158,.45); background:rgba(67,211,158,.14)}

.side{
  padding:14px 16px 16px;
  background:rgba(255,255,255,.04);
}
.sideTitle{font-weight:900; font-size:14px}
.sideSub{color:var(--muted); font-size:12px; line-height:1.7; margin-top:4px}
.hotspots{margin-top:12px; display:grid; gap:8px;}
.hot{
  display:flex; justify-content:space-between; align-items:center; gap:10px;
  padding:10px 12px;
  border-radius:16px;
  border:1px solid rgba(255,255,255,.10);
  background:rgba(255,255,255,.05);
  cursor:pointer;
  transition: transform .08s ease, background .18s ease;
}
.hot:hover{transform: translateY(-1px); background:rgba(255,255,255,.06)}
.hot .name{font-weight:900; font-size:13px}
.hot .meta{color:var(--muted2); font-size:12px; margin-top:2px}
.pill{
  padding:6px 10px; border-radius:999px; font-size:12px; font-weight:900;
  border:1px solid rgba(255,255,255,.12);
  white-space:nowrap;
}
.pill.heavy{border-color:rgba(255,107,135,.45); background:rgba(255,107,135,.14)}
.pill.med{border-color:rgba(255,209,102,.45); background:rgba(255,209,102,.14)}
.pill.light{border-color:rgba(67,211,158,.45); background:rgba(67,211,158,.14)}

.toast{
  position:fixed; left:16px; bottom:16px;
  width:min(420px, calc(100vw - 32px));
  background:rgba(10,15,25,.88);
  border:1px solid rgba(255,255,255,.12);
  border-radius:18px;
  box-shadow:0 18px 48px rgba(0,0,0,.45);
  padding:12px;
  display:none;
  backdrop-filter: blur(var(--blur));
  z-index:9999;
}
.toast b{display:block; margin-bottom:4px}
