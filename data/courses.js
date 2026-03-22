import instructorsData from './instructors.json';
import coursesJSON from './courses.json';
import {
  SiHtml5, SiCss, SiJavascript, SiReact, SiVuedotjs, SiAngular,
  SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, SiPython,
  SiDjango, SiSpring, SiPhp, SiGo,
  SiMongodb, SiPostgresql, SiMysql, SiFirebase, SiRedis,
  SiDocker, SiKubernetes, SiGit, SiGooglecloud,
  SiGraphql, SiPrisma, SiElasticsearch, SiSupabase,
  SiBootstrap, SiTerraform, SiJenkins, SiLinux,
  SiPrometheus, SiNginx, SiExpo, SiFlutter, SiSwift, SiKotlin,
  SiTensorflow, SiPytorch
} from 'react-icons/si';
import { FaShieldAlt, FaLock, FaKey, FaBug, FaUserSecret, FaNetworkWired, FaCloud, FaDollarSign, FaBrain, FaRobot, FaChartLine, FaBalanceScale, FaRocket, FaJava, FaCode, FaAws, FaMicrosoft } from 'react-icons/fa';

// Tech icon mapping
export const techIconMap = {
  html: SiHtml5, css: SiCss, javascript: SiJavascript, react: SiReact, vue: SiVuedotjs, angular: SiAngular,
  nextjs: SiNextdotjs, typescript: SiTypescript, tailwind: SiTailwindcss, node: SiNodedotjs, python: SiPython,
  django: SiDjango, java: FaJava, spring: SiSpring, csharp: FaCode, php: SiPhp, go: SiGo,
  mongodb: SiMongodb, postgresql: SiPostgresql, mysql: SiMysql, firebase: SiFirebase, redis: SiRedis,
  docker: SiDocker, kubernetes: SiKubernetes, git: SiGit, aws: FaAws, azure: FaMicrosoft, gcp: SiGooglecloud,
  graphql: SiGraphql, prisma: SiPrisma, elasticsearch: SiElasticsearch, supabase: SiSupabase,
  bootstrap: SiBootstrap, reactnative: SiReact, flutter: SiFlutter, swift: SiSwift, kotlin: SiKotlin,
  security: FaShieldAlt, auth: FaKey, hacking: FaBug, crypto: FaLock, ssl: FaLock, api: FaNetworkWired,
  zerotrust: FaUserSecret, gdpr: FaBalanceScale, cicd: SiGit, terraform: SiTerraform, jenkins: SiJenkins,
  linux: SiLinux, monitoring: SiPrometheus, nginx: SiNginx, expo: SiExpo, pwa: SiReact,
  uiux: FaChartLine, testing: FaBug, lambda: FaCloud, architecture: FaCloud, networking: FaNetworkWired,
  cost: FaDollarSign, multicloud: FaCloud, migration: FaRocket, ml: FaBrain, tensorflow: SiTensorflow,
  pytorch: SiPytorch, nlp: FaBrain, cv: FaBrain, datascience: FaChartLine, ethics: FaBalanceScale, mlops: FaRocket
};

// Category icons
export const courseCategories = [
  { id: 'frontend', name: 'Front-End Development', Icon: SiReact, description: 'Build beautiful user interfaces' },
  { id: 'backend', name: 'Back-End Development', Icon: SiNodedotjs, description: 'Create powerful server-side applications' },
  { id: 'database', name: 'Database', Icon: SiMongodb, description: 'Master data storage and management' },
  { id: 'security', name: 'Security', Icon: FaShieldAlt, description: 'Protect applications and data' },
  { id: 'devops', name: 'DevOps', Icon: SiDocker, description: 'Streamline development workflows' },
  { id: 'mobile', name: 'Mobile Development', Icon: SiReact, description: 'Build native and cross-platform apps' },
  { id: 'cloud', name: 'Cloud Computing', Icon: FaCloud, description: 'Deploy and scale in the cloud' },
  { id: 'ai', name: 'AI & Machine Learning', Icon: FaBrain, description: 'Build intelligent applications' }
];

const getInstructor = (id) => {
  try {
    return instructorsData.instructors.find(i => i.id === id)?.name || 'Unknown';
  } catch (error) {
    console.error('Error getting instructor:', error);
    return 'Unknown';
  }
};

// Build coursesData from JSON with error handling
export const coursesData = (() => {
  try {
    return Object.values(coursesJSON).flat().map(course => ({
      ...course,
      instructor: getInstructor(course.instructorId),
      Icon: techIconMap[course.tech] || null,
      price: course.price || "Free"
    }));
  } catch (error) {
    console.error('Error loading courses:', error);
    return [];
  }
})();

// Helper functions with safe fallbacks
export const getCoursesByCategory = (categoryId) => {
  if (!categoryId) return [];
  return coursesData.filter(c => c.category === categoryId);
};

export const getCategoryById = (categoryId) => {
  if (!categoryId) return null;
  return courseCategories.find(cat => cat.id === categoryId);
};

export const getCourseById = (courseId) => {
  if (!courseId) return null;
  return coursesData.find(c => c.id === parseInt(courseId));
};

export const getAllCategories = () => courseCategories;

export const getCategoriesWithCourseCount = () =>
  courseCategories.map(cat => ({
    ...cat,
    courseCount: getCoursesByCategory(cat.id).length
  }));

export const searchCourses = (term) => {
  if (!term || typeof term !== 'string') return [];
  const searchTerm = term.toLowerCase();
  return coursesData.filter(c =>
    c.title?.toLowerCase().includes(searchTerm) ||
    c.description?.toLowerCase().includes(searchTerm) ||
    c.instructor?.toLowerCase().includes(searchTerm)
  );
};

export const getPopularCourses = (limit = 9) => {
  const validLimit = Math.max(1, parseInt(limit) || 9);
  return [...coursesData]
    .sort((a, b) => (b.students || 0) - (a.students || 0))
    .slice(0, validLimit);
};

export const getTopRatedCourses = (limit = 9) => {
  const validLimit = Math.max(1, parseInt(limit) || 9);
  return [...coursesData]
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, validLimit);
};

export const getTotalCourses = () => coursesData.length;

export const getTotalStudents = () => coursesData.reduce((sum, c) => sum + (c.students || 0), 0);
