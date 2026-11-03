/*
  Explore - Joint Classification and Movement (Anatomy & Physiology A)
  Everything a student sees is written in this file. The shared engine in /engine builds the page,
  progress bars, PDF printout, Listen buttons, and captions from it.

  This combines two classroom workbooks: "Explore - Joint Classification & Movement" (Parts 1 to 3, plus its
  critical-thinking questions spread through those parts) and "Explore - The Muscular System" (the six station
  cards, in Parts 7 and 8). Part 1 is a vocabulary deck: students say 20 words and definitions out loud. The teacher asked for no full video at the top: students watch only the short clips
  in each part. Clips come from three videos (originals and transcripts in source/, not saved to GitHub):
    - Crash Course A&P #20 "Joints" (starts at 1:47, as the teacher asked). Captions: the teacher's transcript,
      lined up to this video file's audio. The 1:49 to 2:02 lines were not in her transcript and were transcribed
      from the audio.
    - "Anatomical Terms of Movement" has music and words on the screen but no talking. Its captions describe what
      is on the screen (the words shown and what the person does), read from the video's frames.
    - Crash Course A&P #21 "Muscles, Part 1: Muscle Cells" (starts at 1:11). Captions: the teacher's transcript.
  Diagrams are the pictures from the joints workbook. Station cards © It's Not Rocket Science.
  Write *scientific names* between asterisks to show them in italics. Reading boxes and tables use HTML.
  Full guide: docs/ASSIGNMENT_FORMAT.md
*/
window.ASSIGNMENT = {
  title: 'Explore - Joint Classification and Movement',
  course: 'Anatomy & Physiology A',
  storageKey: 'explore-joint-classification-and-movement-v3',
  short: 'joints-and-movement',             // short link: SITE/joints-and-movement

  /* supported version (?support=eagle): the goal box at the top */
  essential: {
    question: 'How do the shape of a joint and the muscles around it let your body move?',
    goals: [
      'Classify a joint by what holds it together and by how much it moves.',
      'Match each kind of synovial joint to the movements it allows.',
      'Use movement words like flexion, extension, abduction, and adduction.',
      'Name some major muscles, and tell how a muscle pulls on a bone to move it.'
    ]
  },

  icon: '<svg viewBox="0 0 64 72" aria-hidden="true" focusable="false"><rect x="6" y="10" width="52" height="52" rx="12" fill="var(--primary)"/>'
    + '<rect x="17" y="17" width="9" height="20" rx="4.5" fill="var(--primary-ink)" transform="rotate(-25 21.5 27)"/>'
    + '<rect x="33" y="36" width="9" height="20" rx="4.5" fill="var(--primary-ink)" transform="rotate(-70 37.5 46)"/>'
    + '<circle cx="28" cy="39" r="7" fill="var(--primary-ink)"/><circle cx="28" cy="39" r="3" fill="var(--primary)"/></svg>',

  /* No full video at the top (the teacher's choice): each part has its own short clips. */

  /* Short clips. from/to are times in the video named by "of" (they are shown to students). */
  clips: {
    skeleton:  { support: false, src: 'media/clip-skeleton.mp4', from: 107, to: 220.91, seconds: 114, title: 'A quick review: the axial and appendicular skeleton',
                 of: 'Joints: Crash Course Anatomy & Physiology #20' },
    classify:  { src: 'media/clip-classify.mp4', from: 220.91, to: 337.42, seconds: 117, title: 'Two ways to classify joints: structure and function',
                 of: 'Joints: Crash Course Anatomy & Physiology #20' },
    synovial:  { src: 'media/clip-synovial.mp4', from: 337.42, to: 466.18, seconds: 129, title: 'Synovial joints at the dance party: plane, hinge, condylar, and ball-and-socket',
                 of: 'Joints: Crash Course Anatomy & Physiology #20' },
    special:   { src: 'media/clip-special.mp4', from: 466.18, to: 493.33, seconds: 28, title: 'Saddle joints and pivot joints',
                 of: 'Joints: Crash Course Anatomy & Physiology #20' },
    moveA:     { src: 'media/clip-moveA.mp4', from: 0, to: 126, seconds: 126, title: 'Flexion, extension, abduction, adduction, and circumduction',
                 of: 'Anatomical Terms of Movement' },
    moveB:     { src: 'media/clip-moveB.mp4', from: 126, to: 265.5, seconds: 140, title: 'Rotation, dorsiflexion, plantarflexion, elevation, depression, protraction, and retraction',
                 of: 'Anatomical Terms of Movement' },
    palm:      { src: 'media/clip-palm.mp4', from: 474.81, to: 493.33, seconds: 19, title: 'Supination and pronation',
                 of: 'Joints: Crash Course Anatomy & Physiology #20' },
    tissues:   { src: 'media/clip-tissues.mp4', from: 71, to: 142.37, seconds: 72, title: 'Three types of muscle tissue',
                 of: 'Muscles, Part 1: Muscle Cells (Crash Course Anatomy & Physiology #21)' },
    structure: { src: 'media/clip-structure.mp4', from: 142.37, to: 205.52, seconds: 64, title: 'A skeletal muscle is built like a rope',
                 of: 'Muscles, Part 1: Muscle Cells (Crash Course Anatomy & Physiology #21)' },
    filaments: { src: 'media/clip-filaments.mp4', from: 205.52, to: 343.51, seconds: 139, title: 'Two protein rules, sarcomeres, actin, and myosin',
                 of: 'Muscles, Part 1: Muscle Cells (Crash Course Anatomy & Physiology #21)' },
    signal:    { src: 'media/clip-signal.mp4', from: 343.51, to: 431.93, seconds: 89, title: 'From a nerve signal to calcium',
                 of: 'Muscles, Part 1: Muscle Cells (Crash Course Anatomy & Physiology #21)' },
    cycle:     { src: 'media/clip-cycle.mp4', from: 431.93, to: 581.71, seconds: 150, title: 'The sliding filament model, step by step',
                 of: 'Muscles, Part 1: Muscle Cells (Crash Course Anatomy & Physiology #21)' }
  },

  parts: [
    /* ---------------------------------------------------------------- Part 1: vocabulary */
    {
      title: 'Vocabulary',
      intro: 'Before you start, practice the 20 words you will use in this assignment. You will say each word and its definition out loud. Saying words out loud helps your brain remember them, and it lets your teacher hear from you. Find a spot where you can talk, and make sure your microphone works.',
      read: '<p><b>Read:</b> These are the 20 words for this assignment.</p>'
        + '<p><b>Joints</b></p><ul>'
        + '<li><b>Joint</b>: a place where two or more bones meet.</li>'
        + '<li><b>Fibrous joint</b>: a joint held together by dense fibrous connective tissue, with no joint cavity. Most do not move.</li>'
        + '<li><b>Cartilaginous joint</b>: a joint where cartilage joins the bones. It has no joint cavity and moves only a little.</li>'
        + '<li><b>Synovial joint</b>: a freely movable joint with a fluid-filled joint cavity between the bones.</li>'
        + '<li><b>Synarthrosis</b>: a joint that does not move at all, like the sutures between the skull bones.</li>'
        + '<li><b>Amphiarthrosis</b>: a joint that moves only slightly, like where the two pubic bones meet.</li>'
        + '<li><b>Diarthrosis</b>: a joint that moves freely, like the knee and the elbow.</li></ul>'
        + '<p><b>Movement</b></p><ul>'
        + '<li><b>Flexion</b>: a movement that decreases the angle of a joint, such as bending your elbow.</li>'
        + '<li><b>Extension</b>: a movement that increases the angle of a joint, such as straightening your elbow.</li>'
        + '<li><b>Abduction</b>: moving a body part away from the midline of the body.</li>'
        + '<li><b>Adduction</b>: moving a body part toward the midline of the body.</li>'
        + '<li><b>Rotation</b>: turning a bone around its own long axis, like shaking your head “no.”</li>'
        + '<li><b>Circumduction</b>: moving a limb in a cone-shaped path, like drawing a big circle in the air with your arm.</li></ul>'
        + '<p><b>Muscles</b></p><ul>'
        + '<li><b>Skeletal muscle</b>: striated, mostly voluntary muscle that attaches to bones and pulls on them to move the body.</li>'
        + '<li><b>Muscle fiber</b>: one muscle cell. It is made of many tiny threads called myofibrils.</li>'
        + '<li><b>Sarcomere</b>: a segment of a myofibril, between two Z lines. Sarcomeres shorten when a muscle contracts.</li>'
        + '<li><b>Actin</b>: the protein that makes up the thin filaments. Myosin grabs actin and pulls it.</li>'
        + '<li><b>Myosin</b>: the protein that makes up the thick filaments. Its heads grab actin and pull it.</li>'
        + '<li><b>Prime mover</b>: the main muscle that makes a movement, like the diaphragm when you breathe in.</li>'
        + '<li><b>Antagonist</b>: a muscle that does the opposite movement of another muscle, like the triceps (straightens the elbow) against the biceps (bends it).</li></ul>'
        + '<p><b>How the speaking cards work:</b> The cards come one at a time. Press <b>Listen</b> to hear the word and its definition. Then press <b>Say it</b>, say the word, and read its definition out loud. The card turns green when it hears the word and its key ideas, and then the next card opens. If your browser asks to use the microphone, choose <b>Allow</b>.</p>'
        + '<p><b>Memory tip:</b> <b>Ab</b>duction <b>ab</b>ducts (takes away) your arm from your body. <b>Add</b>uction <b>add</b>s your arm back to your body.</p>'
        + '<p>If your microphone isn’t working, reach out to IT to get it working. It’s so important for us to hear from you in our online school, so you’ll need a working microphone to finish this activity.</p>',
      questions: [
        {
          type: 'speak',
          deck: true,
          text: 'Read each card out loud. Listen to the card first if you like. Then press Say it, say the word, and read its definition. The next card opens when this one turns green.',
          easy: 'Say each card out loud. You can press Listen first. Then press Say it. Say the word and read the definition. The card turns green, and the next card opens.',
          cards: [
            { term: 'Joint', def: 'A place where two or more bones meet.',
              img: { src: 'media/card-joint.jpg', alt: 'Drawing of the ends of two bones meeting at a joint.' },
              say: /\bjoints?\b|\bjoin\b/, keys: [/\bbones?\b/, /\b(meet|meets|meeting|connect|connects|join|joins|come together|comes together)\b/] },
            { term: 'Fibrous joint', def: 'A joint held together by dense fibrous connective tissue, with no joint cavity. Most do not move.',
              img: { src: 'media/card-fibrous.jpg', alt: 'Drawing of two bones tied together by strands of dense connective tissue, with no space between them.' },
              say: /\bfib(rous|erous|ros|rus|res?|ers?)\b|\bfiber us\b|\bfibro/, keys: [/\b(connective|tissue|fibers?|fibres?)\b/, /\b(cavity|cavities|move|moves|movement)\b/] },
            { term: 'Cartilaginous joint', def: 'A joint where cartilage joins the bones. It has no joint cavity and moves only a little.',
              img: { src: 'media/card-cartilaginous.jpg', alt: 'Drawing of two bones joined by a pad of cartilage, with no space between them.' },
              say: /\bcartil|\bcart[ae]l[ae]|\bcartlidge|\bcartlage|\bcarti/, keys: [/\b(little|slight|slightly|bit|cavity)\b/] },
            { term: 'Synovial joint', def: 'A freely movable joint with a fluid-filled joint cavity between the bones.',
              img: { src: 'media/card-synovial.jpg', alt: 'Drawing of two bones with a fluid-filled joint cavity between them, inside a capsule.' },
              say: /\bsyn?ovi(al|el|ol)\b|\bsign? ?ovial\b|\bsenovial\b|\bsynovial\b|\bsin ?ovial\b/, keys: [/\b(move|moves|moving|movable|moveable|freely)\b/, /\b(fluid|liquid|cavity)\b/] },
            { term: 'Synarthrosis', def: 'A joint that does not move at all, like the sutures between the skull bones.',
              img: { src: 'media/card-synarthrosis.jpg', alt: 'Drawing of a skull from the video, with the word synarthroses.' },
              say: /\bsyn|\bsin ?ar|\bsen ?ar|arthr|throsis|throw ?sis/, keys: [/(not|doesnt|dont|no|cannot|cant|never) (move|moving)|immovable|at all/, /\b(skull|sutures?|cranium|cranial)\b/] },
            { term: 'Amphiarthrosis', def: 'A joint that moves only slightly, like where the two pubic bones meet.',
              img: { src: 'media/card-amphiarthrosis.jpg', alt: 'Drawing of the pelvis from the video, where the two pubic bones meet at the front, with the word amphiarthroses.' },
              say: /\bamph|\bamf|\bam ?fee|\bam ?fi|arthr|throsis|throw ?sis/, keys: [/\b(slight|slightly|little|bit|partly|partially)\b/, /\b(pubic|pubis|public|pelvis|pelvic)\b/] },
            { term: 'Diarthrosis', def: 'A joint that moves freely, like the knee and the elbow.',
              img: { src: 'media/card-diarthrosis.jpg', alt: 'Drawing of a knee joint from the video, with the word diarthroses.' },
              say: /\bdi ?arth|\bdie ?arth|\bdye ?arth|\bdiar|arthr|throsis|throw ?sis/, keys: [/\b(freely|free|fully|movable|moveable)\b/, /\b(knee|knees|elbow|elbows)\b/] },
            { term: 'Flexion', def: 'A movement that decreases the angle of a joint, such as bending your elbow.',
              img: { src: 'media/card-flexion.jpg', alt: 'A person from the movement video bending both elbows so the hands come up to the shoulders, with the word flexion.' },
              say: /\bflexi(on|ng)\b|\bflection\b|\bflecks? ?ion\b|\bflexion\b/, keys: [/\b(decrease|decreases|decreasing|smaller|less|bend|bends|bending)\b/, /\b(angle|joint|elbow)\b/] },
            { term: 'Extension', def: 'A movement that increases the angle of a joint, such as straightening your elbow.',
              img: { src: 'media/card-extension.jpg', alt: 'A person from the movement video holding both arms straight out to the sides, with the word extension.' },
              say: /\bextension\b|\bextend\b|\bexstension\b/, keys: [/\b(increase|increases|increasing|bigger|larger|straight|straighten|straightens|straightening)\b/, /\b(angle|joint|elbow)\b/] },
            { term: 'Abduction', def: 'Moving a body part away from the midline of the body.',
              img: { src: 'media/card-abduction.jpg', alt: 'A person from the movement video raising both arms out to the sides, away from the body, with the word abduction.' },
              say: /\b(abduct|abduction|adduction|ab duction|add duction|a duction|abductions)\b/, keys: [/\baway\b/, /\b(midline|middle|center|centre|body)\b/], not: /\b(toward|towards|closer)\b/ },
            { term: 'Adduction', def: 'Moving a body part toward the midline of the body.',
              img: { src: 'media/card-adduction.jpg', alt: 'A person from the movement video with both arms back down at the sides, with the word adduction.' },
              say: /\b(adduct|adduction|abduction|add duction|ad duction|a duction|adductions)\b/, keys: [/\b(toward|towards|to|closer|back)\b/, /\b(midline|middle|center|centre|body)\b/], not: /\baway\b/ },
            { term: 'Rotation', def: 'Turning a bone around its own long axis, like shaking your head “no.”',
              img: { src: 'media/card-rotation.jpg', alt: 'A person from the movement video turning both arms inward, with arrows and the words medial rotation.' },
              say: /\brotat|\brow ?tation\b|\brotation\b/, keys: [/\b(turn|turns|turning|spin|spins|spinning|twist|twists)\b/, /\b(axis|axes|access|axle|axel)\b/] },
            { term: 'Circumduction', def: 'Moving a limb in a cone-shaped path, like drawing a big circle in the air with your arm.',
              img: { src: 'media/card-circumduction.jpg', alt: 'A person from the movement video moving one arm in a circle, with the word circumduction.' },
              say: /\bcircum|\bsircum|\bsir ?come|\bcircle ?duction|\bcircumduction\b/, keys: [/\b(cone|cones|conical|circle|circles|circular)\b/, /\b(limb|arm|path)\b/] },
            { term: 'Skeletal muscle', def: 'Striated, mostly voluntary muscle that attaches to bones and pulls on them to move the body.',
              img: { src: 'media/card-skeletal-muscle.jpg', alt: 'The host of the muscles video flexing his arms, with the words 640 skeletal muscles.' },
              say: /\bskelet(al|on|ol|le)\b|\bskeleton\b/, keys: [/\bbones?\b/, /\b(pull|pulls|pulling|move|moves|movement|voluntary)\b/] },
            { term: 'Muscle fiber', def: 'One muscle cell. It is made of many tiny threads called myofibrils.',
              img: { src: 'media/card-muscle-fiber.jpg', alt: 'Drawing from the muscles video of one muscle fiber cut open to show the bundle of tiny threads inside, labeled nuclei, sarcolemma, and mitochondria.' },
              say: /\bfib(er|re|ers|res)\b|\bfiver\b/, keys: [/\bcells?\b/, /\b(threads?|myofibrils?|my ?o ?fibrils?|fibrils?)\b/] },
            { term: 'Sarcomere', def: 'A segment of a myofibril, between two Z lines. Sarcomeres shorten when a muscle contracts.',
              img: { src: 'media/card-sarcomere.jpg', alt: 'Drawing from the muscles video of a myofibril with one segment marked sarcomere.' },
              say: /\bsarc|\bsark|\bsar ?co|\bsorc|\bsor ?co/, keys: [/\b(shorten|shortens|shorter|contract|contracts|contracting)\b/, /\b(z|zee|line|lines|segment|segments|myofibrils?)\b/] },
            { term: 'Actin', def: 'The protein that makes up the thin filaments. Myosin grabs actin and pulls it.',
              img: { src: 'media/card-actin.jpg', alt: 'Drawing from the muscles video of a myofibril with thin strands labeled actin strands.' },
              say: /\bactin\b|\bacting\b|\bact in\b|\bactan\b|\backtin\b/, keys: [/\bthin\b/, /\b(filaments?|strands?|protein)\b/] },
            { term: 'Myosin', def: 'The protein that makes up the thick filaments. Its heads grab actin and pull it.',
              img: { src: 'media/card-myosin.jpg', alt: 'Drawing from the muscles video of a myofibril with thick strands labeled myosin strands next to the actin strands.' },
              say: /\bmyosin\b|\bmy ?o ?sin\b|\bmio ?sin\b|\bmyo|\bmy ?a ?sin\b/, keys: [/\bthick\b/, /\b(pull|pulls|pulling|grab|grabs|heads?)\b/] },
            { term: 'Prime mover', def: 'The main muscle that makes a movement, like the diaphragm when you breathe in.',
              img: { src: 'media/card-prime-mover.jpg', alt: 'Drawing from Station 2 of the inside of the chest, with the dome-shaped diaphragm in red under the lungs.' },
              say: /\bprime\b|\bprim\b|\bprimer\b|\bprimed\b/, keys: [/\b(main|chief|most important)\b/, /\b(movement|move|moves|muscle)\b/] },
            { term: 'Antagonist', def: 'A muscle that does the opposite movement of another muscle, like the triceps (straightens the elbow) against the biceps (bends it).',
              img: { src: 'media/card-antagonist.jpg', alt: 'Drawing from Station 3 of the front and back of the arm, with the biceps brachii and triceps brachii labeled.' },
              say: /\bantag|\bantigon|\bant ?ag|\bantagonist\b/, keys: [/\b(opposite|opposes|oppose|against)\b/] }
          ]
        }
      ]
    },

    /* ---------------------------------------------------------------- Part 2 */
    {
      title: 'Two ways to classify joints',
      intro: 'The first clip is a quick review of the skeleton. The second clip explains the two ways anatomists classify joints: by what they are made of (structure) and by how much they move (function).',
      easyIntro: 'This clip explains the two ways to sort joints: by what they are made of (structure) and by how much they move (function).',
      clips: ['skeleton', 'classify'],
      images: [{
        src: 'media/diagram-structural-types.jpg',
        alt: 'Three simple drawings of two bones meeting. Left: the bones are tied together by lines of tissue. Middle: a pad sits between the bones. Right: the bones are separated by a fluid-filled space inside a capsule.',
        caption: 'The three structural types of joints.',
        text: '<p><b>Fibrous joint:</b> dense connective tissue. No joint cavity. Very little or no movement.</p>'
          + '<p><b>Cartilaginous joint:</b> a cartilage pad. No joint cavity. Slight movement.</p>'
          + '<p><b>Synovial joint:</b> a capsule around a joint cavity. Has a joint cavity. Freely movable.</p>'
      }],
      read: '<p><b>Read:</b> A <b>joint</b> is a place where two or more bones meet. The video says anatomists classify joints two ways, “by what they’re made of, and by what they do.”</p>'
        + '<p><b>Structural classification: what binds the bones together?</b></p><ul>'
        + '<li><b>Fibrous joints</b> connect bones with dense fibrous connective tissue. They have no joint cavity, and most do not move. Examples: the <b>sutures</b> between the skull bones; a <b>tooth in its socket</b> (a <b>gomphosis</b>: a peg held in a socket by tiny ligaments); and the joint between the lower (distal) ends of the <b>tibia and fibula</b>, where a ligament ties the two bones together but still lets them give a little.</li>'
        + '<li><b>Cartilaginous joints</b> unite bones with cartilage. They have no joint cavity and move only a little. Examples: the <b>pubic symphysis</b>, where a pad of cartilage joins the two pubic bones, and the <b>intervertebral discs</b>, the cartilage pads between your vertebrae.</li>'
        + '<li><b>Synovial joints</b> have a fluid-filled <b>joint cavity</b> between the bones. The cavity holds slippery <b>synovial fluid</b> that “acts like grease on a hinge.” They are freely movable. Most joints in your body are synovial, like the elbow, knee, shoulder, and hip.</li></ul>'
        + '<p><b>Functional classification: how much can the joint move?</b></p><ul>'
        + '<li><b>Synarthrosis</b> (plural: synarthroses): does not move at all. Example: the joints between the bones of your cranium. Joints that do not move make strong, stable connections, like the skull bones that protect your brain.</li>'
        + '<li><b>Amphiarthrosis</b> (plural: amphiarthroses): moves only slightly. Example: where your two pubic bones meet. It mainly absorbs shock from walking and running.</li>'
        + '<li><b>Diarthrosis</b> (plural: diarthroses): fully movable. Examples: the knee and elbow. Most are in your limbs.</li></ul>'
        + '<p><b>Why both?</b> The two labels usually line up (fibrous joints often do not move; synovial joints move freely), but not always. Two fibrous joints can move different amounts: skull sutures do not move at all, but the distal tibia–fibula joint gives a little. The video says that because “form follows function,” we can’t really talk about one without the other.</p>',
      questions: [
        {
          type: 'choice',
          support: false,
          text: 'The video reviews the two major parts of the skeleton. Which bones make up the axial skeleton?',
          easy: 'The video names two main parts of the skeleton. Which bones are in the axial skeleton?',
          options: ['The skull, the vertebral column, and the thoracic cage', 'The arms, the legs, and the girdles that attach them', 'Only the bones of the skull', 'The pelvis and the bones of the legs'],
          answer: 0,
          explain: 'Right. The axial skeleton is the 80 midline bones of the skull, vertebral column, and thoracic cage. The appendicular skeleton is the limbs plus the pectoral and pelvic girdles.',
          tip: 'Axial means along the middle line (axis) of the body. Listen near the start of the first clip for the 80 midline bones.'
        },
        {
          type: 'selects',
          text: 'Pick the structural type for each joint. Use the diagram and the reading.',
          easy: 'What holds each joint together? Pick its structural type.',
          options: ['Fibrous', 'Cartilaginous', 'Synovial'],
          items: [
            { label: 'Skull sutures', answer: 'Fibrous', hint: 'Does this joint have a joint cavity, or are the bones tied straight together? Find “sutures” in the reading.' },
            { label: 'Pubic symphysis', answer: 'Cartilaginous', hint: 'The reading says what kind of pad joins the two pubic bones. It is not fluid.' },
            { label: 'Vertebrae (intervertebral discs)', answer: 'Cartilaginous', hint: 'The discs are made of the same material as the pad in the pubic symphysis.' },
            { label: 'Elbow', answer: 'Synovial', hint: 'The elbow has a fluid-filled capsule. Think “freely movable.”' },
            { label: 'Shoulder', answer: 'Synovial', hint: 'Same structural type as the elbow.' },
            { label: 'Hip', answer: 'Synovial', hint: 'Same structural type as the elbow.' },
            { label: 'Distal joint between the tibia and fibula', answer: 'Fibrous', hint: 'The reading says a ligament (dense connective tissue) ties these two bones together. There is no joint cavity.' },
            { label: 'Tooth in its socket (gomphosis)', answer: 'Fibrous', hint: 'A peg fits right into a socket, held by tiny ligaments. There is no joint cavity and no cartilage pad.' }
          ]
        },
        {
          type: 'selects',
          text: 'Now pick the functional type for each joint: how much does it move?',
          easy: 'How much does each joint move? Pick its functional type.',
          options: ['Synarthrosis', 'Amphiarthrosis', 'Diarthrosis'],
          items: [
            { label: 'Skull sutures', answer: 'Synarthrosis', hint: 'Can the bones of your cranium move at all? Check the video’s example of joints that don’t move.' },
            { label: 'Pubic symphysis', answer: 'Amphiarthrosis', hint: 'The video says this joint moves only slightly, mainly to absorb shock.' },
            { label: 'Vertebrae (intervertebral discs)', answer: 'Amphiarthrosis', hint: 'Same functional type as the pubic symphysis. Each disc lets your back bend just a little.' },
            { label: 'Elbow', answer: 'Diarthrosis', hint: 'The video calls the knee and elbow joints fully movable.' },
            { label: 'Shoulder', answer: 'Diarthrosis', hint: 'Same functional type as the elbow.' },
            { label: 'Hip', answer: 'Diarthrosis', hint: 'Same functional type as the elbow.' },
            { label: 'Distal joint between the tibia and fibula', answer: 'Amphiarthrosis', hint: 'The reading says this joint gives a little. That is not zero movement, and it is not free movement.' },
            { label: 'Tooth in its socket (gomphosis)', answer: 'Synarthrosis', hint: 'A healthy tooth should not wiggle in its socket.' }
          ]
        },
        {
          type: 'choice',
          support: false,
          text: 'The video says synovial fluid “acts like grease on a hinge.” What would happen without it?',
          easy: 'What would happen to a joint without synovial fluid?',
          options: [
            'Friction could wear out the joint surfaces and even overheat the joint.',
            'The joint would move more freely than before.',
            'The bones would fuse together into one bone right away.',
            'Nothing, because synovial fluid is only found in fibrous joints.'
          ],
          answer: 0,
          explain: 'Right. Synovial fluid is a lubricant. Without it, the video says, just running down the street could cause enough friction to wear out your joint surfaces and overheat them.',
          tip: 'What does grease do on a hinge? Listen near the end of the second clip for what the video says running would do without it.'
        },
        {
          type: 'written',
          support: false,
          text: 'A joint is classified as a synarthrosis (immovable). Is a person’s total lack of movement at that joint a sign of injury, or is it normal? Explain your reasoning, give an example of this kind of joint, and name its structural type. (2 to 4 sentences)',
          easy: 'A joint is a synarthrosis. That means it does not move. If a person cannot move that joint at all, are they hurt, or is that normal? Tell why. Give one example of this kind of joint and say its structural type. (2 to 4 sentences)',
          starters: ['A total lack of movement at this joint is …', 'A synarthrosis is built to …', 'One example is …, which is structurally a … joint.'],
          min: 40,
          ideas: [
            { done: 'You said whether no movement is normal for this joint.', q: 'Did you say whether no movement is normal or a sign of injury?',
              tip: 'Read about synarthroses in the reading. Are they supposed to move?',
              re: /\bnormal\b|\bexpected\b|supposed to|meant to|designed|\bhealthy\b|not (a sign of |an? )?(an )?injur|not hurt|isn[’']?t hurt|not damaged/ },
            { done: 'You explained what a joint that does not move is good for.', q: 'Did you explain why a joint might be built not to move?',
              tip: 'The reading says what joints that do not move are good at. Think about what your skull bones protect.',
              re: /protect|stab(le|ility)|strong|sturdy|secure|hold.{0,30}(together|tight|in place)|keep.{0,30}(safe|in place)|brain/ },
            { done: 'You gave an example of a synarthrosis.', q: 'Did you give an example of a joint that does not move?',
              tip: 'The video and the reading each give an example. One is in your head, and one holds your teeth.',
              re: /skull|cranium|cranial|suture|\bteeth\b|\btooth\b|gomphos/ },
            { done: 'You named the structural type.', q: 'Did you name the structural type of your example?',
              tip: 'Look back at the structural type you picked for skull sutures. What material ties skull bones together?',
              re: /fibrous|fibre|fiber/ },
            { done: 'You wrote at least 2 sentences.', q: 'Did you write 2 to 4 full sentences?', tip: 'Add a sentence that explains your reasoning.', sentences: 2 }
          ]
        },
        {
          type: 'written',
          support: false,
          text: 'Explain, in your own words, why classifying a joint only by its structure (fibrous, cartilaginous, or synovial) is not enough to predict how much it moves, and why anatomists also need the functional classification (synarthrosis, amphiarthrosis, or diarthrosis). Use an example. (2 to 4 sentences)',
          easy: 'Why is knowing what a joint is made of not enough to know how much it moves? Why do we also need the movement labels? Use an example. (2 to 4 sentences)',
          starters: ['Structure alone only tells us …', 'For example, the … and the … are both fibrous joints, but …', 'We also need the functional label because …'],
          min: 40,
          ideas: [
            { done: 'You said what the structural classification tells us.', q: 'Did you say what structure tells us?',
              tip: 'Structure is about what kind of material holds the bones together.',
              re: /material|made of|tissue|cartilage|binds?|holds?.{0,25}together|connect|cavity|fluid/ },
            { done: 'You said what the functional classification tells us.', q: 'Did you say what the functional label tells us?',
              tip: 'Function is about one thing the joint does. What is it?',
              re: /how much.{0,25}(it )?(can )?move|amount of (movement|motion)|movable|moveable|range of motion|degree of movement|whether it moves/ },
            { done: 'You gave an example where structure and movement do not match up perfectly.', q: 'Did you give an example?',
              tip: 'The reading compares two fibrous joints that move different amounts.',
              re: /tibia|fibula|suture|skull|cranium|gomphos|tooth|teeth/ },
            { done: 'You wrote at least 2 sentences.', q: 'Did you write 2 to 4 full sentences?', tip: 'Add a sentence that explains why both labels are useful.', sentences: 2 }
          ]
        }
      ]
    },

    /* ---------------------------------------------------------------- Part 3 */
    {
      title: 'Synovial joints: shape and movement',
      intro: 'All six of these are synovial (freely movable) joints. Their shape decides which movements they allow. Watch the video’s dance party, then use the diagram and the reading.',
      clips: ['synovial', 'special'],
      images: [{
        src: 'media/diagram-synovial-types.jpg',
        alt: 'Six simple drawings, one for each synovial joint type, with arrows showing the directions each one can move.',
        caption: 'The six synovial joint types.',
        text: '<p><b>Hinge (elbow, knee):</b> one-plane bend (flexion/extension).</p>'
          + '<p><b>Pivot (neck, forearm):</b> rotation only (pivots around one axis).</p>'
          + '<p><b>Ball-and-socket (shoulder, hip):</b> movement in every direction (all planes).</p>'
          + '<p><b>Saddle (thumb, CMC joint):</b> flex/extend, ab/adduct, circumduct, no rotation.</p>'
          + '<p><b>Condyloid (wrist, knuckles):</b> flex/extend, ab/adduct, circumduct, no rotation.</p>'
          + '<p><b>Plane, or gliding (carpals, tarsals):</b> short gliding/sliding movements.</p>'
      }],
      read: '<p><b>Read:</b> The video says synovial joints “come in six different configurations” that together allow almost any movement your body can make.</p><ul>'
        + '<li><b>Plane (gliding) joints:</b> two flat or nearly flat bone surfaces slide over each other. They allow only short gliding movements, like waving your hand side to side. Examples: between the small carpal bones of the wrist and between the tarsal bones of the ankle.</li>'
        + '<li><b>Hinge joints:</b> a convex (rounded) surface fits into a concave (hollow) surface, like a door hinge. They bend in one plane only: flexion and extension. Examples: the elbow and knee.</li>'
        + '<li><b>Condyloid joints</b> (the video says “condylar”; also called ellipsoid): an oval convex surface fits into an oval concave surface. They allow flexion and extension, abduction and adduction, and circumduction, but not rotation. Examples: your knuckles and your wrist joint (the radiocarpal joint, where the radius meets the carpal bones).</li>'
        + '<li><b>Ball-and-socket joints:</b> a round head fits into a cup-shaped socket. They allow movement in every direction: flexion and extension, abduction and adduction, circumduction, and rotation. Examples: the shoulder and hip.</li>'
        + '<li><b>Saddle joints:</b> each surface is both concave and convex, like a horse saddle. They allow flexion and extension, abduction and adduction, and circumduction, but no rotation. Example: the thumb (the carpometacarpal, or CMC, joint). It lets your thumb touch your fingertips, a movement called opposition.</li>'
        + '<li><b>Pivot joints:</b> a rounded end of one bone turns inside a ring of bone and ligament. They allow rotation only. Examples: the atlas and axis in your neck (shaking your head “no”) and the joint between the radius and ulna near the elbow (turning your palm over).</li></ul>'
        + '<p><b>Mobility vs. stability:</b> The video says “the more flexible a joint is, the more unstable and fragile it is.” The shoulder and hip are both ball-and-socket joints, but they are built differently. The shoulder’s socket (on the scapula) is shallow, like a saucer, so the head of the humerus can move almost anywhere, but little holds it in place. The hip’s socket (on the pelvis) is deep, like a cup. It wraps around the head of the femur, and strong ligaments hold it tight, so the hip moves less freely but is much more stable.</p>',
      questions: [
        {
          type: 'selects',
          text: 'Match each synovial joint type to the shape of the bones at the joint.',
          easy: 'What shape are the bones at each joint? Match each joint type to its shape.',
          options: ['Convex surface fits concave surface', 'Rounded bone end rotates within a ring', 'Round head fits a cup-shaped socket', 'Both surfaces concave/convex like a saddle', 'Oval convex surface fits oval concave surface', 'Flat or nearly flat surfaces'],
          items: [
            { label: 'Hinge', answer: 'Convex surface fits concave surface', hint: 'Think of a door hinge: a rounded piece fits into a curved hollow piece.' },
            { label: 'Pivot', answer: 'Rounded bone end rotates within a ring', hint: 'Think about shaking your head “no” or turning a doorknob. What shape lets one bone spin in place?' },
            { label: 'Ball-and-socket', answer: 'Round head fits a cup-shaped socket', hint: 'The name of this joint describes its shape.' },
            { label: 'Saddle', answer: 'Both surfaces concave/convex like a saddle', hint: 'The name describes it. Picture a horse saddle, curved two ways.' },
            { label: 'Condyloid (ellipsoid)', answer: 'Oval convex surface fits oval concave surface', hint: 'The video calls the knuckles oval-shaped condylar joints. Ellipse is another word for an oval.' },
            { label: 'Plane (gliding)', answer: 'Flat or nearly flat surfaces', hint: 'A plane is a flat surface, like a tabletop.' }
          ]
        },
        {
          type: 'selects',
          text: 'Match each synovial joint type to the movement(s) it allows.',
          easy: 'How can each joint move? Match each joint type to its movements.',
          options: ['Flexion/extension only (one plane)', 'Rotation only', 'Flexion/extension, abduction/adduction, rotation, circumduction (all planes)', 'Flexion/extension, abduction/adduction, circumduction (no rotation)', 'Short gliding/sliding movements'],
          items: [
            { label: 'Hinge', answer: 'Flexion/extension only (one plane)', hint: 'A door hinge swings only one way. Which choice has just one pair of movements?' },
            { label: 'Pivot', answer: 'Rotation only', hint: 'This joint lets you shake your head “no” and turn your palm over. It does nothing else.' },
            { label: 'Ball-and-socket', answer: 'Flexion/extension, abduction/adduction, rotation, circumduction (all planes)', hint: 'This is the most mobile joint. It moves in every direction.' },
            { label: 'Saddle', answer: 'Flexion/extension, abduction/adduction, circumduction (no rotation)', hint: 'Your thumb moves many ways, but it can’t spin around like a screw.' },
            { label: 'Condyloid (ellipsoid)', answer: 'Flexion/extension, abduction/adduction, circumduction (no rotation)', hint: 'It moves almost the same ways as a saddle joint. Can your knuckle twist around?' },
            { label: 'Plane (gliding)', answer: 'Short gliding/sliding movements', hint: 'What did the video call the hand-waving motion at the start of the dance party?' }
          ]
        },
        {
          type: 'selects',
          text: 'Match each of these synovial joint types to an example in the body.',
          easy: 'Where in the body is each joint type? Match each one to an example.',
          options: ['Elbow, knee', 'Atlas/axis (neck), proximal radius-ulna', 'Shoulder, hip', 'Thumb (carpometacarpal joint)'],
          items: [
            { label: 'Hinge', answer: 'Elbow, knee', hint: 'Which joints bend only one way, like when the video bends an arm or kicks a leg?' },
            { label: 'Pivot', answer: 'Atlas/axis (neck), proximal radius-ulna', hint: 'Which joints let you shake your head “no” and turn your palm over?' },
            { label: 'Ball-and-socket', answer: 'Shoulder, hip', hint: 'The video says these joints are the ones people dislocate and replace.' },
            { label: 'Saddle', answer: 'Thumb (carpometacarpal joint)', hint: 'The video says this joint makes something “opposable.”' }
          ]
        },
        {
          type: 'highlight',
          cer: true,                 // claim (blue), evidence (yellow), expand (green)
          from: 'the video and the reading',
          text: 'The shoulder and the hip are both ball-and-socket joints, yet the shoulder dislocates far more often than the hip. Using the trade-off between mobility (how freely a joint moves) and stability, explain why. Make a claim, then support it with evidence from the video and the reading, using transition words that point to your evidence. For example: “According to the video, …” or “The reading explains that …” (3 to 5 sentences)',
          easy: 'The shoulder and the hip are both ball-and-socket joints. But the shoulder pops out of place (dislocates) much more often. Why? Think about how freely each joint moves and how well it is held in place. Make a claim. Then give evidence (facts) from the video and the reading. Start your evidence with transition words, like “According to the video, …” or “The reading explains that …” (3 to 5 sentences)',
          starters: ['The shoulder dislocates more often because …', 'According to the video, the more flexible a joint is, …', 'The reading explains that the shoulder’s socket is …, while the hip’s socket is …', 'This means that …'],
          min: 80,
          ideas: [
            { done: 'You described the shoulder’s socket.', q: 'Did you describe the shoulder’s socket?',
              tip: 'The reading compares the shoulder’s socket to a saucer. What does that tell you about its shape?',
              all: [/shoulder/, /shallow|saucer|flat|not (very )?deep|small/] },
            { done: 'You described the hip’s socket.', q: 'Did you describe the hip’s socket?',
              tip: 'The reading compares the hip’s socket to a cup. What does it wrap around, and what holds it tight?',
              all: [/\bhip/, /deep|cup|wrap|tight|ligament|held|holds?|secure/] },
            { done: 'You connected flexibility to instability.', q: 'Did you explain the trade-off between moving freely and being stable?',
              tip: 'The video says what happens to a joint as it gets more flexible.',
              re: /unstable|instab|fragile|less stable|more stable|stabil|loose|trade.?off|pop(s|ped)? out|out of place/ },
            { done: 'You explained why moving freely matters for the shoulder.', q: 'Did you say what the shoulder gains from its design?',
              tip: 'What can your arm do at the shoulder that your leg can’t do as easily at the hip?',
              re: /mobil|range of motion|move.{0,25}(freely|more|almost any|every|many|lot)|more movement|in every direction|all directions|so flexible|very flexible|more flexible than/ },
            { done: 'You wrote at least 3 sentences.', q: 'Did you write 3 to 5 full sentences?', tip: 'Add a sentence that explains your reasoning.', sentences: 3 },
            { done: 'You used transition words to point to your evidence.', q: 'Did you use transition words to point to your evidence?', tip: 'Introduce your evidence with words like “According to the video,” or “The reading explains that.”',
              writing: true, re: /for example|for instance|according to|this shows|that shows|which shows|shows that|evidence|the (video|reading) (says|said|shows|showed|explains|explained|mentions|states)|because|such as|proves?|this means|supports?|based on/ }
          ]
        },
        {
          type: 'written',
          support: false,
          text: 'An engineer is designing a robotic finger joint and a robotic shoulder joint. Which synovial joint type would you recommend for each, and why does the same design not work for both? (2 to 4 sentences)',
          easy: 'An engineer is building a robot finger joint and a robot shoulder joint. Which synovial joint type should each one be? Why can’t they both use the same kind? (2 to 4 sentences)',
          starters: ['For the finger, I would use a … joint because a finger only needs to …', 'For the shoulder, I would use a … joint because it needs to …', 'The same design would not work for both because …'],
          min: 50,
          ideas: [
            { done: 'You chose a joint type for the finger.', q: 'Did you choose a joint type for the finger?',
              tip: 'Bend one finger. Does it bend in one plane, or does it move in every direction? Find the joint type that matches.',
              all: [/finger/, /hinge|condyl|ellipsoid/] },
            { done: 'You chose a joint type for the shoulder.', q: 'Did you choose a joint type for the shoulder?',
              tip: 'Which joint type does the video say the shoulder uses?',
              all: [/shoulder/, /ball/] },
            { done: 'You explained how much each joint needs to move.', q: 'Did you explain how much movement each joint needs?',
              tip: 'Compare the movements: one plane for one joint, every direction for the other.',
              re: /one (plane|way|direction)|bend and straighten|flex(ion|es)? and exten|every direction|all (planes|directions)|rotat|circumduct|many directions/ },
            { done: 'You wrote at least 2 sentences.', q: 'Did you write 2 to 4 full sentences?', tip: 'Add a sentence that tells why one design does not fit both jobs.', sentences: 2 }
          ]
        }
      ]
    },

    /* ---------------------------------------------------------------- Part 4 */
    {
      title: 'Movement vocabulary',
      intro: 'The first two clips have no talking. Read the words on the screen and watch what the person does. The third clip is from the joints video. It shows two movements of the forearm.',
      clips: ['moveA', 'moveB', 'palm'],
      images: [{
        src: 'media/diagram-movements.jpg',
        alt: 'Six simple drawings of movements, with arrows: bending and straightening a joint, moving a limb out and in from a center line, tracing a circle, turning in place, turning a palm, and moving the foot at the ankle.',
        caption: 'Movement vocabulary.',
        text: '<p><b>Flexion ↔ Extension:</b> Flexion = angle decreases. Extension = angle increases.</p>'
          + '<p><b>Abduction ↔ Adduction:</b> Abduction = away from midline. Adduction = toward midline.</p>'
          + '<p><b>Circumduction:</b> limb traces a cone-shaped (circular) path.</p>'
          + '<p><b>Rotation:</b> turning around the long axis.</p>'
          + '<p><b>Pronation ↔ Supination:</b> Pronation = palm down/back. Supination = palm up/forward.</p>'
          + '<p><b>Dorsiflexion ↔ Plantar flexion:</b> Dorsiflexion = toes toward shin. Plantar flexion = toes away.</p>'
      }],
      read: '<p><b>Read:</b> The <b>midline</b> is an imaginary line down the center of your body. Movement words come in pairs of opposites.</p><ul>'
        + '<li><b>Flexion:</b> a movement that decreases the angle between two body parts (bending your elbow to bring your hand to your shoulder). <b>Extension:</b> a movement that increases the angle (straightening back out). Going past the normal straight position is <b>hyperextension</b>.</li>'
        + '<li><b>Abduction:</b> moving a body part away from the midline (raising your arms out to the sides). <b>Adduction:</b> moving a body part toward the midline (bringing them back down). Think “add” to the body.</li>'
        + '<li><b>Circumduction:</b> moving a limb in a cone-shaped path, like drawing a big circle in the air with your whole arm.</li>'
        + '<li><b>Rotation:</b> turning a bone around its own long axis, like shaking your head “no.” <b>Medial (internal) rotation</b> turns toward the midline, and <b>lateral (external) rotation</b> turns away from it.</li>'
        + '<li><b>Supination:</b> turning the palm to face upward or forward (holding a bowl of soup). <b>Pronation:</b> turning the palm to face downward or backward (setting a plate on a table). These happen at the pivot joints between the radius and ulna. The radius and ulna meet near the elbow and again near the wrist, and when you turn your palm, the radius turns around the ulna.</li>'
        + '<li><b>Dorsiflexion:</b> flexion at the ankle that points the toes upward toward the shin (walking on your heels). <b>Plantar flexion:</b> extension at the ankle that points the toes downward, away from the shin (standing on tiptoe).</li>'
        + '<li><b>Elevation:</b> movement upward (shrugging your shoulders). <b>Depression:</b> movement downward. <b>Protraction:</b> moving the shoulders forward. <b>Retraction:</b> pulling the shoulders back.</li></ul>',
      questions: [
        {
          type: 'selects',
          text: 'For each movement term, choose its correct definition.',
          easy: 'What does each movement word mean? Choose its definition.',
          options: [
            'Decreasing the angle of a joint', 'Increasing the angle of a joint',
            'Moving a body part away from the midline', 'Moving a body part toward the midline',
            'Moving a limb in a cone-shaped path', 'Turning a bone around its own long axis',
            'Turning the palm to face downward or backward', 'Turning the palm to face upward or forward',
            'Pointing the toes upward toward the shin', 'Pointing the toes downward, away from the shin'
          ],
          items: [
            { label: 'Flexion', answer: 'Decreasing the angle of a joint', hint: 'Bend your elbow to bring your hand to your shoulder. Does the angle at your elbow get bigger or smaller?' },
            { label: 'Extension', answer: 'Increasing the angle of a joint', hint: 'It is the opposite of flexion: straightening out.' },
            { label: 'Abduction', answer: 'Moving a body part away from the midline', hint: 'Think “abduct”: taken away.' },
            { label: 'Adduction', answer: 'Moving a body part toward the midline', hint: 'Think “add” to the body: pulling in.' },
            { label: 'Circumduction', answer: 'Moving a limb in a cone-shaped path', hint: 'Draw a big circle in the air with your whole arm. What shape does your arm sweep out?' },
            { label: 'Rotation', answer: 'Turning a bone around its own long axis', hint: 'Shake your head “no.”' },
            { label: 'Pronation', answer: 'Turning the palm to face downward or backward', hint: 'Palms down, like setting a plate on a table.' },
            { label: 'Supination', answer: 'Turning the palm to face upward or forward', hint: 'Palms up, like holding a bowl of soup.' },
            { label: 'Dorsiflexion', answer: 'Pointing the toes upward toward the shin', hint: 'Lift your toes to walk on your heels.' },
            { label: 'Plantar flexion', answer: 'Pointing the toes downward, away from the shin', hint: 'Stand on tiptoe, or press a gas pedal.' }
          ]
        },
        {
          type: 'written',
          support: false,
          text: 'Imagine an accident causes the lower (distal) ends of the radius and ulna to fuse together, turning that joint into a synarthrosis. Which specific movements would the person lose, and why? Give an everyday task they would have trouble with. (2 to 4 sentences)',
          easy: 'Imagine the radius and ulna (the two forearm bones) grow together near the wrist after an accident. Now that joint cannot move. Which movements would the person lose? Why? What everyday task would be hard? (2 to 4 sentences)',
          starters: ['The person would lose the ability to …', 'That movement depends on the … joint between the radius and ulna, which …', 'For example, it would be hard to …'],
          min: 40,
          ideas: [
            { done: 'You named the movements the person would lose.', q: 'Did you name the movements the person would lose?',
              tip: 'Which two movement words are about turning the palm?',
              re: /supinat|pronat/ },
            { done: 'You explained that the radius turns around the ulna.', q: 'Did you explain what the radius and ulna have to do for that movement?',
              tip: 'The reading says what the radius does around the ulna when you turn your palm.',
              re: /rotat|turns? (around|over)|spins?|twist|pivot/ },
            { done: 'You gave an everyday example.', q: 'Did you give an everyday task that would be hard?',
              tip: 'Think of things you do by turning your palm up or down.',
              re: /door ?knob|key|screw|bowl|soup|plate|mouse|palm (up|down)|faucet|jar|turn(ing)? (a|the) (page|handle)|type|typing|catch|pour|dribbl|wave|hand(ing)? (someone|something)/ },
            { done: 'You wrote at least 2 sentences.', q: 'Did you write 2 to 4 full sentences?', tip: 'Add a sentence that explains why.', sentences: 2 }
          ]
        }
      ]
    },

    /* ---------------------------------------------------------------- Part 5 */
    {
      title: 'Skeletal muscle: tissue types and structure',
      intro: 'Joints let bones move, but muscles do the moving. Joints work because, as the video says, skeletal muscles create movement “by pulling bones in different directions as they contract.”',
      clips: ['tissues', 'structure'],
      read: '<p><b>Read:</b> You have three types of muscle tissue.</p><ul>'
        + '<li><b>Smooth muscle</b> is in the walls of hollow organs, like the stomach, airways, and blood vessels. It works involuntarily (without you thinking about it), contracting and relaxing over and over to push fluid and other material along.</li>'
        + '<li><b>Cardiac muscle</b> is found only in the heart. It looks striped, or <b>striated</b>, and it works involuntarily to keep your blood pumping.</li>'
        + '<li><b>Skeletal muscle</b> is the kind you can see, feel, and flex. You have about 640 skeletal muscles. They are striated, like cardiac muscle, but mostly <b>voluntary</b>: you choose to use them, and your somatic nervous system activates them. Most attach to your skeleton and create movement by <b>pulling</b> bones as they contract.</li></ul>'
        + '<p>Each skeletal muscle, like the biceps brachii, is its own <b>organ</b>, made of muscle tissue plus connective tissue, blood vessels, and nerve fibers. Muscles use a lot of energy, so each one has its own nerve to signal it to contract and its own artery and vein to bring blood, oxygen, and nutrients.</p>'
        + '<p><b>Built like a rope:</b> Thousands of tiny, parallel threads called <b>myofibrils</b> squish together to form a <b>muscle fiber</b>. A muscle fiber is one muscle cell. It has mitochondria, many nuclei, and a cell membrane called the <b>sarcolemma</b>. Muscle fibers form bundles called <b>fascicles</b>, and fascicles combine to form the whole <b>muscle</b>. Sheaths of connective tissue wrap around the bundles to keep the muscle from bursting.</p>',
      questions: [
        {
          type: 'selects',
          text: 'Match each description to the type of muscle tissue.',
          easy: 'Which type of muscle tissue is each one?',
          options: ['Smooth', 'Cardiac', 'Skeletal'],
          items: [
            { label: 'Found in the walls of hollow organs like the stomach, airways, and blood vessels', answer: 'Smooth', hint: 'Listen to the first type of muscle tissue the video describes.' },
            { label: 'Found only in the heart; striated and involuntary', answer: 'Cardiac', hint: 'The video says the heart is so important that it gets its very own type.' },
            { label: 'About 640 of them; mostly voluntary; most attach to bones', answer: 'Skeletal', hint: 'Which type pulls on your skeleton?' }
          ]
        },
        {
          type: 'multi',
          text: 'Which of these are true about skeletal muscles? Choose all that are true.',
          easy: 'What is true about skeletal muscles? Choose all the true ones.',
          options: [
            'They are striated (striped).',
            'They are mostly voluntary.',
            'They create movement by pulling on bones.',
            'Each one is its own organ.',
            'They create movement by pushing bones away.',
            'They are found in the walls of the stomach and blood vessels.'
          ],
          answers: ['They are striated (striped).', 'They are mostly voluntary.', 'They create movement by pulling on bones.', 'Each one is its own organ.'],
          rules: [
            { any: ['They create movement by pushing bones away.'], tip: 'Listen again: do muscles push bones or pull them as they contract?' },
            { any: ['They are found in the walls of the stomach and blood vessels.'], tip: 'That describes a different type of muscle tissue. Check the first part of the reading.' }
          ],
          tip: 'There are more true statements. Check the reading for what skeletal muscles look like, how you control them, and what each one is made of.',
          explain: 'Right. Skeletal muscles are striated, mostly voluntary, pull on bones as they contract, and each one is its own organ.'
        },
        {
          type: 'order',
          text: 'The video says a skeletal muscle is built like a rope, “fibers within fibers.” Put these parts in order from smallest to largest.',
          easy: 'Put these muscle parts in order from smallest to biggest.',
          items: ['Myofibril (a tiny thread)', 'Muscle fiber (one muscle cell)', 'Fascicle (a bundle of fibers)', 'Muscle (the whole organ, like the biceps brachii)'],
          tip: 'Start with the tiny threads. Then follow the reading: the threads form what, which bundle into what?',
          explain: 'Right. Myofibrils form a muscle fiber (one cell), fibers bundle into fascicles, and fascicles combine into the whole muscle.'
        },
        {
          type: 'choice',
          support: false,
          text: 'Why does every skeletal muscle have its own nerve, artery, and vein?',
          easy: 'Why does each muscle get its own nerve and its own blood vessels?',
          options: [
            'Muscles use a lot of energy, so each needs a nerve to signal it and blood to bring oxygen and nutrients.',
            'The blood vessels hold the muscle onto the bone.',
            'The nerve stores extra energy for the muscle.',
            'Only the biggest muscles have them, so they can be found by doctors.'
          ],
          answer: 0,
          explain: 'Right. The video calls muscles “voracious energy hogs.” A nerve tells each one to contract, and an artery and vein keep it supplied with blood, oxygen, and nutrients.',
          tip: 'Listen to what the video calls muscles near the end of the first clip. What does a nerve do, and what does blood bring?'
        }
      ]
    },

    /* ---------------------------------------------------------------- Part 6 */
    {
      title: 'The sliding filament model',
      intro: 'How does a muscle cell actually pull? The video tells it like a love story between two proteins, actin and myosin. Watch all three clips. You can rewatch them as many times as you need.',
      clips: ['filaments', 'signal', 'cycle'],
      read: '<p><b>Read:</b> The video gives two rules about proteins: <b>(1)</b> proteins change shape when something binds to them, and <b>(2)</b> changing shape can let proteins bind to, or unbind from, other things.</p>'
        + '<p>Each myofibril is divided into segments called <b>sarcomeres</b>. A sarcomere has <b>thin filaments</b> made mostly of <b>actin</b> and <b>thick filaments</b> made of <b>myosin</b>, which has club-shaped heads. A <b>Z line</b> marks each end of a sarcomere. A muscle contracts when its sarcomeres shorten and bring their Z lines closer together.</p>'
        + '<p>At rest, two “bodyguard” proteins, <b>tropomyosin</b> and <b>troponin</b>, block the spots on actin where myosin wants to bind. The muscle cell stores calcium in its <b>sarcoplasmic reticulum</b> (its special endoplasmic reticulum), using calcium pumps that run on <b>ATP</b>.</p>'
        + '<p><b>How a muscle fiber contracts:</b></p><ol>'
        + '<li>The brain sends an action potential along a motor neuron to the muscle cell.</li>'
        + '<li>The motor neuron releases acetylcholine. Sodium channels on the muscle cell open, and sodium rushes in.</li>'
        + '<li>An action potential travels along the sarcolemma and down the T-tubules, deep into the cell.</li>'
        + '<li>Calcium channels on the sarcoplasmic reticulum open, and calcium rushes out into the cell.</li>'
        + '<li>Calcium binds to troponin. Troponin changes shape and pulls tropomyosin away from the binding sites on actin.</li>'
        + '<li>A myosin head that has already broken ATP into ADP and phosphate is “cocked,” like a stretched spring. It binds to actin.</li>'
        + '<li>The myosin head releases its stored energy, changes shape, and pulls the actin, like pulling a rope hand over fist. The sarcomere shortens. This is the “sliding” in the sliding filament model.</li>'
        + '<li>ADP and phosphate unbind. A fresh ATP binds to the myosin head, which makes myosin let go of actin. Myosin breaks down the new ATP and gets ready to pull again.</li></ol>'
        + '<p><b>Relaxing:</b> Calcium pumps move calcium back into the sarcoplasmic reticulum. Calcium unbinds from troponin, and tropomyosin covers the binding sites again.</p>',
      questions: [
        {
          type: 'selects',
          text: 'Match each part of a muscle cell to its job in the story.',
          easy: 'What does each part do? Match each one to its job.',
          options: ['Actin', 'Myosin', 'Tropomyosin', 'Troponin', 'Sarcoplasmic reticulum', 'Sarcolemma'],
          items: [
            { label: 'Thin filament made of two light, twisty strands', answer: 'Actin', hint: 'The video names the thin filaments first.' },
            { label: 'Thick filament with club-shaped heads that grab and pull', answer: 'Myosin', hint: 'The video calls these strands thicker and lumpy-looking.' },
            { label: 'Bodyguard that covers the binding sites on actin', answer: 'Tropomyosin', hint: 'Calcium makes the other bodyguard pull this one away.' },
            { label: 'Bodyguard that binds calcium and pulls the other bodyguard away', answer: 'Troponin', hint: 'The video says this protein “just loves to bind with calcium.”' },
            { label: 'Stores calcium inside the muscle cell', answer: 'Sarcoplasmic reticulum', hint: 'It is the muscle cell’s special version of an endoplasmic reticulum.' },
            { label: 'The muscle cell’s membrane, with T-tubules running deep inside', answer: 'Sarcolemma', hint: 'Listen in the second clip for the name of the muscle cell’s membrane. Step 3 of the reading uses it too.' }
          ]
        },
        {
          type: 'choice',
          support: false,
          text: 'Which of these is one of the two protein rules from the video?',
          easy: 'Which one is a protein rule from the video?',
          options: ['Proteins change shape when stuff binds to them.', 'Proteins never change shape.', 'Proteins only work inside neurons.', 'Proteins are made of calcium.'],
          answer: 0,
          explain: 'Right. Rule one: proteins change shape when stuff binds to them. Rule two: changing shape can let proteins bind to, or unbind from, other stuff.',
          tip: 'Listen near the start of the first clip, where the video lists “just two main rules.”'
        },
        {
          type: 'order',
          text: 'Put the steps of muscle contraction in order, from the brain’s signal to the pull.',
          easy: 'Put the steps in order. Start with the brain’s signal and end with the pull.',
          items: [
            'The brain sends an action potential along a motor neuron to the muscle cell.',
            'The motor neuron releases acetylcholine, and sodium rushes into the muscle cell.',
            'The action potential travels along the sarcolemma and down the T-tubules.',
            'Calcium rushes out of the sarcoplasmic reticulum.',
            'Calcium binds to troponin, which pulls tropomyosin off the binding sites on actin.',
            'Myosin heads bind to actin and pull it, shortening the sarcomere.'
          ],
          tip: 'Start with the brain. Then follow the signal: it reaches the muscle cell, travels deep inside it, and opens the calcium channels. What does the calcium do next?',
          explain: 'Right. Nerve signal, acetylcholine and sodium, the action potential down the T-tubules, calcium released, troponin moves tropomyosin, and myosin pulls actin.'
        },
        {
          type: 'choice',
          text: 'After the pull, a fresh ATP binds to the myosin head. What does that cause?',
          easy: 'After myosin pulls, a new ATP sticks to the myosin head. What happens next?',
          options: ['The myosin head lets go of the actin.', 'Calcium binds to troponin.', 'Tropomyosin covers the binding sites forever.', 'The Z lines move apart and the muscle breaks.'],
          answer: 0,
          explain: 'Right. A fresh ATP binding causes a shape change that makes myosin release the actin. Then myosin breaks down that ATP to get ready for the next pull.',
          tip: 'Use Rule 2: binding causes a shape change, and a shape change can make a protein bind or unbind. Listen in the third clip for what myosin lets go of.'
        },
        {
          type: 'choice',
          support: false,
          text: 'How does a muscle relax after it contracts?',
          easy: 'How does a muscle relax?',
          options: [
            'Calcium pumps move calcium back into the sarcoplasmic reticulum, and tropomyosin covers actin’s binding sites again.',
            'The muscle runs out of actin.',
            'Sodium pushes the myosin heads off the Z lines.',
            'The bones push the muscle back to its resting length.'
          ],
          answer: 0,
          explain: 'Right. The calcium pumps restock the sarcoplasmic reticulum. When calcium unbinds from troponin, the shape change puts tropomyosin back in place, so myosin cannot bind.',
          tip: 'Listen near the end of the third clip. What are the calcium pumps doing “meanwhile”?'
        }
      ]
    },

    /* ---------------------------------------------------------------- Part 7 */
    {
      title: 'Naming muscles and the upper body (Stations 1 to 3)',
      intro: 'These three station cards are from the muscle stations. There is no video in this part. Read each card, then answer the questions. Select a card to open it full size.',
      images: [
        {
          src: 'media/station-card-1.jpg',
          alt: 'Station 1 card, How Muscles are Named. A list of seven naming patterns next to a drawing of the front of the human body with the muscles showing.',
          caption: 'Station 1 card.',
          text: '<p><b>Station 1: How Muscles are Named</b></p>'
            + '<p>There are more than 600 skeletal muscles in the human body. We will mainly be looking at the superficial muscles only, but you should appreciate the complexity of this magnificent organ system. There are a few patterns that can be seen in how skeletal muscles are named that may help you remember them:</p>'
            + '<p><b>Muscle location.</b> Ex. The temporalis muscle in the head lies over the temporal bone.</p>'
            + '<p><b>Muscle shape.</b> Ex. The deltoid muscle in the shoulder is shaped like a triangle (deltoid).</p>'
            + '<p><b>Muscle size.</b> <i>Maximus</i> = largest; <i>minimus</i> = smallest. <i>Longus</i> = long; <i>brevis</i> = short. Ex. Gluteus maximus and gluteus minimus are the largest and smallest gluteal muscles.</p>'
            + '<p><b>Direction of muscle fibers.</b> <i>Rectus</i> = fibers run parallel to the reference point. Ex. Rectus femoris is a straight thigh muscle that runs along the femur. <i>Oblique</i> = fibers run indirectly or at a slant to the reference point. Ex. External oblique muscles in the abdomen. <i>Transversus</i> = fibers run at a right angle to the reference point.</p>'
            + '<p><b>Number of origins.</b> Ex. The biceps have two “heads” attached at different origins. Ex. The triceps have three “heads” attached at different origins.</p>'
            + '<p><b>Muscle action.</b> Muscles named for the movement they produce. Ex. The adductor longus muscle adducts the thigh.</p>'
            + '<p><b>Location of the attachments.</b> When muscles are named based off their points of origin (always listed first) and insertion. Ex. The sternocleidomastoid is a neck muscle that originates in the sternum and clavicle, and inserts into the mastoid process of the temporal bone in the head.</p>'
        },
        {
          src: 'media/station-card-2.jpg',
          alt: 'Station 2 card, Upper Body Muscles. A drawing of the chest and abdomen muscles with labels, and a drawing of the inside of the chest with the dome-shaped breathing muscle in red.',
          caption: 'Station 2 card.',
          text: '<p><b>Station 2: Upper Body Muscles</b></p>'
            + '<p><b>Muscles of the shoulder:</b> Most of the muscles that act on your humerus actually originate in the pectoral girdle. For example, your pectoralis major is a prime mover muscle in flexion of the arm, and its antagonist the latissimus dorsi (of the lower back, pictured in Station 5) is the prime mover in extension of the arm. The thick deltoid muscles extend over the shoulder and are also essential in movements of the humerus.</p>'
            + '<p><b>Muscles of the abdominal wall:</b> These muscles help to protect the visceral organs, which don’t have the protection of the bony rib cage like those in the thoracic cavity. The key muscles are the external obliques and the internal obliques, just deep of the external. Even deeper are the transversus abdominis, the deepest of the abdominal muscles. The rectus abdominis are the muscles that make it possible (or not) for you to have a 6-pack.</p>'
            + '<p><b>Muscles of the thoracic cavity:</b> The external intercostals, internal intercostals, and the diaphragm are key muscles deeper in your thoracic cavity that are critical for breathing. The prime mover for inspiration (inhalation) is the diaphragm, while the external intercostals act as synergists that aid in inspiration. The internal intercostals are antagonistic to the external. When you inhale, your diaphragm contracts and flattens as it moves downward, making room for your lungs to expand. The external intercostals assist by helping your rib cage move outward and upward when you inhale. The diaphragm also forms a muscular partition between the thoracic and abdominopelvic cavities.</p>'
            + '<p><b>Muscles of the pelvic floor and perineum:</b> We will not cover these muscles in this unit, but know that they exist and are essential for supporting the abdominopelvic organs and aiding in excretion.</p>'
            + '<p>Labels on the drawing: pectoralis major, deltoid, rectus abdominis, external obliques.</p>'
        },
        {
          src: 'media/station-card-3.jpg',
          alt: 'Station 3 card, Upper Limb Muscles. Front and back drawings of the arm and forearm with the muscles labeled.',
          caption: 'Station 3 card.',
          text: '<p><b>Station 3: Upper Limb Muscles</b></p>'
            + '<p>These muscles cross the elbow joint and insert on the forearm bones. All of the anterior arm muscles aid in flexing the forearm. The biceps brachii (the muscles that bulge when you flex) and the brachialis underneath the biceps (which acts as a bridge between the humerus and ulna) contract simultaneously during flexion. The brachioradialis is a synergist muscle for forearm flexion.</p>'
            + '<p>The flexor carpi ulnaris flexes and adducts your hand, while the flexor carpi radialis flexes and abducts it.</p>'
            + '<p>The palmaris longus helps with wrist flexion, but not everyone has one! Touch your pinky finger to your thumb and see if a tendon protrudes from your wrist. If so, this muscle is present! If not, you are part of the less than 16% of the population that is missing this muscle!</p>'
            + '<p>The pronator teres rotates your forearm.</p>'
            + '<p>The main arm muscle for extension is the triceps brachii. The extensor carpi radialis longus (and brevis) muscles help abduct and extend your hand at the wrist joint.</p>'
            + '<p>Labels on the drawings: biceps brachii, triceps brachii, brachialis, pronator teres, brachioradialis, extensor carpi radialis longus, flexor carpi radialis, palmaris longus, flexor carpi ulnaris.</p>'
        }
      ],
      read: '<p><b>Read:</b> Muscles work in teams.</p>'
        + '<p>A <b>prime mover</b> is the main muscle for a movement. A <b>synergist</b> helps the prime mover. An <b>antagonist</b> does the opposite movement, like the latissimus dorsi (extension of the arm) against the pectoralis major (flexion of the arm).</p>',
      questions: [
        {
          type: 'choice',
          text: 'Your quadriceps are a group of muscles in your thighs. What does the name “quadriceps” tell you about them?',
          easy: 'The quadriceps are muscles in your thigh. What does the name “quadriceps” tell you?',
          options: ['Number of origins (heads)', 'Muscle shape', 'Muscle size', 'Muscle location'],
          answer: 0,
          explain: 'Right. Quadri means four and ceps means heads, so the quadriceps have four heads, each attached at a different origin. It works like biceps (two heads) and triceps (three heads).',
          tip: 'Compare the name to the biceps and triceps on Station 1. What do “bi,” “tri,” and “quadri” count?'
        },
        {
          type: 'selects',
          text: 'Station 2: Identify the prime mover muscle in inspiration (breathing in) and the muscle that aids it as a synergist.',
          easy: 'Station 2: Which muscle is the main muscle for breathing in? Which muscle helps it?',
          items: [
            { label: 'Prime mover', options: ['Diaphragm', 'External intercostals', 'Internal intercostals', 'Rectus abdominis'], answer: 'Diaphragm',
              hint: 'Read the “Muscles of the thoracic cavity” paragraph. Which muscle contracts and flattens to make room for the lungs?' },
            { label: 'Synergist', options: ['External intercostals', 'Internal intercostals', 'Diaphragm', 'Pectoralis major'], answer: 'External intercostals',
              hint: 'A synergist helps the prime mover. Which muscle helps the rib cage move outward and upward? Watch for internal vs. external.' }
          ]
        },
        {
          type: 'choice',
          support: false,
          text: 'Station 2 says the pectoralis major is a prime mover in flexion of the arm. Which muscle is its antagonist, the prime mover in extension of the arm?',
          easy: 'The pectoralis major is the main muscle that flexes (raises) the arm. Which muscle does the opposite and extends the arm?',
          options: ['Latissimus dorsi', 'Deltoid', 'Rectus abdominis', 'Diaphragm'],
          answer: 0,
          explain: 'Right. The latissimus dorsi is the antagonist of the pectoralis major. One flexes the arm, and the other extends it.',
          tip: 'Read the first paragraph of Station 2. Look for the word “antagonist.”'
        },
        {
          type: 'multi',
          text: 'Station 3: Which TWO muscles contract together as the main muscles for forearm flexion (bending the elbow)?',
          easy: 'Station 3: Which 2 muscles work together to bend the elbow?',
          options: ['Biceps brachii', 'Brachialis', 'Brachioradialis', 'Triceps brachii', 'Pronator teres', 'Palmaris longus'],
          answers: ['Biceps brachii', 'Brachialis'],
          rules: [
            { any: ['Brachioradialis'], tip: 'Station 3 says this one is a synergist, a helper, not one of the two main flexors.' },
            { any: ['Triceps brachii'], tip: 'Station 3 says this is the main muscle for the opposite movement.' },
            { any: ['Pronator teres', 'Palmaris longus'], tip: 'Station 3 says this muscle does a different job. Read what it does.' }
          ],
          tip: 'Read the first paragraph of Station 3. Which two muscles “contract simultaneously during flexion”?',
          explain: 'Right. The biceps brachii and the brachialis underneath it contract together to flex the forearm. The brachioradialis helps as a synergist.'
        },
        {
          type: 'choice',
          text: 'Station 3: What is the main arm muscle for forearm extension (straightening the elbow)?',
          easy: 'Station 3: Which muscle is the main muscle that straightens the elbow?',
          options: ['Triceps brachii', 'Biceps brachii', 'Brachialis', 'Pronator teres'],
          answer: 0,
          explain: 'Right. The triceps brachii is the main muscle for extension. It is the antagonist of the biceps brachii.',
          tip: 'Read the last paragraph of Station 3.'
        }
      ]
    },

    /* ---------------------------------------------------------------- Part 8 */
    {
      title: 'Legs, back, and face (Stations 4 to 6)',
      intro: 'Read the last three station cards, then answer the questions. The last question puts the whole assignment together: joints, movement, and muscles.',
      images: [
        {
          src: 'media/station-card-4.jpg',
          alt: 'Station 4 card, Lower Limb Muscles. Front and back drawings of the leg with the thigh and calf muscles labeled.',
          caption: 'Station 4 card.',
          text: '<p><b>Station 4: Lower Limb Muscles</b></p>'
            + '<p>Movements of the thigh occur at the hip joint and are done by muscles anchored to the pelvic girdle. Movements of the leg (remember in anatomy that is considered the area between the knee and ankle) occur at the knee joint. The longest skeletal muscle in the human body is the sartorius, which helps flex, abduct, and laterally rotate your thigh. The adductors (magnus, longus, and brevis) make up your inner thighs, and can be most easily felt when doing a butterfly stretch. When someone says they have a “pulled groin” they are referring to an adductor muscle. The most powerful muscle in the body is the quadriceps femoris in the thigh (vastus lateralis, vastus medialis, vastus intermedius, and rectus femoris). They are the major extensors of the knee, and we need them for jumping, climbing, running, and standing from a seated position. The quadricep muscles are antagonized by the hamstrings (biceps femoris, semimembranosus, semitendinosus) in the posterior thigh. Your hamstrings are prime movers for thigh extension and leg flexion. The calf muscles (gastrocnemius, soleus, and plantaris) are key for movement in the ankle, foot, and toes. The tibialis anterior makes up your shin and is the prime mover in dorsiflexion (allowing you to flex your ankle so that your foot moves towards your knee).</p>'
            + '<p>Labels on the drawings: adductors, sartorius, quadriceps, gastrocnemius, tibialis anterior, soleus, plantaris, semitendinosus, semimembranosus, biceps femoris.</p>'
        },
        {
          src: 'media/station-card-5.jpg',
          alt: 'Station 5 card, Posterior Muscles. A drawing of the back of the body with the back and buttock muscles labeled.',
          caption: 'Station 5 card.',
          text: '<p><b>Station 5: Posterior Muscles</b></p>'
            + '<p>The trapezius is the large triangular muscle in the upper back that is responsible for moving, rotating, and stabilizing the scapula, as well as extending the head at the neck.</p>'
            + '<p>The latissimus dorsi is the large triangular muscle of the lower back that is mainly responsible for arm movements. You couldn’t swim, row, rock climb, or do chin-ups without your lats!</p>'
            + '<p>The erector spinae are a group of muscles that essentially run the length of the spinal column on both the right and left sides, from the base of your skull all the way to your sacrum. They keep the back straight and provide side-to-side rotation. They are the prime movers in back extension. When these muscles get injured, painful spasms can occur.</p>'
            + '<p>One of the largest and strongest skeletal muscles in the human body is the gluteus maximus in your bum. All 3 of the gluteal muscles (maximus, medius, and minimus) play a major role in movement of the hips and thighs and thus are critical for overall strength as well as good posture.</p>'
            + '<p>Labels on the drawing: trapezius, latissimus dorsi, erector spinae, gluteus medius, gluteus maximus.</p>'
        },
        {
          src: 'media/station-card-6.jpg',
          alt: 'Station 6 card, Muscles of the Head and Neck. Side and front drawings of the face and neck muscles with labels, and an emoji exercise with six faces.',
          caption: 'Station 6 card.',
          text: '<p><b>Station 6: Muscles of the Head and Neck</b></p>'
            + '<p>The muscles of the face are thin and lie just beneath the skin. They are unique compared to other muscles in that they insert into skin or other muscles, rather than bones. We will only highlight a few muscles here. The main muscle of the scalp is the epicranius. The prime movers that allow your jaw to close (so you can chew your food) are the masseter and temporalis muscles. The buccinator is the main muscle of the cheek. The trapezius shown is one of two large triangular muscles that extend over the back of the neck and shoulders, and control movement of the head and shoulder blades.</p>'
            + '<p><b>Emoji Exercise:</b> Use a mirror. Look into it and mimic the following emoji expressions to see some of your facial muscles at work!</p>'
            + '<p>The frontal belly (forehead portion) of your epicranius allows you to raise your eyebrows and wrinkle your forehead. The mentalis and depressor labii inferioris allow you to pout. The zygomaticus major makes you smile. The orbicularis oris allows you to pucker. The orbicularis oculi allows you to blink. The platysma allows your mouth to sag downwards and your neck to tense. The corrugator supercilii allows you to furrow your eyebrows (it isn’t pictured, but it is just where your eyebrows would be, near the orbicularis oculi).</p>'
            + '<p>Labels on the drawings: epicranius (frontal belly, or frontalis, and occipital belly, or occipitalis), temporalis, buccinator, platysma, trapezius, orbicularis oculi, zygomaticus minor, zygomaticus major, orbicularis oris, masseter, depressor anguli oris, depressor labii inferioris, mentalis.</p>'
        }
      ],
      questions: [
        {
          type: 'choice',
          text: 'Station 4: Why does it make sense that some of the longest and most powerful muscles in the human body are in your thighs?',
          easy: 'Station 4: Why does it make sense that some of the biggest, strongest muscles are in your thighs?',
          options: [
            'They support body weight and power walking, running, jumping, and climbing.',
            'They are rarely used, so size does not matter.',
            'They have no bony attachments.',
            'They are only active while sleeping.'
          ],
          answer: 0,
          explain: 'Right. Your thigh muscles hold up your body weight and do the work of jumping, climbing, running, and standing up from a chair.',
          tip: 'Read what Station 4 says we need the quadriceps femoris for.'
        },
        {
          type: 'selects',
          text: 'Station 4: A friend goes on a run and comes back limping, saying he “pulled a hammy,” but he is rubbing his shin. Which muscle did he actually pull, and where are his hamstrings actually located?',
          easy: 'Station 4: Your friend says he hurt his hamstring (“pulled a hammy”), but he is rubbing his shin. Which muscle is really hurt? Where are the hamstrings really?',
          items: [
            { label: 'Muscle actually pulled', options: ['Tibialis anterior', 'Gastrocnemius', 'Sartorius', 'Quadriceps femoris'], answer: 'Tibialis anterior',
              hint: 'Station 4 says one muscle “makes up your shin.”' },
            { label: 'Hamstrings are located', options: ['Posterior (back) of the thigh', 'Anterior (front) of the thigh', 'Lateral (outer) thigh', 'Medial (inner) thigh'], answer: 'Posterior (back) of the thigh',
              hint: 'Find “hamstrings” on Station 4. Which view of the leg shows them?' }
          ]
        },
        {
          type: 'choice',
          text: 'Station 5: Which statement correctly tells apart the two large triangular back muscles?',
          easy: 'Station 5: There are 2 big triangle-shaped back muscles. Which sentence tells them apart correctly?',
          options: [
            'Trapezius = upper back, moves/stabilizes scapula & neck; Latissimus dorsi = lower back, mainly arm movement',
            'Trapezius = lower back; Latissimus dorsi = upper back',
            'Both muscles perform identical functions',
            'Neither muscle is triangular in shape'
          ],
          answer: 0,
          explain: 'Right. The trapezius is in the upper back and moves and stabilizes the scapula and the neck. The latissimus dorsi is in the lower back and mainly moves the arm (swimming, rowing, chin-ups).',
          tip: 'Read the first two paragraphs of Station 5. Where is each muscle, and what does each one mainly move?'
        },
        {
          type: 'selects',
          text: 'Station 5: Two groups of muscles in your back and hips have very important jobs. Which group does each job?',
          easy: 'Station 5: Which muscle group does each job?',
          options: ['Gluteal muscles (glutes)', 'Erector spinae', 'Latissimus dorsi', 'Trapezius'],
          items: [
            { label: 'Move the hips and thighs; critical for overall strength and good posture', answer: 'Gluteal muscles (glutes)', hint: 'Read the last paragraph of Station 5. Which group includes one of the largest, strongest muscles in the body?' },
            { label: 'Run the length of the spine, keep the back straight, and are the prime movers in back extension', answer: 'Erector spinae', hint: 'Which group runs from the base of the skull to the sacrum?' }
          ]
        },
        {
          type: 'choice',
          text: 'Station 6: If you have to squint to see the whiteboard more clearly in class, what muscle are you most likely using?',
          easy: 'Station 6: You squint (half close your eyes) to see the board. Which muscle are you using?',
          options: ['Orbicularis oculi', 'Zygomaticus major', 'Buccinator', 'Masseter'],
          answer: 0,
          explain: 'Right. The orbicularis oculi circles the eye. It lets you blink and squint.',
          tip: 'Look at the emoji exercise. Which muscle closes your eyes to blink? Oculi has to do with the eyes.'
        },
        {
          type: 'multi',
          text: 'Station 6: If someone sucks a thick milkshake through a straw, which TWO muscles would be used the most?',
          easy: 'Station 6: You drink a thick milkshake through a straw. Which 2 muscles do you use the most?',
          options: ['Buccinator', 'Orbicularis oris', 'Masseter', 'Temporalis'],
          answers: ['Buccinator', 'Orbicularis oris'],
          rules: [{ any: ['Masseter', 'Temporalis'], tip: 'Station 6 says these muscles close your jaw so you can chew. Sucking on a straw uses your cheeks and lips instead.' }],
          tip: 'There is one more. Think about the main muscle of the cheek and the muscle that lets you pucker your lips.',
          explain: 'Right. The orbicularis oris puckers your lips around the straw, and the buccinator (the cheek muscle) pulls your cheeks in to suck.'
        },
        {
          type: 'written',
          support: false,
          text: 'Put it all together. Think about a biceps curl: you bend your elbow to lift a weight toward your shoulder. Explain the movement using the whole assignment: (1) the elbow’s structural type, functional type, and kind of synovial joint, (2) the name of the movement, (3) the muscles that do it and the muscle that does the opposite (Station 3), and (4) what happens inside the muscle fibers to make them pull. (4 to 6 sentences)',
          easy: 'Think about a biceps curl. You bend your elbow to lift a weight. Explain it using the whole assignment: (1) What kind of joint is the elbow? (2) What is the movement called? (3) Which muscles do it, and which muscle does the opposite? (4) What happens inside the muscle fibers to make them pull? (4 to 6 sentences)',
          starters: ['The elbow is a … joint, so it …', 'Bending the elbow is called …, because …', 'The main muscles that do this are …, and the … does the opposite.', 'Inside the muscle fibers, …'],
          min: 100,
          ideas: [
            { done: 'You classified the elbow joint.', q: 'Did you classify the elbow joint?', tip: 'Look back at Parts 2 and 3: the elbow’s structural type, functional type, and synovial joint type.',
              re: /synovial|diarthros|hinge/ },
            { done: 'You named the movement.', q: 'Did you name the movement?', tip: 'Which movement word from Part 4 means decreasing the angle of a joint?', re: /flex/ },
            { done: 'You named the muscles that bend the elbow.', q: 'Did you name the muscles that bend the elbow?', tip: 'Station 3 names two muscles that contract together.', re: /biceps|brachialis/ },
            { done: 'You named the antagonist.', q: 'Did you name the muscle that does the opposite?', tip: 'Which Station 3 muscle straightens the elbow?', re: /triceps|antagonist/ },
            { done: 'You explained what happens inside the muscle fibers.', q: 'Did you explain what happens inside the muscle fibers?', tip: 'Think about Part 6. Which two proteins slide past each other, and what do calcium and ATP do?',
              re: /actin|myosin|sarcomere|sliding filament|calcium|\batp\b/ },
            { done: 'You wrote at least 4 sentences.', q: 'Did you write 4 to 6 full sentences?', tip: 'Write one sentence for each of the four parts of the question.', sentences: 4 }
          ]
        }
      ]
    }
  ]
};
