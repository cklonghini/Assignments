/*
  Shared content for the end-of-learning-period CER research projects (Research and Report).
  Each project link (for example assignments/cer-lp3-biology/) has a short assignment.js that calls
  CER_PROJECT({...}) with its title, course, storage key, short link, the teacher's research questions, and the
  websites to suggest. Everything else students see is written here, so a change here changes every CER project.
  The page loads this file before assignment.js (see that folder's index.html).

  Students choose ONE research question (or their own, with teacher approval), find two reliable websites, take notes
  on each one (a fact they type from the site plus their own annotation), and write a claim-evidence-reasoning
  response with their notes beside the writing box. Students can paste only into the two website-link boxes and the
  "From the website" box of each note (never into their annotation or their CER). Questions differ by course, so the "Check my ideas" lists look for CER moves (naming a source, a specific
  fact, reasoning words), not one topic's science.
*/
window.CER_PROJECT = function (o) {
  /* the reminder at the top of each notes box: the notes are the body of the paragraph (evidence yellow, reasoning green) */
  var remind = '<p><b>Reminder: you are building your paragraph right now.</b></p>'
    + '<p>What you take <span class="hly">from the website is your <b>evidence</b></span>. What you write in '
    + '<span class="hlg">my annotation (your thoughts about that evidence) is your <b>reasoning</b></span>. '
    + 'Together, your evidence and your thinking become the body sentences of your CER paragraph.</p>';
  /* the teacher's article reading coach (SchoolAI), offered in both Source parts. readingCoach: false in a period's
     assignment.js hides it; readingCoach: 'https://...' uses a different link. */
  var coachUrl = o.readingCoach === false ? '' : (o.readingCoach || 'https://student.schoolai.com/join?code=45BL-F2WC');
  var coach = coachUrl ? [{ url: coachUrl, text: 'Open the article reading coach',
    note: 'Need help reading your article? Open the article reading coach, paste your article there to get support, and then come back to this page to keep going.' }] : [];
  /* Part 1's practice CER and evidence example. Give each learning period its own (sample: and evidence: in that
     period's assignment.js), so students practice on a new topic every time. These are the LP3 ones. */
  var smp = o.sample || {
    topic: 'sea turtles',
    claim: 'Plastic in the ocean is harmful to sea turtles.',
    evidence: 'According to the article, sea turtles can mistake floating plastic bags for jellyfish, which they eat.',
    reasoning: 'If a turtle swallows plastic, it can block its stomach, so the turtle cannot eat real food and may starve.'
  };
  var evq = o.evidence || {
    claim: 'Sleep helps people remember what they learn.',
    best: 'According to a university study, students who slept 8 hours did better on a memory test than students who slept 5 hours.',
    others: ['I think sleep is really important for everyone.',
      'My friend says she does better on tests when she sleeps more.',
      'Everyone knows you need sleep to do well in school.']
  };
  /* givenClaim: true when each research question already states a claim (LP2 Biology): students restate it in their
     own words instead of writing their own answer. */
  return {
    title: o.title,
    course: o.course,
    storageKey: o.storageKey,
    short: o.short,
    look: { style: 'research', accent: o.accent, kicker: o.kicker || 'Research and Report', tracker: true },
    pdfNumbers: false,   // no question numbers in the PDF (it is in its own order: the CER first)
    ready: true,   // the "Ready to submit?" checklist before the PDF
    icon: '<svg viewBox="0 0 64 72" aria-hidden="true" focusable="false"><rect x="10" y="8" width="44" height="56" rx="6" fill="var(--primary)"/><rect x="18" y="20" width="28" height="5" rx="2" fill="#00e5ff"/><rect x="18" y="32" width="28" height="5" rx="2" fill="#ffe600"/><rect x="18" y="44" width="20" height="5" rx="2" fill="#39e75f"/></svg>',
    startNote: 'You will open your websites in their own window and split your screen, so you can see the website and this page side by side. Keep this page open the whole time.',

    essential: {
      question: 'How can I use facts from reliable websites to support a claim?',
      goals: [
        'Choose a research question I can answer with evidence.',
        'Find two reliable websites and take notes on them.',
        'Write a claim, back it up with evidence, and explain my reasoning.',
        'Highlight my claim, evidence, and reasoning in three colors.'
      ]
    },

    parts: [
      /* -------------------------------------------------------------- */
      {
        title: 'Get ready: CER and reliable websites',
        step: 'Get ready',
        intro: 'In this project you choose one research question, research it on two websites, and write a claim-evidence-reasoning (CER) response. First, review what a CER is and how to tell if a website is reliable.',
        read: '<p><b>What is a CER?</b> A CER is a short piece of writing that answers a question with proof.</p>'
          + '<ul><li><b>Claim:</b> your answer to the research question, in one clear sentence.</li>'
          + '<li><b>Evidence:</b> facts, numbers, or short quotes from your sources that support your claim. Say where each one came from, for example “According to the National Institutes of Health, …”</li>'
          + '<li><b>Reasoning:</b> your explanation of <i>how</i> the evidence supports the claim. This is where you expand on your thoughts and connect the evidence to science ideas.</li></ul>'
          + '<p><b>Is this website reliable?</b> Look for these clues:</p>'
          + '<ul><li><b>Who made it?</b> Government agencies (.gov), universities (.edu), museums, hospitals, and science organizations are good choices. The page should say who wrote or published it.</li>'
          + '<li><b>When?</b> A date shows the information is up to date.</li>'
          + '<li><b>Where did the facts come from?</b> Good pages are based on research and often list their sources.</li>'
          + '<li><b>Be careful with:</b> pages anyone can edit, pages that are trying to sell you something, and pages with no author and no date.</li></ul>',
        questions: [
          {
            type: 'selects',
            cerColors: true,      // each sentence takes its CER highlight color once it is sorted right
            text: 'Here is a short CER about ' + smp.topic + '. Choose whether each sentence is the claim, the evidence, or the reasoning.',
            easy: 'Is each sentence the claim, the evidence, or the reasoning?',
            options: ['Claim', 'Evidence', 'Reasoning'],
            items: [
              { label: smp.claim, answer: 'Claim',
                hint: 'Which part of a CER is the answer to the question, said in one sentence?' },
              { label: smp.evidence, answer: 'Evidence',
                hint: 'Look at how the sentence starts. Which part of a CER comes from a source?' },
              { label: smp.reasoning, answer: 'Reasoning',
                hint: 'This sentence explains how or why. Which part of a CER connects the evidence to the claim?' }
            ]
          },
          {
            type: 'choice',
            text: 'A student’s claim is “' + evq.claim + '” Which sentence is the strongest evidence for this claim?',
            easy: 'The claim is “' + evq.claim + '” Which sentence is the best evidence?',
            options: evq.others.concat([evq.best]),
            answer: evq.others.length,
            tip: 'Evidence is a fact from a source you can check. Which choice tells where the information came from and gives results, not an opinion?',
            explain: 'Right. It names its source (a university study) and gives results you could check. The others are opinions.'
          },
          {
            type: 'multi',
            text: 'Which clues tell you a website is reliable? Choose all that apply.',
            easy: 'Which clues show a website is reliable? Choose all that are true.',
            options: ['It is published by a government agency, university, or science organization',
              'It tells who wrote or published it',
              'It shows when it was published or updated',
              'Anyone can edit the page',
              'It is trying to sell you a product',
              'It has no author and no date'],
            answers: ['It is published by a government agency, university, or science organization', 'It tells who wrote or published it', 'It shows when it was published or updated'],
            rules: [{ any: ['Anyone can edit the page', 'It is trying to sell you a product', 'It has no author and no date'],
              tip: 'One of your choices is on the “be careful with” list in the reading. Look at that list again.' }],
            tip: 'There is more than one right answer. Look at the three questions in the reading: who made it, when, and where the facts came from.',
            explain: 'Right. Reliable websites tell you who made them and when, and they come from people who study the topic.'
          }
        ]
      },

      /* -------------------------------------------------------------- */
      {
        title: 'Choose your research question',
        step: 'Choose a question',
        intro: 'Read through the research questions below. Choose ONE that sounds interesting to you and that you would like to learn more about. The question you choose will stay at the top of each part, so you can keep it in mind as you research and write.',
        questions: [
          {
            type: 'pick',
            tiles: true,          // Step 1: a tile per category, Step 2: its questions
            pdfFirst: 1,          // the PDF starts with the research question, then the CER, then the sources and notes
            text: 'Choose ONE question to research.',
            options: o.questions,
            /* a question written { text: '...', badge: 'Challenge' } gets a tag, and this line shows above its category's list */
            badgeNote: o.badgeNote || 'Challenge questions: scientists still debate the evidence, so you will need to compare your sources and decide what the evidence shows.',
            pin: true
          }
        ]
      },

      /* -------------------------------------------------------------- */
      {
        title: 'Source 1: Research and take notes',
        step: 'Source 1',
        intro: 'Find your first reliable website, and take notes on it as you read.',
        links: coach,
        box: '<p><b>Before you start</b></p>'
          + '<ol><li><b>Do your research.</b> Find one reliable website that helps answer your research question.</li>'
          + '<li><b>Split your screen</b> so you can see your website and this page side by side. Then take your notes as you read.</li></ol>'
          + '<details><summary>Need help finding a good website?</summary><ul>'
          + '<li>Search for your research question, or the key words in it.</li>'
          + '<li>To find government and university websites, add <b>site:.gov</b> or <b>site:.edu</b> to your search, for example “' + o.searchExample + '”.</li>'
          + '<li>Good places to look: ' + o.sites + '.</li>'
          + '<li>Check the clues from Part 1: who made it, when, and where its facts came from.</li></ul></details>'
          + '<details><summary>Need help splitting your screen?</summary>'
          + '<p>Drag your website’s tab out of the browser so it is in its own window. Then put the two windows side by side:</p><ul>'
          + '<li><b>Windows:</b> drag a window to the left or right edge of the screen until it snaps (or press the <b>Windows key + left arrow</b> or <b>right arrow</b>), then choose the other window for the other side.</li>'
          + '<li><b>Mac:</b> hold your pointer over the green button in the top-left corner of a window, and choose the option to put it on the left or right of the screen.</li>'
          + '<li><b>Chromebook:</b> press <b>Alt + [</b> for the left side and <b>Alt + ]</b> for the right side.</li></ul></details>',
        /* the rest of Part 3 opens when the student checks this box (at the bottom of the box above) */
        confirm: 'I know how to find a reliable website for my research question, and how to split my screen so I can see my website and my notes side by side.',
        confirmNote: 'Check the box above to open the rest of Part 3.',
        read: '<p><b>How to take notes</b></p>'
          + '<ul><li><b>From the website (evidence, yellow):</b> type or paste one fact, number, or short quote that helps answer your research question. If you use the website’s exact words, put them in “quotation marks.”</li>'
          + '<li><b>My annotation (reasoning, green):</b> explain the note in your own words. What does it mean? How does it help answer your question? Is there a word you had to look up? You cannot paste here: this is your own thinking.</li>'
          + '<li><b>How will I use this note?</b> Choose one tag for every note. A note is not finished until you choose.</li>'
          + '<li>Each note should be a different idea. Look for facts you can use as evidence for your claim.</li></ul>',
        readLabel: 'How to take notes',
        questions: [
          {
            type: 'source',
            noOpen: true,
            pdfFirst: 3,
            label: 'Source 1',
            text: 'Paste the link to your first website. Then type its title, who published it, and the date.',
            easy: 'Paste the link to your first website. Then type its title, who made it, and the date.'
          },
          {
            type: 'notes',
            noOpen: true,
            pdfFirst: 4,
            source: 1,
            min: 3,
            remind: remind,
            text: 'Take at least 3 notes on Source 1. For each note, type what the website says, then write your annotation in your own words.',
            easy: 'Take 3 notes on Source 1. In each note, type a fact from the website. Then say what it means in your own words.'
          },
          trustQ(1, true)
        ]
      },

      /* -------------------------------------------------------------- */
      {
        title: 'Source 2: Research and take notes',
        step: 'Source 2',
        intro: 'Find a second reliable website, from a different organization than Source 1. A second source lets you check your facts and find new evidence. Split your screen again, the same way you did for Source 1.',
        links: coach,
        read: '<p><b>Choosing your second website</b></p>'
          + '<ul><li>Use a different website than Source 1, from a different organization if you can.</li>'
          + '<li>Look for facts that agree with Source 1, and for new evidence Source 1 did not have.</li>'
          + '<li>If two sources disagree, note it. That is something to think about in your reasoning.</li></ul>'
          + '<p><b>Notes reminder:</b> type or paste one fact, number, or short quote in “From the website” (exact words go in “quotation marks”), explain it in your own words in “My annotation,” and choose how you will use the note.</p>',
        readLabel: 'How to choose your second website',
        questions: [
          {
            type: 'source',
            noOpen: true,
            pdfFirst: 5,
            label: 'Source 2',
            text: 'Paste the link to your second website. Then type its title, who published it, and the date.',
            easy: 'Paste the link to your second website. Then type its title, who made it, and the date.'
          },
          {
            type: 'notes',
            noOpen: true,
            pdfFirst: 6,
            source: 2,
            min: 3,
            remind: remind,
            text: 'Take at least 3 notes on Source 2. For each note, type what the website says, then write your annotation in your own words.',
            easy: 'Take 3 notes on Source 2. In each note, type a fact from the website. Then say what it means in your own words.'
          },
          trustQ(2, false)
        ]
      },

      /* -------------------------------------------------------------- */
      {
        title: 'Write your CER',
        step: 'Write your CER',
        intro: 'Now answer your research question with a CER. Your notes from both websites are next to the writing box (above it on a small screen). Use evidence from both of your sources.',
        read: '<p><b>Plan before you write</b></p>'
          + (o.givenClaim
            ? '<ol><li><b>Claim:</b> your research question already gives you a claim. Restate it in your own words, in one clear sentence. Do not copy it word for word.</li>'
            : '<ol><li><b>Claim:</b> read your notes again. What is your answer to your research question now? Write it in one clear sentence. It can be different from what you thought before you researched.</li>')
          + '<li><b>Evidence:</b> you do not need to use all of your notes. Choose only your 2 to 4 best pieces of evidence, with at least one from each website. Give each one in a sentence, and name where it came from: “According to …,” “The website … states that …,” or “Research from … shows that …”</li>'
          + '<li><b>Reasoning:</b> after your evidence, explain how it supports your claim. Use science ideas, and words like “This means that …,” “This happens because …,” or “Therefore …”</li>'
          + '<li><b>Highlight:</b> when you finish, highlight your claim in blue, your evidence in yellow, and your reasoning in green.</li></ol>'
          + '<p>Type everything yourself. If you use a website’s exact words, put them in “quotation marks” and name the website.</p>',
        readLabel: 'How to plan and write your CER',
        /* the supported version plans the CER in a thinking map (built into the engine), so its reading says so */
        easyReadLabel: 'How to plan your CER',
        easyRead: '<p><b>Plan in your thinking map</b></p>'
          + (o.givenClaim
            ? '<ol><li><b>Claim (blue box):</b> your research question already gives you a claim. Say it in your own words, in one sentence. Do not copy it word for word.</li>'
            : '<ol><li><b>Claim (blue box):</b> read your notes again. What is your answer to your research question? Write it in one sentence.</li>')
          + '<li><b>Evidence (yellow box):</b> choose your 2 best notes, one from each website. Put each one in its own yellow box. Say where it came from: “According to …”</li>'
          + '<li><b>Reasoning (green box):</b> next to each piece of evidence, explain why that evidence is important. How does it support your claim? Try “This means that …” or “This shows that …”</li>'
          + '<li><b>Make your paragraph:</b> each box needs at least one complete sentence. Start with a capital letter and end with a period. Then press “Turn my thinking map into a paragraph.” Your sentences keep their colors, so you do not need to highlight anything.</li></ol>'
          + '<p>Type everything yourself. If you use a website’s exact words, put them in “quotation marks” and name the website.</p>',
        questions: [
          {
            type: 'highlight',
            pdfFirst: 2,
            cer: true,
            notesBeside: true,
            noMinNote: true,      // no "Write at least a couple of sentences." line (the question already says how much)
            mapTips: {   // the supported version's thinking map: what each box is for
              claim: 'This is your answer to the question you researched.',
              evidence: 'This is the information you found on your websites when you researched your topic.',
              reasoning: 'This explains why your evidence is important and how it supports your claim.'
            },
            from: 'your two websites',
            text: 'Answer your research question with a claim, evidence from both of your websites, and reasoning. (At least 2 paragraphs, or 6 to 10 sentences)',
            easy: 'Answer your research question. Give your claim, evidence from both websites, and your reasoning. (At least 6 sentences)',
            min: 450,
            starters: [o.givenClaim ? 'In my own words, my claim is that …' : 'My research question is … My claim is that …', 'According to …, …', 'The website … states that “…”', 'This evidence supports my claim because …', 'This means that …'],
            ideas: [
              { done: 'You named where your evidence came from.', q: 'Did you name the websites your evidence came from?', tip: 'Start your evidence with “According to …” or “The website … states that …” and name the organization.',
                re: /according to (the )?[a-z0-9]{3,}|\bthe (website|article|source|author|page) [a-z]{3,}|\b(states|reports|explains|says|said|found|writes|wrote|shows|showed) that [a-z]+ [a-z]+|\bsource (1|2|one|two)\b|\b(noaa|nasa|usgs|cdc|nih|medlineplus|mayo clinic|cleveland clinic|smithsonian|national geographic)\b/ },
              { done: 'You used a specific fact, number, or quote.', q: 'Did you include a specific fact, number, or quote?', tip: 'Look at your notes for a number or exact words you can use. Put exact words in quotation marks.',
                re: /\d|“[^”]{10,}”|"[^"]{10,}"/ },
              { done: 'You explained how your evidence supports your claim.', q: 'Did you explain how your evidence supports your claim?', tip: 'After your evidence, add a sentence that starts with “This means that …” or “Therefore …” and connect it to your claim.',
                all: [/\b(this|that|which|it) (means|shows|proves|suggests|tells us|explains|supports)\b|\btherefore\b|\bas a result\b|\bthis happens because\b|\bso we (know|can)\b/, /\b\w{6,}\b/] },
              { done: 'You used transition words that point to your evidence.', q: 'Did you use transition words that point to your evidence?', tip: 'Try “According to …,” “For example, …,” “Research shows …,” or “One piece of evidence is …”',
                writing: true, re: /according to|for example|for instance|research (shows|found)|one (piece of )?evidence|another (piece of evidence|fact)|the (website|article) (says|states|explains)/ },
              { done: 'You wrote at least 6 sentences.', q: 'Did you write at least 6 sentences?', tip: 'A full CER needs a claim, two or more pieces of evidence, and reasoning for each one.', sentences: 6 }
            ]
          }
        ]
      }
    ]
  };

  /* "Why can you trust this website?" for Source 1 (kept in the supported version) and Source 2 (left out of it) */
  /* "Can you trust this website?" as a quick checklist plus one sentence. Source 1's is kept in the supported
     version; Source 2's is left out of it. */
  function trustQ(n, keep) {
    var q = {
      type: 'checks',
      text: 'Can you trust Source ' + n + '? Check every clue you found on the website.',
      items: [
        'It is published by a government agency (.gov), a university (.edu), a museum, or a science organization',
        'It tells who wrote or published it',
        'It shows when it was published or updated',
        'It lists its sources, or talks about research, data, or experts'
      ],
      ask: 'In one sentence, why can you trust this website?',
      placeholder: 'I can trust this website because …',
      ready: 'Source ' + n + ': can you trust it?'
    };
    if (keep) q.easy = 'Can you trust Source ' + n + '? Check each clue you found.';
    else q.support = false;
    return q;
  }
};
