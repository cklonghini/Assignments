/*
  Explore - Heart Dissection (Anatomy & Physiology B)
  Everything a student sees is written in this file. The shared engine in /engine builds the page,
  progress bars, PDF printout, Listen buttons, and captions from it.
  Students dissect a heart at home and follow along here, one step at a time. Each step ends with a photo of
  their own work, which prints in their PDF.
  Sources (in source/, not saved to GitHub): the "Dissection: Heart" handout, the sheep heart photo slides
  (It's Not Rocket Science), and "Pig heart Anatomy - Lab Video". Captions come from the teacher's pasted
  YouTube transcript (source/pig-heart.vtt), with auto-caption mistakes fixed.
  Write *scientific names* between asterisks to show them in italics. Reading boxes and tables use HTML.
  Full guide: docs/ASSIGNMENT_FORMAT.md
*/
window.ASSIGNMENT = {
  title: 'Explore - Heart Dissection',
  course: 'Anatomy & Physiology B',
  storageKey: 'explore-heart-dissection-v2',
  partWord: 'Step',

  icon: '<svg viewBox="0 0 64 72" aria-hidden="true" focusable="false">'
    + '<path d="M32 64 C10 48 4 36 4 25 C4 15 12 9 20 9 C26 9 30 13 32 17 C34 13 38 9 44 9 C52 9 60 15 60 25 C60 36 54 48 32 64 Z" fill="var(--ligand)"/>'
    + '<path d="M11 33 H23 L27 25 L33 41 L37 33 H53" fill="none" stroke="var(--primary-ink)" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"/></svg>',

  video: {
    title: 'Pig Heart Anatomy - Lab Video',
    src: 'media/pig-heart-video.mp4',
    seconds: 392,
    intro: 'Watch the video Pig Heart Anatomy - Lab Video before you start cutting. Then keep this page open next to you and follow along, one step at a time, while you dissect your own heart. Before you start, do Step 1 to set up and suit up.'
  },

  /* one clip per step, cut along the video's own chapters. from/to are times in the full video. */
  clips: {
    orient:    { src: 'media/clip-orient.mp4',    from: 0.0,   to: 65.0,  seconds: 66,  title: 'Front or back? The pulmonary trunk and the interventricular sulcus' },
    auricles:  { src: 'media/clip-auricles.mp4',  from: 63.0,  to: 137.0, seconds: 75,  title: 'The auricles and the aorta' },
    posterior: { src: 'media/clip-posterior.mp4', from: 137.0, to: 247.0, seconds: 111, title: 'The back of the heart: vena cava and pulmonary veins' },
    walls:     { src: 'media/clip-walls.mp4',     from: 247.0, to: 291.0, seconds: 45,  title: 'Opening the heart: the myocardium and the ventricle walls' },
    avvalves:  { src: 'media/clip-avvalves.mp4',  from: 291.0, to: 350.0, seconds: 60,  title: 'AV valves, chordae tendineae, and papillary muscles' },
    semilunar: { src: 'media/clip-semilunar.mp4', from: 347.0, to: 391.0, seconds: 45,  title: 'The semilunar valves' }
  },

  parts: [
    /* ---------------------------------------------------------------- Step 1 */
    {
      title: 'Set up and suit up',
      intro: 'Do all of this before you open the heart. Once you are ready, you will take a selfie to show your teacher you are set up safely.',
      read: '<p><b>Do it:</b> Follow these steps in order.</p><ol>'
        + '<li><b>Set up your space.</b> Clear a table and put down a tray or cutting board you can clean. Lay out your lab kit: the heart, the plastic knife, the scissors, the probe (the wooden stick), and a few straws or old colored pencils for marking vessels.</li>'
        + '<li><b>Cover your keyboard.</b> Put the plastic keyboard cover from your kit over your keyboard. If your kit doesn’t have one, wrap the top of your keyboard in plastic wrap from the kitchen. That way you can type your answers without getting heart on your keyboard.</li>'
        + '<li><b>Suit up.</b> Put on your goggles, your apron, and your gloves.</li>'
        + '<li><b>Take your ready selfie</b> at the bottom of this step. Show your goggles, apron, and gloves, and your covered keyboard if you can.</li></ol>'
        + '<p><b>Stay safe:</b> Cut slowly with the plastic knife or the scissors, and always cut away from your body and your fingers. Keep your tools on the tray. Keep your gloves on until you finish cleaning up.</p>',
      questions: [
        {
          type: 'order',
          text: 'Put the setup steps in order.',
          items: ['Set up your tray and lab kit', 'Cover your keyboard', 'Put on your goggles, apron, and gloves', 'Take your ready selfie', 'Start the dissection'],
          tip: 'Read the numbered list again. The selfie shows you are already protected.',
          explain: 'Right. Set up, cover your keyboard, suit up, take your selfie, and then start.'
        },
        {
          type: 'choice',
          text: 'Your kit doesn’t have a keyboard cover. What should you do?',
          options: ['Wrap the top of your keyboard in plastic wrap from the kitchen', 'Skip it and type carefully', 'Type with your gloves on and wipe the keys later', 'Do the lab without answering on the page'], answer: 0,
          explain: 'Right. Plastic wrap keeps your keyboard clean so you can type while you work.',
          tip: 'Read step 2 of the setup list again. It says what to use instead.'
        },
        {
          type: 'photo',
          text: 'Take a selfie that shows you are ready: goggles, apron, and gloves on, and your keyboard covered.',
          caption: 'List the safety gear you have on.'
        }
      ]
    },

    /* ---------------------------------------------------------------- Step 2 */
    {
      title: 'Get oriented',
      intro: 'Before you cut, learn to tell the front of the heart from the back. The video shows a pig heart, and the photos show a sheep heart. Both are mammal hearts, so they are built the same way as yours.',
      clips: ['orient'],
      images: [
        { src: 'media/slide-2.jpg', caption: 'External view of a sheep heart: posterior (back) and anterior (front).',
          alt: 'Two photos of the same sheep heart on a blue tray. The left photo shows the back of the heart. The right photo shows the front, with a darker strip of tissue near the top.',
          text: '<p>External View. Left photo: Posterior. Right photo: Anterior.</p>' }
      ],
      read: '<p><b>Do it:</b> Step 2 from your lab handout.</p><ol start="2">'
        + '<li><b>Get oriented.</b> Find the anterior (front) and posterior (back) sides of the heart. Then find the apex and the base.</li></ol>'
        + '<p><b>Read:</b> The <b>apex</b> is the pointed tip at the bottom of the heart. The <b>base</b> is the wide top, where the big blood vessels attach. The <b>anterior</b> side is the front, and the <b>posterior</b> side is the back.</p>'
        + '<p>To find the front, look for the <b>pulmonary trunk</b>. It has a slightly different color than the tissue around it. A shallow groove runs down the front between the left and right ventricles. This groove is the <b>interventricular sulcus</b>. A coronary artery runs in it.</p>',
      questions: [
        {
          type: 'selects',
          text: 'Match each description to the correct word.',
          options: ['Anterior', 'Posterior', 'Apex', 'Base', 'Interventricular sulcus'],
          items: [
            { label: 'The front side of the heart', answer: 'Anterior', hint: 'Look at the reading. Which word means the front?' },
            { label: 'The back side of the heart', answer: 'Posterior', hint: 'Look at the labels on the two photos. Which side has the jumble of vessels?' },
            { label: 'The pointed tip at the bottom of the heart', answer: 'Apex', hint: 'Find the word in the reading that names the pointed tip.' },
            { label: 'The wide top of the heart, where the big vessels attach', answer: 'Base', hint: 'The reading names the wide top. It is the opposite end from the pointed tip.' },
            { label: 'The groove between the left and right ventricles', answer: 'Interventricular sulcus', hint: '“Inter” means between, and “ventricular” is about the ventricles.' }
          ]
        },
        {
          type: 'choice',
          text: 'In the video, which vessel does the presenter look for to tell that he is looking at the front of the heart?',
          options: ['The aorta', 'The pulmonary trunk', 'The superior vena cava', 'The pulmonary veins'], answer: 1,
          explain: 'Right. The pulmonary trunk is on the front of the heart and has a slightly different color. Once he finds it, he knows the right ventricle is under it.',
          tip: 'Rewatch the clip from about 0:17. He says what he always uses to help him find the front.'
        },
        {
          type: 'choice',
          text: 'The presenter says a heart attack is most likely to happen when one vessel gets clogged. Where does that vessel run?',
          options: ['In the interventricular sulcus', 'Inside the right atrium', 'Through the tricuspid valve', 'Along the apex'], answer: 0,
          explain: 'Right. The left anterior descending artery runs in the interventricular sulcus. It brings blood to the heart muscle itself.',
          tip: 'Listen to the end of the clip, right after he points out the little groove.'
        },
        {
          type: 'photo',
          text: 'Take a photo of your heart with the anterior (front) side facing up and the apex pointing down.',
          caption: 'What does your photo show? Tell where the apex and the base are.'
        }
      ]
    },

    /* ---------------------------------------------------------------- Step 3 */
    {
      title: 'Outside vessels and auricles',
      intro: 'Now find the big blood vessels on the outside of the heart and mark each one before you cut.',
      clips: ['auricles', 'posterior'],
      images: [
        { src: 'media/slide-4.jpg', caption: 'Posterior view with labels.',
          alt: 'The back of a sheep heart with a red straw in a vessel at the top and an arrow pointing to the middle of the back.',
          text: '<p>Posterior View. Labels: Superior vena cava (red straw). Interventricular septum.</p>' },
        { src: 'media/slide-5.jpg', caption: 'Superior view (looking down at the top) with labels.',
          alt: 'Looking down at the top of a sheep heart held in a gloved hand. Red, purple, yellow, and green straws stick out of four different vessels.',
          text: '<p>Superior View. Labels: Superior vena cava (red straw). Aorta (purple straw). Pulmonary artery (yellow straw). Pulmonary veins (green straws).</p>' }
      ],
      read: '<p><b>Do it:</b> Step 3 from your lab handout.</p><ol start="3">'
        + '<li>Find the blood vessels coming off the heart. Mark each one with an old colored pencil or straw so you stay oriented while you cut. Make a color key so you don’t forget which is which!</li></ol>'
        + '<p><b>Read:</b> An <b>auricle</b> is the ear-shaped flap on the outside of each atrium. “Auricle” means ear. You say auricle for the flap you see on the outside, and atrium for the chamber inside.</p>'
        + '<p>Blood comes <b>into</b> the right atrium through the <b>superior vena cava</b> and the <b>inferior vena cava</b>. You find them on the posterior side. Blood comes back from the lungs into the left atrium through the <b>pulmonary veins</b>. The <b>pulmonary trunk</b> carries blood out of the right ventricle to the lungs. The <b>aorta</b> sits right behind it. It is thick and strong, and it carries blood out of the left ventricle to the body.</p>'
        + '<p>The photos use this color key: purple for the aorta, yellow for the pulmonary artery (trunk), red for the superior vena cava, and green for the pulmonary veins. You can use the same colors.</p>',
      questions: [
        {
          type: 'selects',
          text: 'Here is the front of a sheep heart with the labels covered. Choose the name for each number.',
          img: { src: 'media/label-anterior.jpg', alt: 'The front of a sheep heart. Numbered arrows point to a purple straw (1), the top of the heart (2), green straws (3), the bottom tip (4), and a yellow straw (5).' },
          options: ['Aorta', 'Pulmonary trunk', 'Pulmonary veins', 'Base', 'Apex'],
          items: [
            { label: 'Number 1 (purple straw)', answer: 'Aorta', hint: 'Use the color key in the reading. What does purple mark?' },
            { label: 'Number 2', answer: 'Base', hint: 'This arrow points to a region, not a vessel. Is it the wide top or the pointed tip?' },
            { label: 'Number 3 (green straws)', answer: 'Pulmonary veins', hint: 'Use the color key in the reading. These vessels bring blood back from the lungs.' },
            { label: 'Number 4', answer: 'Apex', hint: 'This arrow points to a region at the bottom. Look back at Step 2.' },
            { label: 'Number 5 (yellow straw)', answer: 'Pulmonary trunk', hint: 'Use the color key in the reading. This vessel is on the front and leads to the lungs.' }
          ]
        },
        {
          type: 'choice',
          text: 'What is an auricle?',
          options: ['The ear-shaped flap on the outside of an atrium', 'The groove between the two ventricles', 'A valve between two chambers', 'The pointed tip of the heart'], answer: 0,
          explain: 'Right. Auricle means ear. It is the floppy part of the atrium that you can see from the outside.',
          tip: 'Listen to what the presenter says the word means, and what he says it looks like.'
        },
        {
          type: 'selects',
          text: 'Where does each blood vessel carry blood?',
          options: ['Into the right atrium', 'Into the left atrium', 'Out of the right ventricle to the lungs', 'Out of the left ventricle to the body'],
          items: [
            { label: 'Superior and inferior vena cava', answer: 'Into the right atrium', hint: 'Rewatch the posterior clip. Where does the presenter’s finger go when he sticks it in these vessels?' },
            { label: 'Pulmonary veins', answer: 'Into the left atrium', hint: 'These vessels bring blood back from the lungs. Which side of the heart gets it?' },
            { label: 'Pulmonary trunk', answer: 'Out of the right ventricle to the lungs', hint: '“Pulmonary” means about the lungs. Which ventricle sits under this vessel?' },
            { label: 'Aorta', answer: 'Out of the left ventricle to the body', hint: 'The video says this vessel is strong and muscular. Where does it send blood?' }
          ]
        },
        {
          type: 'photo',
          text: 'Mark each blood vessel you found with a colored straw or pencil. Take a photo of your heart with your color key next to it.',
          caption: 'Write your color key. Which color is in which vessel?'
        }
      ]
    },

    /* ---------------------------------------------------------------- Step 4 */
    {
      title: 'Open the heart: chambers and walls',
      intro: 'Time to cut. Go slowly with your scissors or plastic knife, and use your straws to guide your cuts.',
      clips: ['walls'],
      read: '<p><b>Do it:</b> These are steps from your lab handout.</p><ol start="4">'
        + '<li>Find the <b>right atrium</b>. Cut into it carefully. Pull the straw you put in the <b>superior vena cava</b> through, so you can see it empty into the right atrium.</li></ol>'
        + '<ol start="6"><li>Cut through the anterior side of the <b>right ventricle</b>.</li></ol>'
        + '<ol start="8"><li>Find the <b>left atrium</b>. Push your probe into a <b>pulmonary vein</b>, then cut along the probe so you know you are cutting into the left atrium.</li></ol>'
        + '<ol start="10"><li>Cut into the <b>left ventricle</b>. Notice how thick the <b>myocardium</b> is. It makes this chamber the hardest to cut.</li></ol>'
        + '<p><b>Read:</b> The <b>atria</b> are the two upper chambers. The <b>ventricles</b> are the two lower chambers. A thick wall of heart muscle, the <b>myocardium</b>, separates the right ventricle from the left ventricle. This wall is the <b>interventricular septum</b>.</p>'
        + '<p>Look at the walls of the two ventricles. The right ventricle only pumps blood to the lungs, which are right next door. The left ventricle pumps blood out the aorta to the whole body.</p>'
        + '<p><b>Tip for the photo below:</b> the heart was cut open like a book. The purple straw runs from the left ventricle up into the aorta.</p>',
      questions: [
        {
          type: 'selects',
          text: 'Here is the inside of a sheep heart with the labels covered. Choose the name for each number.',
          img: { src: 'media/label-internal.jpg', alt: 'A sheep heart cut open like a book, showing two halves. Six numbered arrows point to a purple straw, an upper chamber on the right half, a lower chamber on the right half, a lower chamber on the left half, an upper chamber on the left half, and a yellow straw.' },
          options: ['Aorta', 'Pulmonary trunk', 'Right atrium', 'Right ventricle', 'Left atrium', 'Left ventricle'],
          items: [
            { label: 'Number 1 (purple straw)', answer: 'Aorta', hint: 'Use the color key from Step 3. What does purple mark?' },
            { label: 'Number 2', answer: 'Right atrium', hint: 'It is an upper chamber. The purple straw is not in this half, so which side is it?' },
            { label: 'Number 3', answer: 'Right ventricle', hint: 'It is a lower chamber with a thinner wall. Which side is that?' },
            { label: 'Number 4', answer: 'Left ventricle', hint: 'It is a lower chamber, and the purple straw comes out of it. Which side is that?' },
            { label: 'Number 5', answer: 'Left atrium', hint: 'It is an upper chamber in the same half as the purple straw.' },
            { label: 'Number 6 (yellow straw)', answer: 'Pulmonary trunk', hint: 'Use the color key from Step 3. What does yellow mark?' }
          ]
        },
        {
          type: 'choice',
          text: 'Which ventricle has the thicker muscle wall?',
          options: ['The left ventricle', 'The right ventricle', 'They are the same'], answer: 0,
          explain: 'Right. The left ventricle has the thickest wall in the heart.',
          tip: 'Rewatch the clip from about 0:30. The presenter compares the walls of the two ventricles.'
        },
        {
          type: 'choice',
          text: 'Why does that ventricle need a thicker wall?',
          options: ['It pumps blood to the entire body', 'It pumps blood only to the lungs', 'It holds blood coming in from the vena cava', 'It keeps the valves from opening'], answer: 0,
          explain: 'Right. The left ventricle pushes blood out the aorta to the whole body, so it needs more muscle. The right ventricle only pumps blood to the lungs, right next door.',
          tip: 'Think about how far each ventricle has to push blood. The presenter says this “makes sense.” Listen to why.'
        },
        {
          type: 'typed',
          text: 'What is the name for heart muscle? It is the thick wall between the ventricles. (one word)',
          accept: ['myocardium'],
          tip: 'Look for the bold word in the reading. It starts with “myo,” which means muscle.',
          aria: 'The name for heart muscle'
        },
        {
          type: 'photo',
          text: 'Take a photo of your opened heart that shows the walls of both ventricles.',
          caption: 'Which wall is thicker? Tell where it is in your photo.'
        }
      ]
    },

    /* ---------------------------------------------------------------- Step 5 */
    {
      title: 'AV valves, chordae tendineae, and papillary muscles',
      intro: 'Use your probe to find the valves between the atria and the ventricles, and the strings that hold them.',
      clips: ['avvalves'],
      images: [
        { src: 'media/slide-7.jpg', caption: 'Inside a ventricle, with a label.',
          alt: 'A gloved hand holds open a cut ventricle. Thin white strings run along the inside wall.',
          text: '<p>Internal View. Label: Chordae tendineae.</p>' }
      ],
      read: '<p><b>Do it:</b> These are steps from your lab handout.</p><ol start="5">'
        + '<li>Use your probe (the wooden stick) to find the <b>tricuspid valve</b> that connects the right atrium to the right ventricle. Try to find its three cusps (flaps).</li></ol>'
        + '<ol start="9"><li>Use your probe to find the <b>mitral valve</b> (also called the <b>bicuspid valve</b>) that connects the left atrium to the left ventricle.</li></ol>'
        + '<ol start="12"><li>Find the <b>chordae tendineae</b> that come off the valves and attach to the <b>papillary muscles</b>.</li></ol>'
        + '<p><b>Read:</b> The atria and ventricles are separated by the <b>AV valves</b> (atrioventricular valves). The right AV valve has three flaps, so it is called the <b>tricuspid</b>. The left AV valve has two flaps, so it is called the <b>bicuspid</b>.</p>'
        + '<p>The valve flaps are held down by the <b>chordae tendineae</b>, thin, strong strands like strings. The chordae tendineae are anchored to the bottom of the ventricles by carrot-shaped muscles called <b>papillary muscles</b>. When a ventricle squeezes, these strings keep the flaps from flipping back up into the atrium. That way blood moves only one way.</p>',
      questions: [
        {
          type: 'selects',
          text: 'Match each structure to its description.',
          options: ['Tricuspid (right AV) valve', 'Bicuspid (left AV) valve', 'Chordae tendineae', 'Papillary muscles'],
          items: [
            { label: 'Has three flaps, between the right atrium and right ventricle', answer: 'Tricuspid (right AV) valve', hint: '“Tri” means three. Which valve is on the right side?' },
            { label: 'Has two flaps, between the left atrium and left ventricle', answer: 'Bicuspid (left AV) valve', hint: '“Bi” means two. Which valve is on the left side?' },
            { label: 'Thin, strong strands that hold the valve flaps down', answer: 'Chordae tendineae', hint: 'Look at the labeled photo above. What are the strings called?' },
            { label: 'Carrot-shaped muscles that anchor the strands to the bottom of the ventricle', answer: 'Papillary muscles', hint: 'Rewatch the clip from about 0:40. The presenter describes their shape.' }
          ]
        },
        {
          type: 'order',
          text: 'Put these in order, starting at the valve flap and going down to the bottom of the ventricle.',
          items: ['AV valve flap', 'Chordae tendineae', 'Papillary muscle'],
          tip: 'Think about what holds what. The flap is held by strings, and the strings are held by something at the bottom.',
          explain: 'Right. The flap is held by the chordae tendineae, which are anchored by a papillary muscle.'
        },
        {
          type: 'choice',
          text: 'What would happen if the chordae tendineae could not hold the AV valve flaps down?',
          options: ['Blood could flow back up into the atrium when the ventricle squeezes', 'The ventricle wall would get thicker', 'Blood would go straight to the lungs from the vena cava', 'The heart would stop having an apex'], answer: 0,
          explain: 'Right. The strings keep the flaps shut when the ventricle squeezes, so blood can move only one way.',
          tip: 'Read the last sentences of the reading again. What do the strings keep the flaps from doing?'
        },
        {
          type: 'photo',
          text: 'Take a close-up photo of the chordae tendineae or an AV valve flap. Gently lift the flap with your probe so the strings show.',
          caption: 'What does your photo show? Name the valve or the strings you found.'
        }
      ]
    },

    /* ---------------------------------------------------------------- Step 6 */
    {
      title: 'Semilunar valves, the path of blood, and clean up',
      intro: 'Last, find the valves where blood leaves the heart and trace the whole path of blood. Then clean up.',
      clips: ['semilunar'],
      images: [
        { src: 'media/slide-8.jpg', caption: 'A probe in the left ventricle, with a label.',
          alt: 'A gloved hand holds open the left ventricle. A black probe goes up from the ventricle into a vessel.',
          text: '<p>Internal View. Label: Probe going through the aortic valve in the left ventricle.</p>' }
      ],
      read: '<p><b>Do it:</b> These are steps from your lab handout.</p><ol start="7">'
        + '<li>In the right ventricle, find the <b>pulmonary valve</b> that connects to the <b>pulmonary artery</b> (trunk). Push your probe through the valve and out of the pulmonary artery. Did you mark the artery correctly before you began cutting?</li></ol>'
        + '<ol start="11"><li>Use your probe to find the <b>aortic valve</b>. Blood goes through it when it leaves the left ventricle and goes out to the body through the <b>aorta</b>.</li></ol>'
        + '<ol start="13"><li>Make any other observations you need before cleaning up.</li></ol>'
        + '<p><b>Clean up:</b> Take your last photo below first. Then, with your gloves still on:</p><ol>'
        + '<li>Put the heart and any scraps in a plastic bag, seal it, and put it in the trash.</li>'
        + '<li>Wash your tools and tray with hot, soapy water.</li>'
        + '<li>Wipe down your work space.</li>'
        + '<li>Take off your gloves and throw them away. Then wash your hands with soap and water.</li>'
        + '<li>Take off your goggles and apron. Remove your keyboard cover last, once your hands are clean.</li></ol>'
        + '<p><b>Read:</b> The <b>semilunar valves</b> are where blood leaves the ventricles. “Semilunar” means half-moon, the shape of their flaps. The <b>pulmonary semilunar valve</b> is between the right ventricle and the pulmonary trunk. The <b>aortic semilunar valve</b> is between the left ventricle and the aorta.</p>'
        + '<p><b>The path of blood:</b> Blood comes into the right atrium from the superior and inferior vena cava. It goes through the tricuspid valve down into the right ventricle. The right ventricle pumps it through the pulmonary semilunar valve, up the pulmonary trunk, and to the lungs. From the lungs, the pulmonary veins bring it back to the left atrium. It goes through the bicuspid valve into the left ventricle. Then the left ventricle pumps it up through the aortic semilunar valve and out the aorta to the whole body.</p>',
      questions: [
        {
          type: 'selects',
          text: 'Which valve does blood pass through on each trip?',
          options: ['Tricuspid valve', 'Pulmonary semilunar valve', 'Bicuspid valve', 'Aortic semilunar valve'],
          items: [
            { label: 'From the right atrium to the right ventricle', answer: 'Tricuspid valve', hint: 'This trip goes from an atrium to a ventricle, so it is an AV valve. Is it the right one or the left one?' },
            { label: 'From the right ventricle to the pulmonary trunk', answer: 'Pulmonary semilunar valve', hint: 'Blood is leaving a ventricle, so it is a semilunar valve. Where is it going?' },
            { label: 'From the left atrium to the left ventricle', answer: 'Bicuspid valve', hint: 'This trip goes from an atrium to a ventricle, so it is an AV valve. Which one has two flaps?' },
            { label: 'From the left ventricle to the aorta', answer: 'Aortic semilunar valve', hint: 'Blood is leaving a ventricle, so it is a semilunar valve. Look at the label on the photo above.' }
          ]
        },
        {
          type: 'order',
          text: 'Put the stops in order to trace the path of blood through the heart.',
          items: ['Superior and inferior vena cava', 'Right atrium', 'Tricuspid valve', 'Right ventricle', 'Pulmonary semilunar valve', 'Pulmonary trunk', 'Lungs', 'Pulmonary veins', 'Left atrium', 'Bicuspid valve', 'Left ventricle', 'Aortic semilunar valve', 'Aorta'],
          tip: 'Follow the path in the reading one sentence at a time. Blood always goes atrium, then valve, then ventricle, then valve, then out.',
          explain: 'Right. Blood goes through the right side to the lungs, comes back to the left side, and then goes out to the body.'
        },
        {
          type: 'photo',
          text: 'Take a photo of your probe going through the aortic or pulmonary semilunar valve.',
          caption: 'Which valve is your probe in? Which chamber is it coming from?'
        }
      ]
    },

    /* ---------------------------------------------------------------- Step 7 */
    {
      title: 'Structure and function',
      intro: 'This step is your observation table from the handout. You will use what you saw in Steps 2 to 6.',
      read: '<p><b>Read:</b> Every structure you found has a job. Here are the kinds of jobs.</p><ul>'
        + '<li><b>Veins bring blood into the heart.</b> They empty into an atrium.</li>'
        + '<li><b>Arteries carry blood out of the heart.</b> They leave from a ventricle.</li>'
        + '<li><b>Atria receive blood.</b> They are the upper chambers.</li>'
        + '<li><b>Ventricles pump blood out of the heart.</b> They are the lower chambers.</li>'
        + '<li><b>Valves keep blood moving in one direction.</b></li>'
        + '<li><b>Some parts hold the AV valve flaps in place</b> so they don’t flip back.</li>'
        + '<li><b>A wall of muscle separates the left and right sides</b> so the two kinds of blood don’t mix.</li></ul>'
        + '<p>The right side of the heart handles <b>oxygen-poor</b> blood coming back from the body. The left side handles <b>oxygen-rich</b> blood coming back from the lungs.</p>',
      questions: [
        {
          type: 'selects',
          text: 'Choose the job of each structure.',
          options: ['Brings blood into the heart', 'Carries blood out of the heart', 'Receives blood (upper chamber)', 'Pumps blood out (lower chamber)', 'Keeps blood moving one way', 'Holds the AV valve flaps in place', 'Separates the left and right sides'],
          items: [
            { label: 'Aorta', answer: 'Carries blood out of the heart', hint: 'Is it an artery or a vein? Look back at Step 3.' },
            { label: 'Pulmonary trunk', answer: 'Carries blood out of the heart', hint: 'Which way does blood go in it, toward the lungs or toward the heart?' },
            { label: 'Superior vena cava', answer: 'Brings blood into the heart', hint: 'Where did the presenter’s finger end up when he put it in this vessel?' },
            { label: 'Inferior vena cava', answer: 'Brings blood into the heart', hint: 'It works the same way as the superior one.' },
            { label: 'Pulmonary veins', answer: 'Brings blood into the heart', hint: 'They come from the lungs. Where do they go?' },
            { label: 'Interventricular septum', answer: 'Separates the left and right sides', hint: '“Inter” means between. What is it between?' },
            { label: 'Right atrium', answer: 'Receives blood (upper chamber)', hint: 'Is an atrium an upper or a lower chamber?' },
            { label: 'Right ventricle', answer: 'Pumps blood out (lower chamber)', hint: 'Is a ventricle an upper or a lower chamber?' },
            { label: 'Left atrium', answer: 'Receives blood (upper chamber)', hint: 'Is an atrium an upper or a lower chamber?' },
            { label: 'Left ventricle', answer: 'Pumps blood out (lower chamber)', hint: 'Is a ventricle an upper or a lower chamber?' },
            { label: 'Tricuspid (AV) valve', answer: 'Keeps blood moving one way', hint: 'What do all valves do?' },
            { label: 'Pulmonary (SL) valve', answer: 'Keeps blood moving one way', hint: 'What do all valves do?' },
            { label: 'Bicuspid (AV) valve', answer: 'Keeps blood moving one way', hint: 'What do all valves do?' },
            { label: 'Aortic (SL) valve', answer: 'Keeps blood moving one way', hint: 'What do all valves do?' },
            { label: 'Chordae tendineae', answer: 'Holds the AV valve flaps in place', hint: 'Look back at Step 5. What did these strings do?' },
            { label: 'Papillary muscles', answer: 'Holds the AV valve flaps in place', hint: 'Look back at Step 5. What are these muscles attached to?' }
          ]
        },
        {
          type: 'multi',
          text: 'Which of these carry oxygen-poor blood? Choose all that are correct.',
          options: ['Superior vena cava', 'Inferior vena cava', 'Right atrium', 'Right ventricle', 'Pulmonary trunk', 'Pulmonary veins', 'Left atrium', 'Left ventricle', 'Aorta'],
          answers: ['Superior vena cava', 'Inferior vena cava', 'Right atrium', 'Right ventricle', 'Pulmonary trunk'],
          rules: [
            { any: ['Pulmonary veins'], tip: 'The pulmonary veins come from the lungs. What did the blood just pick up there?' },
            { any: ['Left atrium', 'Left ventricle', 'Aorta'], tip: 'Read the last sentence of the reading. Which side handles oxygen-poor blood?' }
          ],
          tip: 'There are more. Follow oxygen-poor blood from the body all the way to the lungs.',
          explain: 'Right. Oxygen-poor blood comes in through the vena cava, goes through the right side of the heart, and leaves through the pulmonary trunk to the lungs.'
        }
      ]
    },

    /* ---------------------------------------------------------------- Step 8 */
    {
      title: 'Reflection',
      intro: 'These are the reflection questions from your lab handout. Answer them in your own words, using what you saw in your own dissection.',
      questions: [
        {
          type: 'written',
          text: 'What structures were you able to find with ease on the outside of the heart? What structures may have been harder to identify? (2 to 4 sentences)',
          min: 40,
          ideas: [
            { done: 'You named a structure on the outside of the heart.', q: 'Did you name at least one structure on the outside?', tip: 'Look back at Steps 2 and 3. What did you find before you cut?', re: /aort|pulmonary|vena cava|cava|auricle|apex|base|sulcus|ventricle|atri(um|a)|vein|arter/ },
            { done: 'You told which structures were easy to find.', q: 'Did you tell which structures were easy to find?', tip: 'Which part did you find first, or right away?', re: /eas(y|ier|iest|ily)|simple|quick(ly)?|right away|obvious|clear(ly)?|no problem|first/ },
            { done: 'You told which structures were harder to find.', q: 'Did you tell which structures were harder to find?', tip: 'Which part took you the longest, or which one were you not sure about?', re: /hard|difficult|tough|tricky|confus|struggl|couldn.?t|could not|not sure|unsure|took (a while|longer|me)|challeng/ },
            { done: 'You wrote at least 2 sentences.', q: 'Did you write 2 to 4 full sentences?', tip: 'Add another sentence.', sentences: 2 }
          ]
        },
        {
          type: 'written',
          text: 'What structures were you able to find with ease inside the heart, after cutting into it? What structures may have been harder to identify? (2 to 4 sentences)',
          min: 40,
          ideas: [
            { done: 'You named a structure inside the heart.', q: 'Did you name at least one structure inside the heart?', tip: 'Look back at Steps 4 to 6. What did you find after you cut?', re: /valve|chordae|tendine|papillary|septum|myocardium|atri(um|a)|ventricle|cusp|flap|wall|string/ },
            { done: 'You told which structures were easy to find.', q: 'Did you tell which structures were easy to find?', tip: 'Which part did you find first, or right away?', re: /eas(y|ier|iest|ily)|simple|quick(ly)?|right away|obvious|clear(ly)?|no problem|first/ },
            { done: 'You told which structures were harder to find.', q: 'Did you tell which structures were harder to find?', tip: 'Which part took you the longest, or which one were you not sure about?', re: /hard|difficult|tough|tricky|confus|struggl|couldn.?t|could not|not sure|unsure|took (a while|longer|me)|challeng/ },
            { done: 'You wrote at least 2 sentences.', q: 'Did you write 2 to 4 full sentences?', tip: 'Add another sentence.', sentences: 2 }
          ]
        },
        {
          type: 'written',
          text: 'What surprised you about the structure and organization of the heart? (2 to 4 sentences)',
          min: 40,
          ideas: [
            { done: 'You told what surprised you.', q: 'Did you say what surprised you?', tip: 'Start with “I was surprised that…” or “I didn’t expect…”', re: /surpris|didn.?t (know|expect|think|realize)|did not (know|expect|think|realize)|expect|thought|amaz|interest|shock|never knew|cool|weird|strange/ },
            { done: 'You named a part of the heart.', q: 'Did you name the part of the heart that surprised you?', tip: 'Which structure was it? Use its name.', re: /aort|pulmonary|vena cava|cava|auricle|apex|base|sulcus|ventricle|atri(um|a)|vein|arter|valve|chordae|tendine|papillary|septum|myocardium|muscle|wall/ },
            { done: 'You explained why it surprised you.', q: 'Did you explain why it surprised you?', tip: 'Add a “because” sentence. What did you think before, and what did you see?', re: /because|since|so\b|which|that means|than|instead|bigger|smaller|thick|thin|tough|soft|hard/ },
            { done: 'You wrote at least 2 sentences.', q: 'Did you write 2 to 4 full sentences?', tip: 'Add another sentence.', sentences: 2 }
          ]
        },
        {
          type: 'highlight',
          text: 'How was doing this dissection helpful for understanding the heart’s structure AND function? Use evidence from your dissection and the video.',
          min: 60,
          ideas: [
            { done: 'You wrote about structure (what a part looks like or how it is built).', q: 'Did you write about structure?', tip: 'Describe something you saw or felt, like how thick a wall was or how a valve flap looked.', re: /structur|shape|thick|thin|wall|look(s|ed)?|saw|see|seeing|felt|feel|size|flap|string|built|layer|chamber/ },
            { done: 'You wrote about function (what a part does).', q: 'Did you write about function?', tip: 'Tell what a part does, like pumping blood or keeping blood moving one way.', re: /function|job|pump|carr(y|ies|ied)|flow|move|keep|prevent|open|close|one (way|direction)|backward|send|bring|receive/ },
            { done: 'You used transition words to point to your evidence.', q: 'Did you use transition words to point to your evidence?', tip: 'Introduce your evidence with words like “For example,” “According to the video,” or “This shows that.”', re: /for example|for instance|according to|this shows|that shows|which shows|shows that|evidence|in the video|the video (says|said|shows|showed|explains|explained|mentions|mentioned)|because|such as|as an example|one example|proves?|this means|supports?|when i (cut|saw|looked|felt|opened)|in my dissection/ },
            { done: 'You highlighted your transition words in yellow.', q: 'Did you highlight your transition words in yellow?', tip: 'Go back and select the transition words that point to your evidence, then press the yellow button.', highlight: true },
            { done: 'You wrote at least 2 sentences.', q: 'Did you write at least 2 full sentences?', tip: 'Add another sentence.', sentences: 2 }
          ]
        },
        {
          type: 'written',
          text: 'What about the structure and function of the heart do you still find confusing? (2 to 4 sentences)',
          min: 40,
          ideas: [
            { done: 'You named something that is still confusing.', q: 'Did you name something that is still confusing to you?', tip: 'It is OK to be confused! Start with “I am still not sure about…”', re: /confus|still|unsure|not sure|don.?t (get|understand|know)|do not (get|understand|know)|wonder|question|hard to|unclear|mix(ed)? up/ },
            { done: 'You named a part of the heart.', q: 'Did you name the part of the heart you are asking about?', tip: 'Which structure is it? Use its name.', re: /aort|pulmonary|vena cava|cava|auricle|apex|base|sulcus|ventricle|atri(um|a)|vein|arter|valve|chordae|tendine|papillary|septum|myocardium|muscle|wall|blood|oxygen/ },
            { done: 'You wrote at least 2 sentences.', q: 'Did you write 2 to 4 full sentences?', tip: 'Add another sentence.', sentences: 2 }
          ]
        }
      ]
    }
  ]
};
