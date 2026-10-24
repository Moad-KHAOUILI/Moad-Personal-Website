// ---------------------------------------------------------------------------
// Site content. This is the ONLY file you need to edit to change the text,
// projects, skills and socials shown on the website.
// ---------------------------------------------------------------------------

export const profile = {
  firstName: "Moad",
  lastName: "Khaouili",
  role: "Fullstack Developer", // e.g. "Full-stack developer", "CS student"
  location: "Leuven, Belgium",
  photo: "/PersonalImage.JPG", // in /public. Shown on the About Me card
};

// ABOUT ME screen, told like a Persona dialogue scene.
//   motto: a few words, slammed onto the card on the left one slab per word. Each string is one line. Keep it short!
//   languages: shown on the card as meters. level is a CEFR level (A1 to C2) or "Native"; note is optional
//   chapters: each one is a page of dialogue. Pick one and it types out in the dialogue box.
export const about = {
  motto: ["Every detail", "deserves its", "place."],
  languages: [
    { name: "English", level: "C1", note: "IELTS" },
    { name: "French", level: "B2" },
    { name: "Arabic", level: "Native" },
  ],
  chapters: [
    {
      title: "Background",
      text: "Hello! I'm a full-stack developer student who loves building things for the web. It all started with one simple website. The moment it came to life on screen, I was hooked on everything the web could do.",
    },
    {
      title: "What I Do",
      text: "Today I build accessible, scalable applications with modern tools: React for interactive frontends that feel alive, and Spring Boot for backend services that hold strong behind them.",
    },
    {
      title: "Interests",
      text: "When I'm not coding, I'm usually studying, losing on Valorant, or watching a Marvel movie.",
    },
    {
      title: "Goals",
      text: "I'm always looking for the next bond to forge: a team to join, a problem worth solving, a project worth building. If that sounds like you, please feel free to contact me.",
    },
  ],
};

// PROJECTS. The list screen shows the quick view (year, short, tags); opening a
// project shows its full file, where the sections
// (overview, features, tech stack, architecture, learned) are tabs.
//   media: shown in the viewer on the left. Put files in /public (e.g. /projects/campusconnect/dashboard.png)
//          and set `src`. An empty `src` shows a "coming soon" placeholder with the caption.
//   links: buttons in the overview (e.g. GitHub repo, live demo). Leave empty to hide.
export type Project = {
  slug: string; // the project's web address: /projects/<slug>. Lowercase, dashes instead of spaces
  name: string;
  year: string;
  short: string; // quick-view summary on the list screen
  tags: string[];
  tagline: string;
  context: string;
  summary: string[];
  links: { label: string; url: string }[];
  media: { type: "image" | "video"; src: string; caption: string }[];
  features: { title: string; text: string }[];
  stack: { group: string; items: { name: string; purpose: string }[] }[];
  architecture: { nodes: { title: string; via?: string; lines: string[] }[]; notes: string[] }; // via: label on the arrow into this node
  learned: string[];
};

export const projects: Project[] = [
  {
    slug: "campusconnect",
    name: "CampusConnect",
    year: "2025–2026",
    short:
      "A full-stack campus community platform where students discover and join clubs, register for events and follow announcements, while teachers create and manage content.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Java", "Spring Boot", "Spring Security", "JWT", "JPA", "PostgreSQL", "REST API", "Swagger"],
    tagline: "Clubs, events and announcements, all in one place.",
    context: "Team project · Full-Stack Development @ UCLL · 2025–2026",
    summary: [
      "Campus life is spread across group chats, posters and emails, so students often miss the clubs and events that interest them. CampusConnect puts it all in one place.",
      "Students browse and join clubs, register for events and read campus announcements. Teachers create and manage that content. A Java Spring Boot REST API powers a Next.js front-end.",
    ],
    links: [],
    media: [
      { type: "video", src: "/projects/campusconnect/demo.mp4", caption: "Demo walkthrough" },
      { type: "image", src: "/projects/campusconnect/Dashboard.png", caption: "Dashboard" },
      { type: "image", src: "/projects/campusconnect/Clubs.png", caption: "Clubs" },
      { type: "image", src: "/projects/campusconnect/Events.png", caption: "Events" },
    ],
    features: [
      { title: "Authentication", text: "Sign up with a UCLL email. BCrypt-hashed passwords, JWT sessions in HttpOnly cookies." },
      { title: "Two roles", text: "Student and Teacher. The interface adapts, and teachers get tools to manage content." },
      { title: "Clubs", text: "Browse and join campus clubs and see your memberships. Teachers create and delete them." },
      { title: "Events", text: "Upcoming events with date and location, and registration. Teachers create and delete them." },
      { title: "Announcements", text: "A campus-wide news feed, with a notification bell for new posts." },
      { title: "Dashboard", text: "A personal overview of your clubs and the events you're registered for." },
      { title: "Error handling", text: "Structured JSON errors with proper HTTP status codes (400, 401, 404, 409, 500)." },
      { title: "API docs", text: "Interactive documentation, auto-generated with Swagger / OpenAPI." },
    ],
    stack: [
      {
        group: "Front-end",
        items: [
          { name: "Next.js 15", purpose: "App Router, server components" },
          { name: "React 19", purpose: "UI library" },
          { name: "TypeScript", purpose: "Static typing" },
          { name: "Tailwind CSS", purpose: "Utility-first styling" },
          { name: "Framer Motion", purpose: "Transitions and animations" },
        ],
      },
      {
        group: "Back-end",
        items: [
          { name: "Java 21", purpose: "Language" },
          { name: "Spring Boot 3.5", purpose: "Application framework" },
          { name: "Spring Web", purpose: "REST API" },
          { name: "JPA / Hibernate", purpose: "ORM and data access" },
          { name: "Spring Security", purpose: "Auth and BCrypt hashing" },
          { name: "JWT (Nimbus)", purpose: "Token-based sessions" },
          { name: "Hibernate Validator", purpose: "Request validation" },
          { name: "springdoc-openapi", purpose: "Swagger UI docs" },
          { name: "Maven", purpose: "Build and dependencies" },
        ],
      },
      {
        group: "Data & testing",
        items: [
          { name: "H2", purpose: "In-memory DB for dev and tests" },
          { name: "PostgreSQL", purpose: "Relational database" },
          { name: "JUnit 5 + WebTestClient", purpose: "Integration tests for every controller" },
        ],
      },
    ],
    architecture: {
      nodes: [
        { title: "Next.js front-end", lines: ["Server components: auth check + fetch", "Client components: forms, modals, state", "Service layer (fetch)"] },
        { title: "Spring Boot API", via: "REST / JSON", lines: ["Controllers → Services → Repositories", "Security: JWT + BCrypt", "Global exception handler"] },
        { title: "H2 / PostgreSQL", via: "JPA", lines: ["Users, Clubs, Events, Announcements", "Membership (user ↔ club)", "Participation (user ↔ event)"] },
      ],
      notes: [
        "Classic layered back-end with DTOs, custom exceptions and a central @RestControllerAdvice for errors.",
        "Many-to-many relationships modeled through join entities instead of plain join tables.",
      ],
    },
    learned: [
      "Designing a RESTful API with Spring Boot and a clean layered structure",
      "Modeling relational data with JPA/Hibernate, including many-to-many join entities",
      "Authentication with Spring Security, BCrypt and JWT in HttpOnly cookies",
      "The Next.js App Router and the split between server and client components",
      "Writing integration tests for API endpoints",
      "Documenting APIs with OpenAPI / Swagger",
      "Collaborating in a team with Git",
    ],
  },
  {
    slug: "glackit-flow-engine",
    name: "GlacKIT Flow Engine",
    year: "2025",
    short:
      "A workflow and approval engine that runs step-by-step flows and pauses for human approval before continuing. Spring Boot REST API with a Vue 3 dashboard.",
    tags: ["Java", "Spring Boot", "WebSocket", "REST API", "Vue 3", "TypeScript", "Vite", "Tailwind CSS", "Pinia", "Docker", "GitHub Actions", "OpenShift"],
    tagline: "Define a flow, trigger it, and let the engine handle the approvals.",
    context: "Team project · 7-person Scrum team (UCLL Team 30)",
    summary: [
      "An admin defines a flow as an ordered list of steps, like \"submit an absence request → notify the approvers → wait for approval\". Users or outside systems then trigger it with data.",
      "The engine runs the flow step by step, pauses when it needs a human decision, and continues once approvers approve or decline. A Vue 3 dashboard lets managers build flows and approvers handle their requests.",
    ],
    links: [],
    media: [
      { type: "image", src: "/projects/glackit/Dashboard.png", caption: "Dashboard" },
      { type: "image", src: "/projects/glackit/Flow-builder.png", caption: "Flow builder" },
      { type: "image", src: "/projects/glackit/Pending-requests.png", caption: "Pending requests" },
    ],
    features: [
      { title: "Flow builder", text: "Managers compose Request, Notification and Approval steps, with a live diagram preview." },
      { title: "Flow engine", text: "Runs flows step by step, pauses at approval gates and resumes once decisions come in." },
      { title: "Approval rules", text: "Per-approver decisions with a minimum-approvals threshold; declines as soon as it's unreachable." },
      { title: "Request types", text: "Absence, clock-in, task change and meeting requests, each validated by its own strategy class." },
      { title: "Live notifications", text: "Pop-ups pushed to approvers in real time over WebSocket (STOMP + SockJS)." },
      { title: "Callbacks", text: "Status updates (pending, completed, failed) POSTed back to whoever triggered the flow." },
      { title: "Dashboard", text: "Live stats and an instances table with status badges, refreshed every 5 seconds." },
      { title: "Safe concurrency", text: "Synchronized engine methods, so simultaneous approvals can't advance a flow twice." },
    ],
    stack: [
      {
        group: "Back-end",
        items: [
          { name: "Java 21", purpose: "Language" },
          { name: "Spring Boot 3.3", purpose: "Application framework" },
          { name: "Spring Web", purpose: "REST API" },
          { name: "Spring WebSocket", purpose: "Live pop-up notifications" },
          { name: "WebClient (WebFlux)", purpose: "HTTP callbacks to triggers" },
          { name: "Bean Validation", purpose: "DTO validation" },
          { name: "springdoc-openapi", purpose: "Swagger UI docs" },
          { name: "JUnit", purpose: "Engine and model tests" },
          { name: "Maven", purpose: "Build and dependencies" },
        ],
      },
      {
        group: "Front-end",
        items: [
          { name: "Vue 3 + TypeScript", purpose: "SPA with <script setup>" },
          { name: "Vite", purpose: "Dev server and bundler" },
          { name: "Tailwind CSS v4", purpose: "Styling, dark/light theme" },
          { name: "Pinia + Vue Router", purpose: "State and pages" },
          { name: "Vue Flow", purpose: "Flow diagrams" },
        ],
      },
      {
        group: "DevOps",
        items: [
          { name: "Docker", purpose: "Multi-stage images, nginx for the SPA" },
          { name: "GitHub Actions", purpose: "Build and push to GHCR" },
          { name: "OpenShift (OKD)", purpose: "Deployed on UCLL's cluster" },
          { name: "Sigrid CI", purpose: "Code quality and security checks" },
        ],
      },
    ],
    architecture: {
      nodes: [
        { title: "Vue 3 dashboard", lines: ["Pinia stores, Vue Router", "Fetch services per resource", "Vue Flow diagrams"] },
        { title: "Spring Boot API", via: "REST + WebSocket", lines: ["Controllers → Services → Repository", "FlowRunnerService engine", "Strategy classes per request type"] },
        { title: "In-memory store", via: "Repository", lines: ["Flow definitions and instances", "Request submissions", "Thread-safe storage"] },
      ],
      notes: [
        "Each run keeps a snapshot of its steps, so editing a flow later never affects flows already running.",
        "New request types plug in through the strategy pattern: an enum value, a strategy class and a factory entry.",
      ],
    },
    learned: [
      "Designing an engine that pauses on human decisions and resumes safely",
      "Applying the strategy pattern to keep request types easy to extend",
      "Handling concurrency so simultaneous approvals stay consistent",
      "Real-time notifications with WebSockets (STOMP over SockJS)",
      "Building a Vue 3 + TypeScript SPA with Pinia and Vue Router",
      "Containerizing with Docker and deploying to OpenShift via GitHub Actions",
      "Working in a 7-person Scrum team",
    ],
  },
  {
    slug: "battlebots",
    name: "BattleBots",
    year: "2026",
    short:
      "Two real RC cars we built fight it out, driven from a website or a phone, with a live AI commentator voicing every hit. Spring Boot, Next.js and an ESP32, all in real time.",
    tags: ["ESP32", "Arduino C++", "Java", "Spring Boot", "WebSocket", "Next.js", "React", "TypeScript", "Tailwind CSS", "PWA", "Groq", "ElevenLabs"],
    tagline: "Real cars, real hits, and an AI that won't stop talking.",
    context: "Team project · 6-person team · UCLL Integration Project",
    summary: [
      "Two RC cars, built by our team down to the electronics, battle each other. Each starts with 50 HP, every hit takes off 10, and the first car to hit 0 loses.",
      "Around the cars sits a full platform: a website to log in, start matches, drive and follow the live field; a phone app that turns your phone into a gamepad; and an AI commentator that reacts to every hit in text and voice.",
    ],
    links: [],
    media: [
      { type: "image", src: "/projects/battlebots/website.png", caption: "Website" },
      { type: "image", src: "/projects/battlebots/leaderboard.png", caption: "Leaderboard" },
      { type: "image", src: "/projects/battlebots/real-cars.jpg", caption: "The cars" },
      { type: "image", src: "/projects/battlebots/mobile-app.png", caption: "BB Controller" },
      { type: "video", src: "/projects/battlebots/commentator.mp4", caption: "Live commentator test" },
    ],
    features: [
      { title: "Real RC cars", text: "Two cars we built ourselves, electronics included. 50 HP each, 10 damage per hit." },
      { title: "Live arena", text: "Field view with hit flashes, health bars, keyboard driving and forfeit." },
      { title: "Phone gamepad", text: "BB Controller: an installable app with a press-and-hold D-pad, in landscape." },
      { title: "AI commentator", text: "Groq writes a short, crude line for every hit, and ElevenLabs voices it." },
      { title: "Real-time hub", text: "One WebSocket hub sends drive commands to the cars and hits to every browser." },
      { title: "Matches", text: "Waiting → active → finished, with winner or draw, match history and head-to-head records." },
      { title: "Leaderboard", text: "Every win adds a point, and players are ranked by score." },
      { title: "CI/CD", text: "Tests on every push, Docker images, and automatic staging and production deploys." },
    ],
    stack: [
      {
        group: "Hardware",
        items: [
          { name: "ESP32", purpose: "WiFi link to the backend" },
          { name: "Arduino Nano", purpose: "On-car control" },
          { name: "Accelerometer", purpose: "Hit detection" },
          { name: "433 MHz radio", purpose: "Commands to the cars" },
          { name: "PlatformIO / C++", purpose: "Firmware" },
        ],
      },
      {
        group: "Back-end",
        items: [
          { name: "Java 21", purpose: "Language" },
          { name: "Spring Boot 3.5", purpose: "Application framework" },
          { name: "Spring WebSocket", purpose: "Real-time hub" },
          { name: "Spring Security", purpose: "BCrypt hashing, CORS" },
          { name: "JPA / PostgreSQL", purpose: "Players and matches" },
          { name: "Groq (Llama 3.3 70B)", purpose: "Commentary text" },
          { name: "ElevenLabs", purpose: "Commentary voice" },
          { name: "Actuator", purpose: "Health monitoring" },
          { name: "JUnit + JaCoCo", purpose: "Tests and coverage" },
          { name: "Maven", purpose: "Build and dependencies" },
        ],
      },
      {
        group: "Front-end",
        items: [
          { name: "Next.js 16", purpose: "App Router, Turbopack" },
          { name: "React 19", purpose: "UI library" },
          { name: "TypeScript", purpose: "Static typing" },
          { name: "Tailwind CSS 4", purpose: "Styling" },
          { name: "PWA (HTML/CSS/JS)", purpose: "BB Controller app" },
        ],
      },
    ],
    architecture: {
      nodes: [
        { title: "Website + BB Controller", lines: ["Next.js arena, lobby, leaderboard", "Phone gamepad (PWA)", "Commentary ticker + audio"] },
        { title: "Spring Boot backend", via: "REST + WebSocket", lines: ["REST API: players, matches, data", "WebSocket hub at /ws", "Game logic: damage, winner, score"] },
        { title: "ESP32 + RC cars", via: "WebSocket", lines: ["Drive commands over 433 MHz", "Accelerometer hit detection", "JSON events back to the hub"] },
      ],
      notes: [
        "Hits reach the screen instantly; the commentary runs asynchronously, with text about 1 s later and Groq + ElevenLabs audio half a second after.",
        "CI runs both test suites on every push; CD builds Docker images to GHCR and deploys main to staging and prod to production on OpenShift.",
      ],
    },
    learned: [
      "Connecting hardware and software: an ESP32 talking to a web backend",
      "Routing real-time messages between browsers, phones and cars over WebSockets",
      "Integrating LLM and text-to-speech APIs without slowing down the game",
      "Writing game logic for damage, winners and scores",
      "Building an installable PWA with touch controls",
      "Setting up CI/CD with staging and production environments",
      "Working in a team across hardware, back-end and front-end",
    ],
  },
  {
    slug: "minecraft-world-generation",
    name: "Minecraft World Generation",
    year: "2026",
    short:
      "A Minecraft-style infinite world in Unity, generated from noise, streamed in and out around the player, with hand-built chunk meshes and custom HLSL shaders.",
    tags: ["Unity 6", "C#", "URP", "HLSL", "Procedural generation", "Perlin noise", "Mesh generation", "Shaders"],
    tagline: "An endless world, built from math, one chunk at a time.",
    context: "Individual project · 3D Graphics @ UCLL · 2026",
    summary: [
      "Every block in this world comes from noise functions, so the terrain goes on forever and the same coordinates always give the same hills, valleys and lakes.",
      "The game only keeps the chunks near the player and in their view, building each mesh vertex by vertex and skipping every hidden face. Blocks, grass, water and portals are drawn by custom HLSL shaders.",
    ],
    links: [],
    media: [
      { type: "video", src: "/projects/minecraftworldgeneration/world-generation.mp4", caption: "Terrain generation" },
      { type: "image", src: "/projects/minecraftworldgeneration/world1.png", caption: "The world" },
      { type: "image", src: "/projects/minecraftworldgeneration/world2.png", caption: "The world" },
    ],
    features: [
      { title: "Noise terrain", text: "4-octave fBm Perlin noise for hills, plus low-frequency valleys and varying dirt depth." },
      { title: "Infinite chunks", text: "32×128×32 chunks placed by world coordinates, so terrain lines up seamlessly across borders." },
      { title: "View-cone streaming", text: "Chunks load inside the camera's view cone and unload behind you, closest first, 2 per frame." },
      { title: "Face culling", text: "Only faces next to empty space are meshed, which removes most of the triangles." },
      { title: "Submeshes", text: "One mesh and one object per chunk, with a submesh and material for each block type." },
      { title: "Lakes", text: "Hashed chunk groups get a smoothstep bowl carved in and an animated water surface." },
      { title: "Portals", text: "Obsidian frames built into the terrain, filled with an animated portal plane." },
      { title: "Player", text: "First- and third-person camera, walking, sprinting and jumping, with an animated Steve." },
    ],
    stack: [
      {
        group: "Engine",
        items: [
          { name: "Unity 6", purpose: "Scene, physics and rendering" },
          { name: "C#", purpose: "Gameplay and generation logic" },
          { name: "URP 17", purpose: "Render pipeline" },
          { name: "Unity.Mathematics", purpose: "int2 chunk coordinates" },
        ],
      },
      {
        group: "Graphics",
        items: [
          { name: "HLSL", purpose: "Block, grass, water and portal shaders" },
          { name: "Triplanar mapping", purpose: "Textures without UVs" },
          { name: "Lambert lighting", purpose: "Diffuse light plus ambient" },
          { name: "HDR skybox", purpose: "Sky and environment" },
        ],
      },
      {
        group: "Gameplay",
        items: [
          { name: "Mathf.PerlinNoise", purpose: "Terrain noise" },
          { name: "MeshCollider", purpose: "Walkable chunk meshes" },
          { name: "CharacterController", purpose: "Movement, gravity, jumping" },
          { name: "Animator", purpose: "Steve animations" },
          { name: "Input System", purpose: "Keyboard, mouse and scroll" },
        ],
      },
    ],
    architecture: {
      nodes: [
        { title: "ChunkManager", lines: ["Wanted set: safe radius + view cone", "Unload unwanted chunks", "Load closest first, 2 per frame"] },
        { title: "Chunk", via: "Generate", lines: ["fBm noise → block array", "Lakes, portals, bedrock", "Mesh with hidden faces culled"] },
        { title: "GPU shaders", via: "Mesh + materials", lines: ["Triplanar block texturing", "Grass top, side and bottom", "Animated water and portal"] },
      ],
      notes: [
        "Generation depends only on world coordinates, so a chunk that's destroyed and rebuilt comes back the same.",
        "Loaded chunks live in a dictionary keyed by coordinate, and the per-frame lists are reused to avoid allocations.",
      ],
    },
    learned: [
      "Generating terrain procedurally with layered (fBm) Perlin noise",
      "Streaming an infinite world in and out based on distance and view direction",
      "Building meshes by hand, with face culling and submeshes",
      "Writing HLSL shaders for URP: triplanar mapping, lighting, scrolling and distortion",
      "Using dot products to test what the camera can see",
      "Keeping frame times smooth by spreading work over several frames",
    ],
  },
];

// OTHER PROJECTS: smaller projects, reached from the "Other projects" row at the
// bottom of the Projects list. Each one is a card with its picture(s) and a short text.
//   images: one or more pictures. Put the files in /public (e.g. /projects/flightdelay/dashboard.png).
//   repo: optional link to the code (a "GitHub" button on the card).
//           With several, small tabs on the picture switch between them (labelled with the caption).
//           An empty `src` shows an "image coming soon" placeholder.
// The row and the screen disappear if this list is empty.
export type OtherProject = {
  name: string;
  year: string;
  short: string; // one or two sentences
  tags: string[];
  images: { src: string; caption: string }[];
  repo?: string; // optional GitHub link, shown as a button on the card
};

export const otherProjects: OtherProject[] = [
  {
    name: "Flight Delay & Overbooking Prediction",
    year: "2025–2026",
    short:
      "Two PyTorch neural networks that predict whether a flight will be delayed or overbooked, trained on real airline and weather data. A BART language model reads NASA incident reports and turns them into a delay-risk feature, and a Flask dashboard serves live predictions on an animated gauge.",
    tags: ["Python", "PyTorch", "scikit-learn", "pandas", "Hugging Face", "Flask", "JavaScript"],
    images: [{ src: "/projects/flightdelay/dashboard.png", caption: "Prediction dashboard" }],
  },
  {
    name: "OHL Attendance Predictor",
    year: "2025–2026",
    short:
      "Built for the real OH Leuven football club: an XGBoost model that predicts how many fans will come to a home match from the opponent, weather, promotions, holidays and media buzz, so the club can plan staff and catering ahead. Served through a Flask web app.",
    tags: ["Python", "XGBoost", "scikit-learn", "pandas", "SciPy", "Flask", "Jupyter"],
    images: [{ src: "/projects/ohl_attendance/dashboard.png", caption: "Attendance predictor" }],
  },
  {
    name: "Sabotage Runners",
    year: "2024–2025",
    repo: "https://github.com/Moad-KHAOUILI/sabotage-runners",
    short:
      "A two-player, same-keyboard pixel-art race: reach the other player's spawn first while knocking your rival back and sabotaging them with power-ups that freeze, slow, mirror their controls or teleport them home. First to 3 wins, across two maps.",
    tags: ["Python", "Pygame", "OOP", "PyInstaller", "Git"],
    images: [
      { src: "/projects/sabotagerunners/gameplay.png", caption: "Gameplay" },
      { src: "/projects/sabotagerunners/mainmenu.png", caption: "Main menu" },
    ],
  },
];

// CONTACT ME screen. Each social is drawn as a card with its logo.
//   icon: which logo to draw ("github", "linkedin" or "email", see SocialIcon.tsx)
export const socials = [
  { name: "GitHub", handle: "@Moad-KHAOUILI", icon: "github", url: "https://github.com/Moad-KHAOUILI" },
  { name: "LinkedIn", handle: "/in/moad-khaouili", icon: "linkedin", url: "https://www.linkedin.com/in/moad-khaouili-763191354/" },
  { name: "Email", handle: "moad.khaouili@student.ucll.be", icon: "email", url: "mailto:moad.khaouili@student.ucll.be" },
] as const;

// TECHNICAL SKILLS screen. Every category is a box. The first four make up the "Web Stack"
// group, the rest "Beyond the Web" (shown as two tabs on smaller windows).
export const skills = [
  {
    name: "Frontend",
    desc: "Building modern, responsive user interfaces",
    items: ["React", "Next.js", "Vue.js", "TypeScript", "JavaScript", "HTML/CSS", "Tailwind CSS", "Pinia", "Vite", "Framer Motion", "PWA"],
  },
  {
    name: "Backend",
    desc: "Developing scalable server-side applications",
    items: [
      "Java", "Spring Boot", "Spring Security", "JPA/Hibernate", "REST APIs", "WebSockets", "JWT", "OpenAPI/Swagger",
      "JUnit", "Maven", "Python", "Node-RED", "Express.js", "PHP", "AI APIs (Groq, ElevenLabs)",
    ],
  },
  {
    name: "Database",
    desc: "Designing and managing data structures",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Cosmos DB", "InfluxDB", "H2"],
  },
  {
    name: "Tools & DevOps",
    desc: "Tooling for development and deployment",
    items: ["Git", "GitHub Actions", "CI/CD", "Docker", "OpenShift", "Linux", "VS Code", "Postman"],
  },
  {
    name: "Game Dev & Graphics",
    desc: "Real-time 3D, shaders and procedural worlds",
    items: ["Unity", "C#", "HLSL Shaders", "URP", "Procedural Generation", "Mesh Generation"],
  },
  {
    name: "Embedded & IoT",
    desc: "Software that talks to hardware",
    items: ["ESP32", "Arduino", "C++", "PlatformIO", "Sensors & Radio"],
  },
  {
    name: "Currently Studying",
    desc: "Technologies I'm actively working with or want to dive into",
    items: ["Microservices", "System Design"],
  },
  {
    name: "Soft Skills",
    desc: "How I work with people and problems",
    items: ["Problem-solving", "Teamwork", "Communication", "Agile/Scrum", "Working independently", "Eager to learn", "Eye for detail"],
  },
];
