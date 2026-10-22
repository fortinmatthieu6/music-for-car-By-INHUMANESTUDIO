<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="theme-color" content="#14171C">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="Ma musique">
<link rel="manifest" href="manifest.webmanifest">
<link rel="apple-touch-icon" href="apple-touch-icon.png">
<title>Ma musique</title>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;800&display=swap" rel="stylesheet">
<style>
:root{--bg:#14171C;--s1:#1E232B;--s2:#2B323D;--tx:#F2F0EA;--mu:#9AA3AF;--am:#E8A33D;--ok:#5BC0A8}
*{box-sizing:border-box}
html,body{height:100%;margin:0;background:var(--bg);color:var(--tx);font:400 15px Manrope,system-ui,sans-serif}
button{font:inherit;color:inherit;cursor:pointer}
button:focus-visible,input:focus-visible{outline:2px solid var(--am);outline-offset:2px}
#app{height:100dvh;display:flex;flex-direction:column;padding-top:env(safe-area-inset-top)}
header{display:flex;justify-content:space-between;align-items:center;padding:12px 24px 4px}
h1{font-size:14px;font-weight:600;color:var(--mu);margin:0}
.chip{font-size:12px;font-weight:600;border:1px solid var(--ok);color:var(--ok);border-radius:999px;padding:6px 12px}
.chip.off{border-color:var(--am);color:var(--am)}
main{flex:1;min-height:0}
.view{display:none;height:100%;overflow-y:auto;padding:8px 24px 24px}
.view.on{display:block}
#v-play.on{display:flex;flex-direction:column;padding:0}
.seg{display:flex;gap:8px;padding:8px 24px}
.seg button{flex:1;height:44px;border-radius:12px;border:0;background:var(--s1);color:var(--mu);font-weight:600}
.seg button.on{background:var(--s2);color:var(--tx)}
.pager{flex:1;min-height:0;display:flex;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none}
.pager::-webkit-scrollbar{display:none}
.pane{flex:0 0 100%;scroll-snap-align:start;overflow-y:auto;padding:8px 24px 24px}
.cover{width:min(280px,70vw);aspect-ratio:1;border-radius:20px;background:var(--s2);margin:8px auto 16px;display:grid;place-items:center;font-size:96px;font-weight:800;color:var(--am)}
.fmt{font-size:12px;font-weight:600;color:var(--am);border:1px solid var(--am);border-radius:6px;padding:4px 8px}
input[type=range]{width:100%;accent-color:var(--am)}
.ctl{display:flex;justify-content:center;align-items:center;gap:28px;margin:12px 0 20px}
.cb{width:56px;height:56px;border-radius:50%;border:0;background:var(--s1);display:grid;place-items:center}
.cb.big{width:72px;height:72px;background:var(--am);color:var(--bg)}
.row{display:flex;align-items:center;gap:12px;padding:8px;border-radius:14px;min-height:60px;user-select:none;-webkit-user-select:none;-webkit-touch-callout:none}
button.row{width:100%;border:0;background:none;text-align:left;color:inherit}
.row:active{background:var(--s1)}
.th{width:44px;height:44px;border-radius:8px;background:var(--s2);flex:none;display:grid;place-items:center;color:var(--am);font-weight:800}
.add{width:44px;height:44px;border-radius:50%;border:1px solid var(--am);color:var(--am);display:grid;place-items:center;flex:none}
.grow{flex:1;min-width:0}
.ell{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.tt{font-weight:600}
.mu{color:var(--mu);font-size:13px}
.note{background:#2A2417;color:var(--am);border-radius:12px;padding:12px 14px;margin-bottom:12px;font-size:14px}
.card{display:flex;gap:14px;align-items:center;background:var(--s1);border-radius:14px;padding:16px;margin-bottom:12px}
.dot{width:32px;height:32px;border-radius:50%;background:var(--ok);color:var(--bg);display:grid;place-items:center;font-weight:800;flex:none}
.dot.w{background:var(--am)}
.pb,.sb{height:54px;border-radius:14px;width:100%;font-weight:800}
.pb{border:0;background:var(--am);color:var(--bg)}
.sb{border:1px solid var(--mu);background:none;font-weight:600}
.ab{height:44px;border-radius:10px;border:1px solid var(--mu);background:none;padding:0 12px;font-weight:600}
.bar{position:sticky;bottom:0;background:var(--s2);border-radius:14px;padding:12px;display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:12px}
nav{display:flex;background:var(--s1);padding-bottom:env(safe-area-inset-bottom)}
nav button{flex:1;height:56px;border:0;background:none;color:var(--mu);font-weight:600;font-size:13px}
nav button.on{color:var(--am)}
#toast{position:fixed;left:24px;right:24px;bottom:calc(72px + env(safe-area-inset-bottom));min-height:56px;background:var(--s2);border-radius:14px;display:none;align-items:center;justify-content:space-between;padding:0 8px 0 16px;font-weight:600}
#toast.on{display:flex}
#toast button{height:44px;border:0;background:none;color:var(--am);font-weight:800;padding:0 12px}
#scrim{position:fixed;inset:0;background:rgba(0,0,0,.6);display:none}
#scrim.on{display:block}
#menu{position:fixed;left:0;right:0;bottom:0;background:var(--s1);border-radius:24px 24px 0 0;padding:20px 24px calc(24px + env(safe-area-inset-bottom));display:none;flex-direction:column;gap:4px}
#menu.on{display:flex}
#menu button{height:52px;border:0;background:none;text-align:left;font-weight:600;font-size:16px}
#ytbox iframe{width:100%;height:100%;display:block}
.in{flex:1;min-width:0;height:48px;border-radius:12px;border:1px solid var(--s2);background:var(--s1);color:var(--tx);padding:0 14px;font:inherit}
</style>
</head>
<body>
<div id="app">
<header><h1>Ma musique</h1><span id="chip" class="chip">En ligne</span></header>
<main>
<section id="v-play" class="view on">
<div class="seg"><button id="s0" class="on">En cours</button><button id="s1">Suggestions</button></div>
<div id="ytbox" hidden style="padding:0 24px 8px"><div style="aspect-ratio:16/9;border-radius:14px;overflow:hidden;background:#000"><div id="ytp"></div></div></div>
<div class="pager" id="pg"><div class="pane" id="now"></div><div class="pane" id="sug"></div></div>
</section>
<section id="v-lib" class="view"></section>
<section id="v-yt" class="view"></section>
<section id="v-route" class="view"></section>
</main>
<nav><button data-v="play" class="on">Lecture</button><button data-v="lib">Ma musique</button><button data-v="yt">YouTube</button><button data-v="route">Route</button></nav>
</div>
<audio id="au" preload="auto"></audio>
<input id="file" type="file" accept="audio/*,.flac,.m4a,.mp3,.wav,.aac" multiple hidden>
<div id="toast"><span id="tm"></span><button id="tu">Annuler</button></div>
<div id="scrim"></div><div id="menu"></div>
<script>
const $=s=>document.querySelector(s),esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const fmt=b=>b>=1e9?(b/1e9).toFixed(1).replace('.',',')+' Go':Math.max(1,Math.round(b/1e6))+' Mo';
const pl=n=>n+' titre'+(n>1?'s':''),mm=s=>isFinite(s)?Math.floor(s/60)+':'+String(Math.floor(s%60)).padStart(2,'0'):'0:00';
const sv=(p,s)=>'<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">'+p+'</svg>';
const ICO={play:sv('<path d="M8 5v14l11-7z"/>',30),pause:sv('<path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z"/>',30),pv:sv('<path d="M6 6h2v12H6zM9.5 12L18 6v12z"/>',26),nx:sv('<path d="M16 6h2v12h-2zM6 18V6l8.5 6z"/>',26),
plus:'<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/></svg>',
ck:'<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12l5 5 9-10" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round"/></svg>'};
/* Stockage : IndexedDB */
const dbp=new Promise((ok,ko)=>{const r=indexedDB.open('musique',1);r.onupgradeneeded=()=>r.result.createObjectStore('t',{keyPath:'id'});r.onsuccess=()=>ok(r.result);r.onerror=()=>ko(r.error)});
const tx=async(m,f)=>{const d=await dbp;return new Promise((ok,ko)=>{const t=d.transaction('t',m);const q=f(t.objectStore('t'));t.oncomplete=()=>ok(q&&q.result);t.onerror=()=>ko(t.error)})};
let T=[],Q=[],cur=-1,pn=0,sel=new Set(),hid=new Set(),undo=null,tmr,lp=false,url=null,view='play',pt;
const Y={},A=$('#au'),by=id=>T.find(t=>t.id===id)||Y[id],ext=t=>t.yt?'YOUTUBE':(t.fname.split('.').pop()||'').toUpperCase(),ini=t=>esc((t.title[0]||'♪').toUpperCase());let ys=0,YP=null,yready=false,pendY=null;
async function load(){T=(await tx('readonly',s=>s.getAll())).sort((a,b)=>a.added-b.added);render()}
function toast(m,fn){$('#tm').textContent=m;undo=fn||null;$('#tu').style.display=fn?'':'none';$('#toast').classList.add('on');clearTimeout(tmr);tmr=setTimeout(()=>$('#toast').classList.remove('on'),5000)}
$('#tu').onclick=()=>{undo&&undo();undo=null;$('#toast').classList.remove('on');render()};
/* Lecture et file d'attente */
function play(i){const t=by(Q[i]);if(!t){Q.splice(i,1);return Q[i]&&play(i)}cur=i;pn=0;if(t.yt){A.pause();ytPlay(t.v);render();return}ytStop();if(url)URL.revokeObjectURL(url);url=URL.createObjectURL(t.blob);A.src=url;A.play().catch(()=>{});
if('mediaSession'in navigator)navigator.mediaSession.metadata=new MediaMetadata({title:t.title,artist:t.artist});render()}
const next=()=>{if(cur+1<Q.length)play(cur+1);else A.pause()};
const prev=()=>{if(ct()>3||cur<1){isY()?YP.seekTo(0,true):(A.currentTime=0)}else play(cur-1)};
function addNext(id){if(cur<0){Q=[id];return play(0)}const k=cur+1+pn;Q.splice(k,0,id);pn++;render();toast('Ajouté pour jouer ensuite',()=>{Q.splice(k,1);pn--})}
function addEnd(id){if(cur<0){Q=[id];return play(0)}Q.push(id);render();toast('Ajouté à la fin',()=>Q.pop())}
function playNow(id){if(cur<0)Q=[id];else Q.splice(cur+1,0,id);play(cur<0?0:cur+1)}
if('mediaSession'in navigator){const m=navigator.mediaSession;m.setActionHandler('play',()=>A.play());m.setActionHandler('pause',()=>A.pause());m.setActionHandler('previoustrack',prev);m.setActionHandler('nexttrack',next)}
const isY=()=>(Q[cur]||'').startsWith('yt:'),playing=()=>isY()?ys===1:!A.paused,pp=()=>playing()?ICO.pause:ICO.play,ct=()=>isY()?(YP&&YP.getCurrentTime?YP.getCurrentTime():0):A.currentTime,du=()=>isY()?(YP&&YP.getDuration?YP.getDuration():0):A.duration;
function tick(){const b=$('#bar');if(!b)return;b.max=du()||0;b.value=ct();$('#t0').textContent=mm(ct());$('#t1').textContent=mm(du())}
A.onended=next;A.ontimeupdate=A.onloadedmetadata=tick;
const ypp=()=>{const b=$('#pp');if(b){b.innerHTML=pp();b.setAttribute('aria-label',playing()?'Pause':'Lecture')}};A.onplay=A.onpause=ypp;setInterval(()=>isY()&&tick(),500);
/* Écrans */
const row=(t,add)=>'<'+(add?'button':'div')+' class="row" data-id="'+t.id+'"><div class="th">'+(t.th?'<img src="'+esc(t.th)+'" alt="" style="width:44px;height:44px;border-radius:8px;object-fit:cover">':ini(t))+'</div><div class="grow"><div class="tt ell">'+esc(t.title)+'</div><div class="mu ell">'+esc(t.artist)+'</div></div>'+(add?'<span class="add">'+ICO.plus+'</span>':'')+'</'+(add?'button':'div')+'>';
function renderNow(){const t=by(Q[cur]),up=Q.slice(cur+1,cur+7).map(by).filter(Boolean);
$('#now').innerHTML=t?`${t.yt?'':'<div class="cover">'+ini(t)+'</div>'}
<div style="display:flex;justify-content:space-between;align-items:flex-end;gap:12px"><div class="grow"><div class="ell" style="font-size:24px;font-weight:800">${esc(t.title)}</div><div class="mu ell" style="font-size:15px">${esc(t.artist)}</div></div><span class="fmt">${esc(ext(t))}</span></div>
<input id="bar" type="range" min="0" step="1" value="0" aria-label="Position" style="margin-top:16px"><div class="mu" style="display:flex;justify-content:space-between"><span id="t0">0:00</span><span id="t1">0:00</span></div>
<div class="ctl"><button class="cb" id="pv" aria-label="Précédent">${ICO.pv}</button><button class="cb big" id="pp" aria-label="${playing()?'Pause':'Lecture'}">${pp()}</button><button class="cb" id="nx" aria-label="Suivant">${ICO.nx}</button></div>
<div class="mu" style="font-weight:600;margin-bottom:4px">Ensuite</div>${up.length?up.map(u=>row(u)).join(''):"<p class='mu'>La file est vide. Touche une suggestion pour l'ajouter.</p>"}`
:`<p style="font-size:20px;font-weight:800;margin-top:32px">Rien en cours</p><p class="mu">Va dans « Ma musique » pour ajouter tes fichiers, puis choisis des titres à jouer.</p>`;tick()}
function renderSug(){const c0=Q[cur],upc=new Set(Q.slice(cur+1)),ct=by(c0),same=t=>ct&&t.artist===ct.artist?0:1;
const L=T.filter(t=>t.id!==c0&&!upc.has(t.id)&&!hid.has(t.id)).sort((a,b)=>same(a)-same(b)||a.title.localeCompare(b.title)).slice(0,20);
$('#sug').innerHTML=`<div style="font-size:26px;font-weight:800">Suggestions</div><div class="mu" style="margin:2px 0 12px">${ct?'Proches de : '+esc(ct.title):'Choisis une musique pour commencer'}</div><div class="note">Toucher = ajouter pour jouer ensuite. Appui prolongé = plus d'options.</div>`+(L.length?L.map(t=>row(t,1)).join(''):"<p class='mu'>Plus de suggestions pour le moment.</p>")}
function renderLib(){const tot=T.reduce((a,t)=>a+t.size,0),ss=[...sel].map(by).filter(Boolean),sz=ss.reduce((a,t)=>a+t.size,0);
$('#v-lib').innerHTML=`<div style="display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:8px"><div><div style="font-size:26px;font-weight:800">Ma musique</div><div class="mu">${pl(T.length)} · ${fmt(tot)} sur ce téléphone</div></div><button class="sb" id="imp" style="width:auto;height:48px;padding:0 16px">Ajouter des fichiers</button></div>`
+(T.length?T.map(t=>`<label class="row" style="cursor:pointer"><input type="checkbox" data-id="${t.id}" ${sel.has(t.id)?'checked':''} style="width:24px;height:24px;accent-color:var(--am)"><div class="grow"><div class="tt ell">${esc(t.title)}</div><div class="mu ell">${esc(t.artist)} · ${esc(ext(t))} · ${fmt(t.size)}</div></div></label>`).join(''):"<p class='mu'>Aucun fichier pour le moment. Touche « Ajouter des fichiers » et choisis ta musique dans l'app Fichiers.</p>")
+(ss.length?`<div class="bar"><span class="grow" style="font-weight:600">${pl(ss.length)} choisis · ${fmt(sz)}</span><button class="ab" data-a="play">Jouer</button><button class="ab" data-a="add">Ajouter</button><button class="ab" data-a="del">Supprimer</button></div>`:'')}
async function renderRoute(){const rdy=!!navigator.serviceWorker?.controller,n=T.length,sz=T.reduce((a,t)=>a+t.size,0),
pers=navigator.storage?.persisted?await navigator.storage.persisted():false,est=navigator.storage?.estimate?await navigator.storage.estimate():null,
maj=+localStorage.getItem('maj')||0,d=maj?Math.floor((Date.now()-maj)/864e5):null;
const C=(ok,a,b)=>`<div class="card"><div class="dot${ok?'':' w'}">${ok?ICO.ck:'!'}</div><div><div class="tt">${a}</div><div class="mu">${b}</div></div></div>`;
$('#v-route').innerHTML=`<div style="font-size:26px;font-weight:800;margin-bottom:12px">Prêt pour la route</div><div class="note">Ouvre l'appli en Wi-Fi avant de partir pour tout préparer.</div>`
+C(rdy,rdy?'Appli prête sans internet':'Appli pas encore prête',rdy?"Elle s'ouvrira même sans réseau":'Ouvre-la deux fois en Wi-Fi, puis reviens ici')
+C(n>0,n?n+' chanson'+(n>1?'s':'')+' sur ton téléphone':'Aucune chanson pour le moment',fmt(sz)+(est?" · espace utilisé par l'appli : "+fmt(est.usage):''))
+C(pers,pers?'Ma musique est protégée':"Ma musique n'est pas protégée",pers?"Le téléphone ne l'effacera pas tout seul":'<button class="ab" id="prot" style="margin-top:6px">Protéger ma musique</button>')
+C(d!==null&&d<7,d===null?'Jamais mise à jour':'Dernière mise à jour : '+(d===0?"aujourd'hui":'il y a '+d+' jour'+(d>1?'s':'')),'Pense à mettre à jour avant de partir')
+`<button class="sb" id="tst">Tester sans internet</button><div class="mu" id="tmsg" style="margin:8px 0 12px"></div><button class="pb" id="upd">Mettre à jour l'appli</button>`}
function render(){view==='play'?(renderNow(),renderSug()):view==='lib'?renderLib():view==='yt'?0:renderRoute()}
function setView(v){view=v;document.querySelectorAll('.view').forEach(e=>e.classList.toggle('on',e.id==='v-'+v));document.querySelectorAll('nav button').forEach(b=>b.classList.toggle('on',b.dataset.v===v));render();if(v==='yt')renderYt()}
/* Actions */
document.querySelector('nav').onclick=e=>{const v=e.target.dataset.v;v&&setView(v)};
const pg=$('#pg');$('#s0').onclick=()=>pg.scrollTo({left:0,behavior:'smooth'});$('#s1').onclick=()=>pg.scrollTo({left:pg.clientWidth,behavior:'smooth'});
pg.onscroll=()=>{const i=Math.round(pg.scrollLeft/pg.clientWidth);$('#s0').classList.toggle('on',!i);$('#s1').classList.toggle('on',!!i)};
$('#now').addEventListener('click',e=>{const b=e.target.closest('button');if(b)({pv:prev,nx:next,pp:()=>isY()?(ys===1?YP.pauseVideo():YP.playVideo()):(A.paused?A.play():A.pause())})[b.id]?.()});
$('#now').addEventListener('input',e=>{if(e.target.id==='bar')isY()?YP.seekTo(+e.target.value,true):(A.currentTime=e.target.value)});
function bindRows(sg){
sg.addEventListener('pointerdown',e=>{const r=e.target.closest('.row[data-id]');if(!r)return;lp=false;pt=setTimeout(()=>{lp=true;openMenu(r.dataset.id)},500)});
['pointerup','pointercancel'].forEach(k=>sg.addEventListener(k,()=>clearTimeout(pt)));
sg.addEventListener('contextmenu',e=>e.preventDefault());
sg.addEventListener('click',e=>{const r=e.target.closest('.row[data-id]');if(!r)return;if(lp){lp=false;return}addNext(r.dataset.id)})}bindRows($('#sug'));bindRows($('#v-yt'));
function openMenu(id){$('#menu').innerHTML='<button data-a="now">Jouer maintenant</button><button data-a="next" style="color:var(--am);font-weight:800">Jouer ensuite</button><button data-a="end">Ajouter à la fin</button><button data-a="no" style="color:var(--mu)">Pas ça</button>';$('#menu').dataset.id=id;$('#menu').classList.add('on');$('#scrim').classList.add('on')}
const closeMenu=()=>{$('#menu').classList.remove('on');$('#scrim').classList.remove('on')};
$('#scrim').onclick=closeMenu;
$('#menu').onclick=e=>{const a=e.target.dataset.a,id=$('#menu').dataset.id;if(!a)return;closeMenu();({now:()=>playNow(id),next:()=>addNext(id),end:()=>addEnd(id),no:()=>{hid.add(id);render()}})[a]()};
$('#file').onchange=async e=>{try{for(const f of e.target.files){const n=f.name.replace(/\.[^.]+$/,''),p=n.split(' - ');await tx('readwrite',s=>s.put({id:crypto.randomUUID(),fname:f.name,artist:p.length>1?p[0]:'Artiste inconnu',title:p.length>1?p.slice(1).join(' - '):n,size:f.size,added:Date.now(),blob:f}))}navigator.storage?.persist?.()}catch(x){toast("Import interrompu : espace insuffisant ou fichier illisible")}e.target.value='';await load()};
async function del(ids){const c=Q[cur];for(const id of ids)await tx('readwrite',s=>s.delete(id));ids.forEach(i=>sel.delete(i));Q=Q.filter(x=>!ids.includes(x));cur=Q.indexOf(c);if(cur<0){A.pause();A.removeAttribute('src')}await load()}
$('#v-lib').addEventListener('click',e=>{if(e.target.closest('#imp'))return $('#file').click();const a=e.target.dataset.a;if(!a)return;const ids=[...sel].filter(by);
if(a==='play'){Q=ids;cur=-1;sel.clear();setView('play');play(0)}
if(a==='add'){sel.clear();if(cur<0){Q=ids;setView('play');play(0)}else{Q.push(...ids);toast(pl(ids.length)+' ajouté'+(ids.length>1?'s':'')+' à la fin',()=>{Q.length-=ids.length});render()}}
if(a==='del'&&confirm('Supprimer '+pl(ids.length)+' de ce téléphone ?'))del(ids)});
$('#v-lib').addEventListener('change',e=>{const id=e.target.dataset.id;if(!id)return;e.target.checked?sel.add(id):sel.delete(id);renderLib()});
$('#v-route').addEventListener('click',async e=>{const id=e.target.id;
if(id==='prot'){await navigator.storage?.persist?.();renderRoute()}
if(id==='tst')$('#tmsg').textContent="Active le mode avion, puis rouvre l'appli depuis l'écran d'accueil. Si elle s'ouvre et joue ta musique, tout est prêt.";
if(id==='upd'){if(!navigator.onLine)return toast("Pas de connexion : réessaie en Wi-Fi");await fetch(location.href,{cache:'reload'}).catch(()=>{});(await navigator.serviceWorker?.getRegistration())?.update();localStorage.setItem('maj',Date.now());navigator.storage?.persist?.();renderRoute();toast("Appli mise à jour")}});
/* Pastille d'état et mode hors ligne */
function chip(){const c=$('#chip'),off=!navigator.onLine,rdy=!!navigator.serviceWorker?.controller;c.textContent=off?'Sans internet':rdy?'Prêt sans internet':'En ligne';c.className='chip'+(off||!rdy?' off':'')}
addEventListener('online',chip);addEventListener('offline',chip);
if('serviceWorker'in navigator){navigator.serviceWorker.register('sw.js').catch(()=>{});navigator.serviceWorker.addEventListener('controllerchange',()=>{chip();render()})}
/* YouTube : recherche, import et lecture avec le lecteur officiel (en ligne seulement) */
const K=()=>localStorage.getItem('ytkey')||'',dec=s=>{const t=document.createElement('textarea');t.innerHTML=s;return t.value};
let YR=[],YQ='',ypl=JSON.parse(localStorage.getItem('ypl')||'[]');
const yadd=(v,title,ch,th)=>{const id='yt:'+v;Y[id]={id,yt:1,v,title:dec(title),artist:dec(ch||''),th};return id},yids=p=>p.items.map(i=>yadd(i.v,i.title,i.ch,i.th));
function yload(){if(document.getElementById('yts'))return;const s=document.createElement('script');s.id='yts';s.src='https://www.youtube.com/iframe_api';s.onerror=()=>{s.remove();toast("YouTube a besoin d'internet")};document.head.appendChild(s)}
function ymk(v){YP=new YT.Player('ytp',{videoId:v,playerVars:{playsinline:1,rel:0},events:{onReady:e=>e.target.playVideo(),onStateChange:e=>{ys=e.data;if(ys===0)next();ypp()},onError:()=>{toast('Cette vidéo ne peut pas être lue ici');next()}}})}
window.onYouTubeIframeAPIReady=()=>{yready=true;if(pendY){ymk(pendY);pendY=null}};
function ytPlay(v){$('#ytbox').hidden=false;if(YP&&YP.loadVideoById)YP.loadVideoById(v);else if(yready)ymk(v);else{pendY=v;yload()}}
function ytStop(){ys=0;try{YP&&YP.stopVideo()}catch(x){}$('#ytbox').hidden=true}
function renderYt(){const k=K();
$('#v-yt').innerHTML='<div style="font-size:26px;font-weight:800;margin-bottom:12px">YouTube</div>'+(k?`<form id="ys" style="display:flex;gap:8px;margin-bottom:12px"><input id="yq" class="in" type="search" placeholder="Titre, artiste…" aria-label="Rechercher sur YouTube"><button class="pb" style="width:auto;padding:0 18px;height:48px">Chercher</button></form>
<div class="note">Lecture en ligne seulement, avec le lecteur YouTube : la vidéo reste visible, et la lecture peut s'arrêter si tu verrouilles l'écran.</div>
<div>${YR.map(t=>row(t,1)).join('')}</div>
<div style="font-weight:600;margin:16px 0 8px">Importer une playlist</div>
<form id="yi" style="display:flex;gap:8px"><input id="yl" class="in" placeholder="Lien ou identifiant de la playlist" aria-label="Lien de la playlist"><button class="sb" style="width:auto;padding:0 16px;height:48px">Importer</button></form>
<div id="ymsg" class="mu" style="margin:8px 0 12px">Les playlists publiques ou non répertoriées fonctionnent. Les playlists privées viendront plus tard.</div>
${ypl.map((p,i)=>`<div class="card"><div class="grow"><div class="tt ell">${esc(p.title)}</div><div class="mu">${pl(p.items.length)}</div></div><button class="ab" data-p="${i}" data-a="pp">Jouer</button><button class="ab" data-p="${i}" data-a="pa">Ajouter</button></div>`).join('')}
<button class="ab" data-a="rk" style="margin-top:12px">Changer la clé YouTube</button>`
:`<div class="note">Pour chercher sur YouTube, il faut une clé gratuite de Google (une seule fois) :<br>1. Va sur console.cloud.google.com et crée un projet.<br>2. « API et services » : active « YouTube Data API v3 ».<br>3. « Identifiants » : crée une « Clé API ».<br>4. Limite la clé aux sites web : ${esc(location.origin)}/*</div>
<form id="yk" style="display:flex;gap:8px"><input id="ykey" class="in" placeholder="Colle ta clé ici" aria-label="Clé API YouTube" autocomplete="off"><button class="pb" style="width:auto;padding:0 18px;height:48px">Enregistrer</button></form>`);
const q=$('#yq');if(q)q.value=YQ}
async function ysearch(q){try{const j=await(await fetch('https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoEmbeddable=true&maxResults=15&q='+encodeURIComponent(q)+'&key='+K())).json();if(j.error)throw j.error;
YR=j.items.map(i=>Y[yadd(i.id.videoId,i.snippet.title,i.snippet.channelTitle,i.snippet.thumbnails&&i.snippet.thumbnails.default.url)]);renderYt()}catch(x){toast(x.message?'YouTube : '+x.message:'Recherche impossible : vérifie ta connexion')}}
async function yimport(s){const m=s.match(/[?&]list=([\w-]+)/),id=m?m[1]:s.trim(),msg=$('#ymsg');if(!id)return;msg.textContent='Importation…';
try{let it=[],pt='',title='Playlist YouTube';
const t0=await(await fetch('https://www.googleapis.com/youtube/v3/playlists?part=snippet&id='+id+'&key='+K())).json();if(t0.items&&t0.items[0])title=dec(t0.items[0].snippet.title);
do{const j=await(await fetch('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId='+id+'&key='+K()+(pt?'&pageToken='+pt:''))).json();if(j.error)throw j.error;
j.items.forEach(i=>{const n=i.snippet;if(n.resourceId&&n.resourceId.videoId&&!/^(Private|Deleted) video$/.test(n.title))it.push({v:n.resourceId.videoId,title:n.title,ch:(n.videoOwnerChannelTitle||'').replace(/ - Topic$/,''),th:n.thumbnails&&n.thumbnails.default&&n.thumbnails.default.url})});pt=j.nextPageToken}while(pt&&it.length<300);
ypl=ypl.filter(p=>p.id!==id);ypl.push({id,title,items:it});localStorage.setItem('ypl',JSON.stringify(ypl));renderYt()}
catch(x){msg.textContent="Impossible d'importer : "+(x.message||'vérifie le lien')+'. Les playlists privées ne sont pas prises en charge.'}}
$('#v-yt').addEventListener('submit',e=>{e.preventDefault();const id=e.target.id;
if(id==='yk'){const v=$('#ykey').value.trim();if(v){localStorage.setItem('ytkey',v);renderYt()}}
if(id==='ys'){YQ=$('#yq').value.trim();YQ&&ysearch(YQ)}
if(id==='yi')yimport($('#yl').value)});
$('#v-yt').addEventListener('click',e=>{const b=e.target.closest('button[data-a]');if(!b)return;const a=b.dataset.a,p=ypl[b.dataset.p];
if(a==='rk'){localStorage.removeItem('ytkey');renderYt()}
if(p&&a==='pp'){Q=yids(p);cur=-1;setView('play');play(0)}
if(p&&a==='pa'){if(cur<0){Q=yids(p);setView('play');play(0)}else{Q.push(...yids(p));toast(pl(p.items.length)+' ajoutés à la fin')}}});
chip();load();
</script>
</body>
</html>

