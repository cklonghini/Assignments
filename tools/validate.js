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
    if (!A.video || !A.video.src) E('Missing video.src');
    else {
      if (!exists(A.video.src)) E('Video file not found: ' + A.video.src);
      if (!exists(A.video.src.replace(/\.mp4$/i, '.vtt'))) W('No captions file next to ' + A.video.src + ' (expected a .vtt file)');
      if (!(A.video.seconds > 0)) E('video.seconds must be a number of seconds');
    }
    const clips = A.clips || {}, used = new Set();
    Object.keys(clips).forEach(k => {
      const c = clips[k];
      if (!exists(c.src)) E('Clip file not found: ' + c.src);
      if (!exists(String(c.src).replace(/\.mp4$/i, '.vtt'))) W('No captions file for clip ' + k);
      if (!(c.to > c.from)) E('Clip ' + k + ': "to" must be larger than "from"');
      if (!(c.seconds > 0)) E('Clip ' + k + ': seconds must be a number');
      if (!c.title || c.title === 'TODO') E('Clip ' + k + ' needs a title');
      if (A.video && c.to > A.video.seconds + 2) E('Clip ' + k + ' ends after the full video does');
    });
    if (!Array.isArray(A.parts) || !A.parts.length) E('The assignment needs at least one part');
    let qn = 0, nAuto = 0, nWritten = 0;
    (A.parts || []).forEach((p, pi) => {
      const where = 'Part ' + (pi + 1) + (p.title ? ' (' + p.title + ')' : '');
      if (!p.title) E(where + ' needs a title');
      (p.clips || []).forEach(k => { if (!clips[k]) E(where + ' uses a clip that is not defined: ' + k); used.add(k); });
      if (!(p.questions || []).length) W(where + ' has no questions');
      (p.questions || []).forEach(q => {
        qn++;
        const w = 'Q' + qn;
        if (!q.text) E(w + ' needs text');
        const needTip = (tip, answers) => {
          if (!tip) { E(w + ' needs a tip'); return; }
          answers.forEach(a => { if (a && String(a).length > 3 && plain(tip).includes(plain(a))) W(w + ': the tip contains the answer "' + plain(a) + '". Tips should point, not tell.'); });
        };
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
            if (!q.explain) E(w + ' needs an explanation (shown after a right answer)');
            needTip(q.tip, [q.options && q.options[q.answer]]);
            nAuto++;
            break;
          case 'typed':
            if (!q.expected) E(w + ' needs expected');
            needTip(q.tip, [q.expected]);
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
          case 'written': case 'highlight':
            nWritten++;
            if (!(q.ideas || []).length) W(w + ' has no ideas, so students get no "Check my ideas" button');
            (q.ideas || []).forEach((it, i) => {
              if (!it.done || !it.q || !it.tip) E(w + ' idea ' + (i + 1) + ' needs done, q and tip');
              if (Object.prototype.toString.call(it.re) !== '[object RegExp]' && !it.sentences && !it.highlight) E(w + ' idea ' + (i + 1) + ' needs re (a pattern), sentences, or highlight');
              if (it.highlight && q.type !== 'highlight') W(w + ' idea ' + (i + 1) + ' checks for highlighting but this is not a highlight question');
            });
            break;
          default:
            E(w + ' has an unknown type: ' + q.type);
        }
      });
    });
    if ((A.parts || []).reduce((n, p) => n + (p.questions || []).filter(q => q.type === 'mnemonic').length, 0) > 1) E('Only one memory-trick (mnemonic) question is allowed per assignment');
    Object.keys(clips).forEach(k => { if (!used.has(k)) W('Clip ' + k + ' is defined but not used in any part'); });
    console.log('\n' + dir + ': ' + qn + ' questions (' + nAuto + ' auto-checked, ' + nWritten + ' written), ' + (A.parts || []).length + ' parts, ' + Object.keys(clips).length + ' clips');
  }
  errors.forEach(m => console.log('  ERROR   ' + m));
  warnings.forEach(m => console.log('  warning ' + m));
  if (!errors.length && !warnings.length) console.log('  looks good');
  totalErrors += errors.length;
}
process.exit(totalErrors ? 1 : 0);
