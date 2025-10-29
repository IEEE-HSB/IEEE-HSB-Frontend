import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stars } from '@react-three/drei';
import { Suspense, useState, useRef } from 'react';
import { Buildings } from './Buildings';
import { AnimatedPersona } from './AnimatedPersona';
import { QuizPopup } from './QuizPopup';
import { FeedbackPopup } from './FeedbackPopup';


export interface BuildingData {
  scale?: number;
  id: string;
  name: string;
  color: string;
  position: [number, number, number];
  question: string;
  answers: string[];
  correctAnswer: number;
}

// Helper function to calculate circular positions
const getCircularPosition = (index: number, total: number, radius: number): [number, number, number] => {
  const angle = (index / total) * Math.PI * 2;
  return [Math.cos(angle) * radius, 0, Math.sin(angle) * radius];
};

export const buildingsData: BuildingData[] = [
  // Inner Circle - Core IEEE Societies (5 buildings)
  {
    id: 'cs',
    name: 'CS',
    color: '#F2A900',
    position: getCircularPosition(0, 5, 5),
    question: 'What does CS focus on?',
    answers: [
      'Software & Hardware',
      'Power Systems',
      'Robotics',
      'Communications'
    ],
    correctAnswer: 0
  },
  {
    id: 'ras',
    name: 'RAS',
    color: '#BA0C2F',
    position: getCircularPosition(1, 5, 5),
    question: 'RAS stands for?',
    answers: [
      'Random Access System',
      'Robotics & Automation Society',
      'Radio Access Service',
      'Research Analysis System'
    ],
    correctAnswer: 1
  },
  {
    id: 'pes',
    name: 'PES',
    color: '#64A70B',
    position: getCircularPosition(2, 5, 5),
    question: 'PES deals with?',
    answers: [
      'Software Engineering',
      'Wireless Networks',
      'Power Systems & Energy',
      'Data Science'
    ],
    correctAnswer: 2
  },
  {
    id: 'wie',
    name: 'WIE',
    color: '#981D97',
    position: getCircularPosition(3, 5, 5),
    question: 'WIE mission is to?',
    answers: [
      'Build Computers',
      'Empower Women Engineers',
      'Design Circuits',
      'Test Software'
    ],
    correctAnswer: 1
  },
  {
    id: 'comsoc',
    name: 'ComSoc',
    color: '#FFD100',
    position: getCircularPosition(4, 5, 5),
    question: 'ComSoc focuses on?',
    answers: [
      'Power Distribution',
      'Mechanical Systems',
      'Communication Networks',
      'Civil Engineering'
    ],
    correctAnswer: 2
  },

  // Middle Circle - Technical Committees (7 buildings)
  {
    id: 'web',
    name: 'Web Development',
    color: '#F2A900',
    position: getCircularPosition(0, 7, 10),
    question: 'Web Development primarily uses?',
    answers: [
      'HTML, CSS, JavaScript',
      'Only Python',
      'Assembly Language',
      'MATLAB'
    ],
    correctAnswer: 0
  },
  {
    id: 'mobile',
    name: 'Mobile Development',
    color: '#F2A900',
    position: getCircularPosition(1, 7, 10),
    question: 'Mobile apps are built for?',
    answers: [
      'Desktop only',
      'Smartphones & Tablets',
      'Servers',
      'Routers'
    ],
    correctAnswer: 1
  },
  {
    id: 'cyber',
    name: 'Cyber Security',
    color: '#F2A900',
    position: getCircularPosition(2, 7, 10),
    question: 'Cyber Security protects against?',
    answers: [
      'Physical damage',
      'Digital threats & attacks',
      'Weather',
      'Noise'
    ],
    correctAnswer: 1
  },
  {
    id: 'digital',
    name: 'Digital Electronics',
    color: '#BA0C2F',
    position: getCircularPosition(3, 7, 10),
    question: 'Digital circuits use?',
    answers: [
      'Continuous signals',
      'Binary (0 and 1) signals',
      'Analog waves',
      'Light waves only'
    ],
    correctAnswer: 1
  },
  {
    id: 'analog',
    name: 'Analog Electronics',
    color: '#BA0C2F',
    position: getCircularPosition(4, 7, 10),
    question: 'Analog signals are?',
    answers: [
      'Discrete values',
      'Continuous waveforms',
      'Only digital',
      'Binary coded'
    ],
    correctAnswer: 1
  },
  {
    id: 'ai',
    name: 'AI',
    color: '#BA0C2F',
    position: getCircularPosition(5, 7, 10),
    question: 'AI enables machines to?',
    answers: [
      'Only store data',
      'Learn & make decisions',
      'Just calculate',
      'Print documents'
    ],
    correctAnswer: 1
  },
  {
    id: 'rd',
    name: 'R&D',
    color: '#FFD100',
    position: getCircularPosition(6, 7, 10),
    question: 'R&D stands for?',
    answers: [
      'Read & Delete',
      'Research & Development',
      'Repair & Debug',
      'Render & Design'
    ],
    correctAnswer: 1
  },

  // Outer Circle - Organizational Teams (6 buildings)
  {
    id: 'pr',
    name: 'PR',
    color: '#0085CA',
    position: getCircularPosition(0, 6, 14),
    question: 'PR manages?',
    answers: [
      'Server maintenance',
      'Public image & communications',
      'Financial records',
      'Technical code'
    ],
    correctAnswer: 1
  },
  {
    id: 'fr',
    name: 'FR',
    color: '#0085CA',
    position: getCircularPosition(1, 6, 14),
    question: 'Fundraising team focuses on?',
    answers: [
      'Coding projects',
      'Securing financial support',
      'Building robots',
      'Network design'
    ],
    correctAnswer: 1
  },
  {
    id: 'hr',
    name: 'HR',
    color: '#0085CA',
    position: getCircularPosition(2, 6, 14),
    question: 'HR is responsible for?',
    answers: [
      'Hardware repair',
      'Managing people & recruitment',
      'Software testing',
      'Network security'
    ],
    correctAnswer: 1
  },
  {
    id: 'multimedia',
    name: 'Multi Media',
    color: '#0085CA',
    position: getCircularPosition(3, 6, 14),
    question: 'Multimedia includes?',
    answers: [
      'Only text',
      'Video, audio, graphics & text',
      'Binary code only',
      'Mathematics'
    ],
    correctAnswer: 1
  },
  {
    id: 'marketing',
    name: 'Marketing',
    color: '#0085CA',
    position: getCircularPosition(4, 6, 14),
    question: 'Marketing promotes?',
    answers: [
      'Internal servers',
      'Events & brand awareness',
      'Code compilation',
      'Circuit testing'
    ],
    correctAnswer: 1
  },
  {
    id: 'ld',
    name: 'L&D',
    color: '#FFD100',
    position: getCircularPosition(5, 6, 14),
    question: 'L&D handles?',
    answers: [
      'Programming tasks',
      'Event planning & setup',
      'Database design',
      'Algorithm optimization'
    ],
    correctAnswer: 1
  }
];

export function Game3DScene() {
  const [selectedBuilding, setSelectedBuilding] = useState<BuildingData | null>(null);
  const [currentBuilding, setCurrentBuilding] = useState<BuildingData | null>(null);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleBuildingClick = (building: BuildingData) => {
  setCurrentBuilding(building); // Persona still moves immediately

  // Delay showing the quiz by 2 seconds
  setTimeout(() => {
    setSelectedBuilding(building);
  }, 1000);
};


  const handleAnswer = (isCorrect: boolean) => {
    setSelectedBuilding(null);

    if (isCorrect) {
      setFeedback({
        type: 'success',
        message: "Great! You're one step closer to innovation."
      });
    } else {
      setFeedback({
        type: 'error',
        message: 'Not quite! Try again and keep exploring technology.'
      });
    }

    setTimeout(() => setFeedback(null), 3000);
  };

  return (
    <>
      <Canvas shadows>
        <Suspense fallback={null}>
          {/* Camera */}
          <PerspectiveCamera makeDefault position={[0, 10, 18]} />
          <OrbitControls
            enablePan={false}
            maxPolarAngle={Math.PI / 2.2}
            minPolarAngle={Math.PI / 6}
            maxDistance={30}
            minDistance={12}
          />

          {/* Lighting */}
          <ambientLight intensity={0.4} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <pointLight position={[0, 5, 0]} intensity={0.5} color="#FFD100" />

          {/* Stars Background */}
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

          {/* Ground Grid */}

          {/* Glowing IEEE Floor */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
            <planeGeometry args={[35, 35]} />
            <meshStandardMaterial
              color="#001F3F"
              metalness={0.6}
              roughness={0.4}
              emissive="#0085CA"
              emissiveIntensity={0.1}
            />
          </mesh>

          {/* Circular light in center */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
            <circleGeometry args={[5, 64]} />
            <meshBasicMaterial color="#007DBE" opacity={0.3} transparent />
          </mesh>

          {/* Subtle grid lines */}
          <gridHelper args={[35, 35, '#00B4D8', '#002855']} position={[0, 0, 0]} />


          {/* Buildings */}
          <Buildings onBuildingClick={handleBuildingClick} buildings={buildingsData} />

          {/* Animated Persona */}
          <AnimatedPersona targetBuilding={currentBuilding} />
        </Suspense>
      </Canvas>

      {/* Quiz Popup */}
      {selectedBuilding && (
        <QuizPopup
          building={selectedBuilding}
          onAnswer={handleAnswer}
          onClose={() => setSelectedBuilding(null)}
        />
      )}

      {/* Feedback Popup */}
      {feedback && (
        <FeedbackPopup type={feedback.type} message={feedback.message} />
      )}
    </>
  );
}
