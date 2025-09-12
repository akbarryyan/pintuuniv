"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  ArrowLeft,
  Clock,
  BookOpen,
  CheckCircle,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Flag,
  Eye,
  EyeOff,
} from "lucide-react";
import HeaderNavigation from "@/components/HeaderNavigation";
import MobileFriendlyHeader from "@/components/MobileFriendlyHeader";

interface Answer {
  id: string;
  text: string;
}

interface Question {
  id: number;
  question_text: string;
  question_image?: string;
  answers: Answer[];
  correct_answer_id?: string;
  user_answer_id?: string;
  is_flagged?: boolean;
  question_number: number;
}

interface CategoryData {
  id: number;
  name: string;
  description: string;
  total_questions: number;
  duration_minutes: number;
  questions: Question[];
}

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();
  const tryoutId = params.id as string;
  const categoryId = params.categoryId as string;

  const [categoryData, setCategoryData] = useState<CategoryData | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(
    new Set()
  );
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showQuestionNavigation, setShowQuestionNavigation] = useState(false);
  const [userData, setUserData] = useState({
    name: "User",
    avatar: "👨‍🎓",
    id: null as number | null,
  });

  // Load user data
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const storedUserData = localStorage.getItem("userData");
        if (storedUserData) {
          const parsedData = JSON.parse(storedUserData);
          setUserData({
            name: parsedData.name || "User",
            avatar: parsedData.avatar || "👨‍🎓",
            id: parsedData.id || null,
          });
        }
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  }, []);

  // Load category data
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Mock data untuk UI - nanti diganti dengan API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const mockQuestions: Question[] = Array.from(
          { length: 40 },
          (_, i) => ({
            id: i + 1,
            question_number: i + 1,
            question_text: `Pertanyaan ${
              i + 1
            }: Sebuah contoh soal Tes Potensi Skolastik yang menguji kemampuan analisis dan logika. Perhatikan pola berikut dan tentukan jawaban yang paling tepat berdasarkan analisis yang mendalam.`,
            question_image:
              i % 5 === 0 ? "/images/question-sample.jpg" : undefined,
            answers: [
              { id: "a", text: `Pilihan A untuk soal ${i + 1}` },
              { id: "b", text: `Pilihan B untuk soal ${i + 1}` },
              { id: "c", text: `Pilihan C untuk soal ${i + 1}` },
              { id: "d", text: `Pilihan D untuk soal ${i + 1}` },
              { id: "e", text: `Pilihan E untuk soal ${i + 1}` },
            ],
          })
        );

        const mockData: CategoryData = {
          id: parseInt(categoryId),
          name: "Tes Potensi Skolastik (TPS)",
          description:
            "Mengukur kemampuan kognitif yang dianggap penting untuk keberhasilan di sekolah formal",
          total_questions: 40,
          duration_minutes: 60,
          questions: mockQuestions,
        };

        setCategoryData(mockData);
        setTimeRemaining(mockData.duration_minutes * 60); // Convert to seconds
      } catch (error) {
        console.error("Error fetching category data:", error);
        setError("Gagal memuat data kategori");
        toast.error("Gagal memuat data kategori");
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 800);
      }
    };

    if (tryoutId && categoryId) {
      fetchCategoryData();
    }
  }, [tryoutId, categoryId]);

  // Timer countdown
  useEffect(() => {
    if (timeRemaining > 0 && !isLoading) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            handleFinishCategory();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeRemaining, isLoading]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleAnswer = (questionId: number, answerId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answerId,
    }));
  };

  const handleFlagQuestion = (questionId: number) => {
    setFlaggedQuestions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNextQuestion = () => {
    if (
      categoryData &&
      currentQuestionIndex < categoryData.questions.length - 1
    ) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleGoToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
    setShowQuestionNavigation(false);
  };

  const handleFinishCategory = () => {
    // Simpan jawaban dan arahkan ke halaman hasil
    toast.success("Kategori selesai dikerjakan!");
    router.push(`/tryout/${tryoutId}/category/${categoryId}/result`);
  };

  const handleBack = () => {
    if (confirm("Yakin ingin keluar? Progress akan hilang!")) {
      router.push(`/tryout/${tryoutId}`);
    }
  };

  const getQuestionStatus = (index: number) => {
    const question = categoryData?.questions[index];
    if (!question) return "unanswered";

    const hasAnswer = answers[question.id];
    const isFlagged = flaggedQuestions.has(question.id);

    if (hasAnswer && isFlagged) return "answered-flagged";
    if (hasAnswer) return "answered";
    if (isFlagged) return "flagged";
    return "unanswered";
  };

  const getAnsweredCount = () => {
    if (!categoryData) return 0;
    return categoryData.questions.filter((q) => answers[q.id]).length;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-emerald-50">
        {/* Headers */}
        <div className="hidden md:block">
          <HeaderNavigation currentPage="tryouts" userInfo={userData} />
        </div>
        <div className="block md:hidden">
          <MobileFriendlyHeader userInfo={userData} showMobileMenu={false} />
        </div>

        <div className="max-w-6xl mx-auto px-4 py-6">
          {/* Header Skeleton */}
          <div className="bg-gray-100 border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-6 animate-pulse">
            <div className="flex justify-between items-center">
              <div className="h-6 bg-gray-300 border border-black rounded w-1/3"></div>
              <div className="h-8 bg-gray-300 border border-black rounded w-20"></div>
            </div>
          </div>

          {/* Question Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <div className="bg-gray-100 border-2 border-black p-6 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] animate-pulse">
                <div className="h-6 bg-gray-300 border border-black rounded w-full mb-4"></div>
                <div className="h-4 bg-gray-300 border border-black rounded w-3/4 mb-6"></div>
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="h-12 bg-gray-300 border border-black rounded"
                    ></div>
                  ))}
                </div>
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="bg-gray-100 border-2 border-black p-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] animate-pulse">
                <div className="h-6 bg-gray-300 border border-black rounded w-full mb-4"></div>
                <div className="grid grid-cols-5 gap-2">
                  {Array.from({ length: 25 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-8 bg-gray-300 border border-black rounded"
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !categoryData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-emerald-50">
        {/* Headers */}
        <div className="hidden md:block">
          <HeaderNavigation currentPage="tryouts" userInfo={userData} />
        </div>
        <div className="block md:hidden">
          <MobileFriendlyHeader userInfo={userData} showMobileMenu={false} />
        </div>

        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="bg-white border-2 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-center">
            <div className="text-red-500 text-4xl mb-3">⚠️</div>
            <p className="font-black text-slate-900 mb-2">
              Gagal Memuat Kategori
            </p>
            <p className="text-slate-600 text-sm mb-4">
              {error || "Kategori tidak ditemukan"}
            </p>
            <button
              onClick={handleBack}
              className="bg-blue-500 text-white px-4 py-2 font-black text-sm border-2 border-black hover:bg-blue-600 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            >
              Kembali
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = categoryData.questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-emerald-50">
      {/* Desktop Header */}
      <div className="hidden md:block">
        <HeaderNavigation currentPage="tryouts" userInfo={userData} />
      </div>

      {/* Mobile Header */}
      <div className="block md:hidden">
        <MobileFriendlyHeader userInfo={userData} showMobileMenu={false} />
      </div>

      {/* Top Bar */}
      <div className="bg-white border-b-2 border-black shadow-[0px_2px_0px_0px_rgba(0,0,0,1)] sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={handleBack}
                className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-bold transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="hidden sm:inline">Keluar</span>
              </button>
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-slate-600" />
                <span className="font-black text-slate-900 text-sm sm:text-base">
                  {categoryData.name}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm font-bold">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-slate-700">
                  {getAnsweredCount()}/{categoryData.total_questions}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-red-100 px-3 py-1 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <Clock className="h-4 w-4 text-red-600" />
                <span className="font-black text-red-700 text-sm">
                  {formatTime(timeRemaining)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Question Content */}
          <div className="lg:col-span-3">
            <div className="bg-white border-2 border-black p-6 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              {/* Question Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-slate-900 text-white w-10 h-10 rounded-full flex items-center justify-center font-black border-2 border-black">
                    {currentQuestion.question_number}
                  </div>
                  <h2 className="font-black text-slate-900 text-lg">
                    Soal {currentQuestion.question_number}
                  </h2>
                </div>

                <button
                  onClick={() => handleFlagQuestion(currentQuestion.id)}
                  className={`p-2 border-2 border-black transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                    flaggedQuestions.has(currentQuestion.id)
                      ? "bg-yellow-400 text-yellow-900"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                  title="Tandai soal"
                >
                  <Flag className="h-4 w-4" />
                </button>
              </div>

              {/* Question Text */}
              <div className="mb-6">
                <p className="text-slate-800 font-bold leading-relaxed">
                  {currentQuestion.question_text}
                </p>
                {currentQuestion.question_image && (
                  <div className="mt-4 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <img
                      src={currentQuestion.question_image}
                      alt="Question Image"
                      className="w-full h-auto"
                    />
                  </div>
                )}
              </div>

              {/* Answer Options */}
              <div className="space-y-3">
                {currentQuestion.answers.map((answer) => (
                  <label
                    key={answer.id}
                    className={`block p-4 border-2 border-black cursor-pointer transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] ${
                      answers[currentQuestion.id] === answer.id
                        ? "bg-blue-100 border-blue-500"
                        : "bg-gray-50 hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name={`question-${currentQuestion.id}`}
                        value={answer.id}
                        checked={answers[currentQuestion.id] === answer.id}
                        onChange={() =>
                          handleAnswer(currentQuestion.id, answer.id)
                        }
                        className="w-4 h-4 text-blue-600"
                      />
                      <div className="flex items-center gap-3">
                        <div className="bg-slate-900 text-white w-8 h-8 rounded-full flex items-center justify-center font-black text-sm border-2 border-black">
                          {answer.id.toUpperCase()}
                        </div>
                        <span className="font-bold text-slate-800">
                          {answer.text}
                        </span>
                      </div>
                    </div>
                  </label>
                ))}
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t-2 border-gray-200">
                <button
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                  className={`flex items-center gap-2 px-4 py-2 font-black text-sm border-2 border-black transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                    currentQuestionIndex === 0
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Sebelumnya
                </button>

                <span className="font-bold text-slate-600 text-sm">
                  {currentQuestionIndex + 1} dari {categoryData.total_questions}
                </span>

                {currentQuestionIndex === categoryData.questions.length - 1 ? (
                  <button
                    onClick={handleFinishCategory}
                    className="flex items-center gap-2 bg-green-500 text-white px-6 py-2 font-black text-sm border-2 border-black hover:bg-green-600 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  >
                    <CheckCircle className="h-4 w-4" />
                    Selesai
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 font-black text-sm border-2 border-black hover:bg-blue-600 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  >
                    Selanjutnya
                    <ChevronRight className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Question Navigation Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sticky top-24">
              <div className="p-4 border-b-2 border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-black text-slate-900 text-sm">
                    NAVIGASI SOAL
                  </h3>
                  <button
                    onClick={() =>
                      setShowQuestionNavigation(!showQuestionNavigation)
                    }
                    className="lg:hidden p-1 hover:bg-gray-100 border border-black"
                  >
                    {showQuestionNavigation ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>

                <div className="flex items-center gap-4 text-xs font-bold">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-green-400 border border-black"></div>
                    <span>Dijawab</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-yellow-400 border border-black"></div>
                    <span>Ditandai</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-gray-200 border border-black"></div>
                    <span>Kosong</span>
                  </div>
                </div>
              </div>

              <div
                className={`p-4 ${
                  showQuestionNavigation ? "block" : "hidden lg:block"
                }`}
              >
                <div className="grid grid-cols-5 gap-2">
                  {categoryData.questions.map((question, index) => {
                    const status = getQuestionStatus(index);
                    let bgColor = "bg-gray-200";

                    if (status === "answered") bgColor = "bg-green-400";
                    else if (status === "flagged") bgColor = "bg-yellow-400";
                    else if (status === "answered-flagged")
                      bgColor = "bg-orange-400";

                    return (
                      <button
                        key={question.id}
                        onClick={() => handleGoToQuestion(index)}
                        className={`w-8 h-8 ${bgColor} border-2 border-black font-black text-xs transition-all hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] ${
                          currentQuestionIndex === index
                            ? "ring-2 ring-blue-500"
                            : ""
                        }`}
                      >
                        {question.question_number}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
