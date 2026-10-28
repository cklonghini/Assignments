/*
  Explore - Cell Signaling (Biology A)
  Moved from the teacher's Cell Signaling Webquest (github.com/cklonghini/Cell-Signaling-Webquest).
  Everything a student sees is written in this file. The shared engine in /engine builds the page,
  progress bars, PDF printout, Listen buttons, and captions from it.
  Full guide: docs/ASSIGNMENT_FORMAT.md
*/
window.ASSIGNMENT = {
  title: 'Explore - Cell Signaling',
  course: 'Biology A',
  storageKey: 'explore-cell-signaling-v2',
  icon: '<svg viewBox="0 0 64 72" aria-hidden="true" focusable="false"><circle cx="32" cy="14" r="8" fill="var(--ligand)"/><path d="M12 22 Q12 46 32 46 Q52 46 52 22" fill="none" stroke="var(--receptor)" stroke-width="9" stroke-linecap="round"/><rect x="28" y="44" width="8" height="22" fill="var(--receptor)"/></svg>',

  /* No single main video: each part has its own whole video. */
  start: {
    heading: 'How this assignment works',
    intro: 'In this assignment you will learn how cells “talk” to each other. You will watch four short videos, read about cell signaling, and try an online interactive.',
    after: 'Work from top to bottom. Each part gives you a video or a reading, and then lets you practice and check your work. Some questions pop up inside the videos. You will also answer five written questions. Each part opens when you finish the one before it.'
  },

  clips: {
    intro:    { src: 'media/intro-cell-signaling.mp4', from: 0, to: 538.4, seconds: 539, title: 'Intro to Cell Signaling', of: 'Intro to Cell Signaling', whole: true },
    overview: { src: 'media/overview-cell-signaling.mp4', from: 0, to: 528.0, seconds: 529, title: 'Overview of Cell Signaling', of: 'Overview of Cell Signaling', whole: true },
    neurons:  { src: 'media/how-neurons-communicate.mp4', from: 0, to: 78.1, seconds: 79, title: 'How Neurons Communicate', of: 'How Neurons Communicate', whole: true },
    dropping: { src: 'media/dropping-signals.mp4', from: 0, to: 83.5, seconds: 84, title: 'Dropping Signals', of: 'Dropping Signals', whole: true }
  },

  parts: [
    /* ---------------------------------------------------------------- Part 1 */
    {
      title: 'Introduction to cell signaling',
      intro: 'Watch the Intro to Cell Signaling video. It stops on its own 5 times and a question pops up. Answer each question to keep watching. You can rewind the video if you need to hear something again. Then answer the two written questions below the video.',
      clips: ['intro'],
      questions: [
        {
          at: 74,
          type: 'typed',
          text: 'The video says we will be talking a lot about one kind of molecule. What is the name of the molecule that a signal molecule can bind to?',
          easy: 'A signal molecule can bind (attach) to another molecule. The video says we will talk about this molecule a lot. What is its name?',
          accept: ['receptor', 'receptors', 'a receptor', 'the receptor', 'receptor protein', 'receptor proteins', 'a receptor protein'],
          okMsg: 'Correct. A receptor is a molecule, such as a protein, where a signal molecule can bind. Many receptors are on the surface of the cell membrane.',
          tip: 'Rewind to about 1:06 and listen for the word the video says we will be talking a lot about. (A ligand is the signal molecule itself.)',
          aria: 'Your answer'
        },
        {
          at: 117.5,
          type: 'choice',
          text: 'The video says the signal molecule can be considered a ligand. What does it say a ligand is?',
          easy: 'The video says a signal molecule can be called a ligand. What is a ligand?',
          options: ['The smaller molecule that binds to a typically larger molecule, such as a receptor', 'A large protein in the cell membrane that catches signals', 'The change a cell makes after it gets a signal', 'A connection between two cells that touch'],
          answer: 0,
          tip: 'Rewind to about 1:34. Listen for what “ligand” basically means, and whether it is smaller or larger than the molecule it binds.',
          explain: 'Right. A ligand is the smaller molecule that binds to a typically larger molecule. Signal molecules are ligands, and they are generally smaller than the receptors they bind.'
        },
        {
          at: 157,
          type: 'order',
          text: 'The video gives the general sequence of cell signaling. Put the three stages in order.',
          easy: 'The video tells the steps of cell signaling. Put the 3 stages in order, from first to last.',
          items: ['Reception', 'Transduction', 'Response'],
          tip: 'Rewind to about 2:01. Listen for the stage the video calls “first.” What has to happen before the receptor can be activated?',
          explain: 'Right. First reception (a signal molecule binds a receptor), then transduction (the receptor gets activated), then a response.'
        },
        {
          at: 200.5,
          type: 'choice',
          text: 'The video says gap junctions in animal cells and plasmodesmata in plant cells are connections between two close together cells. What do they allow?',
          easy: 'Gap junctions (in animal cells) and plasmodesmata (in plant cells) connect two cells that are close together. What do they let happen?',
          options: ['Ions or other small molecules can pass between the cells without crossing the cell membrane.', 'Hormones can travel through the bloodstream to cells far away.', 'A cell can send a signal back to itself.', 'Neurotransmitters can cross a synapse between two neurons.'],
          answer: 0,
          tip: 'Rewind to about 3:02. These connections are for cells that are very close. Listen for what is able to pass.',
          explain: 'Right. Gap junctions and plasmodesmata connect two close cells so ions or other small molecules can pass, and they do not have to cross the cell membrane.'
        },
        {
          at: 258.3,
          type: 'selects',
          text: 'Match each type of cell signaling to what the video says about it.',
          options: ['autocrine', 'endocrine', 'paracrine', 'synaptic'],
          items: [
            { label: 'A signal molecule diffuses to a nearby cell. The cells are close but need not be connected.', easy: 'A signal molecule spreads (diffuses) to a cell nearby. The cells are close, but they do not have to touch.', answer: 'paracrine', hint: 'Rewind to about 3:21. This is the first type of local signaling the video names.' },
            { label: 'Neurotransmitters carry the signal across a synapse.', answer: 'synaptic', hint: 'Rewind to about 3:40. The video calls this another example of local signaling.' },
            { label: 'A cell talks to a target cell far away. Signals such as hormones may be carried in the bloodstream.', answer: 'endocrine', hint: 'Rewind to about 3:50. Listen for the long-distance type.' },
            { label: 'A cell signals itself, such as a cell releasing its own growth factor.', answer: 'autocrine', hint: 'Rewind to about 4:02. The molecule binds to a receptor on the same cell that made it.' }
          ]
        },
        {
          type: 'written',
          text: 'Summarize the three stages of cell signaling: reception, transduction, and response. Write at least one sentence for each stage.',
          easy: 'Explain the 3 stages of cell signaling in your own words. Write at least one sentence for each stage: 1. reception, 2. transduction, 3. response.',
          starters: ['During reception, a signal molecule …', 'During transduction, the receptor …', 'During the response, the cell …'],
          min: 120,
          ideas: [
            { done: 'You described reception.', q: 'Did you describe reception?', tip: 'Reception is the first stage. What arrives at the cell, and what does it bind to?', all: [/bind|attach|lands? on|connects?|\bfits?\b|sticks?|hooks?/, /receptor|protein|cell (surface|membrane)|outside of the cell|membrane/] },
            { done: 'You described transduction.', q: 'Did you describe transduction?', tip: 'Transduction is the middle stage. What happens to the receptor after the signal binds?', re: /activat|changes? (its )?shape|shape change|pathway|amplif|relay|pass(es|ed)? (the signal|it|along|on)|chain|cascade|messengers?|carr(y|ies|ied) the signal|inside the cell|into the cell|converts?|turns? (the signal|it) into/ },
            { done: 'You described the response.', q: 'Did you describe the response?', tip: 'The response is the last stage. What does the cell do because of the signal? The video gives an example with DNA.', re: /dna|transcri|makes? (a |new )?proteins?|divid|genes?\b|turns? on|switch(es)? on|grows?\b|growth|mov(e|es|ing)\b|secret|releas|reacts?|changes? (what|its|how)/ },
            { done: 'You wrote at least 3 sentences.', q: 'Did you write a sentence for each stage?', tip: 'Give each stage its own sentence.', sentences: 3 }
          ]
        },
        {
          type: 'written',
          text: 'What is the difference between intracellular and intercellular signaling? (2 to 3 sentences)',
          easy: 'Intracellular signaling and intercellular signaling sound alike. Explain how they are different. (2 to 3 sentences)',
          starters: ['Intercellular signaling happens …', 'Intracellular signaling happens …', 'The difference is that …'],
          min: 60,
          ideas: [
            { done: 'You explained intercellular signaling.', q: 'Did you explain intercellular signaling?', tip: '“Inter-” means between. Who is talking to whom?', re: /between (two |different |other )?cells|one cell (to|sends)|cell to (another )?cell|from one cell|with another cell|communicates with/ },
            { done: 'You explained intracellular signaling.', q: 'Did you explain intracellular signaling?', tip: '“Intra-” means within. Where does this signal travel?', re: /(inside|within) (a |the |one |that |the same )?(single )?cell|in (a|one|the same|a single) cell|stays? in(side)? (the )?cell|intracellular[^.!?]*\bin (the )?cell/ },
            { done: 'You wrote at least 2 sentences.', q: 'Did you write at least 2 sentences?', tip: 'Give each type its own sentence.', sentences: 2 }
          ]
        }
      ]
    },

    /* ---------------------------------------------------------------- Part 2 */
    {
      title: 'Ligands, receptors, and responses',
      intro: 'Read each section, watch the Overview of Cell Signaling video, and answer the questions as you go. Everything you need is on this page.',
      clips: ['overview'],
      images: [
        { src: 'media/brain-orexin.jpg', alt: 'Microscope image of brain tissue: red round cell bodies, blue nuclei, and green branching fibers.',
          caption: 'An image of normal brain tissue from the thalamus. In red are the receptors for orexin. Orexins are peptide hormones that help keep us awake and alert, and may also stimulate the appetite.' },
        { src: 'media/sending-target-cells.png', alt: 'Drawing of three cells. A sending cell releases small round ligands. One ligand binds to a receptor on the target cell, which leads to a response. A non-target cell has no receptor for the ligand.',
          caption: 'A sending cell, a target cell, and a non-target cell.' }
      ],
      read: '<p><b>Read:</b> Cells “communicate” with each other via signaling. That is, one cell either directly connects or (more often) sends signaling molecules, which are often proteins, to another cell (or sometimes even back to itself), which triggers a response. Cell signaling influences a variety of cell functions, including the synthesis of specific proteins and cell division.</p>'
        + '<p>Not all cells can “catch” a particular signal. In order to detect the signal, the cell must have the right <b>receptor</b> for that signal. When a signaling molecule binds to its receptor, it alters the shape or activity of the receptor, triggering a change inside of the cell. Signaling molecules are often called <b>ligands</b>, a general term for molecules that bind specifically to other molecules (such as receptors).</p>'
        + '<p>A <b>sending cell</b> produces ligands (signaling molecules) that bind to a receptor on the <b>target cell</b>, which causes a response. <b>Non-target cells</b> do not have a receptor for that specific ligand, so they do not respond.</p>'
        + '<p>The message carried by a ligand is often relayed through a chain of <b>chemical messengers</b> inside the cell. Ultimately, it leads to a change in the cell, such as protein synthesis.</p>'
        + '<p class="small">Readings adapted from the Cell Signaling activity by Andrea Bierema, Michigan State University.</p>',
      questions: [
        {
          type: 'selects',
          text: 'Label the diagram. Match each letter to the correct label.',
          img: { src: 'media/signaling-diagram.svg', alt: 'Diagram of a cell. A small circle sits in a cup-shaped receptor on the cell membrane. Below it, two rounded boxes inside the cell are connected by arrows, and the last arrow points to a spiky burst. Letters A to D mark four parts.' },
          options: ['cell membrane', 'chemical messengers', 'ligand', 'receptor', 'response'],
          items: [
            { label: 'Label A', answer: 'ligand', hint: 'This is the signaling molecule that arrives from outside the cell.' },
            { label: 'Label B', answer: 'receptor', hint: 'This protein sits in the cell membrane and catches the signal.' },
            { label: 'Label C', answer: 'chemical messengers', hint: 'These molecules relay the message inside the cell.' },
            { label: 'Label D', answer: 'response', hint: 'This is what the cell does at the end of the chain of events.' }
          ]
        },
        {
          type: 'selects',
          text: 'Read the caption under the picture. Then fill in the blanks.',
          img: { src: 'media/ligand-receptor-response.png', alt: 'Drawing of a ligand binding to a receptor on a cell. Inside the cell, chemical messengers relay the signal, which leads to a response.',
                 caption: 'Once a ligand (a signaling molecule) binds to a receptor, the receptor relays the signal via chemical messengers to other molecules (such as proteins) in the cell. This chain of events causes a response in the cell.' },
          note: 'Once a <b>(1)</b> ______ (a signaling molecule) binds to a <b>(2)</b> ______, the receptor relays the signal to other molecules (such as <b>(3)</b> ______) in the cell. This chain of events causes a <b>(4)</b> ______ in the cell.',
          options: ['hormone', 'ligand', 'nucleus', 'proteins', 'receptor', 'response'],
          items: [
            { label: 'Blank 1', answer: 'ligand', hint: 'What is the general word for a signaling molecule?' },
            { label: 'Blank 2', answer: 'receptor', hint: 'What does the signaling molecule bind to?' },
            { label: 'Blank 3', answer: 'proteins', hint: 'The receptor passes the message to other molecules in the cell. What kind of molecules are they?' },
            { label: 'Blank 4', answer: 'response', hint: 'What does the cell do at the end of the chain of events?' }
          ]
        },
        {
          type: 'order',
          text: 'Put the five basic steps of cell signaling in order.',
          items: [
            'A sending cell makes and releases a signaling molecule (a ligand).',
            'The ligand travels to a target cell and binds to its receptor.',
            'Binding changes the receptor, which activates chemical messengers inside the cell.',
            'The messengers pass the signal along a chain of molecules.',
            'The cell carries out a response, such as making a protein or dividing.'
          ],
          tip: 'Start with the cell that sends the signal, and end with what the target cell does. Reread the reading if you get stuck.',
          explain: 'Right. A sending cell releases a ligand, it binds to a receptor, the receptor turns on chemical messengers, the messengers pass the signal along, and the cell responds.'
        }
      ]
    },

    /* ---------------------------------------------------------------- Part 3 */
    {
      title: 'Types of signaling and synaptic signaling',
      intro: 'Match each type of signaling to its definition. Then read about synaptic signaling and watch the How Neurons Communicate video.',
      clips: ['neurons'],
      read: '<p><b>Read:</b> One unique example of cell signaling is <b>synaptic signaling</b>, in which a nerve cell (called a “neuron”) transmits a signal to another neuron. This process is named for the <b>synapse</b>, the junction between two nerve cells where signal transmission occurs.</p>'
        + '<p>When the sending neuron fires, an electrical impulse moves rapidly through the cell, traveling down a long, fiber-like extension called an <b>axon</b>. When the impulse reaches the synapse, it triggers the release of <b>neurotransmitters</b>, which quickly cross the small gap between the neurons. When the neurotransmitters arrive at the receiving cell, they bind to receptors and cause a chemical change inside of the cell (often, opening ion channels and changing the electrical potential across the membrane). The video above illustrates this process.</p>'
        + '<p class="small">Readings adapted from the Cell Signaling activity by Andrea Bierema, Michigan State University.</p>',
      questions: [
        {
          type: 'selects',
          text: 'Choose the correct term for each definition.',
          options: ['autocrine', 'endocrine', 'gap junctions', 'paracrine', 'synaptic'],
          items: [
            { label: 'A cell releasing a signaling factor signals to itself.', answer: 'autocrine', hint: 'Which type of signaling sends the message back to the same cell?' },
            { label: 'Two cells signal over a long distance from each other.', answer: 'endocrine', hint: 'Think about hormones traveling through the bloodstream.' },
            { label: 'Two cells signal to each other over a short distance.', answer: 'paracrine', hint: 'Think about a signal that only travels to nearby cells. Synaptic signaling is only for neurons.' },
            { label: 'Two or more cells next to each other can signal to each other through spaces in their cellular membranes.', easy: 'Cells right next to each other send signals through openings in their cell membranes.', answer: 'gap junctions', hint: 'These are channels that connect neighboring cells.' }
          ]
        },
        {
          type: 'order',
          text: 'Using the video “How Neurons Communicate,” put the four steps of synaptic signaling in order.',
          items: [
            'The sending neuron fires, and an electrical impulse travels down its axon.',
            'The impulse reaches the synapse and triggers the release of neurotransmitters.',
            'The neurotransmitters cross the gap and bind to receptors on the receiving cell.',
            'Binding causes a chemical change in the receiving cell, such as ion channels opening.'
          ],
          tip: 'Start with the sending neuron firing. Reread the second paragraph of the reading, which follows the signal step by step.',
          explain: 'Right. The impulse travels down the axon, neurotransmitters are released at the synapse, they bind to receptors on the next cell, and that causes a change in the receiving cell.'
        },
        {
          type: 'written',
          text: 'What are neurotransmitters? (1 to 2 sentences)',
          starters: ['Neurotransmitters are …', 'They are released by …', 'They cross the … and bind to …'],
          min: 40,
          ideas: [
            { done: 'You said neurotransmitters are chemical messengers.', q: 'Did you say what kind of molecule they are?', tip: 'Are neurotransmitters electrical or chemical?', re: /chemical|messenger|molecule|signal/ },
            { done: 'You said where they come from.', q: 'Did you say what releases them?', tip: 'Which kind of cell releases neurotransmitters?', re: /neuron|nerve/ },
            { done: 'You said where they go.', q: 'Did you say where they go or what they bind to?', tip: 'Reread the reading. What gap do they cross, and what do they bind to?', re: /synap|gap|receptors?|next (cell|neuron)|receiving|dendrite|target cell|another (neuron|nerve|cell)/ }
          ]
        },
        {
          type: 'written',
          text: 'What is dopamine? (1 to 2 sentences)',
          starters: ['Dopamine is a …', 'The body …', 'When dopamine is released, …'],
          min: 40,
          ideas: [
            { done: 'You said dopamine is a neurotransmitter.', q: 'Did you say what kind of molecule dopamine is?', tip: 'Dopamine is one of the molecules you just read about.', re: /neurotransmitter|chemical|messenger|molecule|signal/ },
            { done: 'You said what dopamine does.', q: 'Did you say what dopamine does in the body?', tip: 'How do you feel when dopamine is released?', re: /happ(y|iness)|pleasure|reward|mood|motivat|enjoy|feel(s|ing)? good|good feeling|satisf|excite|calm|relax/ }
          ]
        },
        {
          type: 'written',
          text: 'Think of something you do when you are feeling down and record it below. (This would be an example of higher dopamine levels and a cell signaling response in your body!)',
          easy: 'What is one thing you do when you feel sad or down? Write it below. (Doing this raises your dopamine levels. It is an example of a cell signaling response in your body!)',
          starters: ['When I am feeling down, I …', 'This helps me feel better because …'],
          min: 30,
          ideas: [
            { done: 'You named something you do.', q: 'Did you name something you do?', tip: 'Name one activity, like listening to music, going for a walk, or talking to a friend.', re: /listen|music|songs?|walk|\brun|jog|exercis|sports?|\bplay|games?|talk(ing)? (to|with)|friends?|family|\bmom\b|\bdad\b|\bcall|\beat|food|snack|sleep|\bnap|\bread(ing)?\b|books?|draw|paint|\bart\b|journal|\btv\b|movies?|shows?\b|netflix|youtube|pets?\b|\bdogs?\b|\bcats?\b|outside|nature|shower|bath|cook|bake|danc|\bsing|pray|meditat|deep breath|hug|gym|ride|bike|swim|shop|clean|hang out|\brest\b/ },
            { done: 'You wrote at least 2 sentences.', q: 'Did you write at least 2 sentences?', tip: 'Add a sentence about how it makes you feel.', sentences: 2 }
          ]
        }
      ]
    },

    /* ---------------------------------------------------------------- Part 4 */
    {
      title: 'Cell signals interactive',
      intro: 'Watch the Dropping Signals video. Then open the interactive, and answer the questions below for each cell.',
      clips: ['dropping'],
      read: '<p><b>Do this:</b> Open the <a href="https://learn.genetics.utah.edu/content/cells/signals/" target="_blank" rel="noopener noreferrer">Dropping Signals interactive on the Learn Genetics website</a> (it opens in a new tab). For each cell, click the info icon to read about it, then drop each signal onto the cell and watch how it responds. Come back to this tab and choose your answers below.</p>'
        + '<p><b>What the four signals mean:</b></p>'
        + '<ul><li><b>Light:</b> energy that travels freely through space.</li>'
        + '<li><b>Nitric oxide:</b> a gas produced by cells.</li>'
        + '<li><b>Cytokine:</b> a growth factor in the form of a small protein molecule.</li>'
        + '<li><b>Hormone:</b> a small protein molecule that travels through the bloodstream.</li></ul>',
      questions: [
        {
          type: 'selects',
          text: 'Muscle cell: click the info icon on the cell to learn more, then click the cell to begin the interactive. Choose the answers below.',
          easy: 'Muscle cell: 1. Click the info icon on the cell and read about it. 2. Click the cell to start the interactive. 3. Choose your answers below.',
          items: [
            { label: 'Cell description', options: 'DESCS', answer: 'Contains proteins that allow it to contract', hint: 'Click the info icon on the cell in the interactive and read its description.' },
            { label: 'Response to Light', options: 'RESP', answer: 'Does not respond', hint: 'In the interactive, drop light on the muscle cell and watch what happens.' },
            { label: 'Response to Nitric oxide', options: 'RESP', answer: 'Relaxes', hint: 'In the interactive, drop nitric oxide on the muscle cell and watch what happens.' },
            { label: 'Response to Cytokine', options: 'RESP', answer: 'Divides to make two cells', hint: 'In the interactive, drop cytokine on the muscle cell and watch what happens.' },
            { label: 'Response to Hormones', options: 'RESP', answer: 'Takes up nutrients from a nearby blood vessel', hint: 'In the interactive, drop hormones on the muscle cell and watch what happens.' }
          ]
        },
        {
          type: 'selects',
          text: 'Photoreceptor: click the info icon on the cell to learn more, then click the cell to begin the interactive. Choose the answers below.',
          easy: 'Photoreceptor: 1. Click the info icon on the cell and read about it. 2. Click the cell to start the interactive. 3. Choose your answers below.',
          items: [
            { label: 'Cell description', options: 'DESCS', answer: 'Specialized cell type in the retina of the eye', hint: 'Click the info icon on the cell in the interactive and read its description.' },
            { label: 'Response to Light', options: 'RESP', answer: 'Generates a signal that travels to a neighboring cell', hint: 'In the interactive, drop light on the photoreceptor and watch what happens.' },
            { label: 'Response to Nitric oxide', options: 'RESP', answer: 'Goes through “light adaptation”', hint: 'In the interactive, drop nitric oxide on the photoreceptor and watch what happens.' },
            { label: 'Response to Cytokine', options: 'RESP', answer: 'Does not respond', hint: 'In the interactive, drop cytokine on the photoreceptor and watch what happens.' },
            { label: 'Response to Hormones', options: 'RESP', answer: 'Does not respond', hint: 'In the interactive, drop hormones on the photoreceptor and watch what happens.' }
          ]
        },
        {
          type: 'selects',
          text: 'Cancer: click the info icon on the cell to learn more, then click the cell to begin the interactive. Choose the answers below.',
          easy: 'Cancer: 1. Click the info icon on the cell and read about it. 2. Click the cell to start the interactive. 3. Choose your answers below.',
          items: [
            { label: 'Cell description', options: 'DESCS', answer: 'Genetically changed skin cell with altered behavior', hint: 'Click the info icon on the cell in the interactive and read its description.' },
            { label: 'Response to Light', options: 'RESP', answer: 'UV light damages the cell’s DNA, possibly causing growth or mutation', hint: 'In the interactive, drop light on the cancer cell and watch what happens.' },
            { label: 'Response to Nitric oxide', options: 'RESP', answer: 'Programmed cell death', hint: 'In the interactive, drop nitric oxide on the cancer cell and watch what happens.' },
            { label: 'Response to Cytokine', options: 'RESP', answer: 'Grows and divides rapidly', hint: 'In the interactive, drop cytokine on the cancer cell and watch what happens.' },
            { label: 'Response to Hormones', options: 'RESP', answer: 'Becomes unstuck from its neighbors and migrates', hint: 'In the interactive, drop hormones on the cancer cell and watch what happens.' }
          ]
        },
        {
          type: 'selects',
          text: 'Leaf parenchyma: click the info icon on the cell to learn more, then click the cell to begin the interactive. Choose the answers below.',
          easy: 'Leaf parenchyma (a cell in a plant leaf): 1. Click the info icon on the cell and read about it. 2. Click the cell to start the interactive. 3. Choose your answers below.',
          items: [
            { label: 'Cell description', options: 'DESCS', answer: 'Produces sugar in plant leaves', hint: 'Click the info icon on the cell in the interactive and read its description.' },
            { label: 'Response to Light', options: 'RESP', answer: 'Undergoes photosynthesis', hint: 'In the interactive, drop light on the leaf parenchyma cell and watch what happens.' },
            { label: 'Response to Nitric oxide', options: 'RESP', answer: 'Causes the plant cell to grow and divide', hint: 'In the interactive, drop nitric oxide on the leaf parenchyma cell and watch what happens.' },
            { label: 'Response to Cytokine', options: 'RESP', answer: 'Does not respond', hint: 'In the interactive, drop cytokine on the leaf parenchyma cell and watch what happens.' },
            { label: 'Response to Hormones', options: 'RESP', answer: 'Does not respond', hint: 'In the interactive, drop hormones on the leaf parenchyma cell and watch what happens.' }
          ]
        }
      ]
    }
  ]
};

/* The cell questions in Part 4 share two answer lists, built here so they stay in the same order as the original. */
(function(){
  var A = window.ASSIGNMENT, cells = A.parts[3].questions;
  var DESCS = ['Contains proteins that allow it to contract', 'Specialized cell type in the retina of the eye',
    'Genetically changed skin cell with altered behavior', 'Produces sugar in plant leaves',
    'Responsible for structural frameworks in body tissues'].sort(function(a, b){ return a.localeCompare(b); });
  var set = {};
  cells.forEach(function(q){ q.items.forEach(function(it){ if(it.options === 'RESP') set[it.answer] = 1; }); });
  var RESP = Object.keys(set).sort(function(a, b){ return a.localeCompare(b); });
  cells.forEach(function(q){ q.items.forEach(function(it){ it.options = it.options === 'DESCS' ? DESCS : RESP; }); });
})();
