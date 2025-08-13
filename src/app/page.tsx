"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import StatisticsSection from "@/components/StatisticsSection";
import TestimonialSection from "@/components/TestimonialSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";

// Simulasi data soal tryout
const tryoutQuestions = [
  {
    id: 1,
    question: "Manakah dari berikut ini yang merupakan ibu kota Indonesia?",
    options: ["Bandung", "Jakarta", "Surabaya", "Medan"],
    correctAnswer: 1,
    explanation:
      "Jakarta adalah ibu kota Indonesia sejak kemerdekaan tahun 1945.",
  },
  {
    id: 2,
    question: "Berapa hasil dari 25 × 4?",
    options: ["90", "100", "110", "120"],
    correctAnswer: 1,
    explanation: "25 × 4 = 100. Ini adalah perkalian dasar matematika.",
  },
  {
    id: 3,
    question: "Siapa presiden pertama Indonesia?",
    options: ["Soeharto", "Ir. Soekarno", "B.J. Habibie", "Megawati"],
    correctAnswer: 1,
    explanation:
      "Ir. Soekarno adalah presiden pertama Republik Indonesia yang menjabat dari 1945-1967.",
  },
  {
    id: 4,
    question: "Manakah rumus luas lingkaran?",
    options: ["π × r", "π × r²", "2 × π × r", "π × d"],
    correctAnswer: 1,
    explanation:
      "Luas lingkaran = π × r², dimana r adalah jari-jari lingkaran.",
  },
  {
    id: 5,
    question: "Dalam sistem periodik, simbol untuk emas adalah:",
    options: ["Au", "Ag", "Fe", "Cu"],
    correctAnswer: 0,
    explanation:
      "Au (Aurum) adalah simbol kimia untuk emas dalam tabel periodik.",
  },
];

function TryoutSimulation() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [score, setScore] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);

  // Timer countdown
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0 && !isAnswered) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            handleTimeUp();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimeUp();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, isAnswered]);

  const startTryout = () => {
    setIsActive(true);
    setCurrentQuestion(0);
    setTimeLeft(60);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setShowResult(false);
    setScore(0);
    setGameFinished(false);
  };

  const handleTimeUp = () => {
    if (!isAnswered) {
      setIsAnswered(true);
      setShowResult(true);
      setIsCorrect(false);
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (isAnswered) return;

    setSelectedAnswer(answerIndex);
    setIsAnswered(true);
    setShowResult(true);

    const correct =
      answerIndex === tryoutQuestions[currentQuestion].correctAnswer;
    setIsCorrect(correct);

    if (correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < tryoutQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setShowResult(false);
      setTimeLeft(60);
    } else {
      setGameFinished(true);
      setIsActive(false);
    }
  };

  const resetTryout = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setTimeLeft(60);
    setIsAnswered(false);
    setShowResult(false);
    setIsCorrect(false);
    setIsActive(false);
    setScore(0);
    setGameFinished(false);
  };

  if (!isActive && !gameFinished) {
    return (
      <section className="py-8 md:py-16 lg:py-20 bg-gradient-to-br from-orange-100 to-orange-200 relative overflow-hidden">
        {/* Decorative Elements - Hidden on mobile for better performance */}
        <div className="hidden sm:block absolute top-10 left-10 w-12 h-12 md:w-16 md:h-16 bg-emerald-400 rotate-12 border-3 md:border-4 border-slate-800 opacity-60"></div>
        <div className="hidden sm:block absolute top-20 right-20 w-8 h-8 md:w-12 md:h-12 bg-blue-400 rounded-full border-3 md:border-4 border-slate-800 opacity-60"></div>
        <div className="hidden sm:block absolute bottom-20 left-20 w-16 h-16 md:w-20 md:h-20 bg-violet-400 rotate-45 border-3 md:border-4 border-slate-800 opacity-60"></div>
        <div className="hidden sm:block absolute bottom-10 right-10 w-10 h-10 md:w-14 md:h-14 bg-rose-400 border-3 md:border-4 border-slate-800 opacity-60"></div>

        <div className="max-w-5xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-6 md:mb-8 lg:mb-12">
            <div className="bg-orange-500 text-white px-3 sm:px-4 md:px-8 py-2 sm:py-3 md:py-4 border-3 md:border-4 lg:border-6 border-slate-800 transform rotate-2 inline-block mb-4 sm:mb-6 md:mb-8 shadow-brutal">
              <span className="text-sm sm:text-base md:text-lg lg:text-2xl font-black uppercase tracking-wider">
                🎯 COBA GRATIS SEKARANG!
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-black text-slate-900 mb-4 sm:mb-6 md:mb-8 uppercase leading-tight">
              SIMULASI TRYOUT
              <br />
              <span className="bg-emerald-500 text-white px-2 sm:px-3 md:px-4 py-1 sm:py-2 md:py-3 border-3 md:border-4 lg:border-6 border-slate-800 transform -rotate-2 inline-block shadow-brutal">
                INTERAKTIF
              </span>
            </h2>
            <div className="bg-blue-400 text-slate-900 p-3 sm:p-4 md:p-6 border-3 md:border-4 lg:border-6 border-slate-800 transform rotate-1 max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto shadow-brutal mb-6 md:mb-8 lg:mb-10">
              <p className="text-xs sm:text-sm md:text-base lg:text-lg font-black uppercase">
                🚀 RASAKAN PENGALAMAN TRYOUT ASLI! 60 DETIK PER SOAL
              </p>
            </div>
          </div>

          <div className="bg-white border-3 md:border-4 lg:border-6 border-slate-800 p-4 sm:p-6 md:p-8 lg:p-12 transform hover:rotate-1 hover:-translate-y-2 transition-all duration-300 shadow-brutal">
            <div className="mb-6 md:mb-8 lg:mb-10">
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-orange-400 to-orange-500 border-3 md:border-4 border-slate-800 mx-auto mb-4 sm:mb-6 flex items-center justify-center font-black text-2xl sm:text-3xl md:text-4xl shadow-brutal transform rotate-3">
                🎯
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black text-slate-900 mb-4 sm:mb-6 uppercase text-center">
                SIAP UNTUK CHALLENGE?
              </h3>

              {/* Features Grid - Stack on mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-6 md:mb-8">
                <div className="bg-orange-100 border-3 border-slate-800 p-3 sm:p-4 transform rotate-1 shadow-lg">
                  <div className="flex items-center">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-400 border-2 border-slate-800 flex items-center justify-center mr-2 sm:mr-3 font-black text-xs sm:text-sm">
                      📝
                    </div>
                    <span className="text-slate-900 font-black text-xs sm:text-sm md:text-base">
                      5 SOAL PILIHAN GANDA
                    </span>
                  </div>
                </div>

                <div className="bg-blue-100 border-3 border-slate-800 p-3 sm:p-4 transform -rotate-1 shadow-lg">
                  <div className="flex items-center">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-400 border-2 border-slate-800 flex items-center justify-center mr-2 sm:mr-3 font-black text-xs sm:text-sm">
                      ⏰
                    </div>
                    <span className="text-slate-900 font-black text-xs sm:text-sm md:text-base">
                      60 DETIK PER SOAL
                    </span>
                  </div>
                </div>

                <div className="bg-emerald-100 border-3 border-slate-800 p-3 sm:p-4 transform rotate-1 shadow-lg">
                  <div className="flex items-center">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-emerald-400 border-2 border-slate-800 flex items-center justify-center mr-2 sm:mr-3 font-black text-xs sm:text-sm">
                      ⚡
                    </div>
                    <span className="text-slate-900 font-black text-xs sm:text-sm md:text-base">
                      FEEDBACK LANGSUNG
                    </span>
                  </div>
                </div>

                <div className="bg-violet-100 border-3 border-slate-800 p-3 sm:p-4 transform -rotate-1 shadow-lg">
                  <div className="flex items-center">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-violet-400 border-2 border-slate-800 flex items-center justify-center mr-2 sm:mr-3 font-black text-xs sm:text-sm">
                      💡
                    </div>
                    <span className="text-slate-900 font-black text-xs sm:text-sm md:text-base">
                      PEMBAHASAN DETAIL
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={startTryout}
              className="group bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-4 sm:px-6 md:px-8 lg:px-12 py-3 sm:py-4 md:py-6 font-black text-sm sm:text-base md:text-lg lg:text-xl uppercase border-3 md:border-4 lg:border-6 border-slate-800 transform hover:-rotate-2 hover:-translate-y-3 hover:scale-105 transition-all duration-300 shadow-brutal w-full"
            >
              <span className="flex items-center justify-center gap-2 sm:gap-3">
                🚀 MULAI TRYOUT SEKARANG!
                <span className="group-hover:animate-bounce">⚡</span>
              </span>
            </button>

            <div className="mt-4 sm:mt-6 text-center">
              <p className="text-slate-600 font-bold text-xs sm:text-sm">
                💯 GRATIS • TANPA DAFTAR • LANGSUNG MAIN
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (gameFinished) {
    const percentage = Math.round((score / tryoutQuestions.length) * 100);
    return (
      <section className="py-8 md:py-16 lg:py-20 bg-gradient-to-br from-emerald-100 via-blue-50 to-violet-100 relative overflow-hidden">
        {/* Celebration Elements - Hidden on mobile for better performance */}
        <div className="hidden sm:block absolute top-10 left-10 w-8 h-8 md:w-12 md:h-12 bg-yellow-400 rotate-12 border-3 md:border-4 border-slate-800 opacity-70 animate-bounce"></div>
        <div className="hidden sm:block absolute top-20 right-16 w-6 h-6 md:w-8 md:h-8 bg-pink-400 rounded-full border-3 md:border-4 border-slate-800 opacity-60 animate-pulse"></div>
        <div className="hidden sm:block absolute bottom-20 left-20 w-12 h-12 md:w-16 md:h-16 bg-emerald-400 rotate-45 border-3 md:border-4 border-slate-800 opacity-50 animate-spin"></div>
        <div className="hidden sm:block absolute bottom-10 right-10 w-8 h-8 md:w-10 md:h-10 bg-blue-400 border-3 md:border-4 border-slate-800 opacity-60 animate-ping"></div>
        <div
          className="hidden md:block absolute top-1/2 left-1/4 w-4 h-4 md:w-6 md:h-6 bg-orange-400 border-3 md:border-4 border-slate-800 opacity-40 animate-bounce"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="hidden md:block absolute top-1/3 right-1/3 w-10 h-10 md:w-14 md:h-14 bg-violet-400 rotate-12 border-3 md:border-4 border-slate-800 opacity-50 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>

        <div className="max-w-5xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
          <div className="bg-white border-4 md:border-6 border-slate-800 p-6 sm:p-8 md:p-12 lg:p-16 transform hover:rotate-1 transition-all duration-300 shadow-brutal text-center">
            {/* Trophy/Icon Section */}
            <div className="mb-6 md:mb-8">
              <div
                className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 mx-auto mb-4 sm:mb-6 flex items-center justify-center font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl border-4 md:border-6 border-slate-800 shadow-brutal transform rotate-3 ${
                  percentage >= 80
                    ? "bg-gradient-to-br from-yellow-400 to-yellow-500"
                    : percentage >= 60
                    ? "bg-gradient-to-br from-blue-400 to-blue-500"
                    : "bg-gradient-to-br from-orange-400 to-orange-500"
                }`}
              >
                {percentage >= 80 ? "🏆" : percentage >= 60 ? "👍" : "💪"}
              </div>

              <div className="bg-slate-900 text-white px-3 sm:px-4 md:px-6 py-2 sm:py-3 border-3 md:border-4 border-slate-800 inline-block mb-3 sm:mb-4 font-black uppercase text-sm sm:text-base md:text-xl lg:text-2xl shadow-brutal transform -rotate-2">
                TRYOUT SELESAI!
              </div>
            </div>

            {/* Score Display */}
            <div className="mb-6 md:mb-8">
              <div
                className={`p-4 sm:p-5 md:p-6 border-4 md:border-6 border-slate-800 inline-block mb-4 sm:mb-6 font-black uppercase text-xl sm:text-2xl md:text-3xl lg:text-4xl shadow-brutal transform rotate-1 ${
                  percentage >= 80
                    ? "bg-emerald-400 text-white"
                    : percentage >= 60
                    ? "bg-blue-400 text-white"
                    : "bg-orange-400 text-slate-900"
                }`}
              >
                SKOR: {score}/{tryoutQuestions.length}
              </div>

              <div
                className={`p-3 sm:p-4 border-3 md:border-4 border-slate-800 inline-block font-black uppercase text-base sm:text-lg md:text-xl lg:text-2xl shadow-lg transform -rotate-1 ${
                  percentage >= 80
                    ? "bg-yellow-400 text-slate-900"
                    : percentage >= 60
                    ? "bg-green-400 text-slate-900"
                    : "bg-red-400 text-white"
                }`}
              >
                PERSENTASE: {percentage}%
              </div>
            </div>

            {/* Feedback Message */}
            <div className="mb-6 md:mb-8">
              <div
                className={`p-4 sm:p-5 md:p-6 border-3 md:border-4 border-slate-800 max-w-xs sm:max-w-lg md:max-w-2xl mx-auto shadow-brutal ${
                  percentage >= 80
                    ? "bg-emerald-100 border-emerald-400"
                    : percentage >= 60
                    ? "bg-blue-100 border-blue-400"
                    : "bg-orange-100 border-orange-400"
                }`}
              >
                <p className="text-slate-900 font-black text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
                  {percentage >= 80
                    ? "🎉 LUAR BIASA SEKALI! Kamu benar-benar siap untuk menghadapi UTBK! Pertahankan level ini!"
                    : percentage >= 60
                    ? "👏 BAGUS BANGET! Kamu sudah di jalur yang tepat! Terus berlatih untuk hasil yang lebih maksimal!"
                    : "💪 SEMANGAT TERUS! Ini adalah awal yang baik! Dengan latihan rutin, kamu pasti bisa lebih baik lagi!"}
                </p>
              </div>
            </div>

            {/* Detailed Score Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 md:mb-8">
              <div className="bg-emerald-100 border-3 border-emerald-400 p-3 sm:p-4 shadow-lg transform rotate-1">
                <div className="text-xl sm:text-2xl mb-1 sm:mb-2">✅</div>
                <div className="font-black text-slate-900 text-sm sm:text-base">
                  BENAR
                </div>
                <div className="text-lg sm:text-xl font-black text-emerald-600">
                  {score}
                </div>
              </div>

              <div className="bg-red-100 border-3 border-red-400 p-3 sm:p-4 shadow-lg transform -rotate-1">
                <div className="text-xl sm:text-2xl mb-1 sm:mb-2">❌</div>
                <div className="font-black text-slate-900 text-sm sm:text-base">
                  SALAH
                </div>
                <div className="text-lg sm:text-xl font-black text-red-600">
                  {tryoutQuestions.length - score}
                </div>
              </div>

              <div className="bg-blue-100 border-3 border-blue-400 p-3 sm:p-4 shadow-lg transform rotate-1">
                <div className="text-xl sm:text-2xl mb-1 sm:mb-2">📊</div>
                <div className="font-black text-slate-900 text-sm sm:text-base">
                  AKURASI
                </div>
                <div className="text-lg sm:text-xl font-black text-blue-600">
                  {percentage}%
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button
                onClick={resetTryout}
                className="group bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 font-black text-sm sm:text-base md:text-lg uppercase border-3 md:border-4 border-slate-800 transform hover:-rotate-2 hover:-translate-y-3 hover:scale-105 transition-all duration-300 shadow-brutal"
              >
                <span className="flex items-center justify-center gap-2 sm:gap-3">
                  🔄 COBA LAGI
                  <span className="group-hover:animate-spin">⚡</span>
                </span>
              </button>

              <button className="group bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 font-black text-sm sm:text-base md:text-lg uppercase border-3 md:border-4 border-slate-800 transform hover:rotate-2 hover:-translate-y-3 hover:scale-105 transition-all duration-300 shadow-brutal">
                <span className="flex items-center justify-center gap-2 sm:gap-3">
                  📚 MULAI BELAJAR SERIUS
                  <span className="group-hover:animate-bounce">🚀</span>
                </span>
              </button>
            </div>

            {/* Call to Action */}
            <div className="mt-6 sm:mt-8">
              <div className="bg-gradient-to-r from-violet-400 to-violet-500 text-white p-3 sm:p-4 border-3 md:border-4 border-slate-800 shadow-brutal transform hover:rotate-1 transition-all duration-200">
                <p className="font-black text-xs sm:text-sm md:text-base">
                  💡 MAU SCORE LEBIH TINGGI? GABUNG PROGRAM INTENSIF KAMI!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const question = tryoutQuestions[currentQuestion];

  return (
    <section className="py-8 md:py-16 lg:py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements - Hidden on mobile */}
      <div className="hidden sm:block absolute top-20 left-10 w-6 h-6 md:w-8 md:h-8 bg-orange-400 rotate-45 border-2 border-white opacity-20 animate-pulse"></div>
      <div className="hidden sm:block absolute top-40 right-20 w-4 h-4 md:w-6 md:h-6 bg-emerald-400 rounded-full border-2 border-white opacity-30 animate-bounce"></div>
      <div className="hidden sm:block absolute bottom-32 left-16 w-8 h-8 md:w-10 md:h-10 bg-blue-400 border-2 border-white opacity-25 animate-spin"></div>

      <div className="max-w-5xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-6 md:mb-8">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
            <div className="bg-orange-500 text-white px-3 sm:px-4 py-2 border-3 border-white font-black uppercase text-xs sm:text-sm transform rotate-2 shadow-brutal">
              SOAL {currentQuestion + 1}/{tryoutQuestions.length}
            </div>
            <div className="bg-emerald-500 text-white px-3 sm:px-4 py-2 border-3 border-white font-black uppercase text-xs sm:text-sm transform -rotate-2 shadow-brutal">
              SKOR: {score}
            </div>
          </div>

          {/* Enhanced Timer */}
          <div
            className={`inline-block mb-4 sm:mb-6 transform hover:scale-105 transition-all duration-300 ${
              timeLeft <= 10 ? "animate-pulse" : ""
            }`}
          >
            <div
              className={`px-4 sm:px-6 py-3 sm:py-4 border-3 sm:border-4 border-white font-black text-lg sm:text-xl md:text-2xl shadow-brutal ${
                timeLeft <= 10
                  ? "bg-red-600 text-white"
                  : "bg-gradient-to-r from-orange-400 to-orange-500 text-white"
              }`}
            >
              <span className="flex items-center gap-2 sm:gap-3">
                ⏰ {timeLeft} DETIK
                {timeLeft <= 10 && <span className="animate-bounce">🚨</span>}
              </span>
            </div>
          </div>
        </div>

        {/* Enhanced Question Card */}
        <div className="bg-white border-3 md:border-4 border-slate-800 p-4 sm:p-6 md:p-8 mb-6 md:mb-8 shadow-brutal transform hover:rotate-1 transition-all duration-300">
          <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-400 to-blue-500 border-2 sm:border-3 border-slate-800 flex items-center justify-center font-black text-sm sm:text-lg md:text-xl shadow-lg transform rotate-3 flex-shrink-0">
              ❓
            </div>
            <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-black text-slate-900 leading-tight flex-1">
              {question.question}
            </h3>
          </div>

          {/* Enhanced Options */}
          <div className="space-y-3 sm:space-y-4">
            {question.options.map((option, index) => {
              let buttonClass =
                "group w-full text-left p-3 sm:p-4 md:p-5 border-3 md:border-4 border-slate-800 font-bold text-sm sm:text-base transition-all duration-300 shadow-lg ";

              if (!isAnswered) {
                buttonClass +=
                  "bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 text-slate-900 transform hover:-translate-y-2 hover:rotate-1 hover:scale-102";
              } else {
                if (index === question.correctAnswer) {
                  buttonClass +=
                    "bg-gradient-to-r from-emerald-400 to-emerald-500 text-white transform scale-105";
                } else if (
                  index === selectedAnswer &&
                  selectedAnswer !== question.correctAnswer
                ) {
                  buttonClass +=
                    "bg-gradient-to-r from-red-400 to-red-500 text-white";
                } else {
                  buttonClass += "bg-gray-200 text-slate-600";
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={buttonClass}
                  disabled={isAnswered}
                >
                  <div className="flex items-start sm:items-center">
                    <span className="w-6 h-6 sm:w-8 sm:h-8 bg-slate-800 text-white border-2 border-white flex items-center justify-center font-black mr-3 sm:mr-4 group-hover:rotate-12 transition-transform flex-shrink-0 text-xs sm:text-sm">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="flex-1 leading-relaxed">{option}</span>
                    {!isAnswered && (
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity hidden sm:inline">
                        👆
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Enhanced Result */}
        {showResult && (
          <div className="bg-white border-3 md:border-4 border-slate-800 p-4 sm:p-6 md:p-8 mb-6 md:mb-8 shadow-brutal transform hover:-rotate-1 transition-all duration-300">
            <div className="text-center mb-4 sm:mb-6">
              <div
                className={`inline-block p-3 sm:p-4 border-3 md:border-4 border-slate-800 shadow-brutal mb-3 sm:mb-4 ${
                  isCorrect
                    ? "bg-emerald-400 text-white"
                    : "bg-red-400 text-white"
                }`}
              >
                <div className="text-xl sm:text-2xl md:text-3xl font-black mb-1 sm:mb-2">
                  {isCorrect ? "✅ JAWABAN BENAR!" : "❌ JAWABAN SALAH!"}
                </div>
                <div className="text-sm sm:text-base md:text-lg font-bold">
                  {isCorrect
                    ? "Mantap! Kamu memang jago! 🎉"
                    : `Jawaban yang benar adalah ${String.fromCharCode(
                        65 + question.correctAnswer
                      )} 📚`}
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-3 md:border-4 border-blue-400 p-4 sm:p-6 mb-4 sm:mb-6 shadow-lg">
              <div className="flex items-start gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-400 border-2 sm:border-3 border-slate-800 flex items-center justify-center font-black text-sm sm:text-lg flex-shrink-0">
                  💡
                </div>
                <div className="flex-1">
                  <h4 className="font-black text-slate-900 text-sm sm:text-base md:text-lg mb-2 sm:mb-3 uppercase">
                    PEMBAHASAN:
                  </h4>
                  <p className="text-slate-800 font-medium text-sm sm:text-base leading-relaxed">
                    {question.explanation}
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={nextQuestion}
                className="group bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 font-black text-sm sm:text-base md:text-lg uppercase border-3 md:border-4 border-slate-800 transform hover:-rotate-2 hover:-translate-y-3 hover:scale-105 transition-all duration-300 shadow-brutal w-full sm:w-auto"
              >
                <span className="flex items-center justify-center gap-2 sm:gap-3">
                  {currentQuestion < tryoutQuestions.length - 1
                    ? "➡️ SOAL BERIKUTNYA"
                    : "🏁 LIHAT HASIL AKHIR"}
                  <span className="group-hover:animate-bounce">🚀</span>
                </span>
              </button>
            </div>
          </div>
        )}

        {/* Enhanced Progress Bar */}
        <div className="text-center">
          <div className="bg-white border-3 md:border-4 border-slate-800 p-3 sm:p-4 inline-block shadow-brutal transform hover:rotate-1 transition-all duration-200">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
              <span className="font-black text-slate-900 text-xs sm:text-sm">
                📊 PROGRESS:
              </span>
              <div className="w-24 sm:w-32 h-2 sm:h-3 bg-gray-200 border-2 border-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 transition-all duration-500"
                  style={{
                    width: `${
                      ((currentQuestion + (isAnswered ? 1 : 0)) /
                        tryoutQuestions.length) *
                      100
                    }%`,
                  }}
                ></div>
              </div>
              <span className="font-black text-slate-900 text-xs sm:text-sm">
                {currentQuestion + (isAnswered ? 1 : 0)}/
                {tryoutQuestions.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-orange-50 relative overflow-x-hidden">
      {/* Animated Background Particles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-orange-300 rounded-full animate-float opacity-60"></div>
        <div
          className="absolute top-1/3 right-1/4 w-3 h-3 bg-blue-300 rounded-full animate-bounce opacity-40"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-emerald-300 rounded-full animate-ping opacity-50"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-2/3 right-1/3 w-4 h-4 bg-violet-300 rounded-full animate-pulse opacity-30"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-rose-300 rounded-full animate-bounce opacity-70"
          style={{ animationDelay: "1.5s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/6 w-2 h-2 bg-amber-300 rounded-full animate-float opacity-50"
          style={{ animationDelay: "3s" }}
        ></div>
        <div
          className="absolute bottom-2/3 right-1/6 w-3 h-3 bg-orange-300 rounded-full animate-ping opacity-40"
          style={{ animationDelay: "2.5s" }}
        ></div>
        <div
          className="absolute top-3/4 left-2/3 w-2 h-2 bg-blue-300 rounded-full animate-pulse opacity-60"
          style={{ animationDelay: "0.8s" }}
        ></div>
      </div>
      {/* Decorative Elements */}
      <div className="absolute top-20 left-4 md:left-10 w-12 md:w-24 h-12 md:h-24 bg-orange-400 rotate-12 border-3 border-slate-800 opacity-80 z-10"></div>
      <div className="absolute top-40 right-4 md:right-20 w-8 md:w-16 h-8 md:h-16 bg-blue-400 rounded-full border-3 border-slate-800 opacity-80 z-10"></div>
      <div className="absolute bottom-40 left-4 md:left-20 w-10 md:w-20 h-10 md:h-20 bg-emerald-400 rotate-45 border-3 border-slate-800 opacity-80 z-10"></div>
      <div className="absolute bottom-20 right-8 md:right-40 w-8 md:w-14 h-8 md:h-14 bg-violet-400 border-3 border-slate-800 opacity-80 z-10"></div>
      {/* Navigation */}
      {/* Desktop/Mobile Header */}
      <nav className="bg-slate-900 border-b-4 border-orange-400 relative z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-18">
            {/* Logo - Always visible */}
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-orange-400 border-3 border-slate-800 rotate-12 flex items-center justify-center mr-3 md:mr-4 font-black text-sm md:text-lg shadow-md">
                  🎯
                </div>
                <span className="text-xl md:text-3xl font-black text-white uppercase tracking-wider">
                  PintuUniv
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-3 lg:space-x-4">
                <a
                  href="#features"
                  className="bg-blue-400 text-slate-900 px-3 py-2 md:px-4 md:py-2 font-bold uppercase border-3 border-slate-800 hover:bg-blue-300 transform hover:-translate-y-1 transition-all duration-200 text-xs md:text-sm shadow-md"
                >
                  Fitur
                </a>
                <a
                  href="#pricing"
                  className="bg-emerald-400 text-slate-900 px-3 py-2 md:px-4 md:py-2 font-bold uppercase border-3 border-slate-800 hover:bg-emerald-300 transform hover:-translate-y-1 transition-all duration-200 text-xs md:text-sm shadow-md"
                >
                  Harga
                </a>
                <a
                  href="#about"
                  className="bg-violet-400 text-slate-900 px-3 py-2 md:px-4 md:py-2 font-bold uppercase border-3 border-slate-800 hover:bg-violet-300 transform hover:-translate-y-1 transition-all duration-200 text-xs md:text-sm shadow-md"
                >
                  Tentang
                </a>
              </div>
            </div>

            {/* Right side buttons */}
            <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
              {/* Login button - hidden on small mobile, visible on sm+ */}
              <Link
                href="/login"
                className="hidden sm:block bg-white text-slate-900 px-2 sm:px-3 py-2 md:px-4 md:py-2 font-bold uppercase border-3 border-slate-800 hover:bg-orange-100 transform hover:-translate-y-1 transition-all duration-200 text-xs md:text-sm shadow-md"
              >
                🔐 Masuk
              </Link>
              {/* Get Started button - Always visible, more prominent on mobile */}
              <Link
                href="/register"
                className="bg-orange-500 text-white px-3 sm:px-3 py-2 md:px-4 md:py-2 font-black uppercase border-3 border-slate-800 hover:bg-orange-400 transform hover:-translate-y-1 transition-all duration-200 shadow-lg text-xs sm:text-xs md:text-sm"
              >
                <span className="md:hidden">GET STARTED</span>
                <span className="hidden md:inline">📝 Daftar</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      {/* Mobile Bottom Navigation - Only visible on mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900 via-slate-800 to-slate-900 border-t-4 border-orange-400 md:hidden z-50 shadow-2xl backdrop-blur-sm">
        {/* Subtle top glow effect */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-300 to-transparent opacity-60"></div>

        <div className="flex justify-around items-end py-3 px-2 relative">
          {/* Navigation Items */}
          <a
            href="#features"
            className="flex flex-col items-center p-2 text-center min-w-0 flex-1 group active:scale-95 transition-all duration-200"
          >
            <div className="relative">
              <div className="w-11 h-11 bg-gradient-to-br from-blue-400 to-blue-500 border-3 border-slate-800 rounded-xl flex items-center justify-center mb-1 shadow-lg group-hover:shadow-blue-400/20 group-hover:-translate-y-1 transition-all duration-200 group-active:scale-95">
                <span className="text-slate-900 font-black text-lg group-hover:scale-110 transition-transform duration-200">
                  ⚡
                </span>
              </div>
              {/* Active indicator dot */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-300 border-2 border-slate-800 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </div>
            <span className="text-blue-200 group-hover:text-blue-100 font-bold text-xs uppercase truncate transition-colors duration-200">
              Fitur
            </span>
          </a>

          <a
            href="#pricing"
            className="flex flex-col items-center p-2 text-center min-w-0 flex-1 group active:scale-95 transition-all duration-200"
          >
            <div className="relative">
              <div className="w-11 h-11 bg-gradient-to-br from-emerald-400 to-emerald-500 border-3 border-slate-800 rounded-xl flex items-center justify-center mb-1 shadow-lg group-hover:shadow-emerald-400/20 group-hover:-translate-y-1 transition-all duration-200 group-active:scale-95">
                <span className="text-slate-900 font-black text-lg group-hover:scale-110 transition-transform duration-200">
                  💰
                </span>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-300 border-2 border-slate-800 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </div>
            <span className="text-emerald-200 group-hover:text-emerald-100 font-bold text-xs uppercase truncate transition-colors duration-200">
              Harga
            </span>
          </a>

          <a
            href="#about"
            className="flex flex-col items-center p-2 text-center min-w-0 flex-1 group active:scale-95 transition-all duration-200"
          >
            <div className="relative">
              <div className="w-11 h-11 bg-gradient-to-br from-violet-400 to-violet-500 border-3 border-slate-800 rounded-xl flex items-center justify-center mb-1 shadow-lg group-hover:shadow-violet-400/20 group-hover:-translate-y-1 transition-all duration-200 group-active:scale-95">
                <span className="text-slate-900 font-black text-lg group-hover:scale-110 transition-transform duration-200">
                  📚
                </span>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-violet-300 border-2 border-slate-800 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </div>
            <span className="text-violet-200 group-hover:text-violet-100 font-bold text-xs uppercase truncate transition-colors duration-200">
              Tentang
            </span>
          </a>

          <Link
            href="/login"
            className="flex flex-col items-center p-2 text-center min-w-0 flex-1 group active:scale-95 transition-all duration-200"
          >
            <div className="relative">
              <div className="w-11 h-11 bg-gradient-to-br from-white to-gray-100 border-3 border-slate-800 rounded-xl flex items-center justify-center mb-1 shadow-lg group-hover:shadow-white/20 group-hover:-translate-y-1 transition-all duration-200 group-active:scale-95">
                <span className="text-slate-900 font-black text-lg group-hover:scale-110 transition-transform duration-200">
                  🔐
                </span>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gray-300 border-2 border-slate-800 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </div>
            <span className="text-gray-200 group-hover:text-white font-bold text-xs uppercase truncate transition-colors duration-200">
              Masuk
            </span>
          </Link>

          <Link
            href="/register"
            className="flex flex-col items-center p-2 text-center min-w-0 flex-1 group active:scale-95 transition-all duration-200"
          >
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 border-3 border-slate-800 rounded-xl flex items-center justify-center mb-1 shadow-xl group-hover:shadow-orange-500/30 group-hover:-translate-y-2 transition-all duration-200 group-active:scale-95 animate-pulse">
                <span className="text-white font-black text-xl group-hover:scale-110 transition-transform duration-200">
                  🚀
                </span>
                {/* Premium glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-300/20 to-orange-600/20 rounded-xl animate-pulse"></div>
              </div>
              {/* Special active indicator for CTA */}
              <div className="absolute -top-2 -right-1 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-400 border-2 border-slate-800 rounded-full animate-bounce shadow-lg"></div>
            </div>
            <span className="text-orange-300 group-hover:text-orange-200 font-black text-xs uppercase truncate transition-colors duration-200">
              Daftar
            </span>
          </Link>
        </div>

        {/* Bottom safe area for devices with home indicators */}
        <div className="h-1 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900"></div>
      </div>

      {/* Hero Section */}
      <HeroSection />
      {/* Features Section */}
      <FeaturesSection />
      {/* Statistics Section */}
      <StatisticsSection />
      {/* Testimonial Section */}
      <TestimonialSection />
      {/* University Partners Section */}
      {/* Dipindahkan ke komponen terpisah agar rapi dan bisa pakai logo */}
      {(() => {
        const U = require("@/components/UniversityPartners").default;
        return <U />;
      })()}
      {/* Interactive Tryout Simulation Section */}
      <TryoutSimulation />
      {/* Pricing Section */}
      <PricingSection />
      {/* FAQ Section */}
      <FAQSection />
      {/* Bottom CTA */}
      <CTASection />
      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 md:py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="bg-orange-400 text-slate-900 px-3 md:px-4 py-1 md:py-2 border-2 md:border-3 border-white inline-block mb-3 md:mb-4 transform -rotate-1 shadow-lg">
                <h3 className="text-lg md:text-xl font-black uppercase">
                  PINTUUNIV
                </h3>
              </div>
              <p className="text-white font-bold mb-3 md:mb-4 leading-relaxed text-xs md:text-sm">
                Platform tryout terdepan untuk persiapan UTBK. Kami berkomitmen
                membantu siswa Indonesia meraih impian kuliah di PTN favorit!
              </p>
              <div className="flex space-x-3 md:space-x-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-500 border-2 md:border-4 border-white flex items-center justify-center font-black text-lg md:text-xl hover:bg-orange-600 transition-colors cursor-pointer shadow-lg">
                  📘
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-500 border-2 md:border-4 border-white flex items-center justify-center font-black text-lg md:text-xl hover:bg-blue-600 transition-colors cursor-pointer shadow-lg">
                  🐦
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 bg-emerald-500 border-2 md:border-4 border-white flex items-center justify-center font-black text-lg md:text-xl hover:bg-emerald-600 transition-colors cursor-pointer shadow-lg">
                  📱
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 bg-violet-500 border-2 md:border-4 border-white flex items-center justify-center font-black text-lg md:text-xl hover:bg-violet-600 transition-colors cursor-pointer shadow-lg">
                  📺
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <div className="bg-blue-400 text-slate-900 px-3 md:px-4 py-1 md:py-2 border-2 md:border-3 border-white inline-block mb-3 md:mb-4 transform rotate-1 shadow-lg">
                <h4 className="text-sm md:text-base font-black uppercase">
                  NAVIGASI
                </h4>
              </div>
              <ul className="space-y-1 md:space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-white font-bold hover:text-orange-400 transition-colors border-b-2 border-transparent hover:border-orange-400 pb-1 text-xs md:text-sm"
                  >
                    BERANDA
                  </a>
                </li>
                <li>
                  <a
                    href="#features"
                    className="text-white font-bold hover:text-orange-400 transition-colors border-b-2 border-transparent hover:border-orange-400 pb-1 text-xs md:text-sm"
                  >
                    FITUR
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="text-white font-bold hover:text-orange-400 transition-colors border-b-2 border-transparent hover:border-orange-400 pb-1 text-xs md:text-sm"
                  >
                    HARGA
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white font-bold hover:text-orange-400 transition-colors border-b-2 border-transparent hover:border-orange-400 pb-1 text-xs md:text-sm"
                  >
                    TENTANG KAMI
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white font-bold hover:text-orange-400 transition-colors border-b-2 border-transparent hover:border-orange-400 pb-1 text-xs md:text-sm"
                  >
                    KONTAK
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <div className="bg-emerald-400 text-slate-900 px-3 md:px-4 py-1 md:py-2 border-2 md:border-4 border-white inline-block mb-4 md:mb-6 transform -rotate-1 shadow-lg">
                <h4 className="text-base md:text-lg font-black uppercase">
                  RESOURCES
                </h4>
              </div>
              <ul className="space-y-2 md:space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-white font-bold hover:text-orange-400 transition-colors border-b-2 border-transparent hover:border-orange-400 pb-1 text-sm md:text-base"
                  >
                    BLOG
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white font-bold hover:text-orange-400 transition-colors border-b-2 border-transparent hover:border-orange-400 pb-1 text-sm md:text-base"
                  >
                    TIPS & TRIK
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white font-bold hover:text-orange-400 transition-colors border-b-2 border-transparent hover:border-orange-400 pb-1 text-sm md:text-base"
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white font-bold hover:text-orange-400 transition-colors border-b-2 border-transparent hover:border-orange-400 pb-1 text-sm md:text-base"
                  >
                    PANDUAN
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white font-bold hover:text-orange-400 transition-colors border-b-2 border-transparent hover:border-orange-400 pb-1 text-sm md:text-base"
                  >
                    DOWNLOAD APP
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <div className="bg-violet-400 text-slate-900 px-3 md:px-4 py-1 md:py-2 border-2 md:border-4 border-white inline-block mb-4 md:mb-6 transform rotate-1 shadow-lg">
                <h4 className="text-base md:text-lg font-black uppercase">
                  KONTAK
                </h4>
              </div>
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 md:w-8 md:h-8 bg-orange-400 border-1 md:border-2 border-white flex items-center justify-center mr-2 md:mr-3 font-black text-sm md:text-base">
                    📍
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm md:text-base">
                      Jl. Pendidikan No. 123
                      <br />
                      Jakarta Pusat, 10110
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 md:w-8 md:h-8 bg-orange-400 border-1 md:border-2 border-white flex items-center justify-center mr-2 md:mr-3 font-black text-sm md:text-base">
                    📞
                  </div>
                  <p className="text-white font-bold text-sm md:text-base">
                    +62 21 1234 5678
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 md:w-8 md:h-8 bg-orange-400 border-1 md:border-2 border-white flex items-center justify-center mr-2 md:mr-3 font-black text-sm md:text-base">
                    ✉️
                  </div>
                  <p className="text-white font-bold text-sm md:text-base">
                    info@pintuuniv.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="border-t-2 md:border-t-4 border-orange-400 pt-8 md:pt-12 mb-8 md:mb-12">
            <div className="text-center mb-6 md:mb-8">
              <div className="bg-rose-400 text-slate-900 px-4 md:px-6 py-2 md:py-3 border-2 md:border-4 border-white inline-block mb-3 md:mb-4 transform -rotate-1 shadow-lg">
                <h4 className="text-lg md:text-xl font-black uppercase">
                  SUBSCRIBE NEWSLETTER
                </h4>
              </div>
              <p className="text-white font-bold max-w-2xl mx-auto text-sm md:text-base">
                Dapatkan tips belajar, info tryout terbaru, dan motivasi
                langsung ke email kamu!
              </p>
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-3 md:space-x-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="EMAIL KAMU..."
                className="flex-1 w-full sm:w-auto px-4 md:px-6 py-3 md:py-4 border-2 md:border-4 border-white text-slate-900 font-bold placeholder-slate-500 bg-white focus:outline-none focus:border-orange-400 shadow-lg text-sm md:text-base"
              />
              <button className="w-full sm:w-auto bg-orange-400 text-slate-900 px-6 md:px-8 py-3 md:py-4 border-2 md:border-4 border-white font-black uppercase hover:bg-orange-500 transition-colors shadow-lg text-sm md:text-base">
                SUBSCRIBE!
              </button>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t-2 md:border-t-4 border-orange-400 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="bg-white text-slate-900 px-3 md:px-4 py-1 md:py-2 border-2 md:border-4 border-orange-400 shadow-lg">
              <p className="font-black uppercase text-xs md:text-sm">
                © 2024 PINTUUNIV. ALL RIGHTS RESERVED.
              </p>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end space-x-4 md:space-x-6">
              <Link
                href="/privacy"
                className="text-white font-bold hover:text-orange-400 transition-colors border-b-2 border-transparent hover:border-orange-400 pb-1 text-xs md:text-sm"
              >
                PRIVACY POLICY
              </Link>
              <Link
                href="/terms"
                className="text-white font-bold hover:text-orange-400 transition-colors border-b-2 border-transparent hover:border-orange-400 pb-1 text-xs md:text-sm"
              >
                TERMS OF SERVICE
              </Link>
              <a
                href="#"
                className="text-white font-bold hover:text-orange-400 transition-colors border-b-2 border-transparent hover:border-orange-400 pb-1 text-xs md:text-sm"
              >
                COOKIE POLICY
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Padding - Add padding to prevent content from being hidden behind bottom nav */}
      <div className="md:hidden h-24"></div>
    </div>
  );
}
