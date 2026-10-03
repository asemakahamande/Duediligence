import json

content = """import { 
  Smartphone, 
  Gamepad2, 
  BrainCircuit, 
  Globe, 
  Terminal, 
  Cpu, 
  Boxes,
  Sparkles,
  Code2,
  Layers3
} from 'lucide-react';

export const gradeGroups = [
  { id: 'all', label: 'All Grades', group: 'all', ages: 'Grade 1-12', desc: 'Comprehensive K-12 Tech Learning Tracks' },
  { id: '1-3', label: 'Grade 1-3', group: 'Grade 1-3', ages: 'Ages 6-8', desc: 'Visual Block Coding, Creative Storytelling & Math Logic' },
  { id: '4-5', label: 'Grade 4-5', group: 'Grade 4-5', ages: 'Ages 9-10', desc: 'Game Design, Mobile Apps & Smart Sensors' },
  { id: '6-8', label: 'Grade 6-8', group: 'Grade 6-8', ages: 'Ages 11-13', desc: 'Web Development, 3D Games & Artificial Intelligence' },
  { id: '9-12', label: 'Grade 9-12', group: 'Grade 9-12', ages: 'Ages 14-18', desc: 'Python, AI, Machine Learning & Software Engineering' },
];

export const youngCodersCourses = [
  {
    id: 'scratch-coding',
    title: 'Creative Coding with Scratch',
    tagline: 'Master Computational Logic, Storytelling & 2D Arcade Games',
    gradeLevel: 'Grade 1 - 3',
    gradeGroup: 'Grade 1-3',
    ageRange: 'Ages 6 - 8',
    pathEmoji: '\U0001F7E2',
    pathLabel: 'Path 1 \u2014 Young Coders',
    icon: Gamepad2,
    color: 'from-amber-500 to-orange-600',
    duration: '8 Weeks',
    level: 'Beginner (Absolute Starter)',
    mode: 'Fun Live Workshops & Game Jams',
    price: '\u20a670,000 ($140)',
    modernNeed: 'Developed by MIT, Scratch is the premier coding platform for students in Grade 1 to 3. It builds foundational algorithmic thinking, problem-solving stamina, and mathematical creativity through colourful visual blocks without typing frustration.',
    whatKidsLearn: [
      'Coding concepts through games and creative stories',
      'Sequences, events, loops and conditions',
      'Variables, animation and problem-solving',
      'Character animation, costume switching and sound editing',
      'Collision physics, scoring systems and multi-level game design',
      'Debugging errors and remixing creative global projects'
    ],
    tools: ['ScratchJr', 'MIT Scratch 3.0', 'Code.org', 'Scratch Vector Paint', 'Audio Studio'],
    projects: [
      'My Animated Story',
      'Dancing Character',
      'Catch the Apple',
      'Maze Game',
      'Interactive Quiz',
      'Simple Adventure Game',
    ],
    endResult: 'The child can create their own simple animations and games.',
    curriculum: [
      {
        module: 'Module 1',
        title: 'Welcome to MIT Scratch & Sprite Animation',
        description: 'Tour of Scratch interface, coordinate system (X & Y), moving characters, sound triggers, and animated stories.'
      },
      {
        module: 'Module 2',
        title: 'Game Loops, Controls & Keyboard Events',
        description: 'Building player-controlled movements, boundaries, jumping mechanics, and background scrolling.'
      },
      {
        module: 'Module 3',
        title: 'Sensing, Variables & Scoring Mechanics',
        description: 'Detecting collisions, timers, scoreboards, health bars, and enemy spawn systems.'
      },
      {
        module: 'Module 4',
        title: 'Cloning & Advanced Multi-Level Games',
        description: 'Using sprite clones for projectile shooting, boss battles, level transitions, and win/loss states.'
      },
      {
        module: 'Capstone Project',
        title: 'Full Custom 2D Arcade Video Game',
        description: 'Design and code a complete playable arcade game (like Maze Runner or Platformer) and share it with friends online.'
      }
    ]
  },
  {
    id: 'game-app-dev',
    title: 'Game & Mobile App Development',
    tagline: 'Build Real Games, Mobile Apps & Code Smart Physical Gadgets',
    gradeLevel: 'Grade 4 - 5',
    gradeGroup: 'Grade 4-5',
    ageRange: 'Ages 9 - 10',
    pathEmoji: '\U0001F535',
    pathLabel: 'Path 2 \u2014 Game & App Creators',
    icon: Smartphone,
    color: 'from-pink-500 to-rose-600',
    duration: '10 Weeks',
    level: 'Beginner Friendly (No Prior Experience)',
    mode: 'Interactive Live Online, App Labs & Hardware Simulations',
    price: '\u20a685,000 ($170)',
    modernNeed: 'Grade 4 to 5 students are ready to go beyond block animations into creating real mobile apps and programming physical gadgets. This track blends mobile UI design using Thunkable with hands-on physical computing using BBC Micro:bit, giving learners two powerful creative superpowers.',
    whatKidsLearn: [
      'Advanced Scratch, programming logic and variables',
      'Conditions, loops, functions and UI design',
      'Visual drag-and-drop mobile app design',
      'Connecting phone sensors (Camera, Location, Accelerometer)',
      'Mobile app concepts and publishing to devices',
      'Programming BBC Micro:bit microcontrollers',
      'Reading temperature, light, motion and compass sensors',
      'Building smart alarms, digital gadgets and robotic controllers'
    ],
    tools: ['Scratch', 'Code.org', 'Thunkable', 'MIT App Inventor', 'Microsoft MakeCode', 'BBC Micro:bit Simulator', 'Tinkercad Circuits'],
    projects: [
      'Platform Game',
      'Math Challenge Game',
      'Quiz Game',
      'Calculator App',
      'Flashcard App',
      'To-Do App',
      'Drawing App',
    ],
    endResult: 'The child can build games and simple mobile applications.',
    curriculum: [
      {
        module: 'Module 1',
        title: 'Introduction to Mobile Apps & UI Design',
        description: 'Understanding app interfaces, screens, buttons, sliders, sound players, and styling visual app layouts.'
      },
      {
        module: 'Module 2',
        title: 'App Logic, Variables & User Events',
        description: 'Triggering actions with click events, storing user names and scores using variables, and conditional IF/ELSE blocks.'
      },
      {
        module: 'Module 3',
        title: 'Hardware Sensors & Multimedia Integration',
        description: 'Accessing phone cameras, sound recorders, text-to-speech converters, and device accelerometer motion detection.'
      },
      {
        module: 'Module 4',
        title: 'Cloud Data & Multiplayer App Features',
        description: 'Saving high scores and chat messages in real-time cloud spreadsheets and databases.'
      },
      {
        module: 'Module 5',
        title: 'Introduction to Micro:bit & LED Matrix Displays',
        description: 'Hardware overview, programming scrolling text, icons, animations, and button inputs on physical devices.'
      },
      {
        module: 'Module 6',
        title: 'Sensors: Light, Temperature & Motion Detection',
        description: 'Reading environmental sensors, building digital thermometers, pedometers, and shake-activated dice.'
      },
      {
        module: 'Module 7',
        title: 'Radio Signals, Motors & Sound Synthesizers',
        description: 'Sending wireless messages between Micro:bit devices, generating musical tunes, and controlling servo motors.'
      },
      {
        module: 'Capstone Project',
        title: 'Mobile App + Smart Gadget Showcase',
        description: 'Build a complete mobile app AND program a physical Micro:bit smart gadget to present as a complete digital project portfolio.'
      }
    ]
  },
  {
    id: 'web-app-dev',
    title: 'Web & App Development',
    tagline: 'Build Stunning Websites, 3D Games & Intelligent AI Applications',
    gradeLevel: 'Grade 6 - 8',
    gradeGroup: 'Grade 6-8',
    ageRange: 'Ages 11 - 13',
    pathEmoji: '\U0001F7E0',
    pathLabel: 'Path 3 \u2014 Web & App Developer',
    icon: Globe,
    color: 'from-violet-500 to-indigo-600',
    duration: '12 Weeks',
    level: 'Beginner to Intermediate',
    mode: 'Live Coding, 3D Studio Labs & AI Workshops',
    price: '\u20a695,000 ($190)',
    modernNeed: 'Students in Grade 6 to 8 are entering the age of real-world software creation. This combined track teaches web fundamentals (HTML, CSS, JavaScript), 3D game scripting in Roblox Studio with Lua, and how AI learns from data. Learners graduate able to build websites, games and smart applications.',
    whatKidsLearn: [
      'HTML, CSS and JavaScript fundamentals',
      'Web design, responsive layouts and programming fundamentals',
      'Mobile app development and introduction to Python',
      'Git/GitHub version control',
      '3D world building, terrain editing and lighting effects in Roblox',
      'Lua scripting for game mechanics, leaderboards and GUIs',
      'How computers recognise images, faces and audio patterns',
      'Training AI models and understanding Generative AI ethics'
    ],
    tools: ['VS Code', 'HTML5 & CSS3', 'JavaScript', 'GitHub', 'Roblox Studio', 'Lua', 'Google Teachable Machine', 'Scratch AI Extensions'],
    projects: [
      'Personal Website',
      'Portfolio Website',
      'School Website',
      'Restaurant Website',
      'Calculator',
      'Quiz Website',
      'To-Do App',
      'Weather App',
      'Student Grade App',
    ],
    endResult: 'The student can create websites, interactive web applications and simple mobile apps.',
    curriculum: [
      {
        module: 'Module 1',
        title: 'HTML Foundations: Building Your First Web Page',
        description: 'Headings, paragraphs, images, links, audio/video embeds, lists, and structuring web documents.'
      },
      {
        module: 'Module 2',
        title: 'CSS Styling, Colours, Fonts & Hover Effects',
        description: 'Styling elements, Google Fonts, background gradients, borders, shadows, and smooth hover animations.'
      },
      {
        module: 'Module 3',
        title: 'Responsive Web Design & Flexbox Layouts',
        description: 'Making websites look great on both mobile phones and desktop computer screens.'
      },
      {
        module: 'Module 4',
        title: 'Interactive JavaScript: Buttons, Popups & Quizzes',
        description: 'Writing JavaScript functions, handling clicks, changing web content on the fly, and creating trivia mini-games.'
      },
      {
        module: 'Module 5',
        title: 'Roblox Studio Foundations & 3D World Building',
        description: 'Navigation, 3D parts, transforms, materials, colours, terrain tools, and visual asset modelling.'
      },
      {
        module: 'Module 6',
        title: 'Lua Scripting: Leaderboards, Checkpoints & GUIs',
        description: 'Writing Lua scripts for Touched events, stage saves, leaderstats, HUD displays, and sound FX integration.'
      },
      {
        module: 'Module 7',
        title: 'AI & Machine Learning: How Computers Learn',
        description: 'Training vision models with Teachable Machine, gesture control games, voice AI, and Generative AI chatbots.'
      },
      {
        module: 'Capstone Project',
        title: 'Live Website + 3D Game + AI Application',
        description: 'Design, build and publish a personal website, a Roblox multiplayer game, and an AI-powered interactive application.'
      }
    ]
  },
  {
    id: 'python-ai',
    title: 'Python & Artificial Intelligence',
    tagline: 'From Python Fundamentals to AI, Machine Learning & Data Science',
    gradeLevel: 'Grade 9 - 12',
    gradeGroup: 'Grade 9-12',
    ageRange: 'Ages 14 - 18',
    pathEmoji: '\U0001F534',
    pathLabel: 'Path 4 \u2014 Python, AI & Machine Learning',
    icon: BrainCircuit,
    color: 'from-emerald-500 to-teal-600',
    duration: '16 Weeks',
    level: 'Beginner to Advanced',
    mode: 'Live Coding Workshops, AI Labs & Project Sprints',
    price: '\u20a6100,000 ($200)',
    modernNeed: "Python is the world's most popular programming language, powering Google, Netflix, NASA and every major AI system. Grade 9 to 12 students master Python from scratch, then progress into Object-Oriented Programming, APIs, databases, data analysis, and cutting-edge Machine Learning and AI application development.",
    whatKidsLearn: [
      'Python syntax, OOP, APIs and databases',
      'Data analysis and visualisation with real datasets',
      'Machine learning model training and evaluation',
      'AI, Generative AI and AI application development',
      'Web development with HTML, CSS and JavaScript',
      'Git/GitHub version control and software engineering practices',
      'Building and deploying full-stack applications',
      'Creating AI chatbots, image classifiers and recommendation systems'
    ],
    tools: ['Python 3', 'VS Code / Replit', 'Jupyter Notebooks', 'Pandas & Matplotlib', 'Scikit-learn', 'OpenAI APIs', 'Git / GitHub', 'Netlify / GitHub Pages'],
    projects: [
      'Calculator',
      'ATM System',
      'Student Management System',
      'Library Management System',
      'Data Analysis Project',
      'House Price Predictor',
      'Spam Detector',
      'Recommendation System',
      'AI Chatbot',
      'AI Image Classifier',
      'AI Study Assistant',
      'Final AI Capstone',
    ],
    endResult: 'The student can build Python applications, analyse data, and develop AI-powered software solutions.',
    curriculum: [
      {
        module: 'Module 1',
        title: 'Python Syntax, Variables & Turtle Graphics',
        description: 'Variables, data types, inputs, outputs, drawing geometric shapes, colour spirals, and automated turtle animations.'
      },
      {
        module: 'Module 2',
        title: 'Control Flow, Logic & Text Adventures',
        description: 'Conditional statements (IF/ELIF/ELSE), random number generators, and interactive choose-your-own-adventure games.'
      },
      {
        module: 'Module 3',
        title: 'Data Structures, Functions & File Handling',
        description: 'Lists, dictionaries, reusable custom functions, modular code structuring, and reading/writing files.'
      },
      {
        module: 'Module 4',
        title: 'Object-Oriented Programming (OOP)',
        description: 'Classes, objects, inheritance, encapsulation, and building real-world management systems with OOP.'
      },
      {
        module: 'Module 5',
        title: 'Databases, APIs & Web Requests',
        description: 'Working with SQLite databases, REST APIs, JSON data, and pulling live data from the web.'
      },
      {
        module: 'Module 6',
        title: 'Data Analysis & Visualisation',
        description: 'Using Pandas and Matplotlib to clean, analyse and visualise real-world datasets with charts and insights.'
      },
      {
        module: 'Module 7',
        title: 'Machine Learning & Predictive Modelling',
        description: 'Training ML models with Scikit-learn, evaluating accuracy, and building house price predictors and spam detectors.'
      },
      {
        module: 'Module 8',
        title: 'Generative AI & AI Application Development',
        description: 'Working with Large Language Models, OpenAI APIs, prompt engineering, and building AI chatbots and assistants.'
      },
      {
        module: 'Capstone Project',
        title: 'Final AI Capstone — End-to-End AI Application',
        description: 'Independently design, build and present a full AI-powered application combining Python, data analysis, and machine learning.'
      }
    ]
  }
];
"""

open('src/data/youngCodersData.js', 'w', encoding='utf-8').write(content)
print("Done. Lines: " + str(len(content.split('\n'))))
