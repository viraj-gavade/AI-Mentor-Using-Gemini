import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import SyllabusPdfParser from './components/SyllabusPdfParser';
import StudyPlanGenerator from './components/StudyPlanGenerator';
import FlashcardGenerator from './components/FlashcardGenerator';
import QuizGenerator from './components/QuizGenerator';


function App() {
  return (
    <Router>
      <Navbar />
      <main className="min-h-screen w-screen bg-gradient-to-br from-slate-100 via-slate-200 to-slate-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 flex flex-col items-center justify-start">
        <div className="w-full max-w-7xl flex-1 px-2 sm:px-6 lg:px-8 py-6">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/flashcards" element={<FlashcardGenerator />} />
            <Route path="/study-plan" element={<StudyPlanGenerator />} />
            <Route path="/quiz" element={<QuizGenerator />} />
            <Route path="/syllabus-pdf" element={<SyllabusPdfParser />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>
  
    </Router>
  );
}

export default App;
