/* Shared engine for the Explore assignments. Do not put assignment content here: edit assignment.js instead. */
(function(){
'use strict';
/* school logo files sit next to this script, in engine/brand/ */
var BRAND=new URL('brand/',(document.currentScript&&document.currentScript.src)||location.href).href;
/* ------------------------------------------------------------------ */
/* Page frame: header, stay-on-page warning, progress bars             */
/* ------------------------------------------------------------------ */
function injectPage(){
  var A2=window.ASSIGNMENT, head=document.head;
  document.title=A2.title;
  if(!document.documentElement.lang) document.documentElement.lang='en';
  [['preconnect','https://fonts.googleapis.com',false],['preconnect','https://fonts.gstatic.com',true],
   ['stylesheet','https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400;1,700&family=Bricolage+Grotesque:wght@600;800&family=Cabin:wght@700&display=swap',false]
  ].forEach(function(l){var e=document.createElement('link'); e.rel=l[0]; e.href=l[1]; if(l[2]) e.crossOrigin=''; head.appendChild(e);});
  if(!head.querySelector('link[rel~="icon"]')){ var fav=document.createElement('link'); fav.rel='icon'; fav.type='image/png'; fav.href=BRAND+'favicon.png'; head.appendChild(fav); }
  var tc=document.createElement('meta'); tc.name='theme-color'; tc.content='#2d2926'; head.appendChild(tc);
  var icon=A2.icon||'<svg viewBox="0 0 64 72" aria-hidden="true" focusable="false"><rect x="6" y="10" width="52" height="52" rx="12" fill="var(--primary)"/><path d="M26 24 L46 36 L26 48 Z" fill="var(--primary-ink)"/></svg>';
  var tracks='', groups=A2.board?(A2.board.categories||[]):(A2.parts||[]);
  groups.forEach(function(p,i){
    var n=i+1, lab=A2.board?String(p.title||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;'):(A2.partWord||'Part')+' '+n;
    tracks+='<div class="track" id="trk'+n+'"><span class="tl">'+lab+'</span><div class="tt" role="progressbar" aria-label="'+lab+' progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><div class="tf"></div></div></div>';
  });
  /* the only things that open a new tab are the pictures in a part (figureEl) */
  var hasPics=!A2.board&&(A2.parts||[]).some(function(p){return (p.images||[]).length;});
  document.body.insertAdjacentHTML('afterbegin',
    '<div class="wrap"><div class="brand"><img src="'+BRAND+'eagle.png" alt="">Elite Academic Academy</div>'
    +'<header class="top"><div class="titlerow">'+icon+'<div><h1 class="display"></h1><p class="course"></p></div></div>'
    +'<div class="namerow"><label for="first">First name</label><input type="text" id="first" autocomplete="given-name" placeholder="First name">'
    +'<label for="last">Last name</label><input type="text" id="last" autocomplete="family-name" placeholder="Last name"></div>'
    +'<div class="maskrow"><span class="tipwrap" id="maskWrap"><button type="button" class="switch" id="maskSw" role="switch" aria-checked="false" aria-labelledby="maskLbl" aria-describedby="maskHint"><span class="knob"></span></button>'
    +'<label for="maskSw" id="maskLbl" class="masklbl">Focus</label>'
    +'<span id="maskHint" class="tip" role="tooltip">Fades out everything except the section you are working on. Click a section, or scroll to it, to bring it into focus.</span></span></div>'
    +'<div class="ttsrow" id="ttsrow" hidden><span>Use the Listen buttons on this page if you would like to have the content read to you.</span>'
    +'<span class="pair"><label for="ttsRate">Speed</label><select id="ttsRate"><option value="0.8">Slow</option><option value="0.95">Normal</option><option value="1.15">Fast</option></select></span></div></header>'
    +'<aside class="warn" role="alert" aria-labelledby="warnh"><h2 id="warnh" class="display">Stay on this page until you finish</h2>'
    +'<p><strong>If you close this tab, refresh the page, or leave it for another website, your progress may be lost and you will have to start over.</strong></p>'
    +'<ul>'+(hasPics?'<li>Selecting a picture opens it full size in a new tab. Keep this tab open and come back to it to enter your answers.</li>':'')
    +'<li>Do not use your browser’s back button or refresh button.</li>'
    +'<li>When you finish, scroll to the bottom, download your PDF, and upload it to the Canvas assignment.</li></ul>'
    +'<p class="small">This page keeps a backup copy in your browser as you work, but don’t count on it. It disappears if you switch devices, use a private window, or clear your browser data.</p></aside>'
    +'<div class="bar" aria-label="Your progress"><div class="tracks">'+tracks+'</div>'
    +'<div class="statsrow"><span id="sSaved"></span></div></div>'
    +'<main id="app"></main><noscript><p>This page needs JavaScript. Please open it in a current browser.</p></noscript>'
    +'<footer class="sitefoot"><img src="'+BRAND+'logo.png" alt="Elite Academic Academy"><p>In a world where you can be anything, Be Elite.</p></footer></div>');
  document.querySelector('h1.display').textContent=A2.title;
  if(/[?&]teacher=tm7k2q(&|$)/.test(location.search)){
    var tv=document.createElement('p'); tv.className='teachview'; tv.setAttribute('role','note');
    tv.textContent='Teacher view: every part is open and copy and paste work. Answers you enter here are saved separately from student work. Students should use the link without "?teacher=…".';
    document.querySelector('header.top').after(tv);
  }
  document.querySelector('p.course').textContent=A2.course;
}


var A=window.ASSIGNMENT;
if(!A||!(A.video||A.board||A.parts)){ document.body.textContent='This page needs an assignment.js file with window.ASSIGNMENT defined.'; return; }
var TITLE=A.title, COURSE=A.course, BOARD=A.board||null;
/* game board: tries per answer, and the share of the points earned on try 1, 2, 3 */
var MAXT=BOARD?(BOARD.tries||3):0, CREDIT=(BOARD&&BOARD.credit)||[1,0.5,0.25];
injectPage();

/* ------------------------------------------------------------------ */
/* State and saving                                                    */
/* ------------------------------------------------------------------ */
/* Teacher view: the assignment link plus ?teacher=tm7k2q opens every part at once, shows the Finish section, allows
   copy and paste, and saves under its own key so it never mixes with a student's progress on the same computer. */
var TEACHER=/[?&]teacher=tm7k2q(&|$)/.test(location.search);
/* Supported version (an accommodation): the assignment link plus ?support=eagle shows each question's easier wording
   (`easy` in assignment.js) and fewer answer choices. It saves under the same key, so a student can switch links
   without losing work. Nothing on the page or in the PDF says it is the supported version. */
var SUPPORT=/[?&]support=eagle(&|$)/.test(location.search);
/* In the supported version a drop-down or multiple choice question shows the right answer and two wrong ones (plus a
   choice the student already saved). The wrong ones are picked the same way every time, and the order stays the same. */
function fewer(id,options,right,keep){
  if(!SUPPORT||!options||options.length<=3) return options;
  var wrong=options.filter(function(o){return right.indexOf(o)<0;});
  if(right.length+2>=options.length) return options;
  var seed=0; ((A.storageKey||TITLE)+id).split('').forEach(function(c){seed=(seed*31+c.charCodeAt(0))>>>0;});
  var pick=wrong.map(function(o,i){var x=(seed^((i+1)*2654435761))>>>0; x^=x>>>15; x=(x*2246822507)>>>0; x^=x>>>13; return {o:o,k:x};})
    .sort(function(a,b){return a.k-b.k;}).slice(0,2).map(function(p){return p.o;});
  return options.filter(function(o){return right.indexOf(o)>=0||pick.indexOf(o)>=0||(keep&&keep.indexOf(o)>=0);});
}
var KEY=(A.storageKey||('assignment-'+TITLE))+(TEACHER?'|teacher':''), storageOK=true, lastSaved=null, finished=false;
function fresh(){return {tts:0.95,voice:'',name:'',first:'',last:'',time:0,started:new Date().toISOString(),auto:{},written:{},rich:{},photos:{},agree:{},open:false,mn:[],mnRes:[],vids:{},graphs:{}};}
function fullName(){return ((S.first||'').trim()+' '+(S.last||'').trim()).trim();}
function copyMeta(f,o){
  f.name=typeof o.name==='string'?o.name:'';
  f.first=typeof o.first==='string'?o.first:(f.name||'');
  f.last=typeof o.last==='string'?o.last:'';
  f.time=typeof o.time==='number'&&o.time>=0?o.time:0;
  if(typeof o.started==='string') f.started=o.started;
  if(o.vids&&typeof o.vids==='object') f.vids=o.vids;
  f.auto=(o.auto&&typeof o.auto==='object')?o.auto:{};
  f.written=(o.written&&typeof o.written==='object')?o.written:{};
  f.rich=(o.rich&&typeof o.rich==='object')?o.rich:{};
  f.photos=(o.photos&&typeof o.photos==='object')?o.photos:{};
  f.agree=(o.agree&&typeof o.agree==='object')?o.agree:{};
  f.open=!!o.open;
  f.mn=Array.isArray(o.mn)?o.mn.slice(0,20).map(function(x){return String(x==null?'':x);}):[];
  f.mnRes=Array.isArray(o.mnRes)?o.mnRes.slice(0,20):[];
  f.graphs=(o.graphs&&typeof o.graphs==='object')?o.graphs:{};
  f.tts=(o.tts===0.8||o.tts===1.15)?o.tts:0.95;
  f.voice=o.voice==='male'?'male':'';
  f.onPart=typeof o.onPart==='number'&&o.onPart>=1?Math.floor(o.onPart):0;
}
function load(){
  try{
    var r=localStorage.getItem(KEY);
    if(r){
      var o=JSON.parse(r);
      if(o&&typeof o==='object'){ var f=fresh(); copyMeta(f,o); return f; }
    }
  }catch(e){storageOK=false;}
  return fresh();
}
var S=load();
function save(){
  try{localStorage.setItem(KEY,JSON.stringify(S)); storageOK=true; lastSaved=new Date();}
  catch(e){storageOK=false;}
}
save();

/* ------------------------------------------------------------------ */
/* Small helpers                                                       */
/* ------------------------------------------------------------------ */
var $=function(s,r){return (r||document).querySelector(s);};
function h(tag,cls,txt){
  var e=document.createElement(tag);
  if(cls)e.className=cls;
  if(txt!=null)e.textContent=txt;
  return e;
}
function hh(tag,cls,markup){var e=h(tag,cls); e.innerHTML=markup; return e;} /* static, trusted markup only */
function mark(el){el.setAttribute('data-c','');return el;}
/* *text* marks a scientific name, shown in italics */
function itxt(t){
  var f=document.createDocumentFragment();
  String(t).split('*').forEach(function(p,i){
    if(!p) return;
    if(i%2){var e=document.createElement('i'); e.textContent=p; f.append(e);} else f.append(document.createTextNode(p));
  });
  return f;
}
function plain(t){return String(t).replace(/\*/g,'');}
function words(t){var m=String(t||'').trim().match(/\S+/g); return m?m.length:0;}

/* Video watch tracking: records each second actually played at normal flow */
var VID_DONE=95;
/* Videos: the full video plus one short clip per part, all from assignment.js. An assignment may have no video
   (for example station cards): then the top section is the start box and the parts show images instead. */
var VIDS={}, VID_ORDER=[];
if(A.video){
  VIDS.main={n:A.video.seconds,title:A.video.title,label:'Video: '+A.video.title+' (full video)',src:A.video.src};
  VID_ORDER.push('main');
}
(BOARD?[]:A.parts||[]).forEach(function(p,pi){
  (p.clips||[]).forEach(function(k){
    var c=(A.clips||{})[k];
    if(!c){ if(window.console) console.error('Unknown clip: '+k); return; }
    VIDS[k]={n:c.seconds,from:c.from,to:c.to,part:pi+1,title:c.title,src:c.src,of:c.of||'',whole:!!c.whole};
    if(c.whole) VIDS[k].label='Video ('+(A.partWord||'Part')+' '+(pi+1)+'): '+c.title+' (full video)';
    VID_ORDER.push(k);
  });
});
/* a clip normally comes from the full video at the top; "of" names a different video it was cut from */
function clipWhere(v){return fmt(v.from)+' to '+fmt(v.to)+(v.of?' of the video “'+v.of+'”':'');}
function clipLabel(k){var v=VIDS[k]; return v.label||('Clip ('+(A.partWord||'Part')+' '+v.part+'): '+v.title+' ('+clipWhere(v)+')');}
function fmt(sec){sec=Math.round(sec);return Math.floor(sec/60)+':'+String(sec%60).padStart(2,'0');}
function vidState(key){
  if(!S.vids) S.vids={};
  var V=S.vids[key]||(S.vids[key]={w:'',skips:0,rate:1});
  var n=VIDS[key].n;
  if(V.w.length!==n) V.w=(V.w+new Array(n+1).join('0')).slice(0,n);
  return V;
}
function vidStats(key){
  var V=vidState(key), c=0, n=VIDS[key].n;
  for(var i=0;i<V.w.length;i++) if(V.w[i]==='1') c++;
  return {sec:c,n:n,pct:Math.min(100,Math.round(100*c/n)),skips:V.skips||0,rate:V.rate||1};
}
function videoBlock(key){
  var info=VIDS[key];
  var wrap=h('div','vidblock'+(info.from!=null?' clip':''));
  var vid=h('div','vid');
  var v=document.createElement('video');
  v.src=info.src; v.controls=true; v.preload='metadata';
  v.setAttribute('playsinline','');
  v.setAttribute('aria-label',info.title+' video');
  var tr=document.createElement('track'); tr.kind='captions'; tr.label='English'; tr.srclang='en';
  tr.src=String(info.src).replace(/\.mp4$/i,'.vtt'); tr.default=true; v.append(tr);
  vid.append(v);
  if(info.from!=null){
    wrap.append(h('p','vidtitle',info.whole?'Watch the video: '+info.title:info.of?'Watch this clip: '+info.title+' ('+clipWhere(info)+')':'Rewatch just this part: '+info.title+' ('+fmt(info.from)+' to '+fmt(info.to)+' in the full video)'),vid,watchEl(v,key));
    return wrap;
  }
  var alt=h('p','vidalt','Captions are on. Use the CC button on the video to turn them off. Watching it here is what your teacher can track.');
  wrap.append(h('p','vidtitle','Video: '+info.title),vid,watchEl(v,key),alt);
  return wrap;
}
function watchEl(v,key){
  var V=vidState(key), N=VIDS[key].n;
  var arr=V.w.split('');
  var box=h('div','watch');
  var tt=h('div','tt'); var tf=h('div','tf'); tt.append(tf);
  tt.setAttribute('role','progressbar'); tt.setAttribute('aria-label','How much of the '+VIDS[key].title+' video you have watched');
  tt.setAttribute('aria-valuemin','0'); tt.setAttribute('aria-valuemax','100');
  var txt=h('p','vidalt');
  box.append(tt,txt);
  function paint(){
    var st=vidStats(key);
    tf.style.width=st.pct+'%'; tt.setAttribute('aria-valuenow',String(st.pct));
    tf.style.background=st.pct>=VID_DONE?'var(--ok)':'var(--primary)';
    txt.textContent = st.pct>=VID_DONE
      ? 'Video complete. You watched '+fmt(st.sec)+' of '+fmt(N)+'.'
      : 'You have watched '+fmt(st.sec)+' of '+fmt(N)+' ('+st.pct+'%). Your teacher can see how much you watched. Parts you skip don’t count.';
  }
  function save1(){V.w=arr.join('');paint();commit();}
  var last=null;
  function markRange(a,b){
    var changed=false;
    for(var i=Math.max(0,Math.floor(a));i<Math.floor(b)&&i<N;i++){ if(arr[i]!=='1'){arr[i]='1';changed=true;} }
    return changed;
  }
  v.addEventListener('play',function(){last=v.currentTime;});
  v.addEventListener('timeupdate',function(){
    if(v.seeking||v.paused) return;
    var t=v.currentTime;
    if(last===null){last=t;return;}
    var d=t-last;
    if(d>0 && d<1.5*Math.max(1,v.playbackRate)+0.5){ if(markRange(last,t)) save1(); }
    last=t;
  });
  v.addEventListener('seeking',function(){
    if(last!==null && v.currentTime>last+3){
      var jumped=false;
      for(var i=Math.floor(last);i<Math.floor(v.currentTime)&&i<N;i++){ if(arr[i]!=='1'){jumped=true;break;} }
      if(jumped){V.skips=(V.skips||0)+1; commit();}
    }
    last=null;
  });
  v.addEventListener('seeked',function(){last=v.paused?null:v.currentTime;});
  v.addEventListener('ended',function(){
    if(last!==null && last>N-4 && markRange(last,N)) save1();
    last=null;
  });
  v.addEventListener('ratechange',function(){
    if(v.playbackRate>(V.rate||1)){V.rate=v.playbackRate;commit();}
  });
  paint();
  return box;
}

/* registries rebuilt on every render */
var AUTO={}, ORDER=[], TOTAL_A=0, TOTAL_W=0, TOTAL_P=0;

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */
var W={}, R={}, P={};

/* ------------------------------------------------------------------ */
/* Scoring and progress                                                */
/* ------------------------------------------------------------------ */
/* highlighted-text helpers: a response is a list of [text, highlighted] pieces */
function segsPlain(segs){return (segs||[]).map(function(s){return s[0];}).join('');}
/* a highlight is false or a color: 'y' yellow, 'b' blue, 'g' green (true is yellow, from older saves).
   Claim-evidence-reasoning (cer) answers use all three: claim blue, evidence yellow, expand green. */
var HLC={y:'rgb(255, 255, 0)',b:'rgb(0, 255, 255)',g:'rgb(0, 255, 0)'};
var CERW={b:'CLAIM',y:'EVIDENCE',g:'REASONING/EXPAND'};
function hlCode(x){return x===true?'y':(x||false);}
function segsText(segs,cer){
  return (segs||[]).map(function(s){
    var c=hlCode(s[1]); if(!c) return s[0];
    var m=s[0].match(/^(\s*)([\s\S]*?)(\s*)$/);
    if(!m[2]) return s[0];
    return m[1]+(cer?'['+CERW[c]+': '+m[2]+']':'[['+m[2]+']]')+m[3];
  }).join('');
}
function segsHlWords(segs,color){
  return (segs||[]).reduce(function(n,s){var c=hlCode(s[1]); return n+(c&&(!color||c===color)?words(s[0]):0);},0);
}
function cerTag(segs){
  return 'claim (blue) '+segsHlWords(segs,'b')+', evidence (yellow) '+segsHlWords(segs,'y')+', expand (green) '+segsHlWords(segs,'g')+' words highlighted';
}
function isWrittenDone(id){var st=S.written[id]; return !!st&&(st.text||'').trim().length>=W[id].min;}
function isRichDone(id){var st=S.rich[id]; return !!st&&segsPlain(st.segs).trim().length>=R[id].min;}
function isPhotoDone(id){var st=S.photos[id]; return !!(st&&st.has);}
function score(){
  var a=0,w=0,p=0;
  Object.keys(AUTO).forEach(function(id){var r=S.auto[id]; if(r&&r.ok)a++;});
  Object.keys(W).forEach(function(id){if(isWrittenDone(id))w++;});
  Object.keys(R).forEach(function(id){if(isRichDone(id))w++;});
  Object.keys(P).forEach(function(id){if(isPhotoDone(id))p++;});
  return {a:a,w:w,p:p};
}
function hasProgress(){
  if(Object.keys(S.auto).some(function(k){return S.auto[k]&&S.auto[k].v;})) return true;
  if(Object.keys(S.written).some(function(k){return S.written[k]&&S.written[k].text;})) return true;
  if(Object.keys(S.rich).some(function(k){return S.rich[k]&&segsPlain(S.rich[k].segs).trim();})) return true;
  if(Object.keys(S.agree).some(function(k){return S.agree[k]&&((S.agree[k].on||[]).some(Boolean)||S.agree[k].sign);})) return true;
  if(Object.keys(S.photos).some(function(k){return S.photos[k]&&(S.photos[k].has||S.photos[k].cap);})) return true;
  if(Object.keys(S.graphs||{}).some(function(k){var g=S.graphs[k]; return g&&g.f;})) return true;
  return (S.mn||[]).some(function(x){return x;});
}
function updateBar(){
  gateCheck();
  document.querySelectorAll('section.task[data-task]').forEach(function(sec){
    var n=sec.dataset.task, c=[].slice.call(sec.querySelectorAll('[data-c]'));
    var ok=c.filter(function(e){return e.dataset.s==='ok';}).length;
    var pct=c.length?Math.round(100*ok/c.length):0;
    var trk=$('#trk'+n);
    $('.tf',trk).style.width=pct+'%';
    $('.tt',trk).setAttribute('aria-valuenow',String(pct));
  });
  document.querySelectorAll('.q').forEach(function(q){
    var c=[].slice.call(q.querySelectorAll('[data-c]'));
    if(!c.length) return;
    var ok=c.filter(function(e){return e.dataset.s==='ok';}).length;
    var bad=c.some(function(e){return e.dataset.s==='bad';});
    q.dataset.s= ok===c.length?'done':(bad?'bad':(ok>0?'partial':'idle'));
  });
  if(BOARD) paintBoard(); else applyGate();
  var sv=$('#sSaved');
  if(!storageOK) sv.textContent='This browser can’t keep a backup. Stay on this page.';
  else if(lastSaved) sv.textContent='Backup saved at '+lastSaved.toLocaleTimeString([], {hour:'numeric',minute:'2-digit'});
}
function commit(){save();updateBar();}

/* On a game board a right answer, or the last wrong try, locks the answer */
function isLocked(r){return !!(BOARD&&r&&r.v&&(r.ok||(r.miss||0)>=MAXT));}
function triesMsg(r,tip){
  var left=MAXT-((r&&r.miss)||0);
  if(left<=0) return 'Not quite. You are out of tries, so this answer is locked.';
  return 'Not quite. '+(tip?'Tip: '+tip+' ':'')+'You have '+left+(left===1?' try':' tries')+' left.';
}

/* ------------------------------------------------------------------ */
/* Builders: auto-checked dropdown                                     */
/* ------------------------------------------------------------------ */
function autoSelect(id,sum,options,answer,o){
  o=o||{};
  AUTO[id]={sum:sum};
  ORDER.push({kind:'auto',id:id,label:sum,q:CURQ,sub:o.sub||o.label||''});
  var wrap=h('div','ctl'); mark(wrap); wrap.dataset.s='idle';
  if(o.label){var l=h('label'); l.append(itxt(o.label)); l.htmlFor='f-'+id; wrap.append(l);}
  var sel=h('select'); sel.id='f-'+id;
  if(o.aria) sel.setAttribute('aria-label',o.aria);
  sel.append(new Option('Choose an answer…',''));
  options.forEach(function(t){sel.append(new Option(t,t));});
  wrap.append(sel);
  var st=h('span','st'); st.setAttribute('aria-hidden','true'); wrap.append(st);
  var msg=h('p','msg'); msg.setAttribute('aria-live','polite'); msg.id='m-'+id; sel.setAttribute('aria-describedby','m-'+id); wrap.append(msg);
  function text(r){
    if(r.ok) return 'Correct.'+(o.ok?' '+o.ok:'');
    if(BOARD) return triesMsg(r,o.hint);
    return 'Not yet. Tip: '+(o.hint||'Look back at the reading and try again.');
  }
  function paint(){
    var r=S.auto[id];
    sel.value=(r&&r.v)?r.v:'';
    sel.disabled=isLocked(r);
    if(!r||!r.v){wrap.dataset.s='idle'; st.textContent=''; msg.textContent=''; return;}
    wrap.dataset.s=r.ok?'ok':'bad';
    st.textContent=r.ok?'✓':'✗';
    msg.textContent=text(r);
  }
  sel.addEventListener('change',function(){
    var prev=S.auto[id]||{miss:0}, v=sel.value;
    if(!v){S.auto[id]={v:'',ok:false,miss:prev.miss||0};}
    else{var ok=(v===answer); S.auto[id]={v:v,ok:ok,miss:(prev.miss||0)+(ok?0:1)};}
    paint(); commit();
  });
  paint();
  return wrap;
}

/* multiple choice (radio buttons) */
function choiceQ(id,sum,options,ansIdx,explain,tip){
  AUTO[id]={sum:sum};
  ORDER.push({kind:'auto',id:id,label:sum,q:CURQ,sub:''});
  var wrap=h('div','ctl'); mark(wrap); wrap.dataset.s='idle';
  var opts=[];
  options.forEach(function(t,i){
    var lab=h('label','opt'); var inp=document.createElement('input'); inp.type='radio'; inp.name='r-'+id; inp.value=t;
    var sp=h('span'); sp.append(itxt(t)); lab.append(inp,sp);
    inp.addEventListener('change',function(){
      var prev=S.auto[id]||{miss:0}, ok=(i===ansIdx);
      S.auto[id]={v:t,ok:ok,miss:(prev.miss||0)+(ok?0:1)};
      paint(); commit();
    });
    opts.push({lab:lab,inp:inp,t:t}); wrap.append(lab);
  });
  var msg=h('p','msg'); msg.setAttribute('aria-live','polite'); wrap.append(msg);
  function paint(){
    var r=S.auto[id];
    opts.forEach(function(o){
      var on=!!r&&r.v===o.t; o.inp.checked=on; o.inp.disabled=isLocked(r);
      if(on) o.lab.dataset.s=r.ok?'ok':'bad'; else o.lab.removeAttribute('data-s');
    });
    if(!r||!r.v){wrap.dataset.s='idle'; msg.textContent=''; return;}
    wrap.dataset.s=r.ok?'ok':'bad';
    msg.textContent='';
    if(r.ok) msg.append('Correct.',explain?' ':'',itxt(explain||''));
    else if(BOARD) msg.append(itxt(triesMsg(r,tip)));
    else msg.append('Not quite. Tip: ',itxt(tip||'Look back at the reading and try another choice.'));
  }
  paint();
  return wrap;
}

/* typed answer with a Check button */
function typedCheck(id,sum,expected,okMsg,badMsg,aria,o){
  o=o||{};
  AUTO[id]={sum:sum};
  ORDER.push({kind:'auto',id:id,label:sum,q:CURQ,sub:o.sub||''});
  var wrap=h('div','ctl'); mark(wrap); wrap.dataset.s='idle';
  var row=h('div','row');
  var inp=h('input'); inp.type='text'; inp.id='f-'+id; inp.autocomplete='off'; inp.spellcheck=false; inp.autocapitalize='off';
  inp.setAttribute('aria-label',aria); inp.setAttribute('aria-describedby','m-'+id);
  var btn=h('button','btn','Check'); btn.type='button';
  var st=h('span','st'); st.setAttribute('aria-hidden','true');
  if(o.unit){ inp.classList.add('num'); row.append(inp,h('span','unit',o.unit),btn,st); } else row.append(inp,btn,st);
  var msg=h('p','msg'); msg.id='m-'+id; msg.setAttribute('aria-live','polite');
  wrap.append(row,msg);
  function paint(){
    var r=S.auto[id];
    inp.value=r?r.v:'';
    inp.disabled=btn.disabled=isLocked(r);
    if(!r||!r.v){wrap.dataset.s='idle';st.textContent='';msg.textContent='';return;}
    wrap.dataset.s=r.ok?'ok':'bad';
    st.textContent=r.ok?'✓':'✗';
    msg.textContent=r.ok?okMsg:(typeof badMsg==='function'?badMsg(r.v):badMsg);
  }
  function check(){
    var v=inp.value.trim().replace(/\s+/g,' '), prev=S.auto[id]||{miss:0};
    if(!v) return;
    var ok=typeof expected==='function'?expected(v):(v===expected);
    S.auto[id]={v:v,ok:ok,miss:(prev.miss||0)+(ok?0:1)};
    paint(); commit();
  }
  btn.addEventListener('click',check);
  inp.addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();check();}});
  paint();
  return wrap;
}

/* memory trick: eight words that start with the right letters */
function mnWidget(MNW){
  var id='mn';
  AUTO[id]={sum:'Memory trick'};
  ORDER.push({kind:'auto',id:id,label:'Memory trick sentence',q:CURQ,sub:''});
  if(!S.mn||S.mn.length!==MNW.length) S.mn=MNW.map(function(){return '';});
  var wrap=h('div','mnwrap'); mark(wrap); wrap.dataset.s='idle';
  var grid=h('div','mn'), cells=[];
  MNW.forEach(function(r,i){
    var d=h('div','ctl'); d.dataset.s='idle';
    var l=h('label',null,r+' ('+r.charAt(0)+')'); l.htmlFor='f-mn'+i;
    var inp=h('input'); inp.type='text'; inp.id='f-mn'+i; inp.autocomplete='off'; inp.value=S.mn[i]||'';
    inp.addEventListener('input',function(){S.mn[i]=inp.value; S.mnRes=[]; d.dataset.s='idle'; wrap.dataset.s='idle'; msg.textContent=''; S.auto.mn=undefined; delete S.auto.mn; commit();});
    d.append(l,inp); grid.append(d); cells.push({d:d,inp:inp});
  });
  var row=h('div','row');
  var btn=h('button','btn','Check my sentence'); btn.type='button';
  row.append(btn);
  var msg=h('p','msg'); msg.setAttribute('aria-live','polite');
  wrap.append(grid,row,msg);
  function paint(){
    var r=S.auto.mn;
    cells.forEach(function(c,i){ c.d.dataset.s=(S.mnRes&&S.mnRes.length===MNW.length)?(S.mnRes[i]?'ok':'bad'):'idle'; });
    if(!r||!r.v){wrap.dataset.s='idle'; msg.textContent=''; return;}
    var n=(S.mnRes||[]).filter(Boolean).length;
    wrap.dataset.s=r.ok?'ok':'bad';
    msg.textContent=r.ok?'Your sentence works.':n+' of '+MNW.length+' words start with the right letter. Fix the red ones.';
  }
  btn.addEventListener('click',function(){
    var res=cells.map(function(c,i){var v=c.inp.value.trim(); return v.length>1&&v.charAt(0).toUpperCase()===MNW[i].charAt(0);});
    var ok=res.every(Boolean), prev=S.auto.mn||{miss:0};
    S.mnRes=res;
    S.auto.mn={v:S.mn.map(function(x){return x.trim();}).join(' '),ok:ok,miss:(prev.miss||0)+(ok?0:1)};
    paint(); commit();
  });
  paint();
  return wrap;
}

/* ------------------------------------------------------------------ */
/* Builders: helpers shared by the activity types below                */
/* ------------------------------------------------------------------ */
/* a shuffle that comes out the same every time for the same seed, so the page does not reshuffle on reload */
function rng(seed){
  var x=0; seed=String(seed);
  for(var i=0;i<seed.length;i++) x=(x*31+seed.charCodeAt(i))|0;
  x=Math.abs(x)%2147483646+1;
  return function(){x=(x*16807)%2147483647; return (x-1)/2147483646;};
}
function shuffled(arr,seed){
  var r=rng(seed), a=arr.slice();
  for(var i=a.length-1;i>0;i--){var j=Math.floor(r()*(i+1)); var t=a[i]; a[i]=a[j]; a[j]=t;}
  return a;
}
function setAuto(id,v,ok,extra){
  var prev=S.auto[id]||{}, o={v:v,ok:ok,miss:(prev.miss||0)};
  if(extra) Object.keys(extra).forEach(function(k){o[k]=extra[k];});
  S.auto[id]=o;
  return o;
}

/* ------------------------------------------------------------------ */
/* Builders: say it out loud                                           */
/* ------------------------------------------------------------------ */
/* Students say a word and its definition. Where the browser can turn speech into words (Chrome, Edge, Safari),
   the card checks that it heard the word and its key ideas. Elsewhere (Firefox) it checks that the student
   spoke out loud for a few seconds, and the PDF says so. */
var SR=window.SpeechRecognition||window.webkitSpeechRecognition||null;
var soundOnly=!SR, micStop=null;
var MIC_HELP=A.micHelp||'If your microphone isn’t working, reach out to IT to get it working. It’s so important for us to hear from you in our online school, so you’ll need a working microphone to finish this activity.';
function speechText(t){return String(t||'').toLowerCase().replace(/[^a-z0-9\s']/g,' ').replace(/\s+/g,' ').trim();}
function speechMatch(c,t){
  t=speechText(t);
  var word=c.say.test(t), keys=c.keys||[], got=keys.filter(function(r){return r.test(t);}).length;
  var wrongWay=c.not?c.not.test(t):false;
  return {word:word,pass:word&&got===keys.length&&!wrongWay};
}
function speakQ(id,q){
  var wrap=h('div','scards'), cards=[], cids=[], deck=!!q.deck&&!TEACHER, note=null, shown=-1;
  /* deck: true shows one card at a time; the next card opens when this one turns green */
  function step(){
    if(!deck) return;
    var n=cids.length, first=n;
    for(var i=0;i<n;i++){ var r=S.auto[cids[i]]; if(!(r&&r.ok)){ first=i; break; } }
    cards.forEach(function(el,i){ el.hidden=i>first; });
    note.textContent=first<n?'Card '+(first+1)+' of '+n+'. Say the word and its definition. The next card opens when this card turns green.'
      :'All '+n+' cards are done. Nice work!';
    if(shown>=0&&first>shown&&first<n&&cards[first].scrollIntoView) cards[first].scrollIntoView({behavior:'smooth',block:'nearest'});
    shown=first;
  }
  (q.cards||[]).forEach(function(c,i){
    var cid=id+'_'+i;
    AUTO[cid]={sum:c.term};
    ORDER.push({kind:'auto',id:cid,label:c.term,q:CURQ,sub:c.term});
    cids.push(cid);
    var el=speakCard(cid,c,!!q.memory,function(){ if(note) step(); });
    cards.push(el); wrap.append(el);
  });
  var box=h('div');
  if(soundOnly) box.append(h('p','whint','This browser can’t turn speech into words, so each card checks that you spoke out loud for a few seconds. Chrome or Edge works best for this part.'));
  if(deck){ note=h('p','whint sdeck'); note.setAttribute('aria-live','polite'); box.append(note); }
  box.append(wrap);
  step();
  return box;
}
function speakCard(cid,c,memory,onChange){
  var card=h('div','scard'); mark(card); card.dataset.s='idle';
  var def=h('p','sdef');
  var btn=h('button','btn mic'); btn.type='button'; btn.setAttribute('aria-pressed','false');
  var row=h('div','row'); row.append(btn);
  var peek=null, showing=false;
  if(memory){ peek=h('button','btn ghost'); peek.type='button'; row.append(peek); }
  else if(TTS) row.append(listenBtn(function(){return plain(c.term)+'. '+plain(c.def);}));
  var lvl=h('div','level'); lvl.hidden=true; var lvlFill=h('i'); lvl.append(lvlFill);
  var heard=h('p','heard'); heard.setAttribute('aria-live','polite');
  var term=h('p','sterm'); term.append(itxt(c.term));
  card.append(term);
  if(c.img){ var pic=h('img','simg'); pic.src=c.img.src; pic.alt=c.img.alt||''; card.append(pic); }
  card.append(def,row,lvl,heard);
  function rec(){return S.auto[cid]||null;}
  function tell(t,bad){heard.textContent=t; if(bad) heard.dataset.s='bad'; else heard.removeAttribute('data-s');}
  function paint(){
    var r=rec(), done=!!(r&&r.ok);
    card.dataset.s=done?'ok':(r&&r.v?'bad':'idle');
    if(!micStop||micStop.card!==cid){ btn.setAttribute('aria-pressed','false'); btn.textContent=done?'Say it again':'Say it'; }
    def.textContent='';
    if(memory&&!done&&!showing){ def.className='sdef hidden'; def.textContent='Say the definition from memory.'; }
    else { def.className='sdef'; def.append(itxt(c.def)); }
    if(peek){ peek.hidden=done; peek.textContent=showing?'Hide the definition':'Peek'; }
    if(done) tell('✓ '+(r.how==='sound'?'You said it out loud.':'I heard you say the word and its meaning.')+(r.peek?' (You peeked.)':''));
    if(onChange) onChange();
  }
  if(peek) peek.addEventListener('click',function(){
    showing=!showing;
    if(showing){ var r=rec(); if(!r||!r.peek){ setAuto(cid,r?r.v:'',r?!!r.ok:false,{peek:true,how:r&&r.how}); commit(); } }
    paint();
  });
  function judge(text,how){
    var r=rec(), extra={how:how,peek:!!(r&&r.peek)};
    text=String(text||'').trim();
    if(r&&r.ok){ tell(text?'Heard: “'+text+'”':''); return; }
    if(!text){ tell('I didn’t hear anything. Check that your microphone is on, then press Say it again.',true); return; }
    var m=speechMatch(c,text), v='Heard: “'+text+'”';
    if(m.pass){ setAuto(cid,v,true,extra); paint(); commit(); return; }
    var o=setAuto(cid,v,false,extra); o.miss++;
    paint(); commit();
    tell('Heard: “'+text+'”. '+(!m.word?'I didn’t catch the word '+plain(c.term)+'. Say the word first, then its meaning.'
      :(memory?'I heard the word, but not all of its meaning. Try again, or press Peek.':'I heard the word, but not all of the definition. Read the whole definition out loud.')),true);
  }
  function listening(on){
    btn.setAttribute('aria-pressed',on?'true':'false');
    btn.textContent=on?'Done':(rec()&&rec().ok?'Say it again':'Say it');
  }
  function startWords(){
    var r=new SR(), text='', alts='', quiet=null, err='';
    r.lang='en-US'; r.continuous=true; r.interimResults=true; r.maxAlternatives=3;
    function stop(){try{r.stop();}catch(e){}}
    micStop=stop; micStop.card=cid; listening(true);
    tell('Listening… Say the word, then its meaning.');
    r.onresult=function(e){
      text=''; alts='';
      for(var i=0;i<e.results.length;i++){
        text+=e.results[i][0].transcript+' ';
        for(var j=0;j<e.results[i].length;j++) alts+=e.results[i][j].transcript+' ';
      }
      tell('Heard: “'+text.trim()+'”');
      clearTimeout(quiet); quiet=setTimeout(stop,2500);
      if(speechMatch(c,alts).pass) stop();
    };
    r.onerror=function(e){err=(e&&e.error)||'';};
    r.onend=function(){
      clearTimeout(quiet); micStop=null; listening(false);
      if(err==='not-allowed'||err==='service-not-allowed'||err==='audio-capture'){ tell('I can’t hear your microphone. If your browser asks, choose Allow. '+MIC_HELP,true); return; }
      if(err==='network'||err==='language-not-supported'){ soundOnly=true; tell('Word checking isn’t working right now. Press Say it and speak again. This time the card checks that you spoke out loud.',true); return; }
      judge(speechMatch(c,alts).pass?alts:text,'words');
    };
    try{r.start();}catch(e){ micStop=null; listening(false); soundOnly=true; startSound(); }
  }
  function startSound(){
    if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){ tell(MIC_HELP,true); return; }
    navigator.mediaDevices.getUserMedia({audio:true}).then(function(stream){
      var AC=window.AudioContext||window.webkitAudioContext, ctx=new AC(), an=ctx.createAnalyser();
      an.fftSize=1024; ctx.createMediaStreamSource(stream).connect(an);
      if(ctx.resume) ctx.resume();
      var buf=new Float32Array(an.fftSize), voiced=0, t0=performance.now(), last=t0, raf=0, done=false;
      function stop(){
        if(done) return; done=true;
        cancelAnimationFrame(raf); stream.getTracks().forEach(function(t){t.stop();}); try{ctx.close();}catch(e){}
        micStop=null; listening(false); lvl.hidden=true;
        if(voiced>=3){ var r=rec(); if(!(r&&r.ok)){ setAuto(cid,'Spoke out loud for '+Math.round(voiced)+' seconds',true,{how:'sound',peek:!!(r&&r.peek)}); paint(); commit(); } else tell('✓ You said it out loud again.'); }
        else tell('That was short. Press Say it, say the word and its whole meaning, then press Done.',true);
      }
      micStop=stop; micStop.card=cid; listening(true); lvl.hidden=false;
      tell('Listening… Say the word and its meaning, then press Done.');
      function tick(now){
        an.getFloatTimeDomainData(buf);
        var sum=0; for(var i=0;i<buf.length;i++) sum+=buf[i]*buf[i];
        var rms=Math.sqrt(sum/buf.length);
        if(rms>0.02) voiced+=(now-last)/1000;
        last=now; lvlFill.style.width=Math.min(100,rms*700)+'%';
        if(now-t0>30000) return stop();
        raf=requestAnimationFrame(tick);
      }
      raf=requestAnimationFrame(tick);
    },function(){ tell('I can’t hear your microphone. If your browser asks, choose Allow. '+MIC_HELP,true); });
  }
  btn.addEventListener('click',function(){
    if(micStop){ var mine=micStop.card===cid; micStop(); if(mine) return; }
    ttsStop();
    if(soundOnly) startSound(); else startWords();
  });
  paint();
  return card;
}

/* ------------------------------------------------------------------ */
/* Builders: label a diagram                                           */
/* ------------------------------------------------------------------ */
/* Numbered markers on a picture, and one box per marker. Students drag (or tap) labels into the boxes. */
var SVGNS='http://www.w3.org/2000/svg';
function svgEl(tag,attrs){var e=document.createElementNS(SVGNS,tag); Object.keys(attrs||{}).forEach(function(k){e.setAttribute(k,attrs[k]);}); return e;}
function labelQ(id,q){
  var spots=q.spots||[], ids=spots.map(function(s,i){return id+'_'+i;});
  spots.forEach(function(s,i){
    AUTO[ids[i]]={sum:'Box '+(i+1)};
    ORDER.push({kind:'auto',id:ids[i],label:'Box '+(i+1),q:CURQ,sub:'Box '+(i+1)});
  });
  var labels=shuffled(spots.map(function(s){return s.label;}).concat(q.extra||[]),KEY+id);
  var picked=null, bad={};
  var wrap=h('div','lbwrap');
  wrap.append(h('p','whint','Drag each label to the box with the matching number. On a touch screen, tap a label and then tap a box. To take a label back out, tap its box.'));
  var bank=h('div','lbank'); bank.setAttribute('role','group'); bank.setAttribute('aria-label','Labels to place');
  var grid=h('div','lbgrid'), fig=h('div','lbfig'), list=h('ol','lbslots');
  var vb=String(q.viewBox).split(/[\s,]+/).map(Number), R0=q.markerSize||30;
  var svg=svgEl('svg',{viewBox:q.viewBox,role:'img','aria-label':q.alt||'Diagram with numbered parts'});
  svg.append(svgEl('rect',{x:vb[0],y:vb[1],width:vb[2],height:vb[3],fill:'#ffffff'}));
  svg.append(svgEl('image',{href:q.image.src,x:q.image.x||0,y:q.image.y||0,width:q.image.width,height:q.image.height}));
  spots.forEach(function(s){
    (s.to||[]).forEach(function(p){
      svg.append(svgEl('line',{x1:s.x,y1:s.y,x2:p[0],y2:p[1],'class':'lbhalo'}));
      svg.append(svgEl('line',{x1:s.x,y1:s.y,x2:p[0],y2:p[1],'class':'lblead'}));
      svg.append(svgEl('circle',{cx:p[0],cy:p[1],r:Math.round(R0*0.27),'class':'lbdot'}));
    });
  });
  var mks=spots.map(function(s,i){
    var g=svgEl('g',{'class':'lbmk'});
    g.append(svgEl('circle',{cx:s.x,cy:s.y,r:R0}));
    var t=svgEl('text',{x:s.x,y:s.y,'font-size':R0}); t.textContent=String(i+1); g.append(t);
    svg.append(g); return g;
  });
  fig.append(svg);
  if(q.legend) fig.append(hh('div','lblegend',q.legend));
  if(q.credit) fig.append(h('p','lbcredit',q.credit));
  grid.append(fig,list);
  var row=h('div','row gap'), chk=h('button','btn','Check my labels'); chk.type='button'; row.append(chk);
  var msg=h('p','msg'); msg.setAttribute('aria-live','polite');
  var exp=h('p','msg');
  wrap.append(bank,grid,row,msg,exp);
  function val(i){var r=S.auto[ids[i]]; return r&&r.v?r.v:'';}
  function locked(i){var r=S.auto[ids[i]]; return !!(r&&r.ok);}
  function setV(i,v){var prev=S.auto[ids[i]]||{}; S.auto[ids[i]]={v:v,ok:false,miss:prev.miss||0,pend:!!v};}
  function place(i,label){
    if(locked(i)) return;
    spots.forEach(function(s,j){ if(j!==i&&!locked(j)&&val(j)===label) setV(j,''); });
    setV(i,label); picked=null; delete bad[i]; msg.textContent='';
    paint(); commit();
    var b=list.querySelector('[data-i="'+i+'"]'); if(b) b.focus();
  }
  function clearOver(){[].forEach.call(list.querySelectorAll('.lbdrop.over'),function(d){d.classList.remove('over');});}
  function dropAt(x,y){var t=document.elementFromPoint(x,y); return t&&t.closest?t.closest('.lbdrop'):null;}
  function chipEl(l){
    var b=h('button','lchip',l); b.type='button'; b.dataset.l=l; b.setAttribute('aria-pressed',picked===l?'true':'false');
    var sx=null, sy=0, moved=false, ghost=null;
    function move(e){
      if(sx===null) return;
      if(!moved&&Math.abs(e.clientX-sx)+Math.abs(e.clientY-sy)<8) return;
      if(!moved){ moved=true; ghost=h('span','lchip lghost',l); document.body.append(ghost); }
      ghost.style.left=(e.clientX-24)+'px'; ghost.style.top=(e.clientY-20)+'px';
      clearOver(); var t=dropAt(e.clientX,e.clientY); if(t) t.classList.add('over');
    }
    function up(e){
      document.removeEventListener('pointermove',move); document.removeEventListener('pointerup',up); document.removeEventListener('pointercancel',up);
      if(sx===null) return; sx=null;
      if(ghost){ghost.remove(); ghost=null;}
      clearOver();
      if(moved&&e.type==='pointerup'){ var t=dropAt(e.clientX,e.clientY); if(t) place(+t.dataset.i,l); }
    }
    b.addEventListener('pointerdown',function(e){
      if(e.button) return;
      sx=e.clientX; sy=e.clientY; moved=false;
      document.addEventListener('pointermove',move); document.addEventListener('pointerup',up); document.addEventListener('pointercancel',up);
    });
    b.addEventListener('click',function(){
      if(moved){moved=false; return;}
      picked=(picked===l)?null:l; paint();
      var nb=[].filter.call(bank.querySelectorAll('.lchip'),function(x){return x.dataset.l===l;})[0]; if(nb) nb.focus();
    });
    return b;
  }
  function paint(){
    var used={}; spots.forEach(function(s,i){ if(val(i)) used[val(i)]=true; });
    var left=labels.filter(function(l){return !used[l];});
    bank.textContent='';
    left.forEach(function(l){bank.append(chipEl(l));});
    if(!left.length) bank.append(h('span','whint','All the labels are placed.'));
    list.textContent='';
    var all=true;
    spots.forEach(function(s,i){
      var li=h('li','lbslot'); mark(li);
      li.dataset.s=locked(i)?'ok':(bad[i]?'bad':'idle');
      if(!locked(i)) all=false;
      var b=h('button','lbdrop'+(val(i)?' filled':'')); b.type='button'; b.dataset.i=String(i);
      b.textContent=val(i)?val(i)+(locked(i)?' ✓':''):(picked?'Tap to place “'+picked+'” here':'Drop a label here');
      b.setAttribute('aria-label','Box '+(i+1)+': '+(val(i)||'empty')+(locked(i)?', correct':''));
      b.addEventListener('click',function(){ if(locked(i)) return; if(picked) place(i,picked); else if(val(i)){ setV(i,''); paint(); commit(); } });
      b.addEventListener('mouseenter',function(){mks[i].classList.add('hot');}); b.addEventListener('mouseleave',function(){mks[i].classList.remove('hot');});
      b.addEventListener('focus',function(){mks[i].classList.add('hot');}); b.addEventListener('blur',function(){mks[i].classList.remove('hot');});
      li.append(h('span','qnum',String(i+1)),b);
      if(bad[i]&&!val(i)){ var tp=h('p','msg lbtip'); tp.dataset.s='bad'; tp.append('Tip: ',itxt(s.tip)); li.append(tp); }
      list.append(li);
      mks[i].classList.toggle('done',locked(i));
    });
    chk.hidden=all;
    exp.textContent='';
    if(all){ msg.dataset.s='ok'; msg.textContent='Correct. All '+spots.length+' labels are in the right place.'; if(q.explain){exp.dataset.s='ok'; exp.append(itxt(q.explain));} }
  }
  chk.addEventListener('click',function(){
    var empty=spots.filter(function(s,i){return !val(i);}).length;
    if(empty){ msg.dataset.s='bad'; msg.textContent='Place all '+spots.length+' labels first. '+empty+(empty===1?' box is':' boxes are')+' still empty.'; return; }
    var wrong=0;
    spots.forEach(function(s,i){
      if(locked(i)) return;
      var r=S.auto[ids[i]];
      if(r.v===s.label){ S.auto[ids[i]]={v:r.v,ok:true,miss:r.miss||0}; delete bad[i]; }
      else { wrong++; S.auto[ids[i]]={v:'',ok:false,miss:(r.miss||0)+1,last:r.v}; bad[i]=true; }
    });
    paint(); commit();
    if(wrong){ msg.dataset.s='bad'; msg.textContent=wrong+(wrong===1?' label goes':' labels go')+' somewhere else. '+(wrong===1?'It is':'They are')+' back with the other labels. Read the tip under each red box, then try again.'; }
  });
  paint();
  return wrap;
}

/* ------------------------------------------------------------------ */
/* Builders: put steps in order                                        */
/* ------------------------------------------------------------------ */
function orderQ(id,q){
  var items=q.items, n=items.length;
  AUTO[id]={sum:'Order'};
  ORDER.push({kind:'auto',id:id,label:'Order',q:CURQ,sub:''});
  var wrap=h('div','ctl ordwrap'); mark(wrap); wrap.dataset.s='idle';
  function start(){
    var r=S.auto[id];
    if(r&&Array.isArray(r.ord)&&r.ord.length===n) return r.ord.slice();
    var o=shuffled(items.map(function(x,i){return i;}),KEY+id);
    if(o.every(function(x,i){return x===i;})) o.reverse();
    return o;
  }
  var ord=start(), right=null;
  wrap.append(h('p','whint','Drag the steps into order using the handle on the left, or use the arrow buttons. Then press “Check my order.”'));
  var list=h('ol','ordlist');
  var row=h('div','row gap'), chk=h('button','btn','Check my order'); chk.type='button'; row.append(chk);
  var msg=h('p','msg'); msg.setAttribute('aria-live','polite');
  wrap.append(list,row,msg);
  function done(){var r=S.auto[id]; return !!(r&&r.ok);}
  function store(){
    if(done()) return;
    var prev=S.auto[id]||{};
    S.auto[id]={v:ord.map(function(i){return items[i];}).join(' → '),ok:false,miss:prev.miss||0,pend:true,ord:ord.slice()};
    right=null; msg.textContent=''; commit();
  }
  function moveTo(from,to){
    if(to<0||to>=n||from===to) return;
    var x=ord.splice(from,1)[0]; ord.splice(to,0,x);
  }
  function paint(focusPos,focusDir){
    var fin=done();
    wrap.dataset.s=fin?'ok':(right?'bad':'idle');
    list.textContent='';
    ord.forEach(function(k,pos){
      var li=h('li','ordrow'); li.dataset.pos=String(pos);
      if(fin||(right&&right[pos])) li.dataset.s='ok';
      var grip=h('span','ordgrip'); grip.setAttribute('aria-hidden','true'); grip.textContent='⠿';
      var txt=h('span','ordtxt'); txt.append(itxt(items[k]));
      var up=h('button','ordbtn','↑'); up.type='button'; up.setAttribute('aria-label','Move “'+plain(items[k])+'” up'); up.disabled=fin||pos===0;
      var dn=h('button','ordbtn','↓'); dn.type='button'; dn.setAttribute('aria-label','Move “'+plain(items[k])+'” down'); dn.disabled=fin||pos===n-1;
      up.addEventListener('click',function(){moveTo(pos,pos-1); store(); paint(pos-1,'up');});
      dn.addEventListener('click',function(){moveTo(pos,pos+1); store(); paint(pos+1,'dn');});
      li.append(grip,h('span','ordnum',String(pos+1)),txt,up,dn);
      if(!fin) grip.addEventListener('pointerdown',function(e){ if(e.button) return; e.preventDefault(); drag(li,pos); });
      list.append(li);
    });
    chk.hidden=fin;
    if(focusPos!=null){ var r0=list.children[focusPos]; if(r0){ var bs=r0.querySelectorAll('.ordbtn'); var b=focusDir==='up'?(bs[0].disabled?bs[1]:bs[0]):(bs[1].disabled?bs[0]:bs[1]); b.focus(); } }
    if(fin){ msg.dataset.s='ok'; msg.textContent=''; msg.append('Correct. ',itxt(q.explain||'')); }
  }
  function drag(li,pos){
    var cur=pos;
    li.classList.add('dragging');
    function move(e){
      var t=document.elementFromPoint(e.clientX,e.clientY), other=t&&t.closest?t.closest('.ordrow'):null;
      if(!other||other===li||other.parentNode!==list) return;
      var p=+other.dataset.pos;
      if(p>cur) list.insertBefore(li,other.nextSibling); else list.insertBefore(li,other);
      moveTo(cur,p); cur=p;
      [].forEach.call(list.children,function(c,i){c.dataset.pos=String(i);});
    }
    function up(){
      document.removeEventListener('pointermove',move); document.removeEventListener('pointerup',up); document.removeEventListener('pointercancel',up);
      li.classList.remove('dragging');
      if(cur!==pos) store();
      paint();
    }
    document.addEventListener('pointermove',move); document.addEventListener('pointerup',up); document.addEventListener('pointercancel',up);
  }
  chk.addEventListener('click',function(){
    var ok=ord.every(function(k,i){return k===i;});
    var prev=S.auto[id]||{}, v=ord.map(function(i){return items[i];}).join(' → ');
    if(ok){ S.auto[id]={v:v,ok:true,miss:prev.miss||0,ord:ord.slice()}; paint(); commit(); return; }
    right=ord.map(function(k,i){return k===i;});
    S.auto[id]={v:v,ok:false,miss:(prev.miss||0)+1,ord:ord.slice()};
    paint(); commit();
    var nr=right.filter(Boolean).length;
    msg.dataset.s='bad'; msg.textContent='';
    msg.append(nr+' of '+n+' steps are in the right spot (they are green). Tip: ',itxt(q.tip||'Rewatch the clip and follow the blood one step at a time.'));
  });
  paint();
  return wrap;
}

/* ------------------------------------------------------------------ */
/* Builders: blood typing lab                                          */
/* ------------------------------------------------------------------ */
var BLOOD_TYPES=['A+','A−','B+','B−','AB+','AB−','O+','O−'];
var SERA=[{k:'A',label:'Anti-A'},{k:'B',label:'Anti-B'},{k:'Rh',label:'Anti-Rh'}];
function hasMarker(type,k){ return k==='Rh'?/\+$/.test(type):type.replace(/[+−-]/,'').indexOf(k)>=0; }
function wellSvg(state,seed){
  var r=rng(seed), inner;
  if(state==='empty') inner='<circle cx="50" cy="50" r="40" fill="var(--blood)" opacity=".8"/>';
  else if(state==='smooth') inner='<circle cx="50" cy="50" r="40" fill="var(--blood)"/>';
  else {
    inner='<circle cx="50" cy="50" r="40" fill="var(--plasma)"/>';
    for(var j=0;j<16;j++){
      var a=r()*Math.PI*2, d=Math.sqrt(r())*30;
      inner+='<circle cx="'+(50+Math.cos(a)*d).toFixed(1)+'" cy="'+(50+Math.sin(a)*d).toFixed(1)+'" r="'+(3+r()*5).toFixed(1)+'" fill="var(--clump)"/>';
    }
  }
  return '<svg viewBox="0 0 100 100" aria-hidden="true" focusable="false"><circle cx="50" cy="50" r="46" fill="var(--surface)" stroke="var(--muted)" stroke-width="3"/>'+inner+'</svg>';
}
function labQ(id,q){
  var wrap=h('div','patients'), types=q.types||BLOOD_TYPES;
  var still=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  (q.patients||[]).forEach(function(p,pi){
    var pid=id+'_'+pi;
    AUTO[pid]={sum:p.name};
    ORDER.push({kind:'auto',id:pid,label:p.name,q:CURQ,sub:p.name});
    var card=h('div','patient'); mark(card); card.dataset.s='idle';
    var nm=h('h3','pname'); nm.append(itxt(p.name));
    card.append(nm);
    if(p.who) card.append(h('p','pwho',p.who));
    var tray=h('div','tray');
    var sel=h('select'); sel.id='f-'+pid; sel.append(new Option('Choose the blood type…',''));
    types.forEach(function(t){sel.append(new Option(t,t));});
    var lab=h('label',null,'Blood type: '); lab.htmlFor=sel.id;
    var srow=h('div','row typerow'); srow.append(lab,sel);
    var msg=h('p','msg'); msg.setAttribute('aria-live','polite');
    var wells=[];
    function rec(){return S.auto[pid]||{v:'',ok:false,miss:0,w:''};}
    SERA.forEach(function(s,si){
      var pic=h('div','wpic'), res=h('span','wres'), b=h('button','btn small','Add '+s.label+' serum'); b.type='button';
      b.addEventListener('click',function(){
        var r=rec(); if(r.w.indexOf(s.k)>=0) return;
        b.disabled=true; res.textContent='Mixing…';
        setTimeout(function(){
          var r2=rec(); S.auto[pid]={v:r2.v,ok:r2.ok,miss:r2.miss||0,w:r2.w+s.k+','};
          paint(); commit();
        },still?0:700);
      });
      var cell=h('div','well'); cell.append(h('span','wlbl',s.label),pic,res,b); tray.append(cell);
      wells.push({k:s.k,pic:pic,res:res,b:b,seed:KEY+pid+s.k});
    });
    card.append(tray,srow,msg);
    sel.addEventListener('change',function(){
      var r=rec(), v=sel.value; if(!v) return;
      var ok=v===p.type;
      S.auto[pid]={v:v,ok:ok,miss:(r.miss||0)+(ok?0:1),w:r.w};
      paint(); commit();
    });
    function paint(){
      var r=rec(), all=true;
      wells.forEach(function(w){
        var added=r.w.indexOf(w.k)>=0, clump=hasMarker(p.type,w.k);
        if(!added) all=false;
        w.pic.innerHTML=wellSvg(added?(clump?'clump':'smooth'):'empty',w.seed);
        w.res.textContent=added?(clump?'Clumped':'Smooth'):'No serum yet';
        w.b.disabled=added;
      });
      sel.disabled=!all||r.ok;
      sel.value=r.v||'';
      card.dataset.s=r.ok?'ok':(r.v?'bad':'idle');
      msg.textContent='';
      if(!r.v){ msg.removeAttribute('data-s'); if(!all) msg.textContent='Add all three serums to unlock the blood type menu.'; return; }
      if(r.ok){
        var on=SERA.filter(function(x){return hasMarker(p.type,x.k);}).map(function(x){return x.k;});
        msg.dataset.s='ok';
        msg.textContent='Correct. '+(on.length
          ?'The '+on.join(' and ')+' well'+(on.length>1?'s':'')+' clumped, so these red blood cells carry the '+on.join(' and ')+' marker'+(on.length>1?'s':'')+'. That makes this blood '+p.type+'.'
          :'No well clumped, so these red blood cells carry no A, B, or Rh marker. That makes this blood O−.');
        return;
      }
      var letters=r.v.replace(/[+−-]/,''), rhPick=/\+$/.test(r.v);
      msg.dataset.s='bad';
      msg.textContent='Not yet. Tip: '+(letters===p.type.replace(/[+−-]/,'')
        ?'The letter part is right. Look again at the anti-Rh well to decide + or −.'
        :(rhPick===/\+$/.test(p.type)
          ?'The + or − part is right. Look again at the anti-A and anti-B wells. Each clumped well means that marker is there.'
          :'Look at each well. A clumped well means that marker is on the red blood cells. A smooth well means it is not.'));
    }
    paint();
    wrap.append(card);
  });
  return wrap;
}

/* tonicity: a cell in a beaker of solution (pink dots are solute). The explorer slider changes the solute outside the
   cell and shows where water moves. Then each scenario has three menus: what the solution is, which way water moves,
   and what the cell does. When all three are right, the scenario plays: water arrows and the cell swells or shrinks. */
var TONI_MENUS=[
  {label:'The solution outside the cell is',options:['Hypotonic','Isotonic','Hypertonic'],ans:['Hypotonic','Isotonic','Hypertonic'],
   hint:'Compare how crowded the pink solute dots are outside the cell and inside it. “Hypo” rhymes with low, and “iso” means equal.'},
  {label:'Water moves',options:['Into the cell','Out of the cell','In and out equally (no net movement)'],ans:['Into the cell','In and out equally (no net movement)','Out of the cell'],
   hint:'Water moves toward the side with the higher solute concentration. Which side has more crowded dots?'},
  {label:'The cell',options:['Swells','Shrinks','Stays the same size'],ans:['Swells','Stays the same size','Shrinks'],
   hint:'Think about where the water goes. Does the cell gain water, lose water, or neither?'}];
function toniKind(inside,outside){return outside<inside?0:outside>inside?2:1;}
function toniSvg(inside,outside,seed,title){
  var r=rng(seed), cx=120, cy=96, R=40, s='';
  s+='<svg viewBox="0 0 240 180" role="img" aria-label="'+esc(title)+'">';
  s+='<path d="M14 18 V164 Q14 172 22 172 H218 Q226 172 226 164 V18" fill="none" stroke="var(--muted)" stroke-width="3"/>';
  s+='<rect x="16" y="30" width="208" height="140" rx="6" fill="var(--receptor)" opacity=".22"/>';
  /* solute outside: the same number of dots per area as inside the cell when the levels match */
  var free=0, ex=(R*1.3+5)*(R*1.3+5);
  for(var gx=22;gx<218;gx+=2) for(var gy=36;gy<164;gy+=2){ if((gx-cx)*(gx-cx)+(gy-cy)*(gy-cy)>=ex) free+=4; }
  var n=Math.round(outside*4*free/(Math.PI*(R-6)*(R-6))), tries=0;
  for(var i=0;i<n&&tries<5000;tries++){
    var x=22+r()*196, y=36+r()*128, dx=x-cx, dy=y-cy;
    if(dx*dx+dy*dy<(R*1.3+5)*(R*1.3+5)) continue;
    s+='<circle cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="2.6" fill="var(--ligand)"/>'; i++;
  }
  s+='<g class="tcell"><circle cx="'+cx+'" cy="'+cy+'" r="'+R+'" fill="var(--cell)" stroke="var(--ink)" stroke-width="2.5"/>';
  for(var j=0;j<inside*4;j++){
    var a=r()*Math.PI*2, d=Math.sqrt(r())*(R-6);
    s+='<circle cx="'+(cx+Math.cos(a)*d).toFixed(1)+'" cy="'+(cy+Math.sin(a)*d).toFixed(1)+'" r="2.6" fill="var(--ligand)"/>';
  }
  s+='</g><g class="tarrows">';
  [45,135,225,315].forEach(function(deg){
    var a=deg*Math.PI/180, c=Math.cos(a), sn=Math.sin(a), p1=R+8, p2=R+32;
    var x1=cx+c*p2, y1=cy+sn*p2, x2=cx+c*p1, y2=cy+sn*p1;
    s+='<g class="tarrow"><line x1="'+x1.toFixed(1)+'" y1="'+y1.toFixed(1)+'" x2="'+x2.toFixed(1)+'" y2="'+y2.toFixed(1)+'" stroke="var(--primary)" stroke-width="4" stroke-linecap="round"/>';
    function head(hx,hy,ux,uy){ /* a triangle at (hx,hy) pointing along (ux,uy) */
      var px=-uy, py=ux;
      return '<polygon points="'+[hx+ux*7,hy+uy*7,hx-ux*3+px*6,hy-uy*3+py*6,hx-ux*3-px*6,hy-uy*3-py*6].map(function(v){return v.toFixed(1);}).join(' ')+'" fill="var(--primary)"/>';
    }
    s+='<g class="tin">'+head(x2,y2,-c,-sn)+'</g><g class="tout">'+head(x1,y1,c,sn)+'</g></g>';
  });
  s+='</g></svg>';
  return s;
}
/* show a finished scenario: dir 0 = water in (swell), 1 = no net movement, 2 = water out (shrink); -1 = still */
function toniShow(box,dir){
  box.dataset.flow=dir<0?'':['in','even','out'][dir];
}
function toniQ(id,q){
  var wrap=h('div','toni'), inside=q.cell||2, still=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(still) wrap.classList.add('still');
  wrap.append(hh('p','tlegend','<span class="tdot"></span> solute (such as salt or sugar) <span class="tarr">➜</span> water moving'));
  if(q.explore!==false){
    var ex=h('div','texplore'), pic=h('div','tpic'), out=h('p','tdesc'); out.setAttribute('aria-live','polite');
    var row=h('div','row tslide'), lab=h('label',null,'Solute in the water outside the cell: '), rng1=document.createElement('input');
    rng1.type='range'; rng1.min=0; rng1.max=4; rng1.step=1; rng1.value=0; rng1.id='f-'+id+'_x'; lab.htmlFor=rng1.id;
    var lvl=h('b'); row.append(lab,rng1,lvl);
    var WORD=['none','a little','some','a lot','a huge amount'];
    var draw=function(){
      var o=+rng1.value, k=toniKind(inside,o);
      lvl.textContent=WORD[o];
      pic.innerHTML=toniSvg(inside,o,KEY+id+'x'+o,'A cell in a beaker of water with '+WORD[o]+' solute outside it');
      out.textContent=[
        'The water outside has a lower solute concentration than the inside of the cell. Water moves into the cell, so the cell swells.',
        'The water outside has the same solute concentration as the inside of the cell. Water moves in and out equally, so the cell stays the same size.',
        'The water outside has a higher solute concentration than the inside of the cell. Water moves out of the cell, so the cell shrinks.'][k];
      var box=pic; toniShow(box,-1); void box.offsetWidth;
      setTimeout(function(){toniShow(box,k);},still?0:60);
    };
    rng1.addEventListener('input',draw);
    ex.append(h('h3','tname','Try it: move the slider'),row,pic,out);
    wrap.append(ex);
    draw();
  }
  (q.items||[]).forEach(function(it,i){
    var card=h('div','tcard'); card.dataset.s='idle';
    var nm=h('h3','tname'); nm.append(itxt(it.name||('Cell '+(i+1)))); card.append(nm);
    if(it.who) { var w=h('p','pwho'); w.append(itxt(it.who)); card.append(w); }
    var cin=it.inside==null?inside:it.inside, k=toniKind(cin,it.outside), answers=TONI_MENUS.map(function(m){return m.ans[k];}); /* ans is in the order hypotonic, isotonic, hypertonic */
    var pic=h('div','tpic'); pic.innerHTML=toniSvg(cin,it.outside,KEY+id+'_'+i,(it.alt||plain(it.name||'A cell'))+': a cell in a beaker of solution');
    var menus=h('div','sigs'), ids=[];
    TONI_MENUS.forEach(function(m,mi){
      var mid=id+'_'+i+'_'+mi; ids.push(mid);
      menus.append(autoSelect(mid,plain(it.name||('Cell '+(i+1)))+': '+m.label.toLowerCase(),m.options,answers[mi],{label:m.label,sub:plain(it.name||('Cell '+(i+1)))+': '+m.label,hint:(it.hints&&it.hints[mi])||m.hint}));
    });
    var msg=h('p','msg ok tok'); msg.setAttribute('aria-live','polite');
    card.append(pic,menus,msg);
    var paint=function(){
      var all=ids.every(function(x){return S.auto[x]&&S.auto[x].ok;});
      card.dataset.s=all?'ok':'idle';
      toniShow(pic,all?k:-1);
      msg.textContent=all?(it.explain||['Right. The solution is hypotonic to the cell, so water moves in and the cell swells.','Right. The solution is isotonic to the cell, so water moves in and out equally and the cell stays the same size.','Right. The solution is hypertonic to the cell, so water moves out and the cell shrinks.'][k]):'';
    };
    card.addEventListener('change',function(){setTimeout(paint,0);});
    paint();
    wrap.append(card);
  });
  return wrap;
}

/* ------------------------------------------------------------------ */
/* Builders: choose every correct answer (check boxes)                 */
/* ------------------------------------------------------------------ */
function multiQ(id,q){
  AUTO[id]={sum:'Choose all'};
  ORDER.push({kind:'auto',id:id,label:'Choose all',q:CURQ,sub:''});
  var wrap=h('div','ctl'); mark(wrap); wrap.dataset.s='idle';
  var box=h('div','bags'), inputs=[];
  q.options.forEach(function(t,i){
    var lab=h('label','bag'), inp=document.createElement('input'); inp.type='checkbox'; inp.value=t; inp.id='f-'+id+'_'+i;
    var sp=h('span'); sp.append(itxt(t)); lab.append(inp,sp); box.append(lab); inputs.push(inp);
    inp.addEventListener('change',function(){ msg.textContent=''; wrap.dataset.s='idle'; });
  });
  var row=h('div','row gap'), btn=h('button','btn','Check'); btn.type='button'; row.append(btn);
  var msg=h('p','msg'); msg.setAttribute('aria-live','polite');
  wrap.append(box,row,msg);
  function picks(){return inputs.filter(function(x){return x.checked;}).map(function(x){return x.value;});}
  function paint(){
    var r=S.auto[id];
    if(r&&Array.isArray(r.picks)) inputs.forEach(function(x){x.checked=r.picks.indexOf(x.value)>=0;});
    inputs.forEach(function(x){ x.disabled=!!(r&&r.ok); if(r&&r.ok&&x.checked) x.parentNode.dataset.s='ok'; else x.parentNode.removeAttribute('data-s'); });
    btn.hidden=!!(r&&r.ok);
    if(!r||!r.v){wrap.dataset.s='idle'; msg.textContent=''; return;}
    wrap.dataset.s=r.ok?'ok':'bad';
    msg.textContent='';
    if(r.ok){ msg.append('Correct. ',itxt(q.explain||'')); return; }
    var tip=q.tip;
    (q.rules||[]).some(function(rule){ if(r.picks.some(function(p){return rule.any.indexOf(p)>=0;})){ tip=rule.tip; return true; } return false; });
    msg.append('Not yet. Tip: ',itxt(tip||'Look back at the reading and try again.'));
  }
  btn.addEventListener('click',function(){
    var p=picks();
    if(!p.length){ wrap.dataset.s='bad'; msg.textContent='Choose at least one.'; return; }
    var ok=p.length===q.answers.length&&q.answers.every(function(a){return p.indexOf(a)>=0;});
    var prev=S.auto[id]||{};
    S.auto[id]={v:p.join(', '),ok:ok,miss:(prev.miss||0)+(ok?0:1),picks:p};
    paint(); commit();
  });
  paint();
  return wrap;
}

/* ------------------------------------------------------------------ */
/* Calculator (calculator: true on a question)                         */
/* ------------------------------------------------------------------ */
/* A basic calculator next to a question, for averages and sums. It is not saved and not graded. */
function calcEval(src){
  var t=String(src).replace(/×/g,'*').replace(/÷/g,'/').replace(/−/g,'-').replace(/,/g,'').replace(/\s+/g,''), i=0;
  function num(){ var m=t.slice(i).match(/^(\d+\.?\d*|\.\d+)/); if(!m) throw 0; i+=m[0].length; return parseFloat(m[0]); }
  function atom(){
    if(t[i]==='-'){ i++; return -atom(); }
    if(t[i]==='+'){ i++; return atom(); }
    if(t[i]==='('){ i++; var v=sum(); if(t[i]!==')') throw 0; i++; return v; }
    return num();
  }
  function prod(){ var v=atom(); while(t[i]==='*'||t[i]==='/'){ var o=t[i++], b=atom(); v=o==='*'?v*b:v/b; } return v; }
  function sum(){ var v=prod(); while(t[i]==='+'||t[i]==='-'){ var o=t[i++], b=prod(); v=o==='+'?v+b:v-b; } return v; }
  if(!t) throw 0;
  var v=sum(); if(i!==t.length||!isFinite(v)) throw 0;
  return Math.round(v*1e8)/1e8;
}
function calcEl(id){
  var d=h('details','calc'); d.open=true;
  d.append(h('summary',null,'Calculator'));
  var inp=h('input'); inp.type='text'; inp.id='calc-'+id; inp.autocomplete='off'; inp.spellcheck=false; inp.inputMode='decimal';
  inp.setAttribute('aria-label','Calculator. Type a math problem, then press Enter or the equals button.');
  var out=h('p','calcout'); out.setAttribute('aria-live','polite');
  var keys=h('div','calckeys');
  function show(){ inp.focus({preventScroll:true}); }
  function put(k){ var a=inp.selectionStart==null?inp.value.length:inp.selectionStart, b=inp.selectionEnd==null?a:inp.selectionEnd; inp.value=inp.value.slice(0,a)+k+inp.value.slice(b); inp.setSelectionRange(a+k.length,a+k.length); }
  function equals(){
    var src=inp.value.trim(); if(!src) return;
    try{ var v=calcEval(src); out.removeAttribute('data-s'); out.textContent=src+' = '+v.toLocaleString('en-US',{maximumFractionDigits:8}); inp.value=String(v); }
    catch(e){ out.dataset.s='bad'; out.textContent='That problem has a mistake. Check the numbers and signs, then try again.'; }
  }
  [['C','Clear'],['⌫','Delete the last character'],['(','Open parenthesis'],[')','Close parenthesis'],
   ['7'],['8'],['9'],['÷','Divide'],['4'],['5'],['6'],['×','Times'],['1'],['2'],['3'],['−','Minus'],['0'],['.','Decimal point'],['=','Equals'],['+','Plus']
  ].forEach(function(k){
    var b=h('button','calckey'+(k[0]==='='?' eq':(/^[÷×−+]$/.test(k[0])?' op':'')),k[0]); b.type='button';
    if(k[1]) b.setAttribute('aria-label',k[1]);
    b.addEventListener('mousedown',function(e){e.preventDefault();});
    b.addEventListener('click',function(){
      if(k[0]==='C'){ inp.value=''; out.textContent=''; }
      else if(k[0]==='⌫'){ var a=inp.selectionStart, c=inp.selectionEnd; if(a!==c&&a!=null){ inp.value=inp.value.slice(0,a)+inp.value.slice(c); inp.setSelectionRange(a,a); } else if(a>0){ inp.value=inp.value.slice(0,a-1)+inp.value.slice(a); inp.setSelectionRange(a-1,a-1); } }
      else if(k[0]==='=') equals();
      else put(k[0]);
      if(window.matchMedia&&matchMedia('(pointer:fine)').matches) show();
    });
    keys.append(b);
  });
  inp.addEventListener('keydown',function(e){
    if(e.key==='Enter'||e.key==='='){ e.preventDefault(); equals(); }
    else if(e.key==='Escape'){ inp.value=''; out.textContent=''; }
  });
  inp.addEventListener('input',function(){ var v=inp.value.replace(/[xX]/g,'×').replace(/[^0-9.+\-*/×÷−()\s,]/g,''); if(v!==inp.value) inp.value=v; });
  var body=h('div','calcbody'); body.append(inp,out,keys);
  d.append(body);
  return d;
}

/* ------------------------------------------------------------------ */
/* Builders: numbers and graphs                                        */
/* ------------------------------------------------------------------ */
/* the first number in what a student typed: "3,300 cm3" is 3300 */
function numVal(v){var m=String(v==null?'':v).replace(/,/g,'').match(/-?\d*\.?\d+/); return m?parseFloat(m[0]):NaN;}
function inRange(b){return function(v){var n=numVal(v); return !isNaN(n)&&n>=b[0]&&n<=b[1];};}
/* several numbers to type, each checked against a range (between: [low, high]) */
function numbersQ(id,q){
  var grid=h('div','nums');
  (q.items||[]).forEach(function(it,i){
    var iid=id+'_'+i;
    var w=typedCheck(iid,it.label,inRange(it.between),'Correct.'+(it.explain?' '+plain(it.explain):''),function(){
      return 'Not yet. Tip: '+plain(it.tip||q.tip||'Look back at the reading and try again.');
    },plain(it.label),{sub:it.label,unit:it.unit||q.unit});
    var l=h('label'); l.append(itxt(it.label)); l.htmlFor='f-'+iid; w.prepend(l);
    grid.append(w);
  });
  return grid;
}

/* Graphs are drawn as SVG with fixed colors on a white page, so the same drawing works in dark mode and in the PDF */
var GC={ink:'#2d2926',muted:'#5f5850',grid:'#c9bfae',minor:'#ece6dc',line:'#2d2926',mark:'#7f6810',pick:'#d63f78',bad:'#a8321f'};
function esc(t){return String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
function nfmt(n){return (Math.round(n*100)/100).toLocaleString('en-US');}
function steps(min,max,step){var out=[], n=Math.floor((max-min)/step+1e-9); for(var i=0;i<=n;i++) out.push(min+i*step); return out;}
/* the frame of a graph: white page, grid, axes, numbers, axis labels and title.
   o.x and o.y are {min, max, step, minor, label}; o.x.cats (a list of group names) makes a bar graph.
   A missing label or title is drawn as a grey reminder. Returns the markup so far and the scale functions. */
function gFrame(o){
  var W=640,H=450,L=88,R=26,T=58,B=78, pw=W-L-R, ph=H-T-B, x=o.x, y=o.y, cats=x.cats, s=[];
  function X(v){return L+(v-x.min)/(x.max-x.min)*pw;}
  function Y(v){return T+ph-(v-y.min)/(y.max-y.min)*ph;}
  function band(i){return L+(i+0.5)*pw/cats.length;}
  s.push('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" font-family="Arial, Helvetica, sans-serif">');
  s.push('<rect width="'+W+'" height="'+H+'" fill="#ffffff"/>');
  if(y.minor) steps(y.min,y.max,y.minor).forEach(function(v){s.push('<line x1="'+L+'" x2="'+(L+pw)+'" y1="'+Y(v)+'" y2="'+Y(v)+'" stroke="'+GC.minor+'"/>');});
  if(!cats&&x.minor) steps(x.min,x.max,x.minor).forEach(function(v){s.push('<line y1="'+T+'" y2="'+(T+ph)+'" x1="'+X(v)+'" x2="'+X(v)+'" stroke="'+GC.minor+'"/>');});
  steps(y.min,y.max,y.step).forEach(function(v){
    s.push('<line x1="'+L+'" x2="'+(L+pw)+'" y1="'+Y(v)+'" y2="'+Y(v)+'" stroke="'+GC.grid+'"/>');
    s.push('<text x="'+(L-8)+'" y="'+(Y(v)+5)+'" text-anchor="end" font-size="14" fill="'+GC.ink+'">'+nfmt(v)+'</text>');
  });
  if(cats) cats.forEach(function(c,i){ s.push('<text x="'+band(i)+'" y="'+(T+ph+22)+'" text-anchor="middle" font-size="15" fill="'+GC.ink+'">'+esc(c)+'</text>'); });
  else steps(x.min,x.max,x.step).forEach(function(v){
    s.push('<line y1="'+T+'" y2="'+(T+ph)+'" x1="'+X(v)+'" x2="'+X(v)+'" stroke="'+GC.grid+'"/>');
    s.push('<text x="'+X(v)+'" y="'+(T+ph+22)+'" text-anchor="middle" font-size="14" fill="'+GC.ink+'">'+nfmt(v)+'</text>');
  });
  s.push('<path d="M'+L+' '+T+' V'+(T+ph)+' H'+(L+pw)+'" fill="none" stroke="'+GC.line+'" stroke-width="2"/>');
  function lab(t,ph0,attrs){ return t?'<text '+attrs+' fill="'+GC.ink+'">'+esc(t)+'</text>':'<text '+attrs+' fill="'+GC.muted+'" font-style="italic" font-weight="400">'+esc(ph0)+'</text>'; }
  s.push(lab(x.label,'(x-axis label)','x="'+(L+pw/2)+'" y="'+(H-20)+'" text-anchor="middle" font-size="16" font-weight="700"'));
  s.push(lab(y.label,'(y-axis label)','transform="translate(24 '+(T+ph/2)+') rotate(-90)" text-anchor="middle" font-size="16" font-weight="700"'));
  if(o.title!==false) s.push(lab(o.title,'(title)','x="'+(W/2)+'" y="34" text-anchor="middle" font-size="19" font-weight="700"'));
  return {s:s,X:X,Y:Y,band:band,L:L,T:T,pw:pw,ph:ph,W:W,H:H,bw:cats?Math.min(110,pw/cats.length*0.55):0};
}
function gDot(fr,x,y,color,r){return '<circle cx="'+fr.X(x)+'" cy="'+fr.Y(y)+'" r="'+(r||6)+'" fill="'+color+'" stroke="#ffffff" stroke-width="1.5"/>';}
function gBar(fr,i,v,color,y0){var top=fr.Y(v), base=fr.Y(y0); return '<rect x="'+(fr.band(i)-fr.bw/2)+'" y="'+Math.min(top,base)+'" width="'+fr.bw+'" height="'+Math.abs(base-top)+'" fill="'+color+'"/>';}
/* screen point to graph point */
function gPoint(svg,e){
  var pt=svg.createSVGPoint(); pt.x=e.clientX; pt.y=e.clientY;
  var m=svg.getScreenCTM(); return m?pt.matrixTransform(m.inverse()):null;
}

/* Read a value off a curve, as students do on a printed graph. A slider moves a line along the x-axis; dashed
   lines run to the curve and across to the y-axis. The value itself is not shown: students read it off the grid. */
function curveSvg(g,xv){
  var fr=gFrame({title:g.title,x:g.x,y:g.y}), s=fr.s, pts=[], to=g.to!=null?g.to:g.x.max;
  for(var d=g.x.min; d<=to+1e-9; d+=(to-g.x.min)/240){ var v=g.fn(d); if(v<=g.y.max) pts.push(fr.X(d).toFixed(1)+','+fr.Y(Math.max(g.y.min,v)).toFixed(1)); }
  s.push('<polyline points="'+pts.join(' ')+'" fill="none" stroke="'+GC.ink+'" stroke-width="2.5"/>');
  if(xv!=null){
    var yv=g.fn(xv);
    if(yv<=g.y.max){
      s.push('<path d="M'+fr.X(xv)+' '+(fr.T+fr.ph)+' V'+fr.Y(yv)+' H'+fr.L+'" fill="none" stroke="'+GC.pick+'" stroke-width="2.5" stroke-dasharray="7 5"/>');
      s.push('<circle cx="'+fr.X(xv)+'" cy="'+fr.Y(yv)+'" r="6" fill="'+GC.pick+'"/>');
    }
  }
  s.push('</svg>');
  return s.join('');
}
function readGraphQ(id,q){
  var g=q.graph, wrap=h('div','gwrap');
  var fig=h('div','gfig'); fig.setAttribute('role','img'); fig.setAttribute('aria-label',g.alt||'Graph');
  var row=h('div','row gslide'), lab=h('label'), out=h('b');
  var sl=h('input'); sl.type='range'; sl.id='f-'+id+'_slider'; sl.min=g.x.min; sl.max=g.to!=null?g.to:g.x.max; sl.step=g.slider||0.1; sl.value=g.start!=null?g.start:g.x.min;
  lab.htmlFor=sl.id; lab.append(g.sliderLabel||'Move the slider: ',out);
  row.append(lab,sl);
  function paint(){ var v=+sl.value, dp=(String(sl.step).split('.')[1]||'').length; out.textContent=v.toFixed(dp)+(g.x.unit?' '+g.x.unit:''); fig.innerHTML=curveSvg(g,v); }
  sl.addEventListener('input',paint);
  paint();
  wrap.append(h('p','whint',g.hint||'Move the slider to a value on the x-axis. Follow the dashed line up to the curve and then across to the y-axis, and read the number off the grid.'),row,fig,numbersQ(id,q));
  return wrap;
}

/* Build a graph from a data table. The student picks a factor, the type of graph, the axis labels and a title,
   then plots the data: a bar for each group's average, or a dot for each row. Each step is checked. When the graph
   is right, the graphs of the other factors open, the way lab partners each graph a different factor. */
var GSTEPS=['type','x','y','title','plot'];
function gFactor(G,key){return (G.factors||[]).filter(function(f){return f.key===key;})[0]||null;}
function gAverages(G,f){
  return f.cats.map(function(c){
    var v=G.rows.filter(function(r){return r[f.key]===c;}).map(function(r){return r[G.y.key];});
    return v.length?v.reduce(function(a,b){return a+b;},0)/v.length:0;
  });
}
/* draws a graph. d: {title, xLabel, yLabel, kind, pts, bars, bad (dots or bars to show in red)} */
function graphSvg(G,f,d){
  var bar=d.kind==='bar', x=bar?{cats:f.cats,label:d.xLabel}:{min:f.min,max:f.max,step:f.step,minor:f.minor,label:d.xLabel};
  var y={min:G.y.min,max:G.y.max,step:G.y.step,minor:G.y.minor,label:d.yLabel};
  var fr=gFrame({title:d.title,x:x,y:y}), s=fr.s, bad=d.bad||{};
  if(bar) f.cats.forEach(function(c,i){
    var v=(d.bars||{})[c];
    if(typeof v!=='number'||isNaN(v)) return;
    v=Math.max(G.y.min,Math.min(G.y.max,v));
    s.push(gBar(fr,i,v,bad[c]?GC.bad:GC.mark,G.y.min));
    s.push('<text x="'+fr.band(i)+'" y="'+(fr.Y(v)-8)+'" text-anchor="middle" font-size="14" font-weight="700" fill="'+GC.ink+'">'+nfmt(v)+'</text>');
  });
  else (d.pts||[]).forEach(function(p,i){ s.push(gDot(fr,p[0],p[1],bad[i]?GC.bad:GC.mark)); });
  s.push('</svg>');
  return {svg:s.join(''),fr:fr};
}
function gAnswers(G,f){
  return {type:f.kind==='bar'?'Bar graph':'Scatter plot',x:f.label,y:G.y.label};
}
/* checks the plotted data. Returns {ok, bad, note} */
function gCheckPlot(G,f,st){
  var bad={};
  if(f.kind==='bar'){
    var avg=gAverages(G,f), tol=G.barTol!=null?G.barTol:50, wrong=0, empty=0;
    f.cats.forEach(function(c,i){
      var v=st.bars[c];
      if(typeof v!=='number'||isNaN(v)){ empty++; return; }
      if(Math.abs(v-avg[i])>tol){ bad[c]=true; wrong++; }
    });
    if(empty) return {ok:false,bad:bad,empty:true,note:'Give every bar a height first. '+empty+(empty===1?' bar is':' bars are')+' still empty.'};
    return {ok:!wrong,bad:bad,note:wrong?wrong+' of '+f.cats.length+' bars '+(wrong===1?'is':'are')+' not the right height yet (red).':''};
  }
  var rows=G.rows.map(function(r){return [r[f.key],r[G.y.key]];}), used=rows.map(function(){return false;});
  var xt=f.tol!=null?f.tol:0.5, yt=G.y.tol!=null?G.y.tol:150, extra=0;
  (st.pts||[]).forEach(function(p,i){
    var best=-1, bd=1e9;
    rows.forEach(function(r,j){
      if(used[j]||Math.abs(p[0]-r[0])>xt||Math.abs(p[1]-r[1])>yt) return;
      var dd=Math.abs(p[1]-r[1]); if(dd<bd){bd=dd; best=j;}
    });
    if(best>=0) used[best]=true; else { bad[i]=true; extra++; }
  });
  var hit=used.filter(Boolean).length;
  var note=hit+' of '+rows.length+' students are plotted correctly.'+(extra?' '+extra+(extra===1?' dot does':' dots do')+' not match a student in the table (red).':'');
  return {ok:hit===rows.length&&!extra,bad:bad,note:note};
}
function gPlotText(G,f,st){
  if(f.kind==='bar') return f.cats.map(function(c){var v=st.bars[c]; return c+': '+(typeof v==='number'&&!isNaN(v)?nfmt(v):'(empty)');}).join(', ');
  var pts=(st.pts||[]).slice().sort(function(a,b){return a[0]-b[0]||a[1]-b[1];});
  return pts.length?pts.length+' dots: '+pts.map(function(p){return '('+nfmt(p[0])+', '+nfmt(p[1])+')';}).join(' '):'(no dots)';
}
function graphQ(id,q){
  var G=q.graph, ids={};
  var SUM={type:'Graph type',x:'X-axis label',y:'Y-axis label',title:'Title',plot:'Plotted data'};
  GSTEPS.forEach(function(k){ ids[k]=id+'_'+k; AUTO[ids[k]]={sum:SUM[k]}; });
  ORDER.push({kind:'graph',id:id,q:CURQ,sub:'',G:G,ids:ids});
  if(!S.graphs) S.graphs={};
  var st=S.graphs[id]||(S.graphs[id]={f:'',title:'',by:{}});
  if(!st.by) st.by={};
  var lastBad={}, plotMsg='';
  function f(){return gFactor(G,st.f);}
  function dat(){var k=st.f; return st.by[k]||(st.by[k]={pts:[],bars:{}});}
  function r(k){return S.auto[ids[k]]||null;}
  function ok(k){var x=r(k); return !!(x&&x.ok);}
  function done(){return ok('plot');}
  function clearChecks(){ GSTEPS.forEach(function(k){ var p=r(k); if(p) S.auto[ids[k]]={v:'',ok:false,miss:p.miss||0}; }); lastBad={}; plotMsg=''; }

  var wrap=h('div','gwrap');
  /* the factor */
  var fRow=h('div','ctl'), fSel=h('select'); fSel.id='f-'+id+'_factor';
  var fLab=h('label',null,G.factorLabel||'Choose the factor you will graph'); fLab.htmlFor=fSel.id;
  fSel.append(new Option('Choose a factor…',''));
  G.factors.forEach(function(x){fSel.append(new Option(x.name,x.key));});
  var fMsg=h('p','msg'); fMsg.setAttribute('aria-live','polite');
  fRow.append(fLab,fSel,fMsg);
  /* a checked drop-down for one step */
  function stepSel(k,label,options,tip){
    var w=h('div','ctl gstep'); mark(w); w.dataset.s='idle';
    var sel=h('select'); sel.id='f-'+ids[k];
    var l=h('label'); l.append(itxt(label)); l.htmlFor=sel.id;
    sel.append(new Option('Choose…',''));
    options.forEach(function(t){sel.append(new Option(t,t));});
    var stt=h('span','st'); stt.setAttribute('aria-hidden','true');
    var msg=h('p','msg'); msg.setAttribute('aria-live','polite');
    w.append(l,sel,stt,msg);
    sel.addEventListener('change',function(){
      var v=sel.value, p=r(k)||{miss:0};
      if(!v){ S.auto[ids[k]]={v:'',ok:false,miss:p.miss||0}; }
      else { var good=v===gAnswers(G,f())[k]; S.auto[ids[k]]={v:v,ok:good,miss:(p.miss||0)+(good?0:1)}; }
      paint(); commit();
    });
    return {w:w,sel:sel,st:stt,msg:msg,paint:function(){
      var x=r(k); sel.value=x&&x.v?x.v:''; sel.disabled=!f()||done();
      if(!x||!x.v){ w.dataset.s='idle'; stt.textContent=''; msg.textContent=''; return; }
      w.dataset.s=x.ok?'ok':'bad'; stt.textContent=x.ok?'✓':'✗';
      msg.textContent=x.ok?'Correct.':'Not yet. Tip: '+tip(x.v);
    }};
  }
  var labels=G.labels||[];
  function unitsTip(v,ans){ return ans.indexOf(v)===0&&ans.length>v.length?'Close. A good axis label also shows the units.':null; }
  var sType=stepSel('type','Step 1. Which kind of graph fits this factor?',G.types||['Bar graph','Scatter plot','Pie chart'],function(v){
    var fa=f(); if(!fa) return '';
    if(v==='Pie chart') return 'A pie chart shows the parts of one whole. Here you are comparing the vital capacity of different students.';
    return fa.kind==='bar'
      ?'Look at the values for '+fa.name.toLowerCase()+' in the table. They are groups with names, not numbers on a number line. Which graph compares groups side by side?'
      :'Look at the values for '+fa.name.toLowerCase()+' in the table. They are numbers on a scale. Which graph puts one dot for each student at the right spot on the scale?';
  });
  var sX=stepSel('x','Step 2. Label the x-axis (across the bottom).',labels,function(v){
    return unitsTip(v,f().label)||'The x-axis shows the independent variable: the factor you chose to compare.';
  });
  var sY=stepSel('y','Step 3. Label the y-axis (up the side).',labels,function(v){
    return unitsTip(v,G.y.label)||'The y-axis shows the dependent variable: the thing that was measured for every student.';
  });
  /* the title */
  var tW=h('div','ctl gstep'); mark(tW); tW.dataset.s='idle';
  var tIn=h('input'); tIn.type='text'; tIn.id='f-'+ids.title; tIn.autocomplete='off';
  var tL=h('label',null,'Step 4. Give your graph a title.'); tL.htmlFor=tIn.id;
  var tBtn=h('button','btn','Check'); tBtn.type='button';
  var tSt=h('span','st'); tSt.setAttribute('aria-hidden','true');
  var tRow=h('div','row'); tRow.append(tIn,tBtn,tSt);
  var tMsg=h('p','msg'); tMsg.setAttribute('aria-live','polite');
  tW.append(tL,tRow,tMsg);
  function titleTip(v){
    var low=v.toLowerCase(), fa=f();
    if(words(v)<3) return 'A title is a short phrase, like a headline, that says what the graph shows. Use at least three words.';
    if(G.y.title&&!G.y.title.test(low)) return 'Your title should name what was measured (the dependent variable).';
    if(fa.title&&!fa.title.test(low)) return 'Your title should also name the factor you are comparing.';
    return 'Try again.';
  }
  function checkTitle(){
    var v=tIn.value.trim().replace(/\s+/g,' '), p=r('title')||{miss:0};
    st.title=v;
    if(!v) return;
    var low=v.toLowerCase(), fa=f();
    var good=words(v)>=3&&(!G.y.title||G.y.title.test(low))&&(!fa.title||fa.title.test(low));
    S.auto[ids.title]={v:v,ok:good,miss:(p.miss||0)+(good?0:1)};
    paint(); commit();
  }
  tBtn.addEventListener('click',checkTitle);
  tIn.addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();checkTitle();}});
  tIn.addEventListener('input',function(){
    st.title=tIn.value; var x=r('title');
    if(x&&x.v){ S.auto[ids.title]={v:'',ok:false,miss:x.miss||0}; }
    drawFig(); commit(); paintTitle();
  });
  function paintTitle(){
    var x=r('title'); tIn.disabled=tBtn.disabled=!f()||done();
    if(document.activeElement!==tIn) tIn.value=st.title||'';
    if(!x||!x.v){ tW.dataset.s='idle'; tSt.textContent=''; tMsg.textContent=''; return; }
    tW.dataset.s=x.ok?'ok':'bad'; tSt.textContent=x.ok?'✓':'✗';
    tMsg.textContent=x.ok?'Correct. Your title names both variables.':'Not yet. Tip: '+titleTip(x.v);
  }
  /* the plot */
  var pW=h('div','gplot'); mark(pW); pW.dataset.s='idle';
  var pHead=h('p','gsteph','Step 5. Plot the data.');
  var pHint=h('p','whint');
  var fig=h('div','gfig gdraw'); fig.setAttribute('role','img');
  var tools=h('div','gtools');
  var pRow=h('div','row gap'), pChk=h('button','btn','Check my graph'); pChk.type='button'; pRow.append(pChk);
  var pMsg=h('p','msg'); pMsg.setAttribute('aria-live','polite');
  pW.append(pHead,pHint,fig,tools,pRow,pMsg);
  var others=h('div','gothers');
  wrap.append(fRow,sType.w,sX.w,sY.w,tW,pW,others);

  function chosen(k){var x=r(k); return x&&x.v?x.v:'';}
  function drawFig(){
    var fa=f();
    if(!fa){ fig.innerHTML=''; return; }
    var kind=ok('type')?fa.kind:null, d=dat();
    var g=graphSvg(G,fa,{kind:kind||(chosen('type')==='Bar graph'?'bar':'scatter'),title:st.title||'',xLabel:chosen('x'),yLabel:chosen('y'),pts:d.pts,bars:d.bars,bad:lastBad});
    fig.innerHTML=g.svg; fig._fr=g.fr;
    fig.setAttribute('aria-label','Your graph. '+(st.title?'Title: '+st.title+'. ':'')+gPlotText(G,fa,d)+'.');
  }
  function pending(){
    var fa=f(), x=r('plot'), p=x||{miss:0};
    S.auto[ids.plot]={v:gPlotText(G,fa,dat()),ok:false,miss:p.miss||0,pend:true};
    lastBad={}; plotMsg='';
  }
  /* bar graph: a number box for each bar; selecting inside the graph also sets a bar */
  function barTools(fa){
    tools.textContent='';
    var grid=h('div','nums');
    fa.cats.forEach(function(c){
      var w=h('div','ctl'), inp=h('input'); inp.type='text'; inp.inputMode='decimal'; inp.className='num'; inp.id='f-'+id+'_bar_'+c.replace(/\W+/g,'');
      var l=h('label',null,'Bar height for '+c); l.htmlFor=inp.id;
      var v=dat().bars[c]; inp.value=typeof v==='number'?String(v):''; inp.disabled=done();
      inp.addEventListener('input',function(){
        var n=numVal(inp.value); if(isNaN(n)) delete dat().bars[c]; else dat().bars[c]=n;
        pending(); drawFig(); commit(); paintPlotMsg();
      });
      var rw=h('div','row'); rw.append(inp,h('span','unit',G.y.unit||''));
      w.append(l,rw); grid.append(w);
    });
    tools.append(grid);
  }
  /* scatter plot: select an empty spot to add a dot, select a dot to take it away, or type a dot in */
  function dotTools(fa){
    tools.textContent='';
    var row=h('div','row gadd');
    var xi=h('input'), yi=h('input'); xi.type=yi.type='text'; xi.inputMode=yi.inputMode='decimal';
    xi.id='f-'+id+'_dx'; yi.id='f-'+id+'_dy'; xi.className=yi.className='num';
    var xl=h('label',null,fa.name+' (x)'); xl.htmlFor=xi.id;
    var yl=h('label',null,G.y.name+' (y)'); yl.htmlFor=yi.id;
    var add=h('button','btn ghost','Add dot'), undo=h('button','btn ghost','Undo last dot'), clr=h('button','btn ghost','Clear all dots');
    add.type=undo.type=clr.type='button';
    var cnt=h('span','whint');
    [xi,yi,add,undo,clr].forEach(function(e){e.disabled=done();});
    row.append(xl,xi,yl,yi,add);
    var row2=h('div','row'); row2.append(undo,clr,cnt);
    function count(){ cnt.textContent=dat().pts.length+' dots on your graph. The table has '+G.rows.length+' students.'; }
    function addDot(){
      var x=numVal(xi.value), y=numVal(yi.value);
      if(isNaN(x)||isNaN(y)){ plotMsg='Type both numbers first.'; paintPlotMsg(true); return; }
      dat().pts.push([x,y]); xi.value=yi.value=''; pending(); drawFig(); commit(); count(); paintPlotMsg(); xi.focus();
    }
    add.addEventListener('click',addDot);
    [xi,yi].forEach(function(e){e.addEventListener('keydown',function(ev){if(ev.key==='Enter'){ev.preventDefault(); addDot();}});});
    undo.addEventListener('click',function(){ if(!dat().pts.length) return; dat().pts.pop(); pending(); drawFig(); commit(); count(); paintPlotMsg(); });
    clr.addEventListener('click',function(){
      if(!dat().pts.length) return;
      if(clr.dataset.sure!=='1'){ clr.dataset.sure='1'; clr.textContent='Select again to erase every dot'; return; }
      clr.dataset.sure=''; clr.textContent='Clear all dots';
      dat().pts=[]; pending(); drawFig(); commit(); count(); paintPlotMsg();
    });
    tools.append(row,row2); count();
    tools._count=count;
  }
  function snap(v,s){return Math.round(v/s)*s;}
  var dragging=false;
  function figAt(e,start){
    var fa=f(), fr=fig._fr, svg=fig.querySelector('svg');
    if(!fa||!fr||!svg||!ok('type')||done()) return;
    var p=gPoint(svg,e); if(!p) return;
    if(p.x<fr.L-4||p.x>fr.L+fr.pw+4||p.y<fr.T-4||p.y>fr.T+fr.ph+4) return;
    var yv=G.y.max-(p.y-fr.T)/fr.ph*(G.y.max-G.y.min);
    yv=Math.max(G.y.min,Math.min(G.y.max,snap(yv,G.y.snap||10)));
    if(fa.kind==='bar'){
      var i=Math.floor((p.x-fr.L)/(fr.pw/fa.cats.length)); if(i<0||i>=fa.cats.length) return;
      dat().bars[fa.cats[i]]=snap(yv,G.barSnap||10);
      var inp=tools.querySelectorAll('input')[i]; if(inp) inp.value=String(dat().bars[fa.cats[i]]);
    } else {
      if(!start) return;
      var xv=fa.min+(p.x-fr.L)/fr.pw*(fa.max-fa.min), pts=dat().pts, hit=-1;
      pts.forEach(function(q0,k){ var dx=fr.X(q0[0])-p.x, dy=fr.Y(q0[1])-p.y; if(dx*dx+dy*dy<196) hit=k; });
      if(hit>=0) pts.splice(hit,1);
      else pts.push([Math.max(fa.min,Math.min(fa.max,snap(xv,fa.snap||1))),yv]);
      if(tools._count) tools._count();
    }
    pending(); drawFig(); commit(); paintPlotMsg();
  }
  fig.addEventListener('pointerdown',function(e){ if(e.button) return; dragging=true; figAt(e,true); });
  fig.addEventListener('pointermove',function(e){ if(dragging&&f()&&f().kind==='bar') figAt(e,false); });
  ['pointerup','pointercancel','pointerleave'].forEach(function(ev){fig.addEventListener(ev,function(){dragging=false;});});
  pChk.addEventListener('click',function(){
    var fa=f(); if(!fa) return;
    var res=gCheckPlot(G,fa,dat()), p=r('plot')||{miss:0};
    lastBad=res.bad; plotMsg=res.note;
    if(res.empty){ drawFig(); paintPlotMsg(true); return; }
    S.auto[ids.plot]={v:gPlotText(G,fa,dat()),ok:res.ok,miss:(p.miss||0)+(res.ok?0:1)};
    paint(); commit();
  });
  function paintPlotMsg(bad){
    var x=r('plot');
    pMsg.textContent='';
    if(done()){ pMsg.dataset.s='ok'; pMsg.append('Correct. Your graph matches the class data. ',itxt(q.explain||'')); return; }
    if(x&&x.v&&!x.pend&&!x.ok){ pMsg.dataset.s='bad'; pMsg.append(plotMsg?plotMsg+' ':'','Tip: ',itxt(f().kind==='bar'?(q.barTip||'The height of each bar is the average for that group. Add up the values for the group, then divide by the number of students in the group.'):(q.dotTip||'Each student in the table gets one dot. Find the student’s number on the x-axis, then go up to their measured value on the y-axis.'))); return; }
    if(plotMsg){ pMsg.dataset.s=bad?'bad':''; pMsg.textContent=plotMsg; return; }
    pMsg.removeAttribute('data-s');
  }
  function paintOthers(){
    others.textContent='';
    if(!done()) return;
    var fa=f(), rest=G.factors.filter(function(x){return x!==fa;});
    if(!rest.length) return;
    others.append(h('h3','gsteph',G.othersHeading||'Your lab group’s graphs'));
    others.append(h('p','intro',G.othersIntro||'In class, each person in a lab group graphs a different factor. Here are the graphs for the other factors. You will use all of the graphs in the next part.'));
    var grid=h('div','ggrid');
    rest.forEach(function(o){
      var a=gAnswers(G,o), d={kind:o.kind,title:o.groupTitle||(G.y.name+' and '+o.name.toLowerCase()),xLabel:a.x,yLabel:a.y};
      if(o.kind==='bar'){ var av=gAverages(G,o); d.bars={}; o.cats.forEach(function(c,i){d.bars[c]=Math.round(av[i]);}); }
      else d.pts=G.rows.map(function(rw){return [rw[o.key],rw[G.y.key]];});
      var fg=h('figure','gfig small'), gs=graphSvg(G,o,d);
      fg.innerHTML=gs.svg; fg.setAttribute('role','img'); fg.setAttribute('aria-label','Graph: '+d.title+'. '+gPlotText(G,o,{pts:d.pts,bars:d.bars||{}})+'.');
      grid.append(fg);
    });
    others.append(grid);
  }
  function paint(){
    var fa=f(), fin=done();
    fSel.value=st.f||''; fSel.disabled=fin;
    fMsg.textContent=fin?'':(fa?(G.factorNote||'You can switch to a different factor, but your checked steps will start over.'):'');
    [sType,sX,sY].forEach(function(x){x.paint();});
    paintTitle();
    var on=!!fa&&ok('type');
    pW.hidden=!fa;
    fig.style.touchAction=on&&fa.kind==='bar'?'none':'';
    pHint.textContent=!fa?'':(!on?'Finish Step 1 first. Your graph will appear here, and it updates as you work.'
      :(fa.kind==='bar'?'Make one bar for each group. The height of each bar is the group’s average '+G.y.name.toLowerCase()+'. Type each height in the boxes under the graph, or select inside the graph to set a bar.'
        :'Add one dot for each student in the table. Select a spot on the graph to add a dot there (it snaps to the nearest grid line), select a dot to remove it, or type the numbers under the graph.'));
    if(fa&&on){ if(fa.kind==='bar') barTools(fa); else dotTools(fa); tools.hidden=false; pRow.hidden=fin; }
    else { tools.textContent=''; tools.hidden=true; pRow.hidden=true; }
    var x=r('plot');
    pW.dataset.s=fin?'ok':(x&&x.v&&!x.pend?'bad':'idle');
    drawFig(); paintPlotMsg(); paintOthers();
  }
  fSel.addEventListener('change',function(){
    if(fSel.value===st.f) return;
    st.f=fSel.value; st.title='';
    clearChecks(); paint(); commit();
  });
  paint();
  return wrap;
}
/* the student's graph for the PDF */
function graphReport(o){
  var G=o.G, st=(S.graphs||{})[o.id]||{}, fa=gFactor(G,st.f), out=[];
  function v(k){var r=S.auto[o.ids[k]]; return r&&r.v?r.v:'';}
  if(!fa) return [{sub:'Factor graphed',resp:['(no factor chosen)'],tag:'',rich:null}];
  out.push({sub:'Factor graphed',resp:[fa.name],tag:'',rich:null});
  GSTEPS.forEach(function(k){
    var r=S.auto[o.ids[k]], it={sub:AUTO[o.ids[k]].sum,resp:[],tag:'',rich:null};
    if(k==='plot'){
      var d=(st.by||{})[st.f]||{pts:[],bars:{}};
      it.resp=[gPlotText(G,fa,d)];
      it.svg=graphSvg(G,fa,{kind:fa.kind,title:v('title')||st.title||'',xLabel:v('x'),yLabel:v('y'),pts:d.pts,bars:d.bars}).svg;
    } else it.resp=[v(k)||'(no answer)'];
    it.tag=autoTag(r);
    out.push(it);
  });
  return out;
}
function autoTag(r){
  if(!r) return '';
  var miss=r.miss?r.miss+(r.miss===1?' wrong try':' wrong tries'):'';
  if(!r.v) return miss;
  return (r.pend?'not checked yet':(r.ok?'correct':'incorrect'))+(miss?' • '+miss:'');
}
/* an SVG drawing as a PNG for the PDF */
async function svgPng(svg,scale){
  var img=new Image(), url='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);
  await new Promise(function(res,rej){img.onload=res; img.onerror=rej; img.src=url;});
  var w=img.naturalWidth||640, hgt=img.naturalHeight||450, c=document.createElement('canvas');
  c.width=w*scale; c.height=hgt*scale;
  var x=c.getContext('2d'); x.fillStyle='#ffffff'; x.fillRect(0,0,c.width,c.height); x.drawImage(img,0,0,c.width,c.height);
  var blob=await new Promise(function(r){c.toBlob(r,'image/png');});
  return {bytes:new Uint8Array(await blob.arrayBuffer()),w:w,h:hgt};
}

/* ------------------------------------------------------------------ */
/* Builders: written answers                                           */
/* ------------------------------------------------------------------ */
function writtenField(id,placeholder){
  var c=W[id];
  ORDER.push({kind:'written',id:id,q:CURQ,sub:''});
  var st=S.written[id]||(S.written[id]={text:''});
  var wrap=h('div','sub'); mark(wrap); wrap.dataset.s='idle';
  var ta=h('textarea'); ta.id='f-'+id; ta.rows=4; ta.value=st.text||''; ta.spellcheck=true;
  ta.setAttribute('placeholder',placeholder||'Type your answer here');
  ta.setAttribute('aria-label','Your written answer');
  wrap.append(ta);
  var cnt=h('p','words'); var msg=h('p','msg'); msg.setAttribute('aria-live','polite');
  wrap.append(cnt,msg);
  function grow(){ta.style.height='auto';ta.style.height=Math.max(ta.scrollHeight+2,100)+'px';}
  function sync(){
    var n=words(st.text), enough=(st.text||'').trim().length>=c.min;
    cnt.textContent=n+(n===1?' word':' words');
    msg.textContent=enough?'Saved. Your teacher grades this one.':'Write at least a couple of sentences.';
    wrap.dataset.s=enough?'ok':'idle';
  }
  ta.addEventListener('input',function(){st.text=ta.value;grow();sync();commit();});
  sync(); setTimeout(grow,0);
  return wrap;
}

/* ------------------------------------------------------------------ */
/* Builders: photos of the student's own work                          */
/* ------------------------------------------------------------------ */
/* A photo is too big for localStorage, so the picture itself goes in IndexedDB under KEY|question id.
   S.photos[id] keeps only {has, cap, w, h}. If IndexedDB is not available the photo lives in memory
   until the page is closed. */
var PHOTO_MEM={}, PHOTO_URL={}, PDB=null, CAMS=[];
var CAN_CAM=!!(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia);
function photoDb(){
  if(!PDB) PDB=new Promise(function(res,rej){
    try{
      var rq=indexedDB.open('explore-photos',1);
      rq.onupgradeneeded=function(){rq.result.createObjectStore('photos');};
      rq.onsuccess=function(){res(rq.result);};
      rq.onerror=function(){rej(rq.error);};
    }catch(e){rej(e);}
  });
  return PDB;
}
function photoTx(mode,fn){
  return photoDb().then(function(db){
    return new Promise(function(res,rej){
      var tx=db.transaction('photos',mode), out=fn(tx.objectStore('photos'));
      tx.oncomplete=function(){res(out&&'result' in out?out.result:true);};
      tx.onerror=function(){rej(tx.error);}; tx.onabort=function(){rej(tx.error);};
    });
  });
}
function photoKey(id){return KEY+'|'+id;}
function photoPut(id,buf){
  PHOTO_MEM[id]=buf;
  return photoTx('readwrite',function(os){os.put(buf,photoKey(id));}).then(function(){return true;},function(){return false;});
}
function photoGet(id){
  if(PHOTO_MEM[id]) return Promise.resolve(PHOTO_MEM[id]);
  return photoTx('readonly',function(os){return os.get(photoKey(id));}).then(function(b){
    if(b) PHOTO_MEM[id]=b; return b||null;
  },function(){return null;});
}
function photoDel(id){
  delete PHOTO_MEM[id];
  return photoTx('readwrite',function(os){os.delete(photoKey(id));}).catch(function(){});
}
function photoClearAll(){
  Object.keys(PHOTO_MEM).forEach(function(k){delete PHOTO_MEM[k];});
  return photoTx('readwrite',function(os){os.delete(IDBKeyRange.bound(KEY+'|',KEY+'|￿'));}).catch(function(){});
}
/* open webcam streams; every one is stopped when the page re-renders */
function camStop(st){
  st.getTracks().forEach(function(t){t.stop();});
  var i=CAMS.indexOf(st); if(i>=0) CAMS.splice(i,1);
}
function photoUrlsDrop(){
  CAMS.slice().forEach(camStop);
  Object.keys(PHOTO_URL).forEach(function(k){URL.revokeObjectURL(PHOTO_URL[k]); delete PHOTO_URL[k];});
}
/* reads any picture the browser can open, turns it upright, and saves it as a JPEG no wider or taller
   than 1600 pixels (about 150 to 300 KB) */
function shrinkPhoto(file){
  function viaImg(){
    return new Promise(function(res,rej){
      var u=URL.createObjectURL(file), im=new Image();
      im.onload=function(){res(im); setTimeout(function(){URL.revokeObjectURL(u);},0);};
      im.onerror=function(){URL.revokeObjectURL(u); rej(new Error('decode'));};
      im.src=u;
    });
  }
  var dec=window.createImageBitmap?createImageBitmap(file,{imageOrientation:'from-image'}).catch(viaImg):viaImg();
  return dec.then(function(src){
    var w=src.naturalWidth||src.width, ht=src.naturalHeight||src.height;
    if(!w||!ht) throw new Error('decode');
    var k=Math.min(1,1600/Math.max(w,ht)), c=document.createElement('canvas');
    c.width=Math.max(1,Math.round(w*k)); c.height=Math.max(1,Math.round(ht*k));
    var x=c.getContext('2d'); x.fillStyle='#fff'; x.fillRect(0,0,c.width,c.height);
    x.drawImage(src,0,0,c.width,c.height);
    if(src.close) src.close();
    return new Promise(function(r){c.toBlob(r,'image/jpeg',0.8);}).then(function(b){
      if(!b) throw new Error('encode');
      return b.arrayBuffer().then(function(buf){return {buf:buf,w:c.width,h:c.height};});
    });
  });
}
function photoField(id,q){
  P[id]=true;
  ORDER.push({kind:'photo',id:id,q:CURQ,sub:''});
  var st=S.photos[id]||(S.photos[id]={has:false,cap:''});
  var wrap=h('div','sub photo'); mark(wrap);
  var input=document.createElement('input'); input.type='file'; input.accept='image/*'; input.hidden=true;
  input.setAttribute('aria-hidden','true'); input.tabIndex=-1;
  var fig=h('figure','qimg'), im=document.createElement('img'); im.alt='Your photo for question '+CURQ.num; fig.append(im);
  var row=h('div','row gap');
  var add=h('button','btn'); add.type='button';
  var cam=h('button','btn ghost','Take a picture with my camera'); cam.type='button'; cam.hidden=!CAN_CAM;
  var del=h('button','btn ghost','Remove photo'); del.type='button';
  var msg=h('span','msg'); msg.setAttribute('aria-live','polite');
  row.append(add,cam,del,msg);
  /* webcam: a live preview and a Take picture button, shown only while the camera is on */
  var camBox=h('div','campanel'); camBox.hidden=true;
  var vid=document.createElement('video'); vid.muted=true; vid.playsInline=true; vid.setAttribute('playsinline','');
  vid.setAttribute('aria-label','Camera preview');
  var snap=h('button','btn','Take picture'); snap.type='button';
  var stopB=h('button','btn ghost','Cancel'); stopB.type='button';
  var crow=h('div','row gap'); crow.append(snap,stopB); camBox.append(vid,crow);
  var stream=null;
  var lab=h('label',null,q.caption||'What does your photo show? Name the parts you can see.'); lab.htmlFor='c-'+id;
  var ta=h('textarea'); ta.id='c-'+id; ta.rows=2; ta.value=st.cap||'';
  ta.setAttribute('placeholder',q.placeholder||'Type your caption here');
  wrap.append(input,fig,row,camBox,lab,ta);
  function say(t,bad){msg.textContent=t; if(bad) msg.dataset.s='bad'; else msg.removeAttribute('data-s');}
  function show(buf){
    if(PHOTO_URL[id]) URL.revokeObjectURL(PHOTO_URL[id]);
    PHOTO_URL[id]=URL.createObjectURL(new Blob([buf],{type:'image/jpeg'}));
    im.src=PHOTO_URL[id];
  }
  function paint(){
    fig.hidden=!st.has; del.hidden=!st.has;
    add.textContent=st.has?'Replace photo':'Add a photo';
    wrap.dataset.s=st.has?'ok':'idle';
  }
  function camOff(){
    if(stream){ camStop(stream); stream=null; }
    vid.srcObject=null; camBox.hidden=true; cam.disabled=false;
  }
  function savePhoto(file){
    add.disabled=true; say('Adding your photo…');
    return shrinkPhoto(file).then(function(p){
      return photoPut(id,p.buf).then(function(kept){
        st.has=true; st.w=p.w; st.h=p.h; show(p.buf); paint(); commit();
        if(kept) say('Photo added. Your teacher will see it in your PDF.');
        else say('Photo added, but this browser can’t keep it after you leave. Download your PDF before you close this page.',true);
      });
    }).catch(function(){
      say('This photo can’t be opened here. Take a screenshot of it or save it as a JPG, then try again.',true);
    }).then(function(){add.disabled=false;});
  }
  add.addEventListener('click',function(){camOff(); input.value=''; input.click();});
  input.addEventListener('change',function(){
    var file=input.files&&input.files[0];
    if(file) savePhoto(file);
  });
  cam.addEventListener('click',function(){
    cam.disabled=true; say('Starting your camera…');
    navigator.mediaDevices.getUserMedia({video:{facingMode:'user'},audio:false}).then(function(st){
      stream=st; CAMS.push(st); vid.srcObject=st; camBox.hidden=false;
      return vid.play();
    }).then(function(){
      say('Get in the picture, then press Take picture.'); snap.focus();
    }).catch(function(){
      camOff(); say('Your camera didn’t start. Allow camera access, or use Add a photo instead.',true);
    });
  });
  snap.addEventListener('click',function(){
    if(!vid.videoWidth) return;
    var c=document.createElement('canvas'); c.width=vid.videoWidth; c.height=vid.videoHeight;
    c.getContext('2d').drawImage(vid,0,0,c.width,c.height);
    camOff();
    c.toBlob(function(b){ if(b) savePhoto(b); else say('The picture didn’t work. Try again.',true); },'image/jpeg',0.92);
  });
  stopB.addEventListener('click',function(){camOff(); say(''); cam.focus();});
  del.addEventListener('click',function(){
    photoDel(id); st.has=false; delete st.w; delete st.h;
    if(PHOTO_URL[id]){URL.revokeObjectURL(PHOTO_URL[id]); delete PHOTO_URL[id];}
    im.removeAttribute('src'); paint(); commit(); say('Photo removed.');
    add.focus();
  });
  ta.addEventListener('input',function(){st.cap=ta.value; commit();});
  paint();
  if(st.has) photoGet(id).then(function(buf){
    if(buf){ show(buf); return; }
    st.has=false; paint(); commit();
    say('Your photo isn’t saved in this browser anymore. Please add it again.',true);
  });
  return wrap;
}

/* ------------------------------------------------------------------ */
/* Builders: agreement (a safety pledge: check every statement, then   */
/* sign with your name). Saved in S.agree[id] = {on:[...], sign, at}.  */
/* ------------------------------------------------------------------ */
function agreeField(id,q){
  var items=q.items||[];
  ORDER.push({kind:'agree',id:id,q:CURQ,sub:'',items:items,sign:!!q.sign});
  var st=S.agree[id]||(S.agree[id]={on:[],sign:'',at:''});
  var wrap=h('div','ctl'); mark(wrap);
  var boxes=items.map(function(t,i){
    var lab=h('label','opt'), inp=document.createElement('input'); inp.type='checkbox'; inp.checked=!!st.on[i];
    var sp=h('span'); sp.append(itxt(t)); lab.append(inp,sp); wrap.append(lab);
    inp.addEventListener('change',function(){st.on[i]=inp.checked; changed();});
    return lab;
  });
  if(q.sign){
    var sl=h('label','signlab','Type your first and last name to sign'); sl.htmlFor='f-'+id;
    var sig=h('input'); sig.type='text'; sig.id='f-'+id; sig.autocomplete='name'; sig.value=st.sign||'';
    wrap.append(sl,sig);
    sig.addEventListener('input',function(){st.sign=sig.value; changed();});
  }
  var msg=h('p','msg'); msg.setAttribute('aria-live','polite'); wrap.append(msg);
  function done(){ return items.every(function(t,i){return !!st.on[i];})&&(!q.sign||words(st.sign)>=2); }
  function changed(){ st.at=done()?(st.at||new Date().toISOString()):''; paint(); commit(); }
  function paint(){
    boxes.forEach(function(lab,i){ if(st.on[i]) lab.dataset.s='ok'; else lab.removeAttribute('data-s'); });
    var d=done(), left=items.some(function(t,i){return !st.on[i];});
    wrap.dataset.s=d?'ok':'idle';
    msg.textContent=d?'Thank you. You agreed to every statement.':(left?'Check every box to agree.'+(q.sign?' Then type your first and last name to sign.':''):'Type your first and last name to sign.');
  }
  paint();
  return wrap;
}

/* A part with gate: true hides every later part, and the Finish section, until everything in that part and in every
   part before it is done. Once open it stays open. */
var GATE=null;
function gateSetup(app){
  GATE=null;
  var gi=-1;
  (A.parts||[]).some(function(p,i){ if(p.gate){gi=i; return true;} return false; });
  if(BOARD||GATED||TEACHER||gi<0||gi>=(A.parts||[]).length-1) return;
  var n=gi+1, word=A.partWord||'Part', last=(A.parts||[]).length;
  var later=[]; for(var k=n+1;k<=last;k++) later.push($('#part'+k,app));
  var before=[]; for(var j=1;j<=n;j++) before.push($('#part'+j,app));
  var need=n===1?word+' 1':n===2?word+'s 1 and 2':word+'s 1 to '+n;
  var note=h('div','gate'); note.setAttribute('aria-live','polite');
  $('#part'+n,app).after(note);
  GATE={n:n,later:later,before:before,note:note,
    locked:word+'s '+(n+1)+' to '+last+' and the Finish section are locked. They open when you finish everything in '+need+'.',
    open:word+' '+(n+1)+' is open. Keep going!'};
}
function gateCheck(){
  if(!GATE) return;
  var c=[]; GATE.before.forEach(function(sec){ c=c.concat([].slice.call(sec.querySelectorAll('[data-c]'))); });
  var now=false;
  if(!S.open&&c.length&&c.every(function(e){return e.dataset.s==='ok';})){ S.open=true; save(); now=true; }
  GATE.later.forEach(function(s){s.hidden=!S.open;});
  var fin=$('#finish'); if(fin) fin.hidden=!S.open;
  if(!S.open){ GATE.note.hidden=false; GATE.note.removeAttribute('data-s'); GATE.note.textContent=GATE.locked; }
  else if(now){ GATE.note.hidden=false; GATE.note.dataset.s='ok'; GATE.note.textContent=GATE.open; }
  else if(!GATE.note.dataset.s) GATE.note.hidden=true;
}

/* written answer with a yellow highlighter for the transition words that point to evidence */
function extract(ed){
  var segs=[];
  function push(t,hl){
    if(!t) return;
    var L=segs[segs.length-1];
    if(L&&L[1]===hl) L[0]+=t; else segs.push([t,hl]);
  }
  function endsNL(){var L=segs[segs.length-1]; return !!L&&L[0].slice(-1)==='\n';}
  function isHl(el){
    var b=el.style&&el.style.backgroundColor;
    if(!b||/^(transparent|initial|inherit|unset|rgba\(0,\s*0,\s*0,\s*0\))$/i.test(b)) return false;
    var m=b.match(/(\d+)\D+(\d+)\D+(\d+)/); if(!m) return 'y';
    var r=+m[1], g=+m[2], bl=+m[3];
    if(r<120&&g>150&&bl>150) return 'b';
    if(r<120&&g>150&&bl<120) return 'g';
    return 'y';
  }
  function walk(node,hl){
    if(node.nodeType===3){push(node.nodeValue.replace(/ /g,' '),hl); return;}
    if(node.nodeType!==1) return;
    var tag=node.tagName;
    if(tag==='BR'){push('\n',false); return;}
    var block=/^(DIV|P|LI)$/.test(tag);
    if(block&&segs.length&&!endsNL()) push('\n',false);
    var h2=isHl(node)||hl;
    for(var c=node.firstChild;c;c=c.nextSibling) walk(c,h2);
  }
  for(var c=ed.firstChild;c;c=c.nextSibling) walk(c,false);
  var L=segs[segs.length-1];
  while(L){
    L[0]=L[0].replace(/\s+$/,'');
    if(L[0]) break;
    segs.pop(); L=segs[segs.length-1];
  }
  return segs;
}
function fillEditor(ed,segs){
  ed.textContent='';
  (segs||[]).forEach(function(s){
    var parts=String(s[0]).split('\n');
    parts.forEach(function(p,i){
      if(i>0) ed.append(document.createElement('br'));
      if(!p) return;
      if(hlCode(s[1])){var sp=document.createElement('span'); sp.style.backgroundColor=HLC[hlCode(s[1])]; sp.textContent=p; ed.append(sp);}
      else ed.append(document.createTextNode(p));
    });
  });
}
function richField(id){
  var c=R[id];
  ORDER.push({kind:'rich',id:id,q:CURQ,sub:''});
  var st=S.rich[id]||(S.rich[id]={segs:[]});
  /* a question that changed from a plain written box keeps the student's earlier answer */
  var old=S.written[id];
  if(!segsPlain(st.segs).trim()&&old&&(old.text||'').trim()){ st.segs=[[old.text,false]]; delete S.written[id]; }
  var wrap=h('div','sub'); mark(wrap); wrap.dataset.s='idle';
  var bar=h('div','evbar'); bar.setAttribute('role','group'); bar.setAttribute('aria-label','Highlight tools');
  /* each button's tip (shown on hover, keyboard focus, or a tap) says what that color is for */
  var tools=c.cer?[['b','Claim (blue)','btn hl hlb','Claim (your opinion): select the words that give your claim, then press this button to highlight them in blue.'],
                   ['y','Evidence (yellow)','btn hl','Using evidence to support your view: select your evidence, then press this button to highlight it in yellow.'],
                   ['g','Reasoning/Expand (green)','btn hl hlg','Reasoning/Expand on your thoughts: select where you explain how your evidence supports your claim, then press this button to highlight it in green.']]
                 :[['y','Highlight selected text yellow','btn hl','Transition words that point to evidence: select them, then press this button to highlight them in yellow. This shows where your evidence is.']];
  tools.push([false,'Remove highlight','btn ghost','Select highlighted words, then press this button to take the color off.']);
  var bmsg=h('span','msg'); bmsg.setAttribute('aria-live','polite');
  tools.forEach(function(t,k){
    var b=h('button',t[2],t[1]); b.type='button';
    var tip=h('span','tip',t[3]); tip.id='tip-'+id+'-'+k; tip.setAttribute('role','tooltip'); b.setAttribute('aria-describedby',tip.id);
    var w=h('span','tipwrap'+(k===tools.length-1?' tipend':'')); w.append(b,tip);
    /* touch screens have no hover: show the tip for a few seconds after a tap */
    b.addEventListener('pointerdown',function(e){
      if(e.pointerType==='mouse') return;
      w.classList.add('tipon'); clearTimeout(w._t); w._t=setTimeout(function(){w.classList.remove('tipon');},3500);
    });
    t.splice(3,1,b); bar.append(w);
  });
  bar.append(bmsg);
  var ed=h('div','ev'); ed.id='f-'+id; ed.contentEditable='true'; ed.setAttribute('role','textbox'); ed.setAttribute('aria-multiline','true');
  ed.setAttribute('aria-label','Your written response'); ed.spellcheck=true; ed.setAttribute('data-placeholder','Begin your response here...');
  fillEditor(ed,st.segs);
  var cnt=h('p','words'); var msg=h('p','msg'); msg.setAttribute('aria-live','polite');
  wrap.append(bar,ed,cnt,msg);
  function sync(){
    var plain=segsPlain(st.segs), n=words(plain), hl=segsHlWords(st.segs), enough=plain.trim().length>=c.min;
    var all=c.cer?(segsHlWords(st.segs,'b')&&segsHlWords(st.segs,'y')&&segsHlWords(st.segs,'g')):hl;
    cnt.textContent=n+(n===1?' word':' words')+', '+hl+' highlighted';
    msg.textContent=!enough?'Write at least a couple of sentences.':all?'Saved. Your teacher grades this one.'
      :c.cer?'Saved. Remember to highlight your claim in blue, your evidence in yellow, and your reasoning (where you expand on your thoughts) in green.'
      :'Saved. Remember to highlight your transition words in yellow.';
    wrap.dataset.s=enough?'ok':'idle';
  }
  function readEd(){
    st.segs=extract(ed);
    if(!st.segs.length&&ed.innerHTML) ed.innerHTML='';
    sync(); commit();
  }
  ed.addEventListener('input',readEd);
  var saved=null;
  document.addEventListener('selectionchange',function(){
    var sel=window.getSelection();
    if(!sel||!sel.rangeCount) return;
    var r=sel.getRangeAt(0);
    if(ed.contains(r.commonAncestorContainer)) saved=r.cloneRange();
  });
  tools.forEach(function(p){
    var btn=p[3], yes=p[0];
    btn.addEventListener('mousedown',function(e){e.preventDefault();});
    btn.addEventListener('click',function(){
      ed.focus();
      var sel=window.getSelection();
      if(saved){sel.removeAllRanges(); sel.addRange(saved);}
      if(!sel.rangeCount||sel.isCollapsed||!ed.contains(sel.getRangeAt(0).commonAncestorContainer)){
        bmsg.removeAttribute('data-s'); bmsg.textContent='Select some of your words first.'; return;
      }
      try{document.execCommand('styleWithCSS',false,true);}catch(e){}
      var ok=false;
      try{ok=document.execCommand('hiliteColor',false,yes?HLC[yes]:'transparent');}catch(e){}
      if(!ok){try{document.execCommand('backColor',false,yes?HLC[yes]:'transparent');}catch(e){}}
      bmsg.dataset.s='ok'; bmsg.textContent=yes?'Highlighted.':'Highlight removed.';
      readEd();
    });
  });
  sync();
  return wrap;
}

/* ------------------------------------------------------------------ */
/* Written-answer self-check                                           */
/* ------------------------------------------------------------------ */
/* Sentence starters (from assignment.js). Students read them and type them out themselves. */
function startersEl(id,list){
  var d=h('details','starters'); d.append(h('summary',null,'Need help getting started? See sentence starters'));
  var box=h('div','stbox');
  box.append(h('p','inote','Pick a starter, type it into your answer, and finish the sentence in your own words. You can use more than one.'));
  var ul=h('ul');
  list.forEach(function(t){
    var li=h('li'), sp=h('span'); sp.append(itxt(t)); li.append(sp); ul.append(li);
  });
  box.append(ul); d.append(box);
  return d;
}

/* Writing check: capital letters, end marks, sentence problems, and common grammar mix-ups.
   Simple rules that run in the browser. Nothing the student writes leaves the page. Spelling is left to the
   browser's own red underline. */
var GFIX=[
  [/\b(i)(?=\b(?!\.)|'(?:m|ve|ll|d)\b)/g,function(m){return 'Use a capital “I” when you mean yourself.';}],
  [/\b(dont|doesnt|didnt|cant|isnt|wasnt|arent|werent|couldnt|shouldnt|wouldnt|havent|hasnt|hadnt|im|ive|thats|theyre|youre|whats|theres|heres|wont)\b/gi,function(m){
    var fix={dont:'don’t',doesnt:'doesn’t',didnt:'didn’t',cant:'can’t',isnt:'isn’t',wasnt:'wasn’t',arent:'aren’t',werent:'weren’t',couldnt:'couldn’t',shouldnt:'shouldn’t',wouldnt:'wouldn’t',havent:'haven’t',hasnt:'hasn’t',hadnt:'hadn’t',im:'I’m',ive:'I’ve',thats:'that’s',theyre:'they’re',youre:'you’re',whats:'what’s',theres:'there’s',heres:'here’s',wont:'won’t'}[m.toLowerCase()];
    return 'This word needs an apostrophe: “'+fix+'”.';}],
  [/\balot\b/gi,function(){return '“A lot” is two words.';}],
  [/\b(should|could|would|must|might) of\b/gi,function(m){return 'Write “'+m.split(' ')[0]+' have,” not “'+m+'.”';}],
  [/\b(more|less|better|worse|bigger|smaller|greater|larger|faster|slower|higher|lower|thicker|thinner|stronger|weaker|longer|shorter|rather|other) then\b|\b(more|less) [a-z]+ then\b/gi,function(m){return 'When you compare two things, use “than,” not “then.”';}],
  [/\btheir (is|are|was|were)\b/gi,function(){return 'Use “there” here. “Their” means it belongs to them.';}],
  [/\bits (a|an|the|not|because|very|important|also|going|true)\b/gi,function(){return 'Use “it’s” (it is) here. “Its” means belonging to it.';}],
  [/\bit's (own)\b/gi,function(){return 'Use “its” (no apostrophe) here. It means belonging to it.';}],
  [/\bto (much|many)\b/gi,function(m){return 'Use “too” (meaning more than enough): “too '+m.split(' ')[1]+'.”';}],
  [/\b(is|are|was|were|be|get|got|seems?|felt|feels?) to (big|small|fast|slow|hard|easy|hot|cold|late|early|thick|thin|long|short|little|high|low|loud|weak|strong)\b/gi,function(m){return 'Use “too” here (meaning more than enough): “… too '+m.split(' ')[2]+'.”';}],
  [/\bto(?=[.!?])/gi,function(m,t,i){return /\b(attached|connected|related|compared|according|due|next|close|similar|belongs?|listen|talk|went|go|goes|come|comes|used|up|back|happens?|happened|want|wants|need|needs|have|has|had|going|supposed)\s+$/i.test(t.slice(Math.max(0,i-14),i))?null:'If you mean “also,” use “too” at the end of a sentence.';}],
  [/\btwo (the|a|an|my|your|our|their|his|her|its|be|see|get|go|make|do|help|find|show|keep|move|carry|pump|take|have|know|learn|use|test|check|form|break|bring|send|stop|start|work|look|understand|protect|supply|deliver|remove|fight|fit|hold)\b/gi,function(){return 'Use “to” here. “Two” is the number 2.';}],
  [/\btwo (much|many)\b/gi,function(m){return 'Use “too” here (meaning more than enough). “Two” is the number 2.';}],
  [/\btoo (the|a|an|my|your|our|their|his|her|be|see|get|go|make|do|help|find|show|carry|pump|take|keep|move)\b/gi,function(){return 'Use “to” here. “Too” means “also” or “more than enough.”';}],
  [/\b(thing|things|stuff)\b/gi,function(m,t,i){return /living\s+$/i.test(t.slice(Math.max(0,i-8),i))?null:'“'+m+'” is not specific. Name exactly what you mean, such as the part, the process, or the tool.';}],
  [/\ba (?=[aeio][a-z])(?!one\b|once\b)[a-z]+/g,function(){return 'Use “an” before a word that starts with a vowel sound.';}],
  [/\b([a-z]+) \1\b/gi,function(m){return 'The word “'+m.split(' ')[0]+'” is written twice in a row.';}],
  [/ +[.,!?;:](?=\s|$)/g,function(){return 'Take out the space before this punctuation mark.';}],
  [/[a-z]{2}[.!?,;:](?=[A-Za-z])/g,function(){return 'Add a space after this punctuation mark.';},2]
];
var GSUB=/^(because|since|although|though|when|while|if|unless|whereas|after|before|even though)\b/i;
/* Incomplete sentences without a dictionary: a few word lists and rules that find the main verb of a sentence.
   A verb only counts when its neighbors say it is a verb ("cells" after "blood" is a noun; "carry" after "cells"
   is a verb), and a verb inside a "that," "because," or "where" part belongs to that part, not to the sentence. */
var GAUX=/^(is|are|was|were|be|been|am|being|has|have|had|do|does|did|can|could|will|would|shall|should|may|might|must|it's|that's|there's|here's|what's|he's|she's|i'm|i've|we're|they're|you're|we've|they've|don't|doesn't|didn't|can't|won't|isn't|aren't|wasn't|weren't|couldn't|shouldn't|wouldn't|let's|cannot)$/;
var GPAST=/^(went|came|saw|made|took|got|gave|found|felt|thought|knew|kept|held|ran|grew|became|began|brought|built|said|told|showed|lost|meant|sent|spent|stood|understood|wrote|ate|fell|forgot|heard|led|paid|sat|spoke|stuck|taught|threw|tore|woke|wore|won|broke|chose|drew|bled|fed|fought|dug|slid|learnt|swam|flew|hid|caught|bought|sought|became|rose|drove|rode|sang|shook)$/;
var GIRR=/^(need|think|know|want|like|see|feel|believe|learned|get|go|make|help|keep|use|move|carry|pump|take|give|look|find|work|flow|contain|connect|separate|return|send|receive|supply|deliver|absorb|release|exchange|protect|control|cause|affect|increase|decrease|depend|allow|prevent|stop|form|produce|create|break|fight|clot|bind|fit|attach|enter|leave|travel|pass|reach|push|pull|squeeze|contract|relax|expand|breathe|grow|live|die|eat|react|change|act|seem|appear|mean|show|tell|explain|describe|compare|draw|share|lay|stand|pinch|measure|record|add|divide|place|stay|become|have|call|name|write|say|hear|try|start|begin|end|finish|open|close|hold|turn|lead|follow|include|belong|differ|vary|match|test|check|come|run|sit|learn|understand|remember|notice|observe|discover|identify|classify|support|prove|bring|fill|empty|mix|pour|sink|float|swim|fly|hunt|catch|hide|survive|adapt|evolve|reproduce|digest|filter|wrap|cover|surround|line|lie|rest|sleep|wake|happen|occur|matter|count|weigh|cost|smell|taste|sound|bleed|heal|repair|build|store|transport|transfer|pick|drop|flip|grab|predict|guess|hope|agree|compete|cross|join|wash|wipe|clean|capitalize|italicize|underline|stretch|type|label|circle|answer|watch|listen|choose|select|remove|throw|mark|cut|put|set|hit|hurt|let|read|beat|spread|split|shut|left)$/;
var GPART=/^(called|named|known|located|found|made|used|considered|attached|connected|related|filled|covered|surrounded|shaped|labeled|labelled|found|taped|denatured|oxygenated|deoxygenated)$/;
var GDET=/^(the|a|an|this|these|those|my|our|your|their|his|its|some|many|each|every|no|any|both|few|several)$/;
var GDETN=/^(the|a|an|my|our|your|their|his|its|some|many|no|any|both|few|several)$/; /* words that always come before a noun */
var GPREP=/^(of|in|on|at|to|from|with|by|for|into|onto|through|between|under|over|near|behind|across|toward|towards|around|during|without|about|like|than|as|inside|outside|after|before)$/;
var GPRON=/^(i|you|we|they|he|she|it|people|children|everyone|someone|scientists|students|doctors|taxonomists)$/;
var GADVB=/^(also|still|really|just|only|never|always|usually|often|actually|probably|then|even|not|sometimes|mostly|first|now|already|both|all)$/;
var GPLN=/^(cells|valves|vessels|lungs|arteries|veins|capillaries|enzymes|pennies|chambers|organisms|molecules|proteins|receptors|neurons|neurotransmitters|structures|parts|nutrients|alveoli|atria|ventricles|organs|tissues|genes|species|animals|plants|bacteria|viruses|hormones|substrates|products|reactions|trials|results|data|males|females|lobes|hemispheres|nerves|muscles|bones|walls|layers|types|markers|antigens|antibodies|names|wings|birds|insects|groups|factors|graphs|numbers|seconds|minutes|times|days|years|things|ideas|ways|examples|videos|questions|answers|words|sentences|hands|fingers|thumbs|balls|bodies|humans|kids|friends|levels|areas|sides|problems|errors|steps|fluids|gases|ions|cases|diseases|symptoms|signals|platelets|chordae|folds|grooves|membranes|ligands|messengers|pathways|stages|predictions|hypotheses|chests|heights|ages|balloons|teachers|parents|patients|donors|transfusions|halves)$/;
var GNADJ=/^(very|more|most|so|too|her|red|white|blue|small|large|big|little|tiny|thick|thin|long|short|high|low|hot|cold|fast|slow|strong|weak|new|old|same|different|other|main|whole|entire|right|first|last|next|important|good|bad|best|better|common|normal|healthy|special|key|major|minor|many|few|two|three|four|several|such|own|certain|human|vital|pulmonary|coronary|competitive|chemical|scientific|common)$/;
var GSUBW=/^(that|which|who|where|because|since|although|though|while|if|unless|whereas|so)$/;
function isAdvb(x){return GADVB.test(x)||(x.length>4&&/ly$/.test(x)&&!/^(only|early|family|supply|apply|reply|belly|jelly)$/.test(x));}
/* is the word at i a verb, judging by the words around it? */
function verbAt(lw,i){
  var x=lw[i]; if(!x||x===',') return false;
  var j=i-1; while(j>=0&&isAdvb(lw[j])) j--;
  var p=j>=0?lw[j]:'', n=lw[i+1]||'';
  if(GAUX.test(x)) return true;
  if(x==='left') return GDET.test(n)||GPRON.test(n)||n===''||n===',';
  if(GPART.test(x)) return GAUX.test(p)||GPRON.test(p)||GPLN.test(p)||/^(it|them|him|her|me|us)$/.test(n);
  if(GPAST.test(x)) return true;
  var nounish=GDETN.test(p)||GPREP.test(p)||GNADJ.test(p);
  /* a base verb ("carry") counts after a subject, a helping verb, "which," or at the start; not after "the," "to," or "this" */
  if(GIRR.test(x)) return p===''||p===','||/^(these|those|which|who)$/.test(p)||p==='that'&&j>0&&(GPLN.test(lw[j-1])||/[^su]s$/.test(lw[j-1]))||!(nounish||p==='to'||p==='this'||p==='that');
  if(i>0&&x.length>3&&/ed$/.test(x)) return !nounish&&j>=0;
  if(i>0&&x.length>3&&/[^su]s$/.test(x)&&!/(ss|ous|is|us)$/.test(x)&&(!GPLN.test(x)||GDETN.test(n))) return !nounish&&j>=0;
  /* an unknown word right after "cells" or "which" is most likely the verb: "veins drain," "which cross" */
  if((GPLN.test(p)||/^(which|who)$/.test(p))&&!GADJ.test(x)&&!GDET.test(x)&&!GPREP.test(x)&&!GPLN.test(x)&&!GSUBW.test(x)&&!/^(and|or|but)$/.test(x)) return true;
  if(GPRON.test(p)&&p!=='people'&&p!=='children'&&!GADJ.test(x)&&!GDET.test(x)&&!GPREP.test(x)&&!GPLN.test(x)&&!GSUBW.test(x)&&x!==',') return true;
  return false;
}
/* is "that," "so," and the like starting a new part of the sentence here? */
function subAt(lw,i){
  var x=lw[i], n=lw[i+1]||'';
  if(!GSUBW.test(x)||n==='to') return false;   /* "where to look" */
  if(x==='so'&&i===0) return false;              /* "So the reaction was slower." */
  if(x==='that'&&/^(show|shows|showed|shown|mean|means|meant|think|thought|learn|learned|know|knew|found|predict|predicted|say|says|said|notice|noticed|realize|realized|prove|proves|proved|suggest|suggests|believe|believed)$/.test(lw[i-1]||'')) return n!=='';
  if(x==='so'||x==='that'||x==='since'||x==='while'||x==='after'||x==='before') return GDET.test(n)||GPRON.test(n)&&n!=='people'||(x==='that'&&i>0&&(GAUX.test(n)||GPAST.test(n)||/[^su]s$/.test(n)&&!GPLN.test(n)&&!GIRR.test(n)||GIRR.test(n)&&(GPLN.test(lw[i-1])||/[^su]s$/.test(lw[i-1]))));
  if(x==='because') return n!=='of'&&n!=='';
  return i>0&&n!==''&&n!==',';
}
/* finds the main verb, and any part ("so the reaction") that never gets its own verb */
function sentenceParts(lw){
  var main=false, open=-1, unfinished=null;
  for(var i=0;i<lw.length;i++){
    var x=lw[i];
    if(x===','){ if(open>=0&&unfinished===null&&i>open+1) unfinished=open; open=-1; continue; }
    if(subAt(lw,i)){ if(open>=0&&unfinished===null) unfinished=open; open=i; continue; }
    if(/^(think|believe|predict|guess|hope)$/.test(x)&&verbAt(lw,i)&&(GDET.test(lw[i+1]||'')||GPRON.test(lw[i+1]||''))){ main=true; open=i; continue; }
    if(verbAt(lw,i)){
      var j=i-1; while(j>=0&&isAdvb(lw[j])) j--;
      if(j>=0&&verbAt(lw,j)) continue;   /* "was taped," "can get": one verb, already counted */
      if(open>=0) open=-1; else main=true;
    }
  }
  if(open>=0&&unfinished===null) unfinished=open;
  return {main:main,unfinished:unfinished};
}
function hasVerb(lw){ for(var i=0;i<lw.length;i++){ if(verbAt(lw,i)) return true; } return false; }
/* a missing a/an/the, as in "This is just test to see": a linking verb, then a word that is not an adjective, then "to" */
var GADJ=/^(able|about|enough|going|trying|supposed|used|due|ready|free|sure|likely|easy|hard|good|bad|important|necessary|possible|impossible|difficult|simple|safe|helpful|harmful|best|better|worse|worst|first|last|next|only|right|wrong|key|close|similar|related|connected|attached|meant|made|said|known|thought|found|needed|told|asked|allowed|forced|built|designed|there|here|up|down|back|out|in|on|off|over|still|also|not|just|really|very|so|too|more|less|most|much|able|unable|happy|glad|sad|tired|interesting|amazing|cool|fun|nice|great|weird|strange|crazy|surprising|surprised|confused|confusing|clear|new|old|big|small|large|thick|thin|long|short|high|low|hot|cold|fast|slow|strong|weak|ready|willing|available|responsible|similar|different|same|true|false|common|normal|healthy|unique|special|essential|vital|critical|crucial|useful|harder|easier|bigger|smaller|faster|slower|stronger|weaker|thicker|thinner|higher|lower|larger|longer|shorter|closer|how|what|why|where|when|who|which|that|this|it|them|me|us|him|her|you|i|we|they|he|she|one|ok|okay)$/;
function missingWord(text,add){
  var re=/\b(is|was|it's|that's|this's)\s+(?:(?:just|only|also|really|still|not|probably|basically|actually)\s+)?([a-z]+)\s+(to|that|for)\s+([a-z]+)/gi, m;
  while((m=re.exec(text))){
    var x=m[2].toLowerCase();
    if(GADJ.test(x)||/(ly|ing|ed|ful|ous|ive|ic|ical|able|ible|ant|ent|ary|less)$/.test(x)) continue;
    var at=m.index+m[0].indexOf(m[2],m[1].length);
    add(at,at+m[2].length,'A small word may be missing before “'+m[2]+'”, such as “a,” “an,” or “the.”');
  }
}
var GINC='This may be an incomplete thought. A complete sentence says who or what it is about (the subject) and what they do or are (the verb). Read it aloud to check for a missing word.';
var GEND=/^(the|a|an|and|or|but|because|than|my|our|your|their|its|very|into|onto|if|when|so)$/;
/* missing words between other words: "goes the lungs," "pumps blood the body," "the is," "able flip," "of brain" */
var GMISS=[
  [/\b(work|works|worked|working|go|goes|went|run|runs|ran|react|reacts|reacted|happen|happens|happened|flip|flips|flipped|move|moves|moved)\s+(faster|slower|better|best|fastest|slowest|worse)\s+(the|a|an)\s/gi,function(m){return 'A word may be missing after “'+m.split(/\s+/)[1]+',” such as “at,” “than,” or “with.”';}],
  [/\b(I|it|It|they|They|he|He|she|She|we|We)\s+(slower|faster|bigger|smaller|important|harder|easier|thicker|thinner|stronger|weaker|able|unable|tired|surprised|confused|interested|amazed|excited|scared|shocked|worried|bored|different|similar|better|worse|because|the|a|an)\b(?!\s+(me|us|him|her|them|you|it)\b)/g,function(m,t,i){return /\b(make|makes|made|making|keep|keeps|kept|find|finds|found|get|gets|got|let|lets|help|helps|helped|call|called|leave|leaves|left)\s+$/i.test(t.slice(Math.max(0,i-10),i))?null:'A word may be missing after “'+m.split(/\s+/)[0]+',” such as “is,” “was,” or “am.”';}],
  [/\b(the|The|a|an|An)\s+(the|a|an|to|of|and|or|is|are|was|were|in|on|at|for|with|from|by|it|they|he|she|we|because|but)\b/g,function(m){return 'A word seems to be missing after “'+m.split(/\s+/)[0]+'.”';}],
  [/\b(able|unable|supposed)\s+(?!to\b)[a-z]+/gi,function(m){return 'A word may be missing after “'+m.split(/\s+/)[0]+',” such as “to.”';}],
  [/\b(go|goes|went|going|travel|travels|traveled|travelled|traveling|flow|flows|flowed|flowing|come|comes|came|rush|rushes|rushed)\s+(the|a|an|my|your|our|their|his|her)\s+(?!(same|whole|entire|other|wrong|right|next|first|last|rest|way|most|least|best|fastest|slowest|farthest|furthest|longest|opposite)\b)[a-z]+/gi,function(m){return 'A word may be missing after “'+m.split(/\s+/)[0]+',” such as “to,” “into,” or “through.”';}],
  [/\b(pump(s|ed)?|carr(y|ies|ied)|mov(e|es|ed)|push(es|ed)?|deliver(s|ed)?|transport(s|ed)?|flip(s|ped)?|squeez(e|es|ed)|send(s)?|sent)\s+(?!(the|a|an|this|that|these|those|my|our|your|their|his|her|its|it|them|out|up|back|down|away|in|off|through|throughout|along|all|both|more|less|much|faster|slower|quickly|slowly|again|around|over|only|also|by|from|to|into|of|on|at|for|with|toward|towards|across|between|under|onto|past|than|as|and|or)\b)([a-z]+)\s+(the|a|an)\s+(?!(lot|few|little|bit|day|week|minute|second|year|time|while|whole|entire|same|right|wrong|rest|other|way|most|least|best|first|last|next)\b)[a-z]+/gi,function(m){var x=m.split(/\s+/);return 'A word may be missing between “'+x[1]+'” and “'+x[2]+',” such as “to,” “into,” or “through.”';}],
  [/\b(of|in|to|into|from|through|at|on|inside|toward|towards)\s+(heart|brain|body|aorta|ventricle|atrium|cell|enzyme|lung|skull|thumb|substrate|receptor|nucleus|membrane|valve|organism|artery|vein|capillary|diaphragm|sternum|cerebrum|cerebellum|niece|tennis ball|chest)\b(?!\s+(temperature|tissue|muscle|disease|rate|cells?|biology|size|parts?|function|signaling|walls?|attack|failure|health|types?|weight|fluids?|stem|membranes?|structures?|division|surface|chambers?|valves?|sounds?|beats?|transplants?|damage|surgery|anatomy|wall|matter)\b)(?=\s*[.,!?;:]|\s*$|\s+(and|or|but|to|is|was|are|were|so|because|which|that|with|of|in|on)\b)/gi,function(m){return 'A small word such as “the” or “a” may be missing before “'+m.split(/\s+/).slice(1).join(' ')+'.”';}]
];
function grammarIssues(text){
  var out=[];
  function add(a,b,msg,wide){ if(b>a) out.push({a:a,b:b,msg:msg,wide:!!wide}); }
  missingWord(text,add);
  GMISS.concat(GFIX).forEach(function(rule){
    var re=new RegExp(rule[0].source,rule[0].flags), m;
    while((m=re.exec(text))){ var msg=rule[1](m[0],text,m.index); if(msg) add(m.index+(rule[2]||0),m.index+m[0].length,msg); if(!m[0].length) re.lastIndex++; }
  });
  /* sentences: split at end marks and line breaks, but not at decimals (37.5) or titles and short forms (Mrs., e.g.) */
  var sc=text.replace(/\d\.\d/g,function(x){return x.replace('.','\u2024');})
    .replace(/\b(mr|mrs|ms|dr|st|vs|etc|approx|e\.g|i\.e)\./gi,function(x){return x.slice(0,-1).replace(/\./g,'\u2024')+'\u2024';});
  var re=/[^.!?\n]+(?:[.!?]+["”’')\]]*|(?=\n)|$)/g, m;
  while((m=re.exec(sc))){
    var raw=text.substr(m.index,m[0].length); if(!raw.trim()){ if(!raw.length) re.lastIndex++; continue; }
    var lead=raw.length-raw.replace(/^\s+/,'').length, st=m.index+lead, sen=raw.trim(), end=st+sen.length;
    var core=sen.replace(/^[“"'(\[]+/,''), w=core.match(/[A-Za-z’'-]+/g)||[];
    if(w.length<=1&&core.replace(/[^A-Za-z]/g,'').length<=1) continue;   /* labels such as "c." or "1." */
    var fw=core.match(/^[A-Za-z’'-]+/);
    if(fw&&/^[a-z]/.test(fw[0])) add(end-core.length,end-core.length+fw[0].length,'Start each sentence with a capital letter.');
    if(!/[.!?]["”’')\]]*$/.test(sen)){
      var lw=sen.match(/\S+$/); add(end-lw[0].length,end,'End this sentence with a period (or a question mark or exclamation point).');
    }
    var tk=(core.match(/[A-Za-z’'-]+|[,;:]/g)||[]).map(function(x){return /^[;:]$/.test(x)?',':x.toLowerCase().replace(/’/g,"'");});
    var last=tk.filter(function(x){return x!==',';}).pop()||'', sp=sentenceParts(tk);
    if(w.length<3) add(st,end,'This looks too short to be a complete sentence. A sentence needs a subject and a verb.',1);
    else if(/\?["”’')\]]*$/.test(sen)){ if(!hasVerb(tk)) add(st,end,GINC,1); }
    else if(GEND.test(w[w.length-1])) add(st,end,'This sentence stops before the thought is finished. A word or two may be missing after “'+w[w.length-1]+'.”',1);
    else if(GSUB.test(core)&&core.indexOf(',')<0&&w.length<14) add(st,end,'A sentence that starts with “'+core.match(GSUB)[0]+'” needs two parts with a comma between them, like this: “When the heart contracts, blood moves out.” Check that this sentence has both parts and the comma.',1);
    else if(/:/.test(core)) {}   /* labels and definitions, such as "Heart: the organ that pumps blood" */
    else if(!sp.main) add(st,end,GINC,1);
    else if(sp.unfinished!==null) add(st,end,'The part that starts with “'+tk[sp.unfinished]+'” is an incomplete thought. It needs to say what happens or what something is. Read it aloud to check for a missing word.',1);
    else if(w.length>40) add(st,end,'This sentence is very long ('+w.length+' words). Try splitting it into two or three sentences.',1);
  }
  /* whole-sentence problems and word problems are kept apart, so one never hides the other.
     Within each kind, keep the first problem when two overlap. */
  /* when a missing-word hint already points inside a sentence, the general "incomplete thought" note is not needed */
  out=out.filter(function(x){return !(x.wide&&x.msg===GINC&&out.some(function(y){return !y.wide&&y.a>=x.a&&y.b<=x.b&&/missing/.test(y.msg);}));});
  out.sort(function(x,y){return x.a-y.a||(y.wide-x.wide)||y.b-x.b;});
  var keep=[], to={0:-1,1:-1};
  out.forEach(function(x){ var k=x.wide?1:0; if(x.a>=to[k]){ keep.push(x); to[k]=x.b; } });
  return keep;
}
function grammarCheck(getText){
  var wrap=h('div','gcheck');
  var btn=h('button','btn','Check my writing'); btn.type='button';
  var note=h('p','msg'); note.setAttribute('aria-live','polite');
  var prev=h('div','gprev'); prev.hidden=true;
  var list=h('ol','glist');
  wrap.append(btn,note,prev,list);
  btn.addEventListener('click',function(){
    var t=String(getText()||'').replace(/\u00a0/g,' ').replace(/[ \t]+$/gm,'').replace(/\s+$/,'');
    prev.textContent=''; list.textContent=''; prev.hidden=true;
    if(words(t)<5){ note.removeAttribute('data-s'); note.textContent='Write your answer first, then check it.'; return; }
    var is=grammarIssues(t);
    if(!is.length){ note.dataset.s='ok'; note.textContent='Nice! I did not find any problems with capital letters, punctuation, or sentences. This check cannot catch everything. Press “Listen to my answer” to hear your writing. Missing words are easier to hear than to see.'; return; }
    note.removeAttribute('data-s');
    note.textContent='I found '+is.length+' thing'+(is.length===1?'':'s')+' to check. Each one is highlighted in your writing below. Fix them in your answer above, then check again. Tip: press “Listen to my answer” to hear your writing. Missing words are easier to hear than to see.';
    is.forEach(function(x,i){
      x.n=i+1;
      var li=h('li'), q=t.slice(x.a,x.b);
      li.append(h('q',null,q.slice(0,60)+(q.length>60?'…':'')),' ',x.msg); list.append(li);
    });
    /* word problems are marked; a whole-sentence problem underlines its sentence */
    function marks(el,a,b){
      var at=a;
      is.forEach(function(x){
        if(x.wide||x.a<a||x.b>b) return;
        el.append(t.slice(at,x.a), h('mark',null,t.slice(x.a,x.b)), h('sup',null,String(x.n)));
        at=x.b;
      });
      el.append(t.slice(at,b));
    }
    var at=0;
    is.forEach(function(x){
      if(!x.wide) return;
      marks(prev,at,x.a);
      var sp=h('span','gsen'); sp.append(h('sup',null,String(x.n))); marks(sp,x.a,x.b); prev.append(sp);
      at=x.b;
    });
    marks(prev,at,t.length); prev.hidden=false;
  });
  return wrap;
}

/* Looks for key ideas with word matching. It never shows the answer and is not graded.
   Science ideas (what the answer says) and writing checks (sentences, transition words, highlights) are counted
   separately, so writing two sentences never counts as a science idea. */
function sentenceCount(t){return String(t||'').split(/[.!?]+/).filter(function(x){return words(x)>=3;}).length;}
function sentencesOf(t){return String(t||'').split(/[.!?\n]+/).filter(function(x){return x.trim();});}
function ideaCheck(getText,getHl,items){ /* getHl returns the answer's highlighted pieces (segs) */
  var wrap=h('div','ideas');
  wrap.append(h('p','inote','Want a quick check before you move on? This looks for the key science ideas in your answer and checks your writing steps. It is not your grade, and it can miss good ideas written in different words. Your teacher reads your full response.'));
  var btn=h('button','btn','Check my ideas'); btn.type='button';
  var note=h('p','msg'); note.setAttribute('aria-live','polite');
  var groups=h('div','igroups');
  wrap.append(btn,note,groups);
  var sci=items.filter(function(it){return !it.writing;}), wr=items.filter(function(it){return it.writing;});
  function group(title,list,t,hl){
    var found=0, ul=h('ul');
    list.forEach(function(it){
      var ok=it.test(t,hl);
      if(ok) found++;
      var li=h('li'); li.dataset.s=ok?'ok':'todo';
      if(ok) li.append('✓ '+it.done);
      else { li.append('○ '+it.q+' '); var b=h('b',null,'Tip: '); li.append(b,it.tip); }
      ul.append(li);
    });
    var box=h('div','igroup'), hd=h('p','ihead');
    hd.append(h('b',null,title+': '),found+' of '+list.length);
    var bar=h('span','ibar'); bar.setAttribute('aria-hidden','true');
    list.forEach(function(x,i){var d=h('i'); if(i<found) d.className='on'; bar.append(d);});
    hd.append(bar);
    box.append(hd,ul); groups.append(box);
    return found;
  }
  btn.addEventListener('click',function(){
    var t=String(getText()||''), hl=getHl?getHl():[];
    groups.textContent='';
    if(words(t)<5){ note.removeAttribute('data-s'); note.textContent='Write your answer first, then check it.'; return; }
    var fs=sci.length?group('Science ideas',sci,t,hl):0, fw=wr.length?group('Writing',wr,t,hl):0;
    var allSci=fs===sci.length, allWr=fw===wr.length;
    note.dataset.s=(allSci&&allWr)?'ok':'';
    note.textContent=(allSci&&allWr)
      ? 'Nice work. You covered all the key ideas. Read your answer one more time to make sure it is clear.'
      : !allSci
        ? 'I found '+fs+' of '+sci.length+' key science ideas. Use the tips to add what is missing, then check again.'
        : 'You covered all the key science ideas. Now finish the writing steps below.';
  });
  return wrap;
}

/* ------------------------------------------------------------------ */
/* Section and question scaffolding                                    */
/* ------------------------------------------------------------------ */
var CURQ=null;
function qEl(num,text){
  CURQ={num:num,text:text};
  var q=h('article','q'); q.id='question-'+num;
  var hd=h('div','qhead');
  var qt=h('p','qtext'); qt.append(itxt(text));
  hd.append(h('span','qnum',String(num)),qt);
  var body=h('div','qbody');
  q.append(hd,body);
  return {q:q,body:body};
}
function part(n,title){
  var s=h('section','task'); s.dataset.task=String(n); s.id='part'+n;
  s.append(h('h2','display',(A.partWord||'Part')+' '+n+': '+title));
  return s;
}
function watchFor(markup){return hh('div','wfor','<b>Watch for:</b> '+markup);}
function watchList(intro,items){
  return hh('div','wfor','<b>Watch for:</b> '+intro+'<ul class="wlist">'+items.map(function(i){return '<li><b>'+i[0]+'</b> '+i[1]+'</li>';}).join('')+'</ul>');
}
function learn(markup){return hh('div','learn',markup);}
/* a part's reading folds into a box the student opens, so the page is not a wall of text */
function readBox(markup,label){
  var d=h('details','fold readfold'); d.append(h('summary',null,label||'Read this before you answer'));
  d.append(learn(markup)); return d;
}

/* Focus (an accommodation, a focus mask): when it is on, every section but the one the student is working on fades out.
   A section is one block inside a part (a video, a reading box, a question). Clicking or tabbing into a section
   brings it into focus; scrolling moves the focus once the current section leaves the middle of the screen.
   The setting is kept in this browser for every assignment, so a student turns it on once. */
function focusMask(){
  var sw=$('#maskSw'), MK='eaa-focus-mask', cur=null, on=false, raf=0;
  function units(){ return [].filter.call(document.querySelectorAll('#app>.task>*:not(h2):not(.lrow),#app>:not(.task)'),function(e){return e.offsetParent!==null||e.getClientRects().length;}); }
  function unitOf(el){
    while(el&&el.parentElement){
      var pa=el.parentElement;
      if(pa.id==='app') return el.classList.contains('task')?null:el;
      if(pa.classList.contains('task')&&pa.parentElement&&pa.parentElement.id==='app') return el.tagName==='H2'||el.classList.contains('lrow')?null:el;
      el=pa;
    }
    return null;
  }
  function pick(u){
    if(!u||u===cur) return;
    if(cur) cur.classList.remove('mfocus');
    cur=u; cur.classList.add('mfocus');
  }
  function band(u){ var r=u.getBoundingClientRect(), H=window.innerHeight; return r.bottom>H*0.25&&r.top<H*0.6; }
  function fromScroll(){
    raf=0;
    if(!on) return;
    var fu=unitOf(document.activeElement);
    if(fu&&band(fu)){ pick(fu); return; }
    if(cur&&cur.isConnected&&band(cur)) return;
    var line=window.innerHeight*0.4, best=null, bd=1e9;
    units().forEach(function(u){
      var r=u.getBoundingClientRect(), d=r.top<=line&&r.bottom>=line?0:Math.min(Math.abs(r.top-line),Math.abs(r.bottom-line));
      if(d<bd){bd=d; best=u;}
    });
    pick(best);
  }
  function set(v,keep){
    on=v; sw.setAttribute('aria-checked',v?'true':'false');
    document.body.classList.toggle('masking',v);
    if(v) fromScroll(); else if(cur){ cur.classList.remove('mfocus'); cur=null; }
    if(keep){ try{ v?localStorage.setItem(MK,'1'):localStorage.removeItem(MK); }catch(e){} }
  }
  sw.addEventListener('click',function(){ set(!on,true); });
  /* the switch's how-to shows on hover or keyboard focus; touch screens get it for a few seconds after a tap */
  var mw=$('#maskWrap');
  mw.addEventListener('pointerdown',function(e){
    if(e.pointerType==='mouse') return;
    mw.classList.add('tipon'); clearTimeout(mw._t); mw._t=setTimeout(function(){mw.classList.remove('tipon');},3500);
  });
  document.addEventListener('focusin',function(e){ if(on) pick(unitOf(e.target)); });
  document.addEventListener('pointerdown',function(e){ if(on) pick(unitOf(e.target)); },true);
  window.addEventListener('scroll',function(){ if(on&&!raf) raf=requestAnimationFrame(fromScroll); },{passive:true});
  var saved=false; try{ saved=localStorage.getItem(MK)==='1'; }catch(e){}
  if(saved) set(true,false);
}

/* ------------------------------------------------------------------ */
/* Parts                                                               */
/* ------------------------------------------------------------------ */
/* ------------------------------------------------------------------ */
/* Parts and questions, built from assignment.js                       */
/* ------------------------------------------------------------------ */
var QN=0;
var NUMWORD=['zero','one','two','three','four','five','six','seven','eight','nine','ten'];

function allQuestions(){
  var out=[];
  if(BOARD){
    (BOARD.categories||[]).forEach(function(c){(c.tiles||[]).forEach(function(q){out.push(q);});});
    if(BOARD.final) out.push(BOARD.final);
    return out;
  }
  (A.parts||[]).forEach(function(p){(p.questions||[]).forEach(function(q){out.push(q);});});
  return out;
}

function photoSentence(qs){
  var n=qs.filter(function(q){return q.type==='photo';}).length;
  return n?' You will add '+(NUMWORD[n]||n)+' photo'+(n===1?'':'s')+' of your own work. Each one shows in your PDF.':'';
}

/* top section when there is no video: start (heading, intro, after) from assignment.js */
function startSection(){
  var V=A.start||{}, qs=allQuestions();
  var nW=qs.filter(function(q){return q.type==='written'||q.type==='highlight';}).length;
  var s=h('section','task vidsec'); s.id='video';
  s.append(h('h2','display',V.heading||'How this assignment works'));
  s.append(h('p','intro',V.intro||'Work through each part in order.'));
  var after=V.after;
  if(after==null){
    after='Each part gives you something to read and then lets you practice and check your work. Select a picture to open it full size in a new tab.';
    if(nW) after+=' You will also answer '+(NUMWORD[nW]||nW)+' written question'+(nW===1?'':'s')+'.';
    after+=photoSentence(qs);
    if(GATED) after+=' Each part opens when you finish the one before it.';
  }
  s.append(h('p','intro',after));
  return s;
}

/* a picture (station card, diagram). Selecting it opens the full-size image in a new tab.
   text: optional HTML with the words on the picture, shown on request and read by the Listen button */
function figureEl(im){
  var f=h('figure','card');
  var a=h('a'); a.href=im.src; a.target='_blank'; a.rel='noopener noreferrer';
  var img=document.createElement('img'); img.src=im.src; img.alt=im.alt||''; img.loading='lazy';
  a.append(img); f.append(a);
  var cap=h('figcaption');
  if(im.caption) cap.append(itxt(im.caption),' ');
  var open=h('a',null,'Open full size'); open.href=im.src; open.target='_blank'; open.rel='noopener noreferrer';
  cap.append(open); f.append(cap);
  if(im.text){
    var d=h('details','cardtext'); d.append(h('summary',null,'Show the words on this card as text'));
    d.append(learn(im.text)); f.append(d);
  }
  return f;
}

function videoSection(){
  if(!A.video) return startSection();
  var V=A.video, qs=allQuestions();
  var nHl=qs.filter(function(q){return q.type==='highlight'&&!q.cer;}).length, nCer=qs.filter(function(q){return q.type==='highlight'&&q.cer;}).length;
  var nW=qs.filter(function(q){return q.type==='written'||q.type==='highlight';}).length;
  var hasClips=(A.parts||[]).some(function(p){return (p.clips||[]).length;});
  var s=h('section','task vidsec'); s.id='video';
  s.append(h('h2','display',V.heading||'Watch the video'));
  s.append(h('p','intro',V.intro||('Please watch the video '+V.title+' and then respond to the prompts below.')));
  s.append(videoBlock('main'));
  var after=V.after;
  if(after==null){
    after='Work from top to bottom. Each part gives you '+(hasClips?'a short clip of just that part of the video, ':'')+'a short reading, and then lets you practice and check your work.';
    if(nW){
      after+=' You will also answer '+(NUMWORD[nW]||nW)+' written question'+(nW===1?'':'s');
      if(nHl===1&&nW===1) after+=', and you will use transition words to point to your evidence and highlight them in yellow';
      else if(nHl===1) after+=', and in one of them you will use transition words to point to your evidence and highlight them in yellow';
      else if(nHl>1) after+=', and in '+(nHl===nW?'all of them':'some of them')+' you will use transition words to point to your evidence and highlight them in yellow';
      after+='.';
      if(nCer) after+=' In '+(nCer===nW?(nW===1?'it':'each one'):(nCer===1?'one of them':'some of them'))+', you will make a claim, support it with evidence, and give your reasoning (expand on your thoughts), then highlight each part in its own color.';
    }
    after+=photoSentence(qs);
    if(GATED) after+=' Each part opens when you finish the one before it.';
    if(hasClips){
      var first=null; VID_ORDER.some(function(k){var c=VIDS[k]; if(c.from!=null&&!c.of){first=c;return true;} return false;});
      if(first) after+=' The times on each clip (like '+fmt(first.from)+' to '+fmt(first.to)+') are times in the full video above.';
    }
  }
  s.append(h('p','intro',after));
  return s;
}

/* turns the ideas written in assignment.js into checks that ideaCheck can run.
   re: the pattern is somewhere in the answer. all: every pattern is in the same sentence, so an idea can ask for
   two things together (the coenzyme AND faster, the lungs AND oxygen). sentences, highlight and writing: true are
   writing checks, listed apart from the science ideas. */
function ideasFrom(list){
  return (list||[]).map(function(it){
    var o={done:it.done,q:it.q,tip:it.tip,writing:!!(it.writing||it.sentences||it.highlight)};
    if(it.all){ var pats=it.all; o.test=function(t){return sentencesOf(t.toLowerCase()).some(function(x){return pats.every(function(r){return r.test(x);});});}; }
    else if(it.re){ var re=it.re; o.test=function(t){return re.test(t.toLowerCase());}; }
    else if(it.sentences){ var k=it.sentences; o.test=function(t){return sentenceCount(t)>=k;}; }
    else if(it.highlight){ var col={claim:'b',evidence:'y',expand:'g'}[it.highlight]; o.test=function(t,segs){return segsHlWords(segs,col)>0;}; }
    else { o.test=function(){return false;}; }
    return o;
  });
}

function buildQuestion(q,s,tile){
  if(SUPPORT&&q.easy) q=Object.assign({},q,{text:q.easy});
  var num=++QN, id='q'+num, o=qEl(num,q.text), t=q.type, ids=[id];
  if(tile) CURQ.tile=tile;
  if(q.img){
    var fig=h('figure','qimg'), im=document.createElement('img');
    im.src=q.img.src; im.alt=q.img.alt||''; im.loading='lazy'; fig.append(im);
    if(q.img.caption) fig.append(h('figcaption',null,q.img.caption));
    o.body.append(fig);
  }
  if(q.calculator) o.body.append(calcEl(id));
  if(t==='selects'){
    ids=q.items.map(function(it,i){return id+'_'+i;});
    if(q.note) o.body.append(hh('div','ends','<span>'+q.note+'</span>'));
    var grid=h('div','sigs');
    q.items.forEach(function(it,i){
      var sid=id+'_'+i, ops=fewer(sid,it.options||q.options,[it.answer],[(S.auto[sid]||{}).v]);
      var sel=autoSelect(sid,'Q'+num+' '+plain(it.label).replace(/:/g,''),ops,it.answer,{label:(SUPPORT&&it.easy)||it.label,hint:it.hint||q.hint});
      if(it.sci||q.sci) sel.classList.add('sci');
      grid.append(sel);
    });
    o.body.append(grid);
  } else if(t==='choice'){
    var cops=fewer(id,q.options,[q.options[q.answer]],[(S.auto[id]||{}).v]);
    o.body.append(choiceQ(id,'Q'+num,cops,cops.indexOf(q.options[q.answer]),q.explain,q.tip));
  } else if(t==='typed'){
    var exp=q.expected;
    /* accept: a list of right answers, ignoring capital letters and an end period */
    if(q.between) exp=inRange(q.between);
    if(q.accept){ var ok1=q.accept.map(function(x){return String(x).toLowerCase();}); exp=function(v){return ok1.indexOf(v.toLowerCase().replace(/[.!]+$/,''))>=0;}; }
    o.body.append(typedCheck(id,'Q'+num+' typed answer',exp,q.okMsg||'Correct.',function(v){
      if(BOARD) return triesMsg(S.auto[id],q.tip);
      if(q.caseTip&&String(v).toLowerCase()===String(exp).toLowerCase()) return 'Not yet. Tip: '+q.caseTip;
      return 'Not yet. Tip: '+(q.tip||'Look back at the reading and try again.');
    },q.aria||'Your answer'));
  } else if(t==='mnemonic'){
    ids=['mn'];
    o.body.append(mnWidget(q.words));
  } else if(t==='speak'){
    o.body.append(speakQ(id,q));
  } else if(t==='label'){
    o.body.append(labelQ(id,q));
  } else if(t==='order'){
    o.body.append(orderQ(id,q));
  } else if(t==='tonicity'){
    ids=[]; (q.items||[]).forEach(function(it,i){for(var m=0;m<3;m++) ids.push(id+'_'+i+'_'+m);});
    o.body.append(toniQ(id,q));
  } else if(t==='bloodlab'){
    o.body.append(labQ(id,q));
  } else if(t==='multi'){
    if(SUPPORT) q=Object.assign({},q,{options:fewer(id,q.options,q.answers,(S.auto[id]||{}).picks)});
    o.body.append(multiQ(id,q));
  } else if(t==='numbers'){
    ids=q.items.map(function(it,i){return id+'_'+i;});
    o.body.append(numbersQ(id,q));
  } else if(t==='readgraph'){
    ids=q.items.map(function(it,i){return id+'_'+i;});
    o.body.append(readGraphQ(id,q));
  } else if(t==='graph'){
    ids=GSTEPS.map(function(k){return id+'_'+k;});
    o.body.append(graphQ(id,q));
  } else if(t==='written'){
    ids=[];
    W[id]={min:q.min||40};
    if(q.starters&&q.starters.length) o.body.append(startersEl(id,q.starters));
    o.body.append(writtenField(id,q.placeholder));
    o.body.append(grammarCheck(function(){return (S.written[id]||{}).text;}));
    if(q.ideas&&q.ideas.length) o.body.append(ideaCheck(function(){return (S.written[id]||{}).text;},null,ideasFrom(q.ideas)));
  } else if(t==='highlight'){
    ids=[];
    R[id]={min:q.min||40,cer:!!q.cer};
    /* the how-to folds into a box; what each color means is shown when the student points at that highlight button */
    var how=h('details','fold howfold'), howin=h('div','howbox');
    how.append(h('summary',null,'How to answer this question'), howin);
    (q.cer?[
      h('p',null,'Respond to the question in the space below. Remember to answer the question fully.'),
      h('p',null,'Make a claim (your answer), use evidence from '+(q.from||'the video')+' to support your view, and then give your reasoning: expand on your thoughts to explain how your evidence supports your claim.'),
      h('p',null,'Once you have finished, highlight parts of your response. Select the words, then press the matching color button. Point at a button to see what it is for.')
    ]:[
      h('p',null,'Respond to the question in the space below. Remember to answer the question fully.'),
      h('p',null,'Make sure to provide evidence in your response, along with transition words that bring attention to that evidence. '+(q.examples||'Examples: “For example,” “According to the video,” “This shows that,” “One piece of evidence is,” or “Because.”')),
      h('p',null,'Once you have finished, go back and highlight those transition words in yellow. Select the words, then press the yellow button.')
    ]).forEach(function(e){howin.append(e);});
    var intro=[how];
    intro.forEach(function(e){o.body.append(e);});
    o.body.append(
      q.starters&&q.starters.length?startersEl(id,q.starters):'',
      richField(id),
      grammarCheck(function(){return segsPlain((S.rich[id]||{}).segs);}));
    /* a cer answer checks each color instead of one yellow highlight */
    var ideas=(q.ideas||[]).filter(function(it){return !(q.cer&&it.highlight===true);});
    if(q.cer) ideas=ideas.concat([
      {done:'You highlighted your claim in blue.',q:'Did you highlight your claim in blue?',tip:'Select the sentence that gives your answer, then press the blue Claim button.',highlight:'claim'},
      {done:'You highlighted your evidence in yellow.',q:'Did you highlight your evidence in yellow?',tip:'Select the facts or examples you used to support your claim, then press the yellow Evidence button.',highlight:'evidence'},
      {done:'You highlighted your reasoning in green.',q:'Did you highlight your reasoning (where you expand on your thoughts) in green?',tip:'Select the sentences that explain how your evidence supports your claim, then press the green Reasoning/Expand button.',highlight:'expand'}]);
    if(ideas.length) o.body.append(ideaCheck(function(){return segsPlain((S.rich[id]||{}).segs);},function(){return (S.rich[id]||{}).segs;},ideasFrom(ideas)));
  } else if(t==='agree'){
    ids=[];
    o.body.append(agreeField(id,q));
  } else if(t==='photo'){
    ids=[];
    o.body.append(photoField(id,q));
  } else {
    o.body.append(h('p','msg','Unknown question type: '+t));
  }
  s.append(o.q);
  return {num:num,id:id,auto:ids,written:(t==='written'||t==='highlight')?id:null,el:o.q};
}

function buildPart(p,n){
  var s=part(n,p.title);
  if(p.intro) s.append(h('p','intro',p.intro));
  var first=null;
  (p.clips||[]).forEach(function(k){ if(VIDS[k]){ var b=videoBlock(k); s.append(b); if(!first) first=b; } });
  /* questions with "at" pop up inside the part's first video at that time (seconds into that video) */
  var inVid=(p.questions||[]).filter(function(q){return q.at!=null;});
  if(inVid.length&&first) s.append(videoStops(first,inVid));
  (p.images||[]).forEach(function(im){ s.append(figureEl(im)); });
  if(p.read) s.append(readBox(p.read,p.readLabel));
  if(p.tableHtml){ var tw=h('div','tablewrap'); tw.innerHTML=p.tableHtml; s.append(tw); }
  (p.questions||[]).forEach(function(q){ if(!(q.at!=null&&first)) buildQuestion(q,s); });
  if(GATED) gateEls(s,n);
  return s;
}

/* Questions inside a video. At each question's time the video pauses and the question pops up over the player
   (under it on a narrow screen). The student must answer it right to keep watching, and cannot skip ahead past a
   question that is not answered yet. Answered questions stay in a list under the video. */
function videoStops(block,qs){
  var v=block.querySelector('video'), vid=block.querySelector('.vid');
  var list=h('div','vqs');
  if(!S.vstop) S.vstop={};
  var stops=qs.slice().sort(function(a,b){return a.at-b.at;}).map(function(q){
    var holder=h('div','vqslot');
    var r=buildQuestion(q,holder);
    list.append(holder);
    return {at:q.at,num:r.num,id:r.id,ids:r.auto,el:r.el,slot:holder};
  });
  function done(st){return st.ids.length>0&&st.ids.every(function(k){var x=S.auto[k];return !!(x&&x.ok);});}
  function paintSlots(){
    stops.forEach(function(st){
      var seen=!!S.vstop[st.id]||done(st);
      st.el.hidden=!seen;
    });
  }
  paintSlots();
  var cur=null, pop=null, poll=null, msg=null, go=null;
  function close(play){
    if(!cur) return;
    cur.slot.append(cur.el);
    if(pop) pop.remove();
    clearInterval(poll); cur=null; pop=null;
    paintSlots();
    if(play) v.play();
  }
  function open(st){
    v.pause();
    try{ if(document.fullscreenElement) document.exitFullscreen(); else if(v.webkitDisplayingFullscreen) v.webkitExitFullscreen(); }catch(e){}
    cur=st; S.vstop[st.id]=1; save();
    st.el.hidden=false;
    pop=h('div','vpop'+(vid.clientWidth>=560?' over':''));
    pop.setAttribute('role','dialog'); pop.setAttribute('aria-label','Question '+st.num+' in the video');
    pop.append(h('p','vpophead','The video paused at '+fmt(st.at)+'. Answer this question to keep watching.'));
    pop.append(st.el);
    msg=h('p','msg'); msg.setAttribute('aria-live','polite');
    go=h('button','btn','Keep watching'); go.type='button'; go.hidden=true;
    go.addEventListener('click',function(){close(true);});
    /* the question covers the player's controls, so this is how students go back and listen again */
    var i=stops.indexOf(st), from=i>0?stops[i-1].at:0;
    var back=h('button','btn ghost','Rewatch this section (from '+fmt(from)+')'); back.type='button';
    back.addEventListener('click',function(){ close(false); v.currentTime=from; v.play(); });
    var row=h('div','row'); row.append(go,back,msg); pop.append(row);
    if(pop.classList.contains('over')) vid.append(pop); else vid.after(pop);
    pop.scrollIntoView({block:'nearest'});
    var hd=st.el.querySelector('.qtext'); if(hd){ hd.tabIndex=-1; hd.focus({preventScroll:true}); }
    poll=setInterval(function(){
      if(!document.contains(v)){ clearInterval(poll); return; }
      if(cur&&done(cur)&&go.hidden){ go.hidden=false; msg.dataset.s='ok'; msg.textContent='Right! Press Keep watching.'; }
    },300);
  }
  function next(){ for(var i=0;i<stops.length;i++) if(!done(stops[i])) return stops[i]; return null; }
  v.addEventListener('timeupdate',function(){
    if(cur||v.seeking) return;
    var st=next(); if(st&&v.currentTime>=st.at-0.25) open(st);
  });
  v.addEventListener('seeking',function(){
    var st=next();
    if(st&&v.currentTime>st.at+0.5){ v.currentTime=st.at; if(!cur) open(st); }
  });
  v.addEventListener('play',function(){
    if(!cur) return;
    if(done(cur)) close(false);
    else { v.pause(); msg.removeAttribute('data-s'); msg.textContent='Answer the question first. Then the video can keep going.'; }
  });
  return list;
}

/* ------------------------------------------------------------------ */
/* One part at a time: a part opens when the student finishes the     */
/* part before it and selects Continue. Finished parts fold down to   */
/* their banner and can be opened again. gated: false turns this off. */
/* ------------------------------------------------------------------ */
var GATED=!BOARD&&!TEACHER&&A.gated!==false&&(A.parts||[]).length>1, REOPEN={};
function partWord(n){return (A.partWord||'Part')+' '+n;}
function partDone(sec){return partShare(sec)>=1;}
/* share of a part's checked items that are done (1 when the part has none) */
function partShare(sec){
  var c=sec.querySelectorAll('[data-c]');
  return c.length?[].filter.call(c,function(e){return e.dataset.s==='ok';}).length/c.length:1;
}
/* the next part opens at unlockAt (default 80%) of this part. A gate: true part (lab setup and safety) needs all of it. */
var UNLOCK=typeof A.unlockAt==='number'&&A.unlockAt>0&&A.unlockAt<=1?A.unlockAt:0.8;
function partNeed(n){return (A.parts[n-1]||{}).gate?1:UNLOCK;}
function gateEls(s,n){
  var last=n===(A.parts||[]).length;
  s.querySelector('h2').tabIndex=-1;
  s.querySelector('h2').append(h('span','gdone','Done'));
  var tog=h('button','btn ghost small gtog'); tog.type='button';
  tog.addEventListener('click',function(){ REOPEN[n]=!REOPEN[n]; applyGate(); });
  s.querySelector('h2').after(tog);
  var g=h('div','pdone'); g.hidden=true;
  g.append(h('p','pmsg'));
  var go=h('button','btn',last?'Close '+partWord(n)+' and go to Finish':'Close '+partWord(n)+' and open '+partWord(n+1));
  go.type='button';
  go.addEventListener('click',function(){
    S.onPart=n+1; REOPEN[n]=false; commit();
    [].forEach.call(s.querySelectorAll('video'),function(v){try{v.pause();}catch(e){}});
    var next=$(last?'#finish':'#part'+(n+1));
    celebrate(last?'You finished every part!':partWord(n)+' complete!');
    if(next){ next.scrollIntoView({block:'start'}); var hd=next.querySelector('h2'); if(hd){hd.tabIndex=-1; hd.focus({preventScroll:true});} }
  });
  g.append(go); s.append(g);
  s.append(h('p','pnext'));
}
function applyGate(){
  if(!GATED) return;
  var secs=[].slice.call(document.querySelectorAll('section.task[data-task]'));
  /* first visit, or progress saved before this feature: open the first part not yet finished */
  if(!S.onPart){ S.onPart=1; while(S.onPart<=secs.length&&partDone(secs[S.onPart-1])) S.onPart++; }
  secs.forEach(function(sec,i){
    var n=i+1, past=n<S.onPart, tog=$('.gtog',sec), g=$('.pdone',sec);
    sec.hidden=n>S.onPart;
    sec.classList.toggle('closed',past&&!REOPEN[n]);
    tog.hidden=!past;
    tog.textContent=REOPEN[n]?'Fold up '+partWord(n):'Look back at '+partWord(n);
    tog.setAttribute('aria-expanded',REOPEN[n]?'true':'false');
    var sh=partShare(sec), need=partNeed(n), last=n===secs.length;
    var to=last?'the Finish and submit section':partWord(n+1);
    g.hidden=past||sh<need;
    $('.pmsg',g).textContent=sh>=1?'You finished '+partWord(n)+'!'
      :'You finished enough of '+partWord(n)+' to move on. You can finish the rest first, or move on now and come back to it later.';
    var nx=$('.pnext',sec); nx.hidden=past||!g.hidden;
    nx.textContent='You need to complete '+partWord(n)+' to continue on to '+to+'.';
  });
  /* the full video, when it sits after part N, shows once part N+1 is open */
  var vAfter=A.video&&A.video.afterPart||0, vid=$('#video');
  if(vAfter&&vid) vid.hidden=S.onPart<=vAfter;
  /* the Finish section (PDF, Canvas) shows only after the student closes the last part */
  var fin=$('#finish'); if(fin) fin.hidden=S.onPart<=secs.length;
}
/* confetti and a short message when a part is finished. Students who turn off motion get just the message. */
function celebrate(text){
  var note=h('div','cheer',text); note.setAttribute('role','status');
  document.body.append(note);
  setTimeout(function(){note.classList.add('out');},2200);
  setTimeout(function(){note.remove();},2800);
  if(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var c=document.createElement('canvas'), ctx=c.getContext&&c.getContext('2d');
  if(!ctx) return;
  c.className='confetti'; c.setAttribute('aria-hidden','true');
  var W0=c.width=window.innerWidth, H0=c.height=window.innerHeight;
  document.body.append(c);
  var season=seasonShapes();
  if(season){ fallingShapes(c,ctx,W0,H0,season); return; }
  var cols=['#c1a01e','#dcbc3c','#2d2926','#8a7012','#ecd98f','#5f5850','#f4c430'], bits=[];
  for(var i=0;i<160;i++){
    var left=i%2===0;
    bits.push({x:left?0:W0, y:H0*0.75, vx:(left?1:-1)*(4+Math.random()*9), vy:-(9+Math.random()*10),
      w:6+Math.random()*6, h:8+Math.random()*8, r:Math.random()*6, vr:(Math.random()-.5)*0.4, col:cols[i%cols.length]});
  }
  var t0=null;
  function frame(now){
    if(t0===null) t0=now;
    var age=now-t0;
    ctx.clearRect(0,0,W0,H0);
    ctx.globalAlpha=age>2200?Math.max(0,1-(age-2200)/800):1;
    bits.forEach(function(b){
      b.vy+=0.35; b.vx*=0.985; b.x+=b.vx; b.y+=b.vy; b.r+=b.vr;
      ctx.save(); ctx.translate(b.x,b.y); ctx.rotate(b.r); ctx.fillStyle=b.col;
      ctx.fillRect(-b.w/2,-b.h/2,b.w,b.h*Math.abs(Math.cos(b.r*2))); ctx.restore();
    });
    if(age<3000) requestAnimationFrame(frame); else c.remove();
  }
  requestAnimationFrame(frame);
}
/* in some seasons shapes drift down from the top instead of confetti:
   autumn leaves September 15 to November 30, snowflakes in December and January, hearts in February,
   and four-leaf clovers and rainbows in March */
function seasonShapes(){
  var d=new Date(), m=d.getMonth();
  if((m===8&&d.getDate()>=15)||m===9||m===10) return SEASONS.fall;
  if(m===11||m===0) return SEASONS.winter;
  if(m===1) return SEASONS.valentine;
  if(m===2) return SEASONS.spring;
  return null;
}
var SEASONS={
  fall:{cols:['#c0392b','#d35400','#e67e22','#f39c12','#b7950b','#8e3b1f','#a04000'], flip:true, draw:function(ctx,L){
    var s=L.s;
    ctx.fillStyle=L.col;
    ctx.beginPath(); ctx.moveTo(0,-s);
    ctx.bezierCurveTo(s*0.8,-s*0.6,s*0.8,s*0.5,0,s);
    ctx.bezierCurveTo(-s*0.8,s*0.5,-s*0.8,-s*0.6,0,-s);
    ctx.fill();
    ctx.strokeStyle='rgba(60,25,5,.55)'; ctx.lineWidth=1.2;
    ctx.beginPath(); ctx.moveTo(0,-s*0.85); ctx.lineTo(0,s*1.35); ctx.stroke();
  }},
  /* light blue with a darker edge so the flakes show on the light page */
  winter:{cols:['#5b9bd5','#7fb3e0','#3d7cc9','#9cc7ec'], spin:true, draw:function(ctx,L){
    var s=L.s;
    ctx.strokeStyle=L.col; ctx.lineWidth=Math.max(1.5,s/7); ctx.lineCap='round';
    for(var k=0;k<6;k++){
      ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(0,-s);
      ctx.moveTo(0,-s*0.55); ctx.lineTo(s*0.28,-s*0.8);
      ctx.moveTo(0,-s*0.55); ctx.lineTo(-s*0.28,-s*0.8);
      ctx.stroke(); ctx.rotate(Math.PI/3);
    }
  }},
  valentine:{cols:['#e8505b','#d81b60','#ff6f91','#c2185b','#f48fb1'], draw:function(ctx,L){
    var s=L.s;
    ctx.fillStyle=L.col;
    ctx.beginPath(); ctx.moveTo(0,s*0.9);
    ctx.bezierCurveTo(-s*1.3,0,-s*0.7,-s*1.1,0,-s*0.35);
    ctx.bezierCurveTo(s*0.7,-s*1.1,s*1.3,0,0,s*0.9);
    ctx.fill();
  }},
  /* mostly clovers, with every fifth shape a rainbow */
  spring:{cols:['#2e9e4f','#3ac569','#1e7d3a','#4caf50'], draw:function(ctx,L,i){
    var s=L.s;
    if(i%5===4){
      var bands=['#e8505b','#ff8c42','#f4c430','#3ac569','#5b8def','#9b5de5'], w=s*0.22;
      ctx.lineWidth=w;
      bands.forEach(function(col,k){
        ctx.strokeStyle=col; ctx.beginPath(); ctx.arc(0,s*0.5,s*1.4-k*w,Math.PI,0); ctx.stroke();
      });
      return;
    }
    ctx.fillStyle=L.col;
    for(var k=0;k<4;k++){
      ctx.beginPath(); ctx.moveTo(0,0);
      ctx.bezierCurveTo(-s*0.75,-s*0.35,-s*0.55,-s*1.05,0,-s*0.6);
      ctx.bezierCurveTo(s*0.55,-s*1.05,s*0.75,-s*0.35,0,0);
      ctx.fill(); ctx.rotate(Math.PI/2);
    }
    ctx.strokeStyle=L.col; ctx.lineWidth=Math.max(1.5,s/7); ctx.lineCap='round';
    ctx.beginPath(); ctx.moveTo(0,0); ctx.quadraticCurveTo(s*0.25,s*0.7,s*0.1,s*1.2); ctx.stroke();
  }}
};
function fallingShapes(c,ctx,W0,H0,kind){
  var bits=[];
  for(var i=0;i<70;i++){
    bits.push({x:Math.random()*W0, y:-20-Math.random()*H0*0.9, vy:2.2+Math.random()*2.6,
      sway:20+Math.random()*40, ph:Math.random()*6.3, sp:0.002+Math.random()*0.003,
      s:9+Math.random()*9, r:kind.spin?Math.random()*6.3:(Math.random()-.5)*0.6,
      vr:kind.spin?(Math.random()-.5)*0.08:0, col:kind.cols[i%kind.cols.length]});
  }
  var t0=null;
  function frame(now){
    if(t0===null) t0=now;
    var age=now-t0;
    ctx.clearRect(0,0,W0,H0);
    ctx.globalAlpha=age>2600?Math.max(0,1-(age-2600)/800):1;
    bits.forEach(function(L,i){
      L.y+=L.vy; L.r+=L.vr;
      var x=L.x+Math.sin(L.ph+age*L.sp)*L.sway;
      ctx.save(); ctx.translate(x,L.y);
      /* leaves tumble and flip; the other shapes rock gently from side to side */
      ctx.rotate(L.r+Math.sin(L.ph+age*L.sp)*(kind.flip?0.6:0.3));
      if(kind.flip) ctx.scale(1,0.55+0.45*Math.abs(Math.cos(L.ph+age*L.sp*1.5)));
      kind.draw(ctx,L,i); ctx.restore();
    });
    if(age<3400) requestAnimationFrame(frame); else c.remove();
  }
  requestAnimationFrame(frame);
}

/* ------------------------------------------------------------------ */
/* Game board: category columns of point tiles. A tile opens its       */
/* question in a window. Questions live in a hidden store on the page  */
/* so saving, Listen buttons, and the PDF work the same as in parts.   */
/* ------------------------------------------------------------------ */
var TILES=[], DLG=null, OPEN=null;
var SHARE={1:'all of the points',0.5:'half',0.25:'a quarter',0.75:'three quarters'};
function shareWord(x){return SHARE[x]||Math.round(x*100)+'%';}
function tileCredit(r){ if(!r||!r.ok) return 0; return CREDIT[Math.min(r.miss||0,CREDIT.length-1)]||0; }
function tileState(t){
  if(t.written){
    var txt=W[t.written]?(S.written[t.written]||{}).text:segsPlain((S.rich[t.written]||{}).segs);
    return {done:W[t.written]?isWrittenDone(t.written):isRichDone(t.written),started:!!String(txt||'').trim(),earned:null};
  }
  var rs=t.auto.map(function(id){return S.auto[id];});
  var sum=rs.reduce(function(n,r){return n+tileCredit(r);},0);
  return {
    done:rs.every(function(r){return r&&(r.ok||isLocked(r));}),
    started:rs.some(function(r){return r&&r.v;}),
    earned:Math.round(t.value*sum/Math.max(1,rs.length))
  };
}
function tileNote(t){
  var st=tileState(t);
  return t.cat+' for '+t.value+' points'
    +(t.written?', graded by your teacher':', earned '+st.earned)
    +(t.ref?' (test question '+t.ref+')':'');
}
function boardTotals(){
  var o={earned:0,auto:0,written:0,wdone:0,done:0,n:TILES.length};
  TILES.forEach(function(t){
    var st=tileState(t);
    if(st.done) o.done++;
    if(t.written){ o.written+=t.value; if(st.done) o.wdone++; }
    else { o.auto+=t.value; o.earned+=st.earned; }
  });
  return o;
}
function boardIntro(){
  var c=CREDIT.slice(0,MAXT), parts=c.map(function(x,i){return (['the first','the second','the third','the fourth'][i]||'try '+(i+1))+' try earns '+shareWord(x);});
  var hasW=allQuestions().some(function(q){return q.type==='written'||q.type==='highlight';});
  return 'Pick any tile to open its question. Bigger numbers are worth more points. You get '+(NUMWORD[MAXT]||MAXT)
    +' tries on each answer that checks itself: a right answer on '+parts.join(', ').replace(/, ([^,]*)$/,', and $1')
    +'. After '+(NUMWORD[MAXT]||MAXT)+' wrong tries the answer locks.'
    +(hasW?' Tiles with a written answer are graded by your teacher.':'')
    +(BOARD.final?' When every tile is finished, the Final round opens.':'')
    +' You can close a question and come back to it later. When you are done, scroll to the bottom to download your PDF.';
}
function boardSection(){
  var s=h('section','task boardsec'); s.id='board';
  s.append(h('h2','display',BOARD.heading||'Game board'));
  s.append(h('p','intro',BOARD.intro||boardIntro()));
  var sc=h('p','bscore'); sc.id='bScore'; sc.setAttribute('aria-live','polite'); s.append(sc);
  var store=h('div'); store.hidden=true;
  var grid=h('div','board'); grid.style.setProperty('--cols',String((BOARD.categories||[]).length));
  var vals=BOARD.values||[100,200,300,400,500];
  (BOARD.categories||[]).forEach(function(c,ci){
    var col=h('div','bcol'); col.setAttribute('role','group'); col.setAttribute('aria-label',c.title);
    col.append(h('h3','bcat display',c.title));
    var tl=h('div','btiles');
    (c.tiles||[]).forEach(function(q,i){ tl.append(makeTile(q,c.title,ci,q.points||vals[i]||(i+1)*100,store)); });
    col.append(tl); grid.append(col);
  });
  s.append(grid);
  if(BOARD.final){
    var fin=h('div','bfinal');
    fin.append(h('h3','display',BOARD.final.title||'Final round'));
    fin.append(makeTile(BOARD.final,BOARD.final.title||'Final round',-1,BOARD.final.points||1000,store));
    s.append(fin);
  }
  s.append(store);
  return s;
}
function makeTile(q,cat,ci,val,store){
  var home=h('div'); store.append(home);
  var t={cat:cat,ci:ci,value:val,ref:q.ref||'',home:home};
  var info=buildQuestion(q,home,t);
  t.num=info.num; t.el=info.el; t.auto=info.auto; t.written=info.written;
  var b=h('button','tile'); b.type='button'; t.btn=b;
  b.addEventListener('click',function(){openTile(t);});
  TILES.push(t);
  return b;
}
function dialogEl(){
  if(DLG) return DLG;
  var d=document.createElement('dialog'); d.className='tiledlg'; d.setAttribute('aria-labelledby','dlgh');
  var inn=h('div','dlgin'), hd=h('div','dlghead');
  var t=h('h2','display'); t.id='dlgh';
  var pts=h('p','dlgpts'); pts.setAttribute('aria-live','polite');
  hd.append(t,pts);
  var body=h('div','dlgbody');
  var foot=h('div','dlgfoot'), back=h('button','btn','Back to the board'); back.type='button';
  foot.append(back); inn.append(hd,body,foot); d.append(inn);
  back.addEventListener('click',function(){d.close();});
  d.addEventListener('click',function(e){ if(e.target===d) d.close(); });
  inn.tabIndex=-1;
  d.addEventListener('close',function(){
    ttsStop();
    var t0=OPEN; OPEN=null;
    if(t0){ t0.home.append(t0.el); if(t0.btn.isConnected) t0.btn.focus(); }
  });
  document.body.append(d);
  DLG={d:d,inn:inn,title:t,pts:pts,body:body};
  return DLG;
}
function openTile(t){
  if(t.btn.getAttribute('aria-disabled')==='true') return;
  var D=dialogEl();
  if(D.d.open) D.d.close();
  OPEN=t;
  D.title.textContent=t.cat+' for '+t.value;
  D.body.append(t.el);
  paintDialog();
  D.d.showModal();
  D.body.querySelectorAll('textarea').forEach(function(ta){ta.style.height='auto'; ta.style.height=Math.max(ta.scrollHeight+2,100)+'px';});
  D.d.scrollTop=0;
}
function paintDialog(){
  if(!OPEN||!DLG) return;
  /* a locked answer disables the control that had focus; keep focus in the window so Tab and Escape still work */
  var ae=document.activeElement;
  if(DLG.d.open&&(!DLG.d.contains(ae)||ae.disabled)) DLG.inn.focus({preventScroll:true});
  var t=OPEN, st=tileState(t);
  if(t.written) DLG.pts.textContent='Worth '+t.value+' points. Your teacher grades this one.'+(st.done?' Your answer is saved.':'');
  else if(st.done) DLG.pts.textContent='Finished. You earned '+st.earned+' of '+t.value+' points.';
  else DLG.pts.textContent='Worth '+t.value+' points.'+(t.auto.length>1?' Each menu is checked on its own.':'');
}
function paintBoard(){
  var per={}, finalTile=null, others=0, othersDone=0;
  TILES.forEach(function(t){
    var st=tileState(t), b=t.btn;
    if(t.ci<0) finalTile=t;
    else{
      var p=per[t.ci]||(per[t.ci]={n:0,d:0}); p.n++; if(st.done) p.d++;
      others++; if(st.done) othersDone++;
    }
    b.dataset.s=st.done?'done':(st.started?'started':'');
    b.textContent='';
    var big=h('span','tv',String(t.value)), small=h('small');
    if(st.done) small.textContent=t.written?'Answered':st.earned+' earned';
    else if(st.started) small.textContent='In progress';
    b.append(big,small);
    b.setAttribute('aria-label',t.cat+' for '+t.value+' points. '+(st.done?(t.written?'Answered.':'Finished, '+st.earned+' points earned.'):(st.started?'In progress.':'Not started.')));
  });
  if(finalTile){
    var lockedF=othersDone<others&&!tileState(finalTile).started;
    finalTile.btn.setAttribute('aria-disabled',lockedF?'true':'false');
    if(lockedF){
      finalTile.btn.dataset.s='locked';
      finalTile.btn.querySelector('small').textContent='Opens when every tile is finished ('+othersDone+' of '+others+' done)';
      finalTile.btn.setAttribute('aria-label','Final round. Opens when every tile is finished. '+othersDone+' of '+others+' done.');
    }
  }
  (BOARD.categories||[]).forEach(function(c,i){
    var p=per[i]||{n:0,d:0}, pct=p.n?Math.round(100*p.d/p.n):0, trk=$('#trk'+(i+1));
    if(!trk) return;
    $('.tf',trk).style.width=pct+'%'; $('.tt',trk).setAttribute('aria-valuenow',String(pct));
  });
  var T=boardTotals();
  $('#bScore').innerHTML='Your score: <strong>'+T.earned+'</strong> of '+T.auto+' points. Tiles finished: <strong>'+T.done+' of '+T.n+'</strong>.'
    +(T.written?' Written tiles ('+T.written+' points) are graded by your teacher.':'');
  paintDialog();
}

/* ------------------------------------------------------------------ */
/* Summary, PDF, backup                                                */
/* ------------------------------------------------------------------ */
function fmtDate(d){
  return d.toLocaleDateString('en-US',{weekday:'long',year:'numeric',month:'long',day:'numeric'});
}
/* Teacher-only time code */
function timeCode(){
  var m=(S.time||0)/60;
  return m<10?'check':m<30?'star':m<=60?'dash':'burst';
}
var CODE_SYM={check:'✓',star:'★',dash:'—',burst:'✷'};

function videoRows(){
  return VID_ORDER.map(function(k){
    var vs=vidStats(k);
    return [clipLabel(k),'Watched '+fmt(vs.sec)+' of '+fmt(vs.n)+' ('+vs.pct+'%)'+(vs.pct>=VID_DONE?', complete':'')+'.'];
  });
}
/* Answers grouped by question */
function answerGroups(){
  var groups=[], last=null;
  ORDER.forEach(function(o){
    var q=o.q||{num:'',text:o.label};
    if(!last||last.q!==q){ last={q:q,num:q.num,text:q.text,note:q.tile?tileNote(q.tile):'',items:[]}; groups.push(last); }
    if(o.kind==='graph'){ graphReport(o).forEach(function(it){last.items.push(it);}); return; }
    var it={sub:o.sub||'',resp:[],tag:'',rich:null};
    if(o.kind==='auto'){
      var r=S.auto[o.id];
      if(o.id==='mn'){
        var sv=(S.mn||[]).map(function(x){return (x||'').trim();}).join(' ').trim();
        it.resp=[sv||'(no answer)'];
        if(r&&r.v) it.tag=(r.ok?'correct':'incorrect')+(r.miss?' • '+r.miss+(r.miss===1?' wrong try':' wrong tries'):'');
      } else if(!r||!r.v){it.resp=['(no answer)']; if(r&&r.miss) it.tag=r.miss+(r.miss===1?' wrong try':' wrong tries');}
      else if(r.pend){ it.resp=[plain(r.v)]; it.tag='not checked yet'+(r.miss?' • '+r.miss+(r.miss===1?' wrong try':' wrong tries'):''); }
      else{ it.resp=[plain(r.v)]; it.tag=(r.ok?'correct':'incorrect')+(r.miss?' • '+r.miss+(r.miss===1?' wrong try':' wrong tries'):''); }
      if(r&&r.how==='sound') it.tag+=(it.tag?' • ':'')+'sound check only (this browser could not recognize words)';
      if(r&&r.peek) it.tag+=(it.tag?' • ':'')+'peeked at the definition';
    } else if(o.kind==='rich'){
      var st=S.rich[o.id]||{segs:[]}, ptxt=segsPlain(st.segs).trim();
      it.resp=[ptxt||'(no answer)'];
      if(ptxt){ it.rich=st.segs; it.cer=!!(R[o.id]&&R[o.id].cer); it.tag=words(ptxt)+' words, '+(it.cer?cerTag(st.segs):segsHlWords(st.segs)+' highlighted as transition words'); }
    } else if(o.kind==='agree'){
      var ag=S.agree[o.id]||{};
      it.resp=o.items.map(function(x,i){return ((ag.on||[])[i]?'[x] ':'[ ] ')+plain(x);});
      if(o.sign) it.resp.push('Signed: '+((ag.sign||'').trim()||'(not signed)'));
      it.tag=ag.at?'agreed on '+fmtDate(new Date(ag.at)):'not finished';
    } else if(o.kind==='photo'){
      var ph=S.photos[o.id]||{}, cap=(ph.cap||'').trim();
      it.photo=ph.has?o.id:null; it.cap=!!cap;
      it.resp=[cap||'(no caption)'];
      it.tag=ph.has?'photo added':'no photo added';
    } else {
      var w=S.written[o.id]||{}, t=(w.text||'').trim();
      it.resp=[t||'(no answer)'];
    }
    last.items.push(it);
  });
  return groups;
}
function summaryParts(){
  var sc=score(), board=[];
  if(BOARD){
    var T=boardTotals();
    board.push(['Game score (tiles that check themselves)',T.earned+' of '+T.auto+' points'+(T.auto?' ('+Math.round(100*T.earned/T.auto)+'%)':'')]);
    if(T.written) board.push(['Written tiles (graded by teacher)',T.wdone+' answered, worth '+T.written+' points']);
    board.push(['Tiles finished',T.done+' of '+T.n]);
  }
  var res=videoRows().concat(board,[
    ['Auto-checked items',sc.a+' / '+TOTAL_A+' correct'],
    ['Written responses',sc.w+' / '+TOTAL_W+' completed']
  ].concat(TOTAL_P?[['Photos added',sc.p+' / '+TOTAL_P]]:[]));
  return {date:fmtDate(new Date()),res:res,groups:answerGroups()};
}
function buildSummary(){
  var p=summaryParts();
  var L=[TITLE,COURSE,fullName()||'(name not entered)','Date completed: '+p.date,'','Results '+CODE_SYM[timeCode()]];
  p.res.forEach(function(r){L.push(r[0]+': '+r[1]);});
  var anyCer=Object.keys(R).some(function(k){return R[k].cer;}), anyHl=Object.keys(R).some(function(k){return !R[k].cer;});
  if(anyHl) L.push('(Text inside [[double brackets]] was highlighted in yellow as transition words that point to evidence.)');
  if(anyCer) L.push('(In claim-evidence answers, [CLAIM: …] was highlighted blue, [EVIDENCE: …] yellow, and [REASONING/EXPAND: …] green.)');
  L.push('');
  p.groups.forEach(function(g){
    L.push((g.num!==''?g.num+'. ':'')+plain(g.text));
    if(g.note) L.push('   ['+g.note+']');
    g.items.forEach(function(it){
      var pre=it.sub?'   '+plain(it.sub)+': ':'   ';
      if(it.photo!==undefined){ L.push('   '+(it.photo?'[photo added - it shows only in the PDF]':'[no photo added]')); if(it.photo||it.cap) L.push('   Caption: “'+it.resp[0].replace(/\n/g,' ')+'”'); }
      else if(it.rich){ if(it.sub) L.push('   '+plain(it.sub)+':'); String(segsText(it.rich,it.cer)).split('\n').forEach(function(x){L.push('      '+x);}); if(it.tag) L.push('      ['+it.tag+']'); }
      else if(it.resp.length===1) L.push(pre+'“'+it.resp[0].replace(/\n/g,' ')+'”'+(it.tag?' ['+it.tag+']':''));
      else { if(it.sub) L.push('   '+plain(it.sub)+':'); it.resp.forEach(function(x){L.push('      '+x);}); if(it.tag) L.push('      ['+it.tag+']'); }
    });
    L.push('');
  });
  return L.join('\n');
}

/* PDF report */
function pdfSafe(t){
  return String(t)
    .replace(/[‘’‛′]/g,"'").replace(/[“”‟″]/g,'"')
    .replace(/[–—−]/g,'-').replace(/…/g,'...').replace(/ /g,' ').replace(/•/g,'·')
    .replace(/[←-⇿]/g,'->').replace(/Δ/g,'Delta ').replace(/[^\x09\x0A\x0D\x20-\x7E¡-ÿ]/g,'');
}
/* Heading lines in Cabin Bold, drawn to an image so the PDF matches the font exactly */
async function headingPng(lines,pt){
  try{ await Promise.race([document.fonts.load('700 '+pt+'px Cabin'),new Promise(function(r){setTimeout(r,2500);})]); }catch(e){}
  var scale=4, lh=pt*1.3, c=document.createElement('canvas'), x=c.getContext('2d');
  var font='700 '+pt*scale+'px Cabin, "Helvetica Neue", Arial, sans-serif';
  x.font=font;
  var w=Math.ceil(Math.max.apply(null,lines.map(function(t){return x.measureText(t).width;}))+4*scale);
  c.width=w; c.height=Math.ceil(lh*lines.length*scale+2*scale);
  x=c.getContext('2d'); x.font=font; x.fillStyle='#2d2926'; x.textBaseline='alphabetic';
  lines.forEach(function(t,i){ x.fillText(t,0,(i*lh+pt)*scale); });
  var blob=await new Promise(function(r){c.toBlob(r,'image/png');});
  return {bytes:new Uint8Array(await blob.arrayBuffer()),w:w/scale,h:c.height/scale};
}
/* Teacher-only time symbol, drawn as vector shapes */
function drawSymbol(page,L,kind,x,cy,sz,color){
  var r=sz/2, cx=x+r;
  function star(n,ro,ri){
    var d='';
    for(var i=0;i<n*2;i++){ var rr=(i%2)?ri:ro, a=Math.PI*i/n-Math.PI/2;
      d+=(i?'L':'M')+(rr*Math.cos(a)).toFixed(2)+' '+(rr*Math.sin(a)).toFixed(2)+' '; }
    page.drawSvgPath(d+'Z',{x:cx,y:cy,color:color});
  }
  if(kind==='check'){
    page.drawSvgPath('M'+(-r*0.85)+' '+(r*0.05)+' L'+(-r*0.25)+' '+(r*0.65)+' L'+(r*0.9)+' '+(-r*0.75),
      {x:cx,y:cy,borderColor:color,borderWidth:sz*0.16,borderLineCap:L.LineCapStyle.Round});
  } else if(kind==='star'){ star(5,r,r*0.42); }
  else if(kind==='dash'){ page.drawLine({start:{x:x,y:cy},end:{x:x+sz,y:cy},thickness:sz*0.12,color:color}); }
  else { star(8,r,r*0.45); }
}
async function buildPdf(){
  var L=window.PDFLib;
  if(!L) throw new Error('nolib');
  var doc=await L.PDFDocument.create();
  doc.setTitle(TITLE+' - '+pdfSafe(fullName()));
  doc.setAuthor(pdfSafe(fullName()));
  var F=await doc.embedFont(L.StandardFonts.Helvetica), FB=await doc.embedFont(L.StandardFonts.HelveticaBold), FI=await doc.embedFont(L.StandardFonts.HelveticaOblique), FBI=await doc.embedFont(L.StandardFonts.HelveticaBoldOblique);
  var W0=612, PH=792, M=54, CW=W0-2*M, y=0, page=null;
  var INK=L.rgb(45/255,41/255,38/255), MUTED=L.rgb(95/255,88/255,80/255), GOLD=L.rgb(193/255,160/255,30/255), LINE=L.rgb(224/255,216/255,202/255), RESP=L.rgb(110/255,90/255,12/255), YEL=L.rgb(1,0.93,0), HLP={y:YEL,b:L.rgb(0,1,1),g:L.rgb(0,1,0)};
  function newPage(){ page=doc.addPage([W0,PH]); y=M; }
  function room(n){ if(!page||y+n>PH-M) newPage(); }
  function wrap(t,font,size,width){
    var out=[];
    t.split('\n').forEach(function(par){
      var ws=par.split(/ +/), line='';
      ws.forEach(function(w){
        var test=line?line+' '+w:w;
        if(font.widthOfTextAtSize(test,size)<=width){ line=test; return; }
        if(line) out.push(line);
        while(font.widthOfTextAtSize(w,size)>width){
          var k=w.length; while(k>1&&font.widthOfTextAtSize(w.slice(0,k),size)>width) k--;
          out.push(w.slice(0,k)); w=w.slice(k);
        }
        line=w;
      });
      out.push(line);
    });
    return out;
  }
  function text(t,size,font,indent,color,lhMul){
    indent=indent||0;
    var lh=size*(lhMul||1.35);
    wrap(pdfSafe(t),font,size,CW-indent).forEach(function(ln){
      room(lh);
      page.drawText(ln,{x:M+indent,y:PH-y-size,size:size,font:font,color:color||INK});
      y+=lh;
    });
  }
  /* a response with yellow highlighter marks behind the highlighted transition words */
  function richText(segs,size,font,indent,color){
    var lh=size*1.35, width=CW-indent, sp=font.widthOfTextAtSize(' ',size);
    var paras=[[]], cur=null;
    segs.forEach(function(s){
      String(s[0]).split('\n').forEach(function(part,i){
        if(i>0){ paras.push([]); cur=null; }
        var re=/(\s+)|(\S+)/g, m, t=pdfSafe(part);
        while((m=re.exec(t))){
          if(m[1]){ cur=null; continue; }
          if(!cur){ cur={runs:[],tw:0}; paras[paras.length-1].push(cur); }
          var rw=font.widthOfTextAtSize(m[2],size);
          cur.runs.push({w:m[2],hl:hlCode(s[1]),tw:rw}); cur.tw+=rw;
        }
      });
    });
    paras.forEach(function(tokens){
      var lines=[[]], curW=0;
      tokens.forEach(function(tk){
        var need=lines[lines.length-1].length?curW+sp+tk.tw:tk.tw;
        if(need>width&&lines[lines.length-1].length){ lines.push([]); need=tk.tw; }
        lines[lines.length-1].push(tk); curW=need;
      });
      lines.forEach(function(ln){
        room(lh);
        var x0=M+indent, base=PH-y-size, x=x0;
        ln.forEach(function(tk,i){
          var rx=x;
          tk.runs.forEach(function(r){
            if(r.hl) page.drawRectangle({x:rx-1,y:base-2.4,width:r.tw+2,height:size+3.2,color:HLP[r.hl]});
            rx+=r.tw;
          });
          var nx=ln[i+1];
          var lr=tk.runs[tk.runs.length-1].hl;
          if(nx&&lr&&nx.runs[0].hl===lr) page.drawRectangle({x:x+tk.tw-1,y:base-2.4,width:sp+2,height:size+3.2,color:HLP[lr]});
          x+=tk.tw+sp;
        });
        x=x0;
        ln.forEach(function(tk){
          var rx=x;
          tk.runs.forEach(function(r){ page.drawText(r.w,{x:rx,y:base,size:size,font:font,color:INK}); rx+=r.tw; });
          x+=tk.tw+sp;
        });
        y+=lh;
      });
    });
  }
  /* text with *italic* scientific names */
  function mixed(t,size,fR,fI,indent,color){
    var lh=size*1.35, width=CW-indent, sp=fR.widthOfTextAtSize(' ',size);
    var ws=[], cur=null;
    String(t).split('*').forEach(function(part,i){
      var font=(i%2)?fI:fR, re=/(\s+)|(\S+)/g, m, u=pdfSafe(part);
      while((m=re.exec(u))){
        if(m[1]){cur=null;continue;}
        if(!cur){cur={runs:[],tw:0}; ws.push(cur);}
        var rw=font.widthOfTextAtSize(m[2],size); cur.runs.push({w:m[2],f:font,tw:rw}); cur.tw+=rw;
      }
    });
    var lines=[[]], cw=0;
    ws.forEach(function(w){
      var need=lines[lines.length-1].length?cw+sp+w.tw:w.tw;
      if(need>width&&lines[lines.length-1].length){lines.push([]); need=w.tw;}
      lines[lines.length-1].push(w); cw=need;
    });
    lines.forEach(function(ln){
      room(lh);
      var x=M+indent, base=PH-y-size;
      ln.forEach(function(w){
        var rx=x;
        w.runs.forEach(function(r){page.drawText(r.w,{x:rx,y:base,size:size,font:r.f,color:color||INK}); rx+=r.tw;});
        x+=w.tw+sp;
      });
      y+=lh;
    });
  }
  function rule(c,th){ room(th+2); page.drawLine({start:{x:M,y:PH-y},end:{x:W0-M,y:PH-y},thickness:th,color:c}); }
  var p=summaryParts();
  newPage();

  var hd=await headingPng([TITLE,COURSE,fullName()||'(name not entered)'],14);
  var img=await doc.embedPng(hd.bytes);
  page.drawImage(img,{x:M,y:PH-M-hd.h,width:hd.w,height:hd.h});
  /* school eagle and name in the top right corner (left out if the picture cannot load) */
  try{
    var eg=await doc.embedPng(new Uint8Array(await (await fetch(BRAND+'eagle.png')).arrayBuffer())), eh=40, ew=eh*eg.width/eg.height;
    var bn='ELITE ACADEMIC ACADEMY', bw=FB.widthOfTextAtSize(bn,7);
    page.drawImage(eg,{x:W0-M-bw/2-ew/2,y:PH-M-eh,width:ew,height:eh});
    page.drawText(bn,{x:W0-M-bw,y:PH-M-eh-10,size:7,font:FB,color:RESP});
  }catch(e){}
  y=M+hd.h+6;
  text('Date completed: '+p.date,11,F,0,MUTED);
  y+=6; rule(GOLD,2); y+=14;

  room(20);
  var ry=y;
  text('Results',13,FB);
  drawSymbol(page,L,timeCode(),M+FB.widthOfTextAtSize('Results',13)+8,PH-ry-13*0.64,11,INK);
  y+=2;
  p.res.forEach(function(r){ text(r[0]+': '+r[1],10.5,F); y+=1; });
  y+=8; rule(LINE,1); y+=14;

  /* photos: load each saved picture before drawing */
  var pics={};
  for(var gi=0;gi<p.groups.length;gi++){
    for(var ii=0;ii<p.groups[gi].items.length;ii++){
      var pid=p.groups[gi].items[ii].photo;
      if(!pid) continue;
      try{ var buf=await photoGet(pid); if(buf) pics[pid]=await doc.embedJpg(buf); }catch(e){}
    }
  }

  text('Questions and answers',13,FB); y+=4;
  for(var gi=0;gi<p.groups.length;gi++) for(var ii=0;ii<p.groups[gi].items.length;ii++){
    var it0=p.groups[gi].items[ii];
    if(!it0.svg) continue;
    try{ var pic=await svgPng(it0.svg,3); it0.png={img:await doc.embedPng(pic.bytes),w:pic.w,h:pic.h}; }catch(e){}
  }
  p.groups.forEach(function(g){
    y+=6;
    room(40);
    mixed((g.num!==''?g.num+'. ':'')+g.text,10.5,FB,FBI,0);
    if(g.note) text(g.note,9,F,0,MUTED);
    g.items.forEach(function(it){
      y+=2;
      var ind=16;
      if(it.sub){ mixed(it.sub,10,F,FI,ind,MUTED); ind=28; }
      if(it.photo&&pics[it.photo]){
        var pic=pics[it.photo], k=Math.min((CW-ind)/pic.width,320/pic.height,1), pw=pic.width*k, ph=pic.height*k;
        room(ph+8);
        page.drawImage(pic,{x:M+ind,y:PH-y-ph,width:pw,height:ph});
        y+=ph+8;
      } else if(it.photo) it.tag='photo added, but it could not be loaded into this PDF';
      if(it.photo!==undefined){ if(it.photo||it.cap) text('Caption: '+it.resp[0],10.5,FI,ind,RESP); }
      else if(it.rich) richText(it.rich,10.5,FI,ind);
      else it.resp.forEach(function(r){ text(r,10.5,FI,ind,RESP); });
      if(it.tag) text('('+it.tag+')',8.5,F,ind,MUTED);
      if(it.png){
        var gw=Math.min(it.png.w*0.62,CW-ind), gh=it.png.h*gw/it.png.w;
        y+=4; room(gh+4);
        page.drawImage(it.png.img,{x:M+ind,y:PH-y-gh,width:gw,height:gh});
        page.drawRectangle({x:M+ind,y:PH-y-gh,width:gw,height:gh,borderColor:LINE,borderWidth:1});
        y+=gh+4;
      }
    });
  });

  var pages=doc.getPages(), n=pages.length;
  pages.forEach(function(pg,i){
    pg.drawText(pdfSafe((fullName()||'Student')+'  |  '+TITLE+'  |  '+COURSE+'  |  Page '+(i+1)+' of '+n),{x:M,y:28,size:9,font:F,color:MUTED});
  });
  var bytes=await doc.save();
  return new Blob([bytes],{type:'application/pdf'});
}
function pdfName(){
  var nm=((S.last||'').trim()+(S.first?' '+S.first.trim():'')).replace(/[\\\/:*?"<>|]+/g,'').trim();
  return TITLE+' - '+(nm||'Student')+'.pdf';
}
function copyText(text,ta){
  function fallback(){try{ta.focus();ta.select();return Promise.resolve(document.execCommand('copy'));}catch(e){return Promise.resolve(false);}}
  if(navigator.clipboard&&navigator.clipboard.writeText){
    return navigator.clipboard.writeText(text).then(function(){return true;},fallback);
  }
  return fallback();
}
function encodeState(){return btoa(unescape(encodeURIComponent(JSON.stringify(S))));}
function decodeState(code){
  var o=JSON.parse(decodeURIComponent(escape(atob(code.replace(/\s+/g,'')))));
  if(!o||typeof o!=='object'||typeof o.auto!=='object'||typeof o.written!=='object') throw new Error('bad');
  var f=fresh(); copyMeta(f,o);
  return f;
}

function finishEl(){
  var s=h('section','task finish'); s.id='finish';
  s.append(h('h2','display','Finish and submit to Canvas'));
  var ol=h('ol');
  ['Check that your first and last name are entered at the top of the page.',
   'Select “Download my PDF.” If your browser asks, choose to save the file.',
   'Go to the Canvas assignment, select File Upload, upload the PDF, and submit.'].forEach(function(t){ol.append(h('li',null,t));});
  s.append(ol);
  s.append(h('p','intro',BOARD
    ?'Your PDF shows your name, the date you finished, your score, and all of your answers.'
    :'Your PDF shows your name, the date you finished, '+(VID_ORDER.length?'how much of the video you watched, ':'')+'and all of your answers'+(Object.keys(R).length?', including your yellow highlights':'')+(Object.keys(P).length?'. It also shows your photos':'')+'.'));
  var row=h('div','row');
  var make=h('button','btn','Download my PDF'); make.type='button';
  var cmsg=h('span','msg'); cmsg.setAttribute('aria-live','polite');
  row.append(make,cmsg); s.append(row);
  function say(t,ok){cmsg.textContent=t; if(ok==null) cmsg.removeAttribute('data-s'); else cmsg.dataset.s=ok?'ok':'bad';}
  function fallbackSave(blob){
    try{
      var u=URL.createObjectURL(blob), a=document.createElement('a');
      a.href=u; a.download=pdfName(); document.body.append(a); a.click(); a.remove();
      setTimeout(function(){URL.revokeObjectURL(u);},60000);
      return true;
    }catch(e){return false;}
  }
  make.addEventListener('click',function(){
    if(!(S.first||'').trim()||!(S.last||'').trim()){
      say('Enter your first and last name at the top of the page first.',false);
      $((S.first||'').trim()?'#last':'#first').focus(); return;
    }
    var blob;
    make.disabled=true; say('Preparing your PDF…');
    buildPdf().then(function(b){
      blob=b;
      return Promise.resolve(window.claude&&window.claude.use?window.claude.use('downloads'):null).catch(function(){return null;});
    }).then(function(dl){
      if(!dl){ return fallbackSave(blob)?'saved':'fail'; }
      return dl.save({filename:pdfName(),data:blob}).then(function(){return 'saved';},function(err){
        var c=err&&err.code;
        if(c==='declined') return 'declined';
        if(c==='rate_limited') return 'busy';
        return fallbackSave(blob)?'saved':'fail';
      });
    }).then(function(r){
      make.disabled=false;
      if(r==='saved'){finished=true; say('Done. Your PDF is saved. Now upload it to the Canvas assignment.',true);}
      else if(r==='declined') say('The download was canceled. Select “Download my PDF” again when you’re ready.',false);
      else if(r==='busy') say('A download box is already open. Finish that one, then try again.',false);
      else { say('The download didn’t work here. Use “Copy my answers as text” below instead.',false); txtd.open=true; }
    },function(err){
      try{console.error('PDF error',err&&err.message?err.message:err);}catch(e){}
      make.disabled=false;
      say('The PDF couldn’t be made. Use “Copy my answers as text” below instead.',false); txtd.open=true;
    });
  });

  var txtd=h('details','backup'); txtd.append(h('summary',null,'Can’t download? Copy my answers as text'));
  txtd.append(h('p','intro','Only use this if the PDF won’t download. Copy the text, then paste it into the Text Entry box on the Canvas assignment. Your highlighted transition words will be marked with [[double brackets]]'+(Object.keys(R).some(function(k){return R[k].cer;})?', and your claim, evidence, and expanding will be marked [CLAIM: …], [EVIDENCE: …], and [REASONING/EXPAND: …]':'')+'.'));
  var tr=h('div','row');
  var tmake=h('button','btn ghost','Show my answers as text'); tmake.type='button';
  tr.append(tmake); txtd.append(tr);
  var ta=h('textarea','sum'); ta.readOnly=true; ta.hidden=true; ta.setAttribute('aria-label','Your answers as text');
  var crow=h('div','row gap'); crow.hidden=true;
  var copy=h('button','btn','Copy text'); copy.type='button';
  var tmsg=h('span','msg'); tmsg.setAttribute('aria-live','polite');
  crow.append(copy,tmsg); txtd.append(ta,crow); s.append(txtd);
  tmake.addEventListener('click',function(){
    if(!(S.first||'').trim()||!(S.last||'').trim()){ tmsg.textContent=''; crow.hidden=false; tmsg.dataset.s='bad'; tmsg.textContent='Enter your first and last name at the top of the page first.'; return; }
    ta.value=buildSummary(); ta.hidden=false; crow.hidden=false; tmsg.textContent='';
  });
  copy.addEventListener('click',function(){
    copyText(ta.value,ta).then(function(ok){
      if(ok){finished=true;tmsg.dataset.s='ok';tmsg.textContent='Copied. Now paste it into Canvas.';}
      else{tmsg.dataset.s='bad';tmsg.textContent='Copy didn’t work. Select the text in the box and copy it yourself.';}
    });
  });

  var det=h('details','backup'); det.append(h('summary',null,'Backup and restore (optional)'));
  det.append(h('p','intro','Copy your progress code and keep it somewhere safe, such as a note or email to yourself. If you lose your place, paste the code below to restore your answers.'+(Object.keys(P).length?' Photos are not included in the code; they stay in this browser.':'')));
  var r1=h('div','row');
  var cp=h('button','btn ghost','Copy my progress code'); cp.type='button';
  var pm=h('span','msg'); pm.setAttribute('aria-live','polite');
  r1.append(cp,pm); det.append(r1);
  var rt=h('textarea'); rt.setAttribute('aria-label','Paste a progress code here to restore your answers'); rt.setAttribute('placeholder','Paste a progress code here');
  det.append(rt);
  var r2=h('div','row gap');
  var rb=h('button','btn ghost','Restore from code'); rb.type='button';
  var rm=h('span','msg'); rm.setAttribute('aria-live','polite');
  r2.append(rb,rm); det.append(r2);
  cp.addEventListener('click',function(){
    var tmp=h('textarea'); tmp.value=encodeState(); tmp.style.position='fixed'; tmp.style.opacity='0'; ($('#finish')||document.body).append(tmp);
    copyText(tmp.value,tmp).then(function(ok){
      tmp.remove();
      pm.dataset.s=ok?'ok':'bad';
      pm.textContent=ok?'Copied.':'Copy didn’t work in this browser.';
    });
  });
  rb.addEventListener('click',function(){
    try{
      var n=decodeState(rt.value);
      S=n; save(); render();
      $('#first').value=S.first||''; $('#last').value=S.last||'';
    }catch(e){rm.dataset.s='bad';rm.textContent='That code didn’t work. Check that you copied all of it.';}
  });
  s.append(det);

  var rs=h('div','row gap');
  var start=h('button','btn ghost','Start over'); start.type='button';
  var ask=h('span'); ask.hidden=true;
  var yes=h('button','btn','Yes, erase all my answers'); yes.type='button';
  var no=h('button','btn ghost','Cancel'); no.type='button';
  ask.append(h('span',null,'This erases everything on this page. '),yes,' ',no);
  rs.append(start,ask); s.append(rs);
  start.addEventListener('click',function(){start.hidden=true;ask.hidden=false;});
  no.addEventListener('click',function(){start.hidden=false;ask.hidden=true;});
  yes.addEventListener('click',function(){
    var f1=S.first, l1=S.last; S=fresh(); S.first=f1; S.last=l1; finished=false; save();
    photoClearAll().then(render);
  });
  return s;
}

/* ------------------------------------------------------------------ */
/* Read aloud (text to speech)                                         */
/* ------------------------------------------------------------------ */
var TTS=('speechSynthesis' in window)&&('SpeechSynthesisUtterance' in window);
var ttsBtn=null, ttsRun=0;
function ttsStop(){
  ttsRun++;
  if(TTS){try{window.speechSynthesis.cancel();}catch(e){}}
  if(ttsBtn){ttsBtn.setAttribute('aria-pressed','false'); ttsBtn=null;}
}
/* voices: pick the most natural-sounding English voice the device has, preferring a female one */
var MALE=/\b(david|mark|guy|alex|daniel|fred|tom|ryan|eric|davis|james|aaron|gordon|rishi|arthur|oliver|george|roger|steffan|christopher|brian|andrew|thomas|jason|tony|liam|noah|ralph|junior|lee|reed|rocko|grandpa|eddy|evan|nathan|male)\b/i;
var FEMALE=/\b(aria|jenny|ava|allison|samantha|susan|zira|michelle|emma|ana|jane|sara|joanna|salli|kendra|kimberly|ivy|karen|moira|tessa|serena|kate|stephanie|nicky|libby|sonia|amy|olivia|natasha|clara|female|catherine|victoria|zoe|nora|siri)\b/i;
var NOVELTY=/(bad news|good news|bahh|bells|boing|bubbles|cellos|deranged|hysterical|jester|organ|superstar|trinoids|whisper|wobble|zarvox|albert|kathy|princess|agnes|bruce|espeak|compact)/i;
/* how natural a voice sounds */
function voiceScore(v){
  var n=v.name||'', sc=0;
  if(!/^en(-|_|$)/i.test(v.lang||'')) return -1000;
  if(NOVELTY.test(n)) sc-=300;
  if(/natural|neural|online/i.test(n)) sc+=300;          /* Edge: "Microsoft Aria Online (Natural)" */
  if(/premium|enhanced/i.test(n)) sc+=250;               /* Apple downloaded voices */
  if(/google/i.test(n)) sc+=150;                         /* Chrome: "Google US English" */
  if(/^(samantha|alex|ava|allison|tom|evan|nathan|zoe|joelle|susan)\b/i.test(n)) sc+=100;  /* better built-in Apple voices */
  if(v.localService===false) sc+=10;
  return sc;
}
function englishVoices(){
  var vs=[]; try{vs=window.speechSynthesis.getVoices()||[];}catch(e){}
  return vs.filter(function(v){return voiceScore(v)>-500;}).sort(function(a,b){return voiceScore(b)-voiceScore(a);});
}
/* American voices only; other English voices are used only on a device that has no American voice */
function usVoices(){
  var vs=englishVoices(), us=vs.filter(function(v){return /^en[-_]US$/i.test(v.lang||'');});
  return us.length?us:vs;
}
function voiceGender(v){
  var n=v.name||'';
  if(MALE.test(n)) return 'male';
  if(FEMALE.test(n)||/^google us english$/i.test(n)) return 'female';
  return '';
}
/* the most natural-sounding female American voice on the device. Voices whose names don't say
   (such as "Google US English") count as female. */
function pickVoice(){
  var vs=usVoices();
  return vs.filter(function(v){return voiceGender(v)!=='male';})[0]||vs[0]||null;
}
/* make the text easier to say: times, symbols, and stray punctuation */
function ttsClean(t){
  return String(t)
    .replace(/([^.!?:;,\n])[ \t]*\n+[ \t]*/g,'$1. ').replace(/\n+/g,' ')
    .replace(/\b(\d+):(\d{2})\b/g,function(m,a,b){
      var mm=parseInt(a,10), ss=parseInt(b,10), out=[];
      if(mm) out.push(mm+(mm===1?' minute':' minutes'));
      if(ss) out.push(ss+(ss===1?' second':' seconds'));
      return out.join(' ')||'0 seconds';
    })
    .replace(/\b(seconds?|minutes?)\s+(?=[A-Z])/g,'$1. ')
    .replace(/_{3,}/g,' blank ').replace(/\[\[|\]\]/g,'').replace(/\u2026/g,'.').replace(/\s[-\u2013\u2014]\s/g,', ')
    .replace(/(\d)-kingdom/g,'$1 kingdom').replace(/\bQ(\d+)/g,'Question $1')
    .replace(/\s+/g,' ').trim();
}
/* whole sentences, grouped into short passes so voices that stop after about 15 seconds still finish */
function ttsChunks(t){
  var sents=ttsClean(t).match(/[^.!?]+[.!?]+["')\u201d]*\s*|[^.!?]+$/g)||[], out=[], cur='';
  function push(x){ if(x.trim()) out.push(x.trim()); }
  sents.forEach(function(sn){
    if(sn.length>230){
      sn.replace(/,\s+/g,',\u0001').split('\u0001').forEach(function(p){ if((cur+' '+p).length>200&&cur){push(cur);cur=p;} else cur=cur?cur+' '+p:p; });
      return;
    }
    if((cur+' '+sn).length>200&&cur){push(cur);cur=sn;} else cur=cur?cur+' '+sn:sn;
  });
  push(cur);
  return out;
}
function ttsSay(text,btn){
  if(!TTS) return;
  if(ttsBtn===btn){ttsStop(); return;}
  ttsStop();
  var chunks=ttsChunks(text);
  if(!chunks.length) return;
  var run=ttsRun, voice=pickVoice();
  ttsBtn=btn; btn.setAttribute('aria-pressed','true');
  /* queue every pass at once so there is no gap between them */
  chunks.forEach(function(c,i){
    var u=new SpeechSynthesisUtterance(c);
    if(voice){u.voice=voice; u.lang=voice.lang;} else u.lang='en-US';
    u.rate=S.tts||0.95; u.pitch=1;
    if(i===chunks.length-1) u.onend=function(){ if(run===ttsRun) ttsStop(); };
    u.onerror=function(e){ if(run===ttsRun&&e&&e.error!=='interrupted'&&e.error!=='canceled') ttsStop(); };
    try{window.speechSynthesis.speak(u);}catch(e){ttsStop();}
  });
}
function listenBtn(getText,mine){
  var b=h('button','listen'+(mine?' mine':'')); b.type='button'; b.setAttribute('aria-pressed','false');
  b.setAttribute('aria-label',mine?'Listen to my answer':'Listen to this section');
  b.addEventListener('click',function(){
    var t=getText();
    if(!String(t).trim()){return;}
    ttsSay(t,b);
  });
  return b;
}
function decorate(){
  if(!TTS) return;
  var app=$('#app');
  /* instructions and readings */
  app.querySelectorAll('.stbox').forEach(function(el){
    el.prepend(listenBtn(function(){return [].map.call(el.querySelectorAll('li span'),function(x){return x.innerText;}).join('. ');}));
  });
  app.querySelectorAll('.wfor,.learn,.howbox').forEach(function(el){
    el.prepend(listenBtn(function(){return el.innerText;}));
  });
  /* pictures with their words: a Listen button right under the picture */
  app.querySelectorAll('figure.card').forEach(function(f){
    var t=f.querySelector('.cardtext .learn'); if(!t) return;
    var wrap=h('div','lrow'); wrap.append(listenBtn(function(){return t.textContent;}));
    f.querySelector('figcaption').after(wrap);
  });
  /* questions: the question and its answer choices */
  app.querySelectorAll('.q').forEach(function(q){
    var hd=q.querySelector('.qhead');
    hd.append(listenBtn(function(){
      var t=q.querySelector('.qtext').innerText;
      var opts=[].map.call(q.querySelectorAll('.opt,.bag'),function(o){return o.innerText;});
      if(opts.length) t+=(/[.?!:]\s*$/.test(t)?' ':'. ')+'The choices are: '+opts.join('. ')+'.';
      return t;
    }));
  });
  /* video and finish instructions */
  [['#video','p.intro'],['#board','p.intro'],['#finish','ol,p.intro']].forEach(function(pair){
    var sec=$(pair[0],app); if(!sec) return;
    var b=listenBtn(function(){return [].map.call(sec.querySelectorAll(pair[1]),function(e){return e.innerText;}).join('. ');});
    var wrap=h('div','lrow'); wrap.append(b); sec.querySelector('h2').after(wrap);
  });
  /* students can hear their own writing */
  app.querySelectorAll('.sub').forEach(function(sub){
    var ta=sub.querySelector('textarea'), ev=sub.querySelector('.ev');
    if(!ta&&!ev) return;
    var b=listenBtn(function(){return ta?ta.value:ev.innerText;},true);
    var wrap=h('div','lrow'); wrap.append(b);
    sub.append(wrap);
  });
}
/* the warning box and the speed menu are fixed on the page */
(function(){
  if(!TTS) return;
  var warn=$('.warn');
  warn.querySelector('h2').after(listenBtn(function(){return warn.innerText;}));
  var row=$('#ttsrow'), sel=$('#ttsRate');
  row.hidden=false; sel.value=String(S.tts||0.95);
  sel.addEventListener('change',function(){S.tts=parseFloat(sel.value)||0.95; commit(); ttsStop();});
  window.addEventListener('beforeunload',ttsStop);
})();

/* Copy and paste are off so students write in their own words: no copying questions or answers out of the
   page, and no pasting or dropping text into it. The Finish section (text copy, backup code) still works.
   copyPaste: true in assignment.js turns this off. */
(function(){
  if(A.copyPaste===true||TEACHER) return;
  var tell=null;
  function allowed(e){ var t=e.target; t=t&&t.nodeType===3?t.parentNode:t; return !!(t&&t.closest&&t.closest('#finish')); }
  function stop(e,msg){
    if(allowed(e)) return;
    e.preventDefault(); e.stopPropagation();
    if(tell) tell.remove();
    tell=h('div','cheer nocopy',msg); tell.setAttribute('role','status'); document.body.append(tell);
    var me=tell; setTimeout(function(){me.classList.add('out');},4000); setTimeout(function(){me.remove();},4600);
  }
  var HELP=' If you need help, please reach out to your teacher.';
  var OUT='Copying is turned off for this assignment.'+HELP, IN='Pasting is turned off. Type your answer in your own words.'+HELP;
  ['copy','cut'].forEach(function(ev){ document.addEventListener(ev,function(e){stop(e,OUT);},true); });
  ['paste','drop'].forEach(function(ev){ document.addEventListener(ev,function(e){stop(e,IN);},true); });
  document.addEventListener('beforeinput',function(e){ if(/^insertFrom(Paste|Drop|Yank)/.test(e.inputType||'')) stop(e,IN); },true);
  document.addEventListener('dragstart',function(e){ var t=e.target; if(!(t&&t.nodeType===1&&t.getAttribute('draggable')==='true')) stop(e,OUT); },true);
})();

/* ------------------------------------------------------------------ */
/* Render                                                              */
/* ------------------------------------------------------------------ */
function render(){
  Object.keys(AUTO).forEach(function(k){delete AUTO[k];});
  ORDER.length=0;
  var app=$('#app'); app.textContent='';
  Object.keys(W).forEach(function(k){delete W[k];}); Object.keys(R).forEach(function(k){delete R[k];}); Object.keys(P).forEach(function(k){delete P[k];});
  photoUrlsDrop();
  QN=0;
  if(DLG&&DLG.d.open) DLG.d.close();
  TILES.length=0;
  /* video.afterPart: N puts the full video section after part N instead of at the top */
  var vAfter=A.video&&A.video.afterPart||0;
  if(A.video&&!vAfter) app.append(videoSection());
  else if(!A.video&&!BOARD) app.append(startSection());
  if(BOARD) app.append(boardSection());
  else (A.parts||[]).forEach(function(p,i){ app.append(buildPart(p,i+1)); if(vAfter===i+1) app.append(videoSection()); });
  gateSetup(app);
  app.append(finishEl());
  TOTAL_W=Object.keys(W).length+Object.keys(R).length;
  TOTAL_P=Object.keys(P).length;
  TOTAL_A=Object.keys(AUTO).length;
  decorate();
  updateBar();
}

['first','last'].forEach(function(k){
  var el=$('#'+k);
  el.value=S[k]||'';
  el.addEventListener('input',function(){S[k]=el.value;commit();});
});
render();
focusMask();

/* Time on task. Counts time while the student is active:
   - on this page: interacted in the last 3 minutes, or a video is playing;
   - away in another tab: came from this page within the last 10 minutes. */
var lastAct=Date.now(), lastTick=Date.now(), tick=0;
['pointerdown','keydown','input','scroll','wheel','touchstart','mousemove'].forEach(function(ev){
  window.addEventListener(ev,function(){lastAct=Date.now();},{passive:true,capture:true});
});
setInterval(function(){
  var now=Date.now(), dt=Math.min(65,Math.max(0,(now-lastTick)/1000)); lastTick=now;
  var playing=[].some.call(document.querySelectorAll('.vid video'),function(v){return !v.paused&&!v.ended;});
  var idle=now-lastAct;
  var active = playing || (document.visibilityState==='visible' ? idle<180000 : idle<600000);
  if(!active) return;
  S.time=(S.time||0)+dt; tick++;
  if(tick%15===0){save();}
},1000);
document.addEventListener('visibilitychange',function(){ if(document.visibilityState==='hidden') save(); });

window.addEventListener('beforeunload',function(e){
  if(hasProgress()&&!finished){e.preventDefault();e.returnValue='';}
});
})();
