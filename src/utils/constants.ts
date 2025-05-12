import { GenerationConfig, PromptTemplate, AIRole } from '../types';
import { 
  Code2, Film, BookOpen, Mail, Stethoscope, GraduationCap, BrainCircuit 
} from 'lucide-react';

export const defaultGenerationConfig: GenerationConfig = {
  temperature: 0.7,
  topK: 40,
  topP: 0.95,
  maxOutputTokens: 2048
};

export const aiRoles: AIRole[] = [
  {
    id: 'software-developer',
    name: 'Software Developer',
    description: 'Get help with coding, debugging, and software development',
    icon: 'Code2',
    systemPrompt: 'You are an expert software developer with extensive knowledge across multiple programming languages and frameworks. ONLY respond to questions related to software development, programming, debugging, or technical architecture. DO NOT answer any queries outside your domain such as medical, legal, or general advice.'
  },
  {
    id: 'movie-expert',
    name: 'Movie Expert',
    description: 'Get movie recommendations and insights',
    icon: 'Film',
    systemPrompt: 'You are a knowledgeable film critic and movie expert. ONLY provide insights, analysis, and recommendations about movies, TV shows, and film industry topics. DO NOT answer questions unrelated to films or entertainment.'
  },
  {
    id: 'book-advisor',
    name: 'Book Advisor',
    description: 'Get book recommendations and literary insights',
    icon: 'BookOpen',
    systemPrompt: 'You are a literary expert with extensive knowledge of books across all genres. ONLY respond to book-related queries including genres, authors, plots, or literary analysis. DO NOT answer non-literary questions.'
  },
  {
    id: 'writing-assistant',
    name: 'Writing Assistant',
    description: 'Polish and improve your writing',
    icon: 'Mail',
    systemPrompt: 'You are a professional writing assistant. ONLY help users improve writing, polish documents, emails, and communication. DO NOT engage in unrelated topics such as technical, medical, or entertainment content.'
  },
  {
    id: 'doctor',
    name: 'Medical Advisor',
    description: 'Get general medical information and health advice',
    icon: 'Stethoscope',
    systemPrompt: 'You are a medical professional providing general health information. ONLY respond to general health-related questions. DO NOT diagnose or prescribe treatments. ALWAYS recommend users consult a real doctor for medical decisions. Do not respond to queries outside the medical domain.'
  },
  {
    id: 'student-mentor',
    name: 'Student Mentor',
    description: 'Get help with studying and academic subjects',
    icon: 'GraduationCap',
    systemPrompt: 'You are an experienced academic mentor. ONLY provide help related to studying, academic concepts, exam tips, and student guidance. DO NOT assist with non-academic or unrelated queries.'
  },
  {
    id: 'ai-researcher',
    name: 'AI Researcher',
    description: 'Learn about AI and machine learning',
    icon: 'BrainCircuit',
    systemPrompt: 'You are an AI researcher with expertise in machine learning, neural networks, and artificial intelligence. ONLY respond to queries about AI, ML, and related technologies. DO NOT answer questions from unrelated fields like medicine, literature, or entertainment.'
  }
];

export const getPromptTemplates = (roleId: string): PromptTemplate[] => {
  switch (roleId) {
    case 'software-developer':
      return [
        {
          id: 'code-review',
          name: 'Code Review',
          description: 'Get feedback on your code',
          prompt: 'Please review this code and suggest improvements: [paste code here]'
        },
        {
          id: 'debug-help',
          name: 'Debug Help',
          description: 'Get help with debugging issues',
          prompt: 'I\'m getting this error: [error message]. Here\'s my code: [paste code here]'
        },
        {
          id: 'architecture',
          name: 'Architecture Advice',
          description: 'Get advice on software architecture',
          prompt: 'I\'m building [describe project]. What architecture would you recommend?'
        }
      ];
    case 'movie-expert':
      return [
        {
          id: 'movie-recommendation',
          name: 'Movie Recommendations',
          description: 'Get personalized movie suggestions',
          prompt: 'Suggest movies based on my interests: [describe preferences]'
        },
        {
          id: 'movie-analysis',
          name: 'Movie Analysis',
          description: 'Get detailed movie analysis',
          prompt: 'Analyze the themes and symbolism in [movie name]'
        }
      ];
    case 'book-advisor':
      return [
        {
          id: 'book-recommendation',
          name: 'Book Recommendations',
          description: 'Get suggestions for books to read',
          prompt: 'Recommend books similar to [favorite book or genre]'
        },
        {
          id: 'literary-analysis',
          name: 'Literary Analysis',
          description: 'Analyze plot, characters, or themes in a book',
          prompt: 'Provide a literary analysis of [book name]'
        }
      ];
    case 'writing-assistant':
      return [
        {
          id: 'email-polishing',
          name: 'Polish My Email',
          description: 'Improve the clarity and tone of an email',
          prompt: 'Please improve this email: [insert email]'
        },
        {
          id: 'grammar-check',
          name: 'Grammar Check',
          description: 'Correct grammar and writing style',
          prompt: 'Check the grammar in this text: [insert text]'
        }
      ];
    case 'doctor':
      return [
        {
          id: 'symptom-info',
          name: 'Symptom Information',
          description: 'Get general health information about symptoms',
          prompt: 'What could be the general causes of [symptom]?'
        },
        {
          id: 'wellness-advice',
          name: 'Wellness Advice',
          description: 'General health and wellness tips',
          prompt: 'How can I maintain good health and prevent common illnesses?'
        }
      ];
    case 'student-mentor':
      return [
        {
          id: 'study-tips',
          name: 'Study Tips',
          description: 'Get tips for better studying',
          prompt: 'What are the best ways to prepare for exams?'
        },
        {
          id: 'concept-help',
          name: 'Concept Help',
          description: 'Get help understanding an academic concept',
          prompt: 'Can you explain this concept: [topic]?'
        }
      ];
    case 'ai-researcher':
      return [
        {
          id: 'ai-concepts',
          name: 'Understand AI Concepts',
          description: 'Learn about core AI/ML topics',
          prompt: 'Explain how [AI concept] works'
        },
        {
          id: 'research-trends',
          name: 'Latest Trends',
          description: 'Stay updated with current research in AI',
          prompt: 'What are the latest trends in AI research?'
        }
      ];
    default:
      return [];
  }
};
