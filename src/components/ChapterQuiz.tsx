import React, { useState } from 'react';
import { CheckCircle2, XCircle, RotateCcw, Eye, EyeOff } from 'lucide-react';
import type { QuizQuestion } from '../data/healthTopics';

interface ChapterQuizProps {
  topicId: string;
  topicTitle: string;
  questions: QuizQuestion[];
  savedAnswers: Record<string, number>;
  onAnswerSelect: (topicId: string, questionId: string, optionIndex: number) => void;
  onResetTopicQuiz: (topicId: string) => void;
}

const OPTION_LETTERS = ['क', 'ख', 'ग', 'घ'];

export const ChapterQuiz: React.FC<ChapterQuizProps> = ({
  topicId,
  topicTitle,
  questions,
  savedAnswers,
  onAnswerSelect,
  onResetTopicQuiz
}) => {
  const [showAllAnswers, setShowAllAnswers] = useState(false);

  const answeredCount = questions.filter((q) => savedAnswers[q.id] !== undefined).length;
  const correctCount = questions.filter(
    (q) => savedAnswers[q.id] !== undefined && savedAnswers[q.id] === q.correctIndex
  ).length;

  return (
    <section
      id="practice-quiz"
      aria-labelledby="quiz-heading"
      className="mt-10 rounded-xl border border-slate-200 bg-white p-6 sm:p-8"
    >
      <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="text-xs font-medium text-teal-700">
            स्व–मूल्याङ्कन · ५ अभ्यास प्रश्न
          </div>
          <h3 id="quiz-heading" className="mt-1 text-xl font-bold text-slate-900">
            अभ्यास प्रश्नोत्तरी: {topicTitle}
          </h3>
          <p className="mt-1 text-sm text-slate-600">
            सही विकल्पमा क्लिक गरी तुरुन्तै वैज्ञानिक व्याख्यासहित उत्तर जाँच्नुहोस्।
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <div className="rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-medium text-slate-700 tabular-nums">
            हल: {answeredCount}/{questions.length} · सही: {correctCount}/{questions.length}
          </div>
          <button
            type="button"
            onClick={() => setShowAllAnswers((prev) => !prev)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {showAllAnswers ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
            <span>{showAllAnswers ? 'उत्तर लुकाउनुहोस्' : 'सबै उत्तर हेर्नुहोस्'}</span>
          </button>
          {answeredCount > 0 && (
            <button
              type="button"
              onClick={() => {
                setShowAllAnswers(false);
                onResetTopicQuiz(topicId);
              }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>पुनः अभ्यास</span>
            </button>
          )}
        </div>
      </div>

      <div className="mt-6 space-y-6">
        {questions.map((q, qIdx) => {
          const selectedIdx = savedAnswers[q.id];
          const isAnswered = selectedIdx !== undefined;
          const revealAnswer = isAnswered || showAllAnswers;
          const isCorrect = selectedIdx === q.correctIndex;

          return (
            <div
              key={q.id}
              className="rounded-lg border border-slate-200 bg-slate-50/50 p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <h4 className="text-base font-semibold text-slate-900 leading-relaxed">
                  <span className="font-mono text-sm text-teal-700 mr-2 tabular-nums">
                    ०{qIdx + 1}.
                  </span>
                  {q.question}
                </h4>
              </div>

              <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {q.options.map((opt, oIdx) => {
                  const isThisSelected = selectedIdx === oIdx;
                  const isThisCorrect = q.correctIndex === oIdx;

                  let buttonClasses =
                    'border-slate-200 bg-white text-slate-800 hover:border-teal-600 hover:bg-teal-50/30';
                  if (revealAnswer) {
                    if (isThisCorrect) {
                      buttonClasses = 'border-emerald-600 bg-emerald-50 text-emerald-950 font-medium';
                    } else if (isThisSelected && !isThisCorrect) {
                      buttonClasses = 'border-rose-500 bg-rose-50 text-rose-950';
                    } else {
                      buttonClasses = 'border-slate-200 bg-white/70 text-slate-500';
                    }
                  }

                  return (
                    <button
                      key={oIdx}
                      type="button"
                      onClick={() => onAnswerSelect(topicId, q.id, oIdx)}
                      className={`flex items-start gap-3 rounded-lg border px-4 py-3 text-left text-sm leading-relaxed transition-colors cursor-pointer ${buttonClasses}`}
                    >
                      <span className="font-mono text-xs font-semibold mt-0.5 shrink-0 text-slate-500">
                        ({OPTION_LETTERS[oIdx]})
                      </span>
                      <span className="flex-1">{opt}</span>
                      {revealAnswer && isThisCorrect && (
                        <CheckCircle2 className="h-4 w-4 text-emerald-700 mt-0.5 shrink-0" />
                      )}
                      {revealAnswer && isThisSelected && !isThisCorrect && (
                        <XCircle className="h-4 w-4 text-rose-700 mt-0.5 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {revealAnswer && (
                <div
                  className={`mt-4 rounded-lg border px-4 py-3 text-sm leading-relaxed ${
                    isAnswered
                      ? isCorrect
                        ? 'border-emerald-200 bg-emerald-50/70 text-emerald-950'
                        : 'border-rose-200 bg-rose-50/70 text-rose-950'
                      : 'border-slate-200 bg-white text-slate-700'
                  }`}
                >
                  <div className="font-semibold">
                    {isAnswered
                      ? isCorrect
                        ? '✓ सही उत्तर'
                        : `✕ गलत उत्तर — सही विकल्प (${OPTION_LETTERS[q.correctIndex]}) हो`
                      : `सही उत्तर: (${OPTION_LETTERS[q.correctIndex]})`}
                  </div>
                  <p className="mt-1 text-slate-700">{q.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
