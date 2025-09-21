import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { Home, Brain, Target, Zap, FileText, BookOpen, Sparkles, Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const links = [
        { path: '/', label: 'Home', icon: Home, gradient: 'from-blue-500 to-indigo-500' },
        { path: '/flashcards', label: 'Flashcards', icon: Brain, gradient: 'from-cyan-500 to-blue-500' },
        { path: '/study-plan', label: 'Study Plan', icon: Target, gradient: 'from-blue-500 to-indigo-500' },
        { path: '/quiz', label: 'Quiz', icon: Zap, gradient: 'from-purple-500 to-pink-500' },
        { path: '/syllabus-pdf', label: 'Syllabus PDF', icon: FileText, gradient: 'from-emerald-500 to-teal-500' },
    ];

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <nav className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-50 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <NavLink to="/" className="flex items-center gap-3 group" end>
                        <div className="relative">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                                <BookOpen className="w-6 h-6 text-white" />
                            </div>
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse">
                                <Sparkles className="w-2 h-2 text-white" />
                            </div>
                        </div>
                        <div className="hidden sm:block">
                            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                StudyMentor
                            </span>
                            <div className="text-xs text-gray-500 dark:text-gray-400 -mt-1">
                                AI-Powered Learning
                            </div>
                        </div>
                    </NavLink>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-1">
                        {links.map((link) => {
                            const IconComponent = link.icon;
                            return (
                                <NavLink
                                    key={link.path}
                                    to={link.path}
                                    end={link.path === '/'}
                                    className={({ isActive }) =>
                                        `group relative px-4 py-2 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 ${isActive
                                            ? 'text-white shadow-lg transform scale-105'
                                            : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/50'
                                        }`
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            {isActive && (
                                                <div className={`absolute inset-0 bg-gradient-to-r ${link.gradient} rounded-xl -z-10`} />
                                            )}
                                            <IconComponent className="w-4 h-4" />
                                            <span className="text-sm">{link.label}</span>
                                            {isActive && (
                                                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full opacity-80" />
                                            )}
                                        </>
                                    )}
                                </NavLink>
                            );
                        })}
                    </div>

                    {/* Theme Toggle & Mobile Menu Button */}
                    <div className="flex items-center gap-3">
                        {/* Theme Toggle Button */}
                        <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 hidden sm:block">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </button>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={toggleMenu}
                            className="lg:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div className={`lg:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0 overflow-hidden'
                    }`}>
                    <div className="grid grid-cols-1 gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                        {links.map((link) => {
                            const IconComponent = link.icon;
                            return (
                                <NavLink
                                    key={link.path}
                                    to={link.path}
                                    end={link.path === '/'}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={({ isActive }) =>
                                        `group relative px-4 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-3 ${isActive
                                            ? 'text-white shadow-lg'
                                            : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/50'
                                        }`
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            {isActive && (
                                                <div className={`absolute inset-0 bg-gradient-to-r ${link.gradient} rounded-xl -z-10`} />
                                            )}
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isActive ? 'bg-white/20' : 'bg-gray-100 dark:bg-gray-800'
                                                }`}>
                                                <IconComponent className="w-4 h-4" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-sm font-medium">{link.label}</div>
                                                <div className={`text-xs ${isActive ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'
                                                    }`}>
                                                    {link.path === '/' ? 'Dashboard' :
                                                        link.path === '/flashcards' ? 'Memory Cards' :
                                                            link.path === '/study-plan' ? 'Learning Schedule' :
                                                                link.path === '/quiz' ? 'Knowledge Test' :
                                                                    'Document Parser'}
                                                </div>
                                            </div>
                                            {isActive && (
                                                <div className="w-2 h-2 bg-white rounded-full opacity-80" />
                                            )}
                                        </>
                                    )}
                                </NavLink>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                    onClick={() => setIsMenuOpen(false)}
                />
            )}
        </nav>
    );
};

export default Navbar;