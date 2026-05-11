window.SITE_DATA = {
  name: "Melody Bai",
  tagline: "CS @ UMich • Accessibility • Systems",
  about: "I'm a CS student at the University of Michigan passionate about software reliability, backend systems, and digital accessibility.\n\nWhat I'm building: Softwares, Websites, and test automation frameworks.\n\nWhat I care about: Designing accessible web interfaces and assistive tech guides.\n\nLet's connect: Always down to chat about tech—feel free to reach out!",
  links: [
    {
      label: "GitHub Profile",
      url: "https://github.com/catchafallingstar",
      icon: "fab fa-github" // 
    },
    {
      label: "LinkedIn",
      url: "https://linkedin.com/in/melody-bai-1101051212121212121212",
      icon: "fab fa-linkedin" // 
    },
    {
      label: "Email",
      url: "mailto:bxybai@umich.edu",
      icon: "fas fa-envelope" // 
    },
    {
      label: "Resume",
      url: "assets/Melody_Bai_Resume.pdf",
      icon: "fas fa-file-alt"
    }
  ],

  contact: [
    { label: "Email", value: "bxybai@umich.edu", url: "mailto:bxybai@umich.edu" },
    { label: "LinkedIn", value: "Melody Bai", url: "https://www.linkedin.com/in/melody-bai-1101051212121212121212" },
    { label: "Location", value: "Ann Arbor, MI" },
    { label: "GitHub profile", value: "catchafallingstar", url: "https://github.com/catchafallingstar" },
  ],

  skills: ["Python", "C++", "C", "Java", "SQL", "JavaScript",
    "HTML5/CSS3", "LaTeX", "Git", "Adobe Illustrator"],

  education: [
    {
      school: "University of Michigan - Ann Arbor",
      degree: "B.S.E. in Computer Science Engineering",
      years: "Aug 2023 – May 2027",
      details: "Relevant coursework: Data Structures & Algorithms, Computer Systems, Introduction to Artificial Intelligence, Database Systems, Software Testing & Automation"
    }
  ],

  experience: [
    {
      role: "Accessibility Ambassador",
      org: "Shapiro Undergraduate Library",
      years: "Jan 2025 - Present",
      bullets: [
        "Spearheaded step-by-step 10+ tutorials for Adobe Acrobat to convert documents into accessible PDFs, ensuring compatibility with screen readers.",
        "Developed instructional guides for assistive technologies including NVDA, Read & Write, and ZoomText to support students with diverse accessibility needs.",
        "Conducted interviews with students and staff to improve accessibility at Shapiro Library."
      ]
    }, {
      role: "Website Developer",
      org: "Dr. Madolado's Research Group",
      years: "Sept 2024 - May 2025",
      bullets: [
        "Redesigned and developed a research website using HTML/CSS/JS to enhance accessibility and user experience for a global scientific audience.",
        "Automated the migration of 1,000+ legacy pages using Python scripts, ensuring data integrity and seamless transition to the new platform."
      ]
    },
    {
      role: "Research Assistant",
      org: "Dr. Tang's Research Group",
      years: "Jan 2024 - Aug 2024",
      bullets: [
        "Created 8 scientific illustrations of skin layers and self-healing mechanisms using Adobe Illustrator.",
        "Aided graduate students to design scientific graphs that documented findings for the lab."
      ]
    }
  ],

  projects: [
    {
      image: "assets/ESTIR.png", // Optional: add an image for the project card (make sure to put the image in the assets folder!)
      name: "ECS Electrochemistry Knowledge Base Web Redesign & Migration",
      tags: ["Web Development", "Accessibility", "Python", "HTML/CSS/JS"],
      links: [{ label: "GitHub", url: "https://patrickyang23.github.io/ESTIR-Web-Design/" }],
      description: "Redesigned an electrochemistry research website using HTML/CSS/JS for improved accessibility, and automated the migration of 1,000+ legacy pages using Python."
    },
    {
      image: "assets/lolda.png",
      name: "League of Legends Data Analysis",
      tags: [ "Python"],
      links: [],//{ label: "GitHub", url: "https://github.com/Catchafallingstar/..." }
      description: "Analyzed over 10,000 professional match datasets using Python and Pandas to identify gameplay meta trends and team composition correlations."
    },
    {
      image: "assets/eecs281p3.png",
      name: "Relational Database Engine",
      tags: [ "C++" ],
      links: [], // Add a GitHub link here later if you make the repo public!
      description: "Engineered a C++ in-memory database to parse and execute custom SQL queries. Reduced data retrieval time complexity using dynamic Hash and BST indexing, and developed comprehensive edge-case test suites to validate performance and ensure zero memory leaks."
    },
    {
      image: "assets/eec280Euchure.png",
      name: "Euchre Game Simulation",
      tags: ["C++", ],
      links: [],
      description: "Developed a card game simulation utilizing Abstract Data Types (ADTs) and overloaded operators to evaluate complex, context-dependent card hierarchies. Validated core game state logic via targeted unit tests using a custom C++ testing framework."
    },
    {
      image: "assets/img_classification.png",
      name: "CIFAR-10 Image Classification Models", // deep learning project, NN, image classification
      tags: ["Machine Learning", "Python"],
      links: [],// [{ label: "GitHub", url: "https://github.com/..." }], // Link to a repo if you upload your code!
      description: "Designed and trained Convolutional Neural Networks (CNN) and Fully Connected Networks in Python to classify CIFAR-10 images. Conducted hyperparameter tuning on learning rates and activation functions (ReLU/Sigmoid) to optimize test accuracy."
    },
    {
      image: "assets/rein.png",
      name: "Reinforcement Learning Agents",
      tags: ["Machine Learning", "Python", "AI & Systems"],
      links: [], // [{ label: "GitHub", url: "https://github.com/..." }],
      description: "Developed Reinforcement Learning agents using Q-Learning and Active Adaptive Dynamic Programming (ADP) to navigate and maximize rewards in highly stochastic environments."
    },
    {
      image: "assets/coverage.png",
      name: "Software Coverage Analysis",
      tags: ["Automated Testing", "Python", "C++", "Java", "Linux"],
      links: [], // Leave empty if you cannot post class code to GitHub!
      description: "Designed high-coverage test suites for massive legacy codebases (385,000+ lines of code) including libpng and JFreeChart. Utilized white-box and black-box methodologies, and tools like gcov and cobertura, to maximize statement and branch coverage across C, Java, and Python environments."
    },
    {
      image: "assets/mutation.png",
      name: "Mutation Testing & Automated Fuzzing Suite",
      tags: ["Automated Testing", "Python", "C++", "Java"],
      links: [],
      description: "Developed a custom Python testing framework utilizing Abstract Syntax Trees (AST) to perform mutation testing and evaluate test suite adequacy. Additionally, orchestrated industry-standard fuzzing tools like American Fuzzy Lop (AFL) and Randoop to automatically discover edge-case vulnerabilities in C++ and Java codebases."
    },
    {
      image: "assets/fa.png",
      name: "Algorithmic Debugging & Fault Localization",
      tags: ["Automated Testing", "Python", "AI & Systems"],
      links: [],
      description: "Engineered automated debugging algorithms in Python to accelerate software maintenance. Implemented Delta Debugging to programmatically minimize complex failing inputs, and built a Coverage-Based Fault Localization tool to mathematically isolate defective code lines using test execution traces."
    },
  ],

  publications: [
  ]
};
