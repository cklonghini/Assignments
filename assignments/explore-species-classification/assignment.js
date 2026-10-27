/*
  Explore - Species Classification (Marine Science A)
  Everything a student sees in this assignment is written here. The shared engine in /engine builds the page,
  the progress bars, the PDF, the Listen buttons, and the captions from this file.
  Text rules: *text* is shown in italics (use it for scientific names). Reading boxes (read) and tables use HTML.
*/
window.ASSIGNMENT = {
  title: 'Explore - Species Classification',
  course: 'Marine Science A',
  storageKey: 'explore-species-classification-v3',

  /* header icon (optional). Leave this out to get a plain play-button icon. */
  icon: '<svg viewBox="0 0 64 72" aria-hidden="true" focusable="false">'
    + '<path d="M4 6 H60 L52 22 H12 Z" fill="var(--primary)"/>'
    + '<path d="M14 26 H50 L44 40 H20 Z" fill="var(--receptor)"/>'
    + '<path d="M22 44 H42 L38 56 H26 Z" fill="var(--ligand)"/>'
    + '<path d="M28 60 H36 L32 68 Z" fill="var(--ink)"/></svg>',

  /* the full video at the top. A captions file with the same name (taxonomy-video.vtt) sits next to it. */
  video: {
    title: 'Taxonomy',
    src: 'media/taxonomy-video.mp4',
    seconds: 324
  },

  /* short clips, one or two per part. from/to are the times in the full video (they are shown to students). */
  clips: {
    vocab:    { src: 'media/clip-vocab.mp4',    from: 200.478, to: 254.698, seconds: 55, title: 'Cell type and how organisms get food' },
    changes:  { src: 'media/clip-changes.mp4',  from: 52.802,  to: 127.292, seconds: 75, title: 'Linnaeus, shared traits, and DNA evidence' },
    levels:   { src: 'media/clip-levels.mp4',   from: 127.292, to: 157.465, seconds: 31, title: 'The eight ranks and the memory trick' },
    domains:  { src: 'media/clip-domains.mp4',  from: 200.478, to: 238.46,  seconds: 39, title: 'The three domains' },
    kingdoms: { src: 'media/clip-kingdoms.mp4', from: 238.46,  to: 289.133, seconds: 51, title: 'The four kingdoms of Eukarya' },
    names:    { src: 'media/clip-names.mp4',    from: 157.465, to: 200.478, seconds: 44, title: 'Binomial nomenclature and why scientific names matter' }
  },

  parts: [
    /* ---------------------------------------------------------------- Part 1 */
    {
      title: 'Key vocabulary',
      clips: ['vocab'],
      read: '<p><b>Read:</b> Taxonomy is the branch of biology that names, describes, and classifies living things. Scientists use cell type, how an organism gets its food, and how many cells it has to help sort organisms into groups.</p>'
        + '<ul><li><b>Prokaryotes</b> have no nucleus. <b>Eukaryotes</b> have a nucleus.</li>'
        + '<li><b>Autotrophs</b> make their own food. <b>Heterotrophs</b> get food by consuming other organisms.</li>'
        + '<li><b>Single-celled</b> (unicellular) organisms are one cell. <b>Multicellular</b> organisms are made of many cells.</li></ul>',
      questions: [
        {
          type: 'selects',
          text: 'Match each description to the correct word.',
          options: ['Autotroph', 'Eukaryote', 'Heterotroph', 'Multicellular', 'Prokaryote', 'Single-celled'],
          items: [
            { label: 'Has no nucleus', answer: 'Prokaryote', hint: 'Bacteria and Archaea cells are like this. Which word goes with “no nucleus”?' },
            { label: 'Has a nucleus', answer: 'Eukaryote', hint: 'Plants, animals, fungi, and protists have cells like this.' },
            { label: 'Makes its own food', answer: 'Autotroph', hint: 'Think about photosynthesis. Which word describes an organism that feeds itself?' },
            { label: 'Gets food by consuming other organisms', answer: 'Heterotroph', hint: 'The prefix “hetero-” means “other” or “different.” Where does this organism get its food?' },
            { label: 'Body is made of one cell', answer: 'Single-celled', hint: 'Think about a bacterium or an amoeba. How many cells make up its body?' },
            { label: 'Body is made of many cells', answer: 'Multicellular', hint: 'Think about a human or a sunflower. How many cells make up its body?' }
          ]
        }
      ]
    },

    /* ---------------------------------------------------------------- Part 2 */
    {
      title: 'Why classification changes',
      clips: ['changes'],
      read: '<p><b>Read:</b> Classification is not set in stone. Linnaeus first grouped organisms by how they look (morphology). But looks can be misleading: analogous traits, like bird wings and insect wings, do the same job without coming from a common ancestor. Today scientists combine physical traits with DNA evidence to work out which organisms are truly related, so the groups can change when new evidence is found.</p>',
      questions: [
        {
          type: 'highlight',
          cer: true,              // claim (blue), evidence (yellow), expand (green)
          from: 'the video',
          text: 'Scientists have changed how living things are classified over time. Why is it not enough to group organisms only by how they look, and how does DNA evidence help? Use at least one idea from the video. (2 to 4 sentences)',
          starters: ['Grouping organisms only by how they look is not enough because …', 'According to the video, …', 'For example, two organisms can look alike but …', 'This shows that DNA evidence …'],
          min: 40,
          ideas: [
            { done: 'You explained why looks alone can be misleading.', q: 'Did you explain why grouping by looks alone is not enough?',
              tip: 'Think about what the video said about bird wings and insect wings.',
              re: /mislead|trick|fool|deceiv|same (job|function)|analogous|unrelated|not (always |closely |actually )?related|aren.?t related|different (ancestor|ancestry|lineage)|evolved (separately|differently|on their own)|separately|wings?\b|\bbirds?\b|insects?/ },
            { done: 'You told how DNA evidence helps.', q: 'Did you say how DNA evidence helps?',
              tip: 'The video says taxonomists combine physical traits with another kind of evidence. What is it, and what does it show?',
              all: [/dna|genetic|genes?\b/, /relat|ancest|share|common|closer|closely|family|evolv|compar|similar|match|same/] },
            { done: 'You connected your answer to how closely organisms are related.', q: 'Did you connect your answer to how closely organisms are related?',
              tip: 'Think about what scientists are really trying to figure out when they group organisms.',
              re: /ancestor|related|relationship|relatives|evolv|evolution/ },
            { done: 'You wrote at least 2 sentences.', q: 'Did you write 2 to 4 full sentences?',
              tip: 'Add another sentence that explains your idea.', sentences: 2 }
          ]
        }
      ]
    },

    /* ---------------------------------------------------------------- Part 3 */
    {
      title: 'The levels of classification',
      clips: ['levels'],
      read: '<p><b>Read:</b> The eight levels go from the broadest group (the most organisms) to the most specific group (the fewest organisms): Domain, Kingdom, Phylum, Class, Order, Family, Genus, Species. Each level fits inside the one above it, so organisms in the same genus are also in the same family, order, class, and so on.</p>',
      questions: [
        {
          type: 'selects',
          text: 'Put the levels in order, from the broadest group to the most specific group.',
          note: 'Spot 1 is the broadest (most organisms)',
          options: ['Class', 'Domain', 'Family', 'Genus', 'Kingdom', 'Order', 'Phylum', 'Species'],
          hint: 'Think about which level holds the most organisms and which holds the fewest.',
          items: [
            { label: 'Spot 1', answer: 'Domain' }, { label: 'Spot 2', answer: 'Kingdom' },
            { label: 'Spot 3', answer: 'Phylum' }, { label: 'Spot 4', answer: 'Class' },
            { label: 'Spot 5', answer: 'Order' }, { label: 'Spot 6', answer: 'Family' },
            { label: 'Spot 7', answer: 'Genus' }, { label: 'Spot 8', answer: 'Species' }
          ]
        },
        {
          type: 'mnemonic',
          text: 'Make your own memory trick. Write a silly sentence where each word starts with the first letter of a level, in order: D, K, P, C, O, F, G, S. The video shares one. Make yours different if you can.',
          words: ['Domain', 'Kingdom', 'Phylum', 'Class', 'Order', 'Family', 'Genus', 'Species']
        }
      ]
    },

    /* ---------------------------------------------------------------- Part 4 */
    {
      title: 'Domains and kingdoms',
      clips: ['domains', 'kingdoms'],
      read: '<p><b>Read:</b> The three domains are Bacteria, Archaea, and Eukarya. Bacteria and Archaea are both single-celled prokaryotes, but their chemistry is different enough that each gets its own domain.</p>'
        + '<ul><li>Domain <b>Bacteria</b>: single-celled prokaryotes that live almost everywhere, including inside your body.</li>'
        + '<li>Domain <b>Archaea</b>: single-celled prokaryotes that often live in extreme places, like hot springs and very salty water.</li>'
        + '<li>Domain <b>Eukarya</b> contains four kingdoms: Protista, Fungi, Plantae, and Animalia.</li></ul>'
        + '<p>Plants are autotrophs. Animals and fungi are heterotrophs. Protists are a catch-all group of mostly single-celled eukaryotes that can be autotrophs or heterotrophs.</p>',
      questions: [
        {
          type: 'selects',
          text: 'Pick the domain for each organism. For the organisms in domain Eukarya, also pick the kingdom.',
          items: [
            { label: 'Human: domain', options: ['Archaea', 'Bacteria', 'Eukarya'], answer: 'Eukarya', hint: 'Is it a prokaryote or a eukaryote? Reread the reading above.' },
            { label: 'Human: kingdom', options: ['Animalia', 'Fungi', 'Plantae', 'Protista'], answer: 'Animalia', hint: 'Think about how it gets food and how many cells it has.' },
            { label: 'Sunflower: domain', options: ['Archaea', 'Bacteria', 'Eukarya'], answer: 'Eukarya', hint: 'Is it a prokaryote or a eukaryote? Reread the reading above.' },
            { label: 'Sunflower: kingdom', options: ['Animalia', 'Fungi', 'Plantae', 'Protista'], answer: 'Plantae', hint: 'Think about how it gets food and how many cells it has.' },
            { label: 'Button mushroom: domain', options: ['Archaea', 'Bacteria', 'Eukarya'], answer: 'Eukarya', hint: 'Is it a prokaryote or a eukaryote? Reread the reading above.' },
            { label: 'Button mushroom: kingdom', options: ['Animalia', 'Fungi', 'Plantae', 'Protista'], answer: 'Fungi', hint: 'Think about how it gets food and how many cells it has.' },
            { label: 'Amoeba (single-celled, has a nucleus): domain', options: ['Archaea', 'Bacteria', 'Eukarya'], answer: 'Eukarya', hint: 'Is it a prokaryote or a eukaryote? Reread the reading above.' },
            { label: 'Amoeba (single-celled, has a nucleus): kingdom', options: ['Animalia', 'Fungi', 'Plantae', 'Protista'], answer: 'Protista', hint: 'Think about how it gets food and how many cells it has.' },
            { label: '*E. coli* (lives in your gut, no nucleus): domain', options: ['Archaea', 'Bacteria', 'Eukarya'], answer: 'Bacteria', hint: 'Is it a prokaryote or a eukaryote? Reread the reading above.' },
            { label: '*Halobacterium* (lives in extremely salty lakes, no nucleus): domain', options: ['Archaea', 'Bacteria', 'Eukarya'], answer: 'Archaea', hint: 'Is it a prokaryote or a eukaryote? Reread the reading above.' }
          ]
        }
      ]
    },

    /* ---------------------------------------------------------------- Part 5 */
    {
      title: 'Scientific names',
      clips: ['names'],
      read: '<p><b>Read:</b> Carolus Linnaeus developed binomial nomenclature, a two-part naming system. A scientific name has two parts: the <b>genus</b> first, then the <b>species</b> (the second word is called the specific epithet).</p>'
        + '<ul><li>Capitalize the genus. Write the species in lowercase.</li>'
        + '<li>Italicize the whole name when typing. Underline it when handwriting.</li>'
        + '<li>Example: <i>Homo sapiens</i> (genus <i>Homo</i>, species <i>sapiens</i>).</li></ul>'
        + '<p>Common names change from place to place and language to language. A scientific name is the same everywhere, so scientists know exactly which organism is meant.</p>',
      questions: [
        {
          type: 'choice',
          text: 'Which scientific name for humans is written correctly?',
          options: ['*homo sapiens*', '*Homo Sapiens*', '*Homo sapiens*', '*HOMO SAPIENS*'], answer: 2,
          explain: 'Capitalize the genus, keep the species lowercase, and italicize the whole name.',
          tip: 'Look at the capital letters. Only one word in a scientific name starts with a capital.'
        },
        {
          type: 'choice',
          text: 'The sea otter is *Enhydra lutris*. What is its species (the specific epithet)?',
          options: ['*Enhydra*', '*lutris*', '*Enhydra lutris*', 'Mustelidae'], answer: 1,
          explain: 'The second word is the species (the specific epithet). The first word is the genus.',
          tip: 'A scientific name has two words. Which one is the genus? The species is the other one.'
        },
        {
          type: 'choice',
          text: 'When you write a scientific name by hand, how do you show it is a scientific name?',
          options: ['Circle it', 'Underline it', 'Write it in all capitals', 'Put it in quotation marks'], answer: 1,
          explain: 'Typed names are italicized. Handwritten names are underlined.',
          tip: 'Typed names are in italics. What can you do with a pen or pencil to mark a name the same way?'
        },
        {
          type: 'choice',
          text: 'Why do scientists use scientific names instead of only common names?',
          options: ['Scientific names are standardized and the same worldwide', 'Common names are not allowed in science', 'Every organism has only one common name', 'Scientific names are always shorter'], answer: 0,
          explain: 'Common names change from place to place. A scientific name points to one specific organism everywhere.',
          tip: 'Think about the big cat in the video that has three common names. What does its scientific name do that those names do not?'
        },
        {
          type: 'selects',
          text: 'The white oak is *Quercus alba*. Choose the genus and the species.',
          sci: true,
          options: ['Quercus', 'alba'],
          items: [
            { label: 'Genus', answer: 'Quercus', hint: 'Look at how the name is written. Which word is capitalized, and which part of a scientific name comes first?' },
            { label: 'Species', answer: 'alba', hint: 'A scientific name has two parts. Which part is written in lowercase?' }
          ]
        },
        {
          type: 'typed',
          text: 'This sea otter name is written incorrectly: *enhydra Lutris*. Type it correctly (capitalization matters).',
          expected: 'Enhydra lutris',
          aria: 'Corrected sea otter name',
          caseTip: 'your letters are right. Check which words should start with a capital letter and which should not.',
          tip: 'check your spelling against the name in the question, and think about which letters should be capitals.'
        },
        {
          type: 'highlight',
          cer: true,              // claim (blue), evidence (yellow), expand (green)
          text: 'Carl Linnaeus developed the binomial nomenclature system for naming species, which is still in use today. Discuss the advantages of using scientific names over common names when identifying species. Provide examples from the video, such as the mountain lion (also called a cougar or a puma), to explain why scientific names are important for consistency in classification.',
          starters: ['One advantage of scientific names is …', 'According to the video, the mountain lion …', 'For example, …', 'This shows that scientific names …'],
          min: 40,
          ideas: [
            { done: 'You explained the problem with common names.', q: 'Did you explain what goes wrong with common names?',
              tip: 'Think about the video’s big cat that has three different names.',
              re: /common name|nickname|different names|many names|names? (can |may |often )?(change|vary|differ|are different)|change from place|vary|differs?\b|confus|depending on where|region|language|country/ },
            { done: 'You gave an example from the video.', q: 'Did you give an example from the video?',
              tip: 'The video uses a big cat as its example. What names does it give for that animal?',
              re: /cougar|puma|concolor|felis|catus|house cat|domestic cat|(mountain lion|it|this cat|this animal)[^.!?]*(also|other|different|three|many|multiple) names?/ },
            { done: 'You said why a scientific name is helpful.', q: 'Did you say why a scientific name is better?',
              tip: 'Think about what stays the same about a scientific name no matter where you are in the world.',
              re: /same (everywhere|worldwide|all over|around the world|in every|for every)|worldwide|around the world|all over the world|standard|consistent|consistency|universal|everywhere|one (scientific |official )?name|only one|avoid|clear|exact|specific|precise/ },
            { done: 'You wrote at least 2 sentences.', q: 'Did you write at least 2 full sentences?',
              tip: 'Add another sentence that explains your idea.', sentences: 2 },
            { done: 'You used transition words to point to your evidence.', q: 'Did you use transition words to point to your evidence?',
              tip: 'Introduce your evidence with words like “For example,” “According to the video,” or “This shows that.”',
              writing: true, re: /for example|for instance|according to|this shows|that shows|which shows|shows that|evidence|in the video|the video (says|said|shows|showed|explains|explained|mentions|mentioned)|because|such as|as an example|one example|proves?|this means|supports?/ },
            { done: 'You highlighted your transition words in yellow.', q: 'Did you highlight your transition words in yellow?',
              tip: 'Go back and select the transition words that point to your evidence, then press the yellow button.', highlight: true }
          ]
        }
      ]
    },

    /* ---------------------------------------------------------------- Part 6 */
    {
      title: 'Use what you learned',
      intro: 'Marine organisms are classified the same way. Use this table to answer the questions.',
      tableHtml: '<table><thead><tr><th>Common name</th><th>Class</th><th>Family</th><th>Genus</th><th>Species</th></tr></thead><tbody>'
        + '<tr><td>Bottlenose dolphin</td><td>Mammalia</td><td>Delphinidae</td><td><i>Tursiops</i></td><td><i>truncatus</i></td></tr>'
        + '<tr><td>Orca</td><td>Mammalia</td><td>Delphinidae</td><td><i>Orcinus</i></td><td><i>orca</i></td></tr>'
        + '<tr><td>Blue whale</td><td>Mammalia</td><td>Balaenopteridae</td><td><i>Balaenoptera</i></td><td><i>musculus</i></td></tr>'
        + '<tr><td>Great white shark</td><td>Chondrichthyes</td><td>Lamnidae</td><td><i>Carcharodon</i></td><td><i>carcharias</i></td></tr></tbody></table>',
      questions: [
        { type: 'choice', text: 'Which two organisms are in the same family?',
          options: ['Orca and great white shark', 'Bottlenose dolphin and orca', 'Blue whale and great white shark', 'Blue whale and orca'], answer: 1,
          explain: 'The dolphin and the orca are both in the family Delphinidae.',
          tip: 'Look at the Family column in the table. Which two rows match?' },
        { type: 'choice', text: 'Which organism is NOT in class Mammalia?',
          options: ['Blue whale', 'Orca', 'Great white shark', 'Bottlenose dolphin'], answer: 2,
          explain: 'The great white shark is in class Chondrichthyes (cartilaginous fish).',
          tip: 'Check the Class column. Which row is different from the rest?' },
        { type: 'choice', text: 'What is the genus of the blue whale?',
          options: ['*Balaenoptera*', '*musculus*', 'Balaenopteridae', 'Mammalia'], answer: 0,
          explain: 'The genus is the first word of the scientific name, *Balaenoptera musculus*.',
          tip: 'Find the blue whale row, then look under the Genus column.' },
        { type: 'choice', text: 'Which organisms share the MOST levels of classification with each other?',
          options: ['Blue whale and great white shark', 'Orca and great white shark', 'Bottlenose dolphin and orca', 'Blue whale and bottlenose dolphin'], answer: 2,
          explain: 'The dolphin and orca share the same class and family. The others share fewer levels.',
          tip: 'Compare the rows. For each pair, count how many columns have the same word.' },
        { type: 'choice', text: 'True or false: the bottlenose dolphin and the orca are in the same genus.',
          options: ['True', 'False'], answer: 1,
          explain: 'They share a family (Delphinidae) but have different genera: *Tursiops* and *Orcinus*.',
          tip: 'Look at the Genus column for both animals. Are the words the same?' }
      ]
    }
  ]
};
