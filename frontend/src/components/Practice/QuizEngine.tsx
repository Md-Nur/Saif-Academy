import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, ChevronRight, RefreshCcw, HelpCircle, Loader2 } from 'lucide-react';
import { getServerQuizQuestions } from "@/actions/quiz";

interface Question {
  id: string | number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const sampleQuestions: Question[] = [
  {
    id: 1,
    question: "Which of the following is a correct use of a preposition?",
    options: [
      "I am good in English.",
      "I am good at English.",
      "I am good for English.",
      "I am good with English."
    ],
    correctAnswer: 1,
    explanation: "We use 'good at' when talking about skills or subjects."
  },
  {
    id: 2,
    question: "Complete the sentence: If I ____ you, I would study harder.",
    options: [
      "am",
      "was",
      "were",
      "be"
    ],
    correctAnswer: 2,
    explanation: "In second conditional sentences, 'were' is used for all persons."
  }
];

export default function QuizEngine() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await getServerQuizQuestions();
        if (data && data.length > 0) {
          // Map backend fields to frontend interface if they differ
          const mappedQuestions = data.map((q: any) => ({
            id: q.id,
            question: q.question,
            options: q.options,
            correctAnswer: q.correct_answer,
            explanation: q.explanation
          }));
          setQuestions(mappedQuestions);
        } else {
          setQuestions(sampleQuestions);
        }
      } catch (err) {
        console.error("Failed to fetch quizzes", err);
        setQuestions(sampleQuestions);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  const handleOptionSelect = (index: number) => {
    if (showFeedback) return;
    setSelectedOption(index);
    setShowFeedback(true);
    if (index === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    setSelectedOption(null);
    setShowFeedback(false);
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizComplete(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setShowFeedback(false);
    setScore(0);
    setQuizComplete(false);
  };

  if (loading) {
    return (
      <div className="glass-panel p-20 flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-8 h-8 text-royal-gold animate-spin" />
        <p className="text-slate-400 font-medium">Loading Grammar Challenges...</p>
      </div>
    );
  }

  if (quizComplete) {
    return (
      <div className="glass-panel p-10 text-center space-y-6">
        <div className="w-20 h-20 bg-royal-gold/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-royal-gold/40">
          <CheckCircle2 size={40} className="text-royal-gold" />
        </div>
        <h3 className="text-3xl font-heading font-bold text-white uppercase italic">Quiz Complete!</h3>
        <p className="text-slate-400">You scored <span className="text-royal-gold font-bold">{score}</span> out of <span className="text-white font-bold">{questions.length}</span></p>
        <button onClick={resetQuiz} className="btn-gold flex items-center gap-2 mx-auto">
          <RefreshCcw size={18} /> Try Again
        </button>
      </div>
    );
  }

  const q = questions[currentQuestion];

  return (
    <div className="glass-panel p-8 space-y-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4">
        <span className="text-slate-500 font-bold text-sm tracking-widest">{currentQuestion + 1} / {questions.length}</span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-royal-gold text-xs font-bold uppercase tracking-widest">
          <HelpCircle size={14} /> Grammar Practice
        </div>
        <h3 className="text-xl font-bold text-white leading-relaxed">{q.question}</h3>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {q.options.map((option, index) => {
          let style = "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:border-white/20";
          if (showFeedback) {
            if (index === q.correctAnswer) {
              style = "bg-green-500/20 border-green-500/50 text-green-200";
            } else if (index === selectedOption) {
              style = "bg-red-500/20 border-red-500/50 text-red-200";
            } else {
              style = "bg-white/5 border-white/10 text-slate-500 opacity-50";
            }
          } else if (selectedOption === index) {
            style = "bg-royal-gold/10 border-royal-gold/50 text-royal-gold";
          }

          return (
            <button
              key={index}
              onClick={() => handleOptionSelect(index)}
              disabled={showFeedback}
              className={`text-left p-5 rounded-xl border transition-all duration-300 flex justify-between items-center group ${style}`}
            >
              <span className="font-medium">{option}</span>
              {showFeedback && index === q.correctAnswer && <CheckCircle2 size={20} className="text-green-500" />}
              {showFeedback && index === selectedOption && index !== q.correctAnswer && <XCircle size={20} className="text-red-500" />}
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 bg-white/5 border border-white/10 rounded-xl space-y-2"
          >
            <p className="text-sm font-bold text-royal-gold uppercase tracking-widest">Explanation</p>
            <p className="text-slate-400 text-sm italic">{q.explanation}</p>
            <button
              onClick={nextQuestion}
              className="mt-4 w-full flex items-center justify-center gap-2 text-white font-bold bg-royal-gold/20 py-3 rounded-lg hover:bg-royal-gold/30 transition-colors"
            >
              {currentQuestion + 1 < questions.length ? "Next Question" : "View Results"} <ChevronRight size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
