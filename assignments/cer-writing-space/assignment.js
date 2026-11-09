/*
  CER Writing Space (every class: students choose theirs in Start here)
  Everything a student sees is written in this file. The shared engine in /engine builds the page,
  progress bars, PDF printout, Listen buttons, and the research tools from it.
  Full guide: docs/ASSIGNMENT_FORMAT.md

  The end-of-learning-period research project. Students choose a topic, find two reliable websites, take notes on
  each one (a fact they type from the site plus their own annotation), and then write a claim-evidence-reasoning
  response with their notes beside the writing box. The two website-link boxes are the only places students can
  paste; everything else is typed.
  No video. Topics are the student's choice, so the "Check my ideas" lists look for CER moves (pointing to a source,
  a specific fact, reasoning words), not for one topic's science.
*/
window.ASSIGNMENT = {
  title: 'CER Writing Space',
  course: 'All Classes',
  courses: ['Anatomy and Physiology A', 'Anatomy and Physiology B', 'Biology A', 'Biology B', 'Marine Science A', 'Marine Science B'],
  storageKey: 'cer-writing-space-v1',
  short: 'cer',
  icon: '<svg viewBox="0 0 64 72" aria-hidden="true" focusable="false"><rect x="10" y="8" width="44" height="56" rx="6" fill="var(--primary)"/><rect x="18" y="20" width="28" height="5" rx="2" fill="#00e5ff"/><rect x="18" y="32" width="28" height="5" rx="2" fill="#ffe600"/><rect x="18" y="44" width="20" height="5" rx="2" fill="#39e75f"/></svg>',
  startNote: 'You will open your two websites in new tabs. Keep this tab open, and switch back to it to take your notes and write.',

  essential: {
    question: 'How can I use facts from reliable websites to support a claim?',
    goals: [
      'Write a research question I can answer with evidence.',
      'Find two reliable websites and take notes on them.',
      'Write a claim, back it up with evidence, and explain my reasoning.',
      'Highlight my claim, evidence, and reasoning in three colors.'
    ]
  },

  parts: [
    /* ---------------------------------------------------------------- */
    {
      title: 'Get ready: CER and reliable websites',
      intro: 'In this project you choose a science topic, research it on two websites, and write a claim-evidence-reasoning (CER) response. First, review what a CER is and how to tell if a website is reliable.',
      read: '<p><b>What is a CER?</b> A CER is a short piece of writing that answers a question with proof.</p>'
        + '<ul><li><b>Claim:</b> your answer to the research question, in one clear sentence.</li>'
        + '<li><b>Evidence:</b> facts, numbers, or short quotes from your sources that support your claim. Say where each one came from, for example “According to NOAA, …”</li>'
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
          text: 'Which one is the best research question for this project?',
          easy: 'Which one is the best research question?',
          options: ['Sharks', 'Do sharks live in the ocean?', 'What is the coolest ocean animal?', 'How does warmer ocean water affect coral reefs?'],
          answer: 3,
          tip: 'A good research question is a real question, is not answered with just “yes” or “no,” and can be answered with facts instead of opinions. Check each choice for all three.',
          explain: 'Right. It asks “how,” it can be answered with evidence from science websites, and it is focused on one idea.'
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

    /* ---------------------------------------------------------------- */
    {
      title: 'Choose your topic',
      intro: 'Choose a science topic you want to learn more about. It can connect to something from this learning period, or something you are curious about. Then turn it into a research question.',
      read: '<p><b>Turning a topic into a research question</b></p>'
        + '<ul><li>Start with a topic, such as “coral reefs” or “the heart.”</li>'
        + '<li>Ask a <b>how</b> or <b>why</b> question about it, or ask what <b>effect</b> one thing has on another.</li>'
        + '<li>Make it small enough to answer with two websites. “How does exercise change heart rate?” is better than “How does the body work?”</li>'
        + '<li>Make sure facts can answer it, not just opinions.</li></ul>'
        + '<p><b>Examples:</b> How does warmer ocean water affect coral reefs? Why do sharks need to keep swimming? How does smoking damage the lungs? How do vaccines help the immune system?</p>',
      questions: [
        {
          type: 'written',
          text: 'What topic did you choose? Why do you want to learn more about it? (2 to 3 sentences)',
          easy: 'What is your topic? Why did you pick it? (2 to 3 sentences)',
          min: 60,
          starters: ['The topic I chose is …', 'I want to learn more about it because …', 'I first became curious about this when …'],
          ideas: [
            { done: 'You named your topic.', q: 'Did you name your topic?', tip: 'Start with “The topic I chose is …” and name it.',
              all: [/\b(topic|chose|picked|choose|researching)\b/, /\b(is|was|about|on)\s+(the\s+|a\s+|an\s+|how\s+)?[a-z]{4,}/] },
            { done: 'You told why it interests you.', q: 'Did you say why you want to learn about it?', tip: 'Tell what made you curious, or why it matters to you or to other people.',
              all: [/\b(interest(ed|ing|s)?|curious|wonder(ed)?|want(ed)? to (learn|know|find out|understand)|care about|matters? to|fascinat\w*)\b/, /\b(because|since|when|after|so)\s+[a-z']+\s+[a-z']+/] },
            { done: 'You wrote at least 2 sentences.', q: 'Did you write at least 2 sentences?', tip: 'Add a sentence that explains your choice.', sentences: 2 }
          ]
        },
        {
          type: 'written',
          text: 'Write your research question. Make it a how or why question that you can answer with facts from websites.',
          easy: 'Write your research question. Start it with How or Why.',
          min: 20,
          placeholder: 'For example: How does warmer ocean water affect coral reefs?',
          starters: ['How does … affect …?', 'Why do …?', 'What happens to … when …?'],
          ideas: [
            { done: 'You wrote it as a question.', q: 'Did you end with a question mark?', tip: 'A research question ends with “?”.', writing: true, re: /\?/ },
            { done: 'You asked how, why, or what effect.', q: 'Is it a how or why question?', tip: 'Questions that start with “How does …” or “Why do …” lead to stronger answers than yes-or-no questions.',
              re: /\b(how|why) (does|do|is|are|can|did|will|would|might|could) [a-z]{3,}|\bwhat (effect|effects|role|impact) (does|do|did|can|will) [a-z]{3,}|\bhow (much|many|fast|long) [a-z]{3,}/ },
            { done: 'Your question is about one focused idea.', q: 'Is your question focused?', tip: 'Check that your question names a specific thing, such as a body part, an animal, or a process, and not something huge like “the body” or “the ocean.”',
              re: /\b[a-z]{5,}\b[^?]*\b[a-z]{5,}\b[^?]*\?/ }
          ]
        },
        {
          type: 'written',
          support: false,
          text: 'Before you research: what do you think the answer to your question is right now, and why? It is fine if your research changes your mind. (2 sentences)',
          min: 50,
          starters: ['Right now I think …', 'I think this because …', 'One thing I already know about this is …'],
          ideas: [
            { done: 'You gave a first answer.', q: 'Did you say what you think the answer is?', tip: 'Start with “Right now I think …” and answer your research question.',
              writing: true, re: /\b(i think|i predict|i believe|my guess|probably|i expect|my prediction|my hypothesis)\b/ },
            { done: 'You wrote at least 2 sentences.', q: 'Did you write at least 2 sentences?', tip: 'Add a sentence that tells why you think so.', sentences: 2 }
          ]
        }
      ]
    },

    /* ---------------------------------------------------------------- */
    {
      title: 'Source 1: Research and take notes',
      intro: 'Find your first reliable website. Paste its link below, then open it in a new tab. Read it, and take notes here as you go. Switch between the two tabs.',
      read: '<p><b>Finding a good website</b></p>'
        + '<ul><li>Search for your research question, or the key words in it.</li>'
        + '<li>To find government and university websites, add <b>site:.gov</b> or <b>site:.edu</b> to your search, for example “coral bleaching site:.gov”.</li>'
        + '<li>Good places to look: NOAA, NASA, the National Park Service, the CDC, the National Institutes of Health (NIH), the Smithsonian, National Geographic, and university websites.</li></ul>'
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
          min: 4,
          text: 'Take at least 4 notes on Source 1. For each note, type what the website says, then write your annotation in your own words.',
          easy: 'Take 4 notes on Source 1. In each note, type a fact from the website. Then say what it means in your own words.'
        },
        {
          type: 'written',
          text: 'Why can you trust Source 1? Use the clues for a reliable website: who published it, when, and where its facts came from. (2 sentences)',
          easy: 'Why can you trust Source 1? Tell who made it and when. (2 sentences)',
          min: 50,
          starters: ['I can trust this website because it was published by …', 'It was published or updated in …', 'The information on this website comes from …'],
          ideas: [
            { done: 'You told who published it.', q: 'Did you say who published it?', tip: 'Name the organization or author, and what kind of group it is (a government agency, a university, a museum, a science organization).',
              re: /\b(gov|edu|org|government|agency|university|college|museum|hospital|clinic|scientists?|researchers?|experts?|doctors?|journal|nasa|noaa|nih|cdc|nps|smithsonian|national|institute|society|association|foundation|organization)\b/ },
            { done: 'You told when it was published.', q: 'Did you say when it was published or updated?', tip: 'Look near the top or the bottom of the page for a date.',
              re: /\b(19|20)\d\d\b|no date|not dated|(doesn.t|does not|didn.t|did not) (have|show|list|give) a date|\b(january|february|march|april|june|july|august|september|october|november|december)\b/ },
            { done: 'You told where its facts came from.', q: 'Did you say where its information comes from?', tip: 'Does the page talk about studies, data, or experts? Does it list sources at the bottom?',
              re: /\b(cites?|cited|sources?|references?|stud(y|ies)|research(ers)?|data|evidence|scientists|experts)\b/ },
            { done: 'You wrote at least 2 sentences.', q: 'Did you write at least 2 sentences?', tip: 'Add a sentence for another clue.', sentences: 2 }
          ]
        }
      ]
    },

    /* ---------------------------------------------------------------- */
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
          min: 4,
          text: 'Take at least 4 notes on Source 2. For each note, type what the website says, then write your annotation in your own words.',
          easy: 'Take 4 notes on Source 2. In each note, type a fact from the website. Then say what it means in your own words.'
        },
        {
          type: 'written',
          support: false,
          text: 'Why can you trust Source 2? Use the clues for a reliable website: who published it, when, and where its facts came from. (2 sentences)',
          min: 50,
          starters: ['I can trust this website because it was published by …', 'It was published or updated in …', 'The information on this website comes from …'],
          ideas: [
            { done: 'You told who published it.', q: 'Did you say who published it?', tip: 'Name the organization or author, and what kind of group it is (a government agency, a university, a museum, a science organization).',
              re: /\b(gov|edu|org|government|agency|university|college|museum|hospital|clinic|scientists?|researchers?|experts?|doctors?|journal|nasa|noaa|nih|cdc|nps|smithsonian|national|institute|society|association|foundation|organization)\b/ },
            { done: 'You told when it was published.', q: 'Did you say when it was published or updated?', tip: 'Look near the top or the bottom of the page for a date.',
              re: /\b(19|20)\d\d\b|no date|not dated|(doesn.t|does not|didn.t|did not) (have|show|list|give) a date|\b(january|february|march|april|june|july|august|september|october|november|december)\b/ },
            { done: 'You told where its facts came from.', q: 'Did you say where its information comes from?', tip: 'Does the page talk about studies, data, or experts? Does it list sources at the bottom?',
              re: /\b(cites?|cited|sources?|references?|stud(y|ies)|research(ers)?|data|evidence|scientists|experts)\b/ },
            { done: 'You wrote at least 2 sentences.', q: 'Did you write at least 2 sentences?', tip: 'Add a sentence for another clue.', sentences: 2 }
          ]
        },
        {
          type: 'written',
          support: false,
          text: 'Compare your two sources. Do they agree? What did Source 2 add that Source 1 did not have? (2 to 3 sentences)',
          min: 60,
          starters: ['Both sources say that …', 'Source 2 added …', 'One difference between the sources is …'],
          ideas: [
            { done: 'You told where the sources agree or disagree.', q: 'Did you say whether the sources agree?', tip: 'Look at your notes. Is there a fact that both websites give?',
              all: [/\b(both (sources|websites|articles|sites)|agree[sd]?|disagree[sd]?|similar(ly)?|unlike|in contrast|whereas|on the other hand)\b/, /\b(that|about|on|how|because)\s+[a-z']+\s+[a-z']+/] },
            { done: 'You told what Source 2 added.', q: 'Did you say what new evidence Source 2 gave you?', tip: 'Find a note from Source 2 with a fact that is not in your Source 1 notes.',
              all: [/source 2|second (source|website|article|site)/, /\b(add(ed|s)?|new|also|more|another|explain(ed|s)?|gave|give[sn]?|had|has|include[sd]?)\s+([a-z'“"]+\s+){2,}[a-z]/] },
            { done: 'You wrote at least 2 sentences.', q: 'Did you write at least 2 sentences?', tip: 'Add a sentence about what is different.', sentences: 2 }
          ]
        }
      ]
    },

    /* ---------------------------------------------------------------- */
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
              re: /according to (the )?[a-z0-9]{3,}|\bthe (website|article|source|author|page) [a-z]{3,}|\b(states|reports|explains|says|said|found|writes|wrote|shows|showed) that [a-z]+ [a-z]+|\bsource (1|2|one|two)\b|\b(noaa|nasa|cdc|nih|smithsonian|national geographic)\b/ },
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
