"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

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
      <nav className="bg-slate-900 border-b-4 border-orange-400 relative z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-18">
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

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button className="text-white p-2">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>

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

            <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
              <Link
                href="/login"
                className="bg-white text-slate-900 px-3 py-2 md:px-4 md:py-2 font-bold uppercase border-3 border-slate-800 hover:bg-orange-100 transform hover:-translate-y-1 transition-all duration-200 text-xs md:text-sm shadow-md"
              >
                🔐 Masuk
              </Link>
              <Link
                href="/register"
                className="bg-orange-500 text-white px-3 py-2 md:px-4 md:py-2 font-bold uppercase border-3 border-slate-800 hover:bg-orange-400 transform hover:-translate-y-1 transition-all duration-200 shadow-lg text-xs md:text-sm"
              >
                📝 Daftar
              </Link>
              <Link
                href="/dashboard"
                className="bg-blue-500 text-white px-3 py-2 md:px-4 md:py-2 font-bold uppercase border-3 border-slate-800 hover:bg-blue-400 transform hover:-translate-y-1 transition-all duration-200 shadow-lg text-xs md:text-sm"
              >
                📊 Dashboard
              </Link>
              <Link
                href="/leaderboard"
                className="bg-yellow-500 text-slate-900 px-3 py-2 md:px-4 md:py-2 font-bold uppercase border-3 border-slate-800 hover:bg-yellow-400 transform hover:-translate-y-1 transition-all duration-200 shadow-lg text-xs md:text-sm"
              >
                🏆 Leaderboard
              </Link>
              <Link
                href="/profile"
                className="bg-purple-500 text-white px-3 py-2 md:px-4 md:py-2 font-bold uppercase border-3 border-slate-800 hover:bg-purple-400 transform hover:-translate-y-1 transition-all duration-200 shadow-lg text-xs md:text-sm"
              >
                👤 Profile
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 md:pt-32 pb-16 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            {/* Main Heading */}
            <div className="mb-6 md:mb-8">
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-4 md:mb-6 leading-none tracking-tighter uppercase transform rotate-1">
                RAIH PTN
                <br />
                <span className="bg-orange-500 text-white px-2 md:px-3 py-1 md:py-2 border-3 md:border-6 border-slate-800 transform -rotate-2 inline-block shadow-lg">
                  IMPIANMU!
                </span>
              </h1>

              <div className="bg-slate-900 text-orange-300 px-3 md:px-6 py-2 md:py-4 border-3 md:border-6 border-orange-500 transform rotate-1 inline-block mb-4 md:mb-6 shadow-lg">
                <p className="text-sm sm:text-lg md:text-2xl font-black uppercase tracking-wider">
                  🎯 PLATFORM #1 INDONESIA
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="max-w-4xl mx-auto mb-6 md:mb-8">
              <div className="bg-white border-3 md:border-6 border-slate-800 p-3 md:p-6 transform -rotate-1 shadow-lg">
                <p className="text-sm sm:text-base md:text-lg text-slate-900 font-bold leading-tight">
                  Bergabung dengan{" "}
                  <span className="bg-orange-300 px-2 py-1 border-2 md:border-3 border-slate-800">
                    50,000+ SISWA
                  </span>{" "}
                  yang telah berhasil masuk PTN favorit. Latihan soal
                  terlengkap, analisis mendalam, dan bimbingan personal untuk
                  memastikan kamu siap menghadapi UTBK-SNBT.
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-8 md:mb-12 px-4">
              <button className="group bg-emerald-400 text-slate-900 px-4 md:px-6 py-3 md:py-4 font-black text-sm md:text-base uppercase border-3 md:border-6 border-slate-800 transform hover:-rotate-1 hover:-translate-y-2 transition-all duration-200 shadow-lg w-full sm:w-auto">
                <span className="flex items-center justify-center gap-2">
                  ⚡ MULAI TRYOUT GRATIS
                </span>
              </button>

              <Link
                href="/register"
                className="group bg-orange-500 text-white px-4 md:px-6 py-3 md:py-4 font-black text-sm md:text-base uppercase border-3 md:border-6 border-slate-800 transform hover:rotate-1 hover:-translate-y-2 transition-all duration-200 shadow-lg w-full sm:w-auto text-center"
              >
                <span className="flex items-center justify-center gap-2">
                  🚀 DAFTAR SEKARANG
                </span>
              </Link>

              <Link
                href="/login"
                className="group bg-blue-400 text-slate-900 px-4 md:px-6 py-3 md:py-4 font-black text-sm md:text-base uppercase border-3 md:border-6 border-slate-800 transform hover:rotate-1 hover:-translate-y-2 transition-all duration-200 shadow-lg w-full sm:w-auto text-center"
              >
                <span className="flex items-center justify-center gap-2">
                  � MASUK AKUN
                </span>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              <div className="bg-orange-500 text-white p-3 md:p-4 border-3 md:border-6 border-slate-800 transform rotate-2 shadow-lg">
                <div className="text-2xl md:text-3xl font-black mb-1">50K+</div>
                <div className="font-bold text-xs md:text-sm uppercase">
                  SISWA AKTIF
                </div>
              </div>
              <div className="bg-blue-500 text-white p-3 md:p-4 border-3 md:border-6 border-slate-800 transform -rotate-1 shadow-lg">
                <div className="text-2xl md:text-3xl font-black mb-1">95%</div>
                <div className="font-bold text-xs md:text-sm uppercase">
                  LULUS PTN
                </div>
              </div>
              <div className="bg-violet-500 text-white p-3 md:p-4 border-3 md:border-6 border-slate-800 transform rotate-1 shadow-lg">
                <div className="text-2xl md:text-3xl font-black mb-1">10K+</div>
                <div className="font-bold text-xs md:text-sm uppercase">
                  SOAL PREMIUM
                </div>
              </div>
              <div className="bg-emerald-500 text-white p-3 md:p-4 border-3 md:border-6 border-slate-800 transform -rotate-2 shadow-lg">
                <div className="text-2xl md:text-3xl font-black mb-1">24/7</div>
                <div className="font-bold text-xs md:text-sm uppercase">
                  SUPPORT
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-8 md:mb-12">
            <div className="bg-slate-900 text-orange-300 px-3 md:px-6 py-2 md:py-3 border-3 md:border-6 border-orange-500 transform rotate-2 inline-block mb-4 md:mb-6 shadow-lg">
              <span className="text-sm md:text-lg font-black uppercase tracking-wider">
                MENGAPA PINTUUNIV?
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-slate-900 mb-4 md:mb-6 uppercase leading-none">
              FITUR TERDEPAN
              <br />
              <span className="bg-blue-500 text-white px-2 md:px-3 py-1 md:py-2 border-3 md:border-6 border-slate-800 transform -rotate-1 inline-block shadow-lg">
                UNTUK SUKSES
              </span>
            </h2>
            <div className="bg-emerald-400 text-slate-900 p-3 md:p-4 border-3 md:border-6 border-slate-800 transform rotate-1 max-w-4xl mx-auto shadow-lg">
              <p className="text-sm md:text-base font-black uppercase">
                KAMI MENYEDIAKAN TOOLS DAN METODE PEMBELAJARAN PALING EFEKTIF!
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Feature 1 */}
            <div className="group">
              <div className="bg-orange-400 border-3 md:border-6 border-slate-800 p-4 md:p-6 transform hover:-rotate-2 hover:-translate-y-2 transition-all duration-200 shadow-lg">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-100 border-3 border-slate-800 flex items-center justify-center mb-3 md:mb-4 font-black text-lg md:text-xl">
                  📚
                </div>
                <h3 className="text-lg md:text-xl font-black text-slate-900 mb-2 md:mb-3 uppercase">
                  SOAL BERKUALITAS TINGGI
                </h3>
                <p className="text-slate-900 font-bold leading-tight mb-2 md:mb-3 text-sm md:text-sm">
                  10,000+ soal yang disusun oleh tim ahli, sesuai dengan
                  kisi-kisi UTBK terbaru dan pola soal yang sering keluar.
                </p>
                <div className="bg-slate-900 text-orange-300 px-3 md:px-4 py-1 md:py-2 border-2 md:border-4 border-orange-400 inline-block font-black uppercase text-xs md:text-sm">
                  LIHAT DETAIL →
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group">
              <div className="bg-blue-400 border-3 md:border-6 border-slate-800 p-4 md:p-6 transform hover:rotate-2 hover:-translate-y-2 transition-all duration-200 shadow-lg">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 border-3 border-slate-800 flex items-center justify-center mb-3 md:mb-4 font-black text-lg md:text-xl">
                  🤖
                </div>
                <h3 className="text-lg md:text-xl font-black text-slate-900 mb-2 md:mb-3 uppercase">
                  ANALISIS AI REAL-TIME
                </h3>
                <p className="text-slate-900 font-bold leading-tight mb-2 md:mb-3 text-sm md:text-sm">
                  Sistem AI canggih yang menganalisis pola jawabanmu dan
                  memberikan rekomendasi pembelajaran personal.
                </p>
                <div className="bg-slate-900 text-blue-300 px-3 md:px-4 py-1 md:py-2 border-2 md:border-4 border-blue-400 inline-block font-black uppercase text-xs md:text-sm">
                  COBA SEKARANG →
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group">
              <div className="bg-emerald-400 border-3 md:border-6 border-slate-800 p-4 md:p-6 transform hover:-rotate-1 hover:-translate-y-2 transition-all duration-200 shadow-lg">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-emerald-100 border-3 border-slate-800 flex items-center justify-center mb-3 md:mb-4 font-black text-lg md:text-xl">
                  ⏰
                </div>
                <h3 className="text-lg md:text-xl font-black text-slate-900 mb-2 md:mb-3 uppercase">
                  SIMULASI UJIAN REALISTIS
                </h3>
                <p className="text-slate-900 font-bold leading-tight mb-2 md:mb-3 text-sm md:text-sm">
                  Rasakan pengalaman ujian yang sesungguhnya dengan timer,
                  interface, dan tingkat kesulitan seperti UTBK asli.
                </p>
                <div className="bg-slate-900 text-emerald-300 px-3 md:px-4 py-1 md:py-2 border-2 md:border-4 border-emerald-400 inline-block font-black uppercase text-xs md:text-sm">
                  MULAI SIMULASI →
                </div>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="group">
              <div className="bg-violet-400 border-3 md:border-6 border-slate-800 p-4 md:p-6 transform hover:rotate-1 hover:-translate-y-2 transition-all duration-200 shadow-lg">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-violet-100 border-3 border-slate-800 flex items-center justify-center mb-3 md:mb-4 font-black text-lg md:text-xl">
                  👥
                </div>
                <h3 className="text-lg md:text-xl font-black text-slate-900 mb-2 md:mb-3 uppercase">
                  KOMUNITAS BELAJAR
                </h3>
                <p className="text-slate-900 font-bold leading-tight mb-2 md:mb-3 text-sm md:text-sm">
                  Bergabung dengan ribuan siswa lain, diskusi soal, dan saling
                  mendukung dalam persiapan UTBK.
                </p>
                <div className="bg-slate-900 text-violet-300 px-3 md:px-4 py-1 md:py-2 border-2 md:border-4 border-violet-400 inline-block font-black uppercase text-xs md:text-sm">
                  GABUNG KOMUNITAS →
                </div>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="group">
              <div className="bg-rose-400 border-3 md:border-6 border-slate-800 p-4 md:p-6 transform hover:-rotate-2 hover:-translate-y-2 transition-all duration-200 shadow-lg">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-rose-100 border-3 border-slate-800 flex items-center justify-center mb-3 md:mb-4 font-black text-lg md:text-xl">
                  📊
                </div>
                <h3 className="text-lg md:text-xl font-black text-slate-900 mb-2 md:mb-3 uppercase">
                  TRACKING PROGRESS
                </h3>
                <p className="text-slate-900 font-bold leading-tight mb-2 md:mb-3 text-sm md:text-sm">
                  Pantau perkembangan belajarmu dengan dashboard yang detail dan
                  laporan kemajuan mingguan.
                </p>
                <div className="bg-slate-900 text-rose-300 px-3 md:px-4 py-1 md:py-2 border-2 md:border-4 border-rose-400 inline-block font-black uppercase text-xs md:text-sm">
                  LIHAT PROGRESS →
                </div>
              </div>
            </div>

            {/* Feature 6 */}
            <div className="group">
              <div className="bg-amber-400 border-3 md:border-6 border-slate-800 p-4 md:p-6 transform hover:rotate-2 hover:-translate-y-2 transition-all duration-200 shadow-lg">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-amber-100 border-3 border-slate-800 flex items-center justify-center mb-3 md:mb-4 font-black text-lg md:text-xl">
                  👨‍🏫
                </div>
                <h3 className="text-lg md:text-xl font-black text-slate-900 mb-2 md:mb-3 uppercase">
                  MENTOR PERSONAL
                </h3>
                <p className="text-slate-900 font-bold leading-tight mb-2 md:mb-3 text-sm md:text-sm">
                  Dapatkan bimbingan langsung dari mentor berpengalaman yang
                  siap membantu strategi belajarmu.
                </p>
                <div className="bg-slate-900 text-amber-300 px-3 md:px-4 py-1 md:py-2 border-2 md:border-4 border-amber-400 inline-block font-black uppercase text-xs md:text-sm">
                  CHAT MENTOR →
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 md:py-20 bg-slate-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <div className="bg-orange-400 text-slate-900 px-3 md:px-6 py-2 md:py-3 border-3 md:border-6 border-white transform rotate-2 inline-block mb-4 md:mb-6 shadow-lg">
              <span className="text-sm md:text-lg font-black uppercase tracking-wider">
                PENCAPAIAN KAMI
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-white mb-4 md:mb-6 uppercase leading-none">
              HASIL NYATA
              <br />
              <span className="bg-emerald-500 text-white px-2 md:px-3 py-1 md:py-2 border-3 md:border-6 border-orange-400 transform -rotate-1 inline-block shadow-lg">
                YANG MEMBANGGAKAN
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <div className="bg-orange-400 text-slate-900 p-4 md:p-6 border-3 md:border-6 border-white transform hover:rotate-3 transition-all duration-200 shadow-lg">
              <div className="text-2xl md:text-4xl font-black mb-2">98%</div>
              <div className="font-bold text-xs md:text-sm uppercase">
                Tingkat Kepuasan
              </div>
            </div>
            <div className="bg-blue-400 text-slate-900 p-4 md:p-6 border-3 md:border-6 border-white transform hover:-rotate-3 transition-all duration-200 shadow-lg">
              <div className="text-2xl md:text-4xl font-black mb-2">89%</div>
              <div className="font-bold text-xs md:text-sm uppercase">
                Lolos SNBT
              </div>
            </div>
            <div className="bg-emerald-400 text-slate-900 p-4 md:p-6 border-3 md:border-6 border-white transform hover:rotate-2 transition-all duration-200 shadow-lg">
              <div className="text-2xl md:text-4xl font-black mb-2">15K+</div>
              <div className="font-bold text-xs md:text-sm uppercase">
                Alumni Sukses
              </div>
            </div>
            <div className="bg-violet-400 text-slate-900 p-4 md:p-6 border-3 md:border-6 border-white transform hover:-rotate-2 transition-all duration-200 shadow-lg">
              <div className="text-2xl md:text-4xl font-black mb-2">500+</div>
              <div className="font-bold text-xs md:text-sm uppercase">
                PTN Partner
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 md:py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <div className="bg-slate-900 text-orange-300 px-3 md:px-6 py-2 md:py-3 border-3 md:border-6 border-emerald-500 transform -rotate-2 inline-block mb-4 md:mb-6 shadow-lg">
              <span className="text-sm md:text-lg font-black uppercase tracking-wider">
                KATA MEREKA
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-slate-900 mb-4 md:mb-6 uppercase leading-none">
              TESTIMONI
              <br />
              <span className="bg-rose-500 text-white px-2 md:px-3 py-1 md:py-2 border-3 md:border-6 border-slate-800 transform rotate-1 inline-block shadow-lg">
                ALUMNI SUKSES
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <div className="bg-orange-400 border-3 md:border-6 border-slate-800 p-4 md:p-6 transform hover:-rotate-1 hover:-translate-y-2 transition-all duration-200 shadow-lg">
              <div className="flex items-center mb-3 md:mb-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-100 border-3 border-slate-800 rounded-full flex items-center justify-center mr-3 font-black text-lg">
                  👩
                </div>
                <div>
                  <h4 className="font-black text-slate-900 text-sm md:text-base">
                    SARAH PUTRI
                  </h4>
                  <p className="text-slate-800 font-bold text-xs md:text-sm">
                    UI - Fakultas Kedokteran
                  </p>
                </div>
              </div>
              <p className="text-slate-900 font-bold text-xs md:text-sm leading-tight">
                "PintuUniv benar-benar game changer! Soal-soalnya mirip banget
                sama UTBK asli. Analisis AI-nya membantu banget ngasih tau
                kelemahan aku di mana."
              </p>
              <div className="flex mt-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-500 text-lg">
                    ⭐
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-blue-400 border-3 md:border-6 border-slate-800 p-4 md:p-6 transform hover:rotate-1 hover:-translate-y-2 transition-all duration-200 shadow-lg">
              <div className="flex items-center mb-3 md:mb-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 border-3 border-slate-800 rounded-full flex items-center justify-center mr-3 font-black text-lg">
                  👨
                </div>
                <div>
                  <h4 className="font-black text-slate-900 text-sm md:text-base">
                    BUDI SANTOSO
                  </h4>
                  <p className="text-slate-800 font-bold text-xs md:text-sm">
                    ITB - Teknik Informatika
                  </p>
                </div>
              </div>
              <p className="text-slate-900 font-bold text-xs md:text-sm leading-tight">
                "Mentor personalnya luar biasa! Selalu siap bantu 24/7. Berkat
                PintuUniv, aku bisa lolos ITB dengan skor yang memuaskan."
              </p>
              <div className="flex mt-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-500 text-lg">
                    ⭐
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-emerald-400 border-3 md:border-6 border-slate-800 p-4 md:p-6 transform hover:-rotate-2 hover:-translate-y-2 transition-all duration-200 shadow-lg">
              <div className="flex items-center mb-3 md:mb-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-emerald-100 border-3 border-slate-800 rounded-full flex items-center justify-center mr-3 font-black text-lg">
                  👩
                </div>
                <div>
                  <h4 className="font-black text-slate-900 text-sm md:text-base">
                    MAYA SARI
                  </h4>
                  <p className="text-slate-800 font-bold text-xs md:text-sm">
                    UGM - Fakultas Hukum
                  </p>
                </div>
              </div>
              <p className="text-slate-900 font-bold text-xs md:text-sm leading-tight">
                "Fitur simulasi ujiannya keren banget! Bikin aku udah terbiasa
                sama tekanan waktu sebelum UTBK. Hasilnya? Alhamdulillah
                keterima di UGM!"
              </p>
              <div className="flex mt-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-500 text-lg">
                    ⭐
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* University Partners Section */}
      <section className="py-16 md:py-20 bg-orange-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <div className="bg-slate-900 text-orange-300 px-3 md:px-6 py-2 md:py-3 border-3 md:border-6 border-violet-500 transform rotate-1 inline-block mb-4 md:mb-6 shadow-lg">
              <span className="text-sm md:text-lg font-black uppercase tracking-wider">
                MITRA UNIVERSITAS
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-slate-900 mb-4 md:mb-6 uppercase leading-none">
              PTN TERBAIK
              <br />
              <span className="bg-blue-500 text-white px-2 md:px-3 py-1 md:py-2 border-3 md:border-6 border-slate-800 transform -rotate-1 inline-block shadow-lg">
                MENUNGGU KAMU
              </span>
            </h2>
            <div className="bg-emerald-400 text-slate-900 p-3 md:p-4 border-3 md:border-6 border-slate-800 transform rotate-2 max-w-4xl mx-auto shadow-lg">
              <p className="text-sm md:text-base font-black uppercase">
                SISWA PINTUUNIV BERHASIL MASUK KE PTN TOP INDONESIA!
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
            {[
              "UI",
              "ITB",
              "UGM",
              "IPB",
              "ITS",
              "UNAIR",
              "UNDIP",
              "UNPAD",
              "USU",
              "UNHAS",
              "UNSRI",
              "UNAND",
            ].map((univ, index) => (
              <div
                key={index}
                className={`bg-white border-3 border-slate-800 p-3 md:p-4 transform hover:rotate-${
                  index % 2 ? "2" : "-2"
                } hover:-translate-y-1 transition-all duration-200 shadow-lg text-center`}
              >
                <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-orange-400 to-blue-400 border-2 border-slate-800 mx-auto mb-2 flex items-center justify-center font-black text-xs md:text-sm text-white">
                  🎓
                </div>
                <h4 className="font-black text-slate-900 text-xs md:text-sm">
                  {univ}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Tryout Simulation Section */}
      <TryoutSimulation />

      {/* Pricing Section */}
      <section
        id="pricing"
        className="py-16 md:py-20 bg-orange-50 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-8 md:mb-12">
            <div className="bg-slate-900 text-orange-300 px-3 md:px-6 py-2 md:py-3 border-3 md:border-6 border-orange-500 transform -rotate-2 inline-block mb-4 md:mb-6 shadow-lg">
              <span className="text-sm md:text-lg font-black uppercase tracking-wider">
                PILIH PAKETMU!
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-slate-900 mb-4 md:mb-6 uppercase leading-none">
              HARGA TERJANGKAU
              <br />
              <span className="bg-blue-500 text-white px-2 md:px-3 py-1 md:py-2 border-3 md:border-6 border-slate-800 transform rotate-1 inline-block shadow-lg">
                KUALITAS PREMIUM
              </span>
            </h2>
            <div className="bg-emerald-400 text-slate-900 p-3 md:p-4 border-3 md:border-6 border-slate-800 transform -rotate-1 max-w-4xl mx-auto shadow-lg">
              <p className="text-sm md:text-base font-black uppercase">
                INVESTASI TERBAIK UNTUK MASA DEPANMU!
              </p>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid lg:grid-cols-3 gap-4 md:gap-6">
            {/* Basic Plan */}
            <div className="group">
              <div className="bg-white border-3 md:border-6 border-slate-800 p-4 md:p-6 transform hover:-rotate-1 hover:-translate-y-4 transition-all duration-300 shadow-lg">
                <div className="text-center mb-4 md:mb-6">
                  <div className="bg-blue-400 text-slate-900 px-3 md:px-4 py-1 md:py-2 border-2 md:border-3 border-slate-800 inline-block mb-2 md:mb-3 font-black uppercase text-xs md:text-sm">
                    BASIC
                  </div>
                  <div className="mb-2 md:mb-3">
                    <span className="text-3xl md:text-4xl font-black text-slate-900">
                      49K
                    </span>
                    <span className="text-sm md:text-lg font-black text-slate-600">
                      /BULAN
                    </span>
                  </div>
                  <p className="text-slate-900 font-bold text-xs md:text-sm">
                    Untuk siswa yang baru memulai persiapan
                  </p>
                </div>

                <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                  <div className="flex items-center">
                    <div className="w-4 h-4 md:w-5 md:h-5 bg-emerald-400 border-2 border-slate-800 flex items-center justify-center mr-2 md:mr-3">
                      <span className="text-slate-900 font-black text-xs">
                        ✓
                      </span>
                    </div>
                    <span className="text-slate-900 font-bold text-xs md:text-sm">
                      1,000 soal latihan
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 md:w-5 md:h-5 bg-emerald-400 border-2 border-slate-800 flex items-center justify-center mr-2 md:mr-3">
                      <span className="text-slate-900 font-black text-xs">
                        ✓
                      </span>
                    </div>
                    <span className="text-slate-900 font-bold text-xs md:text-sm">
                      3 tryout gratis per bulan
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 md:w-5 md:h-5 bg-emerald-400 border-2 border-slate-800 flex items-center justify-center mr-2 md:mr-3">
                      <span className="text-slate-900 font-black text-xs">
                        ✓
                      </span>
                    </div>
                    <span className="text-slate-900 font-bold text-xs md:text-sm">
                      Progress tracking basic
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 md:w-5 md:h-5 bg-emerald-400 border-2 border-slate-800 flex items-center justify-center mr-2 md:mr-3">
                      <span className="text-slate-900 font-black text-xs">
                        ✓
                      </span>
                    </div>
                    <span className="text-slate-900 font-bold text-xs md:text-sm">
                      Akses forum komunitas
                    </span>
                  </div>
                </div>

                <button className="w-full bg-blue-500 text-white py-3 md:py-4 border-3 md:border-6 border-slate-800 font-black uppercase text-xs md:text-sm hover:bg-blue-600 transition-colors shadow-lg">
                  PILIH BASIC →
                </button>
              </div>
            </div>

            {/* Pro Plan - Featured */}
            <div className="group relative">
              <div className="absolute -top-2 md:-top-3 left-1/2 transform -translate-x-1/2">
                <div className="bg-orange-500 text-white px-3 md:px-4 py-1 md:py-2 border-2 md:border-3 border-slate-800 font-black uppercase text-xs shadow-lg transform rotate-3">
                  PALING POPULER!
                </div>
              </div>
              <div className="bg-orange-400 border-3 md:border-6 border-slate-800 p-4 md:p-6 transform hover:rotate-1 hover:-translate-y-4 transition-all duration-300 shadow-lg">
                <div className="text-center mb-4 md:mb-6">
                  <div className="bg-orange-100 text-slate-900 px-3 md:px-4 py-1 md:py-2 border-2 md:border-3 border-slate-800 inline-block mb-2 md:mb-3 font-black uppercase text-xs md:text-sm">
                    PRO
                  </div>
                  <div className="mb-2 md:mb-3">
                    <span className="text-3xl md:text-4xl font-black text-white">
                      99K
                    </span>
                    <span className="text-sm md:text-lg font-black text-slate-900">
                      /BULAN
                    </span>
                  </div>
                  <p className="text-slate-900 font-bold text-xs md:text-sm">
                    Untuk siswa yang serius ingin lolos UTBK
                  </p>
                </div>

                <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                  <div className="flex items-center">
                    <div className="w-4 h-4 md:w-5 md:h-5 bg-emerald-400 border-2 border-slate-800 flex items-center justify-center mr-2 md:mr-3">
                      <span className="text-slate-900 font-black text-xs">
                        ✓
                      </span>
                    </div>
                    <span className="text-white font-bold text-xs md:text-sm">
                      10,000+ soal premium
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 md:w-5 md:h-5 bg-emerald-400 border-2 border-slate-800 flex items-center justify-center mr-2 md:mr-3">
                      <span className="text-slate-900 font-black text-xs">
                        ✓
                      </span>
                    </div>
                    <span className="text-white font-bold text-xs md:text-sm">
                      Unlimited tryout
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 md:w-5 md:h-5 bg-emerald-400 border-2 border-slate-800 flex items-center justify-center mr-2 md:mr-3">
                      <span className="text-slate-900 font-black text-xs">
                        ✓
                      </span>
                    </div>
                    <span className="text-white font-bold text-xs md:text-sm">
                      AI Analysis lengkap
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 md:w-5 md:h-5 bg-emerald-400 border-2 border-slate-800 flex items-center justify-center mr-2 md:mr-3">
                      <span className="text-slate-900 font-black text-xs">
                        ✓
                      </span>
                    </div>
                    <span className="text-white font-bold text-xs md:text-sm">
                      Video pembahasan eksklusif
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 md:w-5 md:h-5 bg-emerald-400 border-2 border-slate-800 flex items-center justify-center mr-2 md:mr-3">
                      <span className="text-slate-900 font-black text-xs">
                        ✓
                      </span>
                    </div>
                    <span className="text-white font-bold text-xs md:text-sm">
                      Mentor konsultasi 24/7
                    </span>
                  </div>
                </div>

                <button className="w-full bg-orange-100 text-slate-900 py-3 md:py-4 border-3 md:border-6 border-slate-800 font-black uppercase text-xs md:text-sm hover:bg-white transition-colors shadow-lg">
                  PILIH PRO →
                </button>
              </div>
            </div>

            {/* Premium Plan */}
            <div className="group">
              <div className="bg-violet-400 border-3 md:border-6 border-slate-800 p-4 md:p-6 transform hover:rotate-1 hover:-translate-y-4 transition-all duration-300 shadow-lg">
                <div className="text-center mb-4 md:mb-6">
                  <div className="bg-violet-100 text-slate-900 px-3 md:px-4 py-1 md:py-2 border-2 md:border-3 border-slate-800 inline-block mb-2 md:mb-3 font-black uppercase text-xs md:text-sm">
                    PREMIUM
                  </div>
                  <div className="mb-2 md:mb-3">
                    <span className="text-3xl md:text-4xl font-black text-white">
                      199K
                    </span>
                    <span className="text-sm md:text-lg font-black text-slate-900">
                      /BULAN
                    </span>
                  </div>
                  <p className="text-slate-900 font-bold text-sm md:text-base">
                    Untuk siswa yang ingin jaminan lolos PTN favorit
                  </p>
                </div>

                <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                  <div className="flex items-center">
                    <div className="w-5 h-5 md:w-6 md:h-6 bg-emerald-400 border-2 border-slate-800 flex items-center justify-center mr-3">
                      <span className="text-slate-900 font-black text-xs md:text-sm">
                        ✓
                      </span>
                    </div>
                    <span className="text-white font-bold text-sm md:text-base">
                      Semua fitur PRO
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-5 h-5 md:w-6 md:h-6 bg-emerald-400 border-2 border-slate-800 flex items-center justify-center mr-3">
                      <span className="text-slate-900 font-black text-xs md:text-sm">
                        ✓
                      </span>
                    </div>
                    <span className="text-white font-bold text-sm md:text-base">
                      Mentor personal 1-on-1
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-5 h-5 md:w-6 md:h-6 bg-emerald-400 border-2 border-slate-800 flex items-center justify-center mr-3">
                      <span className="text-slate-900 font-black text-xs md:text-sm">
                        ✓
                      </span>
                    </div>
                    <span className="text-white font-bold text-sm md:text-base">
                      Live class eksklusif
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-5 h-5 md:w-6 md:h-6 bg-emerald-400 border-2 border-slate-800 flex items-center justify-center mr-3">
                      <span className="text-slate-900 font-black text-xs md:text-sm">
                        ✓
                      </span>
                    </div>
                    <span className="text-white font-bold text-sm md:text-base">
                      Garansi nilai minimal
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-5 h-5 md:w-6 md:h-6 bg-emerald-400 border-2 border-slate-800 flex items-center justify-center mr-3">
                      <span className="text-slate-900 font-black text-xs md:text-sm">
                        ✓
                      </span>
                    </div>
                    <span className="text-white font-bold text-xs md:text-sm">
                      Akses selamanya
                    </span>
                  </div>
                </div>

                <button className="w-full bg-violet-100 text-slate-900 py-3 md:py-4 border-3 md:border-6 border-slate-800 font-black uppercase text-xs md:text-sm hover:bg-white transition-colors shadow-lg">
                  PILIH PREMIUM →
                </button>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-8 md:mt-12">
            <div className="bg-slate-900 text-orange-300 p-4 md:p-6 border-3 md:border-6 border-orange-500 transform rotate-2 max-w-2xl mx-auto shadow-lg">
              <p className="text-sm md:text-lg font-black uppercase mb-2 md:mb-3">
                🎉 SPECIAL OFFER! 🎉
              </p>
              <p className="text-xs md:text-sm font-bold mb-3 md:mb-4">
                Daftar sekarang dan dapatkan 7 hari gratis untuk semua paket!
              </p>
              <button className="bg-orange-500 text-white px-4 md:px-6 py-2 md:py-3 border-2 md:border-3 border-orange-300 font-black uppercase hover:bg-orange-600 transition-colors text-xs md:text-sm">
                KLAIM TRIAL GRATIS →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20 bg-slate-900 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <div className="bg-orange-400 text-slate-900 px-3 md:px-6 py-2 md:py-3 border-3 md:border-6 border-white transform -rotate-1 inline-block mb-4 md:mb-6 shadow-lg">
              <span className="text-sm md:text-lg font-black uppercase tracking-wider">
                PERTANYAAN UMUM
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-white mb-4 md:mb-6 uppercase leading-none">
              FAQ
              <br />
              <span className="bg-emerald-500 text-white px-2 md:px-3 py-1 md:py-2 border-3 md:border-6 border-orange-400 transform rotate-2 inline-block shadow-lg">
                SEPUTAR PINTUUNIV
              </span>
            </h2>
          </div>

          <div className="space-y-4 md:space-y-6">
            <div className="bg-white border-3 md:border-6 border-orange-400 p-4 md:p-6 transform hover:rotate-1 transition-all duration-200 shadow-lg">
              <h3 className="font-black text-slate-900 text-sm md:text-base mb-2 md:mb-3 uppercase">
                🤔 APAKAH SOAL-SOAL DI PINTUUNIV SESUAI DENGAN UTBK ASLI?
              </h3>
              <p className="text-slate-800 font-bold text-xs md:text-sm leading-relaxed">
                Ya! Semua soal disusun oleh tim ahli yang berpengalaman dalam
                UTBK dan disesuaikan dengan kisi-kisi terbaru. Soal-soal kami
                juga rutin diupdate mengikuti perkembangan UTBK.
              </p>
            </div>

            <div className="bg-white border-3 md:border-6 border-blue-400 p-4 md:p-6 transform hover:-rotate-1 transition-all duration-200 shadow-lg">
              <h3 className="font-black text-slate-900 text-sm md:text-base mb-2 md:mb-3 uppercase">
                💰 BAGAIMANA SISTEM PEMBAYARANNYA?
              </h3>
              <p className="text-slate-800 font-bold text-xs md:text-sm leading-relaxed">
                Kami menerima berbagai metode pembayaran: Transfer bank,
                e-wallet (GoPay, Dana, OVO), dan kartu kredit. Pembayaran dapat
                dilakukan bulanan atau tahunan dengan diskon menarik.
              </p>
            </div>

            <div className="bg-white border-3 md:border-6 border-emerald-400 p-4 md:p-6 transform hover:rotate-1 transition-all duration-200 shadow-lg">
              <h3 className="font-black text-slate-900 text-sm md:text-base mb-2 md:mb-3 uppercase">
                📱 APAKAH BISA DIAKSES MELALUI HP?
              </h3>
              <p className="text-slate-800 font-bold text-xs md:text-sm leading-relaxed">
                Tentu saja! PintuUniv dapat diakses melalui website yang
                mobile-friendly dan aplikasi mobile khusus. Kamu bisa belajar
                kapan saja, di mana saja.
              </p>
            </div>

            <div className="bg-white border-3 md:border-6 border-violet-400 p-4 md:p-6 transform hover:-rotate-1 transition-all duration-200 shadow-lg">
              <h3 className="font-black text-slate-900 text-sm md:text-base mb-2 md:mb-3 uppercase">
                🎯 BAGAIMANA CARA KERJA AI ANALYSIS?
              </h3>
              <p className="text-slate-800 font-bold text-xs md:text-sm leading-relaxed">
                AI kami menganalisis pola jawaban, kecepatan mengerjakan, dan
                tingkat kesulitan soal yang sering salah. Kemudian memberikan
                rekomendasi materi yang perlu dipelajari lebih intensif.
              </p>
            </div>

            <div className="bg-white border-3 md:border-6 border-rose-400 p-4 md:p-6 transform hover:rotate-1 transition-all duration-200 shadow-lg">
              <h3 className="font-black text-slate-900 text-sm md:text-base mb-2 md:mb-3 uppercase">
                🏆 APA GARANSI YANG DIBERIKAN?
              </h3>
              <p className="text-slate-800 font-bold text-xs md:text-sm leading-relaxed">
                Untuk paket Premium, kami memberikan garansi nilai minimal. Jika
                tidak tercapai, kami akan memberikan bimbingan tambahan gratis
                hingga target tercapai.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-orange-400 to-orange-500 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-slate-900 text-orange-300 px-4 md:px-6 py-2 md:py-3 border-3 md:border-6 border-white transform rotate-2 inline-block mb-4 md:mb-6 shadow-lg">
            <span className="text-sm md:text-lg font-black uppercase tracking-wider">
              SIAP MULAI?
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-white mb-4 md:mb-6 uppercase leading-none">
            WUJUDKAN IMPIAN
            <br />
            <span className="bg-white text-slate-900 px-2 md:px-3 py-1 md:py-2 border-3 md:border-6 border-slate-800 transform -rotate-1 inline-block shadow-lg">
              KULIAH DI PTN
            </span>
          </h2>
          <p className="text-white font-bold text-sm md:text-base mb-6 md:mb-8 max-w-2xl mx-auto">
            Bergabunglah dengan ribuan siswa yang telah merasakan manfaat
            belajar di PintuUniv. Jangan sia-siakan kesempatan emas ini!
          </p>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-6 md:mb-8">
            <button className="bg-white text-slate-900 px-6 md:px-8 py-3 md:py-4 font-black text-sm md:text-base uppercase border-3 md:border-6 border-slate-800 transform hover:-rotate-1 hover:-translate-y-2 transition-all duration-200 shadow-lg">
              🚀 DAFTAR SEKARANG
            </button>
            <button className="bg-slate-900 text-orange-400 px-6 md:px-8 py-3 md:py-4 font-black text-sm md:text-base uppercase border-3 md:border-6 border-white transform hover:rotate-1 hover:-translate-y-2 transition-all duration-200 shadow-lg">
              📞 HUBUNGI KAMI
            </button>
          </div>

          <div className="bg-white text-slate-900 p-3 md:p-4 border-3 md:border-6 border-slate-800 transform -rotate-1 inline-block shadow-lg">
            <p className="font-black text-xs md:text-sm uppercase">
              ⏰ PROMO TERBATAS! DAFTAR HARI INI DAPAT DISKON 50%
            </p>
          </div>
        </div>
      </section>

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
              <a
                href="#"
                className="text-white font-bold hover:text-orange-400 transition-colors border-b-2 border-transparent hover:border-orange-400 pb-1 text-xs md:text-sm"
              >
                PRIVACY POLICY
              </a>
              <a
                href="#"
                className="text-white font-bold hover:text-orange-400 transition-colors border-b-2 border-transparent hover:border-orange-400 pb-1 text-xs md:text-sm"
              >
                TERMS OF SERVICE
              </a>
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
    </div>
  );
}
