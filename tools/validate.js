#!/usr/bin/env node
/*
  Checks an assignment for mistakes before you publish it. Needs only Node.

    node tools/validate.js                     checks every assignment
    node tools/validate.js explore-cell-membrane   checks one

  Errors must be fixed. Warnings are worth a look.
*/
const fs = require('fs'), path = require('path'), vm = require('vm');
const root = path.resolve(__dirname, '..');
const base = path.join(root, 'assignments');
const only = process.argv[2];
const dirs = fs.readdirSync(base).filter(d => !d.startsWith('_') && fs.existsSync(path.join(base, d, 'assignment.js')) && (!only || d === only));
if (!dirs.length) { console.error('No assignment found' + (only ? ' named ' + only : '')); process.exit(1); }

const keys = {};
let totalErrors = 0;

function load(dir) {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(path.join(base, dir, 'assignment.js'), 'utf8'), sandbox, { filename: dir + '/assignment.js' });
  return sandbox.window.ASSIGNMENT;
}
const plain = s => String(s).replace(/\*/g, '').toLowerCase();
/* answers that say nothing about any topic; a science idea that matches one of these is too loose */
const FLUFF = [
  'I think this is important because it helps the body work better.',
  'The video showed a lot of things about this, and I learned more about it.',
  'In the video they talked about how it works and what happens in the cell.',
  'It is different, and it changes things so it can do its job.',
  'I don\'t know. I watched the video and it was really interesting and cool.',
  'My teacher said to write two sentences, so here is my answer.',
  'She looked at it, and it was the same as before. It took some time.',
  'It was easy to see and hard to understand at first, but I still wonder about it.'
];

for (const dir of dirs) {
  const errors = [], warnings = [];
  const E = m => errors.push(m), W = m => warnings.push(m);
  let A;
  try { A = load(dir); } catch (e) { E('assignment.js has a typing error: ' + e.message); }
  if (A) {
    ['title', 'course', 'storageKey'].forEach(k => { if (!A[k] || typeof A[k] !== 'string') E('Missing ' + k); });
    if (A.storageKey) {
      if (keys[A.storageKey]) E('storageKey "' + A.storageKey + '" is also used by ' + keys[A.storageKey] + '. Each assignment needs its own.');
      keys[A.storageKey] = dir;
    }
    const exists = f => fs.existsSync(path.join(base, dir, f));
    const checkImage = (im, where) => {
      if (!im || !im.src) { E(where + ': an image needs src'); return; }
      if (!exists(im.src)) E(where + ': image file not found: ' + im.src);
      if (!im.alt) W(where + ': image ' + im.src + ' has no alt text (screen readers read it)');
    };
    const board = A.board;
    if (!A.video) {
      if (!board && !A.start && !(A.parts || []).some(p => (p.images || []).length)) E('Missing video (an assignment with no video needs images in its parts, or a start box)');
    } else if (!A.video.src) E('Missing video.src');
    else {
      if (!exists(A.video.src)) E('Video file not found: ' + A.video.src);
      if (!exists(A.video.src.replace(/\.mp4$/i, '.vtt'))) W('No captions file next to ' + A.video.src + ' (expected a .vtt file)');
      if (!(A.video.seconds > 0)) E('video.seconds must be a number of seconds');
      if (A.video.afterPart != null && !(Number.isInteger(A.video.afterPart) && A.video.afterPart >= 1 && A.video.afterPart <= (A.parts || []).length)) E('video.afterPart must be a part number');
    }
    const clips = A.clips || {}, used = new Set();
    Object.keys(clips).forEach(k => {
      const c = clips[k];
      if (!exists(c.src)) E('Clip file not found: ' + c.src);
      if (!exists(String(c.src).replace(/\.mp4$/i, '.vtt'))) W('No captions file for clip ' + k);
      if (!(c.to > c.from)) E('Clip ' + k + ': "to" must be larger than "from"');
      if (!(c.seconds > 0)) E('Clip ' + k + ': seconds must be a number');
      if (!c.title || c.title === 'TODO') E('Clip ' + k + ' needs a title');
      if (A.video && !c.of && c.to > A.video.seconds + 2) E('Clip ' + k + ' ends after the full video does');
    });
    /* a game board has categories of tiles (and maybe a final tile) instead of parts */
    let groups;
    if (board) {
      const cats = board.categories || [];
      if (!cats.length) E('The board needs at least one category');
      const lens = new Set(cats.map(c => (c.tiles || []).length));
      if (lens.size > 1) W('Board categories have different numbers of tiles, so the board will not be a full rectangle');
      if (!(board.tries >= 1)) W('board.tries is not set, so students get 3 tries');
      groups = cats.map((c, ci) => ({ where: 'Category ' + (ci + 1) + (c.title ? ' (' + c.title + ')' : ''), title: c.title, questions: c.tiles || [] }));
      if (board.final) groups.push({ where: 'Final round', title: 'Final', questions: [board.final] });
    } else {
      if (!Array.isArray(A.parts) || !A.parts.length) E('The assignment needs at least one part');
      groups = (A.parts || []).map((p, pi) => ({ where: 'Part ' + (pi + 1) + (p.title ? ' (' + p.title + ')' : ''), title: p.title, clips: p.clips, questions: p.questions || [] }));
    }
    let qn = 0, nAuto = 0, nWritten = 0, nPhoto = 0;
    groups.forEach(p => {
      const where = p.where;
      if (!p.title) E(where + ' needs a title');
      (p.clips || []).forEach(k => { if (!clips[k]) E(where + ' uses a clip that is not defined: ' + k); used.add(k); });
      (p.images || []).forEach(im => checkImage(im, where));
      if (!(p.questions || []).length) W(where + ' has no questions');
      (p.questions || []).forEach(q => {
        qn++;
        const w = 'Q' + qn;
        if (!q.text) E(w + ' needs text');
        if (q.img) {
          if (!q.img.src || !exists(q.img.src)) E(w + ' picture not found: ' + (q.img.src || '(no src)'));
          if (!q.img.alt) E(w + ' picture needs alt text (a description for students who cannot see it)');
        }
        /* on a game board tips are optional: a wrong answer can just say "not quite" and count the tries */
        const needTip = (tip, answers) => {
          if (!tip) { if (!board) E(w + ' needs a tip'); return; }
          answers.forEach(a => { if (a && String(a).length > 3 && plain(tip).includes(plain(a))) W(w + ': the tip contains the answer "' + plain(a) + '". Tips should point, not tell.'); });
        };
        if (q.at != null) {
          const ck = (p.clips || [])[0], c = ck && clips[ck];
          if (!c) E(w + ': "at" (a question inside the video) needs a clip in its part');
          else if (!(q.at > 0 && q.at < c.seconds)) E(w + ': "at" must be between 0 and the length of clip ' + ck + ' (' + c.seconds + ' seconds)');
          if (!['choice', 'multi', 'selects', 'typed', 'order'].includes(q.type)) E(w + ': only choice, multi, selects, typed, and order questions can go inside a video');
        }
        switch (q.type) {
          case 'selects':
            if (!(q.items || []).length) E(w + ' has no items');
            (q.items || []).forEach((it, i) => {
              const opts = it.options || q.options || [];
              if (!opts.length) E(w + ' item ' + (i + 1) + ' has no options');
              if (!opts.includes(it.answer)) E(w + ' item ' + (i + 1) + ': the answer "' + it.answer + '" is not one of the options');
              needTip(it.hint || q.hint, [it.answer]);
              nAuto++;
            });
            break;
          case 'choice':
            if (!Array.isArray(q.options) || q.options.length < 2) E(w + ' needs at least 2 options');
            else if (!(q.answer >= 0 && q.answer < q.options.length)) E(w + ': answer must be the number of the correct option, starting at 0');
            if (!q.explain && !board) E(w + ' needs an explanation (shown after a right answer)');
            needTip(q.tip, [q.options && q.options[q.answer]]);
            nAuto++;
            break;
          case 'typed':
            if (!q.expected && !(q.accept || []).length && !q.between) E(w + ' needs expected (or an accept list, or between)');
            needTip(q.tip, [q.expected].concat(q.accept || []));
            nAuto++;
            break;
          case 'mnemonic':
            if (!Array.isArray(q.words) || q.words.length < 2) E(w + ' needs words');
            nAuto++;
            break;
          case 'speak':
            if (!(q.cards || []).length) E(w + ' has no cards');
            (q.cards || []).forEach((c, i) => {
              const isRe = r => Object.prototype.toString.call(r) === '[object RegExp]';
              if (!c.term || !c.def) E(w + ' card ' + (i + 1) + ' needs term and def');
              if (c.img && (!c.img.src || !exists(c.img.src))) E(w + ' card ' + (i + 1) + ' picture not found: ' + (c.img.src || '(no src)'));
              if (c.img && !c.img.alt) E(w + ' card ' + (i + 1) + ' picture needs alt text');
              if (!isRe(c.say)) E(w + ' card ' + (i + 1) + ' needs say (a pattern for the word)');
              else if (!c.say.test(plain(c.term))) W(w + ' card ' + (i + 1) + ': the say pattern does not match its own word "' + c.term + '"');
              if (!Array.isArray(c.keys) || !c.keys.every(isRe)) E(w + ' card ' + (i + 1) + ' needs keys (a list of patterns)');
              else if (!c.keys.every(r => r.test(plain(c.def)))) W(w + ' card ' + (i + 1) + ' (' + c.term + '): a key pattern does not match the card\'s own definition');
              nAuto++;
            });
            break;
          case 'label':
            if (!q.image || !q.image.src) E(w + ' needs image.src');
            else if (!exists(q.image.src)) E(w + ': image not found: ' + q.image.src);
            if (!q.viewBox) E(w + ' needs viewBox');
            if (!(q.spots || []).length) E(w + ' has no spots');
            (q.spots || []).forEach((sp, i) => {
              if (!sp.label || typeof sp.x !== 'number' || typeof sp.y !== 'number') E(w + ' spot ' + (i + 1) + ' needs label, x and y');
              needTip(sp.tip, [sp.label]);
              nAuto++;
            });
            if (new Set((q.spots || []).map(sp => sp.label)).size !== (q.spots || []).length) E(w + ': two spots have the same label');
            break;
          case 'order':
            if (!Array.isArray(q.items) || q.items.length < 3) E(w + ' needs at least 3 items');
            if (!q.tip) E(w + ' needs a tip');
            if (!q.explain) E(w + ' needs an explanation');
            nAuto++;
            break;
          case 'bloodlab':
            if (!(q.patients || []).length) E(w + ' has no patients');
            (q.patients || []).forEach((pt, i) => {
              if (!pt.name || !/^(A|B|AB|O)[+−]$/.test(pt.type || '')) E(w + ' patient ' + (i + 1) + ' needs a name and a type such as A+ or O\u2212 (use the real minus sign \u2212)');
              nAuto++;
            });
            break;
          case 'multi':
            if (!Array.isArray(q.options) || q.options.length < 2) E(w + ' needs at least 2 options');
            if (!Array.isArray(q.answers) || !q.answers.length) E(w + ' needs answers');
            else q.answers.forEach(a => { if (!(q.options || []).includes(a)) E(w + ': the answer "' + a + '" is not one of the options'); });
            if (!q.explain) E(w + ' needs an explanation (shown after a right answer)');
            if (!q.tip) E(w + ' needs a tip');
            nAuto++;
            break;
          case 'numbers': case 'readgraph': {
            const range = b => Array.isArray(b) && b.length === 2 && typeof b[0] === 'number' && b[0] <= b[1];
            if (!(q.items || []).length) E(w + ' has no items');
            (q.items || []).forEach((it, i) => {
              if (!it.label) E(w + ' item ' + (i + 1) + ' needs a label');
              if (!range(it.between)) E(w + ' item ' + (i + 1) + ' needs between: [low, high]');
              if (!(it.tip || q.tip)) E(w + ' item ' + (i + 1) + ' needs a tip');
              nAuto++;
            });
            if (q.type === 'readgraph') {
              const g = q.graph || {};
              if (typeof g.fn !== 'function') E(w + ' needs graph.fn (the curve)');
              ['x', 'y'].forEach(k => { const a = g[k] || {}; if (!(a.max > a.min) || !(a.step > 0)) E(w + ' needs graph.' + k + ' with min, max and step'); });
              if (!g.alt) W(w + ' graph has no alt text (screen readers read it)');
            }
            break;
          }
          case 'graph': {
            const g = q.graph || {}, y = g.y || {}, rows = g.rows || [];
            if (!rows.length) E(w + ' needs graph.rows (the data)');
            if (!y.key || !y.label || !(y.max > y.min) || !(y.step > 0)) E(w + ' needs graph.y with key, label, min, max and step');
            if (!(g.factors || []).length) E(w + ' needs graph.factors');
            (g.factors || []).forEach((f, i) => {
              const where = w + ' factor ' + (i + 1) + (f.name ? ' (' + f.name + ')' : '');
              if (!f.key || !f.name || !f.label) E(where + ' needs key, name and label');
              if (!(g.labels || []).includes(f.label)) E(where + ': its label "' + f.label + '" is not in graph.labels');
              if (f.kind === 'bar') {
                if (!(f.cats || []).length) E(where + ' needs cats (the bar groups)');
                rows.forEach((r, j) => { if (!(f.cats || []).includes(r[f.key])) E(where + ': row ' + (j + 1) + ' has "' + r[f.key] + '", which is not one of the cats'); });
              } else if (f.kind === 'scatter') {
                if (!(f.max > f.min) || !(f.step > 0)) E(where + ' needs min, max and step');
                rows.forEach((r, j) => { if (!(r[f.key] >= f.min && r[f.key] <= f.max)) E(where + ': row ' + (j + 1) + ' is off the x-axis'); });
              } else E(where + ' needs kind: bar or scatter');
            });
            if (!(g.labels || []).includes(y.label)) E(w + ': graph.y.label is not in graph.labels');
            rows.forEach((r, j) => { if (!(r[y.key] >= y.min && r[y.key] <= y.max)) E(w + ': row ' + (j + 1) + ' is off the y-axis'); });
            nAuto += 5;
            break;
          }
          case 'written': case 'highlight':
            nWritten++;
            if (!(q.ideas || []).length) W(w + ' has no ideas, so students get no "Check my ideas" button');
            if (q.starters !== undefined && !(Array.isArray(q.starters) && q.starters.every(x => typeof x === 'string' && x.trim()))) E(w + ' starters must be a list of sentence starters (text)');
            if (q.cer && q.type !== 'highlight') E(w + ': cer: true only works on a highlight question');
            if (!(q.starters || []).length) W(w + ' has no starters, so students get no "sentence starters" help');
            (q.ideas || []).forEach((it, i) => {
              if (!it.done || !it.q || !it.tip) E(w + ' idea ' + (i + 1) + ' needs done, q and tip');
              const isRe = r => Object.prototype.toString.call(r) === '[object RegExp]';
              if (it.all !== undefined && !(Array.isArray(it.all) && it.all.length && it.all.every(isRe))) E(w + ' idea ' + (i + 1) + ': all must be a list of patterns');
              if (!isRe(it.re) && !it.all && !it.sentences && !it.highlight) E(w + ' idea ' + (i + 1) + ' needs re (a pattern), all (patterns for one sentence), sentences, or highlight');
              /* a science idea should not light up for an answer that says nothing, or for a sentence starter alone */
              if (!it.writing && !it.sentences && !it.highlight && (isRe(it.re) || it.all)) {
                const hit = t => { t = t.toLowerCase(); return it.all ? t.split(/[.!?\n]+/).some(x => it.all.every(r => r.test(x))) : it.re.test(t); };
                const f = FLUFF.find(hit);
                if (f) W(w + ' idea ' + (i + 1) + ' ("' + it.done + '") lights up for an answer that says nothing about the topic: "' + f + '". Make the pattern more specific, or use all: [...] to ask for two things in one sentence.');
                const st = (q.starters || []).find(x => hit(x.replace(/…/g, ' ')));
                if (st) W(w + ' idea ' + (i + 1) + ' ("' + it.done + '") lights up for the sentence starter alone: "' + st + '"');
              }
              if (it.highlight && q.type !== 'highlight') W(w + ' idea ' + (i + 1) + ' checks for highlighting but this is not a highlight question');
              if (it.highlight && it.highlight !== true && !['claim', 'evidence', 'expand'].includes(it.highlight)) E(w + ' idea ' + (i + 1) + ': highlight must be true, or claim, evidence or expand');
            });
            break;
          case 'agree':
            if (!(q.items || []).length) E(w + ' needs items (the statements to agree to)');
            break;
          case 'photo':
            nPhoto++;
            break;
          default:
            E(w + ' has an unknown type: ' + q.type);
        }
      });
    });
    if (board && nPhoto) E('Photo questions do not work on a game board');
    if (!board) {
      const gates = (A.parts || []).filter(p => p.gate);
      if (gates.length > 1) E('Only one part can have gate: true');
      if (gates.length && (A.parts || []).indexOf(gates[0]) === (A.parts || []).length - 1) W('gate: true on the last part does nothing');
    }
    if (nPhoto > 10) W(nPhoto + ' photo questions is a lot. Each photo makes the PDF bigger; aim for 10 or fewer');
    if (groups.reduce((n, p) => n + (p.questions || []).filter(q => q.type === 'mnemonic').length, 0) > 1) E('Only one memory-trick (mnemonic) question is allowed per assignment');
    Object.keys(clips).forEach(k => { if (!used.has(k)) W('Clip ' + k + ' is defined but not used in any part'); });
    console.log('\n' + dir + ': ' + qn + ' questions (' + nAuto + ' auto-checked, ' + nWritten + ' written' + (nPhoto ? ', ' + nPhoto + ' photo' : '') + '), ' + (board ? (board.categories || []).length + ' board categories' + (board.final ? ' + final round' : '') : (A.parts || []).length + ' parts, ' + Object.keys(clips).length + ' clips'));
  }
  errors.forEach(m => console.log('  ERROR   ' + m));
  warnings.forEach(m => console.log('  warning ' + m));
  if (!errors.length && !warnings.length) console.log('  looks good');
  totalErrors += errors.length;
}
process.exit(totalErrors ? 1 : 0);
