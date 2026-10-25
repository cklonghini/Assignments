/*
  Sheep Brain Dissection (Anatomy & Physiology A)
  Everything a student sees is written in this file. The shared engine in /engine builds the page,
  progress bars, PDF printout, and Listen buttons from it.
  Students dissect a sheep brain at home and follow along here, one step at a time. Most steps end with a photo of
  their own work, which prints in their PDF. Built like explore-heart-dissection. The kit has no keyboard cover, so
  Step 1 tells students to use plastic wrap or the bag the supplies came in.
  Sources (in source/, not saved to GitHub): the "Sheep Brain Dissection" at-home handout (with the Function
  Reference Guide), the "Dissection: Sheep Brain" handout, the sheep brain photo slides (It's Not Rocket
  Science), and "Carolina Quick Tip: Sheep Brain Dissection". Captions come from the teacher's pasted transcript
  (source/sheep-brain.vtt), with auto-caption mistakes fixed. media/slide-N.jpg are slides 2 to 8. media/label-*.jpg are the labeled slides 10, 12, and 14 with the
  labels covered by numbers (tools/station_images.py numbered, spec in source/label-spec.json).
  Write *scientific names* between asterisks to show them in italics. Reading boxes and tables use HTML.
  Full guide: docs/ASSIGNMENT_FORMAT.md
*/
window.ASSIGNMENT = {
  title: 'Sheep Brain Dissection',
  course: 'Anatomy & Physiology A',
  storageKey: 'explore-sheep-brain-dissection-v2',
  partWord: 'Step',

  icon: '<svg viewBox="0 0 64 72" aria-hidden="true" focusable="false">'
    + '<path d="M31 14 C25 8 14 9 11 17 C4 19 3 29 7 33 C3 39 7 48 14 49 C17 56 26 58 31 53 Z" fill="var(--ligand)"/>'
    + '<path d="M33 14 C39 8 50 9 53 17 C60 19 61 29 57 33 C61 39 57 48 50 49 C47 56 38 58 33 53 Z" fill="var(--ligand)"/>'
    + '<path d="M14 25 C18 22 22 26 25 23 M11 36 C16 33 20 38 25 34 M16 45 C20 42 24 46 27 43 M50 25 C46 22 42 26 39 23 M53 36 C48 33 44 38 39 34 M48 45 C44 42 40 46 37 43" fill="none" stroke="var(--primary-ink)" stroke-width="3" stroke-linecap="round"/>'
    + '<path d="M30 55 L30 66 M34 55 L34 66" stroke="var(--primary-ink)" stroke-width="4" stroke-linecap="round"/></svg>',

  video: {
    title: 'Carolina Quick Tip: Sheep Brain Dissection',
    src: 'media/sheep-brain-video.mp4',
    seconds: 99,
    intro: 'Watch the video Carolina Quick Tip: Sheep Brain Dissection before you start cutting. Then keep this page open next to you and follow along, one step at a time, while you dissect your own sheep brain. Before you start, do Step 1 to set up and suit up. The rest of the lab opens when you finish Step 1.'
  },

  /* one clip per step that the video covers. from/to are times in the full video. */
  clips: {
    outside: { src: 'media/clip-outside.mp4', from: 22.0, to: 55.5, seconds: 34, title: 'Dorsal surface up: the parts on the outside' },
    bisect:  { src: 'media/clip-bisect.mp4',  from: 46.0, to: 75.5, seconds: 30, title: 'Bisecting the brain: arbor vitae, brain stem, and ventricles' },
    matter:  { src: 'media/clip-matter.mp4',  from: 75.5, to: 86.0, seconds: 11, title: 'Cutting across the frontal lobe: white and gray matter' }
  },

  parts: [
    /* ---------------------------------------------------------------- Step 1 */
    {
      title: 'Set up and suit up',
      gate: true,                 // Steps 2 to 9 stay hidden until everything in this step is done
      intro: 'Do all of this before you take the brain out of its package. The rest of the lab opens when you finish this step: agree to the lab rules, answer the setup questions, and take a selfie to show you are set up safely.',
      read: '<p><b>This is a real science lab.</b> You will be working with a real sheep brain and a tool that can cut. Scientists treat every lab with care and respect, and you will too. Take it seriously, work carefully, and give it your full attention.</p>'
        + '<p><b>Check your kit.</b> Your at-home dissection lab kit should have:</p><ul>'
        + '<li>A preserved sheep brain</li>'
        + '<li>Dissection tools (a plastic knife)</li>'
        + '<li>A protective apron</li>'
        + '<li>Safety goggles</li>'
        + '<li>Disposable gloves</li></ul>'
        + '<p>If you did not get all of these supplies, contact your TOR right away so a kit can be mailed to you before you start this assignment.</p>'
        + '<p><b>Do it:</b> Follow these steps in order.</p><ol>'
        + '<li><b>Set up your space.</b> Work on a clean, flat surface covered by your dissection tray. Lay out your lab kit.</li>'
        + '<li><b>Cover your keyboard with plastic wrap.</b> Your kit does not come with a keyboard cover. Grab some plastic wrap from the kitchen and wrap it over the top of your keyboard before you start. You may even be able to use the plastic bag your supplies came in: slip it over your keyboard instead. That way you can type your answers without getting brain on your keyboard.</li>'
        + '<li><b>Suit up.</b> Put on your apron before you take the sheep brain out of its package. Then put on your goggles and your gloves.</li>'
        + '<li><b>Take your ready selfie</b> at the bottom of this step. Show your apron, goggles, and gloves, and your covered keyboard if you can.</li></ol>'
        + '<p><b>Stay safe:</b> Wear your safety goggles for the whole dissection so nothing splashes into your eyes. Wear gloves any time you handle the brain or your dissection tools. Cut slowly with the plastic knife, and always cut away from your body and your fingers. When you finish and everything is cleaned up, wash your hands well.</p>',
      questions: [
        {
          type: 'agree',
          text: 'Lab agreement. Read each statement, and check the box to show you agree. Then sign with your name.',
          sign: true,
          items: [
            'I will follow safe lab procedures. My apron, goggles, and gloves stay on the whole time, and I will cut slowly and away from my body.',
            'I will treat the specimen with respect. This brain came from a real animal, and it was given so I can learn.',
            'I will not have younger brothers, sisters, or other young children around me while I do this lab.',
            'I will keep the brain and my tools on my tray, and I will clean up completely when I finish.',
            'I understand this is a real lab, and I will take it seriously.'
          ]
        },
        {
          type: 'order',
          text: 'Put the setup steps in order.',
          items: ['Set up your tray and lab kit', 'Cover your keyboard with plastic wrap', 'Put on your apron, goggles, and gloves', 'Take your ready selfie', 'Take the brain out of its package and start'],
          tip: 'Read the numbered list again. The selfie shows you are already protected, and the brain stays in its package until then.',
          explain: 'Right. Set up, cover your keyboard, suit up, take your selfie, and then start.'
        },
        {
          type: 'choice',
          text: 'Your kit does not come with a keyboard cover. What should you do before you start?',
          options: ['Cover it with plastic wrap from the kitchen, or slip the bag your supplies came in over it', 'Skip it and type carefully', 'Type with your gloves on and wipe the keys later', 'Do the lab without answering on the page'], answer: 0,
          explain: 'Right. Plastic wrap, or the bag your supplies came in, keeps your keyboard clean so you can type while you work.',
          tip: 'Read step 2 of the setup list again. It says what you can use instead.'
        },
        {
          type: 'choice',
          text: 'When should you put on your apron?',
          options: ['Before you take the sheep brain out of its package', 'After you remove the dura mater', 'Only when you make your first cut', 'When you start cleaning up'], answer: 0,
          explain: 'Right. Your apron goes on first, before the brain comes out of its package.',
          tip: 'Read step 3 of the setup list again, the one that starts with “Suit up.”'
        },
        {
          type: 'photo',
          text: 'Take a selfie that shows you are ready: apron, goggles, and gloves on, and your keyboard covered with plastic wrap or the supply bag.',
          caption: 'List the safety gear you have on.',
          placeholder: 'For example: I have on my apron, ...'
        }
      ]
    },

    /* ---------------------------------------------------------------- Step 2 */
    {
      title: 'Remove the meninges',
      intro: 'Take the sheep brain out of its package and get it ready to look at.',
      read: '<p><b>Read:</b> The nervous system is the control center for the whole body. The <b>central nervous system</b> is the headquarters of that control center. It is made of two structures: the <b>brain</b> and the <b>spinal cord</b>. A sheep brain is much smaller than a human brain, but it has many of the same structures, organized in the same basic way.</p>'
        + '<p>The brain may be covered by a thick layer of tissue called the <b>meninges</b>. The outermost layer of the meninges is the <b>dura mater</b>. You need to carefully remove this layer so you can see the brain more clearly.</p>'
        + '<p><b>Do it:</b> Step 1 from your lab handout.</p><ol>'
        + '<li>Remove the packaging and place the sheep brain in the center of your dissection tray. Carefully remove the thick outer layer of tissue (the meninges/dura mater) so you can observe the brain more clearly.</li></ol>',
      questions: [
        {
          type: 'multi',
          text: 'Which two structures make up the central nervous system? Choose all that are correct.',
          options: ['The brain', 'The heart', 'The spinal cord', 'The lungs', 'The skull'],
          answers: ['The brain', 'The spinal cord'],
          rules: [{ any: ['The heart', 'The lungs', 'The skull'], tip: 'Read the first part of the reading again. The central nervous system is the headquarters of the nervous system.' }],
          tip: 'There is one more. Read the first part of the reading again.',
          explain: 'Right. The brain and the spinal cord make up the central nervous system.'
        },
        {
          type: 'typed',
          text: 'What is the name of the outermost layer of the meninges? (two words)',
          accept: ['dura mater', 'dura matter'],
          tip: 'Look for the bold words in the reading, right after “outermost layer.”',
          aria: 'The outermost layer of the meninges'
        },
        {
          type: 'written',
          text: 'What does the dura mater look and feel like as you remove it? (2 to 3 sentences)',
          min: 30,
          ideas: [
            { done: 'You told what the dura mater looks like.', q: 'Did you tell what it looks like?', tip: 'Describe its color, how thick it is, or whether it is shiny or see-through.', re: /look|color|colou?r|white|gray|grey|clear|see.?through|shiny|thin|thick|dark|tan|yellow|brown|pale/ },
            { done: 'You told what the dura mater feels like.', q: 'Did you tell what it feels like?', tip: 'Describe how it feels in your gloved fingers. Is it tough, stretchy, slippery, or rubbery?', re: /feel|felt|tough|stretch|slipp|slim|rubber|smooth|rough|soft|hard|firm|strong|tear|tore|peel|stuck|sticky|leather|plastic|wet/ },
            { done: 'You wrote at least 2 sentences.', q: 'Did you write 2 to 3 full sentences?', tip: 'Add another sentence.', sentences: 2 }
          ]
        }
      ]
    },

    /* ---------------------------------------------------------------- Step 3 */
    {
      title: 'The outside of the brain',
      intro: 'Look at the brain from several angles: first from the top, then turn it over and look at the bottom.',
      clips: ['outside'],
      images: [
        { src: 'media/slide-2.jpg', caption: 'Dorsal (top) external view: a drawing of a human brain and a photo of a sheep brain.',
          alt: 'Left: a drawing of a human brain seen from the top. Right: a photo of a sheep brain seen from the top, with pins in it. A deep groove runs down the middle of the large front part.',
          text: '<p>External View. Dorsal (top) view.</p>' },
        { src: 'media/slide-3.jpg', caption: 'Ventral (bottom) external view: a drawing of a human brain and a photo of a sheep brain.',
          alt: 'Left: a drawing of a human brain seen from the bottom. Right: a photo of a sheep brain seen from the bottom. A thick stalk runs down the middle toward the narrow end.',
          text: '<p>External View. Ventral (bottom) view.</p>' }
      ],
      read: '<p><b>Do it:</b> Steps 2 and 3 from your lab handout.</p><ol start="2">'
        + '<li>Observe the brain from several angles. Find the <b>cerebrum</b>, <b>cerebellum</b>, <b>brain stem</b>, and <b>spinal cord</b>. Notice the <b>longitudinal fissure</b> dividing the left and right hemispheres, connected inside by the <b>corpus callosum</b>.</li>'
        + '<li>Turn the brain over. Notice the <b>transverse fissure</b> between the cerebrum and the cerebellum.</li></ol>'
        + '<p><b>Read:</b> <b>Dorsal</b> means the top, and <b>ventral</b> means the bottom. The <b>cerebrum</b> is the largest part of the brain. It is divided into left and right halves called <b>hemispheres</b>. The deep cleft between the two hemispheres is the <b>longitudinal fissure</b>. Deep inside, the nerve fibers that connect the two hemispheres are the <b>corpus callosum</b>.</p>'
        + '<p>Behind the cerebrum is the <b>cerebellum</b>. The cleft between the cerebrum and the cerebellum is the <b>transverse fissure</b>. The <b>spinal cord</b> comes off the end of the brain. On the ventral side you can see the <b>brain stem</b>, which connects the brain to the spinal cord.</p>'
        + '<p>The video also names two structures you can find on the ventral side, near the front: the <b>olfactory bulb</b>, which carries the sense of smell, and the <b>optic nerve</b>, which carries signals from the eyes. The video calls the longitudinal fissure the <b>medial longitudinal fissure</b>, because it runs down the middle.</p>'
        + '<p>The surface of the cerebrum is covered in folds and grooves. Each fold is called a <b>gyrus</b> (plural: gyri), and each groove is called a <b>sulcus</b> (plural: sulci).</p>',
      questions: [
        {
          type: 'selects',
          text: 'Here is the dorsal (top) view of a sheep brain with the labels covered. Choose the name for each number.',
          img: { src: 'media/label-dorsal.jpg', alt: 'A sheep brain seen from the top. Brackets mark three sections from top to bottom (1, 4, and 5). Two yellow arrows point to a fold (2) and a groove (3) on the large front part. Pink arrows point to the groove down the middle (6) and the gap between the large front part and the middle section (7).' },
          options: ['Cerebrum', 'Gyrus', 'Sulcus', 'Cerebellum', 'Spinal cord', 'Longitudinal fissure', 'Transverse fissure'],
          items: [
            { label: 'Number 1', answer: 'Cerebrum', hint: 'This bracket covers the biggest part of the brain. Read the reading again.' },
            { label: 'Number 2', answer: 'Gyrus', hint: 'This arrow points to a raised fold on the surface. Read the last paragraph of the reading.' },
            { label: 'Number 3', answer: 'Sulcus', hint: 'This arrow points into a groove on the surface. Read the last paragraph of the reading.' },
            { label: 'Number 4', answer: 'Cerebellum', hint: 'This part sits right behind the biggest part of the brain.' },
            { label: 'Number 5', answer: 'Spinal cord', hint: 'This part comes off the end of the brain and goes down the back.' },
            { label: 'Number 6', answer: 'Longitudinal fissure', hint: 'This cleft runs the long way, between the left and right halves.' },
            { label: 'Number 7', answer: 'Transverse fissure', hint: 'This cleft runs across the brain. Which two parts does it separate?' }
          ]
        },
        {
          type: 'choice',
          text: 'In the video, which way does the sheep brain face when it is first placed in the dissecting tray?',
          options: ['Dorsal surface up', 'Ventral surface up', 'Cut side up', 'Standing on the spinal cord'], answer: 0,
          explain: 'Right. The brain starts dorsal surface up, so you see the top of the cerebrum and the longitudinal fissure first.',
          tip: 'Rewatch the start of the clip. Listen to how the brain is placed in the tray.'
        },
        {
          type: 'multi',
          text: 'The video lists the parts to find on the outside of the brain. Which of these does it name? Choose all that are correct.',
          options: ['Cerebrum', 'Cerebellum', 'Spinal cord', 'Olfactory bulb', 'Optic nerve', 'Arbor vitae', 'Gray matter'],
          answers: ['Cerebrum', 'Cerebellum', 'Spinal cord', 'Olfactory bulb', 'Optic nerve'],
          rules: [{ any: ['Arbor vitae', 'Gray matter'], tip: 'That one is inside the brain. You can only see it after you cut. Listen to the list in the clip again.' }],
          tip: 'There are more. Rewatch the clip and listen to the whole list, all the way to the end.',
          explain: 'Right. The video names the cerebrum, cerebellum, spinal cord, medial longitudinal fissure, right and left hemispheres, olfactory bulb, and optic nerve.'
        },
        {
          type: 'selects',
          text: 'Match each description to the correct word.',
          options: ['Dorsal', 'Ventral', 'Hemisphere', 'Corpus callosum', 'Brain stem'],
          items: [
            { label: 'The top side of the brain', answer: 'Dorsal', hint: 'Look at the captions under the two photos.' },
            { label: 'The bottom side of the brain', answer: 'Ventral', hint: 'Which view did you see after you turned the brain over?' },
            { label: 'The left or right half of the cerebrum', answer: 'Hemisphere', hint: '“Hemi” means half.' },
            { label: 'The nerve fibers deep inside that connect the two halves of the cerebrum', answer: 'Corpus callosum', hint: 'Read step 2 of the handout again. What connects the halves inside?' },
            { label: 'The part on the ventral side that connects the brain to the spinal cord', answer: 'Brain stem', hint: 'Read the second paragraph of the reading again.' }
          ]
        },
        {
          type: 'photo',
          text: 'Take a photo of the dorsal (top) side of your brain, with the cerebrum at the top and the spinal cord at the bottom.',
          caption: 'Describe the hemispheres and the longitudinal fissure you observe.'
        }
      ]
    },

    /* ---------------------------------------------------------------- Step 4 */
    {
      title: 'Lobes, gyri, and sulci',
      intro: 'Now look at the brain from the side to find the four lobes of the cerebrum.',
      images: [
        { src: 'media/slide-4.jpg', caption: 'Lateral (side) external view: a labeled drawing of a human brain and a photo of a sheep brain.',
          alt: 'Top: a side view drawing of a human brain with each lobe in a different color. Bottom: a photo of a sheep brain seen from the side, held in gloved hands, with the front of the brain on the left.',
          text: '<p>External View. Labels on the drawing: frontal lobe (red), parietal lobe (yellow), occipital lobe (light blue), temporal lobe (purple), cerebellum, spinal cord.</p>' }
      ],
      read: '<p><b>Do it:</b> Step 4 from your lab handout.</p><ol start="4">'
        + '<li>Find the four lobes of the cerebrum (frontal, parietal, occipital, and temporal) from a side view. Notice the gyri (folds) and sulci (grooves).</li></ol>'
        + '<p><b>Read:</b> Each hemisphere of the cerebrum has four lobes. Use the colored drawing as a map. The <b>frontal lobe</b> is at the front. The <b>parietal lobe</b> is on top, behind the frontal lobe. The <b>occipital lobe</b> is at the back of the cerebrum, closest to the cerebellum. The <b>temporal lobe</b> is low on the side, under the parietal lobe.</p>'
        + '<p>A sheep brain is longer and flatter than a human brain, so the lobes are stretched out. Keep the front of the brain on your left, like in the photo.</p>',
      questions: [
        {
          type: 'selects',
          text: 'Here is the side of a sheep brain with the labels covered. Choose the name for each number.',
          img: { src: 'media/label-lateral.jpg', alt: 'A sheep brain seen from the side, held in gloved hands, with the front on the left. Colored arrows point to the front (1, red), the top middle (2, yellow), the back of the large part (3, light blue), the round part behind it (4, brown), the low front side (5, purple), and the narrow end (6, dark purple).' },
          options: ['Frontal lobe', 'Parietal lobe', 'Occipital lobe', 'Temporal lobe', 'Cerebellum', 'Spinal cord'],
          items: [
            { label: 'Number 1 (red arrow)', answer: 'Frontal lobe', hint: 'Match the arrow color to the colored drawing above. Which lobe is red?' },
            { label: 'Number 2 (yellow arrow)', answer: 'Parietal lobe', hint: 'Match the arrow color to the colored drawing above. Which lobe is yellow?' },
            { label: 'Number 3 (light blue arrow)', answer: 'Occipital lobe', hint: 'Match the arrow color to the colored drawing above. Which lobe is light blue?' },
            { label: 'Number 4 (brown arrow)', answer: 'Cerebellum', hint: 'This is not part of the cerebrum. It sits right behind it.' },
            { label: 'Number 5 (purple arrow)', answer: 'Temporal lobe', hint: 'Match the arrow color to the colored drawing above. Which lobe is purple?' },
            { label: 'Number 6 (dark purple arrow)', answer: 'Spinal cord', hint: 'This part comes off the end of the brain.' }
          ]
        },
        {
          type: 'selects',
          text: 'Where is each lobe?',
          options: ['At the front', 'On top, behind the front lobe', 'At the back, closest to the cerebellum', 'Low on the side'],
          items: [
            { label: 'Frontal lobe', answer: 'At the front', hint: 'The name is a clue.' },
            { label: 'Parietal lobe', answer: 'On top, behind the front lobe', hint: 'Find the yellow lobe on the drawing.' },
            { label: 'Occipital lobe', answer: 'At the back, closest to the cerebellum', hint: 'Find the light blue lobe on the drawing.' },
            { label: 'Temporal lobe', answer: 'Low on the side', hint: 'Find the purple lobe on the drawing.' }
          ]
        },
        {
          type: 'selects',
          text: 'Choose the word for each part of the brain’s surface.',
          options: ['Gyrus', 'Sulcus'],
          items: [
            { label: 'A fold (a raised bump) on the surface', answer: 'Gyrus', hint: 'Look back at the last paragraph of the reading in Step 3.' },
            { label: 'A groove (a dip) between the folds', answer: 'Sulcus', hint: 'Look back at the last paragraph of the reading in Step 3.' }
          ]
        },
        {
          type: 'photo',
          text: 'Take a photo of the side of your brain, with the front on the left.',
          caption: 'Which lobes could you identify? Describe the gyri and sulci you see.'
        }
      ]
    },

    /* ---------------------------------------------------------------- Step 5 */
    {
      title: 'The midsagittal cut: arbor vitae and ventricles',
      intro: 'Time to cut. Go slowly with your plastic knife and cut away from your fingers.',
      clips: ['bisect'],
      images: [
        { src: 'media/slide-5.jpg', caption: 'Internal (sagittal) view: a sheep brain cut down the middle and opened.',
          alt: 'A sheep brain cut down the middle and laid open like a book, so the two halves mirror each other on a blue tray.',
          text: '<p>Internal View.</p>' },
        { src: 'media/slide-7.jpg', caption: 'Arbor vitae close-up: a drawing and a photo of the inside of the cerebellum.',
          alt: 'Left: a drawing of the inside of the cerebellum with a white pattern that branches like a tree. Right: a photo of the cut cerebellum of a sheep brain, with faint light branching lines.',
          text: '<p>Internal View. Arbor vitae close-up.</p>' }
      ],
      read: '<p><b>Do it:</b> Steps 5, 6, and 7 from your lab handout.</p><ol start="5">'
        + '<li>Carefully make a sagittal cut along the midline of the brain. With the two halves open, find the same parts you found on the outside.</li>'
        + '<li>Look closely at the cerebellum. The branching pattern is the arbor vitae.</li>'
        + '<li>Find the ventricles (cavities) inside the brain.</li></ol>'
        + '<p><b>Read:</b> A <b>sagittal cut</b> goes along the midline, right down the longitudinal fissure. It splits the brain into left and right halves that mirror each other. This is also called a <b>midsagittal cut</b>. The video says to <b>bisect</b> the brain, which means to cut it into two halves.</p>'
        + '<p>Inside the cerebellum is a branching pattern called the <b>arbor vitae</b>, which means “tree of life.” It is white matter that carries sensory and motor information to and from the cerebellum.</p>'
        + '<p>The brain has cavities inside it called <b>ventricles</b>. They contain the <b>choroid plexus</b>, which makes <b>cerebrospinal fluid</b> (CSF). Cerebrospinal fluid surrounds the brain and spinal cord.</p>',
      questions: [
        {
          type: 'choice',
          text: 'Where do you make the sagittal cut?',
          options: ['Along the midline, down the longitudinal fissure', 'Across the frontal lobe', 'Along the transverse fissure', 'Around the edge of the cerebellum'], answer: 0,
          explain: 'Right. The cut goes down the middle, between the two hemispheres, so the two halves mirror each other.',
          tip: 'Read the first sentence of the reading again. Which cleft runs down the middle?'
        },
        {
          type: 'multi',
          text: 'After the brain is bisected, which structures does the video say to identify inside? Choose all that are correct.',
          options: ['Arbor vitae', 'Brain stem', 'Ventricles', 'Olfactory bulb', 'Optic nerve'],
          answers: ['Arbor vitae', 'Brain stem', 'Ventricles'],
          rules: [{ any: ['Olfactory bulb', 'Optic nerve'], tip: 'That one was on the outside list, before the cut. Listen to the list after “Once bisected.”' }],
          tip: 'There are more. Rewatch the clip from about 0:10 and listen to the whole list.',
          explain: 'Right. Inside, the video names the arbor vitae, the brain stem, and the ventricles.'
        },
        {
          type: 'selects',
          text: 'Match each description to the correct word.',
          options: ['Arbor vitae', 'Ventricles', 'Choroid plexus', 'Cerebrospinal fluid'],
          items: [
            { label: 'The branching “tree of life” pattern inside the cerebellum', answer: 'Arbor vitae', hint: 'Look at the second photo above. What is the branching pattern called?' },
            { label: 'Cavities inside the brain', answer: 'Ventricles', hint: 'Read the last paragraph of the reading.' },
            { label: 'Tissue inside the cavities that makes fluid', answer: 'Choroid plexus', hint: 'Read the last paragraph of the reading. What do the cavities contain?' },
            { label: 'The fluid that surrounds the brain and spinal cord', answer: 'Cerebrospinal fluid', hint: 'Its name has the brain (cerebro) and the spine in it.' }
          ]
        },
        {
          type: 'choice',
          text: 'The arbor vitae is made of white matter. What does it do?',
          options: ['Carries sensory and motor information to and from the cerebellum', 'Makes cerebrospinal fluid', 'Connects the left and right hemispheres', 'Covers the outside of the brain'], answer: 0,
          explain: 'Right. The arbor vitae carries signals to and from the cerebellum.',
          tip: 'Read the second paragraph of the reading again.'
        },
        {
          type: 'photo',
          text: 'Take a photo of the two halves of your brain laid open side by side.',
          caption: 'What do you notice about the two halves? Did you find the arbor vitae or any ventricles? Describe what you found.'
        }
      ]
    },

    /* ---------------------------------------------------------------- Step 6 */
    {
      title: 'The brain stem and the diencephalon',
      intro: 'Use one half of your brain to find the parts of the brain stem and the diencephalon.',
      images: [
        { src: 'media/slide-6.jpg', caption: 'Internal view of the brain stem and diencephalon: a drawing of half a human brain and a photo of half a sheep brain.',
          alt: 'Top: a drawing of a human brain cut down the middle, seen from the side. Bottom: half of a sheep brain seen from the cut side, with the front on the left and the cerebellum on the right.',
          text: '<p>Internal View. Brain stem and diencephalon.</p>' }
      ],
      read: '<p><b>Do it:</b> Step 8 from your lab handout.</p><ol start="8">'
        + '<li>Find the sections of the brain stem (midbrain, pons, medulla oblongata) and the diencephalon (thalamus, hypothalamus with the pituitary gland, and epithalamus with the pineal gland), found between the cerebrum and the brain stem.</li></ol>'
        + '<p><b>Read:</b> The <b>brain stem</b> has three sections. Going from the top down toward the spinal cord, they are the <b>midbrain</b>, the <b>pons</b>, and the <b>medulla oblongata</b>.</p>'
        + '<p>The <b>diencephalon</b> sits between the cerebrum and the brain stem. It is surrounded by the cerebrum, which is why you could not see it from the outside. The diencephalon has three key parts:</p><ul>'
        + '<li>the <b>thalamus</b></li>'
        + '<li>the <b>hypothalamus</b>, which contains the <b>pituitary gland</b></li>'
        + '<li>the <b>epithalamus</b>, which contains the <b>pineal gland</b></li></ul>'
        + '<p><b>Tip for the photo below:</b> the front of the brain is on the left. The thalamus sits just above the hypothalamus.</p>',
      questions: [
        {
          type: 'selects',
          text: 'Here is half of a sheep brain with the labels covered. Choose the name for each number.',
          img: { src: 'media/label-midline.jpg', alt: 'Half of a sheep brain seen from the cut side, front on the left. Brackets mark the large part on the left (1), the round part on the right (2), the long stalk along the bottom (9), and the narrow end (8). Smaller brackets along the bottom mark two parts near the middle (3 above 4) and three parts along the stalk (5, 6, and 7).' },
          options: ['Cerebrum', 'Cerebellum', 'Thalamus', 'Hypothalamus', 'Midbrain', 'Pons', 'Medulla oblongata', 'Spinal cord', 'Brain stem'],
          items: [
            { label: 'Number 1', answer: 'Cerebrum', hint: 'This bracket covers the biggest part of the brain.' },
            { label: 'Number 2', answer: 'Cerebellum', hint: 'Look for the arbor vitae pattern inside this part.' },
            { label: 'Number 3', answer: 'Thalamus', hint: 'It is part of the diencephalon. Read the tip at the end of the reading.' },
            { label: 'Number 4', answer: 'Hypothalamus', hint: 'It is part of the diencephalon, just under number 3. “Hypo” means under.' },
            { label: 'Number 5', answer: 'Midbrain', hint: 'It is the first section of the brain stem, at the top.' },
            { label: 'Number 6', answer: 'Pons', hint: 'It is the middle section of the brain stem.' },
            { label: 'Number 7', answer: 'Medulla oblongata', hint: 'It is the last section of the brain stem, closest to the spinal cord.' },
            { label: 'Number 8', answer: 'Spinal cord', hint: 'This part comes off the end of the brain.' },
            { label: 'Number 9', answer: 'Brain stem', hint: 'This long bracket covers three sections together.' }
          ]
        },
        {
          type: 'order',
          text: 'Put these in order, starting at the top of the brain stem and going down to the spinal cord.',
          items: ['Midbrain', 'Pons', 'Medulla oblongata', 'Spinal cord'],
          tip: 'Read the first paragraph of the reading again. It lists the sections from the top down.',
          explain: 'Right. Midbrain, then pons, then medulla oblongata, and then the spinal cord.'
        },
        {
          type: 'selects',
          text: 'Which part of the diencephalon contains each gland?',
          options: ['Thalamus', 'Hypothalamus', 'Epithalamus'],
          items: [
            { label: 'Pituitary gland', answer: 'Hypothalamus', hint: 'Read the list in the reading. Which part has the pituitary gland with it?' },
            { label: 'Pineal gland', answer: 'Epithalamus', hint: 'Read the list in the reading. Which part has the pineal gland with it?' }
          ]
        },
        {
          type: 'choice',
          text: 'Why could you not see the diencephalon from the outside of the brain?',
          options: ['It is surrounded by the cerebrum', 'It is inside the spinal cord', 'It is removed with the dura mater', 'It is only in human brains'], answer: 0,
          explain: 'Right. The diencephalon sits deep in the middle, between the cerebrum and the brain stem, with the cerebrum all around it.',
          tip: 'Read the second paragraph of the reading again.'
        },
        {
          type: 'photo',
          text: 'Take a photo of the cut side of one half of your brain, with the front on the left.',
          caption: 'Which brain stem and diencephalon structures could you identify?'
        }
      ]
    },

    /* ---------------------------------------------------------------- Step 7 */
    {
      title: 'Gray matter, white matter, and clean up',
      intro: 'Make one last cut to compare the gray matter and the white matter. Then clean up.',
      clips: ['matter'],
      images: [
        { src: 'media/slide-8.jpg', caption: 'Cross-section of the frontal lobe of a sheep brain.',
          alt: 'Two photos of a slice of sheep brain held in gloved hands. The slice has a wavy darker edge along the folds and lighter streaks inside.',
          text: '<p>Cross-section of the frontal lobe.</p>' }
      ],
      read: '<p><b>Do it:</b> Step 9 from your lab handout.</p><ol start="9">'
        + '<li>Make any other observations you need. Then make one last transverse cut across the frontal lobe of the cerebrum. Compare the gray matter to the white matter.</li></ol>'
        + '<p><b>Read:</b> A <b>transverse cut</b> goes across the brain, like slicing a loaf of bread. The brain is made of two kinds of tissue. The <b>gray matter</b> is mostly made of <b>nonmyelinated</b> neurons. The <b>white matter</b> is mainly made of <b>myelinated axons</b> that form connections among the gray matter.</p>'
        + '<p>In the cross-section, the gray matter is the darker layer along the outside edge, following the folds. The white matter is the lighter tissue inside.</p>'
        + '<p><b>Clean up:</b> Take your last photo below first. Then:</p><ol>'
        + '<li>Throw away your specimen, your tools, your gloves, and your apron. You may keep your goggles if you like.</li>'
        + '<li>Wipe down your work space.</li>'
        + '<li>Wash your hands well with soap and water.</li>'
        + '<li>Take the plastic wrap (or bag) off your keyboard last, once your hands are clean, and throw it away.</li></ol>',
      questions: [
        {
          type: 'choice',
          text: 'In the video, where do you cut to see the white and gray matter?',
          options: ['Across the frontal lobe', 'Down the medial longitudinal fissure', 'Through the cerebellum', 'Along the spinal cord'], answer: 0,
          explain: 'Right. The last cut goes across the frontal lobe.',
          tip: 'Rewatch the short clip. It names the lobe you cut across.'
        },
        {
          type: 'selects',
          text: 'Choose gray matter or white matter for each description.',
          options: ['Gray matter', 'White matter'],
          items: [
            { label: 'Mostly made of nonmyelinated neurons', answer: 'Gray matter', hint: 'Read the reading again. Which one has no myelin?' },
            { label: 'Mainly made of myelinated axons', answer: 'White matter', hint: 'Read the reading again. Which one has myelin?' },
            { label: 'The darker layer along the outside edge of the slice', answer: 'Gray matter', hint: 'Read the second paragraph of the reading. Which one is darker?' },
            { label: 'The lighter tissue inside the slice', answer: 'White matter', hint: 'Read the second paragraph of the reading. Which one is lighter?' },
            { label: 'The arbor vitae inside the cerebellum is made of this', answer: 'White matter', hint: 'Look back at the reading in Step 5.' }
          ]
        },
        {
          type: 'order',
          text: 'Put the clean-up steps in order.',
          items: ['Take your last photo', 'Throw away the specimen, tools, gloves, and apron', 'Wipe down your work space', 'Wash your hands with soap and water', 'Take the plastic wrap off your keyboard'],
          tip: 'Read the clean-up list again. Your hands should be clean before you touch your keyboard.',
          explain: 'Right. The plastic wrap comes off last, after your hands are clean.'
        },
        {
          type: 'photo',
          text: 'Take a photo of the cut side of your frontal lobe slice.',
          caption: 'Describe the difference between the gray matter and the white matter you observe.'
        }
      ]
    },

    /* ---------------------------------------------------------------- Step 8 */
    {
      title: 'Structure and function',
      intro: 'You can see where a structure is and what it looks like on your specimen, but you can’t see its function just by looking. Use the Function Reference Guide from your handout to match each structure to its job.',
      read: '<p><b>Read:</b> This is the Function Reference Guide from your lab handout.</p>',
      tableHtml: '<table><thead><tr><th>Structure</th><th>Function</th></tr></thead><tbody>'
        + '<tr><td><b>Cerebrum</b></td><td>The largest part of the brain. Handles voluntary movement, sensory processing, language, reasoning, and higher-level thought.</td></tr>'
        + '<tr><td>Frontal lobe</td><td>Involved in reasoning, planning, problem-solving, voluntary movement, and decision-making/personality.</td></tr>'
        + '<tr><td>Parietal lobe</td><td>Processes sensory information such as touch, temperature, and pain, and helps with spatial awareness.</td></tr>'
        + '<tr><td>Occipital lobe</td><td>Mainly processes visual information from the eyes.</td></tr>'
        + '<tr><td>Temporal lobe</td><td>Processes auditory information (hearing) and plays a key role in forming memories.</td></tr>'
        + '<tr><td><b>Diencephalon</b></td><td>A relay and regulating region between the cerebrum and brain stem. Contains the thalamus, hypothalamus, and epithalamus.</td></tr>'
        + '<tr><td>Thalamus</td><td>Acts as a relay station, passing most incoming sensory and motor signals to the cerebral cortex.</td></tr>'
        + '<tr><td>Hypothalamus</td><td>Regulates body temperature, hunger, thirst, and sleep, and links the nervous system to the endocrine system through the pituitary gland.</td></tr>'
        + '<tr><td>Pituitary gland</td><td>Often called the “master gland.” Releases hormones that regulate growth, metabolism, and other glands throughout the body.</td></tr>'
        + '<tr><td>Epithalamus</td><td>Connects the limbic system to other parts of the brain. Contains the pineal gland.</td></tr>'
        + '<tr><td>Pineal gland</td><td>Produces melatonin, which helps regulate the sleep-wake cycle (circadian rhythm).</td></tr>'
        + '<tr><td><b>Cerebellum</b></td><td>Coordinates voluntary movement, balance, posture, and motor learning.</td></tr>'
        + '<tr><td><b>Ventricles</b></td><td>Fluid-filled cavities that produce and circulate cerebrospinal fluid (CSF), which cushions the brain and spinal cord.</td></tr>'
        + '<tr><td><b>Brain stem</b></td><td>Connects the brain to the spinal cord. Controls automatic functions like breathing and heart rate.</td></tr>'
        + '<tr><td>Midbrain</td><td>Involved in vision, hearing, eye movement, and body movement control.</td></tr>'
        + '<tr><td>Pons</td><td>Relays signals between different parts of the brain and helps regulate breathing.</td></tr>'
        + '<tr><td>Medulla oblongata</td><td>Controls vital involuntary functions such as heart rate, breathing, and blood pressure.</td></tr>'
        + '<tr><td><b>Spinal cord</b></td><td>Carries signals between the brain and the rest of the body, and controls many reflexes on its own.</td></tr>'
        + '</tbody></table>',
      questions: [
        {
          type: 'selects',
          text: 'The cerebrum and cerebellum: choose the job of each structure.',
          options: ['Reasoning, planning, and problem-solving', 'Touch, temperature, and pain', 'Vision', 'Hearing and forming memories', 'Balance, posture, and coordinating movement'],
          items: [
            { label: 'Frontal lobe', answer: 'Reasoning, planning, and problem-solving', hint: 'Find the frontal lobe row in the guide.' },
            { label: 'Parietal lobe', answer: 'Touch, temperature, and pain', hint: 'Find the parietal lobe row in the guide.' },
            { label: 'Occipital lobe', answer: 'Vision', hint: 'Find the occipital lobe row in the guide. What comes from the eyes?' },
            { label: 'Temporal lobe', answer: 'Hearing and forming memories', hint: 'Find the temporal lobe row in the guide.' },
            { label: 'Cerebellum', answer: 'Balance, posture, and coordinating movement', hint: 'Find the cerebellum row in the guide.' }
          ]
        },
        {
          type: 'selects',
          text: 'The diencephalon, brain stem, and more: choose the job of each structure.',
          options: ['Relay station that passes signals to the cerebral cortex', 'Regulates body temperature, hunger, thirst, and sleep', 'The “master gland” that releases hormones', 'Makes melatonin for the sleep-wake cycle', 'Controls heart rate, breathing, and blood pressure', 'Make and circulate cerebrospinal fluid', 'Carries signals between the brain and the body'],
          items: [
            { label: 'Thalamus', answer: 'Relay station that passes signals to the cerebral cortex', hint: 'Find the thalamus row in the guide.' },
            { label: 'Hypothalamus', answer: 'Regulates body temperature, hunger, thirst, and sleep', hint: 'Find the hypothalamus row in the guide.' },
            { label: 'Pituitary gland', answer: 'The “master gland” that releases hormones', hint: 'Find the pituitary gland row in the guide. What is it often called?' },
            { label: 'Pineal gland', answer: 'Makes melatonin for the sleep-wake cycle', hint: 'Find the pineal gland row in the guide.' },
            { label: 'Medulla oblongata', answer: 'Controls heart rate, breathing, and blood pressure', hint: 'Find the medulla oblongata row in the guide.' },
            { label: 'Ventricles', answer: 'Make and circulate cerebrospinal fluid', hint: 'Find the ventricles row in the guide. Think back to Step 5.' },
            { label: 'Spinal cord', answer: 'Carries signals between the brain and the body', hint: 'Find the spinal cord row in the guide.' }
          ]
        },
        {
          type: 'choice',
          text: 'After a fall, a person has trouble keeping their balance and walking smoothly. Which part of the brain was most likely hurt?',
          options: ['Cerebellum', 'Occipital lobe', 'Pineal gland', 'Temporal lobe'], answer: 0,
          explain: 'Right. The cerebellum coordinates movement, balance, and posture.',
          tip: 'Look through the guide for the part that handles balance and posture.'
        },
        {
          type: 'choice',
          text: 'A person has an injury at the back of the cerebrum. Which problem are they most likely to have?',
          options: ['Trouble seeing', 'Trouble hearing', 'Trouble feeling hot and cold', 'Trouble with hunger and thirst'], answer: 0,
          explain: 'Right. The occipital lobe is at the back of the cerebrum, and it processes what you see.',
          tip: 'First, think back to Step 4. Which lobe is at the back? Then find its row in the guide.'
        }
      ]
    },

    /* ---------------------------------------------------------------- Step 9 */
    {
      title: 'Reflection',
      intro: 'These are the reflection questions from your lab handout. Answer them in complete sentences, in your own words, using what you saw in your own dissection.',
      questions: [
        {
          type: 'written',
          text: 'What structures were you able to find with ease on the outside of the sheep’s brain? What structures were harder to identify, and why do you think that was? (2 to 4 sentences)',
          min: 40,
          ideas: [
            { done: 'You named a structure on the outside of the brain.', q: 'Did you name at least one structure on the outside?', tip: 'Look back at Steps 3 and 4. What did you find before you cut?', re: /cerebr|cerebell|brain ?stem|spinal|hemispher|fissure|lobe|frontal|pariet|occipit|tempor|gyr|sulc|meninge|dura/ },
            { done: 'You told which structures were easy to find.', q: 'Did you tell which structures were easy to find?', tip: 'Which part did you find first, or right away?', re: /eas(y|ier|iest|ily)|simple|quick(ly)?|right away|obvious|clear(ly)?|no problem|first/ },
            { done: 'You told which structures were harder to find.', q: 'Did you tell which structures were harder to find?', tip: 'Which part took you the longest, or which one were you not sure about?', re: /hard|difficult|tough|tricky|confus|struggl|couldn.?t|could not|not sure|unsure|took (a while|longer|me)|challeng/ },
            { done: 'You explained why.', q: 'Did you explain why it was harder?', tip: 'Add a “because” sentence. Was it small, hidden, the same color, or different from the photo?', re: /because|since|so\b|small|tiny|hidden|same colou?r|look(ed)? (the )?same|blend|different|didn.?t look|covered|flat|stretch/ },
            { done: 'You wrote at least 2 sentences.', q: 'Did you write 2 to 4 full sentences?', tip: 'Add another sentence.', sentences: 2 }
          ]
        },
        {
          type: 'written',
          text: 'What structures were you able to find with ease inside the brain, after making the midsagittal cut? What structures were harder to identify? (2 to 4 sentences)',
          min: 40,
          ideas: [
            { done: 'You named a structure inside the brain.', q: 'Did you name at least one structure inside the brain?', tip: 'Look back at Steps 5 to 7. What did you find after you cut?', re: /arbor|vitae|ventricle|choroid|corpus|callosum|thalam|hypothal|epithal|pituitar|pineal|midbrain|pons|medulla|brain ?stem|diencephal|gray|grey|white matter|cerebell|cerebr/ },
            { done: 'You told which structures were easy to find.', q: 'Did you tell which structures were easy to find?', tip: 'Which part did you find first, or right away?', re: /eas(y|ier|iest|ily)|simple|quick(ly)?|right away|obvious|clear(ly)?|no problem|first/ },
            { done: 'You told which structures were harder to find.', q: 'Did you tell which structures were harder to find?', tip: 'Which part took you the longest, or which one were you not sure about?', re: /hard|difficult|tough|tricky|confus|struggl|couldn.?t|could not|not sure|unsure|took (a while|longer|me)|challeng/ },
            { done: 'You wrote at least 2 sentences.', q: 'Did you write 2 to 4 full sentences?', tip: 'Add another sentence.', sentences: 2 }
          ]
        },
        {
          type: 'written',
          text: 'What surprised you about the structure and organization of the brain? (2 to 4 sentences)',
          min: 40,
          ideas: [
            { done: 'You told what surprised you.', q: 'Did you say what surprised you?', tip: 'Start with “I was surprised that…” or “I didn’t expect…”', re: /surpris|didn.?t (know|expect|think|realize)|did not (know|expect|think|realize)|expect|thought|amaz|interest|shock|never knew|cool|weird|strange/ },
            { done: 'You named a part of the brain.', q: 'Did you name the part of the brain that surprised you?', tip: 'Which structure was it? Use its name.', re: /cerebr|cerebell|brain ?stem|spinal|hemispher|fissure|lobe|gyr|sulc|meninge|dura|arbor|vitae|ventricle|choroid|corpus|callosum|thalam|pituitar|pineal|midbrain|pons|medulla|diencephal|gray|grey|white matter|fold|groove/ },
            { done: 'You explained why it surprised you.', q: 'Did you explain why it surprised you?', tip: 'Add a “because” sentence. What did you think before, and what did you see?', re: /because|since|so\b|which|that means|than|instead|bigger|smaller|thick|thin|tough|soft|hard|small|big|tiny|firm/ },
            { done: 'You wrote at least 2 sentences.', q: 'Did you write 2 to 4 full sentences?', tip: 'Add another sentence.', sentences: 2 }
          ]
        },
        {
          type: 'highlight',
          text: 'How did doing this dissection help you understand the brain’s structure better than only looking at diagrams or photos? Use evidence from your own dissection and the video.',
          min: 60,
          ideas: [
            { done: 'You wrote about the brain’s structure (what a part looks like, feels like, or where it is).', q: 'Did you write about structure?', tip: 'Describe something you saw or felt, like the folds, the arbor vitae, or the gray and white matter.', re: /structur|shape|fold|groove|gyr|sulc|lobe|layer|inside|outside|size|look(s|ed)?|saw|see|seeing|felt|feel|texture|colou?r|where|located|location|position|arbor|matter|half|halves/ },
            { done: 'You compared the dissection to diagrams or photos.', q: 'Did you compare your dissection to diagrams or photos?', tip: 'Tell what was different about seeing and touching a real brain, compared to a picture.', re: /diagram|photo|picture|drawing|image|textbook|screen|real|in person|hands.?on|3.?d|three.?dimension|touch|hold|held|compar|instead|than|different/ },
            { done: 'You used transition words to point to your evidence.', q: 'Did you use transition words to point to your evidence?', tip: 'Introduce your evidence with words like “For example,” “According to the video,” “When I cut,” or “This shows that.”', re: /for example|for instance|according to|this shows|that shows|which shows|shows that|evidence|in the video|the video (says|said|shows|showed|explains|explained|mentions|mentioned)|because|such as|as an example|one example|proves?|this means|supports?|when i (cut|saw|looked|felt|opened|held|touched|removed|found)|in my dissection/ },
            { done: 'You highlighted your transition words in yellow.', q: 'Did you highlight your transition words in yellow?', tip: 'Go back and select the transition words that point to your evidence, then press the yellow button.', highlight: true },
            { done: 'You wrote at least 2 sentences.', q: 'Did you write at least 2 full sentences?', tip: 'Add another sentence.', sentences: 2 }
          ]
        },
        {
          type: 'written',
          text: 'What parts of the brain are still confusing for you? Be specific about what you are unsure of. (2 to 4 sentences)',
          min: 40,
          ideas: [
            { done: 'You named something that is still confusing.', q: 'Did you name something that is still confusing to you?', tip: 'It is OK to be confused! Start with “I am still not sure about…”', re: /confus|still|unsure|not sure|don.?t (get|understand|know)|do not (get|understand|know)|wonder|question|hard to|unclear|mix(ed)? up/ },
            { done: 'You named a part of the brain.', q: 'Did you name the part of the brain you are asking about?', tip: 'Which structure is it? Use its name.', re: /cerebr|cerebell|brain ?stem|spinal|hemispher|fissure|lobe|gyr|sulc|meninge|dura|arbor|vitae|ventricle|choroid|corpus|callosum|thalam|pituitar|pineal|midbrain|pons|medulla|diencephal|gray|grey|white matter|cortex|gland/ },
            { done: 'You were specific about what you are unsure of.', q: 'Did you say exactly what you are unsure of?', tip: 'Is it where the part is, what it looks like, or what it does?', re: /where|locat|find|found|look|what it does|function|job|does|work|differen|tell apart|between|which/ },
            { done: 'You wrote at least 2 sentences.', q: 'Did you write 2 to 4 full sentences?', tip: 'Add another sentence.', sentences: 2 }
          ]
        }
      ]
    }
  ]
};
