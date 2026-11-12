/* Générateur de signature mail Yeita. Lit data/brand.js (source unique de la marque).
   Appelé par le Yeitibook : window.YB_SIGNATURE({$, esc, ic, toast, main}). */
(function(){
'use strict';
var KEY='yb-signature', SIG=null, DATA={};

function load(){
  var B=window.YB_BRAND, s={};
  try{s=JSON.parse(localStorage.getItem(KEY)||'{}')}catch(e){s={}}
  ['name','role','phone','email'].forEach(function(k){if(typeof s[k]!=='string')s[k]=''});
  if(typeof s.addr!=='boolean')s.addr=true;
  s.icons=s.icons||{};
  B.pictos.forEach(function(p){
    var i=s.icons[p.k]=s.icons[p.k]||{on:false,url:''};
    if(!i.url)i.url=p.def||'';
  });
  return s;
}
function save(){try{localStorage.setItem(KEY,JSON.stringify(SIG))}catch(e){}}
function cleanUrl(u){u=(u||'').trim();if(!u)return'';return /^https?:\/\//i.test(u)?u:'https://'+u}
function telHref(p){
  var d=p.replace(/[^\d+]/g,'');
  if(d.charAt(0)==='+')return d;
  if(d.indexOf('00')===0)return '+'+d.slice(2);
  if(d.charAt(0)==='0')return '+33'+d.slice(1);
  return d;
}
/* Source d'une image : fichier du Yeitibook pour l'aperçu ; pour la copie, URL publique si imgBase est renseigné, sinon base64 */
function imgSrc(file,forCopy){
  var B=window.YB_BRAND;
  if(!forCopy)return file;
  if(B.imgBase)return B.imgBase.replace(/\/?$/,'/')+file.split('/').pop();
  return DATA[file]||new URL(file,location.href).href;
}
function preload(){
  var B=window.YB_BRAND, files=[B.logo].concat(B.pictos.map(function(p){return p.file}));
  return Promise.all(files.map(function(f){
    if(DATA[f])return null;
    return fetch(f).then(function(r){return r.blob()}).then(function(b){
      return new Promise(function(ok,ko){var fr=new FileReader();fr.onload=function(){DATA[f]=fr.result;ok()};fr.onerror=ko;fr.readAsDataURL(b)});
    }).catch(function(){});
  }));
}

function build(esc,s,forCopy){
  var B=window.YB_BRAND, C=B.couleurs, F='font-family:Arial,Helvetica,sans-serif;';
  var name=s.name.trim()||'Prénom Nom', role=s.role.trim(), phone=s.phone.trim(), email=s.email.trim();
  var h='<table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;width:auto;'+F+'">';
  h+='<tr><td style="border:0;padding:0 0 12px 0;"><a href="'+esc(B.site)+'" target="_blank" style="text-decoration:none;border:0;"><img src="'+esc(imgSrc(B.logo,forCopy))+'" alt="'+esc(B.nom)+'" width="96" height="42" style="display:block;border:0;width:96px;height:42px;"></a></td></tr>';
  h+='<tr><td style="border:0;padding:0;'+F+'font-size:15px;line-height:20px;font-weight:bold;color:'+C.noir+';">'+esc(name)+'</td></tr>';
  if(role)h+='<tr><td style="border:0;padding:0;'+F+'font-size:13px;line-height:18px;color:'+C.gris+';">'+esc(role)+'</td></tr>';
  h+='<tr><td style="border:0;padding:12px 0;"><div style="width:40px;height:2px;background:'+C.violet+';line-height:2px;font-size:2px;">&nbsp;</div></td></tr>';
  var sep='<span style="color:'+C.filet+';">&nbsp;&nbsp;|&nbsp;&nbsp;</span>', l1=[];
  if(phone)l1.push('<a href="tel:'+esc(telHref(phone))+'" style="color:'+C.noir+';text-decoration:none;">'+esc(phone)+'</a>');
  if(email)l1.push('<a href="mailto:'+esc(email)+'" style="color:'+C.noir+';text-decoration:none;">'+esc(email)+'</a>');
  if(l1.length)h+='<tr><td style="border:0;padding:0;'+F+'font-size:13px;line-height:20px;color:'+C.noir+';">'+l1.join(sep)+'</td></tr>';
  var l2=['<a href="'+esc(B.site)+'" target="_blank" style="color:'+C.violet+';text-decoration:none;">'+esc(B.site.replace(/^https?:\/\/(www\.)?/,''))+'</a>'];
  if(s.addr&&B.adresse)l2.push(esc(B.adresse));
  h+='<tr><td style="border:0;padding:0;'+F+'font-size:13px;line-height:20px;color:'+C.gris+';">'+l2.join(sep)+'</td></tr>';
  var cells='';
  B.pictos.forEach(function(p){
    var st=s.icons[p.k]; if(!st||!st.on)return;
    var img='<img src="'+esc(imgSrc(p.file,forCopy))+'" alt="'+esc(p.label)+'" width="28" height="28" style="display:block;border:0;width:28px;height:28px;">';
    var url=cleanUrl(st.url);
    cells+='<td style="border:0;padding:0 8px 0 0;">'+(url?'<a href="'+esc(url)+'" target="_blank" style="text-decoration:none;border:0;">'+img+'</a>':img)+'</td>';
  });
  if(cells)h+='<tr><td style="border:0;padding:14px 0 0 0;"><table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;width:auto;"><tr>'+cells+'</tr></table></td></tr>';
  h+='<tr><td style="border:0;padding:14px 0 0 0;"><table cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;width:auto;"><tr><td bgcolor="'+C.violet+'" style="border:0;background-color:'+C.violet+';border-radius:8px;padding:10px 18px;"><a href="'+esc(B.newsletter)+'" target="_blank" style="'+F+'font-size:13px;line-height:18px;font-weight:bold;color:'+C.blanc+';text-decoration:none;display:inline-block;">Rejoindre notre newsletter &rarr;</a></td></tr></table></td></tr>';
  return h+'</table>';
}

window.YB_SIGNATURE=function(ctx){
  var $=ctx.$, esc=ctx.esc, ic=ctx.ic, toast=ctx.toast, main=ctx.main, B=window.YB_BRAND;
  if(!B){main.innerHTML='<div class="page-h"><h1>Signature mail</h1></div><p class="lead">Le fichier data/brand.js est introuvable.</p>';return}
  SIG=SIG||load();
  var field=function(id,l,v,ph,mode){return '<label class="cv-f"><span>'+l+'</span><input id="'+id+'" type="text" inputmode="'+(mode||'text')+'" value="'+esc(v)+'" placeholder="'+ph+'" autocomplete="off"></label>'};
  var pics=B.pictos.map(function(p){
    var st=SIG.icons[p.k];
    return '<div class="sg-pic"><label class="cv-check"><input type="checkbox" data-pk="'+p.k+'"'+(st.on?' checked':'')+'><img src="'+p.file+'" alt="" width="24" height="24" style="border-radius:6px"><span>'+esc(p.label)+'</span></label>'
      +'<div class="cv-f" data-pw="'+p.k+'"'+(st.on?'':' hidden')+'><input type="text" inputmode="url" data-pu="'+p.k+'" value="'+esc(st.url)+'" placeholder="'+esc(p.ph)+'" aria-label="URL '+esc(p.label)+'" autocomplete="off"></div>'
      +'<p class="cv-hint" data-pm="'+p.k+'" hidden>Sans URL, le picto s’affiche mais n’est pas cliquable.</p></div>';
  }).join('');
  main.innerHTML='<div class="cv"><div class="cv-head"><div><div class="page-h"><h1>Signature <b>email</b></h1></div><p class="lead">Remplis tes infos, vérifie l’aperçu, copie la signature, colle-la dans Gmail.</p></div><span class="stk" aria-hidden="true">'+ic('EnvelopeSimple',40)+'</span></div>'
  +'<div class="cv-grid"><form class="cv-form" onsubmit="return false">'
  +'<h2>Tes infos</h2>'
  +field('sgname','Nom complet',SIG.name,'Prénom Nom')
  +field('sgrole','Poste',SIG.role,'Product Designer &amp; AI Builder')
  +'<div class="cv-row">'+field('sgphone','Téléphone',SIG.phone,'06 00 00 00 00','tel')+field('sgmail','Email',SIG.email,'prenom.nom@yeita.fr','email')+'</div>'
  +'<label class="cv-check"><input type="checkbox" id="sgaddr"'+(SIG.addr?' checked':'')+'><span>Afficher l’adresse du bureau</span></label>'
  +'<h2>Pictos</h2><p class="cv-hint">Coche ceux à afficher, puis vérifie l’URL de chaque page.</p>'+pics
  +'</form>'
  +'<div class="cv-stage"><div class="cv-frame"><div class="sg-sheet"><div id="sgprev"></div></div></div>'
  +'<div class="cv-actions"><button type="button" class="y-btn y-btn--primary y-btn--md" id="sgcopy">'+ic('Copy',20)+'<span>Copier la signature</span></button></div>'
  +'<details class="cv-tips" style="margin-top:14px"><summary>Comment l’installer dans Gmail</summary><ul>'
  +'<li><b>Copier</b> : clique sur Copier la signature.</li>'
  +'<li><b>Ouvrir Gmail</b> : roue dentée, Voir tous les paramètres, onglet Général, section Signature.</li>'
  +'<li><b>Coller</b> : clique sur Créer, nomme-la, colle avec Ctrl ou Cmd + V.</li>'
  +'<li><b>Enregistrer</b> : choisis-la par défaut, puis Enregistrer les modifications tout en bas.</li>'
  +'<li><b>Logo ou pictos absents après le collage ?</b> Gmail bloque parfois les images collées. Clic droit sur l’image dans l’aperçu, Enregistrer l’image sous, puis dans l’éditeur Gmail : icône image, importer le fichier, taille Petit.</li>'
  +'</ul></details></div></div></div>';

  var prev=$('#sgprev');
  var render=function(){prev.innerHTML=build(esc,SIG,false)};
  var bindText=function(id,k){$('#'+id).addEventListener('input',function(e){SIG[k]=e.target.value;save();render()})};
  bindText('sgname','name');bindText('sgrole','role');bindText('sgphone','phone');bindText('sgmail','email');
  $('#sgaddr').addEventListener('change',function(e){SIG.addr=e.target.checked;save();render()});
  var sync=function(k){
    var st=SIG.icons[k];
    $('[data-pw="'+k+'"]').hidden=!st.on;
    $('[data-pm="'+k+'"]').hidden=!(st.on&&!cleanUrl(st.url));
  };
  B.pictos.forEach(function(p){
    var st=SIG.icons[p.k];
    $('[data-pk="'+p.k+'"]').addEventListener('change',function(e){st.on=e.target.checked;save();sync(p.k);render()});
    $('[data-pu="'+p.k+'"]').addEventListener('input',function(e){st.url=e.target.value;save();sync(p.k);render()});
    sync(p.k);
  });
  render();
  preload();

  $('#sgcopy').addEventListener('click',function(){
    var btn=$('#sgcopy'); btn.disabled=true;
    preload().then(function(){
      var box=document.createElement('div');
      box.style.cssText='position:fixed;left:-10000px;top:0;width:600px;background:#fffdf9';
      box.innerHTML=build(esc,SIG,true);
      document.body.appendChild(box);
      var done=false;
      try{
        var r=document.createRange(); r.selectNode(box);
        var sel=window.getSelection(); sel.removeAllRanges(); sel.addRange(r);
        done=document.execCommand('copy'); sel.removeAllRanges();
      }catch(e){}
      var finish=function(ok){box.remove();btn.disabled=false;toast(ok?'Signature copiée, colle-la dans Gmail':'Copie impossible')};
      if(!done&&navigator.clipboard&&window.ClipboardItem){
        navigator.clipboard.write([new ClipboardItem({'text/html':new Blob([box.innerHTML],{type:'text/html'})})]).then(function(){finish(true)},function(){finish(false)});
      }else finish(done);
    });
  });
};
})();
