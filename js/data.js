window.SITE_DATA = {
  name: "Melody Bai",
  tagline: "CS @ UMich • Accessibility • Systems",
  about:
    "Write 2–4 sentences about what you do, what you’re interested in, and what you’re looking for.",

  links: [
    { 
      label: "GitHub", 
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
    "HTML5/CSS3", "LaTeX", "Pandas", "Git", "Adobe Illustrator"],

  education: [
    {
      school: "University of Michigan",
      degree: "B.S. in Computer Science Engineering",
      years: "Aug 2023 – Dec 2026",
      details: "Relevant coursework: ____"
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
      name: "ECS Electrochemistry Knowledge Base Web Redesign & Migration",
      tags: ["Web Development", "Accessibility", "Python", "HTML/CSS/JS"],
      links: [{ label: "GitHub", url: "https://patrickyang23.github.io/ESTIR-Web-Design/" }],
      description: "Redesigned an electrochemistry research website using HTML/CSS/JS for improved accessibility, and automated the migration of 1,000+ legacy pages using Python."
    },
    {
      name: "League of Legends Data Analysis",
      tags: ["Database", "Machine Learning", "Python"],
      links: [{ label: "GitHub", url: "https://github.com/Catchafallingstar/..." }],
      description: "Analyzed over 10,000 professional match datasets using Python and Pandas to identify gameplay meta trends and team composition correlations."
    },

    {
      name: "CIFAR-10 Image Classification Models", // deep learning project, NN, image classification
      tags: ["Machine Learning", "Python"],
       links: [],// [{ label: "GitHub", url: "https://github.com/..." }], // Link to a repo if you upload your code!
      description: "Designed and trained Convolutional Neural Networks (CNN) and Fully Connected Networks in Python to classify CIFAR-10 images. Conducted hyperparameter tuning on learning rates and activation functions (ReLU/Sigmoid) to optimize test accuracy."
    },
    {
      name: "Reinforcement Learning Agents",
      tags: ["Machine Learning", "Python", "AI & Systems"],
      links: [], // [{ label: "GitHub", url: "https://github.com/..." }],
      description: "Developed Reinforcement Learning agents using Q-Learning and Active Adaptive Dynamic Programming (ADP) to navigate and maximize rewards in highly stochastic environments."
    },
    {
      name: "Software Coverage Analysis",
      tags: ["Automated Testing", "Python", "C++", "Java", "Linux"], 
      links: [], // Leave empty if you cannot post class code to GitHub!
      description: "Designed high-coverage test suites for massive legacy codebases (385,000+ lines of code) including libpng and JFreeChart. Utilized white-box and black-box methodologies, and tools like gcov and cobertura, to maximize statement and branch coverage across C, Java, and Python environments."
    },
    {
      name: "Mutation Testing & Automated Fuzzing Suite",
      tags: ["Automated Testing", "Python", "C++", "Java"],
      links: [], 
      description: "Developed a custom Python testing framework utilizing Abstract Syntax Trees (AST) to perform mutation testing and evaluate test suite adequacy. Additionally, orchestrated industry-standard fuzzing tools like American Fuzzy Lop (AFL) and Randoop to automatically discover edge-case vulnerabilities in C++ and Java codebases."
    },
    {
      name: "Algorithmic Debugging & Fault Localization",
      tags: ["Automated Testing", "Python", "AI & Systems"],
      links: [],
      description: "Engineered automated debugging algorithms in Python to accelerate software maintenance. Implemented Delta Debugging to programmatically minimize complex failing inputs, and built a Coverage-Based Fault Localization tool to mathematically isolate defective code lines using test execution traces."
    },
  ], 

  publications: [
  ]
};
