import React, { useEffect, useMemo, useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Info,
  Lightbulb,
  Menu,
  Stethoscope,
  X,
  XCircle
} from 'lucide-react';
import { HEALTH_TOPICS, HERO_IMAGE } from './data/healthTopics';
import { InteractiveExplorer } from './components/InteractiveExplorers';
import { ChapterQuiz } from './components/ChapterQuiz';

const STORAGE_KEY = 'swasthya_shiksha_quiz_answers_v1';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
}

const SafeImage: React.FC<SafeImageProps> = ({ src, alt, className = '' }) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-teal-50 to-slate-100 p-6 text-center text-slate-600 ${className}`}
      >
        <BookOpen className="h-8 w-8 text-teal-700 mb-2" />
        <p className="text-sm font-medium text-slate-700">{alt}</p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
};

export default function App() {
  const [activeTopicIndex, setActiveTopicIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showOverviewGrid, setShowOverviewGrid] = useState(false);

  const [savedAnswers, setSavedAnswers] = useState<Record<string, Record<string, number>>>(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(savedAnswers));
    } catch {
      // Ignore storage quota errors silently
    }
  }, [savedAnswers]);

  const activeTopic = HEALTH_TOPICS[activeTopicIndex];

  const progressStats = useMemo(() => {
    let totalAnswered = 0;
    let totalCorrect = 0;
    let completedChapters = 0;

    HEALTH_TOPICS.forEach((topic) => {
      const topicAnswers = savedAnswers[topic.id] || {};
      const answeredInTopic = topic.quiz.filter((q) => topicAnswers[q.id] !== undefined).length;
      const correctInTopic = topic.quiz.filter(
        (q) => topicAnswers[q.id] !== undefined && topicAnswers[q.id] === q.correctIndex
      ).length;
      totalAnswered += answeredInTopic;
      totalCorrect += correctInTopic;
      if (answeredInTopic === topic.quiz.length) {
        completedChapters += 1;
      }
    });

    return {
      totalQuestions: HEALTH_TOPICS.length * 5,
      totalAnswered,
      totalCorrect,
      completedChapters
    };
  }, [savedAnswers]);

  const handleSelectTopic = (index: number) => {
    setActiveTopicIndex(index);
    setMobileMenuOpen(false);
    setShowOverviewGrid(false);
    const workspaceEl = document.getElementById('curriculum-workspace');
    if (workspaceEl) {
      workspaceEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleAnswerSelect = (topicId: string, questionId: string, optionIndex: number) => {
    setSavedAnswers((prev) => ({
      ...prev,
      [topicId]: {
        ...(prev[topicId] || {}),
        [questionId]: optionIndex
      }
    }));
  };

  const handleResetTopicQuiz = (topicId: string) => {
    setSavedAnswers((prev) => {
      const next = { ...prev };
      delete next[topicId];
      return next;
    });
  };

  const scrollToSection = (sectionId: string) => {
    setShowOverviewGrid(false);
    setMobileMenuOpen(false);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Top Bar Contract: 3 zones separated by gap-8 */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-4 py-4 sm:px-6 lg:px-8">
          {/* Zone 1: Single-line Brand Wordmark */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-display text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0"
          >
            स्वास्थ्य शिक्षा
          </a>

          {/* Zone 2: 4 concise single-line text nav links */}
          <nav
            aria-label="मुख्य नेभिगेसन"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600"
          >
            <a
              href="#curriculum-workspace"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('curriculum-workspace');
              }}
              className="hover:text-teal-800 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              पाठ्यक्रम
            </a>
            <a
              href="#reference-table"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('reference-table');
              }}
              className="hover:text-teal-800 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              सन्दर्भ तालिका
            </a>
            <a
              href="#practice-quiz"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('practice-quiz');
              }}
              className="hover:text-teal-800 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              अभ्यास प्रश्न
            </a>
            <a
              href="#medical-disclaimer"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('medical-disclaimer');
              }}
              className="hover:text-teal-800 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              परामर्श सूचना
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action Button */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => {
                setShowOverviewGrid((prev) => !prev);
                const el = document.getElementById('curriculum-workspace');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="rounded-lg bg-teal-700 px-4 py-2 text-xs font-medium text-white hover:bg-teal-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {showOverviewGrid ? 'अध्याय पढ्नुहोस्' : '१० विषय सूची'}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Orientation Split */}
      <section id="top" className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <div className="grid items-stretch gap-8 lg:grid-cols-12">
            <div className="flex flex-col justify-between lg:col-span-7">
              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
                  <span>वैज्ञानिक आधारभूत स्वास्थ्य ज्ञान</span>
                  <span aria-hidden="true">·</span>
                  <span>१० क्रमिक अध्याय</span>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums">५० अभ्यास प्रश्न</span>
                </div>

                <h1 className="mt-3 text-3xl font-bold leading-snug text-slate-900 sm:text-4xl">
                  सरल नेपाली भाषामा आधारभूत स्वास्थ्य शिक्षा ज्ञानकोश
                </h1>

                <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
                  स्वास्थ्यको परिचय, सन्तुलित पोषण, व्यक्तिगत सरसफाइ, सामान्य रोगको रोकथाम,
                  प्राथमिक उपचार, मानसिक स्वास्थ्य, व्यायाम, खोप, मातृ–शिशु स्याहार र स्वास्थ्य
                  सेवासम्बन्धी प्रमाणित जानकारी — सरल परिभाषा, दैनिक उदाहरण, सावधानी,
                  गर्नुपर्ने/नगर्नुपर्ने बुँदा, तालिका र अभ्यास प्रश्नोत्तरीसहित।
                </p>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-4 pt-5 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => handleSelectTopic(activeTopicIndex)}
                  className="inline-flex items-center gap-2 rounded-lg bg-teal-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-teal-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>अध्याय {activeTopic.number} पढ्नुहोस्</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <div className="text-xs text-slate-600 tabular-nums">
                  अभ्यास प्रगति: <strong className="text-slate-900">{progressStats.totalAnswered}/{progressStats.totalQuestions}</strong> प्रश्न हल
                  <span className="mx-2 text-slate-300" aria-hidden="true">|</span>
                  पूरा अध्याय: <strong className="text-teal-800">{progressStats.completedChapters}/१०</strong>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="h-64 w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-100 sm:h-72 lg:h-full">
                <SafeImage
                  src={HERO_IMAGE}
                  alt="स्वस्थ जीवनशैली, सन्तुलित पोषण, सफा पानी र सामुदायिक स्वास्थ्य चौकीको चित्रण"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Two-Zone Curriculum Workspace */}
      <main id="curriculum-workspace" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Mobile Chapter Switcher Bar (Non-sticky to preserve mobile viewport) */}
        <div className="mb-6 lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-left text-sm font-semibold text-slate-900 cursor-pointer"
          >
            <span className="flex items-center gap-2 truncate">
              <Menu className="h-4 w-4 text-teal-700 shrink-0" />
              <span className="truncate">
                अध्याय {activeTopic.number}: {activeTopic.title}
              </span>
            </span>
            {mobileMenuOpen ? (
              <ChevronUp className="h-4 w-4 text-slate-500 shrink-0" />
            ) : (
              <ChevronDown className="h-4 w-4 text-slate-500 shrink-0" />
            )}
          </button>

          {mobileMenuOpen && (
            <div className="mt-2 rounded-xl border border-slate-200 bg-white p-2">
              {HEALTH_TOPICS.map((topic, idx) => {
                const isSelected = idx === activeTopicIndex && !showOverviewGrid;
                const topicAnswers = savedAnswers[topic.id] || {};
                const answered = topic.quiz.filter((q) => topicAnswers[q.id] !== undefined).length;
                return (
                  <button
                    key={topic.id}
                    type="button"
                    onClick={() => handleSelectTopic(idx)}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-teal-50 text-teal-900 font-semibold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span className="truncate">
                      <span className="font-mono text-xs text-slate-500 mr-2 tabular-nums">
                        {topic.number}.
                      </span>
                      {topic.shortTitle}
                    </span>
                    <span className="ml-2 text-xs text-slate-500 tabular-nums shrink-0">
                      {answered}/५
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* All 10 Topics Overview Grid View (when toggled) */}
        {showOverviewGrid ? (
          <section aria-label="दस अध्यायको पूर्ण सूची">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  सम्पूर्ण पाठ्यक्रम सूची (१० विषयहरू)
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  पढ्न वा अभ्यास प्रश्न हल गर्न कुनै पनि विषय छनोट गर्नुहोस्।
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowOverviewGrid(false)}
                className="inline-flex items-center gap-1.5 self-start rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
                <span>अध्याय दृश्यमा फर्कनुहोस्</span>
              </button>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {HEALTH_TOPICS.map((topic, idx) => {
                const topicAnswers = savedAnswers[topic.id] || {};
                const answered = topic.quiz.filter((q) => topicAnswers[q.id] !== undefined).length;
                const correct = topic.quiz.filter(
                  (q) => topicAnswers[q.id] !== undefined && topicAnswers[q.id] === q.correctIndex
                ).length;

                return (
                  <button
                    key={topic.id}
                    type="button"
                    onClick={() => handleSelectTopic(idx)}
                    className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 text-left hover:border-teal-600 transition-colors cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span className="font-mono font-medium text-teal-700 tabular-nums">
                          अध्याय {topic.number}
                        </span>
                        <span>{topic.category}</span>
                      </div>
                      <h3 className="mt-2 text-lg font-bold text-slate-900">{topic.title}</h3>
                      <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">
                        {topic.subtitle}
                      </p>
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500 tabular-nums">
                      <span>अभ्यास: {answered}/५ (सही {correct})</span>
                      <span className="font-medium text-teal-700">पढ्नुहोस् →</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        ) : (
          <div className="grid gap-8 lg:grid-cols-12 items-start">
            {/* Left Sticky Curriculum Sidebar (Desktop) */}
            <aside className="hidden lg:block lg:col-span-4 xl:col-span-3 lg:sticky lg:top-6">
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="border-b border-slate-100 pb-3 px-2">
                  <h2 className="text-sm font-bold text-slate-900">स्वास्थ्य शिक्षा विषयहरू</h2>
                  <p className="mt-0.5 text-xs text-slate-500 tabular-nums">
                    क्रमिक १० अध्याय · ५ अभ्यास प्रश्न प्रति अध्याय
                  </p>
                </div>

                <nav aria-label="अध्याय सूची" className="mt-3 space-y-1">
                  {HEALTH_TOPICS.map((topic, idx) => {
                    const isSelected = idx === activeTopicIndex;
                    const topicAnswers = savedAnswers[topic.id] || {};
                    const answered = topic.quiz.filter(
                      (q) => topicAnswers[q.id] !== undefined
                    ).length;
                    const isComplete = answered === topic.quiz.length;

                    return (
                      <button
                        key={topic.id}
                        type="button"
                        onClick={() => handleSelectTopic(idx)}
                        className={`flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-left text-sm transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-teal-50 text-teal-900 font-semibold'
                            : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                        }`}
                      >
                        <span className="flex items-center gap-2.5 min-w-0">
                          <span
                            className={`font-mono text-xs tabular-nums shrink-0 ${
                              isSelected ? 'text-teal-700 font-semibold' : 'text-slate-400'
                            }`}
                          >
                            {topic.number}
                          </span>
                          <span className="truncate">{topic.shortTitle}</span>
                        </span>

                        <span className="flex items-center gap-1 text-xs tabular-nums shrink-0">
                          {isComplete ? (
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                          ) : (
                            <span className="text-slate-400">{answered}/५</span>
                          )}
                        </span>
                      </button>
                    );
                  })}
                </nav>

                <div className="mt-4 border-t border-slate-100 pt-4 px-2">
                  <div className="flex items-center justify-between text-xs text-slate-600 tabular-nums">
                    <span>कुल सही उत्तर</span>
                    <span className="font-semibold text-slate-900">
                      {progressStats.totalCorrect}/{progressStats.totalQuestions}
                    </span>
                  </div>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full bg-teal-700 transition-all duration-200"
                      style={{
                        width: `${(progressStats.totalAnswered / progressStats.totalQuestions) * 100}%`
                      }}
                    />
                  </div>
                </div>
              </div>
            </aside>

            {/* Right Main Reading & Interactive Stage */}
            <article className="lg:col-span-8 xl:col-span-9 space-y-8">
              {/* Chapter Header Card */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 tabular-nums">
                  <span className="font-semibold text-teal-800">
                    अध्याय {activeTopic.number} / १०
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{activeTopic.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>पढ्ने समय: {activeTopic.readMinutes}</span>
                  <span aria-hidden="true">·</span>
                  <span>५ अभ्यास प्रश्न</span>
                </div>

                <h2 className="mt-2.5 text-2xl font-bold text-slate-900 sm:text-3xl">
                  {activeTopic.title}
                </h2>
                <p className="mt-1.5 text-base text-slate-600">{activeTopic.subtitle}</p>

                {/* Quick Section Jump Links */}
                <div className="mt-6 flex flex-wrap gap-2 border-t border-slate-100 pt-4 text-xs font-medium">
                  <button
                    type="button"
                    onClick={() => scrollToSection('section-definition')}
                    className="rounded-md bg-slate-100 px-3 py-1.5 text-slate-700 hover:bg-slate-200 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    परिभाषा र उदाहरण
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollToSection('section-dos-donts')}
                    className="rounded-md bg-slate-100 px-3 py-1.5 text-slate-700 hover:bg-slate-200 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    सावधानी र गर्नुपर्ने/नगर्नुपर्ने
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollToSection('reference-table')}
                    className="rounded-md bg-slate-100 px-3 py-1.5 text-slate-700 hover:bg-slate-200 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    तालिका
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollToSection('practice-quiz')}
                    className="rounded-md bg-teal-50 px-3 py-1.5 text-teal-800 hover:bg-teal-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    ५ अभ्यास प्रश्न
                  </button>
                </div>
              </div>

              {/* 1. Simple Definition & Key Concepts */}
              <section
                id="section-definition"
                className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8"
              >
                <div className="flex items-center gap-2 text-xs font-semibold text-teal-800">
                  <BookOpen className="h-4 w-4 shrink-0" />
                  <span>१. सरल परिभाषा</span>
                </div>
                <p className="mt-3 text-base leading-relaxed text-slate-800 max-w-3xl">
                  {activeTopic.definition}
                </p>

                {/* Chapter-specific illustration if available */}
                {activeTopic.image && (
                  <figure className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                    <div className="aspect-[16/9] sm:aspect-[2/1] w-full overflow-hidden bg-slate-100">
                      <SafeImage
                        src={activeTopic.image}
                        alt={activeTopic.imageAlt || activeTopic.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    {activeTopic.imageCaption && (
                      <figcaption className="border-t border-slate-200 bg-white px-4 py-3 text-xs text-slate-600 leading-relaxed">
                        {activeTopic.imageCaption}
                      </figcaption>
                    )}
                  </figure>
                )}

                {/* Key Concepts Grid */}
                <div className="mt-8 border-t border-slate-100 pt-6">
                  <h3 className="text-lg font-bold text-slate-900">मुख्य बुँदा र बुझाइ</h3>
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    {activeTopic.keyConcepts.map((concept, idx) => (
                      <div
                        key={idx}
                        className="rounded-lg border border-slate-200 bg-slate-50/50 p-5"
                      >
                        <h4 className="text-base font-semibold text-slate-900">
                          {concept.heading}
                        </h4>
                        <p className="mt-2 text-sm leading-relaxed text-slate-700">
                          {concept.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Daily Life Examples */}
                <div className="mt-8 border-t border-slate-100 pt-6">
                  <div className="flex items-center gap-2 text-xs font-semibold text-teal-800">
                    <Lightbulb className="h-4 w-4 shrink-0" />
                    <span>२. दैनिक जीवनका उदाहरणहरू</span>
                  </div>
                  <ul className="mt-3 space-y-3">
                    {activeTopic.dailyExamples.map((example, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50/40 px-4 py-3.5 text-sm leading-relaxed text-slate-800"
                      >
                        <span className="font-mono text-xs font-semibold text-teal-700 mt-0.5 shrink-0 tabular-nums">
                          ०{idx + 1}.
                        </span>
                        <span>{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* Interactive Concept Explorer (when topic has one) */}
              <InteractiveExplorer topicId={activeTopic.id} />

              {/* 3. Precautions & 4. Do's and Don'ts */}
              <section
                id="section-dos-donts"
                className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 space-y-8"
              >
                {/* Key Precautions */}
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-amber-800">
                    <AlertTriangle className="h-4 w-4 shrink-0" />
                    <span>३. मुख्य सावधानीहरू</span>
                  </div>
                  <h3 className="mt-1 text-lg font-bold text-slate-900">
                    विशेष ध्यान दिनुपर्ने कुराहरू
                  </h3>
                  <ul className="mt-4 space-y-2.5">
                    {activeTopic.precautions.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 rounded-lg border border-amber-200 bg-amber-50/40 px-4 py-3 text-sm leading-relaxed text-slate-800"
                      >
                        <span className="font-semibold text-amber-800 shrink-0">▲</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Do's and Don'ts Comparison */}
                <div className="border-t border-slate-100 pt-6">
                  <h3 className="text-lg font-bold text-slate-900">
                    ४. गर्नुपर्ने र नगर्नुपर्ने काम
                  </h3>
                  <div className="mt-4 grid gap-5 md:grid-cols-2">
                    <div className="rounded-xl border border-emerald-200 bg-emerald-50/30 p-5">
                      <div className="flex items-center gap-2 text-sm font-bold text-emerald-900">
                        <CheckCircle2 className="h-4 w-4 text-emerald-700 shrink-0" />
                        <span>✓ गर्नुपर्ने काम (Do&apos;s)</span>
                      </div>
                      <ul className="mt-3.5 space-y-2.5 text-sm leading-relaxed text-slate-800">
                        {activeTopic.dos.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-emerald-700 font-bold shrink-0">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-xl border border-rose-200 bg-rose-50/30 p-5">
                      <div className="flex items-center gap-2 text-sm font-bold text-rose-900">
                        <XCircle className="h-4 w-4 text-rose-700 shrink-0" />
                        <span>✕ नगर्नुपर्ने काम (Don&apos;ts)</span>
                      </div>
                      <ul className="mt-3.5 space-y-2.5 text-sm leading-relaxed text-slate-800">
                        {activeTopic.donts.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-rose-700 font-bold shrink-0">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* 5. Structured Reference Table */}
              <section
                id="reference-table"
                className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8"
              >
                <div className="text-xs font-semibold text-teal-800">
                  ५. संक्षिप्त सन्दर्भ तालिका
                </div>
                <h3 className="mt-1 text-lg font-bold text-slate-900">
                  {activeTopic.table.title}
                </h3>

                <div className="mt-4 overflow-x-auto rounded-lg border border-slate-200">
                  <table className="w-full min-w-[600px] border-collapse text-left text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50">
                        {activeTopic.table.columns.map((col, idx) => (
                          <th
                            key={idx}
                            scope="col"
                            className="px-4 py-3 text-xs font-semibold text-slate-700"
                          >
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                      {activeTopic.table.rows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-slate-50/70 transition-colors">
                          {row.map((cell, cIdx) => (
                            <td
                              key={cIdx}
                              className={`px-4 py-3.5 align-top leading-relaxed tabular-nums ${
                                cIdx === 0
                                  ? 'font-semibold text-slate-900'
                                  : 'text-slate-700'
                              }`}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Health Worker Consultation Notice (No personal diagnosis / medication advice) */}
              <section className="rounded-xl border border-teal-200 bg-teal-50/40 p-6">
                <div className="flex items-start gap-3">
                  <Stethoscope className="mt-0.5 h-5 w-5 text-teal-800 shrink-0" />
                  <div>
                    <h3 className="text-sm font-bold text-teal-950">
                      स्वास्थ्यकर्मीको परामर्श सम्बन्धी आवश्यक सुझाव
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-800">
                      {activeTopic.healthWorkerAdvice}
                    </p>
                  </div>
                </div>
              </section>

              {/* 6. 5 Practice Questions */}
              <ChapterQuiz
                topicId={activeTopic.id}
                topicTitle={activeTopic.title}
                questions={activeTopic.quiz}
                savedAnswers={savedAnswers[activeTopic.id] || {}}
                onAnswerSelect={handleAnswerSelect}
                onResetTopicQuiz={handleResetTopicQuiz}
              />

              {/* Sequential Previous / Next Chapter Navigation */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-t border-slate-200 pt-6">
                <button
                  type="button"
                  disabled={activeTopicIndex === 0}
                  onClick={() => handleSelectTopic(activeTopicIndex - 1)}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>
                    {activeTopicIndex > 0
                      ? `अघिल्लो: ${HEALTH_TOPICS[activeTopicIndex - 1].shortTitle}`
                      : 'पहिलो अध्याय'}
                  </span>
                </button>

                <div className="text-center text-xs text-slate-500 tabular-nums">
                  अध्याय {activeTopic.number} / १०
                </div>

                <button
                  type="button"
                  disabled={activeTopicIndex === HEALTH_TOPICS.length - 1}
                  onClick={() => handleSelectTopic(activeTopicIndex + 1)}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-teal-700 px-4 py-2.5 text-sm font-medium text-white hover:bg-teal-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>
                    {activeTopicIndex < HEALTH_TOPICS.length - 1
                      ? `अर्को: ${HEALTH_TOPICS[activeTopicIndex + 1].shortTitle}`
                      : 'अन्तिम अध्याय पूरा भयो'}
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </article>
          </div>
        )}
      </main>

      {/* Institutional Disclaimer & Quiet Footer */}
      <footer
        id="medical-disclaimer"
        className="mt-12 border-t border-slate-200 bg-white"
      >
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <Info className="mt-0.5 h-5 w-5 text-slate-700 shrink-0" />
              <div className="text-sm leading-relaxed text-slate-700">
                <p className="font-semibold text-slate-900">
                  शैक्षिक तथा स्वास्थ्य परामर्श सम्बन्धी महत्त्वपूर्ण सूचना
                </p>
                <p className="mt-1">
                  यस स्वास्थ्य शिक्षा ज्ञानकोशमा प्रस्तुत गरिएका सामग्रीहरू विश्व स्वास्थ्य संगठन (WHO)
                  र प्रचलित जनस्वास्थ्य विज्ञानका आधारभूत सिद्धान्तमा आधारित सामान्य शिक्षाका लागि
                  मात्र हुन्। यसले कुनै पनि व्यक्तिगत रोगको निदान (Diagnosis) गर्दैन र निश्चित
                  औषधि सेवनको सिफारिस गर्दैन। कुनै पनि रोगको लक्षण देखिएमा, औषधि प्रयोग गर्नुपरेमा
                  वा आपतकालीन अवस्था आएमा सधैँ योग्य चिकित्सक, नजिकको स्वास्थ्य चौकी वा अस्पतालमा
                  परामर्श लिनुहोस् (आकस्मिक एम्बुलेन्स: १०२ · मानसिक स्वास्थ्य हेल्पलाइन: ११६६)।
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-xs text-slate-500">
            <div>स्वास्थ्य शिक्षा ज्ञानकोश — सरल नेपाली आधारभूत स्वास्थ्य मार्गदर्शिका</div>
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => {
                  setShowOverviewGrid(true);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-slate-800 hover:underline cursor-pointer"
              >
                सबै १० अध्याय सूची
              </button>
              <button
                type="button"
                onClick={() => handleSelectTopic(0)}
                className="hover:text-slate-800 hover:underline cursor-pointer"
              >
                अध्याय ०१ मा जानुहोस्
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
