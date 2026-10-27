/*
  Explore - The Skeletal System (Anatomy & Physiology A)
  Everything a student sees is written in this file. The shared engine in /engine builds the page,
  progress bars, PDF printout, Listen buttons, and captions from it.
  Video: Amoeba Sisters, "Skeletal System". Captions come from the teacher's transcript (source/transcript.txt,
  not saved to GitHub). Vocabulary card pictures are frames from the video (card-*.jpg) or simple drawings
  (card-*.svg). The skeleton diagram is a frame from the video; the long bone diagram is a drawing.
  Write *scientific names* between asterisks to show them in italics. Reading boxes and tables use HTML.
  Full guide: docs/ASSIGNMENT_FORMAT.md
*/
window.ASSIGNMENT = {
  title: 'Explore - The Skeletal System',
  course: 'Anatomy & Physiology A',
  storageKey: 'explore-skeletal-system-v1',
  short: 'skeletal-system',                 // short link: SITE/skeletal-system

  icon: '<svg viewBox="0 0 64 72" aria-hidden="true" focusable="false"><rect x="6" y="10" width="52" height="52" rx="12" fill="var(--primary)"/>'
    + '<path d="M24 20 a6 6 0 1 1 8 5 v22 a6 6 0 1 1 -8 5 a6 6 0 1 1 -2 -9 l8 -2 v-14 l-8 -2 a6 6 0 1 1 2 -5 z" fill="var(--primary-ink)" transform="rotate(35 32 36)"/></svg>',

  /* The full video is in Part 2, with questions inside it, so there is no separate video at the top. */
  start: {
    heading: 'How this assignment works',
    intro: 'First you will practice this unit’s vocabulary words out loud. Then you will watch the Amoeba Sisters video “Skeletal System.” The video stops on its own 6 times for a question.',
    after: 'After the video, you will label a skeleton and a bone, and write two short responses. Work from top to bottom. Each part opens when you finish the one before it.'
  },

  /* Short clips, one or two per part. from/to are the times in the full video (they are shown to students). */
  clips: {
    connective: { src: 'media/clip-connective.mp4', from: 23.902, to: 37.85, seconds: 14, title: 'Ligaments, tendons, and cartilage' },
    whole:      { src: 'media/skeletal-system-video.mp4', from: 0, to: 544.2, seconds: 545, title: 'Skeletal System (Amoeba Sisters)',
                  of: 'Skeletal System', whole: true },
    skeleton:   { src: 'media/clip-skeleton.mp4', from: 96.85, to: 143.85, seconds: 48, title: 'The axial skeleton and the appendicular skeleton' },
    shapes:     { src: 'media/clip-shapes.mp4', from: 143.85, to: 221.85, seconds: 79, title: 'Classifying bones by shape' },
    inside:     { src: 'media/clip-inside.mp4', from: 221.85, to: 269.85, seconds: 49, title: 'Inside bones: compact bone, spongy bone, and marrow' },
    cells:      { src: 'media/clip-cells.mp4', from: 269.85, to: 356.85, seconds: 88, title: 'Osteoblasts, osteoclasts, and bone remodeling' },
    cartilage:  { src: 'media/clip-cartilage.mp4', from: 356.85, to: 405.85, seconds: 50, title: 'Chondroblasts, cartilage, and bone growth' },
    fracture:   { src: 'media/clip-fracture.mp4', from: 405.85, to: 521.85, seconds: 117, title: 'When a bone breaks, and conditions that affect bone' }
  },

  parts: [
    /* ---------------------------------------------------------------- Part 1 */
    {
      title: 'Skeletal system vocabulary',
      intro: 'You will say each word and its definition out loud. Saying words out loud helps your brain remember them, and it lets your teacher hear from you. Find a spot where you can talk, and make sure your microphone works.',
      clips: ['connective'],
      read: '<p><b>Read:</b> These are the 19 words for this unit.</p><ul>'
        + '<li><b>Skeletal system</b>: the body system made of bones and connective tissue (ligaments, tendons, and cartilage). It supports and protects the body.</li>'
        + '<li><b>Axial skeleton</b>: the bones along the central axis of the body: the skull, the vertebral column, and the ribcage.</li>'
        + '<li><b>Appendicular skeleton</b>: the bones of the arms and legs, plus the shoulder girdle and pelvic girdle where they attach.</li>'
        + '<li><b>Articulation (joint)</b>: a place where two or more bones meet.</li>'
        + '<li><b>Ligament</b>: connective tissue that connects bone to bone.</li>'
        + '<li><b>Tendon</b>: connective tissue that connects muscle to bone.</li>'
        + '<li><b>Cartilage</b>: flexible connective tissue that cushions and supports bones at joints.</li>'
        + '<li><b>Muscular system</b>: the body system of muscles that work with bones to move the body.</li>'
        + '<li><b>Flexion</b>: a movement that decreases the angle of a joint, such as bending your elbow.</li>'
        + '<li><b>Extension</b>: a movement that increases the angle of a joint, such as straightening your elbow.</li>'
        + '<li><b>Compact bone</b>: the hard, dense outer layer of bone.</li>'
        + '<li><b>Spongy bone</b>: the inner bone tissue with many spaces, where bone marrow is found.</li>'
        + '<li><b>Osteoblast</b>: a cell that makes bone.</li>'
        + '<li><b>Osteoclast</b>: a cell that breaks down bone.</li>'
        + '<li><b>Synovial joint</b>: a joint that moves freely, with a fluid-filled space between the bones.</li>'
        + '<li><b>Origin</b>: the place where a muscle attaches to the bone that stays still.</li>'
        + '<li><b>Insertion</b>: the place where a muscle attaches to the bone that moves.</li>'
        + '<li><b>Abduction</b>: moving a body part away from the midline of the body.</li>'
        + '<li><b>Adduction</b>: moving a body part toward the midline of the body.</li></ul>'
        + '<p><b>How the speaking cards work:</b> The cards come one at a time. Press <b>Say it</b>, then say the word and read its definition. The card turns green when it hears the word and its key ideas, and then the next card opens. If your browser asks to use the microphone, choose <b>Allow</b>.</p>'
        + '<p><b>Memory tip:</b> <b>Ab</b>duction <b>ab</b>ducts (takes away) your arm from your body. <b>Add</b>uction <b>add</b>s your arm back to your body.</p>'
        + '<p>If your microphone isn’t working, reach out to IT to get it working. It’s so important for us to hear from you in our online school, so you’ll need a working microphone to finish this activity.</p>',
      questions: [
        {
          type: 'speak',
          deck: true,
          text: 'Read each card out loud. Say the word, then read its definition. The next card opens when this one turns green.',
          cards: [
            { term: 'Skeletal system', def: 'The body system made of bones and connective tissue. It supports and protects the body.',
              img: { src: 'media/card-skeletal-system.jpg', alt: 'Cartoon drawing of a whole human skeleton.' },
              say: /\bskelet(al|on|ol|le)\b|\bskeleton system\b/, keys: [/\bbones?\b/, /\b(support|supports|supporting|protect|protects|protecting)\b/] },
            { term: 'Axial skeleton', def: 'The bones along the central axis of the body: the skull, the vertebral column, and the ribcage.',
              img: { src: 'media/card-axial.jpg', alt: 'Skeleton with the skull, vertebral column, and rib cage marked as the axial skeleton.' },
              say: /\b(axial|axel|axle|accent|actual|action|exile|axiel|axle)\b/, keys: [/\b(axis|center|central|centre|middle)\b/, /\b(skull|vertebral|vertebrae|spine|spinal|rib|ribs|ribcage)\b/] },
            { term: 'Appendicular skeleton', def: 'The bones of the arms and legs, plus the shoulder girdle and pelvic girdle where they attach.',
              img: { src: 'media/card-appendicular.jpg', alt: 'Skeleton with the arms, hands, and shoulder girdle colored as part of the appendicular skeleton.' },
              say: /\bappendic|\bappendage|\bappendix|\bappendicular\b|\ba pendicular\b/, keys: [/\b(arms?|legs?)\b/, /\b(girdles?|shoulders?|pelvic|pelvis|hips?|attach|attaches|attached)\b/] },
            { term: 'Articulation (joint)', def: 'A place where two or more bones meet.',
              img: { src: 'media/card-articulation.svg', alt: 'Drawing of two bones meeting end to end, with a circle around the place where they meet.' },
              say: /\barticulat|\bjoints?\b/, keys: [/\bbones?\b/, /\b(meet|meets|meeting|connect|connects|join|joins|come together|comes together)\b/] },
            { term: 'Ligament', def: 'Connective tissue that connects bone to bone.',
              img: { src: 'media/card-ligament.jpg', alt: 'Cartoon of ligaments holding two bones together at a joint.' },
              say: /\bligaments?\b|\bliga ?ments?\b|\blegaments?\b/, keys: [/\bbones?\b.*\bbones?\b/], not: /\bmuscles?\b/ },
            { term: 'Tendon', def: 'Connective tissue that connects muscle to bone.',
              img: { src: 'media/card-tendon.jpg', alt: 'Cartoon of an arm muscle with a tendon attaching it to a bone.' },
              say: /\btendons?\b|\btenden\b|\btendin\b|\bten don\b/, keys: [/\bmuscles?\b/, /\bbones?\b/] },
            { term: 'Cartilage', def: 'Flexible connective tissue that cushions and supports bones at joints.',
              img: { src: 'media/card-cartilage.jpg', alt: 'Cartoon of cartilage as a cushion between the ends of two bones at a knee.' },
              say: /\bcartil|\bcart[ae]l[ae]ge\b|\bcartlidge\b|\bcartlage\b/, keys: [/\b(cushion|cushions|cushioning|flexible|bendy|supports?)\b/, /\b(joints?|bones?)\b/] },
            { term: 'Muscular system', def: 'The body system of muscles that work with bones to move the body.',
              img: { src: 'media/card-muscular.jpg', alt: 'Title card from the video that reads Musculoskeletal, muscular plus skeletal.' },
              say: /\bmuscul(ar|er|ur)\b|\bmuscle system\b/, keys: [/\bmuscles?\b/, /\b(move|moves|moving|movement)\b/] },
            { term: 'Flexion', def: 'A movement that decreases the angle of a joint, such as bending your elbow.',
              img: { src: 'media/card-flexion.svg', alt: 'Drawing of an arm bending at the elbow. The angle at the joint gets smaller.' },
              say: /\bflexi(on|ng)\b|\bflection\b|\bflecks? ?ion\b|\bflexion\b/, keys: [/\b(decrease|decreases|decreasing|smaller|less|bend|bends|bending)\b/, /\b(angle|joint|elbow)\b/] },
            { term: 'Extension', def: 'A movement that increases the angle of a joint, such as straightening your elbow.',
              img: { src: 'media/card-extension.svg', alt: 'Drawing of an arm straightening at the elbow. The angle at the joint gets larger.' },
              say: /\bextension\b|\bextend\b|\bexstension\b/, keys: [/\b(increase|increases|increasing|bigger|larger|straight|straighten|straightens|straightening)\b/, /\b(angle|joint|elbow)\b/] },
            { term: 'Compact bone', def: 'The hard, dense outer layer of bone.',
              img: { src: 'media/card-bone-tissue.jpg', alt: 'Cartoon of a long bone cut open, with compact bone tissue on the outside and spongy bone tissue inside.' },
              say: /\bcompact\b|\bcom pact\b/, keys: [/\b(hard|dense|solid)\b/, /\b(outer|outside|outermost)\b/] },
            { term: 'Spongy bone', def: 'The inner bone tissue with many spaces, where bone marrow is found.',
              img: { src: 'media/card-bone-tissue.jpg', alt: 'Cartoon of a long bone cut open, with compact bone tissue on the outside and spongy bone tissue inside.' },
              say: /\bspong(y|e|ie|ey)\b/, keys: [/\b(marrow|spaces?|holes?)\b/, /\b(inner|inside|interior)\b/] },
            { term: 'Osteoblast', def: 'A cell that makes bone.',
              img: { src: 'media/card-osteoblast.jpg', alt: 'Cartoon osteoblast cells building bone.' },
              say: /\bblasts?\b|\bosteoblasts?\b/, keys: [/\b(make|makes|making|build|builds|building|form|forms|forming|create|creates)\b/, /\bbones?\b/], not: /\b(break|breaks|breaking|dissolve|dissolves)\b/ },
            { term: 'Osteoclast', def: 'A cell that breaks down bone.',
              img: { src: 'media/card-osteoclast.jpg', alt: 'Cartoon osteoclast on a wrecking ball, breaking down bone.' },
              say: /\bclasts?\b|\bclass\b|\bosteoclasts?\b|\bclassed\b/, keys: [/\b(break|breaks|breaking|broke|dissolve|dissolves|destroy|destroys)\b/, /\bbones?\b/] },
            { term: 'Synovial joint', def: 'A joint that moves freely, with a fluid-filled space between the bones.',
              img: { src: 'media/card-synovial.svg', alt: 'Drawing of two bone ends inside a joint capsule with a fluid-filled space between them.' },
              say: /\bsyn?ovi(al|el|ol)\b|\bsign? ?ovial\b|\bsenovial\b|\bsynovial\b/, keys: [/\b(move|moves|moving|movable|moveable|freely)\b/, /\b(fluid|liquid)\b/] },
            { term: 'Origin', def: 'The place where a muscle attaches to the bone that stays still.',
              img: { src: 'media/card-origin-insertion.svg', alt: 'Drawing of an arm muscle. Its origin is on the bone that stays still, and its insertion is on the bone that moves.' },
              say: /\borigins?\b|\boregon\b/, keys: [/\b(attach|attaches|attached|connects?)\b/, /\b(still|stays|stationary|fixed|doesnt move|does not move|not move)\b/] },
            { term: 'Insertion', def: 'The place where a muscle attaches to the bone that moves.',
              img: { src: 'media/card-origin-insertion.svg', alt: 'Drawing of an arm muscle. Its origin is on the bone that stays still, and its insertion is on the bone that moves.' },
              say: /\binsert(ion|ions|ing)?\b/, keys: [/\b(attach|attaches|attached|connects?)\b/, /\b(move|moves|moving)\b/], not: /\b(doesnt move|does not move|not move|still|stays)\b/ },
            { term: 'Abduction', def: 'Moving a body part away from the midline of the body.',
              img: { src: 'media/card-abduction.svg', alt: 'Drawing of a person raising one arm out to the side, away from the midline of the body.' },
              say: /\b(abduct|abduction|adduction|ab duction|add duction|a duction|abductions)\b/, keys: [/\baway\b/, /\b(midline|middle|center|centre|body)\b/], not: /\b(toward|towards|closer)\b/ },
            { term: 'Adduction', def: 'Moving a body part toward the midline of the body.',
              img: { src: 'media/card-adduction.svg', alt: 'Drawing of a person bringing one arm down toward the midline of the body.' },
              say: /\b(adduct|adduction|abduction|add duction|ad duction|a duction|adductions)\b/, keys: [/\b(toward|towards|to|closer|back)\b/, /\b(midline|middle|center|centre|body)\b/], not: /\baway\b/ }
          ]
        },
        {
          type: 'selects',
          text: 'Match each description to the correct word.',
          options: ['Ligament', 'Tendon', 'Cartilage', 'Articulation (joint)', 'Synovial joint', 'Origin', 'Insertion'],
          items: [
            { label: 'Connects bone to bone', answer: 'Ligament', hint: 'Listen to the clip. Which tissue is listed as number 1?' },
            { label: 'Connects muscle to bone', answer: 'Tendon', hint: 'The clip names this one second. It joins two different things.' },
            { label: 'Flexible tissue that cushions bones at joints', answer: 'Cartilage', hint: 'The clip says “we’ll get to [this] later.”' },
            { label: 'Any place where two or more bones meet', answer: 'Articulation (joint)', hint: 'This is the general word for where bones meet.' },
            { label: 'A joint that moves freely and has a fluid-filled space', answer: 'Synovial joint', hint: 'Look for the joint in the reading that has fluid.' },
            { label: 'Where a muscle attaches to the bone that stays still', answer: 'Origin', hint: 'Think of where something starts. Does that bone move?' },
            { label: 'Where a muscle attaches to the bone that moves', answer: 'Insertion', hint: 'This is the other end of the muscle, on the bone that moves.' }
          ]
        },
        {
          type: 'selects',
          text: 'Which movement is it? Match each action to the correct word.',
          options: ['Flexion', 'Extension', 'Abduction', 'Adduction'],
          items: [
            { label: 'Bending your knee to sit down', answer: 'Flexion', hint: 'Does the angle at the knee get smaller or larger?' },
            { label: 'Straightening your arm to reach a high shelf', answer: 'Extension', hint: 'Does the angle at the elbow get smaller or larger?' },
            { label: 'Lifting your arm out to the side to wave', answer: 'Abduction', hint: 'Is the arm moving away from the midline or toward it? Look at the memory tip.' },
            { label: 'Bringing your arm back down to your side', answer: 'Adduction', hint: 'Is the arm moving away from the midline or toward it? Look at the memory tip.' }
          ]
        }
      ]
    },

    /* ---------------------------------------------------------------- Part 2 */
    {
      title: 'Watch the video',
      intro: 'Watch the whole video. It stops on its own 6 times, and a question pops up. Answer each question to keep watching. You can rewind if you need to hear something again. Captions are on.',
      clips: ['whole'],
      questions: [
        {
          at: 37.8,
          type: 'selects',
          text: 'The video names connective tissue in the skeletal system. What does each one generally connect?',
          options: ['Bone to bone', 'Muscle to bone'],
          items: [
            { label: 'Ligaments', answer: 'Bone to bone', hint: 'Rewind to about 0:30. Ligaments are named first.' },
            { label: 'Tendons', answer: 'Muscle to bone', hint: 'Rewind to about 0:33. Tendons are named second.' }
          ]
        },
        {
          at: 86.6,
          type: 'multi',
          text: 'Which jobs does the video say the skeletal system does? Choose all that are correct.',
          options: ['Supports the body', 'Protects the organs inside', 'Stores important minerals', 'Makes red and white blood cells', 'Helps with movement (with muscles)', 'Digests food', 'Pumps blood'],
          answers: ['Supports the body', 'Protects the organs inside', 'Stores important minerals', 'Makes red and white blood cells', 'Helps with movement (with muscles)'],
          rules: [{ any: ['Digests food', 'Pumps blood'], tip: 'Not that one. That is the job of another body system. Rewind to about 1:12 and listen to the list.' }],
          tip: 'There are more. Rewind to about 1:12 and listen to the whole list of jobs.',
          explain: 'Right. The skeletal system supports the body, protects organs, stores minerals, makes blood cells, and, with the help of muscles, allows movement.'
        },
        {
          at: 143.8,
          type: 'selects',
          text: 'Is each one part of the axial skeleton or the appendicular skeleton?',
          options: ['Axial skeleton', 'Appendicular skeleton'],
          items: [
            { label: 'Skull', answer: 'Axial skeleton', hint: 'Rewind to about 1:49. The video says to think “central axis.”' },
            { label: 'Ribcage', answer: 'Axial skeleton', hint: 'Is the ribcage along the center of the body, or in a limb?' },
            { label: 'Vertebral column', answer: 'Axial skeleton', hint: 'The vertebral column runs down the center of your back.' },
            { label: 'Bones of the arms', answer: 'Appendicular skeleton', hint: 'Rewind to about 2:12. Arms are limbs, also called appendages.' },
            { label: 'Pelvic girdle', answer: 'Appendicular skeleton', hint: 'Rewind to about 2:19. The legs attach here.' }
          ]
        },
        {
          at: 242.3,
          type: 'choice',
          text: 'According to the video, where are blood cells made?',
          options: ['Red marrow', 'Yellow marrow', 'Compact bone tissue', 'Cartilage'], answer: 0,
          explain: 'Right. Red marrow makes red blood cells, white blood cells, and platelets. Yellow marrow stores fat.',
          tip: 'Rewind to about 3:54. There are two kinds of marrow. One stores fat. Which one makes blood cells?'
        },
        {
          at: 326.6,
          type: 'selects',
          text: 'Match each bone cell to what the video says it does.',
          options: ['Osteoblasts', 'Osteocytes', 'Osteoclasts'],
          items: [
            { label: 'Make bone', answer: 'Osteoblasts', hint: 'Rewind to about 4:32. These cells are named first.' },
            { label: 'Maintain bone structure; most of the bone cells', answer: 'Osteocytes', hint: 'Rewind to about 4:36. These cells are what the bone-making cells mature into.' },
            { label: 'Break down bone, using lysosomes', answer: 'Osteoclasts', hint: 'Rewind to about 4:44. Think of the wrecking ball.' }
          ]
        },
        {
          at: 513.8,
          type: 'choice',
          text: 'In osteogenesis imperfecta, bones are brittle and break easily. Which protein does the video say is affected?',
          options: ['Collagen', 'Hemoglobin', 'Calcium', 'Chitin'], answer: 0,
          explain: 'Right. Osteogenesis imperfecta affects how collagen is made. The video reminds you that collagen is the major protein in bone.',
          tip: 'Rewind to about 8:13. The video says, “If you recall from the very beginning of our video…”'
        }
      ]
    },

    /* ---------------------------------------------------------------- Part 3 */
    {
      title: 'The axial and appendicular skeleton',
      clips: ['skeleton', 'shapes'],
      read: '<p><b>Read:</b> An adult human generally has 206 bones. A baby has a few more, but some bones fuse together by adulthood.</p>'
        + '<p>The <b>axial skeleton</b> runs along the central axis of the body. It includes the <b>skull</b>, the tiny bones in your ears (ossicles), the hyoid bone in your throat, the <b>vertebral column</b>, and the <b>ribcage</b>.</p>'
        + '<p>The <b>appendicular skeleton</b> includes all the bones of the arms and the <b>shoulder girdle</b> where they attach, and all the bones of the legs and the <b>pelvic girdle</b> where they attach.</p>'
        + '<ul><li>Arm: the <b>humerus</b> (upper arm), then the <b>radius and ulna</b> (forearm).</li>'
        + '<li>Hand: <b>carpals</b> (wrist), metacarpals (palm), and <b>phalanges</b> (fingers).</li>'
        + '<li>Leg: the <b>femur</b> (thigh), the <b>patella</b> (kneecap), and the <b>tibia and fibula</b> (lower leg).</li>'
        + '<li>Foot: tarsals (ankle), metatarsals, and <b>phalanges</b> (toes).</li></ul>'
        + '<p><b>Bone shapes:</b> <b>Long bones</b> are cylinders that are longer than they are wide (femur, tibia, fibula, humerus, ulna, radius). <b>Short bones</b> are more like a cube (carpals and tarsals). <b>Sesamoid bones</b> are roundish, like a sesame seed (patella). <b>Flat bones</b> are thin and often curved (skull bones and the shoulder blades, or scapulae). <b>Irregular bones</b> do not have one specific shape (vertebrae).</p>',
      questions: [
        {
          type: 'label',
          text: 'Label the skeleton. Drag each label to the box with the matching number, then press “Check my labels.” The skeleton is facing you.',
          viewBox: '-250 0 1010 1080',
          image: { src: 'media/skeleton-diagram.jpg', width: 510, height: 1080 },
          alt: 'Drawing of a whole human skeleton, facing forward, with 11 numbered parts',
          credit: 'Skeleton drawing: Amoeba Sisters, “Skeletal System” video',
          spots: [
            { x: -150, y: 70, label: 'Skull', tip: 'This bone protects the brain.', to: [[205, 70]] },
            { x: -150, y: 250, label: 'Ribcage', tip: 'These curved bones protect the heart and lungs.', to: [[185, 250]] },
            { x: 660, y: 370, label: 'Vertebral column', tip: 'Look for the stack of bones down the center of the back.', to: [[262, 370]] },
            { x: 660, y: 240, label: 'Humerus', tip: 'This is the long bone of the upper arm, between the shoulder and the elbow.', to: [[395, 260]] },
            { x: 660, y: 450, label: 'Radius and ulna', tip: 'These two bones are in the forearm, between the elbow and the wrist.', to: [[420, 440]] },
            { x: 660, y: 540, label: 'Carpals', tip: 'These short bones are in the wrist.', to: [[440, 520]] },
            { x: -150, y: 420, label: 'Pelvic girdle', tip: 'The legs attach to the body here, at the hips.', to: [[175, 440]] },
            { x: -150, y: 590, label: 'Phalanges', tip: 'These are the bones of the fingers (and toes).', to: [[85, 590]] },
            { x: -150, y: 780, label: 'Femur', tip: 'This is the long bone of the thigh, the biggest bone in the body.', to: [[215, 610]] },
            { x: -150, y: 900, label: 'Patella', tip: 'This roundish sesamoid bone is the kneecap.', to: [[208, 715]] },
            { x: 660, y: 850, label: 'Tibia and fibula', tip: 'These two bones are in the lower leg, between the knee and the ankle.', to: [[325, 850]] }
          ],
          explain: 'The skull, ribcage, and vertebral column are the axial skeleton. The arms, legs, shoulder girdle, and pelvic girdle are the appendicular skeleton.'
        },
        {
          type: 'selects',
          text: 'Sort the bones you labeled. Is each one part of the axial skeleton or the appendicular skeleton?',
          options: ['Axial skeleton', 'Appendicular skeleton'],
          items: [
            { label: 'Femur', answer: 'Appendicular skeleton', hint: 'Is the femur along the central axis, or in a limb?' },
            { label: 'Vertebral column', answer: 'Axial skeleton', hint: 'Is the vertebral column along the central axis, or in a limb?' },
            { label: 'Carpals', answer: 'Appendicular skeleton', hint: 'The carpals are in the wrist. Is that a limb?' },
            { label: 'Skull', answer: 'Axial skeleton', hint: 'The clip says to think “central axis of a human.” Where is the skull?' },
            { label: 'Patella', answer: 'Appendicular skeleton', hint: 'The patella is in the knee. Is that part of a limb?' }
          ]
        },
        {
          type: 'selects',
          text: 'Classify each bone by its shape.',
          options: ['Long bone', 'Short bone', 'Sesamoid bone', 'Flat bone', 'Irregular bone'],
          items: [
            { label: 'Femur', answer: 'Long bone', hint: 'The second clip calls this a great example of one shape.' },
            { label: 'Carpals (wrist)', answer: 'Short bone', hint: 'These are close to a cube, with length and width about equal.' },
            { label: 'Patella (kneecap)', answer: 'Sesamoid bone', hint: 'This bone is roundish. What seed does the video compare it to?' },
            { label: 'Skull (cranial) bones', answer: 'Flat bone', hint: 'These bones are thin and often curved. The name of the group can fool you.' },
            { label: 'Vertebrae', answer: 'Irregular bone', hint: 'These bones do not have one shape you can describe.' }
          ]
        }
      ]
    },

    /* ---------------------------------------------------------------- Part 4 */
    {
      title: 'Inside bones: a living tissue',
      clips: ['inside', 'cells', 'cartilage'],
      read: '<p><b>Read:</b> Bone is a <b>living tissue</b>. It is made of the protein <b>collagen</b> and minerals.</p>'
        + '<p>There are two general types of bone tissue. <b>Compact bone</b> is the hard outer layer. <b>Spongy bone</b> is inside, and it is where you find bone marrow. <b>Yellow marrow</b> stores fat for long-term energy. <b>Red marrow</b> makes red blood cells (which transport gases), white blood cells (which defend the body), and platelets (which help blood clot). Bones have a rich blood supply, so we say bones are <b>vascular</b>.</p>'
        + '<p><b>Bone cells:</b> <b>Osteoblasts</b> make bone. They can mature into <b>osteocytes</b>, which maintain bone. <b>Osteoclasts</b> break down bone. They have many lysosomes, with enzymes that, together with acids, dissolve bone.</p>'
        + '<p><b>Bone remodeling:</b> Old or damaged bone is broken down and replaced with new bone. About 5 to 10% of the skeleton is remodeled every year. Injury and exercise can affect remodeling. Breaking down bone also releases minerals the body needs, such as <b>calcium</b>. Hormones signal when calcium is released from bone and when it is deposited.</p>'
        + '<p><b>Cartilage:</b> <b>Chondroblasts</b> make cartilage, and they mature into <b>chondrocytes</b>, which maintain it. Cartilage supports bone and is important in joints. In a developing baby, cartilage is the template that bone later replaces. With the help of osteoblasts, bones grow in length until early adulthood.</p>',
      questions: [
        {
          type: 'label',
          text: 'Label the inside of a long bone. Drag each label to the box with the matching number, then press “Check my labels.”',
          viewBox: '-230 0 760 820',
          image: { src: 'media/long-bone-diagram.svg', width: 300, height: 820 },
          alt: 'Drawing of a long bone cut open lengthwise, with 4 numbered parts',
          spots: [
            { x: -130, y: 60, label: 'Cartilage', tip: 'This blue layer covers the end of the bone, where it meets another bone at a joint.', to: [[62, 72]] },
            { x: 430, y: 140, label: 'Spongy bone', tip: 'Look for bone tissue with many small spaces inside the end of the bone.', to: [[205, 140]] },
            { x: -130, y: 420, label: 'Compact bone', tip: 'This is the hard outer layer of the bone’s wall.', to: [[119, 420]] },
            { x: 430, y: 430, label: 'Yellow marrow', tip: 'This soft tissue fills the hollow middle of the shaft. Its color is a clue.', to: [[150, 430]] }
          ],
          explain: 'Compact bone is the hard outer layer. Spongy bone is inside, with spaces that hold red marrow. Yellow marrow, which stores fat, fills the middle of the shaft. Cartilage cushions the ends of the bone at joints.'
        },
        {
          type: 'selects',
          text: 'Match each part of the bone to its job.',
          options: ['Red marrow', 'Yellow marrow', 'Compact bone'],
          items: [
            { label: 'Makes blood cells and platelets', answer: 'Red marrow', hint: 'The first clip says this is “where blood cells can be made.”' },
            { label: 'Stores fat for long-term energy', answer: 'Yellow marrow', hint: 'One kind of marrow stores fat. Listen to the first clip for its color.' },
            { label: 'The hard outer layer', answer: 'Compact bone', hint: 'Which bone tissue is hard and on the outside?' }
          ]
        },
        {
          type: 'selects',
          text: 'Match each cell to its job.',
          options: ['Osteoblast', 'Osteocyte', 'Osteoclast', 'Chondroblast', 'Chondrocyte'],
          items: [
            { label: 'Makes bone', answer: 'Osteoblast', hint: 'Think “B” for build.' },
            { label: 'Maintains bone; most of the cells in bone', answer: 'Osteocyte', hint: 'Bone-making cells mature into these.' },
            { label: 'Breaks down bone', answer: 'Osteoclast', hint: 'These cells have many lysosomes.' },
            { label: 'Makes cartilage', answer: 'Chondroblast', hint: 'The third clip says these cells make the connective tissue cartilage.' },
            { label: 'Maintains cartilage', answer: 'Chondrocyte', hint: 'Cartilage-making cells mature into these.' }
          ]
        },
        {
          type: 'choice',
          text: 'Why does the body break down bone in bone remodeling?',
          options: [
            'To remove old or damaged bone so it can be replaced, and to release minerals like calcium',
            'Because bones stop being alive after early adulthood',
            'To make the skeleton smaller every year',
            'Because osteoblasts are not able to make new bone'
          ], answer: 0,
          explain: 'Right. Osteoclasts remove old or damaged bone, and osteoblasts rebuild it. Breaking down bone also releases calcium the body may need.',
          tip: 'Listen to the second clip after the question, “Why would you want to normally break down bone?”'
        },
        {
          type: 'highlight',
          cer: true,
          text: 'The video says that bones are a LIVING tissue. Do you agree? Make a claim, support it with at least two pieces of evidence from the video, and expand on your thinking. (4 to 6 sentences)',
          min: 120,
          starters: [
            'I claim that bones are …',
            'One piece of evidence from the video is …',
            'Another piece of evidence is …',
            'This matters because …'
          ],
          ideas: [
            { done: 'You made a claim about whether bone is living.', q: 'Did you make a claim?', tip: 'Start by saying whether you think bones are a living tissue.', re: /\b(is|are) (a |not )?(living|alive|dead)\b|\b(living|alive|dead|nonliving|non-living) tissue/ },
            { done: 'You used bone cells as evidence.', q: 'Did you use bone cells as evidence?', tip: 'What do osteoblasts and osteoclasts do to bone all the time?', re: /osteo(blast|clast|cyte)|bone cells?\b.*\b(make|makes|build|builds|break|breaks)/ },
            { done: 'You used blood or marrow as evidence.', q: 'Did you mention marrow or the blood supply?', tip: 'What does red marrow make? What does “vascular” mean?', re: /marrow|blood|vascular/ },
            { done: 'You explained change over time (remodeling, growth, or healing).', q: 'Did you explain how bone changes over time?', tip: 'The video says about 5 to 10% of the skeleton is replaced each year. What is that process called?', re: /remodel|replac|rebuil|\bgrows?\b|growth|growing|\bheal|repair/ },
            { done: 'You wrote at least 4 sentences.', q: 'Did you write 4 to 6 full sentences?', tip: 'Add another sentence that expands on your evidence.', sentences: 4 }
          ]
        }
      ]
    },

    /* ---------------------------------------------------------------- Part 5 */
    {
      title: 'When a bone breaks',
      clips: ['fracture'],
      read: '<p><b>Read:</b> When a bone breaks, a <b>fracture hematoma</b> forms first. It is a collection of blood at the site of the break, because bones are very vascular. Blood cannot reach the bone cells near the break, so those cells generally die.</p>'
        + '<p>Next, with the help of chondrocytes and osteoblasts, an <b>internal callus</b> and an <b>external callus</b> form to keep the bone together. The internal callus is mainly cartilage. The outer callus is a mix of cartilage and bone.</p>'
        + '<p>Then <b>osteoclasts</b> remove the damaged bone, and <b>osteoblasts</b> remodel the area and make new bone. Many fractures heal in 6 to 8 weeks, but it can take longer depending on the type of bone and the fracture.</p>'
        + '<p>A severe fracture of a long bone, like the femur, can cause heavy internal bleeding. Rarely, fat from the yellow marrow gets into the blood and causes <b>fat embolism syndrome</b>, which needs emergency care.</p>'
        + '<p><b>Osteogenesis imperfecta</b> is a genetic disorder that affects how collagen is made. Bones are brittle and fracture easily. There is no cure yet, but treatment helps with mobility and preventing fractures.</p>',
      questions: [
        {
          type: 'order',
          text: 'Put the steps of healing a broken bone in order, from first to last.',
          items: [
            'The bone breaks, and a fracture hematoma (a collection of blood) forms at the break.',
            'Bone cells near the break die, because blood cannot reach them.',
            'Chondrocytes and osteoblasts make an internal callus and an external callus to hold the bone together.',
            'Osteoclasts remove the damaged bone.',
            'Osteoblasts remodel the area and make new bone.'
          ],
          tip: 'Watch the clip again from the start. What forms right after the break? What holds the bone together before the new bone is made?',
          explain: 'Right. First a hematoma forms and nearby bone cells die. Then a callus holds the bone together. Osteoclasts remove damaged bone, and osteoblasts build new bone. Many fractures heal in 6 to 8 weeks.'
        },
        {
          type: 'choice',
          text: 'Why does a fracture hematoma form after a bone breaks?',
          options: ['Bones are very vascular, so blood collects at the break', 'Yellow marrow turns into blood', 'Cartilage melts at the break', 'Osteoclasts make blood cells'], answer: 0,
          explain: 'Right. Bones have a rich blood supply, so a break causes blood to collect at the site.',
          tip: 'The clip says the hematoma forms “because again bones are very…” What word finishes that?'
        },
        {
          type: 'highlight',
          text: 'Maya broke her arm playing soccer. Explain how her bone heals, step by step, from the day it breaks until new bone is made. Name the cells that help at each step. (4 to 6 sentences)',
          min: 120,
          starters: [
            'First, right after the break, …',
            'According to the video, the bone cells near the break …',
            'Next, to hold the bone together, …',
            'After that, osteoclasts …',
            'Finally, …'
          ],
          ideas: [
            { done: 'You described the fracture hematoma.', q: 'Did you say what forms right after the break?', tip: 'The clip names a collection of blood that forms at the break.', re: /hematoma|blood|bleed|clot/ },
            { done: 'You described the callus.', q: 'Did you explain what holds the bone together?', tip: 'What do chondrocytes and osteoblasts make, inside and outside the break?', re: /callus|callous|cartilage|chondro/ },
            { done: 'You named the cells that remove and rebuild bone.', q: 'Did you name the cells that remove damaged bone and make new bone?', tip: 'Which cell breaks down bone? Which cell makes new bone?', re: /osteoclast.*osteoblast|osteoblast.*osteoclast/ },
            { done: 'You used at least 4 sentences.', q: 'Did you write 4 to 6 full sentences?', tip: 'Add a sentence for each step of healing.', sentences: 4 },
            { done: 'You used transition words to point to your evidence.', q: 'Did you use transition words to point to your evidence?', tip: 'Introduce your evidence with words like “According to the video,” “First,” “Next,” or “This shows that.”', writing: true, re: /for example|for instance|according to|this shows|that shows|shows that|in the video|the video (says|said|shows|showed|explains|explained|mentions|mentioned)|first|next|then|after that|finally|because|this means/ },
            { done: 'You highlighted your transition words in yellow.', q: 'Did you highlight your transition words in yellow?', tip: 'Go back and select the transition words that point to your evidence, then press the yellow button.', highlight: true }
          ]
        }
      ]
    }
  ]
};
