/*
  LP3 - Marine Science Research and Report (Marine Science A)
  The end-of-Learning-Period-3 CER research project. The teacher asked for questions about ocean currents, waves,
  tides, and ocean geology; these were written for her to review, in the same style as the Biology list.
  Everything else is shared with the other CER projects in assignments/cer-common/cer-project.js.
*/
window.ASSIGNMENT = CER_PROJECT({
  title: 'LP3 - Marine Science Research and Report',
  course: 'Marine Science A',
  storageKey: 'cer-lp3-marine-science-v1',
  short: 'lp3-marine-cer',
  accent: 'marine',           // blue: the Marine Science class color
  kicker: 'Research and Report · Ocean Currents, Waves, and Tides',
  searchExample: 'how tides work site:.gov',
  sites: 'NOAA’s National Ocean Service, NOAA Ocean Exploration, NASA, the U.S. Geological Survey (USGS), the Woods Hole Oceanographic Institution, the Smithsonian Ocean website, and university (.edu) websites',
  questions: [
    { heading: 'Ocean Currents', icon: '🌀' },
    'How do ocean currents move heat around the planet, and how does that affect the climate on land?',
    'What causes surface currents, and why do they curve instead of moving in straight lines?',
    'Why does upwelling make some parts of the ocean so full of life?',
    { heading: 'Waves', icon: '🌊' },
    'How does wind create ocean waves, and what affects how big they get?',
    'How do tsunamis form, and why are they so different from wind waves?',
    'How do rip currents form, and why are they dangerous to swimmers?',
    { heading: 'Tides', icon: '🌙' },
    'How do the moon and the sun cause tides?',
    'Why are spring tides and neap tides different?',
    'How do the tides affect the living things in the intertidal zone?',
    { heading: 'Ocean Geology', icon: '🌋' },
    'How does plate tectonics create features on the sea floor, such as mid-ocean ridges and trenches?',
    'How do hydrothermal vents form, and how do living things survive around them without sunlight?',
    'How do waves and currents shape coastlines and beaches over time?'
  ]
});
