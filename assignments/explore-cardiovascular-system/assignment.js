/*
  Explore - Cardiovascular System (Anatomy & Physiology)
  Built from the teacher's Canvas quiz "Cardiovascular System Quiz" (15 points): 10 matching terms, 3 fill-in-the-blank
  sentences, the heart labeling picture (now drag-and-drop), and 2 written questions. There is no video, so each part
  has a reading that covers what its questions need.
  Everything a student sees is written in this file. The shared engine in /engine builds the page,
  progress bars, PDF printout, and Listen buttons from it.
  Full guide: docs/ASSIGNMENT_FORMAT.md
*/
window.ASSIGNMENT = {
  title: 'Explore - Cardiovascular System',
  course: 'Anatomy & Physiology',
  storageKey: 'explore-cardiovascular-system-v1',

  icon: '<svg viewBox="0 0 64 72" aria-hidden="true" focusable="false">'
    + '<path d="M32 62 C14 48 4 38 4 25 C4 15 12 8 21 8 C26 8 30 11 32 15 C34 11 38 8 43 8 C52 8 60 15 60 25 C60 38 50 48 32 62 Z" fill="var(--ligand)"/>'
    + '<path d="M10 34 H22 L26 26 L32 42 L37 30 L40 34 H54" fill="none" stroke="var(--surface)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>',

  /* no video for this one, so the page opens with a short "Get started" box */
  start: {
    intro: 'This assignment covers the parts of the heart, the blood vessels, the two circuits blood travels, and how the heart keeps itself beating. Read each part carefully and then respond to the prompts. Remember, Eagles! Quality matters more than quantity, but don’t leave out anything you think is worth noting.'
  },

  parts: [
    /* ---------------------------------------------------------------- Part 1 */
    {
      title: 'Heart vocabulary',
      read: '<p><b>Read:</b> The heart has four chambers. The two upper chambers are the <b>atria</b>. They receive blood. The two lower chambers are the <b>ventricles</b>. They pump blood out of the heart.</p>'
        + '<p><b>The right side.</b> Oxygen-poor blood from the body comes back to the heart in two big veins. The <b>superior vena cava</b> brings blood from above the diaphragm (head and arms). The <b>inferior vena cava</b> brings blood from the body region below the diaphragm (trunk and legs). Both empty into the <b>right atrium</b>. When the right atrium contracts, it pushes blood through the <b>tricuspid valve</b> into the <b>right ventricle</b>. The right ventricle pumps blood into the <b>pulmonary trunk</b>, a large vessel that splits in two (the right and left pulmonary arteries) and sends oxygen-poor blood to the lungs.</p>'
        + '<p><b>The left side.</b> The <b>pulmonary veins</b> bring oxygen-rich blood back from the lungs to the <b>left atrium</b>. The left atrium pushes blood through the <b>bicuspid (mitral) valve</b> into the <b>left ventricle</b>. The left ventricle pumps blood into the <b>aorta</b>, which carries it out to the rest of the body.</p>'
        + '<p><b>Valves.</b> Valves are one-way doors. The <b>tricuspid and bicuspid valves</b> sit between each atrium and its ventricle. They prevent blood from flowing back into the atria when the ventricles contract. The <b>semilunar valves</b> (pulmonary and aortic) sit where blood leaves the ventricles. They stop blood from flowing back into the ventricles each time the ventricles contract and then relax.</p>'
        + '<p><b>The electrical system.</b> The <b>SA node</b> (sinoatrial node) in the wall of the right atrium is the heart’s pacemaker. It initiates the action potential that causes the heart to beat. The signal spreads across the atria to the <b>AV node</b> (atrioventricular node). The AV node is responsible for passing the impulse on and distributing it throughout the heart, down into the ventricles.</p>',
      questions: [
        {
          type: 'selects',
          text: 'Match each definition with the correct term. Not all terms will be used.',
          options: ['Aorta', 'AV node', 'Inferior vena cava', 'Left atrium', 'Left ventricle', 'Pulmonary trunk', 'Pulmonary veins',
            'Right atrium', 'Right ventricle', 'SA node', 'Semilunar valves', 'Tricuspid and bicuspid valves'],
          items: [
            { label: 'Prevents blood from flowing back into the atria when the ventricles contract.', answer: 'Tricuspid and bicuspid valves',
              hint: 'Which valves sit between the upper and lower chambers? Check the Valves paragraph.' },
            { label: 'When blood leaves this chamber of the heart, it heads out to the body.', answer: 'Left ventricle',
              hint: 'Find the chamber that pumps blood into the aorta. Is it an upper or a lower chamber?' },
            { label: 'One of the body’s largest blood vessels that transports blood from the body region below the diaphragm to the heart.', answer: 'Inferior vena cava',
              hint: 'Look in the right-side paragraph for the vein that brings blood up from the trunk and legs.' },
            { label: 'When this chamber contracts it pushes blood through the tricuspid valve.', answer: 'Right atrium',
              hint: 'Which chamber comes just before the tricuspid valve on the blood’s path? Upper chambers push blood down.' },
            { label: 'Initiates the action potential that causes the heart to beat.', answer: 'SA node',
              hint: 'Which part of the electrical system is called the heart’s pacemaker?' },
            { label: 'When blood leaves this chamber of the heart, it heads to the lungs.', answer: 'Right ventricle',
              hint: 'Find the chamber that pumps blood into the pulmonary trunk.' },
            { label: 'Stops blood from flowing back into the ventricles each time they contract.', answer: 'Semilunar valves',
              hint: 'Look for the valves that sit where blood leaves the ventricles.' },
            { label: 'Responsible for distributing electrical impulses throughout the heart.', answer: 'AV node',
              hint: 'The signal starts in one node and then reaches a second node. Which one passes it on?' },
            { label: 'This blood vessel splits in two and sends oxygen-poor blood to the lungs.', answer: 'Pulmonary trunk',
              hint: 'Which large vessel leaves the right ventricle? It is a vessel, not a chamber.' },
            { label: 'The chamber in the heart that receives oxygenated blood from the lungs.', answer: 'Left atrium',
              hint: 'Where do the pulmonary veins empty? Receiving chambers are the upper ones.' }
          ]
        }
      ]
    },

    /* ---------------------------------------------------------------- Part 2 */
    {
      title: 'Blood vessels and circuits',
      read: '<p><b>Read:</b> There are three main kinds of blood vessels.</p>'
        + '<ul><li><b>Arteries</b> carry blood <b>away from</b> the heart. Their walls are thick, muscular, and elastic so they can handle high pressure.</li>'
        + '<li><b>Veins</b> carry blood <b>toward</b> the heart. Their walls are thinner, and many veins have valves that keep blood moving the right way.</li>'
        + '<li><b>Capillaries</b> are the smallest blood vessels. They connect the smallest arteries to the smallest veins. Their walls are the thinnest of all, only one cell thick. This lets oxygen, nutrients, and wastes diffuse easily in and out of the <b>interstitial fluid</b> (the fluid around the body’s cells).</li></ul>'
        + '<p><b>Two circuits.</b> Blood travels in two loops. In the <b>pulmonary circuit</b>, blood goes through the right side of the heart and out to the lungs to pick up oxygen and drop off carbon dioxide. In the <b>systemic circuit</b>, blood goes through the left side of the heart and out to the body to deliver oxygen to the tissues.</p>',
      questions: [
        {
          type: 'selects',
          text: 'Choose the best word for each blank: “(1) ____ are the smallest blood vessels with the (2) ____ walls in order to maximize diffusion of nutrients in and out of the interstitial fluid.”',
          items: [
            { label: 'Blank 1', options: ['Arteries', 'Capillaries', 'Valves', 'Veins'], answer: 'Capillaries',
              hint: 'Which vessels connect the smallest arteries to the smallest veins?' },
            { label: 'Blank 2', options: ['most elastic', 'most muscular', 'thickest', 'thinnest'], answer: 'thinnest',
              hint: 'Diffusion is easiest when materials only travel a short distance. How many cells thick are these walls?' }
          ]
        },
        {
          type: 'selects',
          text: 'Choose the best word for each blank: “(1) ____ carry blood towards the heart and (2) ____ carry blood away from the heart.”',
          items: [
            { label: 'Blank 1', options: ['Arteries', 'Capillaries', 'Valves', 'Veins'], answer: 'Veins',
              hint: 'Check the reading: which vessels bring blood back toward the heart?' },
            { label: 'Blank 2', options: ['arteries', 'capillaries', 'valves', 'veins'], answer: 'arteries',
              hint: 'Which vessels have thick, muscular walls because they carry high-pressure blood out of the heart?' }
          ]
        },
        {
          type: 'selects',
          text: 'Choose the best word for each blank: “Blood traveling in the pulmonary circuit goes through the (1) ____ side of the heart and out to the (2) ____. Blood traveling in the systemic circuit goes through the (3) ____ side of the heart and out to the (4) ____.”',
          items: [
            { label: 'Blank 1', options: ['left', 'lower', 'right', 'upper'], answer: 'right',
              hint: 'Which side of the heart receives oxygen-poor blood from the vena cava? Look back at Part 1.' },
            { label: 'Blank 2', options: ['body', 'brain', 'heart', 'lungs'], answer: 'lungs',
              hint: 'Where does blood go to pick up oxygen? Pulmonary is the word scientists use for those organs.' },
            { label: 'Blank 3', options: ['left', 'lower', 'right', 'upper'], answer: 'left',
              hint: 'Which side of the heart pumps blood into the aorta?' },
            { label: 'Blank 4', options: ['body', 'brain', 'heart', 'lungs'], answer: 'body',
              hint: 'Systemic comes from “system.” Where does this circuit deliver oxygen to the tissues?' }
          ]
        }
      ]
    },

    /* ---------------------------------------------------------------- Part 3 */
    {
      title: 'Label the heart',
      read: '<p><b>Read:</b> Heart diagrams are drawn as if you are facing the person. That means the heart’s <b>left</b> side shows up on the <b>right</b> side of the picture, and the heart’s right side shows up on the left. Think of it like looking at a friend: their left hand is on your right.</p>'
        + '<p>To label a chamber, ask two questions:</p>'
        + '<ul><li><b>Upper or lower?</b> The atria are the upper chambers. The ventricles are the lower chambers.</li>'
        + '<li><b>Which side of the person?</b> Use the mirror rule above. One more clue: the left ventricle has the thickest, most muscular wall, because it pumps blood out to the whole body.</li></ul>',
      questions: [
        {
          type: 'label',
          text: 'Label the four chambers of the heart. Drag each chamber name to the letter its line points to.',
          image: 'media/heart-labeling.png',
          alt: 'Diagram of the heart with four lines labeled A, B, C and D',
          labels: ['Left atrium', 'Left ventricle', 'Right atrium', 'Right ventricle'],
          spots: [
            { name: 'A', x: 94.2, y: 40.9, answer: 'Left atrium',
              hint: 'Is A an upper or a lower chamber? Then use the mirror rule: the right side of the picture is the other side of the person.',
              ok: 'It is an upper chamber on the right side of the picture, which is the heart’s left side.' },
            { name: 'B', x: 5.8, y: 51.8, answer: 'Right atrium',
              hint: 'Is B an upper or a lower chamber? Then use the mirror rule: the left side of the picture is the other side of the person.',
              ok: 'It is an upper chamber on the left side of the picture, which is the heart’s right side.' },
            { name: 'C', x: 94.2, y: 61.1, answer: 'Left ventricle',
              hint: 'Is C an upper or a lower chamber? Compare its wall with D’s wall. Which ventricle has the thickest wall?',
              ok: 'Notice its thick, muscular wall. It pumps blood out to the whole body.' },
            { name: 'D', x: 17.8, y: 73.8, answer: 'Right ventricle',
              hint: 'Is D an upper or a lower chamber? Its wall is thinner than C’s. Use the mirror rule to pick the side.',
              ok: 'It is a lower chamber with a thinner wall. It only has to pump blood to the lungs.' }
          ]
        }
      ]
    },

    /* ---------------------------------------------------------------- Part 4 */
    {
      title: 'Pacemaker cells and coronary circulation',
      read: '<p><b>Read:</b> <b>Pacemaker cells.</b> Most muscle cells only contract when a nerve tells them to. The heart is different. A small group of special cardiac muscle cells, called <b>pacemaker cells</b>, can make their own action potentials. Their membranes slowly “leak” positive ions in, so the charge inside creeps up on its own until it reaches threshold and fires. Then it resets and starts creeping up again. This property is called <b>autorhythmicity</b> (self-rhythm). The fastest pacemaker cells are in the <b>SA node</b>, so they set the pace, about 60 to 100 beats per minute at rest. Because of these cells, the heart beats on its own, in a steady rhythm, even without a signal from the brain. The nervous system can only speed the heart up or slow it down.</p>'
        + '<p><b>Coronary circulation.</b> The heart muscle (myocardium) works every second of your life, so it needs a constant supply of oxygen and nutrients. The blood passing through the chambers moves too fast, and the walls are too thick, for the heart muscle to feed itself from it. Instead, the heart has its own blood supply. The <b>coronary arteries</b> branch off the aorta just past the aortic semilunar valve and wrap around the outside of the heart. They deliver oxygen-rich blood to the heart muscle. <b>Coronary veins</b> collect the oxygen-poor blood and wastes and return them to the right atrium. If a coronary artery gets blocked (for example by fatty plaque or a clot), the heart muscle past the blockage stops getting oxygen and begins to die. This is a <b>heart attack</b> (myocardial infarction).</p>',
      questions: [
        {
          type: 'written',
          text: 'Describe the unique property of pacemaker cells and what they make possible in the heart. (2 to 4 sentences)',
          min: 60,
          ideas: [
            { done: 'You described what makes pacemaker cells unique.', q: 'Did you say what pacemaker cells can do that most cells can’t?',
              tip: 'Most muscle cells wait for a nerve signal. What can pacemaker cells do on their own?',
              re: /on (its|their) own|by (it|them)sel(f|ves)|without (a |any )?(nerve|signal|brain|message|stimul|input)|own (action potential|signal|impulse|electric)|automatic|spontaneous|autorhythm|self[- ]?(start|excit|generat|rhythm|stimul)|generat|creat|produc|make (an? |their |its )?(own )?(action|signal|impulse|electric)/ },
            { done: 'You named the electrical signal.', q: 'Did you mention the electrical signal they make?',
              tip: 'What do pacemaker cells fire when their charge reaches threshold?',
              re: /action potential|electric|impulse|signal|depolari|threshold|fire/ },
            { done: 'You explained what this makes possible for the heart.', q: 'Did you explain what this lets the heart do?',
              tip: 'Because of these cells, what does the heart do steadily, even without the brain?',
              re: /beat|rhythm|pace|contract|pump|steady|regular/ },
            { done: 'You connected it to the SA node.', q: 'Did you say where the main pacemaker cells are?',
              tip: 'The fastest pacemaker cells set the pace. Which node are they in?',
              re: /\bsa\b|s\.a\.|sinoatrial|sino-atrial|sinus node/ },
            { done: 'You wrote at least 2 sentences.', q: 'Did you write 2 to 4 full sentences?', tip: 'Add another sentence that explains your idea.', sentences: 2 }
          ]
        },
        {
          type: 'written',
          text: 'Why is coronary circulation an essential process? (2 to 4 sentences)',
          min: 60,
          ideas: [
            { done: 'You said the heart muscle needs its own blood supply.', q: 'Did you say what coronary circulation supplies?',
              tip: 'Whose blood supply is coronary circulation? Think about the walls of the heart itself.',
              re: /heart (muscle|tissue|wall|cell)|cardiac (muscle|tissue|cell)|myocardi|muscle of the heart|heart itself|its own blood|own blood supply|feed(s)? the heart/ },
            { done: 'You named what the blood delivers.', q: 'Did you say what the heart muscle gets from this blood?',
              tip: 'What does working muscle need a constant supply of?',
              re: /oxygen|o2|nutrient|glucose|food|fuel|energy/ },
            { done: 'You named the vessels involved.', q: 'Did you name the vessels that carry this blood?',
              tip: 'Which arteries branch off the aorta and wrap around the heart?',
              re: /coronary (arter|vein|vessel)|aorta/ },
            { done: 'You explained what happens without it.', q: 'Did you explain what happens if this blood supply is blocked?',
              tip: 'Look at the last sentences of the reading. What happens to heart muscle that loses its oxygen?',
              re: /heart attack|infarct|\bdie|death|dead|damage|block|clog|plaque|clot|stop|fail/ },
            { done: 'You wrote at least 2 sentences.', q: 'Did you write 2 to 4 full sentences?', tip: 'Add another sentence that explains your idea.', sentences: 2 }
          ]
        }
      ]
    }
  ]
};
