/* Covers pour le site (Webflow) : Cover toolbox et Cover live au format site (1109 × 748).
   Mesures relevées sur les frames Figma V2.Design.System : 2068:9263 (toolbox) et 3724:6406 (live site). */
(function(){
'use strict';
const BR='"Bricolage Grotesque",system-ui,sans-serif',AP='"Apfel Grotezk",system-ui,sans-serif';
const W=1109,H=748;
const rr=(x,X,Y,w,h,r)=>{x.beginPath();x.roundRect?x.roundRect(X,Y,w,h,r):x.rect(X,Y,w,h)};
const IMG={};
const load=src=>new Promise((res,rej)=>{const i=new Image();i.onload=()=>res(i);i.onerror=rej;i.src=src});
async function assets(){
  if(!IMG.logoW){try{IMG.logoW=await load('assets/brand/yeita-logo-light.svg');IMG.logoInk=await load('assets/brand/yeita-logo-ink.svg')}catch(e){}}
  try{await Promise.all(['800 64px "Bricolage Grotesque"','700 24px "Apfel Grotezk"','500 20px "Apfel Grotezk"'].map(f=>document.fonts.load(f)))}catch(e){}
}
/* le logo Yeita occupe 145 px de large dans les deux maquettes */
function logo(x,img,right,cy){if(!img)return;const w=145*115/113.5,h=w*50/115;x.drawImage(img,right-145-0.5*w*0.0-1.6,cy-h/2,w,h)}
function cover(x,img,X,Y,w,h,zoom,dx,dy){const s=Math.max(w/img.width,h/img.height)*(zoom||1),iw=img.width*s,ih=img.height*s;x.drawImage(img,X+w/2-iw/2+(dx||0),Y+h/2-ih/2+(dy||0),iw,ih)}
function fitText(x,t,max,font,size,min){let s=size;x.font=font.replace('S',s);while(s>min&&x.measureText(t).width>max){s--;x.font=font.replace('S',s)}return s}
function wrap(x,t,max){const out=[];let l='';t.split(/\s+/).filter(Boolean).forEach(w=>{const n=l?l+' '+w:w;if(x.measureText(n).width>max&&l){out.push(l);l=w}else l=n});if(l)out.push(l);return out}

/* ---------- Cover toolbox ---------- */
function toolRender(c,scale,S){
  const x=c.getContext('2d');c.width=Math.round(W*scale);c.height=Math.round(H*scale);x.setTransform(scale,0,0,scale,0,0);
  /* fond lime à pois : pas de 64 px, une ligne sur deux décalée de 32 */
  x.fillStyle='#f4fbc4';x.fillRect(0,0,W,H);x.fillStyle='#ecf0c7';
  for(let k=0;32*k<H+32;k++)for(let j=-1;64*j<W+64;j++){x.beginPath();x.arc(64*j-.5+(k%2?32:0),32*k-.5,5,0,Math.PI*2);x.fill()}
  /* carte 550 × 652, liseré lime de 6 px à l'extérieur */
  const X=279.5,Y=48,CW=550,CH=652;
  rr(x,X-6,Y-6,CW+12,CH+12,38);x.fillStyle='#ebf893';x.fill();
  x.save();rr(x,X,Y,CW,CH,32);x.clip();x.fillStyle='#160f20';x.fillRect(X,Y,CW,CH);
  /* capture */
  const hh=122.77,iy=Y+hh+2,ih=CH-hh-4,ix=X+2,iw=CW-4;
  x.save();x.beginPath();x.rect(ix,iy,iw,ih);x.clip();
  if(S.shot){x.fillStyle='#fffdf9';x.fillRect(ix,iy,iw,ih);cover(x,S.shot,ix,iy,iw,ih,S.zoom,S.dx,S.dy)}
  else{x.fillStyle='#e7e3ee';x.fillRect(ix,iy,iw,ih);x.fillStyle='#625a73';x.font=`500 26px ${AP}`;x.textAlign='center';x.textBaseline='middle';x.fillText('Ajoute une capture d’écran',ix+iw/2,iy+ih*.32);x.textAlign='left'}
  const g=x.createLinearGradient(0,iy+ih*.44493,0,iy+ih*.83308);g.addColorStop(0,'rgba(22,15,32,0)');g.addColorStop(1,'#160f20');
  x.fillStyle=g;x.fillRect(ix,iy,iw,ih);
  /* nom du tool, calé en bas à gauche */
  const raw=(S.name||'').replace(/\r/g,'').split('\n').map(t=>t.trim());while(raw.length&&!raw[raw.length-1])raw.pop();
  const nm=raw.join('\n')||'NomDuTool';x.fillStyle='#fffdf9';x.textBaseline='alphabetic';x.textAlign='left';
  const mw=iw-48;let size=64,lines;
  if(raw.length>1){lines=raw.slice(0,3);while(size>28&&lines.some(l=>{x.font=`800 ${size}px ${BR}`;return x.measureText(l).width>mw}))size-=2}
  else{lines=[nm];size=fitText(x,nm,mw,`800 Spx ${BR}`,64,36);if(x.measureText(nm).width>mw){size=48;x.font=`800 ${size}px ${BR}`;lines=wrap(x,nm,mw).slice(0,2)}}
  x.font=`800 ${size}px ${BR}`;const lh=size*1.25,bottom=Y+CH-26;
  lines.forEach((l,i)=>x.fillText(l,X+26,bottom-(lines.length-1-i)*lh-lh/2+.36*size));
  x.restore();
  /* en-tête : libellé jaune cerné de violet, logo blanc */
  x.fillStyle='#160f20';x.fillRect(X,Y,CW,hh);
  const lab=(S.label||'').trim()||'Tool';x.textBaseline='alphabetic';
  const ls=fitText(x,lab,300,`800 Spx ${BR}`,64,30);x.font=`800 ${ls}px ${BR}`;
  const by=Y+hh/2+.36*ls+.4;x.lineJoin='round';x.strokeStyle='#4d25f7';x.lineWidth=ls*.12;
  x.strokeText(lab,X+32,by+6);x.strokeText(lab,X+32,by);x.fillStyle='#ebf893';x.fillText(lab,X+32,by);
  logo(x,IMG.logoW,X+CW-32,Y+hh/2+6);
  x.restore();
}

/* ---------- Cover live, format site ---------- */
function liveWebRender(c,scale,L){
  const x=c.getContext('2d');c.width=Math.round(W*scale);c.height=Math.round(H*scale);x.setTransform(scale,0,0,scale,0,0);
  x.fillStyle='#98f0bf';x.fillRect(0,0,W,H);
  x.strokeStyle='rgba(77,37,247,.17)';x.lineWidth=1;x.beginPath();
  for(let p=15.5;p<W;p+=32){x.moveTo(p,0);x.lineTo(p,H)}for(let p=15.5;p<H;p+=32){x.moveTo(0,p);x.lineTo(W,p)}x.stroke();
  const X=279.5,Y=99,S=550,ink='#160f20';
  x.save();rr(x,X,Y,S,S,32);x.clip();x.fillStyle=ink;x.fillRect(X,Y,S,S);
  /* en-tête violet */
  const hb=Y+2+120.77;x.fillStyle='#8d73fa';x.fillRect(X+2,Y+2,S-4,118.77);
  /* cadre lime puis carte blanche */
  x.fillStyle='#ebf893';x.fillRect(X+2,hb,S-4,Y+S-2-hb);
  const wx=X+2+16,wy=hb+16,ww=S-4-32,wh=Y+S-2-16-wy;rr(x,wx,wy,ww,wh,32);x.fillStyle=ink;x.fill();rr(x,wx+2,wy+2,ww-4,wh-4,30);x.fillStyle='#fffdf9';x.fill();
  /* wordmark « Le Live » (approximation en Bricolage étiré, à remplacer par le SVG Figma) */
  const cy=Y+2+60.4;x.save();x.translate(X+2+30+2,cy+14);x.font=`800 46px ${BR}`;x.textBaseline='alphabetic';
  const tw=x.measureText('Le Live').width,sx=228/tw;x.scale(sx,1);x.lineJoin='round';x.lineWidth=7;x.strokeStyle=ink;
  x.strokeText('Le Live',3,4);x.strokeText('Le Live',0,0);x.fillStyle='#fffdf9';x.fillText('Le Live',0,0);x.restore();
  logo(x,IMG.logoInk,X+2+30+237+16+145,cy+4);
  /* tête de l'animateur, légèrement penchée */
  x.save();x.translate(X+2+30+237+16+145+16+51,cy);x.rotate(-8.04*Math.PI/180);
  const H0=L.hostImg;if(H0){const s=Math.min(67.14/H0.width,87.84/H0.height);x.drawImage(H0,-H0.width*s/2,-H0.height*s/2,H0.width*s,H0.height*s)}
  else{x.fillStyle='rgba(255,253,249,.55)';x.beginPath();x.ellipse(0,-6,26,32,0,0,Math.PI*2);x.fill();x.beginPath();x.ellipse(0,44,38,22,0,Math.PI,0);x.fill()}
  x.restore();
  /* photo de l'invité dans l'ovale 175 × 211 */
  const ox=X+S/2-87.5,oy=wy+2+24+25,cx=X+S/2;
  x.save();rr(x,ox,oy,175,211,87.5);x.clip();
  if(L.photo)cover(x,L.photo,ox,oy,175,211,L.zoom,(L.dx||0)*.7,(L.dy||0)*.7);
  else{x.fillStyle='#efeae0';x.fillRect(ox,oy,175,211);x.fillStyle='#e0d9cc';x.beginPath();x.ellipse(cx,oy+85,38,45,0,0,Math.PI*2);x.fill();x.beginPath();x.ellipse(cx,oy+215,80,80,0,Math.PI,0);x.fill()}
  x.restore();rr(x,ox+1.5,oy+1.5,172,208,86);x.lineWidth=3;x.strokeStyle=ink;x.stroke();
  /* nom, poste, numéro */
  x.fillStyle=ink;x.textAlign='center';x.textBaseline='middle';
  const nom=((L.nom||'').trim()||'Prénom Nom').toUpperCase(),poste=((L.poste||'').trim()||'Poste').toUpperCase();
  fitText(x,nom,470,`700 Spx ${AP}`,24,15);x.fillText(nom,cx,oy+211+16+20);
  fitText(x,poste,470,`500 Spx ${AP}`,20,13);x.fillText(poste,cx,oy+211+16+40+12);
  x.save();x.translate(wx+32+49,wy+61.14);x.rotate(-10*Math.PI/180);x.font=`700 48px ${AP}`;x.fillText('#'+(String(L.num||'01').replace(/^#/,'')||'01'),0,0);x.restore();
  x.restore();
  /* contour du bloc : tracé après coup pour suivre les coins arrondis */
  rr(x,X+1,Y+1,S-2,S-2,31);x.lineWidth=2;x.strokeStyle=ink;x.stroke();
}

/* ---------- page Cover toolbox ---------- */
const T={name:'',label:'Tool',shot:null,zoom:1,dx:0,dy:0};
try{const s=JSON.parse(localStorage.getItem('yb-covers-tool')||'null');if(s){if('name' in s)T.name=s.name;if('label' in s)T.label=s.label}}catch(e){}
const save=()=>{try{localStorage.setItem('yb-covers-tool',JSON.stringify({name:T.name,label:T.label}))}catch(e){}};

function pageToolbox(C){
  const {$,$$,esc,ic,toast,main}=C;let cv=null;
  main.innerHTML=`<div class="cv"><div class="cv-head"><div><div class="page-h"><h1>Cover <b>toolbox</b></h1></div><p class="lead">Nom du tool, une capture d’écran, exporte. Le format correspond à celui du site.</p></div><span class="stk" aria-hidden="true">${ic('Toolbox',40)}</span></div>
  <div class="cv-grid">
   <form class="cv-form" onsubmit="return false">
    <h2>Tool</h2>
    <label class="cv-f"><span>Nom du tool</span><textarea id="tbname" rows="2" placeholder="Ex. Opportunity Solution Tree" autocomplete="off">${esc(T.name)}</textarea><small class="cv-hint">Entrée pour revenir à la ligne (3 lignes maximum).</small></label>
    <label class="cv-f"><span>Libellé</span><input id="tblabel" type="text" maxlength="14" value="${esc(T.label)}" placeholder="Tool" autocomplete="off"></label>
    <h2>Capture</h2>
    <label class="cv-drop" id="tbdrop"><input id="tbfile" type="file" accept="image/png,image/webp,image/jpeg" hidden>${ic('UploadSimple',22)}<span><b>${T.shot?'Changer la capture':'Choisir une capture'}</b><small>PNG, JPG ou WebP, glisse-la ici</small></span></label>
    <label class="cv-f"><span>Zoom</span><input id="tbzoom" type="range" min="100" max="300" value="${Math.round(T.zoom*100)}"></label>
    <div class="cv-inline"><button type="button" class="cv-link" id="tbcenter">Recentrer</button><button type="button" class="cv-link" id="tbreset">Tout réinitialiser</button></div>
   </form>
   <div class="cv-stage cv-stage--wide">
    <div class="cv-canvas cv-canvas--wide" id="tbwrap"><canvas id="tbc" aria-label="Aperçu de la cover toolbox"></canvas></div>
    <p class="cv-hint">Glisse la capture pour la recadrer. Format 1109 × 748, prêt pour Webflow.</p>
    <div class="cv-actions"><button type="button" class="y-btn y-btn--primary y-btn--md" id="tbexport">${ic('DownloadSimple')}<span>Exporter en PNG</span></button>
     <label class="cv-check"><input id="tbhd" type="checkbox" checked> Haute définition (2218 px)</label></div>
   </div>
  </div></div>`;
  cv=$('#tbc');C.cvFitStage();
  const draw=()=>toolRender(cv,1,T);
  const bind=(id,k)=>$('#'+id).addEventListener('input',e=>{T[k]=e.target.value;save();draw()});
  bind('tbname','name');bind('tblabel','label');
  $('#tbzoom').addEventListener('input',e=>{T.zoom=e.target.value/100;draw()});
  $('#tbcenter').onclick=()=>{T.zoom=1;T.dx=0;T.dy=0;$('#tbzoom').value=100;draw()};
  $('#tbreset').onclick=()=>{Object.assign(T,{name:'',label:'Tool',shot:null,zoom:1,dx:0,dy:0});save();pageToolbox(C)};
  const take=async fl=>{const f0=fl&&fl[0];if(!f0)return;if(!/^image\//.test(f0.type)){toast('Format non pris en charge');return}
    try{T.shot=await C.cvImg(URL.createObjectURL(f0));T.zoom=1;T.dx=0;T.dy=0;pageToolbox(C)}catch(e){toast('Image illisible')}};
  $('#tbfile').addEventListener('change',e=>take(e.target.files));
  [$('#tbdrop'),$('#tbwrap')].forEach(el=>{el.addEventListener('dragover',e=>{e.preventDefault();el.classList.add('over')});el.addEventListener('dragleave',()=>el.classList.remove('over'));el.addEventListener('drop',e=>{e.preventDefault();el.classList.remove('over');take(e.dataTransfer.files)})});
  let drag=null;const k=()=>W/cv.getBoundingClientRect().width;
  cv.addEventListener('pointerdown',e=>{if(!T.shot)return;drag={x:e.clientX,y:e.clientY,dx:T.dx,dy:T.dy};cv.setPointerCapture(e.pointerId);cv.classList.add('grab')});
  cv.addEventListener('pointermove',e=>{if(!drag)return;T.dx=drag.dx+(e.clientX-drag.x)*k();T.dy=drag.dy+(e.clientY-drag.y)*k();draw()});
  const up=()=>{drag=null;cv.classList.remove('grab')};cv.addEventListener('pointerup',up);cv.addEventListener('pointercancel',up);
  $('#tbexport').onclick=async()=>{const b=$('#tbexport');b.disabled=true;
    try{await assets();const c=document.createElement('canvas');toolRender(c,$('#tbhd').checked?2:1,T);
      const blob=await new Promise(r=>c.toBlob(r,'image/png'));await C.saveFile('toolbox-'+(C.slug((T.name||'tool').replace(/\n/g,' ').normalize('NFD').replace(/[̀-ͯ]/g,''))||'tool')+'.png',blob)}
    catch(e){toast('Export impossible')}finally{b.disabled=false}};
  assets().then(draw);
}
window.YB_SITE={assets,toolRender,liveWebRender,pageToolbox};
})();
