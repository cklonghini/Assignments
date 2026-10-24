/* Shared engine for the Explore assignments. Do not put assignment content here: edit assignment.js instead. */
(function(){
'use strict';
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
  var icon=A2.icon||'<svg viewBox="0 0 64 72" aria-hidden="true" focusable="false"><rect x="6" y="10" width="52" height="52" rx="12" fill="var(--primary)"/><path d="M26 24 L46 36 L26 48 Z" fill="var(--primary-ink)"/></svg>';
  var tracks='';
  (A2.parts||[]).forEach(function(p,i){
    var n=i+1;
    tracks+='<div class="track" id="trk'+n+'"><span class="tl">Part '+n+'</span><div class="tt" role="progressbar" aria-label="Part '+n+' progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><div class="tf"></div></div></div>';
  });
  document.body.insertAdjacentHTML('afterbegin',
    '<div class="wrap"><header class="top"><div class="titlerow">'+icon+'<div><h1 class="display"></h1><p class="course"></p></div></div>'
    +'<div class="namerow"><label for="first">First name</label><input type="text" id="first" autocomplete="given-name" placeholder="First name">'
    +'<label for="last">Last name</label><input type="text" id="last" autocomplete="family-name" placeholder="Last name"></div>'
    +'<div class="ttsrow" id="ttsrow" hidden><span>Use the Listen buttons on this page if you would like to have the content read to you.</span>'
    +'<span class="pair"><label for="ttsVoice">Voice</label><select id="ttsVoice"><option value="">Best voice on this device</option></select></span>'
    +'<span class="pair"><label for="ttsRate">Speed</label><select id="ttsRate"><option value="0.8">Slow</option><option value="0.95">Normal</option><option value="1.15">Fast</option></select></span></div></header>'
    +'<aside class="warn" role="alert" aria-labelledby="warnh"><h2 id="warnh" class="display">Stay on this page until you finish</h2>'
    +'<p><strong>If you close this tab, refresh the page, or leave it for another website, your progress may be lost and you will have to start over.</strong></p>'
    +'<ul><li>Every link on this page opens in a new tab. Keep this tab open and come back to it to enter your answers.</li>'
    +'<li>Do not use your browser’s back button or refresh button.</li>'
    +'<li>When you finish, scroll to the bottom, download your PDF, and upload it to the Canvas assignment.</li></ul>'
    +'<p class="small">This page keeps a backup copy in your browser as you work, but don’t count on it. It disappears if you switch devices, use a private window, or clear your browser data.</p></aside>'
    +'<div class="bar" aria-label="Your progress"><div class="tracks">'+tracks+'</div>'
    +'<div class="statsrow"><span id="sAuto"></span><span id="sWritten"></span><span id="sSaved"></span></div></div>'
    +'<main id="app"></main><noscript><p>This page needs JavaScript. Please open it in a current browser.</p></noscript></div>');
  document.querySelector('h1.display').textContent=A2.title;
  document.querySelector('p.course').textContent=A2.course;
}


var A=window.ASSIGNMENT;
if(!A||!A.video){ document.body.textContent='This page needs an assignment.js file with window.ASSIGNMENT defined.'; return; }
var TITLE=A.title, COURSE=A.course;
injectPage();

/* ------------------------------------------------------------------ */
/* State and saving                                                    */
/* ------------------------------------------------------------------ */
var KEY=A.storageKey||('assignment-'+TITLE), storageOK=true, lastSaved=null, finished=false;
function fresh(){return {tts:0.95,voice:'',name:'',first:'',last:'',time:0,started:new Date().toISOString(),auto:{},written:{},rich:{},mn:[],mnRes:[],vids:{}};}
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
  f.mn=Array.isArray(o.mn)?o.mn.slice(0,20).map(function(x){return String(x==null?'':x);}):[];
  f.mnRes=Array.isArray(o.mnRes)?o.mnRes.slice(0,20):[];
  f.tts=(o.tts===0.8||o.tts===1.15)?o.tts:0.95;
  f.voice=typeof o.voice==='string'?o.voice:'';
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
/* Videos: the full video plus one short clip per part, all from assignment.js */
var VIDS={}, VID_ORDER=[];
VIDS.main={n:A.video.seconds,title:A.video.title,label:'Video: '+A.video.title+' (full video)',src:A.video.src};
VID_ORDER.push('main');
(A.parts||[]).forEach(function(p,pi){
  (p.clips||[]).forEach(function(k){
    var c=(A.clips||{})[k];
    if(!c){ if(window.console) console.error('Unknown clip: '+k); return; }
    VIDS[k]={n:c.seconds,from:c.from,to:c.to,part:pi+1,title:c.title,src:c.src};
    VID_ORDER.push(k);
  });
});
function clipLabel(k){var v=VIDS[k]; return v.label||('Clip (Part '+v.part+'): '+v.title+' ('+fmt(v.from)+' to '+fmt(v.to)+')');}
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
    wrap.append(h('p','vidtitle','Rewatch just this part: '+info.title+' ('+fmt(info.from)+' to '+fmt(info.to)+' in the full video)'),vid,watchEl(v,key));
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
var AUTO={}, ORDER=[], TOTAL_A=0, TOTAL_W=0;

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */
var W={}, R={};

/* ------------------------------------------------------------------ */
/* Scoring and progress                                                */
/* ------------------------------------------------------------------ */
/* highlighted-text helpers: a response is a list of [text, highlighted] pieces */
function segsPlain(segs){return (segs||[]).map(function(s){return s[0];}).join('');}
function segsText(segs){
  return (segs||[]).map(function(s){
    if(!s[1]) return s[0];
    var m=s[0].match(/^(\s*)([\s\S]*?)(\s*)$/);
    return m[2]?m[1]+'[['+m[2]+']]'+m[3]:s[0];
  }).join('');
}
function segsHlWords(segs){
  return (segs||[]).reduce(function(n,s){return n+(s[1]?words(s[0]):0);},0);
}
function isWrittenDone(id){var st=S.written[id]; return !!st&&(st.text||'').trim().length>=W[id].min;}
function isRichDone(id){var st=S.rich[id]; return !!st&&segsPlain(st.segs).trim().length>=R[id].min;}
function score(){
  var a=0,w=0;
  Object.keys(AUTO).forEach(function(id){var r=S.auto[id]; if(r&&r.ok)a++;});
  Object.keys(W).forEach(function(id){if(isWrittenDone(id))w++;});
  Object.keys(R).forEach(function(id){if(isRichDone(id))w++;});
  return {a:a,w:w};
}
function hasProgress(){
  if(Object.keys(S.auto).some(function(k){return S.auto[k]&&S.auto[k].v;})) return true;
  if(Object.keys(S.written).some(function(k){return S.written[k]&&S.written[k].text;})) return true;
  if(Object.keys(S.rich).some(function(k){return S.rich[k]&&segsPlain(S.rich[k].segs).trim();})) return true;
  return (S.mn||[]).some(function(x){return x;});
}
function updateBar(){
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
  var sc=score();
  $('#sAuto').innerHTML='Auto-checked: <strong>'+sc.a+' / '+TOTAL_A+'</strong> correct';
  $('#sWritten').innerHTML='Written: <strong>'+sc.w+' / '+TOTAL_W+'</strong> done';
  var sv=$('#sSaved');
  if(!storageOK) sv.textContent='This browser can’t keep a backup. Stay on this page.';
  else if(lastSaved) sv.textContent='Backup saved at '+lastSaved.toLocaleTimeString([], {hour:'numeric',minute:'2-digit'});
}
function commit(){save();updateBar();}

/* ------------------------------------------------------------------ */
/* Builders: auto-checked dropdown                                     */
/* ------------------------------------------------------------------ */
function autoSelect(id,sum,options,answer,o){
  o=o||{};
  AUTO[id]={sum:sum};
  ORDER.push({kind:'auto',id:id,label:sum,q:CURQ,sub:o.label||''});
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
    return 'Not yet. Tip: '+(o.hint||'Look back at the reading and try again.');
  }
  function paint(){
    var r=S.auto[id];
    sel.value=(r&&r.v)?r.v:'';
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
      var on=!!r&&r.v===o.t; o.inp.checked=on;
      if(on) o.lab.dataset.s=r.ok?'ok':'bad'; else o.lab.removeAttribute('data-s');
    });
    if(!r||!r.v){wrap.dataset.s='idle'; msg.textContent=''; return;}
    wrap.dataset.s=r.ok?'ok':'bad';
    msg.textContent='';
    if(r.ok) msg.append('Correct. ',itxt(explain));
    else msg.append('Not quite. Tip: ',itxt(tip||'Look back at the reading and try another choice.'));
  }
  paint();
  return wrap;
}

/* typed answer with a Check button */
function typedCheck(id,sum,expected,okMsg,badMsg,aria){
  AUTO[id]={sum:sum};
  ORDER.push({kind:'auto',id:id,label:sum,q:CURQ,sub:''});
  var wrap=h('div','ctl'); mark(wrap); wrap.dataset.s='idle';
  var row=h('div','row');
  var inp=h('input'); inp.type='text'; inp.id='f-'+id; inp.autocomplete='off'; inp.spellcheck=false; inp.autocapitalize='off';
  inp.setAttribute('aria-label',aria); inp.setAttribute('aria-describedby','m-'+id);
  var btn=h('button','btn','Check'); btn.type='button';
  var st=h('span','st'); st.setAttribute('aria-hidden','true');
  row.append(inp,btn,st);
  var msg=h('p','msg'); msg.id='m-'+id; msg.setAttribute('aria-live','polite');
  wrap.append(row,msg);
  function paint(){
    var r=S.auto[id];
    inp.value=r?r.v:'';
    if(!r||!r.v){wrap.dataset.s='idle';st.textContent='';msg.textContent='';return;}
    wrap.dataset.s=r.ok?'ok':'bad';
    st.textContent=r.ok?'✓':'✗';
    msg.textContent=r.ok?okMsg:(typeof badMsg==='function'?badMsg(r.v):badMsg);
  }
  function check(){
    var v=inp.value.trim().replace(/\s+/g,' '), prev=S.auto[id]||{miss:0};
    if(!v) return;
    var ok=(v===expected);
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
/* Builders: written answers                                           */
/* ------------------------------------------------------------------ */
function writtenField(id,placeholder){
  var c=W[id];
  ORDER.push({kind:'written',id:id,q:CURQ,sub:''});
  var st=S.written[id]||(S.written[id]={text:''});
  var wrap=h('div','sub'); mark(wrap); wrap.dataset.s='idle';
  var ta=h('textarea'); ta.id='f-'+id; ta.rows=4; ta.value=st.text||'';
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

/* written answer with a yellow evidence highlighter */
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
    return !!b&&!/^(transparent|initial|inherit|unset|rgba\(0,\s*0,\s*0,\s*0\))$/i.test(b);
  }
  function walk(node,hl){
    if(node.nodeType===3){push(node.nodeValue.replace(/ /g,' '),hl); return;}
    if(node.nodeType!==1) return;
    var tag=node.tagName;
    if(tag==='BR'){push('\n',false); return;}
    var block=/^(DIV|P|LI)$/.test(tag);
    if(block&&segs.length&&!endsNL()) push('\n',false);
    var h2=hl||isHl(node);
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
      if(s[1]){var sp=document.createElement('span'); sp.style.backgroundColor='rgb(255, 255, 0)'; sp.textContent=p; ed.append(sp);}
      else ed.append(document.createTextNode(p));
    });
  });
}
function richField(id){
  var c=R[id];
  ORDER.push({kind:'rich',id:id,q:CURQ,sub:''});
  var st=S.rich[id]||(S.rich[id]={segs:[]});
  var wrap=h('div','sub'); mark(wrap); wrap.dataset.s='idle';
  var bar=h('div','evbar'); bar.setAttribute('role','group'); bar.setAttribute('aria-label','Highlight tools');
  var on=h('button','btn hl','Highlight selected text yellow'); on.type='button';
  var off=h('button','btn ghost','Remove highlight'); off.type='button';
  var bmsg=h('span','msg'); bmsg.setAttribute('aria-live','polite');
  bar.append(on,off,bmsg);
  var ed=h('div','ev'); ed.id='f-'+id; ed.contentEditable='true'; ed.setAttribute('role','textbox'); ed.setAttribute('aria-multiline','true');
  ed.setAttribute('aria-label','Your written response'); ed.setAttribute('data-placeholder','Begin your response here...');
  fillEditor(ed,st.segs);
  var cnt=h('p','words'); var msg=h('p','msg'); msg.setAttribute('aria-live','polite');
  wrap.append(bar,ed,cnt,msg);
  function sync(){
    var plain=segsPlain(st.segs), n=words(plain), hl=segsHlWords(st.segs), enough=plain.trim().length>=c.min;
    cnt.textContent=n+(n===1?' word':' words')+', '+hl+' highlighted';
    msg.textContent=enough?(hl?'Saved. Your teacher grades this one.':'Saved. Remember to highlight your evidence in yellow.'):'Write at least a couple of sentences.';
    wrap.dataset.s=enough?'ok':'idle';
  }
  function readEd(){
    st.segs=extract(ed);
    if(!st.segs.length&&ed.innerHTML) ed.innerHTML='';
    sync(); commit();
  }
  ed.addEventListener('input',readEd);
  ed.addEventListener('paste',function(e){
    e.preventDefault();
    var t=(e.clipboardData||window.clipboardData).getData('text/plain');
    document.execCommand('insertText',false,t);
  });
  var saved=null;
  document.addEventListener('selectionchange',function(){
    var sel=window.getSelection();
    if(!sel||!sel.rangeCount) return;
    var r=sel.getRangeAt(0);
    if(ed.contains(r.commonAncestorContainer)) saved=r.cloneRange();
  });
  [[on,true],[off,false]].forEach(function(p){
    var btn=p[0], yes=p[1];
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
      try{ok=document.execCommand('hiliteColor',false,yes?'#ffff00':'transparent');}catch(e){}
      if(!ok){try{document.execCommand('backColor',false,yes?'#ffff00':'transparent');}catch(e){}}
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
/* Looks for key ideas with simple word matching. It never shows the answer and is not graded. */
function sentenceCount(t){return String(t||'').split(/[.!?]+/).filter(function(x){return words(x)>=3;}).length;}
function ideaCheck(getText,getHl,items){
  var wrap=h('div','ideas');
  wrap.append(h('p','inote','Want a quick check before you move on? This looks for key ideas in your answer. It is not your grade, and it can miss good ideas written in different words. Your teacher reads your full response.'));
  var btn=h('button','btn','Check my ideas'); btn.type='button';
  var note=h('p','msg'); note.setAttribute('aria-live','polite');
  var list=h('ul');
  wrap.append(btn,note,list);
  btn.addEventListener('click',function(){
    var t=String(getText()||''), low=t.toLowerCase(), hl=getHl?getHl():0;
    list.textContent='';
    if(words(t)<5){ note.removeAttribute('data-s'); note.textContent='Write your answer first, then check it.'; return; }
    var found=0;
    items.forEach(function(it){
      var ok=it.test?it.test(t,hl):it.re.test(low);
      if(ok) found++;
      var li=h('li'); li.dataset.s=ok?'ok':'todo';
      if(ok) li.append('✓ '+it.done);
      else { li.append('○ '+it.q+' '); var b=h('b',null,'Tip: '); li.append(b,it.tip); }
      list.append(li);
    });
    note.dataset.s=(found===items.length)?'ok':'';
    note.textContent=(found===items.length)
      ? 'Nice work. You covered all '+items.length+' ideas. Read your answer one more time to make sure it is clear.'
      : 'I found '+found+' of '+items.length+' ideas. Add what is missing, then check again.';
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
  s.append(h('h2','display','Part '+n+': '+title));
  return s;
}
function watchFor(markup){return hh('div','wfor','<b>Watch for:</b> '+markup);}
function watchList(intro,items){
  return hh('div','wfor','<b>Watch for:</b> '+intro+'<ul class="wlist">'+items.map(function(i){return '<li><b>'+i[0]+'</b> '+i[1]+'</li>';}).join('')+'</ul>');
}
function learn(markup){return hh('div','learn',markup);}

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
  (A.parts||[]).forEach(function(p){(p.questions||[]).forEach(function(q){out.push(q);});});
  return out;
}

function videoSection(){
  var V=A.video, qs=allQuestions();
  var nHl=qs.filter(function(q){return q.type==='highlight';}).length;
  var nW=qs.filter(function(q){return q.type==='written'||q.type==='highlight';}).length;
  var hasClips=(A.parts||[]).some(function(p){return (p.clips||[]).length;});
  var s=h('section','task vidsec'); s.id='video';
  s.append(h('h2','display',V.heading||'Watch the video'));
  s.append(h('p','intro',V.intro||('Please watch the video '+V.title+' and then respond to the prompts below. Remember, Eagles! Quality matters more than quantity, but don’t leave out anything you think is worth noting.')));
  s.append(videoBlock('main'));
  var after=V.after;
  if(after==null){
    after='Work from top to bottom. Each part gives you '+(hasClips?'a short clip of just that part of the video, ':'')+'a short reading, and then lets you practice and check your work.';
    if(nW){
      after+=' You will also answer '+(NUMWORD[nW]||nW)+' written question'+(nW===1?'':'s');
      if(nHl===1&&nW===1) after+=', and you will highlight your evidence in yellow';
      else if(nHl===1) after+=', and in one of them you will highlight your evidence in yellow';
      else if(nHl>1) after+=', and in '+(nHl===nW?'all of them':'some of them')+' you will highlight your evidence in yellow';
      after+='.';
    }
    if(hasClips){
      var first=VIDS[VID_ORDER[1]];
      if(first) after+=' The times on each clip (like '+fmt(first.from)+' to '+fmt(first.to)+') are times in the full video above.';
    }
  }
  s.append(h('p','intro',after));
  return s;
}

/* turns the ideas written in assignment.js into checks that ideaCheck can run */
function ideasFrom(list){
  return (list||[]).map(function(it){
    var o={done:it.done,q:it.q,tip:it.tip};
    if(it.re){ o.re=it.re; }
    else if(it.sentences){ var k=it.sentences; o.test=function(t){return sentenceCount(t)>=k;}; }
    else if(it.highlight){ o.test=function(t,hl){return hl>0;}; }
    else { o.test=function(){return false;}; }
    return o;
  });
}

function buildQuestion(q,s){
  var num=++QN, id='q'+num, o=qEl(num,q.text), t=q.type;
  if(t==='selects'){
    if(q.note) o.body.append(hh('div','ends','<span>'+q.note+'</span>'));
    var grid=h('div','sigs');
    q.items.forEach(function(it,i){
      var sel=autoSelect(id+'_'+i,'Q'+num+' '+plain(it.label).replace(/:/g,''),it.options||q.options,it.answer,{label:it.label,hint:it.hint||q.hint});
      if(it.sci||q.sci) sel.classList.add('sci');
      grid.append(sel);
    });
    o.body.append(grid);
  } else if(t==='choice'){
    o.body.append(choiceQ(id,'Q'+num,q.options,q.answer,q.explain,q.tip));
  } else if(t==='typed'){
    var exp=q.expected;
    o.body.append(typedCheck(id,'Q'+num+' typed answer',exp,q.okMsg||'Correct.',function(v){
      if(q.caseTip&&String(v).toLowerCase()===String(exp).toLowerCase()) return 'Not yet. Tip: '+q.caseTip;
      return 'Not yet. Tip: '+(q.tip||'Look back at the reading and try again.');
    },q.aria||'Your answer'));
  } else if(t==='mnemonic'){
    o.body.append(mnWidget(q.words));
  } else if(t==='written'){
    W[id]={min:q.min||40};
    o.body.append(writtenField(id,q.placeholder));
    if(q.ideas&&q.ideas.length) o.body.append(ideaCheck(function(){return (S.written[id]||{}).text;},null,ideasFrom(q.ideas)));
  } else if(t==='highlight'){
    R[id]={min:q.min||40};
    o.body.append(
      h('p','intro','Respond to the question in the space below. Remember to answer the question fully.'),
      hh('p','intro','Then highlight parts of your response using this color: <span class="chip">Using evidence to support your view</span> (please highlight your use of evidence in yellow). Select your words, then press the yellow button.'),
      richField(id));
    if(q.ideas&&q.ideas.length) o.body.append(ideaCheck(function(){return segsPlain((S.rich[id]||{}).segs);},function(){return segsHlWords((S.rich[id]||{}).segs);},ideasFrom(q.ideas)));
  } else {
    o.body.append(h('p','msg','Unknown question type: '+t));
  }
  s.append(o.q);
}

function buildPart(p,n){
  var s=part(n,p.title);
  if(p.intro) s.append(h('p','intro',p.intro));
  (p.clips||[]).forEach(function(k){ if(VIDS[k]) s.append(videoBlock(k)); });
  if(p.read) s.append(learn(p.read));
  if(p.tableHtml){ var tw=h('div','tablewrap'); tw.innerHTML=p.tableHtml; s.append(tw); }
  (p.questions||[]).forEach(function(q){ buildQuestion(q,s); });
  return s;
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
    if(!last||last.q!==q){ last={q:q,num:q.num,text:q.text,items:[]}; groups.push(last); }
    var it={sub:o.sub||'',resp:[],tag:'',rich:null};
    if(o.kind==='auto'){
      var r=S.auto[o.id];
      if(o.id==='mn'){
        var sv=(S.mn||[]).map(function(x){return (x||'').trim();}).join(' ').trim();
        it.resp=[sv||'(no answer)'];
        if(r&&r.v) it.tag=(r.ok?'correct':'incorrect')+(r.miss?' • '+r.miss+(r.miss===1?' wrong try':' wrong tries'):'');
      } else if(!r||!r.v){it.resp=['(no answer)'];}
      else{ it.resp=[plain(r.v)]; it.tag=(r.ok?'correct':'incorrect')+(r.miss?' • '+r.miss+(r.miss===1?' wrong try':' wrong tries'):''); }
    } else if(o.kind==='rich'){
      var st=S.rich[o.id]||{segs:[]}, ptxt=segsPlain(st.segs).trim();
      it.resp=[ptxt||'(no answer)'];
      if(ptxt){ it.rich=st.segs; it.tag=words(ptxt)+' words, '+segsHlWords(st.segs)+' highlighted as evidence'; }
    } else {
      var w=S.written[o.id]||{}, t=(w.text||'').trim();
      it.resp=[t||'(no answer)'];
    }
    last.items.push(it);
  });
  return groups;
}
function summaryParts(){
  var sc=score();
  var res=videoRows().concat([
    ['Auto-checked items',sc.a+' / '+TOTAL_A+' correct'],
    ['Written responses',sc.w+' / '+TOTAL_W+' completed']
  ]);
  return {date:fmtDate(new Date()),res:res,groups:answerGroups()};
}
function buildSummary(){
  var p=summaryParts();
  var L=[TITLE,COURSE,fullName()||'(name not entered)','Date completed: '+p.date,'','Results '+CODE_SYM[timeCode()]];
  p.res.forEach(function(r){L.push(r[0]+': '+r[1]);});
  L.push('(Text inside [[double brackets]] was highlighted in yellow as evidence.)');
  L.push('');
  p.groups.forEach(function(g){
    L.push((g.num!==''?g.num+'. ':'')+plain(g.text));
    g.items.forEach(function(it){
      var pre=it.sub?'   '+plain(it.sub)+': ':'   ';
      if(it.rich){ if(it.sub) L.push('   '+plain(it.sub)+':'); String(segsText(it.rich)).split('\n').forEach(function(x){L.push('      '+x);}); if(it.tag) L.push('      ['+it.tag+']'); }
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
    .replace(/[←-⇿]/g,'->').replace(/[^\x09\x0A\x0D\x20-\x7E¡-ÿ]/g,'');
}
/* Heading lines in Cabin Bold, drawn to an image so the PDF matches the font exactly */
async function headingPng(lines,pt){
  try{ await Promise.race([document.fonts.load('700 '+pt+'px Cabin'),new Promise(function(r){setTimeout(r,2500);})]); }catch(e){}
  var scale=4, lh=pt*1.3, c=document.createElement('canvas'), x=c.getContext('2d');
  var font='700 '+pt*scale+'px Cabin, "Helvetica Neue", Arial, sans-serif';
  x.font=font;
  var w=Math.ceil(Math.max.apply(null,lines.map(function(t){return x.measureText(t).width;}))+4*scale);
  c.width=w; c.height=Math.ceil(lh*lines.length*scale+2*scale);
  x=c.getContext('2d'); x.font=font; x.fillStyle='#16213a'; x.textBaseline='alphabetic';
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
  var INK=L.rgb(22/255,33/255,58/255), MUTED=L.rgb(82/255,96/255,122/255), TEAL=L.rgb(11/255,95/255,122/255), LINE=L.rgb(211/255,219/255,232/255), RESP=L.rgb(10/255,80/255,105/255), YEL=L.rgb(1,0.93,0);
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
  /* a response with yellow highlighter marks behind the evidence words */
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
          cur.runs.push({w:m[2],hl:!!s[1],tw:rw}); cur.tw+=rw;
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
            if(r.hl) page.drawRectangle({x:rx-1,y:base-2.4,width:r.tw+2,height:size+3.2,color:YEL});
            rx+=r.tw;
          });
          var nx=ln[i+1];
          if(nx&&tk.runs[tk.runs.length-1].hl&&nx.runs[0].hl) page.drawRectangle({x:x+tk.tw-1,y:base-2.4,width:sp+2,height:size+3.2,color:YEL});
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
  y=M+hd.h+6;
  text('Date completed: '+p.date,11,F,0,MUTED);
  y+=6; rule(TEAL,2); y+=14;

  room(20);
  var ry=y;
  text('Results',13,FB);
  drawSymbol(page,L,timeCode(),M+FB.widthOfTextAtSize('Results',13)+8,PH-ry-13*0.64,11,INK);
  y+=2;
  p.res.forEach(function(r){ text(r[0]+': '+r[1],10.5,F); y+=1; });
  y+=8; rule(LINE,1); y+=14;

  text('Questions and answers',13,FB); y+=4;
  p.groups.forEach(function(g){
    y+=6;
    room(40);
    mixed((g.num!==''?g.num+'. ':'')+g.text,10.5,FB,FBI,0);
    g.items.forEach(function(it){
      y+=2;
      var ind=16;
      if(it.sub){ mixed(it.sub,10,F,FI,ind,MUTED); ind=28; }
      if(it.rich) richText(it.rich,10.5,FI,ind);
      else it.resp.forEach(function(r){ text(r,10.5,FI,ind,RESP); });
      if(it.tag) text('('+it.tag+')',8.5,F,ind,MUTED);
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
  s.append(h('p','intro','Your PDF shows your name, the date you finished, how much of the video you watched, and all of your answers, including the yellow highlights on your evidence.'));
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
  txtd.append(h('p','intro','Only use this if the PDF won’t download. Copy the text, then paste it into the Text Entry box on the Canvas assignment. Your highlighted evidence will be marked with [[double brackets]].'));
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
  det.append(h('p','intro','Copy your progress code and keep it somewhere safe, such as a note or email to yourself. If you lose your place, paste the code below to restore your answers.'));
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
    var tmp=h('textarea'); tmp.value=encodeState(); tmp.style.position='fixed'; tmp.style.opacity='0'; document.body.append(tmp);
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
    var f1=S.first, l1=S.last; S=fresh(); S.first=f1; S.last=l1; finished=false; save(); render();
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
var MALE=/\b(david|mark|guy|alex|daniel|fred|tom|ryan|eric|davis|james|aaron|gordon|rishi|arthur|oliver|george|roger|steffan|christopher|brian|andrew|thomas|jason|tony|liam|noah|ralph|junior|lee|reed|rocko|grandpa|eddy)\b/i;
var FEMALE=/\b(aria|jenny|ava|allison|samantha|susan|zira|michelle|emma|ana|jane|sara|joanna|salli|kendra|kimberly|ivy|karen|moira|tessa|serena|kate|stephanie|nicky|libby|sonia|amy|olivia|natasha|clara|female|catherine|victoria|zoe|nora|siri)\b/i;
var NOVELTY=/(bad news|good news|bahh|bells|boing|bubbles|cellos|deranged|hysterical|jester|organ|superstar|trinoids|whisper|wobble|zarvox|albert|kathy|princess|agnes|bruce|espeak|compact)/i;
function voiceScore(v){
  var n=v.name||'', sc=0;
  if(!/^en(-|_|$)/i.test(v.lang||'')) return -1000;
  if(NOVELTY.test(n)) sc-=300;
  if(/natural|neural/i.test(n)) sc+=200;
  if(/premium|enhanced/i.test(n)) sc+=140;
  if(/google/i.test(n)) sc+=90;
  if(/microsoft/i.test(n)) sc+=40;
  if(v.localService===false) sc+=10;
  if(FEMALE.test(n)) sc+=70;
  if(MALE.test(n)) sc-=120;
  if(/en[-_]US/i.test(v.lang)) sc+=25; else if(/en[-_]GB/i.test(v.lang)) sc+=10;
  return sc;
}
function englishVoices(){
  var vs=[]; try{vs=window.speechSynthesis.getVoices()||[];}catch(e){}
  return vs.filter(function(v){return voiceScore(v)>-500;}).sort(function(a,b){return voiceScore(b)-voiceScore(a);});
}
function pickVoice(){
  var vs=englishVoices();
  if(S.voice){ for(var i=0;i<vs.length;i++){ if(vs[i].voiceURI===S.voice) return vs[i]; } }
  return vs[0]||null;
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
    .replace(/\[\[|\]\]/g,'').replace(/\u2026/g,'.').replace(/\s[-\u2013\u2014]\s/g,', ')
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
  app.querySelectorAll('.wfor,.learn').forEach(function(el){
    el.prepend(listenBtn(function(){return el.innerText;}));
  });
  /* questions: the question and its answer choices */
  app.querySelectorAll('.q').forEach(function(q){
    var hd=q.querySelector('.qhead');
    hd.append(listenBtn(function(){
      var t=q.querySelector('.qtext').innerText;
      var opts=[].map.call(q.querySelectorAll('.opt'),function(o){return o.innerText;});
      if(opts.length) t+=(/[.?!:]\s*$/.test(t)?' ':'. ')+'The choices are: '+opts.join('. ')+'.';
      return t;
    }));
  });
  /* video and finish instructions */
  [['#video','p.intro'],['#finish','ol,p.intro']].forEach(function(pair){
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
  var row=$('#ttsrow'), sel=$('#ttsRate'), vsel=$('#ttsVoice');
  row.hidden=false; sel.value=String(S.tts||0.95);
  sel.addEventListener('change',function(){S.tts=parseFloat(sel.value)||0.95; commit(); ttsStop();});
  function fillVoices(){
    var vs=englishVoices().slice(0,12), best=vs[0];
    vsel.textContent='';
    vsel.append(new Option('Best voice on this device'+(best?' ('+best.name.replace(/^Microsoft\s+/,'').replace(/\s*-\s*English.*$/,'')+')':''),''));
    vs.forEach(function(v){vsel.append(new Option(v.name.replace(/^Microsoft\s+/,'')+' ('+v.lang+')',v.voiceURI));});
    vsel.value=S.voice&&vs.some(function(v){return v.voiceURI===S.voice;})?S.voice:'';
  }
  fillVoices();
  try{window.speechSynthesis.addEventListener('voiceschanged',fillVoices);}catch(e){window.speechSynthesis.onvoiceschanged=fillVoices;}
  vsel.addEventListener('change',function(){S.voice=vsel.value; commit(); ttsStop();});
  window.addEventListener('beforeunload',ttsStop);
})();

/* ------------------------------------------------------------------ */
/* Render                                                              */
/* ------------------------------------------------------------------ */
function render(){
  Object.keys(AUTO).forEach(function(k){delete AUTO[k];});
  ORDER.length=0;
  var app=$('#app'); app.textContent='';
  Object.keys(W).forEach(function(k){delete W[k];}); Object.keys(R).forEach(function(k){delete R[k];});
  QN=0;
  app.append(videoSection());
  (A.parts||[]).forEach(function(p,i){app.append(buildPart(p,i+1));});
  app.append(finishEl());
  TOTAL_W=Object.keys(W).length+Object.keys(R).length;
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
