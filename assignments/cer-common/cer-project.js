/*
  Shared content for the end-of-learning-period CER research projects (Research and Report).
  Each project link (for example assignments/cer-lp3-biology/) has a short assignment.js that calls
  CER_PROJECT({...}) with its title, course, storage key, short link, the teacher's research questions, and the
  websites to suggest. Everything else students see is written here, so a change here changes every CER project.
  The page loads this file before assignment.js (see that folder's index.html).

  Students choose ONE research question (or their own, with teacher approval), find two reliable websites, take notes
  on each one (a fact they type from the site plus their own annotation), and write a claim-evidence-reasoning
  response with their notes beside the writing box. The two website-link boxes are the only places students can
  paste. Questions differ by course, so the "Check my ideas" lists look for CER moves (naming a source, a specific
  fact, reasoning words), not one topic's science.
*/
window.CER_PROJECT = function (o) {
  return {
    title: o.title,
    course: o.course,
    storageKey: o.storageKey,
    short: o.short,
    icon: '<svg viewBox="0 0 64 72" aria-hidden="true" focusable="false"><rect x="10" y="8" width="44" height="56" rx="6" fill="var(--primary)"/><rect x="18" y="20" width="28" height="5" rx="2" fill="#00e5ff"/><rect x="18" y="32" width="28" height="5" rx="2" fill="#ffe600"/><rect x="18" y="44" width="20" height="5" rx="2" fill="#39e75f"/></svg>',
    startNote: 'Your websites show right on this page, next to your notes. If a website will not show, open it in a new tab, and keep this tab open to take your notes and write.',

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
            text: 'Here is a short CER about sea turtles. Choose whether each sentence is the claim, the evidence, or the reasoning.',
            easy: 'Is each sentence the claim, the evidence, or the reasoning?',
            options: ['Claim', 'Evidence', 'Reasoning'],
            items: [
              { label: 'Plastic in the ocean is harmful to sea turtles.', answer: 'Claim',
                hint: 'Which part of a CER is the answer to the question, said in one sentence?' },
              { label: 'According to the article, sea turtles can mistake floating plastic bags for jellyfish, which they eat.', answer: 'Evidence',
                hint: 'Look at how the sentence starts. Which part of a CER comes from a source?' },
              { label: 'If a turtle swallows plastic, it can block its stomach, so the turtle cannot eat real food and may starve.', answer: 'Reasoning',
                hint: 'This sentence explains how or why. Which part of a CER connects the evidence to the claim?' }
            ]
          },
          {
            type: 'choice',
            text: 'A student’s claim is “Sleep helps people remember what they learn.” Which sentence is the strongest evidence for this claim?',
            easy: 'The claim is “Sleep helps people remember what they learn.” Which sentence is the best evidence?',
            options: ['I think sleep is really important for everyone.',
              'My friend says she does better on tests when she sleeps more.',
              'Everyone knows you need sleep to do well in school.',
              'According to a university study, students who slept 8 hours did better on a memory test than students who slept 5 hours.'],
            answer: 3,
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
        intro: 'Read through the research questions below. Choose ONE that sounds interesting to you and that you would like to learn more about. The question you choose will stay at the top of each part, so you can keep it in mind as you research and write.',
        questions: [
          {
            type: 'pick',
            text: 'Choose ONE question to research (or propose your own related question, with teacher approval).',
            easy: 'Choose ONE question to research.',
            options: o.questions,
            pin: true,
            other: 'My own related question (my teacher must approve it)',
            otherLabel: 'Type your own research question',
            otherNote: 'Send your question to your teacher, and wait for approval before you start your research.'
          }
        ]
      },

      /* -------------------------------------------------------------- */
      {
        title: 'Source 1: Research and take notes',
        intro: 'Find your first reliable website and paste its link below. The website shows on one side and your notes on the other, so you can read and take notes at the same time.',
        read: '<p><b>Finding a good website</b></p>'
          + '<ul><li>Search for your research question, or the key words in it.</li>'
          + '<li>To find government and university websites, add <b>site:.gov</b> or <b>site:.edu</b> to your search, for example “' + o.searchExample + '”.</li>'
          + '<li>Good places to look: ' + o.sites + '.</li></ul>'
          + '<p><b>How to take notes</b></p>'
          + '<ul><li><b>From the website:</b> type one fact, number, or short quote that helps answer your research question. If you use the website’s exact words, put them in “quotation marks.”</li>'
          + '<li><b>My annotation:</b> explain the note in your own words. What does it mean? How does it help answer your question? Is there a word you had to look up?</li>'
          + '<li>Each note should be a different idea. Look for facts you can use as evidence for your claim.</li></ul>'
          + '<p>You cannot paste into your notes. Typing the information yourself helps you understand and remember it.</p>',
        readLabel: 'How to find a good website and take notes',
        questions: [
          {
            type: 'source',
            label: 'Source 1',
            text: 'Paste the link to your first website. Then type its title, who published it, and the date.',
            easy: 'Paste the link to your first website. Then type its title, who made it, and the date.'
          },
          {
            type: 'notes',
            source: 1,
            min: 3,
            site: true,
            text: 'Take at least 3 notes on Source 1. For each note, type what the website says, then write your annotation in your own words.',
            easy: 'Take 3 notes on Source 1. In each note, type a fact from the website. Then say what it means in your own words.'
          },
          trustQ(1, true)
        ]
      },

      /* -------------------------------------------------------------- */
      {
        title: 'Source 2: Research and take notes',
        intro: 'Find a second reliable website, from a different organization than Source 1. A second source lets you check your facts and find new evidence.',
        read: '<p><b>Choosing your second website</b></p>'
          + '<ul><li>Use a different website than Source 1, from a different organization if you can.</li>'
          + '<li>Look for facts that agree with Source 1, and for new evidence Source 1 did not have.</li>'
          + '<li>If two sources disagree, note it. That is something to think about in your reasoning.</li></ul>'
          + '<p><b>Notes reminder:</b> type one fact, number, or short quote in “From the website” (exact words go in “quotation marks”), then explain it in your own words in “My annotation.”</p>',
        readLabel: 'How to choose your second website',
        questions: [
          {
            type: 'source',
            label: 'Source 2',
            text: 'Paste the link to your second website. Then type its title, who published it, and the date.',
            easy: 'Paste the link to your second website. Then type its title, who made it, and the date.'
          },
          {
            type: 'notes',
            source: 2,
            min: 3,
            site: true,
            text: 'Take at least 3 notes on Source 2. For each note, type what the website says, then write your annotation in your own words.',
            easy: 'Take 3 notes on Source 2. In each note, type a fact from the website. Then say what it means in your own words.'
          },
          trustQ(2, false)
        ]
      },

      /* -------------------------------------------------------------- */
      {
        title: 'Write your CER',
        intro: 'Now answer your research question with a CER. Your notes from both websites are next to the writing box (above it on a small screen). Use evidence from both of your sources.',
        read: '<p><b>Plan before you write</b></p>'
          + '<ol><li><b>Claim:</b> read your notes again. What is your answer to your research question now? Write it in one clear sentence. It can be different from what you thought before you researched.</li>'
          + '<li><b>Evidence:</b> choose 2 to 4 of your best notes, with at least one from each website. Give each one in a sentence, and name where it came from: “According to …,” “The website … states that …,” or “Research from … shows that …”</li>'
          + '<li><b>Reasoning:</b> after your evidence, explain how it supports your claim. Use science ideas, and words like “This means that …,” “This happens because …,” or “Therefore …”</li>'
          + '<li><b>Highlight:</b> when you finish, highlight your claim in blue, your evidence in yellow, and your reasoning in green.</li></ol>'
          + '<p>Type everything yourself. If you use a website’s exact words, put them in “quotation marks” and name the website.</p>',
        readLabel: 'How to plan and write your CER',
        questions: [
          {
            type: 'highlight',
            cer: true,
            notesBeside: true,
            from: 'your two websites',
            text: 'Answer your research question with a claim, evidence from both of your websites, and reasoning. (At least 2 paragraphs, or 6 to 10 sentences)',
            easy: 'Answer your research question. Give your claim, evidence from both websites, and your reasoning. (At least 6 sentences)',
            min: 450,
            starters: ['My research question is … My claim is that …', 'According to …, …', 'The website … states that “…”', 'This evidence supports my claim because …', 'This means that …'],
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
  function trustQ(n, keep) {
    var q = {
      type: 'written',
      text: 'Why can you trust Source ' + n + '? Use the clues for a reliable website: who published it, when, and where its facts came from. (2 sentences)',
      min: 50,
      starters: ['I can trust this website because it was published by …', 'It was published or updated in …', 'The information on this website comes from …'],
      ideas: [
        { done: 'You told who published it.', q: 'Did you say who published it?', tip: 'Name the organization or author, and what kind of group it is (a government agency, a university, a museum, a science organization).',
          re: /\b(gov|edu|org|government|agency|university|college|museum|hospital|clinic|scientists?|researchers?|experts?|doctors?|journal|nasa|noaa|usgs|nih|cdc|nps|smithsonian|national|institute|society|association|foundation|organization)\b/ },
        { done: 'You told when it was published.', q: 'Did you say when it was published or updated?', tip: 'Look near the top or the bottom of the page for a date.',
          re: /\b(19|20)\d\d\b|no date|not dated|(doesn.t|does not|didn.t|did not) (have|show|list|give) a date|\b(january|february|march|april|june|july|august|september|october|november|december)\b/ },
        { done: 'You told where its facts came from.', q: 'Did you say where its information comes from?', tip: 'Does the page talk about studies, data, or experts? Does it list sources at the bottom?',
          re: /\b(cites?|cited|sources?|references?|stud(y|ies)|research(ers)?|data|evidence|scientists|experts)\b/ },
        { done: 'You wrote at least 2 sentences.', q: 'Did you write at least 2 sentences?', tip: 'Add a sentence for another clue.', sentences: 2 }
      ]
    };
    if (keep) q.easy = 'Why can you trust Source ' + n + '? Tell who made it and when. (2 sentences)';
    else q.support = false;
    return q;
  }
};
