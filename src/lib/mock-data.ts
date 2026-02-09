import { KnowledgeArticle, Roadmap } from '@/types/knowledge-hub';

export const mockArticles: KnowledgeArticle[] = [
  {
    _id: '1',
    title: 'Getting Started with React 19',
    slug: 'getting-started-with-react-19',
    excerpt: 'Learn the new features and improvements in React 19, including automatic batching and improved server components.',
    content: `
# Getting Started with React 19

React 19 introduces several exciting new features that make building web applications even more powerful and efficient.

## Key Features

- **Automatic Batching**: React now automatically batches updates from async functions, timeouts, and native event handlers.
- **Server Components**: Build faster applications with components that render on the server.
- **Improved Suspense**: Better handling of loading states and data fetching.

## Getting Started

\`\`\`bash
npx create-react-app my-app --template typescript
\`\`\`

Start building amazing applications today!
    `,
    coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
    category: 'Tutorial',
    tags: ['React', 'JavaScript', 'Frontend'],
    author: {
      _id: 'author1',
      name: 'Ahmed Hassan',
      avatar: 'https://ui-avatars.com/api/?name=Ahmed+Hassan&background=00629B&color=fff',
      role: 'Technical Committee Member',
    },
    publishedAt: '2026-02-01T10:00:00.000Z',
    readTime: 5,
    views: 1234,
    likes: 89,
    commentsCount: 12,
    isPublished: true,
  },
  {
    _id: '2',
    title: 'Understanding Machine Learning Basics',
    slug: 'understanding-machine-learning-basics',
    excerpt: 'A comprehensive introduction to machine learning concepts, algorithms, and practical applications in modern technology.',
    content: `
# Understanding Machine Learning Basics

Machine Learning is transforming the way we build intelligent applications. This guide covers the fundamentals.

## What is Machine Learning?

Machine Learning is a subset of artificial intelligence that enables systems to learn and improve from experience without being explicitly programmed.

## Types of Machine Learning

1. **Supervised Learning**: Learning with labeled data
2. **Unsupervised Learning**: Finding patterns in unlabeled data
3. **Reinforcement Learning**: Learning through trial and error

## Getting Started

Start your ML journey with Python and popular libraries like scikit-learn and TensorFlow.
    `,
    coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
    category: 'Tech News',
    tags: ['Machine Learning', 'AI', 'Python'],
    author: {
      _id: 'author2',
      name: 'Sara Mohamed',
      avatar: 'https://ui-avatars.com/api/?name=Sara+Mohamed&background=00AEEF&color=fff',
      role: 'AI Committee Lead',
    },
    publishedAt: '2026-01-28T10:00:00.000Z',
    readTime: 8,
    views: 2156,
    likes: 145,
    commentsCount: 23,
    isPublished: true,
  },
];

export const mockRoadmaps: Roadmap[] = [
  {
    _id: '1',
    title: 'Full-Stack Web Development',
    slug: 'full-stack-web-development',
    description: 'Complete roadmap to become a full-stack web developer, from basics to advanced topics.',
    coverImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
    category: 'Web Development',
    tags: ['Web Development', 'Full-Stack', 'JavaScript'],
    duration: '6-12 months',
    difficulty: 'Intermediate',
    author: {
      _id: 'author1',
      name: 'Ahmed Hassan',
      avatar: 'https://ui-avatars.com/api/?name=Ahmed+Hassan&background=00629B&color=fff',
      role: 'Technical Committee Member',
    },
    levels: [
      {
        levelNumber: 1,
        title: 'Frontend Fundamentals',
        description: 'Master the basics of HTML, CSS, and JavaScript',
        topics: [
          {
            title: 'HTML & CSS',
            description: 'Learn semantic HTML and modern CSS techniques',
            estimatedTime: '2 weeks',
            resources: [
              {
                title: 'MDN Web Docs',
                url: 'https://developer.mozilla.org',
                type: 'Documentation',
              },
            ],
          },
          {
            title: 'JavaScript Basics',
            description: 'Understanding variables, functions, and DOM manipulation',
            estimatedTime: '3 weeks',
            resources: [
              {
                title: 'JavaScript.info',
                url: 'https://javascript.info',
                type: 'Tutorial',
              },
            ],
          },
        ],
      },
      {
        levelNumber: 2,
        title: 'Frontend Frameworks',
        description: 'Learn React or Vue.js for building modern web applications',
        topics: [
          {
            title: 'React Fundamentals',
            description: 'Components, props, state, and hooks',
            estimatedTime: '4 weeks',
            resources: [
              {
                title: 'React Documentation',
                url: 'https://react.dev',
                type: 'Documentation',
              },
            ],
          },
        ],
      },
      {
        levelNumber: 3,
        title: 'Backend Development',
        description: 'Build APIs and handle server-side logic',
        topics: [
          {
            title: 'Node.js & Express',
            description: 'Create RESTful APIs with Node.js',
            estimatedTime: '4 weeks',
            resources: [
              {
                title: 'Node.js Docs',
                url: 'https://nodejs.org/docs',
                type: 'Documentation',
              },
            ],
          },
        ],
      },
    ],
    publishedAt: '2026-02-05T10:00:00.000Z',
    views: 3421,
    enrolledCount: 234,
    isPublished: true,
  },
  {
    _id: '2',
    title: 'Data Science Career Path',
    slug: 'data-science-career-path',
    description: 'Your complete guide to becoming a data scientist, covering statistics, programming, and machine learning.',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    category: 'Data Science',
    tags: ['Data Science', 'Python', 'Machine Learning'],
    duration: '8-14 months',
    difficulty: 'Advanced',
    author: {
      _id: 'author2',
      name: 'Sara Mohamed',
      avatar: 'https://ui-avatars.com/api/?name=Sara+Mohamed&background=00AEEF&color=fff',
      role: 'AI Committee Lead',
    },
    levels: [
      {
        levelNumber: 1,
        title: 'Python & Statistics',
        description: 'Build a strong foundation in Python and statistical analysis',
        topics: [
          {
            title: 'Python Programming',
            description: 'Master Python basics and data structures',
            estimatedTime: '3 weeks',
            resources: [
              {
                title: 'Python.org',
                url: 'https://python.org',
                type: 'Documentation',
              },
            ],
          },
        ],
      },
      {
        levelNumber: 2,
        title: 'Data Analysis',
        description: 'Learn to work with data using pandas and numpy',
        topics: [
          {
            title: 'Pandas & NumPy',
            description: 'Data manipulation and numerical computing',
            estimatedTime: '4 weeks',
            resources: [
              {
                title: 'Pandas Documentation',
                url: 'https://pandas.pydata.org',
                type: 'Documentation',
              },
            ],
          },
        ],
      },
      {
        levelNumber: 3,
        title: 'Machine Learning',
        description: 'Build and deploy ML models',
        topics: [
          {
            title: 'Scikit-learn',
            description: 'Classical machine learning algorithms',
            estimatedTime: '6 weeks',
            resources: [
              {
                title: 'Scikit-learn Docs',
                url: 'https://scikit-learn.org',
                type: 'Documentation',
              },
            ],
          },
        ],
      },
    ],
    publishedAt: '2026-02-03T10:00:00.000Z',
    views: 2890,
    enrolledCount: 187,
    isPublished: true,
  },
];
