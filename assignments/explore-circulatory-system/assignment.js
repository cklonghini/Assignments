/*
  Explore - Circulatory System (Anatomy and Physiology B)
  Everything a student sees in this assignment is written here. The shared engine in /engine builds the page,
  the progress bars, the PDF, the Listen buttons, and the captions from this file.
  Video: Amoeba Sisters, "Circulatory System and Pathway of Blood Through the Heart". Captions come from the
  teacher's transcript (source/transcript.txt, not saved to GitHub).
  Text rules: *text* is shown in italics (use it for scientific names). Reading boxes (read) and tables use HTML.
*/
window.ASSIGNMENT = {
  title: 'Explore - Circulatory System',
  course: 'Anatomy and Physiology B',
  storageKey: 'explore-circulatory-system-v1',

  icon: '<svg viewBox="0 0 64 72" aria-hidden="true" focusable="false">'
    + '<path d="M32 64 C10 48 4 36 4 25 C4 15 12 9 20 9 C26 9 30 13 32 17 C34 13 38 9 44 9 C52 9 60 15 60 25 C60 36 54 48 32 64 Z" fill="var(--ligand)"/>'
    + '<path d="M11 33 H23 L27 25 L33 41 L37 33 H53" fill="none" stroke="var(--primary-ink)" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"/></svg>',

  video: {
    title: 'Circulatory System and Pathway of Blood Through the Heart',
    src: 'media/circulatory-video.mp4',
    seconds: 494
  },

  /* short clips, one or two per part. from/to are the times in the full video (they are shown to students). */
  clips: {
    vessels: { src: 'media/clip-vessels.mp4', from: 174.0, to: 203.0, seconds: 29, title: 'Arteries, veins, and capillaries' },
    blood:   { src: 'media/clip-blood.mp4',   from: 54.0,  to: 154.0, seconds: 100, title: 'What blood is and what it does' },
    heart:   { src: 'media/clip-heart.mp4',   from: 154.0, to: 249.0, seconds: 95, title: 'The heart: sides, chambers, vessels, and valves' },
    septal:  { src: 'media/clip-septal.mp4',  from: 421.0, to: 463.0, seconds: 42, title: 'Atrial septal defect' },
    pathway: { src: 'media/clip-pathway.mp4', from: 249.0, to: 330.0, seconds: 81, title: 'Tracing the pathway of blood from a toe' },
    recap:   { src: 'media/clip-recap.mp4',   from: 330.0, to: 389.0, seconds: 59, title: 'Coronary arteries and the quiz-yourself recap' }
  },

  parts: [
    /* ---------------------------------------------------------------- Part 1 */
    {
      title: 'Circulatory system vocabulary',
      intro: 'You will say each word and its meaning out loud. Saying words out loud helps your brain remember them, and it lets your teacher hear from you. Find a spot where you can talk, and make sure your microphone works.',
      clips: ['vessels'],
      read: '<p><b>Read:</b> These are the 15 words for this unit.</p><ul>'
        + '<li><b>Artery</b>: a blood vessel that carries blood away from the heart. Except for the pulmonary artery, all arteries carry oxygen-rich blood.</li>'
        + '<li><b>Atrium</b>: either of the two upper chambers of the heart that receives blood from veins. (More than one atrium are called atria.)</li>'
        + '<li><b>Blood vessel</b>: a tube in the body through which blood flows. Adults have over 40 billion blood vessels. Stretched end to end, they would circle the Earth four times!</li>'
        + '<li><b>Capillary</b>: a tiny blood vessel. Capillaries exchange oxygen, glucose, and other materials with body cells.</li>'
        + '<li><b>Circulatory system</b>: the body system that includes the heart, blood vessels, and blood. It brings oxygen and nutrients to cells and carries away carbon dioxide, urea, and other wastes.</li>'
        + '<li><b>Heart</b>: the muscular organ that pumps blood throughout the body. It has four chambers: the right atrium, right ventricle, left atrium, and left ventricle.</li>'
        + '<li><b>Heart valves</b>: structures that open and close to control blood flow through the heart. They let blood flow in only one direction.</li>'
        + '<li><b>Platelet</b>: a small blood cell that helps the blood to clot.</li>'
        + '<li><b>Pulmonary artery</b>: the artery that carries blood from the right ventricle to the lungs.</li>'
        + '<li><b>Pulmonary vein</b>: the vein that carries blood from the lungs to the left atrium.</li>'
        + '<li><b>Red blood cell</b>: a blood cell that carries oxygen throughout the body.</li>'
        + '<li><b>Urea</b>: a waste product in the blood that comes from the breakdown of proteins.</li>'
        + '<li><b>Ventricle</b>: either of the two lower chambers of the heart that pumps blood through arteries.</li>'
        + '<li><b>Vein</b>: a blood vessel that carries blood to the heart. Except for the pulmonary vein, all veins carry oxygen-poor blood.</li>'
        + '<li><b>White blood cell</b>: a blood cell that fights infection by destroying microscopic, disease-causing organisms.</li></ul>'
        + '<p><b>How the speaking cards work:</b> Press <b>Say it</b>, then say the word and its definition. The card turns green when it hears the word and its key idea. If your browser asks to use the microphone, choose <b>Allow</b>.</p>'
        + '<p>If your microphone isn’t working, reach out to IT to get it working. It’s so important for us to hear from you in our online school, so you’ll need a working microphone to finish this activity.</p>',
      questions: [
        {
          type: 'speak',
          text: 'Round 1: Read each card out loud. Say the word, then read its definition.',
          cards: [
            { term: 'Artery', def: 'A blood vessel that carries blood away from the heart.',
              say: /\barter(y|ies)\b|\bart[ae]ry\b/, keys: [/\baway\b/, /\bhearts?\b/] },
            { term: 'Atrium', def: 'Either of the two upper chambers of the heart that receives blood from veins.',
              say: /\batri(um|a|al|ums)\b|\ba tree (um|am|em)\b|\bay tree um\b/, keys: [/\b(upper|top)\b/, /\bchambers?\b/] },
            { term: 'Blood vessel', def: 'A tube in the body through which blood flows.',
              say: /\bblood vessels?\b/, keys: [/\b(tube|tubes|pipe|pipes)\b/, /\b(flow|flows|flowing|travels?|moves?|goes)\b/] },
            { term: 'Capillary', def: 'A tiny blood vessel.',
              say: /\bcapillar(y|ies)\b|\bcap[aei]l+ar(y|ies)\b|\bcapillary\b/, keys: [/\b(tiny|small|smallest|little)\b/, /\b(vessels?|tubes?)\b/] },
            { term: 'Circulatory system', def: 'The body system that includes the heart, blood vessels, and blood.',
              say: /\bcirculat(ory|ion|ary|ery)\b/, keys: [/\bhearts?\b/, /\bvessels?\b/] },
            { term: 'Heart', def: 'The muscular organ that pumps blood throughout the body.',
              say: /\bhearts?\b|\bhart\b/, keys: [/\b(muscular|muscle|muscles)\b/, /\b(pump|pumps|pumping)\b/] },
            { term: 'Heart valves', def: 'Structures that open and close to control blood flow through the heart.',
              say: /\bvalves?\b/, keys: [/\b(open|opens|opening)\b/, /\b(close|closes|closed|closing)\b/] },
            { term: 'Platelet', def: 'A small blood cell that helps the blood to clot.',
              say: /\bplatelets?\b|\bplate lets?\b|\bplaylets?\b/, keys: [/\b(clot|clots|clotting|clotted|clock|klott?)\b/] },
            { term: 'Pulmonary artery', def: 'The artery that carries blood from the right ventricle to the lungs.',
              say: /\bpulmonary arter(y|ies)\b|\bpulmonary art[ae]ry\b/, keys: [/\bventricles?\b|\bventrical\b|\bright\b/, /\blungs?\b/] },
            { term: 'Pulmonary vein', def: 'The vein that carries blood from the lungs to the left atrium.',
              say: /\bpulmonary (vein|veins|vain|vane)\b/, keys: [/\blungs?\b/, /\batri(um|a)\b|\bleft\b/] },
            { term: 'Red blood cell', def: 'A blood cell that carries oxygen throughout the body.',
              say: /\bred blood cells?\b|\bred blood sells?\b/, keys: [/\boxygen\b/] },
            { term: 'Urea', def: 'A waste product in the blood that comes from the breakdown of proteins.',
              say: /\burea\b|\buria\b|\byuria\b|\byou ?r[ei]a\b|\byour ?[ei]a\b|\bu r e a\b|\bureah?\b/, keys: [/\bwastes?\b/, /\bproteins?\b/] },
            { term: 'Ventricle', def: 'Either of the two lower chambers of the heart that pumps blood through arteries.',
              say: /\bventric(le|les|al|als)\b/, keys: [/\b(lower|bottom)\b/, /\bchambers?\b/] },
            { term: 'Vein', def: 'A blood vessel that carries blood to the heart.',
              say: /\b(vein|veins|vain|vane|vains|vanes)\b/, keys: [/\b(to|toward|towards|back|into|returns?)\b/, /\bhearts?\b/], not: /\baway\b/ },
            { term: 'White blood cell', def: 'A blood cell that fights infection by destroying microscopic, disease-causing organisms.',
              say: /\bwhite blood cells?\b|\bwhite blood sells?\b/, keys: [/\b(infections?|disease|diseases|germs?|fights?|fighting|destroys?)\b/] }
          ]
        },
        {
          type: 'speak',
          memory: true,
          text: 'Round 2: Now say each word and its meaning from memory. The definition is hidden. If you get stuck, press Peek, but try first. Your own words are fine if they keep the key idea.',
          cards: [
            { term: 'Artery', def: 'A blood vessel that carries blood away from the heart.',
              say: /\barter(y|ies)\b|\bart[ae]ry\b/, keys: [/\baway\b/, /\bhearts?\b/] },
            { term: 'Atrium', def: 'Either of the two upper chambers of the heart that receives blood from veins.',
              say: /\batri(um|a|al|ums)\b|\ba tree (um|am|em)\b|\bay tree um\b/, keys: [/\b(upper|top)\b/, /\bchambers?\b/] },
            { term: 'Blood vessel', def: 'A tube in the body through which blood flows.',
              say: /\bblood vessels?\b/, keys: [/\b(tube|tubes|pipe|pipes)\b/] },
            { term: 'Capillary', def: 'A tiny blood vessel.',
              say: /\bcapillar(y|ies)\b|\bcap[aei]l+ar(y|ies)\b|\bcapillary\b/, keys: [/\b(tiny|small|smallest|little)\b/] },
            { term: 'Circulatory system', def: 'The body system that includes the heart, blood vessels, and blood.',
              say: /\bcirculat(ory|ion|ary|ery)\b/, keys: [/\bhearts?\b/, /\b(vessels?|blood)\b/] },
            { term: 'Heart', def: 'The muscular organ that pumps blood throughout the body.',
              say: /\bhearts?\b|\bhart\b/, keys: [/\b(pump|pumps|pumping)\b/] },
            { term: 'Heart valves', def: 'Structures that open and close to control blood flow through the heart.',
              say: /\bvalves?\b/, keys: [/\b(open|opens|opening|close|closes|closed|closing|one way|one direction|backflow|back flow)\b/] },
            { term: 'Platelet', def: 'A small blood cell that helps the blood to clot.',
              say: /\bplatelets?\b|\bplate lets?\b|\bplaylets?\b/, keys: [/\b(clot|clots|clotting|clotted|clock|klott?)\b/] },
            { term: 'Pulmonary artery', def: 'The artery that carries blood from the right ventricle to the lungs.',
              say: /\bpulmonary arter(y|ies)\b|\bpulmonary art[ae]ry\b/, keys: [/\blungs?\b/] },
            { term: 'Pulmonary vein', def: 'The vein that carries blood from the lungs to the left atrium.',
              say: /\bpulmonary (vein|veins|vain|vane)\b/, keys: [/\blungs?\b/] },
            { term: 'Red blood cell', def: 'A blood cell that carries oxygen throughout the body.',
              say: /\bred blood cells?\b|\bred blood sells?\b/, keys: [/\boxygen\b/] },
            { term: 'Urea', def: 'A waste product in the blood that comes from the breakdown of proteins.',
              say: /\burea\b|\buria\b|\byuria\b|\byou ?r[ei]a\b|\byour ?[ei]a\b|\bu r e a\b|\bureah?\b/, keys: [/\bwastes?\b/] },
            { term: 'Ventricle', def: 'Either of the two lower chambers of the heart that pumps blood through arteries.',
              say: /\bventric(le|les|al|als)\b/, keys: [/\b(lower|bottom)\b/] },
            { term: 'Vein', def: 'A blood vessel that carries blood to the heart.',
              say: /\b(vein|veins|vain|vane|vains|vanes)\b/, keys: [/\b(to|toward|towards|back|into|returns?)\b/, /\bhearts?\b/], not: /\baway\b/ },
            { term: 'White blood cell', def: 'A blood cell that fights infection by destroying microscopic, disease-causing organisms.',
              say: /\bwhite blood cells?\b|\bwhite blood sells?\b/, keys: [/\b(infections?|disease|diseases|germs?|fights?|fighting|destroys?|sick|sickness)\b/] }
          ]
        },
        {
          type: 'selects',
          text: 'Match each description to the correct word: the heart and blood vessels.',
          options: ['Artery', 'Atrium', 'Blood vessel', 'Capillary', 'Heart', 'Heart valves', 'Pulmonary artery', 'Pulmonary vein', 'Vein', 'Ventricle'],
          items: [
            { label: 'Carries blood away from the heart', answer: 'Artery', hint: 'The video says to think “A” for away.' },
            { label: 'Carries blood to the heart', answer: 'Vein', hint: 'This is the opposite of the vessel that carries blood away.' },
            { label: 'A tiny blood vessel', answer: 'Capillary', hint: 'Look for the smallest vessel in the reading.' },
            { label: 'Any tube that blood flows through', answer: 'Blood vessel', hint: 'This is the general word that covers all three kinds of tubes.' },
            { label: 'An upper chamber of the heart', answer: 'Atrium', hint: 'A comes before V in the alphabet, and this chamber is on top.' },
            { label: 'A lower chamber of the heart', answer: 'Ventricle', hint: 'A comes before V in the alphabet. Which chamber is on the bottom?' },
            { label: 'The muscular organ that pumps blood', answer: 'Heart', hint: 'Which organ is the pump for the whole system?' },
            { label: 'Open and close so blood flows in one direction', answer: 'Heart valves', hint: 'Look for the structures that work like one-way doors.' },
            { label: 'Carries blood from the right ventricle to the lungs', answer: 'Pulmonary artery', hint: '“Pulmonary” means lungs. Is this blood moving away from the heart or toward it?' },
            { label: 'Carries blood from the lungs to the left atrium', answer: 'Pulmonary vein', hint: '“Pulmonary” means lungs. Is this blood moving away from the heart or toward it?' }
          ]
        },
        {
          type: 'selects',
          text: 'Match each description to the correct word: the blood and the whole system.',
          options: ['Circulatory system', 'Platelet', 'Red blood cell', 'Urea', 'White blood cell'],
          items: [
            { label: 'Carries oxygen throughout the body', answer: 'Red blood cell', hint: 'Which blood cell does the transporting of gases?' },
            { label: 'Fights infection', answer: 'White blood cell', hint: 'Which blood cell protects you from disease-causing organisms?' },
            { label: 'Helps the blood to clot', answer: 'Platelet', hint: 'Look for the small cell that helps when you get a cut.' },
            { label: 'A waste from the breakdown of proteins', answer: 'Urea', hint: 'Look for the waste product in the reading.' },
            { label: 'The heart, blood vessels, and blood together', answer: 'Circulatory system', hint: 'Which word names the whole body system?' }
          ]
        }
      ]
    },

    /* ---------------------------------------------------------------- Part 2 */
    {
      title: 'Blood',
      clips: ['blood'],
      read: '<p><b>Read:</b> Human blood is always red. Its shade of red changes with how much oxygen it carries. Diagrams draw blood blue or red only to show lower or higher oxygen. Veins under your skin can look blue or green, but the blood inside them is red.</p>'
        + '<p>Blood helps keep your body in balance (homeostasis). It keeps a certain pH, temperature, and osmotic pressure, and it transports hormones, nutrients, and gases.</p>'
        + '<ul><li><b>Plasma</b> is the liquid portion of blood. It holds water, proteins, salts, and lipids.</li>'
        + '<li><b>Red blood cells</b> transport gases. They contain <b>hemoglobin</b>, an iron-containing protein that gives blood its red color.</li>'
        + '<li><b>White blood cells</b> fight infections.</li>'
        + '<li><b>Platelets</b> are cell fragments that help your blood clot when the body is damaged.</li></ul>',
      questions: [
        {
          type: 'choice',
          text: 'True or false: The blood in your veins is blue.',
          options: ['True', 'False'], answer: 1,
          explain: 'The video calls this a misconception. Human blood is always red. Diagrams use blue only to show blood with less oxygen.',
          tip: 'Listen to the very start of the clip. The video names this as a common misconception.'
        },
        {
          type: 'selects',
          text: 'Match each part of blood to what it does.',
          options: ['Plasma', 'Platelets', 'Red blood cells', 'White blood cells'],
          items: [
            { label: 'The liquid portion, with water, proteins, salts, and lipids', answer: 'Plasma', hint: 'Which part is not a cell at all?' },
            { label: 'Transport gases like oxygen', answer: 'Red blood cells', hint: 'Which cells carry the iron-containing protein?' },
            { label: 'Fight infections', answer: 'White blood cells', hint: 'Which cells protect your body from germs?' },
            { label: 'Cell fragments that help blood clot', answer: 'Platelets', hint: 'The video says these are not whole cells. They are pieces of cells.' }
          ]
        },
        {
          type: 'choice',
          text: 'What gives blood its red color?',
          options: ['Hemoglobin, an iron-containing protein in red blood cells', 'Plasma, the liquid part of blood', 'Platelets, when they clot', 'Oxygen stored in white blood cells'],
          answer: 0,
          explain: 'Red blood cells have hemoglobin, an iron-containing protein, and that is where the red coloring comes from.',
          tip: 'Listen near the end of the clip, right after platelets. The video names a protein with iron in it.'
        },
        {
          type: 'multi',
          text: 'Which of these are jobs of blood that the video names? Choose every one that fits.',
          options: ['Keeps a certain pH', 'Keeps a certain temperature', 'Transports hormones, nutrients, and gases', 'Digests food', 'Builds bones'],
          answers: ['Keeps a certain pH', 'Keeps a certain temperature', 'Transports hormones, nutrients, and gases'],
          rules: [{ any: ['Digests food', 'Builds bones'], tip: 'Check each choice against the reading. Are any of the ones you chose jobs of a different body system?' }],
          tip: 'Every choice you made is right, but there are more. Reread the second paragraph of the reading.',
          explain: 'Blood keeps a certain pH, temperature, and osmotic pressure for homeostasis, and it transports hormones, nutrients, and gases.'
        }
      ]
    },

    /* ---------------------------------------------------------------- Part 3 */
    {
      title: 'The heart',
      clips: ['heart', 'septal'],
      read: '<p><b>Read:</b> The heart has two sides that are kept separate. The <b>right side</b> pumps deoxygenated (oxygen-poor) blood, and the <b>left side</b> pumps oxygenated (oxygen-rich) blood. In a drawing, the heart’s right side is on <i>your</i> left, because you are facing the person.</p>'
        + '<p>The heart has four chambers. A comes before V in the alphabet, so the <b>atria</b> are at the top and the <b>ventricles</b> are at the bottom. Atria have thinner walls than ventricles.</p>'
        + '<p><b>Arteries</b> carry blood away from the heart (think “A” for away). <b>Veins</b> carry blood to the heart. <b>Capillaries</b> are small vessels where oxygen is delivered to organs and tissues and carbon dioxide is picked up. <b>Valves</b> are one-way structures that separate the chambers and prevent backflow of blood.</p>'
        + '<p>The <b>septum</b> is the muscular wall that separates the right and left sides of the heart. In an <b>atrial septal defect</b>, there is an opening in the septum, so oxygen-rich blood can mix with oxygen-poor blood.</p>',
      questions: [
        {
          type: 'label',
          text: 'Label the heart. Drag each label to the box with the matching number, then press “Check my labels.” The heart is drawn as if you are facing the person, so the heart’s right side is on your left.',
          viewBox: '-150 0 1092 1006',
          image: { src: 'media/heart-diagram.webp', width: 792, height: 1006 },
          alt: 'Cutaway drawing of the human heart with 13 numbered parts',
          legend: '<span><span class="sw" style="background:#1e8fd6"></span>Oxygen-poor blood</span><span><span class="sw" style="background:#d61f45"></span>Oxygen-rich blood</span><span>Diagram colors only. Real blood is always red.</span>',
          credit: 'Heart illustration: Shutterstock',
          spots: [
            { x: 185, y: 500, label: 'Right atrium', tip: 'This is an upper chamber (A comes before V). Remember that the person’s right side is on your left.' },
            { x: 330, y: 730, label: 'Right ventricle', tip: 'This is a lower chamber on the side that pumps oxygen-poor blood.' },
            { x: 510, y: 400, label: 'Left atrium', tip: 'This upper chamber gets blood coming back from the lungs.' },
            { x: 610, y: 720, label: 'Left ventricle', tip: 'This lower chamber pumps blood out through the aortic valve.' },
            { x: 300, y: 225, label: 'Aorta', tip: 'This is the major artery that carries oxygenated blood throughout the body.' },
            { x: 530, y: 215, label: 'Pulmonary artery', tip: 'This vessel carries blood away from the heart. “Pulmonary” likely involves the lungs.' },
            { x: 880, y: 370, label: 'Pulmonary veins', tip: 'These vessels bring blood back to the heart. Where is that blood coming from?', to: [[705, 328], [718, 410]] },
            { x: 190, y: 300, label: 'Superior vena cava', tip: 'This vein brings blood back from the body. Is it above or below the heart?' },
            { x: 155, y: 860, label: 'Inferior vena cava', tip: 'This vein brings blood back from the body. Is it above or below the heart?' },
            { x: -85, y: 720, label: 'Tricuspid valve', tip: 'Which two chambers does this valve sit between? Which side of the heart is it on?', to: [[205, 692]] },
            { x: 880, y: 560, label: 'Mitral (bicuspid) valve', tip: 'Which two chambers does this valve sit between? Which side of the heart is it on?', to: [[540, 545]] },
            { x: -85, y: 560, label: 'Aortic valve', tip: 'This valve sits where blood leaves a ventricle. Which vessel is on the other side of it?', to: [[322, 580]] },
            { x: 488, y: 790, label: 'Septum', tip: 'This is the muscular wall between the two lower chambers.' }
          ],
          explain: 'The right side (the person’s right) pumps deoxygenated blood, and the left side pumps oxygenated blood. The atria are on top and the ventricles are on the bottom. The valves are one-way and prevent backflow, and the septum separates the right and left sides.'
        },
        {
          type: 'selects',
          text: 'Arteries, veins, or capillaries? Match each description.',
          options: ['Arteries', 'Capillaries', 'Veins'],
          items: [
            { label: 'Generally carry blood away from the heart', answer: 'Arteries', hint: 'The video gives a memory trick: think of the first letter.' },
            { label: 'Generally carry blood to the heart', answer: 'Veins', hint: 'This is the opposite of the vessels that carry blood away.' },
            { label: 'Where oxygen is delivered to tissues and carbon dioxide is picked up', answer: 'Capillaries', hint: 'Which vessels are the smallest? The exchange happens at their level.' }
          ]
        },
        {
          type: 'choice',
          text: 'Which chambers of the heart have thinner walls?',
          options: ['The atria', 'The ventricles'], answer: 0,
          explain: 'The atria have thinner walls than the thicker-walled ventricles.',
          tip: 'Listen right after the A-before-V memory trick in the clip.'
        },
        {
          type: 'choice',
          text: 'What do the heart’s valves do?',
          options: ['They are one-way structures that prevent backflow of blood', 'They add oxygen to the blood', 'They pump blood to the lungs', 'They make new red blood cells'],
          answer: 0,
          explain: 'Valves are one-way structures that help separate the chambers and prevent backflow of blood.',
          tip: 'Listen to the very end of the first clip, just before “the adventure of a lifetime.”'
        },
        {
          type: 'choice',
          text: 'What can happen in an atrial septal defect?',
          options: ['An opening in the septum lets oxygen-rich blood mix with oxygen-poor blood', 'A heart valve stops opening', 'The aorta becomes blocked', 'The heart grows a fifth chamber'],
          answer: 0,
          explain: 'The septum is the muscular wall between the right and left sides. A septal defect can mean an opening, so oxygen-rich and oxygen-poor blood can mix.',
          tip: 'Watch the second clip. What does the septum normally keep apart?'
        }
      ]
    },

    /* ---------------------------------------------------------------- Part 4 */
    {
      title: 'The pathway of blood',
      clips: ['pathway', 'recap'],
      read: '<p><b>Read:</b> The video follows blood that starts in a human toe. That blood is deoxygenated. It has to get to the heart, be pumped to the lungs to pick up oxygen, come back to the heart, and then be pumped out to the whole body.</p>'
        + '<p>Each time a chamber contracts, it pushes blood through a valve into the next place. When you see the word “pulmonary,” it likely involves the lungs.</p>'
        + '<p>The heart muscle needs its own blood supply too. <b>Coronary arteries</b> branch off the aorta and deliver blood to capillaries that bring oxygen and glucose to the heart. <b>Coronary veins</b> take the deoxygenated blood back to the right atrium.</p>',
      questions: [
        {
          type: 'order',
          text: 'Put the stops in order, starting with blood coming back from the body.',
          items: ['Vena cava', 'Right atrium', 'Tricuspid valve', 'Right ventricle', 'Pulmonary valve', 'Pulmonary artery', 'Lungs', 'Pulmonary vein', 'Left atrium', 'Mitral (bicuspid) valve', 'Left ventricle', 'Aortic valve', 'Aorta'],
          tip: 'Each chamber pushes blood through a valve before it moves on. The quiz-yourself part of the second clip says the stops in order.',
          explain: 'Blood comes back from the body through the vena cava into the right side, goes to the lungs for oxygen, returns to the left side, and leaves through the aorta.'
        },
        {
          type: 'selects',
          text: 'Is the blood in each place oxygen-rich or oxygen-poor?',
          options: ['Oxygen-poor', 'Oxygen-rich'],
          items: [
            { label: 'Blood leaving the toe on its way to the heart', answer: 'Oxygen-poor', hint: 'The toe has used up oxygen. The video says this blood is deoxygenated.' },
            { label: 'The right ventricle', answer: 'Oxygen-poor', hint: 'Which side of the heart pumps deoxygenated blood?' },
            { label: 'The pulmonary artery', answer: 'Oxygen-poor', hint: 'This is one of the exceptions. Has this blood been to the lungs yet?' },
            { label: 'The pulmonary vein', answer: 'Oxygen-rich', hint: 'This is one of the exceptions. Where is this blood coming from?' },
            { label: 'The left atrium', answer: 'Oxygen-rich', hint: 'Which side of the heart pumps oxygenated blood?' },
            { label: 'The aorta', answer: 'Oxygen-rich', hint: 'The aorta carries blood out to the whole body. What does the body need from it?' }
          ]
        },
        {
          type: 'choice',
          text: 'How does the heart muscle itself get oxygen and glucose?',
          options: ['Coronary arteries branch off the aorta and deliver blood to capillaries in the heart', 'It soaks up oxygen from the blood inside its chambers', 'The pulmonary vein delivers it straight to the heart muscle', 'The heart muscle doesn’t need oxygen'],
          answer: 0,
          explain: 'Coronary arteries branch off the aorta and deliver blood into capillaries, which bring oxygen and glucose to the heart.',
          tip: 'Watch the start of the second clip. The heart needs its own blood supply. Which vessels does the video name?'
        },
        {
          type: 'mnemonic',
          text: 'Make your own memory trick for the pathway of blood. Write a silly sentence with one word in each box. Each word must start with the same letter as its step.',
          words: ['Right atrium', 'Tricuspid valve', 'Right ventricle', 'Pulmonary valve', 'Pulmonary artery', 'Lungs', 'Pulmonary vein', 'Left atrium', 'Mitral valve', 'Left ventricle', 'Aortic valve', 'Aorta']
        },
        {
          type: 'highlight',
          text: 'Follow the blood from the video’s toe all the way through the heart and lungs and back out to the body. Name the vessels, chambers, and valves it passes through, and tell where it picks up oxygen. Use evidence from the video and highlight it in yellow. (3 to 5 sentences)',
          min: 150,
          ideas: [
            { done: 'You told how the blood gets back to the heart.', q: 'Did you name the vein that brings blood from the toe to the heart?', tip: 'The video names a large vein, and says which one (superior or inferior) the toe blood uses.', re: /vena|cava/ },
            { done: 'You named the vessel that takes blood to the lungs.', q: 'Did you say how the blood gets from the right ventricle to the lungs?', tip: 'Remember that “pulmonary” likely involves the lungs. Is this vessel an artery or a vein?', re: /pulmonary\s*arter/ },
            { done: 'You told where and how the blood picks up oxygen.', q: 'Did you say where the blood becomes oxygenated?', tip: 'Rewatch the part about the red blood cells taking on one gas and releasing another.', re: /(lungs?[^.!?]*(oxygen|o2)|(oxygen|o2)[^.!?]*lungs?)/ },
            { done: 'You told how the blood leaves for the body.', q: 'Did you name the major artery that carries blood out to the body?', tip: 'Listen for the last stop before the blood heads out to the body.', re: /aort/ },
            { done: 'You wrote at least 2 sentences.', q: 'Did you write at least 2 sentences?', tip: 'Follow the blood one stop at a time, with a sentence for each part of the trip.', sentences: 2 },
            { done: 'You highlighted your evidence in yellow.', q: 'Did you highlight your evidence?', tip: 'Select the words that come from the video, then press the yellow button.', highlight: true }
          ]
        }
      ]
    },

    /* ---------------------------------------------------------------- Part 5 */
    {
      title: 'Blood typing lab',
      intro: 'The video showed that all human blood does the same jobs. But not all blood is the same. In this lab, you will find out how blood types differ and why matching them can save a life.',
      read: '<p><b>Read:</b> Your red blood cells carry markers on their surface called <b>antigens</b>. The two main markers are <b>A</b> and <b>B</b>. Your cells may have A, B, both (type AB), or neither (type O). A third marker, <b>Rh</b>, makes your blood type positive (+) if you have it and negative (−) if you don’t. So there are 8 main blood types: A+, A−, B+, B−, AB+, AB−, O+, and O−.</p>'
        + '<p>Your immune system knows your own markers. If you get blood with a marker your cells don’t have, your body treats it as an invader. Antibodies grab onto those red blood cells and make them <b>clump</b> together and break apart. That can be very dangerous. So before a transfusion, hospitals test blood types and match them.</p>'
        + '<p>To test blood, scientists add drops of <b>anti-serum</b>. Anti-A serum makes blood clump if the cells have the A marker. Anti-B clumps cells with the B marker. Anti-Rh clumps cells with the Rh marker. If the blood stays smooth, that marker is not there.</p>'
        + '<p>Blood type is something you inherit from your parents. Besides A, B, and Rh, scientists have found more than 40 other blood group systems, with hundreds of markers. Put them all together, and your blood is one more thing that makes you uniquely you.</p>',
      tableHtml: '<table><caption style="text-align:left;font-weight:700;padding:6px 0">How common is each blood type in the United States? (about how many people out of 100)</caption>'
        + '<thead><tr><th>Blood type</th><th>O+</th><th>A+</th><th>B+</th><th>O−</th><th>A−</th><th>AB+</th><th>B−</th><th>AB−</th></tr></thead>'
        + '<tbody><tr><th>People out of 100</th><td>37</td><td>36</td><td>9</td><td>7</td><td>6</td><td>3</td><td>1.5</td><td>0.6</td></tr></tbody></table>'
        + '<p style="font-size:.85rem;color:var(--muted);margin:6px 0 0">Source: Stanford Blood Center. Numbers are rounded and differ between groups of people.</p>',
      questions: [
        {
          type: 'bloodlab',
          text: 'Test each patient’s blood. Add all three serums, look for clumping, then choose the blood type.',
          patients: [
            { name: 'Patient 1: Marcus', who: 'Age 17. Broke his leg playing soccer.', type: 'A+' },
            { name: 'Patient 2: Mrs. Lee', who: 'Age 64. Having knee surgery next week.', type: 'O−' },
            { name: 'Patient 3: Sam', who: 'Age 16. Giving blood for the first time at a school blood drive.', type: 'AB+' },
            { name: 'Patient 4: Mr. Okafor', who: 'Age 45. Lost blood in a car accident.', type: 'B+' },
            { name: 'Patient 5: Ana', who: 'Age 29. Expecting a baby next month.', type: 'A−' },
            { name: 'Patient 6: Jordan', who: 'Age 18. Getting ready for surgery.', type: 'O+' }
          ]
        },
        {
          type: 'choice',
          text: 'Look at the table. Which blood type is the most common in the United States?',
          options: ['O+', 'A+', 'B+', 'AB−'], answer: 0,
          explain: 'About 37 out of 100 people have O+ blood, which is the most of any type.',
          tip: 'Look for the biggest number in the table.'
        },
        {
          type: 'choice',
          text: 'Look at the table. Which blood type is the rarest?',
          options: ['O−', 'B−', 'AB−', 'AB+'], answer: 2,
          explain: 'Fewer than 1 out of 100 people have AB− blood.',
          tip: 'Look for the smallest number in the table.'
        },
        {
          type: 'multi',
          text: 'Priya is type B−. She needs blood after a car accident. Which donor bags are safe for her? Choose every safe bag.',
          options: ['O−', 'O+', 'A−', 'B−', 'B+', 'AB−'],
          answers: ['O−', 'B−'],
          rules: [
            { any: ['O+', 'B+'], tip: 'Priya is Rh negative. Look at the + or − on each bag you chose.' },
            { any: ['A−', 'AB−'], tip: 'Check each bag for the A marker. Does Priya’s own blood have it?' }
          ],
          tip: 'Every bag you chose is safe, but there is another one. Which bag brings no markers at all?',
          explain: 'Priya’s cells have the B marker and no Rh marker. B− blood has only B, and O− blood has no markers at all, so neither brings a marker her body would attack.'
        },
        {
          type: 'multi',
          text: 'Mr. Chen is type A+. Which donor bags are safe for him? Choose every safe bag.',
          options: ['O−', 'O+', 'A−', 'A+', 'B+', 'AB+'],
          answers: ['O−', 'O+', 'A−', 'A+'],
          rules: [{ any: ['B+', 'AB+'], tip: 'Check each bag for the B marker. Does Mr. Chen’s own blood have it?' }],
          tip: 'Every bag you chose is safe, but there are more. Mr. Chen already has the Rh marker. Can he also get blood that has no Rh marker?',
          explain: 'Mr. Chen’s cells have A and Rh. Any bag that only brings A, Rh, or no markers at all is safe: O−, O+, A−, and A+.'
        },
        {
          type: 'multi',
          text: 'Keisha is type AB+. Which donor bags are safe for her? Choose every safe bag.',
          options: ['O−', 'A+', 'B−', 'AB+', 'O+', 'AB−'],
          answers: ['O−', 'A+', 'B−', 'AB+', 'O+', 'AB−'],
          tip: 'There are more safe bags. Keisha’s cells already have A, B, and Rh. Is there any marker a bag could bring that her body doesn’t already know?',
          explain: 'Keisha has all three markers, so no bag brings a marker her body would attack. That is why AB+ is called the universal recipient.'
        },
        {
          type: 'choice',
          text: 'O− is called the “universal donor.” Why can almost anyone receive O− red blood cells?',
          options: ['Its red blood cells have no A, B, or Rh markers for the patient’s body to attack', 'It carries more oxygen than other blood types', 'It is the most common blood type', 'It has extra platelets'],
          answer: 0,
          explain: 'O− red blood cells have none of the three markers, so they bring nothing for the patient’s immune system to attack.',
          tip: 'Think about what makes a patient’s body attack donor blood. What does O− blood have, or not have?'
        },
        {
          type: 'written',
          text: 'Why does it matter that people have different blood types? Explain how blood typing keeps patients safe, and how your blood type connects to the idea that each of us is unique. (3 to 5 sentences)',
          min: 150,
          ideas: [
            { done: 'You explained what makes blood types different.', q: 'Did you say what makes one blood type different from another?', tip: 'Think about what sits on the surface of red blood cells.', re: /marker|antigen|\btype (a|b|ab|o)\b|\brh\b|surface/ },
            { done: 'You told what happens when blood doesn’t match.', q: 'Did you explain what happens if a patient gets the wrong type?', tip: 'What does the immune system do to markers it doesn’t know? What did you see in the wells?', re: /clump|attack|immune|antibod|reject|invader|dangerous|harm|die|kill/ },
            { done: 'You connected blood typing to keeping patients safe.', q: 'Did you say how testing and matching keeps patients safe?', tip: 'Think about what hospitals do before a transfusion.', re: /match|test|transfusion|donor|donat|safe|compatib/ },
            { done: 'You connected blood type to being unique.', q: 'Did you connect blood type to each of us being unique?', tip: 'Reread the last paragraph of the reading. Where does your blood type come from, and how many blood group markers are there?', re: /unique|different|individual|one of a kind|inherit|parents?|genes?|dna|special/ },
            { done: 'You wrote at least 2 sentences.', q: 'Did you write at least 2 sentences?', tip: 'Give each idea its own sentence.', sentences: 2 }
          ]
        }
      ]
    }
  ]
};
