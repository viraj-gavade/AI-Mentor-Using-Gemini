
import React from 'react';
import { Link } from 'react-router-dom';
import { FeatureCard } from './ui/feature-card';
import { Sparkles, Brain, Target, Zap, FileText } from 'lucide-react';


const features = [
    {
        name: 'Flashcards',
        path: '/flashcards',
        description: 'Create flashcards from your syllabus',
        icon: Brain,
        color: 'from-cyan-500 to-blue-500',
    },
    {
        name: 'Study Plan',
        path: '/study-plan',
        description: 'Generate a personalized study plan',
        icon: Target,
        color: 'from-blue-500 to-indigo-500',
    },
    {
        name: 'Quiz',
        path: '/quiz',
        description: 'Take quizzes based on your syllabus',
        icon: Zap,
        color: 'from-purple-500 to-pink-500',
    },
    {
        name: 'Syllabus PDF',
        path: '/syllabus-pdf',
        description: 'Upload and parse your syllabus PDF',
        icon: FileText,
        color: 'from-emerald-500 to-teal-500',
    },
];

const HomePage = () => {
    return (
        <div className="w-full flex flex-col items-center justify-center px-2 py-8">
            {/* Hero Section */}
            <section className="w-full max-w-5xl mx-auto flex flex-col items-center text-center mb-12 animate-fade-in">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-6 shadow-lg animate-bounce-slow">
                    <Sparkles className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4 drop-shadow-lg">
                    StudyMentor
                </h1>
                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-200 max-w-2xl mb-6">
                    Your all-in-one AI-powered study companion. Upload your syllabus, generate a personalized plan, create flashcards, and test yourself with quizzes—all in one beautiful, seamless experience.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                    <Link to="/syllabus-pdf" className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg hover:scale-105 transition-transform duration-200 animate-fade-in">
                        Get Started
                    </Link>
                </div>
            </section>

            {/* Features Section */}
            <section className="w-full max-w-5xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, idx) => (
                        <Link to={feature.path} key={feature.name} className="group">
                            <FeatureCard
                                title={feature.name}
                                description={feature.description}
                                icon={feature.icon}
                                className={`bg-gradient-to-br ${feature.color} text-white shadow-xl group-hover:scale-105 transition-transform duration-300 animate-fade-in-up`}
                            />
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default HomePage;
