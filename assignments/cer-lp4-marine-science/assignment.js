/*
  LP4 - Marine Science Research and Report (Marine Science B): The Ocean's Role in Weather and Climate
  The end-of-Learning-Period-4 CER research project. The research questions are the teacher's
  ("The Oceans Role in Weather and Climate: Research and Report - CER Essential Questions"). Everything else is shared
  with the other CER projects in assignments/cer-common/cer-project.js.
  Part 1's practice CER (honeybees) and evidence example (water and athletes) are new for LP4.
*/
window.ASSIGNMENT = CER_PROJECT({
  title: 'LP4 - Marine Science Research and Report',
  course: 'Marine Science B',
  storageKey: 'cer-lp4-marine-science-v1',
  short: 'lp4-marine-cer',
  accent: 'marine',           // blue: the Marine Science class color
  kicker: 'Research and Report · The Ocean’s Role in Weather and Climate',
  sample: {
    topic: 'honeybees',
    claim: 'Honeybees help farmers grow more of the food we eat.',
    evidence: 'According to the U.S. Department of Agriculture, bees pollinate many of the fruit, nut, and vegetable crops that people eat.',
    reasoning: 'Pollination lets a plant make fruit and seeds, so without bees, many crops would produce much less food.'
  },
  evidence: {
    claim: 'Drinking enough water helps athletes perform better.',
    best: 'According to a sports medicine study, athletes who lost water through sweat and did not drink ran slower than athletes who stayed hydrated.',
    others: ['I always feel better when I drink water.',
      'My coach says water is the best drink for athletes.',
      'Everyone knows that athletes need to drink water.']
  },
  searchExample: 'El Niño ocean temperature site:.gov',
  sites: 'NOAA Climate.gov, NOAA’s National Ocean Service, NASA’s climate website, the National Snow and Ice Data Center (NSIDC), the Woods Hole Oceanographic Institution, the Smithsonian Ocean website, and university (.edu) websites',
  questions: [
    { heading: 'El Niño and La Niña', icon: '🌡️' },
    'How do El Niño and La Niña change ocean temperatures and global weather patterns?',
    'What impacts do El Niño and La Niña have on ecosystems, weather, or human communities?',
    { heading: 'The Ocean’s Role in Climate', icon: '🌊' },
    'How do ocean currents move heat around the planet and influence climate?',
    'In what ways does the ocean help regulate Earth’s temperature and climate systems?',
    'How do interactions between the ocean and atmosphere influence weather and climate patterns?',
    { heading: 'Climate Change Indicators', icon: '📈' },
    'What types of evidence do scientists use to show that Earth’s climate is changing?',
    'How are ocean temperature, carbon dioxide levels, and ocean chemistry used to track climate change?',
    'What trends in ocean data help scientists understand long-term climate change?',
    { heading: 'Melting Ice and Sea Level Rise', icon: '🧊' },
    'How does melting sea ice and glacial ice affect ocean systems and coastal regions?',
    'What impacts could rising sea levels have on ecosystems and human communities?',
    { heading: 'Climate Models and Predictions', icon: '💻' },
    'How do scientists build climate models to understand and predict future climate conditions?',
    'What types of data are used in climate models to study ocean and climate interactions?',
    'What are the strengths and limitations of climate models when predicting future changes?',
    { heading: 'Human Actions and Solutions', icon: '🤝' },
    'What strategies are scientists and communities using to reduce climate change impacts on the ocean?',
    'How can coastal communities adapt to rising sea levels and changing ocean conditions?',
    'What actions can individuals and societies take that help protect ocean ecosystems?'
  ]
});
