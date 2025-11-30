import { Project } from '@/types/project';

export const projectsData: Project[] = [
  {
    id: 1,
    title: 'An Amazing Firefighting Robot',
    description: 'The IEEE RAS chapter introduces amazing projects using Arduino. This robot utilizes three flame sensors to detect the presence of a fire, after that it goes to make fire down using a BLDC pump hooked to servo motor to squeeze water on fire at degrees from 30 to 150.',
    image: '/assets/projects/fireFighting.jpg',
    subImages: [
      '/assets/projects/fireFighting.jpg',
      '/assets/projects/fireFighting2.jpg',
    ],
    chapterId: 'RAS',
    author: 'RAS',
    // link: 'https://ieeehelwan.org/projects/ai-robotics',
    createdAt: '2025-11-20T14:30:00Z',
  },
  {
    id: 13,
    title: 'Quiz App',
    description: `The Quiz App offers a fun and
interactive way to test your
knowledge. Users select their
preferred difficulty level, and the
timer starts as they answer
questions. Correct answers award
points, while incorrect ones deduct
them. This project emphasizes state
management, scoring systems, and
timers.`,
    image: '/assets/projects/quiz.png',
    subImages: [
      '/assets/projects/quiz.png',
    ],
    chapterId: 'CS',
    author: 'CS',
    createdAt: '2025-11-11T12:00:00Z',
  },
  {
    id: 2,
    title: 'LED Stacking Game',
    description: 'An interactive electronic game where players stack moving LED blocks with precise timing. Each row must align perfectly with the one below it , any misalignment causes the block to shrink, reducing the number of LEDs available. The game continues until the player loses all LEDs. Designed and built from scratch, it combines a custom mechanical enclosure with an Arduino-based control circuit and LED matrix display, showcasing the integration of mechanical design, electronics, and programming in a fun, engaging way.',
    image: '/assets/projects/ledStackingGame.jpg',
    subImages: [
      '/assets/projects/ledStackingGame2.jpg',
      '/assets/projects/ledStackingGame.jpg',
    ],
    chapterId: 'RAS',
    author: 'RAS',
    // link: 'https://ieeehelwan.org/projects/power-grid',
    createdAt: '2025-11-19T09:15:00Z',
  },
  {
    id: 11,
    title: 'X-O Game',
    description: `The X-O Game adds a modern twist to theclassic Tic-Tac-Toe by incorporating a timer forthe entire round, creating a sense of urgencyand excitement as players race to complete thegame within the time limit. This project isperfect for practicing round-based mechanics,implementing timers, and enhancing UIinteractivity to deliver a dynamic userexperience.`,
    image: '/assets/projects/xo.png',
    subImages: [
      '/assets/projects/xo.png',
    ],
    chapterId: 'CS',
    author: 'CS',
    link: 'https://ahmed-hossam-moka.github.io/GameZone/',
    createdAt: '2025-11-11T12:00:00Z',
  },
  {
    id: 3,
    title: 'Color guess 404 -',
    description: "This game shows a pattern of colored lights, and the player must repeat the pattern by pressing the matching buttons. When the game starts, the player presses any button, and the LCD shows “Color Guess 404!” to begin. The game starts at level one. It flashes one random color. The player must press the button for that color. If correct, the game moves to the next level and adds one more color to the sequence, making it longer each time.",
    image: '/assets/projects/colorGuess.jpg',
    subImages: [
      '/assets/projects/colorGuess.jpg',
    ],
    chapterId: 'RAS',
    author: 'RAS',
    // link: 'https://ieeehelwan.org/projects/blockchain-health',
    createdAt: '2025-11-18T16:45:00Z',
  },
  {
    id: 4,
    title: 'Smart Score Basket',
    description: 'Smart Score Basket is a mini basketball arcade system that automatically tracks score and game time using sensors and a microcontroller. Each time the ball passes through the hoop, the timer starts and the player&apos;s score increases.When time runs out, a buzzer alerts the player and the LCD displays the final score. The system also checks for a new high score, adding a competitive and fun experience. This project combines sensors, hardware, and programming to create a compact and interactive basketball game.',
    image: '/assets/projects/scoreBasket.jpg',
    subImages: [
      '/assets/projects/scoreBasket.jpg',
    ],
    chapterId: 'RAS',
    author: 'RAS',
    createdAt: '2025-11-17T11:20:00Z',
  },
  {
    id: 5,
    title: ' Questions game',
    description: 'The Questions game is a two-player game. Rules are simple; questions are displayed on an LCD and the player who knows the answer first pushes the red button then he or she must push the button associated with the correct answer in less than two seconds. The player with more correct answers wins the game. The game was implemented by RAS members using Arduino microcontroller that controls both the LCD and the buttons.',
    image: '/assets/projects/questionGame.jpg',
    subImages: [
      '/assets/projects/questionGame.jpg',
    ],
    chapterId: 'RAS',
    author: 'RAS',
    // link: 'https://ieeehelwan.org/projects/iot-industrial',
    createdAt: '2025-11-16T13:30:00Z',
  },
  {
    id: 8,
    title: '4DOF Arduino Pick and Place Robotic Arm',
    description: '4DOF Arduino Pick and Place Robotic Arm This is a versatile 4 Degrees of Freedom (4DOF) robotic arm designed specifically for educational and prototype pick-and-place tasks. It is fully controlled by an Arduino microcontroller, making it an accessible platform for exploring robotics and basic kinematics. The four axes of movement (Base, Shoulder, Elbow, and Gripper) allow it to precisely manipulate small objects within its working envelope.The arm&apos;s motion is driven by a combination of servo motors, strategically chosen for different roles: robust MG995 servos handle the high-torque movements of the Base and Shoulder joints; SG5010 servos manage the Elbow joint; and a smaller SG90 provides swift, light control for the Gripper end-effector. This component setup ensures a balance of power, weight, and precision, making it an ideal model for implementing simple automation routines.',
    image: '/assets/projects/roboticArm.jpg',
    subImages: [
      '/assets/projects/roboticArm.jpg',
    ],
    chapterId: 'RAS',
    author: 'RAS',
    // link: 'https://ieeehelwan.org/projects/cyber-training',
    createdAt: '2025-11-13T15:45:00Z',
  },
  {
    id: 10,
    title: 'Chat App',
    description: `the Chat App is a simplified WhatsApp clone
featuring a single chat room where users
can sign in and send messages in real time.
Built with Supabase, it highlights backend
integration, real time data handling, and
authentication processes. The app is still
under development.`,
    image: '/assets/projects/chat.png',
    subImages: [
      '/assets/projects/chat.png',
    ],
    chapterId: 'CS',
    author: 'CS',
    createdAt: '2025-11-11T12:00:00Z',
  },
  {
    id: 12,
    title: 'Guess App',
    description: `The Guess App is inspired by word games like
Wordle, where players have five trials to
guess an English word. Feedback is provided
with color-coded hints: green for correct
letters in the right position, orange for correct
letters in the wrong position, and gray for
incorrect letters. Hints can be earned by
answering correctly but deduct points when
used, making it a great project for mastering
logic and string manipulation.`,
    image: '/assets/projects/guess.png',
    subImages: [
      '/assets/projects/guess.png',
    ],
    chapterId: 'CS',
    author: 'CS',
    createdAt: '2025-11-11T12:00:00Z',
  },

  {
    id: 14,
    title: '2024 Game',
    description: `It is a sliding puzzle game where players combine tiles of the same
number to reach the target number, 2048. Promotes logical thinking
and strategic planning`,
    image: '/assets/projects/2028.png',
    subImages: [
      '/assets/projects/2028.png',
    ],
    chapterId: 'CS',
    author: 'CS',
    link: 'https://ahmed-hossam-moka.github.io/GameZone/',
    createdAt: '2025-11-11T12:00:00Z',
  },
  {
    id: 15,
    title: 'Quiz Game',
    description: `Idea: An interactive quiz/trivia game.Goal: To test knowledge or entertain in an educational way — could cover topicslike science, history, culture, etc.Highlight: Simple yet engaging; great for learning or friendly competition.`,
    // image: '/assets/projects/.jpg',
    // subImages: [
    //   '/assets/projects/.jpg',
    // ],
    chapterId: 'CS',
    author: 'CS',
    link: 'https://aiaabdelrahman10.github.io/Triple-Mix-Quiz/',
    createdAt: '2025-11-11T12:00:00Z',
  },
  {
    id: 16,
    title: 'Story Telling',
    description: `Idea: A platform or project focused on storytelling — fictional, real-life, or
educational stories.Goal: To develop narrative skills, spark imagination, or deliveremotional/educational messages.Highlight: Can be text-based, audio, or video — emphasizes emotionalconnection and user experience.`,
    // image: '/assets/projects/.jpg',
    // subImages: [
    //   '/assets/projects/.jpg',
    // ],
    chapterId: 'CS',
    author: 'CS',
    createdAt: '2025-11-11T12:00:00Z',
  },
  {
    id: 17,
    title: 'Portfolio',
    description: `A personalized portfolio highlighting skills, projects, and accomplishments,with a clean and modern design.`,
    // image: '/assets/projects/.jpg',
    // subImages: [
    //   '/assets/projects/.jpg',
    // ],
    chapterId: 'CS',
    author: 'CS',
    createdAt: '2025-11-11T12:00:00Z',
  },
  {
    id: 19,
    title: 'Made By WIE Girls',
    description: `🌙✨ Something magical is on the horizon… ✨🌙
Under the glow of the moon and the charm of purple nights,
a surprise is about to unfold. 💫
Stay tuned..💜`,
    image: '/assets/projects/horizon.png',
    subImages: [
      '/assets/projects/horizon.png',
    ],
    chapterId: 'WIE',
    author: 'WIE',
    createdAt: '2025-11-11T12:00:00Z',
  },
  {
    id: 20,
    title: 'Made By WIE Girls',
    description: `🌑We went to the moon to find out what's coming soon and we found a recording telling us this
“A voice from the night. Stories that echo your thoughts. Moments that light up your mind “💫💜✨️`,
    image: '/assets/projects/moon.jpg',
    subImages: [
      '/assets/projects/moon.jpg',
    ],
    chapterId: 'WIE',
    author: 'WIE',
    createdAt: '2025-11-11T12:00:00Z',
  },
  {
    id: 21,
    title: 'Stress, Made By WIE Girls',
    description: `Hit play. Let the stress melt a little.🙂‍↕🤍
Stay tuned🤩 for the episode 2 "Stress less" 
From your beloved WIE Podcast💜
`,
    image: '/assets/projects/stress.png',
    subImages: [
      '/assets/projects/stress.png',
    ],
    chapterId: 'WIE',
    author: 'WIE',
    createdAt: '2025-11-11T12:00:00Z',
  },
  {
    id: 22,
    title: `WIE Banner`,
    description: ``,
    image: '/assets/projects/wiebanner.jpg',
    subImages: [
      '/assets/projects/wiebanner.jpg',
    ],
    chapterId: 'WIE',
    author: 'WIE',
    createdAt: '2025-11-11T12:00:00Z',
  },
  {
    id: 25,
    title: `WIE T-Shirt`,
    description: ``,
    image: '/assets/projects/wieshirt.jpg',
    subImages: [
      '/assets/projects/wieshirt.jpg',
    ],
    chapterId: 'WIE',
    author: 'WIE',
    createdAt: '2025-11-11T12:00:00Z',
  },
];
