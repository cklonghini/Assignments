/*
  Welcome to Our Class (every class: students choose theirs in Start here)
  Everything a student sees is written in this file. The shared engine in /engine builds the page,
  progress bars, PDF printout, Listen buttons, and captions from it.
  Full guide: docs/ASSIGNMENT_FORMAT.md

  Videos: the four skill videos the teacher gave, each whole, one per part. Captions were made from the teacher's
  transcripts (source/transcripts.pdf). The in-video questions in Setting Up for Success and Discussion Boards are
  the videos' own "Quick Check" slides, and each one stops the video before its answer shows on screen.
  No written responses (the teacher's choice). Same for every student: support: false.
*/
window.ASSIGNMENT = {
  title: 'Welcome to Our Class',
  course: 'All Classes',
  courses: ['Anatomy and Physiology A', 'Anatomy and Physiology B', 'Biology A', 'Marine Science A'],
  storageKey: 'welcome-to-class-v1',
  short: 'welcome',
  support: false,

  start: {
    heading: 'Welcome!',
    intro: 'I’m so glad you’re here. This assignment helps us get to know each other and shows you the skills you need to do well in our class, and in any online class.',
    after: 'In Part 1 you will record a short video to introduce yourself. Then you will watch four skill videos. Each video stops on its own a few times, and a question pops up. Answer each question to keep watching. Each part opens when you finish the one before it.'
  },

  clips: {
    setup:      { src: 'media/setting-up.mp4', from: 0, to: 838.4, seconds: 839, title: 'Skill Video: Setting Up for Success', of: 'Skill Video: Setting Up for Success', whole: true },
    cer:        { src: 'media/cer.mp4', from: 0, to: 505.6, seconds: 506, title: 'Skill Video: Claim, Evidence, Reasoning (CER)', of: 'Skill Video: Claim, Evidence, Reasoning (CER)', whole: true },
    notes:      { src: 'media/notes.mp4', from: 0, to: 309.8, seconds: 310, title: 'Skill Video: Watch and Take Notes', of: 'Skill Video: Watch and Take Notes', whole: true },
    discussion: { src: 'media/discussion.mp4', from: 0, to: 488.6, seconds: 489, title: 'Skill Video: Navigating Discussion Boards Successfully', of: 'Skill Video: Navigating Discussion Boards Successfully', whole: true }
  },

  parts: [
    {
      title: 'Introduce yourself',
      intro: 'I want to get to know you! Find a quiet spot, sit where your face is easy to see, and record a short video (about 1 to 2 minutes) that answers the questions below.',
      read: '<p><b>How to record:</b></p><ul>'
        + '<li>Press <b>Start recording</b>. If your browser asks to use your camera and microphone, choose <b>Allow</b>.</li>'
        + '<li>Talk to me like we are meeting for the first time. Answer every question on the list.</li>'
        + '<li>Press <b>Stop recording</b> when you finish. You can watch your video, and you can record it again.</li>'
        + '<li>While you talk, the computer types what you say in the transcript box. Read it over and fix any words it heard wrong. Your teacher reads this transcript in your PDF.</li>'
        + '</ul>',
      readLabel: 'How to record your video',
      questions: [
        {
          type: 'record',
          text: 'Record a video to introduce yourself.',
          prompts: [
            'Say your name, so I know how to pronounce it.',
            'Tell me a little bit about yourself.',
            'What sort of things do you like to do outside of school?',
            'What is your experience with science?',
            'How long have you been with Elite? What has your history with Elite been, especially with online learning?'
          ],
          min: 40
        }
      ]
    },

    {
      title: 'Setting up for success',
      intro: 'This video walks you through six skills for doing well in my class, and in any online class. The video stops on its own 5 times and a question pops up. Answer each question to keep watching. You can rewind the video if you need to hear something again.',
      clips: ['setup'],
      read: '<p><b>The six skills:</b></p><ol>'
        + '<li><b>Start at the homepage</b> every time you log in, and work through the modules in order, from the top to the bottom of each week. Watch the <b>Get Started Here</b> video at the top of each week’s module. The calendar only shows graded work, so use the homepage and modules as your guide.</li>'
        + '<li><b>Read every announcement.</b> Check them every time you log in.</li>'
        + '<li><b>Communicate, and always respond.</b> Check your Canvas inbox every time you log in. Reply to messages, even with “Got it, thank you.” Be specific when you ask for help.</li>'
        + '<li><b>Check your grades every week</b> and read the comments. A comment is an invitation to make corrections and resubmit.</li>'
        + '<li><b>Build a routine.</b> Do schoolwork at the same time every day, and put your phone in another room.</li>'
        + '<li><b>Submit and track your work.</b> Read the instructions fully, prepare your file and double-check it, wait for it to finish submitting, and save a copy.</li>'
        + '</ol><p>And <b>ask for help early and often</b>. Asking for support is a skill, not a sign that something is wrong with you.</p>',
      questions: [
        {
          at: 293, type: 'choice',
          text: 'Quick Check 1: It’s Monday morning and you’re starting your school week. What should you do FIRST in our course in Canvas?',
          options: ['Choose a random assignment in the calendar to get started with', 'Watch the Get Started Here video in Modules', 'Work from the Gradebook', 'Message a friend to ask what you missed'], answer: 1,
          tip: 'Think about what gives you the full overview of the week before anything else. Rewind to about 2:30 and listen for what is at the very top of each week’s module.',
          explain: 'Right. Each week starts with a Get Started Here video that gives an overview of all the assignments. It’s the most important thing you can do at the start of every week.'
        },
        {
          at: 371, type: 'choice',
          text: 'How many unread messages should your Canvas inbox show at most?',
          options: ['None ever, because you should delete every message', 'Two to three', 'Ten to fifteen', 'It doesn’t matter, because messages aren’t important'], answer: 1,
          tip: 'Rewind to about 5:50 and listen for what the little number in the bubble should never go above.',
          explain: 'Right. If that number is ever higher than two or three, stop what you’re doing and go check your messages.'
        },
        {
          at: 455, type: 'choice',
          text: 'Quick Check 2: Your teacher sends you a Canvas message to help you with an assignment. What is the best response?',
          options: ['Read it, but don’t reply', 'Reply with a short message like “Got it, thank you!”', 'Wait until the end of the learning period to open your inbox messages', 'Ignore it and don’t even open the message'], answer: 1,
          tip: 'Think about what shows your teacher you received and understood their message. Rewind to about 6:28.',
          explain: 'Right. Always write back, even if it’s just “Got it, thank you.” That tells the sender you’re engaged. It’s a skill that matters in school, at a job, and in life.'
        },
        {
          at: 591, type: 'choice',
          text: 'Quick Check 3: You check your grades and notice a comment from your teacher on last week’s assignment. What’s the best next step?',
          options: ['Ignore it, because the grade is already in', 'Read the comment and make corrections if possible', 'Ask a classmate what their comment said', 'Wait until the end of the semester to check comments'], answer: 1,
          tip: 'Remember: in this class, we work toward mastery, and a grade is not always final. Rewind to about 8:10 and listen for what a comment is an invitation to do.',
          explain: 'Right. Comments are not just criticism. They are an invitation to go back, make corrections, and resubmit.'
        },
        {
          at: 790, type: 'choice',
          text: 'Quick Check 4: You’ve watched the Get Started Here video, but you’re still confused about the whole week. What should you do?',
          options: ['Keep rereading the same module until it makes sense', 'Do nothing and hope it gets clearer later', 'Reach out to your teacher as soon as possible', 'Skip to the assignments and figure it out as you go'], answer: 2,
          tip: 'Confusion after the Get Started Here video is a clear signal. Rewind to about 3:02 and listen for what to do if you watch it and still feel lost.',
          explain: 'Right. Message your teacher, or come to a live session or office hours. The sooner you ask, the sooner you get unstuck.'
        },
        {
          type: 'order',
          text: 'Put the steps for turning in an assignment in order.',
          items: ['Read the instructions fully before you start.', 'Prepare your file and double-check it.', 'Submit, then wait until you see it finish processing.', 'Save a copy of your assignment as a backup.'],
          tip: 'Rewind to about 9:56. The video goes through the steps one at a time, starting before you even begin the work.',
          explain: 'Right. Read first, submit and double-check, confirm it went through, and keep a copy in case something happens.'
        },
        {
          type: 'choice',
          text: 'The due date for an assignment has passed, and you haven’t turned it in yet. What does the video say?',
          options: ['You can’t turn it in anymore', 'It shows as a zero for now, but you can still turn it in and get full credit', 'You can turn it in, but you can only get half credit', 'Nothing changes in your grade until the end of the semester'], answer: 1,
          tip: 'Rewind to about 11:18. Listen for what happens to your score after a due date, and then for what happens if you turn the work in after that.',
          explain: 'Right. After the due date the assignment counts as a zero, which pulls your score down. You can still turn it in for full credit, but finishing by the due date keeps your score from dropping.'
        }
      ]
    },

    {
      title: 'Claim, evidence, reasoning (CER)',
      intro: 'CER is how scientists explain their thinking and prove their ideas, and you will use it all year. The video stops on its own 5 times and a question pops up. Answer each question to keep watching.',
      clips: ['cer'],
      read: '<p><b>The parts of a CER:</b></p><ul>'
        + '<li><b>Essential question:</b> the big question you are trying to answer.</li>'
        + '<li><b>Observations:</b> what you see, hear, smell, feel, or measure. In our class, they also come from background research (articles, videos, and data).</li>'
        + '<li><b>Inferences:</b> smart guesses about what may have happened, based on your observations.</li>'
        + '<li><b>Claim:</b> your answer to the essential question.</li>'
        + '<li><b>Evidence:</b> the facts that prove your claim.</li>'
        + '<li><b>Reasoning:</b> why your evidence proves your claim.</li>'
        + '</ul>',
      questions: [
        {
          at: 45, type: 'choice',
          text: 'What does CER stand for?',
          options: ['Cause, effect, result', 'Claim, evidence, reasoning', 'Claim, experiment, research', 'Conclusion, evidence, review'], answer: 1,
          tip: 'Rewind to the start. The video says what each letter stands for, and that you may also hear it said like a word.',
          explain: 'Right. CER (you may hear it said “sir”) stands for claim, evidence, reasoning. You will use it in English and history, too.'
        },
        {
          at: 201, type: 'selects',
          text: 'Is each observation quantitative or qualitative?',
          options: ['Quantitative', 'Qualitative'],
          hint: 'Rewind to about 2:48. Listen for which kind has a number attached, and which kind describes what something is like.',
          items: [
            { label: 'It is a 10 pound object.', answer: 'Quantitative' },
            { label: 'It is green.', answer: 'Qualitative' },
            { label: 'It is a big object.', answer: 'Qualitative' }
          ]
        },
        {
          at: 326, type: 'choice',
          text: 'What is an inference?',
          options: ['A fact you measure with a tool', 'A smart guess about what may have happened, based on your observations', 'The final answer to the essential question', 'A question you ask before you start'], answer: 1,
          tip: 'Rewind to about 4:20 and listen for what the video calls an inference, and what it has to be based on.',
          explain: 'Right. An inference is a smart guess, a lot like a hypothesis, and it has to be based on something you observed.'
        },
        {
          at: 408, type: 'selects',
          text: 'In the glitter example, which part of the CER is each sentence?',
          options: ['Claim', 'Evidence', 'Reasoning'],
          hint: 'Rewind to about 5:36. The claim answers the question, the evidence is the proof, and the reasoning tells why the proof makes sense.',
          items: [
            { label: 'Sam spilled the glitter on the classroom floor.', answer: 'Claim', hint: 'Which part answers the question “Why is there glitter all over the floor”?' },
            { label: 'Sam has glitter on his hands and shirt, and the empty glitter container was near Sam.', answer: 'Evidence', hint: 'These are facts the class observed. Which part is the proof?' },
            { label: 'If someone spills glitter, it would get on their hands and clothes, so it’s likely Sam spilled it.', answer: 'Reasoning', hint: 'This sentence explains how the proof connects to the answer. Which part does that?' }
          ]
        },
        {
          at: 475, type: 'order',
          text: 'Put the parts of a CER summary paragraph in order.',
          items: ['Start with your claim.', 'Add your best evidence.', 'Explain your reasoning.', 'Wrap it up with why it matters.'],
          tip: 'Rewind to about 7:06 and listen for what the paragraph should start with, what comes next, and how it ends.',
          explain: 'Right. Claim first, then evidence, then reasoning, and finish by wrapping it up.'
        },
        {
          type: 'choice',
          text: 'In science, what does a CER always start with?',
          options: ['A claim', 'An essential question', 'A summary paragraph', 'A list of evidence'], answer: 1,
          tip: 'Rewind to about 1:00 and listen for what we always start with in science, like “Why is there glitter all over the classroom floor?”',
          explain: 'Right. A CER starts with an essential question, a big question that makes you wonder.'
        },
        {
          type: 'choice',
          text: 'In the full CER assignments in our science class, where will most of your observations and evidence come from?',
          options: ['Background research, like articles, videos, and data', 'Guesses you make before you start', 'What your classmates think', 'Only things you see at home'], answer: 0,
          tip: 'Rewind to about 1:43. The glitter example skipped one step that our science class always starts with.',
          explain: 'Right. In our class, you will do background research first, and the observations from that research become your evidence.'
        }
      ]
    },

    {
      title: 'Watch and take notes',
      intro: 'When an assignment says “Watch and take notes,” this video shows you how to do it. The video stops on its own 5 times and a question pops up. Answer each question to keep watching.',
      clips: ['notes'],
      read: '<p><b>Ways to take notes:</b></p><ol>'
        + '<li><b>The annotation tool in Canvas</b> (the easiest). Duplicate the tab, put the video in one tab and the annotation in the other, and split your screen. Add text boxes as you watch, then submit. You can download your notes to keep them in one place.</li>'
        + '<li><b>A notebook.</b> Handwrite your notes, take a picture with your phone, and upload it with the Canvas Student app.</li>'
        + '<li><b>Download the PDF</b> and use another program, or print it, take notes, and upload them.</li>'
        + '</ol><p>If you take digital notes, put the class name, the assignment title, and your name at the top.</p>',
      questions: [
        {
          at: 19, type: 'choice',
          text: 'When an assignment says “Watch and take notes,” what should you expect to do?',
          options: ['Watch a video and write down information that helps you understand a concept', 'Just watch the video, with no writing', 'Copy the whole video word for word', 'Take a quiz before you watch'], answer: 0,
          tip: 'Rewind to the start and listen for what you will be doing while you watch.',
          explain: 'Right. You watch the video and write down pieces of information that help you understand a concept.'
        },
        {
          at: 61, type: 'choice',
          text: 'How does the video set up the annotation tool?',
          options: ['It opens the assignment in two tabs: the video in one, and the annotation in the other', 'It plays the video in full screen and types notes on top', 'It prints the video', 'It opens the notes in the Canvas inbox'], answer: 0,
          tip: 'Rewind to about 0:40 and listen for what the video does to the browser tab.',
          explain: 'Right. Duplicate the tab so you have the same assignment open twice. Watch the video in one and open the annotation in the other.'
        },
        {
          at: 124, type: 'choice',
          text: 'Why does the video say NOT to make the video full screen?',
          options: ['Full screen makes the video blurry', 'Your notes and everything else disappear behind it', 'Full screen turns off the sound', 'Canvas does not allow full screen'], answer: 1,
          tip: 'Rewind to about 1:48 and listen for what happens to the rest of your screen.',
          explain: 'Right. Full screen hides your notes. Use split screen instead, and zoom in if you need the video bigger.'
        },
        {
          at: 212, type: 'choice',
          text: 'After you submit your annotation notes, how can you keep all of your notes in one spot?',
          options: ['Download them and save them in one file on your computer or in your Google Drive', 'Email them to yourself one at a time', 'Leave them in the browser tab', 'Take a screenshot of the video'], answer: 0,
          tip: 'Rewind to about 3:13 and listen for what you can click after you submit.',
          explain: 'Right. Click download and save them in one file, so you can look back at them later.'
        },
        {
          at: 257, type: 'choice',
          text: 'If you take notes in a notebook, what does the video recommend for uploading them?',
          options: ['Hold the notebook up to your webcam', 'Take a picture with your phone and upload it with the Canvas Student app', 'Retype everything into a message', 'Mail the notebook to your teacher'], answer: 1,
          tip: 'Rewind to about 3:32. The video explains why a webcam is not the best choice, and what to use instead.',
          explain: 'Right. A webcam picture comes out blurry. A phone picture uploaded with the Canvas Student app is clear and easy.'
        },
        {
          type: 'multi',
          text: 'If you take digital notes, what does the video say to put at the top? Choose all that apply.',
          options: ['The class name', 'The assignment title', 'Your name', 'Today’s weather', 'Your teacher’s phone number'],
          answers: ['The class name', 'The assignment title', 'Your name'],
          rules: [{ any: ['Today’s weather', 'Your teacher’s phone number'], tip: 'One of your picks isn’t in the video. Rewind to the very end and listen again.' }],
          tip: 'There is more than one right answer. Rewind to the very end of the video and listen for all three.',
          explain: 'Right. The class name, the assignment title, and your name go at the top.'
        }
      ]
    },

    {
      title: 'Discussion boards',
      intro: 'Discussion boards let you learn from your classmates. This video shows you how they work and how to earn full credit. The video stops on its own 5 times and a question pops up. Answer each question to keep watching.',
      clips: ['discussion'],
      read: '<p><b>Every discussion board has three steps:</b></p><ol>'
        + '<li>Complete the activity.</li>'
        + '<li>Post your work (click <b>Reply</b>, add your response, then click <b>Reply</b> again).</li>'
        + '<li>Come back later and reply to two classmates.</li>'
        + '</ol><p>Replies must be thorough and different from each other. Respond to what your classmate actually said: add a point, ask a question, or connect it to your own work. One-liners like “I agree” or “Nice job” do not earn full credit.</p>'
        + '<p>If you add replies after the discussion is graded, go to <b>Assignments</b>, find the assignment, and add a comment: “I have gone back in and replied to two peers.” Do not use the Canvas inbox for this.</p>',
      questions: [
        {
          at: 56, type: 'choice',
          text: 'Quick Check 1: Why are discussion boards a valuable part of this class?',
          options: ['They let you see how classmates think and learn from their work', 'They replace every other assignment in the unit', 'They’re only for sharing memes and off-topic chat', 'They have no effect on your grade'], answer: 0,
          tip: 'Rewind to about 0:22 and listen for what discussion boards let you see and learn.',
          explain: 'Right. You see how your classmates think, learn from their work, and deepen your own understanding by explaining your reasoning.'
        },
        {
          at: 129, type: 'choice',
          text: 'Quick Check 2: You’ve completed the activity and posted your work. What do you do next?',
          options: ['Nothing, because once you post, you’re finished', 'Go back in and reply to at least two classmates', 'Delete your post so no one copies it', 'Email a screenshot to your teacher'], answer: 1,
          tip: 'Rewind to about 1:06 and listen for the third step, the one most people forget.',
          explain: 'Right. Come back after your classmates post and reply to at least two of them.'
        },
        {
          at: 246, type: 'choice',
          text: 'Quick Check 3: Which reply would earn full credit?',
          options: ['“I agree!”', '“Nice work.”', '“Same as mine.”', 'A reply that responds to the classmate’s specific points and adds a new idea or question'], answer: 3,
          tip: 'Rewind to about 2:23 and listen for what the video says about one-liners.',
          explain: 'Right. A full-credit reply engages with what your classmate actually said. One-liners don’t earn full credit.'
        },
        {
          at: 297, type: 'choice',
          text: 'Quick Check 4: What happens if you post your work but never reply to two classmates?',
          options: ['You still receive full credit', 'You will not receive full credit', 'Your post is deleted automatically', 'You earn extra credit for posting early'], answer: 1,
          tip: 'Rewind to about 4:23 and listen for what happens when the replies are missing.',
          explain: 'Right. Two thoughtful replies, each one different, are required for full credit.'
        },
        {
          at: 425, type: 'choice',
          text: 'Quick Check 5: You finished your replies after your teacher already graded the discussion. What should you do?',
          options: ['Nothing, because the grade updates on its own', 'Post your original work again', 'Send your teacher a message that it’s now complete', 'Wait until the next unit to bring it up'], answer: 2,
          tip: 'Rewind to about 5:11. Listen for why your teacher won’t see late replies on their own.',
          explain: 'Right. Canvas doesn’t alert your teacher about late replies, so you need to let them know.'
        },
        {
          type: 'order',
          text: 'Put the three steps of every discussion board in order.',
          items: ['Complete the activity.', 'Post your work.', 'Come back and reply to two classmates.'],
          tip: 'Rewind to about 1:06. The video says every discussion board follows the same three steps.',
          explain: 'Right. Do the activity, post it, then come back after your classmates post and reply to two of them.'
        },
        {
          type: 'choice',
          text: 'You finished your late replies. Where should you tell your teacher?',
          options: ['In a Canvas inbox message', 'In a comment on the assignment, found in Assignments', 'In a new discussion post', 'In an email to the school office'], answer: 1,
          tip: 'Rewind to about 6:05. The video shows exactly where to go, and says which way makes it harder for your teacher.',
          explain: 'Right. Go to Assignments, find the assignment, and add a comment like “I have gone back in and replied to two peers.” That gets your message right to the assignment.'
        }
      ]
    }
  ]
};
