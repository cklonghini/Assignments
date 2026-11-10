/*
  Explore - Label the Cardiovascular System (Anatomy & Physiology B)
  Everything a student sees is written in this file. The shared engine in /engine builds the page,
  progress bars, PDF printout, Listen buttons, and captions from it.
  No video. The diagrams come from the teacher's handout "The Cardiovascular System Big Body Diagram (Key)"
  (source/cardiovascular-diagram-key.pdf, not saved to GitHub). The printed labels were covered with white
  (or painted over, inside the Blood Flow heart) so students drag the labels back on. The numbered markers
  are drawn by the engine at the spots below (in the picture's own pixels).
  Write *scientific names* between asterisks to show them in italics. Reading boxes and tables use HTML.
  Full guide: docs/ASSIGNMENT_FORMAT.md
*/
window.ASSIGNMENT = {
  title: 'Explore - Label the Cardiovascular System',
  course: 'Anatomy & Physiology B',
  storageKey: 'explore-label-the-cardiovascular-system-v1',
  /* supported version (?support=eagle): the goal box at the top */
  essential: {
    question: 'What are the parts of the heart, and how does blood flow through them?',
    goals: [
      'Say and match the words for the parts of the heart and its blood vessels.',
      'Label the chambers, valves, and blood vessels on a heart diagram.',
      'Trace the path of blood through the heart, the lungs, and the body.'
    ]
  },
  icon: '<svg viewBox="0 0 64 72" aria-hidden="true" focusable="false"><rect x="6" y="10" width="52" height="52" rx="12" fill="var(--primary)"/><path d="M32 52 C16 41 13 33 13 27 a9.5 9.5 0 0 1 19 -3 a9.5 9.5 0 0 1 19 3 c0 6 -3 14 -19 25 z" fill="var(--primary-ink)"/></svg>',

  parts: [
    /* ---------------------------------------------------------------- Part 1 */
    {
      title: 'Cardiovascular vocabulary',
      intro: 'Before you label the diagrams, practice the words you will use. You will say each word and its definition out loud. Saying words out loud helps your brain remember them, and it lets your teacher hear from you. Find a spot where you can talk, and make sure your microphone works.',
      read: '<p><b>Read:</b> These are the words on the cardiovascular system diagrams. In the diagrams, <b>blue</b> shows oxygen-poor blood and <b>red</b> shows oxygen-rich blood.</p>'
        + '<p><b>Chambers</b></p><ul>'
        + '<li><b>Atrium</b> (plural: atria): an upper chamber of the heart. It receives blood coming back to the heart. The heart has a right atrium and a left atrium.</li>'
        + '<li><b>Ventricle</b>: a lower chamber of the heart. It pumps blood out of the heart. The heart has a right ventricle and a left ventricle.</li></ul>'
        + '<p><b>Blood vessels</b></p><ul>'
        + '<li><b>Superior vena cava</b>: the large vein that brings oxygen-poor blood from the upper body (head and arms) back to the right atrium.</li>'
        + '<li><b>Inferior vena cava</b>: the large vein that brings oxygen-poor blood from the lower body back to the right atrium.</li>'
        + '<li><b>Pulmonary trunk</b>: the large vessel that carries oxygen-poor blood out of the right ventricle toward the lungs.</li>'
        + '<li><b>Pulmonary arteries</b>: the two branches of the pulmonary trunk. They carry oxygen-poor blood to the right lung and the left lung.</li>'
        + '<li><b>Pulmonary veins</b>: vessels that carry oxygen-rich blood from the lungs back to the left atrium.</li>'
        + '<li><b>Aorta</b>: the largest artery. It carries oxygen-rich blood from the left ventricle to the body. It curves over the top of the heart (the <b>aortic arch</b>) and then runs down behind the heart (the <b>descending aorta</b>).</li>'
        + '<li><b>Coronary arteries</b>: arteries on the surface of the heart that bring oxygen-rich blood to the heart muscle itself.</li>'
        + '<li><b>Cardiac veins</b>: veins on the surface of the heart that carry oxygen-poor blood away from the heart muscle.</li>'
        + '<li><b>Capillary beds</b>: networks of tiny blood vessels in the tissues of the body. Here blood drops off oxygen and picks up carbon dioxide.</li></ul>'
        + '<p><b>Valves</b> (one-way doors that keep blood from flowing backward)</p><ul>'
        + '<li><b>Tricuspid valve</b>: the valve between the right atrium and the right ventricle.</li>'
        + '<li><b>Pulmonary valve</b>: the valve between the right ventricle and the pulmonary trunk.</li>'
        + '<li><b>Mitral (bicuspid) valve</b>: the valve between the left atrium and the left ventricle.</li>'
        + '<li><b>Aortic valve</b>: the valve between the left ventricle and the aorta.</li></ul>'
        + '<p><b>Other parts</b></p><ul>'
        + '<li><b>Chordae tendineae</b>: strong cords, like strings, that hold the tricuspid and mitral valves in place so they do not flip backward.</li>'
        + '<li><b>Interventricular septum</b>: the thick wall between the right ventricle and the left ventricle. (“Inter” means between, so “interventricular” means between the ventricles.)</li>'
        + '<li><b>Auricle</b>: a small, ear-shaped flap on the outside of each atrium. (“Auricle” comes from the Latin word for ear.)</li>'
        + '<li><b>Apex</b>: the pointed bottom tip of the heart.</li></ul>'
        + '<p><b>How the speaking cards work:</b> The cards come one at a time. Press <b>Say it</b>, then say the word and read its definition. The card turns green when it hears the word and its key ideas, and then the next card opens. If your browser asks to use the microphone, choose <b>Allow</b>.</p>'
        + '<p><b>Memory tip:</b> Right and left mean the <b>person’s</b> right and left. In a diagram, you are facing the person, so the heart’s right side is on <b>your</b> left.</p>'
        + '<p>If your microphone isn’t working, reach out to IT to get it working. It’s so important for us to hear from you in our online school, so you’ll need a working microphone to finish this activity.</p>',
      questions: [
        {
          type: 'speak',
          deck: true,
          text: 'Read each card out loud. Say the word, then read its definition. The next card opens when this one turns green.',
          cards: [
            { term: 'Atrium', def: 'An upper chamber of the heart. It receives blood coming back to the heart.',
              say: /\batri(um|a|ums|on|em)\b|\beighteen\b|\bay tree/, keys: [/\b(upper|top)\b/, /\b(receives?|receiving|coming back|comes back|collects?|chambers?)\b/] },
            { term: 'Ventricle', def: 'A lower chamber of the heart. It pumps blood out of the heart.',
              say: /\bventric(le|les|al|ul)\b|\bvent ?ricle/, keys: [/\b(lower|bottom)\b/, /\bpumps?\b|\bpumping\b/] },
            { term: 'Superior vena cava', def: 'The large vein that brings oxygen-poor blood from the upper body back to the right atrium.',
              say: /\bsuperior\b/, keys: [/\b(upper|head|arms?|above|top)\b/, /\batri(um|a)|\bright\b/], not: /\blower\b/ },
            { term: 'Inferior vena cava', def: 'The large vein that brings oxygen-poor blood from the lower body back to the right atrium.',
              say: /\binferior\b/, keys: [/\b(lower|legs?|below|bottom)\b/, /\batri(um|a)|\bright\b/], not: /\bupper\b/ },
            { term: 'Pulmonary trunk', def: 'The large vessel that carries oxygen-poor blood out of the right ventricle toward the lungs.',
              say: /\btrunks?\b/, keys: [/\blungs?\b/, /\bventric|\bvessels?\b/] },
            { term: 'Pulmonary arteries', def: 'The two branches of the pulmonary trunk. They carry oxygen-poor blood to the right lung and the left lung.',
              say: /\barter(y|ies)\b/, keys: [/\blungs?\b/, /\b(branch|branches|two|2)\b/] },
            { term: 'Pulmonary veins', def: 'Vessels that carry oxygen-rich blood from the lungs back to the left atrium.',
              say: /\bveins?\b|\bvains?\b|\bvanes?\b/, keys: [/\blungs?\b/, /\b(left|atri(um|a)|back)\b/] },
            { term: 'Aorta', def: 'The largest artery. It carries oxygen-rich blood from the left ventricle to the body.',
              say: /\ba ?orta\b|\baorta\b|\bnorta\b|\bhorta\b/, keys: [/\b(largest|biggest|main|large)\b/, /\bbody\b/] },
            { term: 'Coronary arteries', def: 'Arteries on the surface of the heart that bring oxygen-rich blood to the heart muscle itself.',
              say: /\bcoron(ary|ery|airy|arry)\b|\bcorona\b/, keys: [/\bmuscles?\b/, /\b(surface|outside|oxygen)\b/] },
            { term: 'Cardiac veins', def: 'Veins on the surface of the heart that carry oxygen-poor blood away from the heart muscle.',
              say: /\bcardiac\b|\bcardi ?ack\b|\bcardiak\b/, keys: [/\bmuscles?\b/, /\b(away|surface|outside|oxygen)\b/] },
            { term: 'Capillary beds', def: 'Networks of tiny blood vessels in the tissues of the body. Here blood drops off oxygen and picks up carbon dioxide.',
              say: /\bcapill?ar(y|ies)\b|\bcap(il|el|ol)ary\b/, keys: [/\b(tiny|small|networks?|tissues?)\b/, /\b(oxygen|carbon|dioxide)\b/] },
            { term: 'Tricuspid valve', def: 'The valve between the right atrium and the right ventricle.',
              say: /\btri ?cusp|\btry ?cusp|\btricus/, keys: [/\bright\b/, /\batri(um|a)\b/, /\bventric/] },
            { term: 'Pulmonary valve', def: 'The valve between the right ventricle and the pulmonary trunk.',
              say: /\bpulmon/, keys: [/\bvalves?\b/, /\b(trunk|right ventricle|ventricle)\b/] },
            { term: 'Mitral (bicuspid) valve', def: 'The valve between the left atrium and the left ventricle.',
              say: /\bmitral\b|\bmy ?tral\b|\bmitre\b|\bbicusp|\bbi ?cusp|\bby ?cusp/, keys: [/\bleft\b/, /\batri(um|a)\b/, /\bventric/] },
            { term: 'Aortic valve', def: 'The valve between the left ventricle and the aorta.',
              say: /\baortic\b|\ba ?ortic\b|\bayortic\b/, keys: [/\bvalves?\b/, /\b(left|ventricle)\b/] },
            { term: 'Chordae tendineae', def: 'Strong cords, like strings, that hold the tricuspid and mitral valves in place so they do not flip backward.',
              say: /\bchord|\bcord|\bcorte|\bkord|\btendin|\btendon/, keys: [/\b(cords?|chords?|strings?)\b/, /\b(valves?|backward|backwards|flip|place)\b/] },
            { term: 'Interventricular septum', def: 'The thick wall between the right ventricle and the left ventricle.',
              say: /\bsept(um|em|im)\b|\binter ?ventric/, keys: [/\bwall\b/, /\bventric/] },
            { term: 'Auricle', def: 'A small, ear-shaped flap on the outside of each atrium.',
              say: /\bauric(le|al|ul)\b|\boracle\b|\boricle\b|\borical\b|\bauricles\b/, keys: [/\bears?\b/, /\b(flap|outside|atri(um|a))\b/] },
            { term: 'Apex', def: 'The pointed bottom tip of the heart.',
              say: /\bapex\b|\bay ?pecks\b|\bapec?ks\b/, keys: [/\b(point|pointed|pointy|tip)\b/, /\b(bottom|lower)\b/] }
          ]
        },
        {
          type: 'selects',
          text: 'Blood vessels: match each description to the correct word.',
          easy: 'Read each sentence about a blood vessel. Pick the word it describes.',
          options: ['Aorta', 'Superior vena cava', 'Inferior vena cava', 'Pulmonary trunk', 'Pulmonary veins', 'Coronary arteries', 'Capillary beds'],
          items: [
            { label: 'The largest artery. It carries oxygen-rich blood from the left ventricle to the body.', answer: 'Aorta', hint: 'Find the word that leaves the LEFT ventricle and goes to the whole body.' },
            { label: 'Brings oxygen-poor blood from the head and arms back to the right atrium.', answer: 'Superior vena cava', hint: '“Superior” and “inferior” tell you above or below. Which one is the upper body?' },
            { label: 'Brings oxygen-poor blood from the legs and lower body back to the right atrium.', answer: 'Inferior vena cava', hint: '“Superior” and “inferior” tell you above or below. Which one is the lower body?' },
            { label: 'Carries oxygen-poor blood out of the right ventricle toward the lungs.', answer: 'Pulmonary trunk', hint: '“Pulmonary” means the lungs. Which lung vessel leaves the heart?' },
            { label: 'Carries oxygen-rich blood from the lungs back to the left atrium.', answer: 'Pulmonary veins', hint: 'Veins bring blood back to the heart. Which ones come from the lungs?' },
            { label: 'Brings oxygen-rich blood to the heart muscle itself.', answer: 'Coronary arteries', hint: 'Reread the vessels that sit on the surface of the heart.' },
            { label: 'Tiny vessels in the body’s tissues where blood drops off oxygen.', easy: 'Tiny vessels in the body where blood drops off oxygen.', answer: 'Capillary beds', hint: 'Look for the smallest vessels in the reading.' }
          ]
        },
        {
          type: 'selects',
          text: 'Valves and other parts: match each description to the correct word.',
          easy: 'Read each sentence about a part of the heart. Pick the word it describes.',
          options: ['Tricuspid valve', 'Pulmonary valve', 'Mitral (bicuspid) valve', 'Aortic valve', 'Chordae tendineae', 'Interventricular septum', 'Auricle', 'Apex'],
          items: [
            { label: 'Between the right atrium and the right ventricle', answer: 'Tricuspid valve', hint: 'Which valve is on the right side, between the upper and lower chambers?' },
            { label: 'Between the left atrium and the left ventricle', answer: 'Mitral (bicuspid) valve', hint: 'Which valve is on the left side, between the upper and lower chambers?' },
            { label: 'Between the right ventricle and the pulmonary trunk', answer: 'Pulmonary valve', hint: 'This valve is named after the vessel that the blood goes into next.' },
            { label: 'Between the left ventricle and the aorta', answer: 'Aortic valve', hint: 'This valve is named after the vessel that the blood goes into next.' },
            { label: 'Strong cords that keep two valves from flipping backward', answer: 'Chordae tendineae', hint: 'Look for the part described as being like strings.' },
            { label: 'The thick wall between the two ventricles', answer: 'Interventricular septum', hint: '“Inter” means between. Which word has “ventricular” in it?' },
            { label: 'A small, ear-shaped flap on the outside of an atrium', answer: 'Auricle', hint: 'Which word comes from the Latin word for ear?' },
            { label: 'The pointed bottom tip of the heart', answer: 'Apex', hint: 'Reread the last word in the “Other parts” list.' }
          ]
        },
        {
          support: false,
          type: 'mnemonic',
          text: 'Make your own memory trick for the four heart valves, in the order blood flows through them. Write a sentence where each word starts with the same letter as the valve: Tricuspid, Pulmonary, Mitral, Aortic.',
          easy: 'Make a memory trick for the four heart valves. Write one word in each box. Each word must start with the same letter as the valve: Tricuspid, Pulmonary, Mitral, Aortic.',
          words: ['Tricuspid', 'Pulmonary', 'Mitral', 'Aortic']
        }
      ]
    },

    /* ---------------------------------------------------------------- Part 2 */
    {
      title: 'Blood flow',
      intro: 'This diagram shows the big picture: blood goes from the heart to the lungs, back to the heart, out to the body, and back to the heart again. Follow the arrows.',
      read: '<p><b>Read:</b> The heart is really two pumps side by side.</p><ul>'
        + '<li>The <b>right side</b> (the right atrium and right ventricle) gets oxygen-poor blood from the body and pumps it through the <b>pulmonary trunk</b> to the <b>lungs</b>. In the lungs, blood is <b>oxygenated</b> (it picks up oxygen).</li>'
        + '<li>The <b>left side</b> (the left atrium and left ventricle) gets oxygen-rich blood from the lungs and pumps it through the <b>aorta</b> to the body.</li>'
        + '<li>In the body, blood flows through <b>capillary beds</b> in the tissues. There it drops off oxygen and picks up carbon dioxide. Then it flows back to the heart through the venae cavae, and the trip starts again.</li></ul>'
        + '<p>The <b>atria</b> are the upper chambers, and the <b>ventricles</b> are the lower chambers. In the diagram, blue shows oxygen-poor blood and red shows oxygen-rich blood. (Real blood is always red. The colors only help you follow it.)</p>'
        + '<p>Remember: the diagram faces you, so the heart’s <b>right</b> side is on <b>your left</b>.</p>',
      questions: [
        {
          type: 'label',
          text: 'Label the Blood Flow diagram. Drag each label to the box with the matching number, then press “Check my labels.” The heart is drawn as if you are facing the person, so the heart’s right side is on your left.',
          easy: 'Label the Blood Flow diagram. Drag each label to the box with the same number. Then press “Check my labels.” The heart’s right side is on your left.',
          viewBox: '0 0 755 1590',
          image: { src: 'media/label-blood-flow.jpg', width: 755, height: 1590 },
          markerSize: 28,
          alt: 'Blood flow diagram: a pair of lungs at the top, a cutaway heart in the middle, and a bed of tiny blood vessels at the bottom, with dotted arrows connecting them and 8 numbered parts',
          legend: '<span><span class="sw" style="background:#2f6fd6"></span>Oxygen-poor blood</span><span><span class="sw" style="background:#d61f2c"></span>Oxygen-rich blood</span><span>Diagram colors only. Real blood is always red.</span>',
          credit: 'Diagram: It’s Not Rocket Science®, The Cardiovascular System',
          spots: [
            { x: 400, y: 55, label: 'Lungs', tip: 'This is where the dotted arrows from the pulmonary trunk lead. What organ picks up oxygen?' },
            { x: 343, y: 555, label: 'Aorta', tip: 'This red vessel arches over the top of the heart and leads out to the body.' },
            { x: 397, y: 662, label: 'Pulmonary trunk', tip: 'This blue vessel leaves the right ventricle. Where does it send blood?' },
            { x: 492, y: 716, label: 'Left atrium', tip: 'This is an upper chamber on the red side. Remember that the person’s left is on your right.' },
            { x: 273, y: 794, label: 'Right atrium', tip: 'This is an upper chamber on the blue side. Remember that the person’s right is on your left.' },
            { x: 573, y: 896, label: 'Left ventricle', tip: 'This is a lower chamber on the red side. It pumps blood into the aorta.' },
            { x: 391, y: 969, label: 'Right ventricle', tip: 'This is a lower chamber on the blue side. It pumps blood toward the lungs.' },
            { x: 390, y: 1282, label: 'Capillary beds', tip: 'This net of tiny vessels is out in the body’s tissues. Its color changes from red to blue as blood drops off oxygen.' }
          ],
          explain: 'Oxygen-poor blood comes back from the capillary beds to the right atrium and right ventricle, which pump it through the pulmonary trunk to the lungs. Oxygen-rich blood comes back to the left atrium and left ventricle, which pump it out through the aorta to the body.'
        },
        {
          type: 'choice',
          text: 'According to the Blood Flow diagram, where is blood oxygenated (where does it pick up oxygen)?',
          easy: 'Where does blood pick up oxygen?',
          options: ['In the lungs', 'In the capillary beds in the body’s tissues', 'In the right ventricle', 'In the aorta'], answer: 0,
          tip: 'Look at the words under “Blood Flow” at the very top of your handout, and reread the first bullet in the reading.',
          explain: 'Blood is oxygenated in the lungs. Then it comes back to the left side of the heart to be pumped to the body.'
        },
        {
          type: 'selects',
          text: 'Which side of the heart? Match each sentence to the right side or the left side of the heart.',
          easy: 'Is each sentence about the right side or the left side of the heart? Pick one for each.',
          options: ['Right side', 'Left side'],
          items: [
            { label: 'Pumps oxygen-poor blood to the lungs', answer: 'Right side', hint: 'Which side is blue in the diagram?' },
            { label: 'Pumps oxygen-rich blood to the body', answer: 'Left side', hint: 'Which side pumps into the aorta?' },
            { label: 'Gets blood back from the capillary beds in the body', answer: 'Right side', hint: 'Follow the dotted arrow from the blue end of the capillary bed. Which atrium does it go to?' },
            { support: false, label: 'Gets blood back from the lungs', answer: 'Left side', hint: 'Blood from the lungs is oxygen-rich. Which side is red?' }
          ]
        }
      ]
    },

    /* ---------------------------------------------------------------- Part 3 */
    {
      title: 'Internal view: blood vessels',
      intro: 'Now look inside the heart. In this part you will label the blood vessels that bring blood into the heart and carry it away. The chambers and valves are labeled for you. You will label those in the next part.',
      read: '<p><b>Read:</b> Blood vessels that bring blood <b>to</b> the heart are veins. Blood vessels that carry blood <b>away</b> from the heart are arteries.</p><ul>'
        + '<li><b>Into the right atrium:</b> the <b>superior vena cava</b> comes down from the top (the upper body), and the <b>inferior vena cava</b> comes up from below (the lower body).</li>'
        + '<li><b>Out of the right ventricle:</b> the <b>pulmonary trunk</b> carries blood up and splits into the <b>right pulmonary artery</b> and the <b>left pulmonary artery</b>, one for each lung.</li>'
        + '<li><b>Into the left atrium:</b> the <b>right pulmonary veins</b> and the <b>left pulmonary veins</b> bring blood back from the lungs.</li>'
        + '<li><b>Out of the left ventricle:</b> the <b>aorta</b> rises and curves over the top of the heart (the <b>aortic arch</b>), then runs down behind the heart (the <b>descending aorta</b>) to the rest of the body.</li></ul>'
        + '<p>Remember: right and left mean the <b>person’s</b> right and left, so the right pulmonary vessels are on <b>your left</b> in the diagram.</p>',
      questions: [
        {
          type: 'label',
          text: 'Label the blood vessels on the Internal View. Drag each label to the box with the matching number, then press “Check my labels.”',
          easy: 'Label the blood vessels on the inside view of the heart. Drag each label to the box with the same number. Then press “Check my labels.”',
          viewBox: '0 0 1095 1000',
          image: { src: 'media/label-heart-internal-vessels.jpg', width: 1095, height: 990 },
          alt: 'Cutaway drawing of the inside of the heart. The chambers and valves are labeled, and 9 blood vessels are numbered.',
          credit: 'Diagram: It’s Not Rocket Science®, The Cardiovascular System',
          spots: [
            { x: 205, y: 78, label: 'Right pulmonary artery', tip: 'This blue vessel branches off the pulmonary trunk and goes to a lung. The person’s right is on your left.' },
            { x: 405, y: 42, label: 'Superior vena cava', tip: 'This large blue vein comes down into the right atrium from the top. Superior or inferior?' },
            { x: 790, y: 48, label: 'Aorta (aortic arch)', tip: 'This big red vessel curves over the top of the heart.' },
            { x: 958, y: 128, label: 'Left pulmonary artery', tip: 'This blue vessel branches off the pulmonary trunk and goes to a lung. The person’s left is on your right.' },
            { x: 175, y: 250, label: 'Right pulmonary veins', tip: 'These vessels bring blood back from a lung. They are on your left, so which side of the person are they on?' },
            { x: 958, y: 318, label: 'Left pulmonary veins', tip: 'These vessels bring blood back from a lung into the left atrium. They are on your right.' },
            { x: 925, y: 465, label: 'Pulmonary trunk', tip: 'The arrow points to the big blue vessel just above the pulmonary valve, before it splits in two.' },
            { x: 173, y: 860, label: 'Inferior vena cava', tip: 'This large blue vein comes up into the right atrium from below. Superior or inferior?' },
            { x: 523, y: 960, label: 'Descending aorta', tip: 'This red vessel peeks out below the heart. It is the part of the largest artery that runs down to the body.' }
          ],
          explain: 'The superior and inferior venae cavae bring blood into the right atrium. The pulmonary trunk splits into the right and left pulmonary arteries, which go to the lungs. The pulmonary veins bring blood back to the left atrium. The aorta arches over the heart and then descends to the body.'
        },
        {
          type: 'selects',
          text: 'Does each vessel carry blood TO the heart or AWAY from the heart?',
          easy: 'Does each vessel bring blood to the heart, or take blood away from the heart? Pick one for each.',
          options: ['To the heart', 'Away from the heart'],
          items: [
            { label: 'Superior vena cava', answer: 'To the heart', hint: 'Is the vena cava a vein or an artery? Reread the first sentence of the reading.' },
            { label: 'Pulmonary arteries', answer: 'Away from the heart', hint: 'Reread the first sentence of the reading. What do arteries do?' },
            { label: 'Pulmonary veins', answer: 'To the heart', hint: 'Reread the first sentence of the reading. What do veins do?' },
            { label: 'Aorta', answer: 'Away from the heart', hint: 'The aorta leaves the left ventricle. Is it coming in or going out?' },
            { support: false, label: 'Inferior vena cava', answer: 'To the heart', hint: 'Which chamber does it lead into? Is the blood coming in or going out?' }
          ]
        },
        {
          support: false,
          type: 'choice',
          text: 'In the diagram, the pulmonary arteries are blue and the pulmonary veins are red. Why?',
          easy: 'In the diagram, the pulmonary arteries are blue. The pulmonary veins are red. Why?',
          options: [
            'The pulmonary arteries carry oxygen-poor blood to the lungs, and the pulmonary veins bring oxygen-rich blood back from the lungs.',
            'All arteries carry oxygen-poor blood, and all veins carry oxygen-rich blood.',
            'The pulmonary arteries carry blood to the body, and the pulmonary veins bring blood back from the body.'
          ], answer: 0,
          tip: 'Think about what happens to blood in the lungs. Is the blood going to the lungs or coming back from them?',
          explain: 'Right. Blood picks up oxygen in the lungs. So the vessels going to the lungs (pulmonary arteries) carry oxygen-poor blood, and the vessels coming back (pulmonary veins) carry oxygen-rich blood. Arteries and veins are named for direction (away from or to the heart), not for oxygen.'
        }
      ]
    },

    /* ---------------------------------------------------------------- Part 4 */
    {
      title: 'Internal view: chambers and valves',
      intro: 'Now label the chambers, the valves, and the other parts inside the heart. This time the blood vessels are labeled for you, so you can use them as clues.',
      read: '<p><b>Read:</b></p><ul>'
        + '<li><b>Chambers:</b> the two <b>atria</b> are on top, and the two <b>ventricles</b> are on the bottom. The <b>left ventricle</b> has the thickest wall, because it pumps blood out to the whole body.</li>'
        + '<li><b>Valves</b> are one-way doors. Blood passes through them in this order: <b>tricuspid</b> (right atrium to right ventricle), <b>pulmonary</b> (right ventricle to pulmonary trunk), <b>mitral or bicuspid</b> (left atrium to left ventricle), and <b>aortic</b> (left ventricle to aorta).</li>'
        + '<li>A valve is often named for where the blood goes next. The pulmonary valve opens into the pulmonary trunk, and the aortic valve opens into the aorta.</li>'
        + '<li><b>Chordae tendineae</b> are the thin, stringy cords that hold the tricuspid and mitral valves to the ventricle walls, so the valves do not flip back into the atria.</li>'
        + '<li>The <b>interventricular septum</b> is the thick wall that runs down the middle, between the two ventricles.</li></ul>',
      questions: [
        {
          type: 'label',
          text: 'Label the chambers, valves, and other parts on the Internal View. Drag each label to the box with the matching number, then press “Check my labels.” Use the labeled blood vessels as clues.',
          easy: 'Label the chambers, valves, and other parts inside the heart. Drag each label to the box with the same number. Then press “Check my labels.” The blood vessel names can help you.',
          viewBox: '0 0 1095 990',
          image: { src: 'media/label-heart-internal-chambers.jpg', width: 1095, height: 990 },
          alt: 'Cutaway drawing of the inside of the heart. The blood vessels are labeled, and 10 parts inside the heart are numbered.',
          credit: 'Diagram: It’s Not Rocket Science®, The Cardiovascular System',
          spots: [
            { x: 183, y: 444, label: 'Right atrium', tip: 'This is an upper chamber. The venae cavae empty into it. The person’s right is on your left.' },
            { x: 217, y: 524, label: 'Aortic valve', tip: 'Follow the arrow to the valve at the bottom of the big red vessel that arches over the heart.' },
            { x: 940, y: 572, label: 'Left atrium', tip: 'This is an upper chamber. The pulmonary veins empty into it.' },
            { x: 165, y: 610, label: 'Tricuspid valve', tip: 'This valve sits between the two chambers on the right side (your left).' },
            { x: 957, y: 665, label: 'Mitral (bicuspid) valve', tip: 'This valve sits between the two chambers on the left side (your right).' },
            { x: 123, y: 728, label: 'Chordae tendineae', tip: 'Follow the arrow to the thin strings that hold a valve to the ventricle wall.' },
            { x: 895, y: 758, label: 'Pulmonary valve', tip: 'Follow the arrow to the valve at the bottom of the blue pulmonary trunk.' },
            { x: 925, y: 850, label: 'Left ventricle', tip: 'This lower chamber has the thickest wall. The person’s left is on your right.' },
            { x: 350, y: 896, label: 'Right ventricle', tip: 'This is a lower chamber. The person’s right is on your left.' },
            { x: 895, y: 932, label: 'Interventricular septum', tip: 'Follow the arrow to the wall in the middle. What two chambers does it separate?' }
          ],
          explain: 'The atria are on top and the ventricles are on the bottom. The tricuspid valve is between the right atrium and right ventricle, the mitral (bicuspid) valve is between the left atrium and left ventricle, and the pulmonary and aortic valves open into the vessels they are named for. The chordae tendineae hold the valves in place, and the interventricular septum separates the two ventricles.'
        },
        {
          type: 'choice',
          text: 'What is the job of the chordae tendineae?',
          easy: 'What do the chordae tendineae do?',
          options: [
            'They hold the tricuspid and mitral valves in place so the valves do not flip backward.',
            'They carry oxygen-rich blood to the heart muscle.',
            'They form the wall between the right ventricle and the left ventricle.',
            'They pump blood out of the heart.'
          ], answer: 0,
          tip: 'Reread the bullet about the thin, stringy cords in the reading.',
          explain: 'The chordae tendineae are strong cords that hold the tricuspid and mitral valves to the ventricle walls, so blood cannot flow back into the atria.'
        },
        {
          support: false,
          type: 'choice',
          text: 'Which chamber has the thickest wall?',
          options: ['The left ventricle', 'The right ventricle', 'The left atrium', 'The right atrium'], answer: 0,
          tip: 'Reread the first bullet. Which chamber has to pump blood the farthest?',
          explain: 'The left ventricle has the thickest wall, because it pumps blood out through the aorta to the whole body.'
        }
      ]
    },

    /* ---------------------------------------------------------------- Part 5 */
    {
      title: 'External view',
      intro: 'Now look at the outside of the heart. Many of the blood vessels are the same ones you labeled inside, but now you see them from the outside. You will also find some new parts.',
      read: '<p><b>Read:</b> From the outside you cannot see the chambers or valves. You can see:</p><ul>'
        + '<li>The same large vessels as before: the <b>superior and inferior vena cava</b>, the <b>aorta</b> (the aortic arch on top and the descending aorta below), the <b>right and left pulmonary arteries</b>, and the <b>right and left pulmonary veins</b>.</li>'
        + '<li>The <b>auricles</b>: small, ear-shaped flaps on the outside of each atrium. The <b>auricle of the right atrium</b> is on the right side (your left), and the <b>auricle of the left atrium</b> is on the left side (your right).</li>'
        + '<li>The <b>coronary arteries</b> (red) and <b>cardiac veins</b> (blue) on the surface of the heart. They run side by side. The heart muscle needs its own blood supply, just like every other muscle. The <b>right coronary artery and anterior cardiac vein</b> run on the right side, and the <b>left coronary artery and great cardiac vein</b> run on the left side.</li>'
        + '<li>The <b>apex</b>: the pointed bottom tip of the heart. It points down and to the person’s left.</li></ul>',
      questions: [
        {
          type: 'label',
          text: 'Label the External View. Drag each label to the box with the matching number, then press “Check my labels.” The heart is drawn as if you are facing the person, so the heart’s right side is on your left.',
          easy: 'Label the outside of the heart. Drag each label to the box with the same number. Then press “Check my labels.” The heart’s right side is on your left.',
          viewBox: '0 0 766 850',
          image: { src: 'media/label-heart-external.jpg', width: 766, height: 850 },
          markerSize: 26,
          alt: 'Drawing of the outside of the heart with its large blood vessels and the small blood vessels on its surface, with 13 numbered parts',
          credit: 'Diagram: It’s Not Rocket Science®, The Cardiovascular System',
          spots: [
            { x: 91, y: 87, label: 'Right pulmonary artery', tip: 'This small blue vessel at the top goes to a lung. Is it on the person’s right or left?' },
            { x: 278, y: 43, label: 'Superior vena cava', tip: 'This large blue vein comes down into the heart from above.' },
            { x: 486, y: 45, label: 'Aorta (aortic arch)', tip: 'This big red vessel curves over the top of the heart.' },
            { x: 668, y: 107, label: 'Left pulmonary artery', tip: 'This blue vessel at the top goes to a lung. It is on your right, so which side of the person is it on?' },
            { x: 81, y: 223, label: 'Right pulmonary veins', tip: 'These small orange-red tubes bring blood back from a lung. They are on your left.' },
            { x: 656, y: 279, label: 'Auricle of left atrium', tip: 'This small, pale, ear-shaped flap is on your right side of the heart.' },
            { x: 66, y: 357, label: 'Auricle of right atrium', tip: 'This pale, ear-shaped flap is on your left side of the heart. The person’s right is on your left.' },
            { x: 668, y: 413, label: 'Left pulmonary veins', tip: 'These small orange-red tubes bring blood back from a lung. They are on your right.' },
            { x: 116, y: 547, label: 'Right coronary artery and anterior cardiac vein', tip: 'These small red and blue vessels run over the heart’s surface on your left side.' },
            { x: 656, y: 585, label: 'Left coronary artery and great cardiac vein', tip: 'These small red and blue vessels run over the heart’s surface on your right side.' },
            { x: 146, y: 725, label: 'Inferior vena cava', tip: 'This large blue vein comes up into the heart from below.' },
            { x: 301, y: 801, label: 'Aorta (descending)', tip: 'This red vessel peeks out below the heart. It is the part of the largest artery that runs down to the body.' },
            { x: 552, y: 793, label: 'Apex', tip: 'This arrow points to the bottom tip of the heart.' }
          ],
          explain: 'From the outside you can see the venae cavae, the aorta, and the pulmonary arteries and veins, plus the auricles on each atrium, the coronary arteries and cardiac veins on the surface, and the apex at the bottom tip.'
        },
        {
          type: 'choice',
          text: 'Why does the heart have its own coronary arteries on its surface?',
          easy: 'Why does the heart have coronary arteries on the outside of it?',
          options: [
            'The heart muscle needs its own supply of oxygen-rich blood.',
            'They carry oxygen-poor blood to the lungs.',
            'They hold the valves in place.',
            'They bring blood back from the legs.'
          ], answer: 0,
          tip: 'Reread the bullet about the coronary arteries. What do they bring blood to?',
          explain: 'The heart is a muscle that never stops working, so it needs oxygen too. The coronary arteries bring oxygen-rich blood to the heart muscle, and the cardiac veins carry the oxygen-poor blood away.'
        },
        {
          support: false,
          type: 'selects',
          text: 'Can you see it from the outside of the heart, or only from the inside? Sort each part.',
          easy: 'Can you see each part on the outside view, or only on the inside view? Pick one for each.',
          options: ['Outside view', 'Inside view only'],
          items: [
            { label: 'Apex', answer: 'Outside view', hint: 'Look at the bottom tip of the External View.' },
            { label: 'Tricuspid valve', answer: 'Inside view only', hint: 'Valves are between chambers. Can you see the chambers from the outside?' },
            { label: 'Auricle of right atrium', answer: 'Outside view', hint: 'Look for the ear-shaped flaps on the External View.' },
            { label: 'Interventricular septum', answer: 'Inside view only', hint: 'Where is this wall? Between which chambers?' }
          ]
        }
      ]
    },

    /* ---------------------------------------------------------------- Part 6 */
    {
      title: 'Follow a drop of blood',
      intro: 'Put it all together. Use all three diagrams to follow one drop of blood all the way around.',
      read: '<p><b>Read:</b> A drop of blood goes through the heart <b>twice</b> on each trip around the body: once through the right side on the way to the lungs, and once through the left side on the way to the body.</p>'
        + '<p>Each time, it goes into an <b>atrium</b> first, through a valve, into a <b>ventricle</b>, and then through another valve into an artery that leaves the heart. Use your labeled diagrams and the order of the valves from Part 4.</p>',
      questions: [
        {
          type: 'order',
          text: 'A drop of blood has just come back from the body. Put the stops in order, from first to last.',
          easy: 'A drop of blood just came back from the body. Put the places it goes in order, from first to last.',
          items: [
            'Superior or inferior vena cava',
            'Right atrium',
            'Tricuspid valve',
            'Right ventricle',
            'Pulmonary valve',
            'Pulmonary trunk and pulmonary arteries',
            'Lungs (blood picks up oxygen)',
            'Pulmonary veins',
            'Left atrium',
            'Mitral (bicuspid) valve',
            'Left ventricle',
            'Aortic valve',
            'Aorta',
            'Capillary beds in the body’s tissues'
          ],
          tip: 'Use the Blood Flow diagram. Remember: atrium, then valve, then ventricle, then valve, then out of the heart. The right side goes to the lungs first.',
          explain: 'Body → venae cavae → right atrium → tricuspid valve → right ventricle → pulmonary valve → pulmonary trunk and arteries → lungs → pulmonary veins → left atrium → mitral valve → left ventricle → aortic valve → aorta → capillary beds in the body.'
        },
        {
          type: 'highlight',
          examples: 'Examples: “According to the diagram,” “The diagram shows that,” “For example,” “The arrows show,” or “This shows that.”',
          text: 'A drop of blood comes back from your toes in the inferior vena cava. Describe its trip through the heart and lungs until it leaves the heart through the aorta. Name each chamber and valve it passes through, and tell where it picks up oxygen. Use the diagrams as your evidence, along with transition words that point to your evidence, such as “According to the diagram, …” (4 to 6 sentences)',
          easy: 'A drop of blood comes back from your toes in the inferior vena cava. Tell where it goes in the heart and lungs until it leaves through the aorta. Name each chamber and valve. Tell where it picks up oxygen. Use the diagrams as evidence. Start your evidence with words like “According to the diagram, …” (4 to 6 sentences)',
          starters: [
            'First, the drop of blood enters the …',
            'According to the diagram, it passes through the … valve into the …',
            'Next, the blood is pumped to the lungs, where …',
            'The diagram shows that the blood comes back to the heart through …',
            'Finally, the left ventricle pumps the blood through the …'
          ],
          min: 200,
          ideas: [
            { done: 'You described the right side of the heart.', q: 'Did you name the chambers on the right side of the heart?', tip: 'Where does the inferior vena cava empty? Which chamber is below that one?', all: [/right/, /atri(um|a)|ventricle/] },
            { done: 'You named a valve on the right side.', q: 'Did you name the valves on the right side?', tip: 'Which valve is between the two right chambers? Which one opens into the pulmonary trunk?', re: /tricusp|pulmonary valve/ },
            { done: 'You told where blood picks up oxygen.', q: 'Did you say where the blood picks up oxygen?', tip: 'Where does the pulmonary trunk send the blood? What happens there?', all: [/lungs?/, /oxygen/] },
            { done: 'You described the left atrium.', q: 'Did you say where blood enters the left side of the heart?', tip: 'Where do the pulmonary veins bring the blood back to?', all: [/left/, /atri(um|a)/] },
            { done: 'You named a valve on the left side.', q: 'Did you name the valves on the left side?', tip: 'Which valve is between the two left chambers? Which one opens into the aorta?', re: /mitral|bicusp|aortic valve/ },
            { done: 'You wrote at least 2 sentences.', q: 'Did you write at least 2 sentences?', tip: 'Give each step of the trip its own sentence.', sentences: 2 },
            { done: 'You used transition words to point to your evidence.', q: 'Did you use transition words to point to your evidence?', tip: 'Introduce your evidence with words like “According to the diagram,” or “The arrows show.”', writing: true, re: /for example|for instance|according to|this shows|that shows|which shows|shows that|evidence|in the (diagram|picture|drawing)|the (diagram|picture|drawing|arrows?|key) (says|said|shows|showed|explains|labels|points)|such as|as an example|one example|proves?|this means|supports?/ },
            { done: 'You highlighted your transition words in yellow.', q: 'Did you highlight your transition words in yellow?', tip: 'Go back and select the transition words that point to your evidence, then press the yellow button.', highlight: true }
          ]
        }
      ]
    }
  ]
};
