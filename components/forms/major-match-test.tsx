"use client";

import { type FormEvent, useEffect, useMemo, useState } from "react";

import { ArrowRight, BarChart3, RotateCcw, ShieldCheck } from "lucide-react";

import { ButtonLink } from "@/components/ui/button-link";
import {
  calculateMajorMatch,
  majorMatchQuestions,
  majorMatchSections,
  responseScale,
  riasecDimensions,
  type MajorMatchAnswers,
  type MajorMatchResult,
} from "@/data/major-match";

const STORAGE_KEY = "student-hub-major-match-result";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export function MajorMatchTest() {
  const [answers, setAnswers] = useState<MajorMatchAnswers>({});
  const [stepIndex, setStepIndex] = useState(0);
  const [result, setResult] = useState<MajorMatchResult | null>(null);
  const [savedResult, setSavedResult] = useState<MajorMatchResult | null>(null);
  const [showStepWarning, setShowStepWarning] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (!stored) {
          return;
        }

        const parsed = JSON.parse(stored) as { result?: MajorMatchResult };
        if (parsed.result?.recommendations?.length) {
          setSavedResult(parsed.result);
        }
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const currentSection = majorMatchSections[stepIndex];
  const currentQuestions = useMemo(
    () =>
      currentSection.questionIds
        .map((id) => majorMatchQuestions.find((question) => question.id === id))
        .filter((question): question is (typeof majorMatchQuestions)[number] => Boolean(question)),
    [currentSection.questionIds],
  );

  const completedQuestions = majorMatchQuestions.filter((question) => answers[question.id]).length;
  const progress = Math.round((completedQuestions / majorMatchQuestions.length) * 100);
  const currentStepComplete = currentQuestions.every((question) => answers[question.id]);

  function updateAnswer(questionId: string, value: number) {
    setAnswers((current) => ({ ...current, [questionId]: value }));
    setShowStepWarning(false);
  }

  function restart() {
    setAnswers({});
    setResult(null);
    setStepIndex(0);
    setShowStepWarning(false);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!currentStepComplete) {
      setShowStepWarning(true);
      return;
    }

    if (stepIndex < majorMatchSections.length - 1) {
      setStepIndex((current) => current + 1);
      setShowStepWarning(false);
      return;
    }

    const nextResult = calculateMajorMatch(answers);
    setResult(nextResult);
    setSavedResult(nextResult);
    setShowStepWarning(false);

    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ answers, result: nextResult }),
    );
  }

  if (result) {
    return (
      <div className="space-y-6" id="major-match-test">
        <div className="surface-card rounded-[32px] p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand">
                Your major match results
              </p>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                Start by exploring these best-fit major directions.
              </h2>
              <p className="mt-4 text-sm leading-8 text-ink-muted">
                These results are guidance for exploration, not a final decision or a clinical diagnosis. Use them to compare majors, review curricula, and decide whether advising would help.
              </p>
            </div>
            <button
              type="button"
              onClick={restart}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:border-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/25"
            >
              <RotateCcw className="h-4 w-4" />
              Retake test
            </button>
          </div>
          <div className="mt-6 grid gap-4 lg:grid-cols-[0.75fr_1.25fr]">
            <div className="rounded-[26px] border border-brand/20 bg-brand/10 p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-brand shadow-[0_12px_24px_rgba(17,17,17,0.08)]">
                  <BarChart3 className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-ink">{result.confidenceLabel}</p>
                  <p className="mt-2 text-sm leading-7 text-ink-muted">
                    {result.confidenceDescription}
                  </p>
                </div>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {result.topInterests.map((code) => (
                <div key={code} className="rounded-[24px] border border-border bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                    Interest
                  </p>
                  <p className="mt-2 font-semibold text-ink">{riasecDimensions[code].label}</p>
                  <p className="mt-1 text-sm text-ink-muted">{result.interestScores[code]}%</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-5">
          {result.recommendations.map((recommendation, index) => (
            <article
              key={recommendation.slug}
              className="surface-card rounded-[30px] p-6 lg:col-span-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">
                    Recommendation {index + 1}
                  </p>
                  <h3 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink">
                    {recommendation.name}
                  </h3>
                </div>
                <div className="rounded-full border border-brand/25 bg-brand/10 px-4 py-2 text-sm font-semibold text-ink">
                  {recommendation.score}% match
                </div>
              </div>
              <p className="mt-4 max-w-4xl text-sm leading-8 text-ink-muted">
                {recommendation.explanation}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {recommendation.matchingTraits.map((trait) => (
                  <span
                    key={trait}
                    className="rounded-full border border-border bg-surface-muted px-4 py-2 text-sm font-medium text-ink"
                  >
                    {trait}
                  </span>
                ))}
              </div>
              <div className="mt-5 rounded-[24px] border border-border bg-white px-5 py-5 text-sm leading-7 text-ink-muted">
                <p className="font-semibold text-ink">Suggested next step</p>
                <p className="mt-2">{recommendation.suggestedNextStep}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="surface-card-dark rounded-[30px] p-6 text-white sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand">
            Continue with Student Hub
          </p>
          <h3 className="mt-4 font-display text-3xl font-semibold tracking-tight">
            Use your results as a conversation starter.
          </h3>
          <p className="mt-3 max-w-3xl text-sm leading-8 text-white/74">
            The strongest use of this test is to compare academic plans, ask better advising questions, and understand which majors deserve deeper research.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href="/study/universities" variant="primary">
              Explore universities
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink href="/book-online" variant="ghost" className="!text-ink">
              Book advising
            </ButtonLink>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6" id="major-match-test">
      {savedResult ? (
        <div className="surface-card rounded-[28px] p-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-ink">Saved result available</p>
              <p className="mt-1 text-sm text-ink-muted">
                Last completed {formatDate(savedResult.completedAt)}. You can view it or retake the test.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setResult(savedResult)}
              className="rounded-full border border-brand-deep bg-brand px-5 py-3 text-sm font-semibold text-ink transition hover:bg-brand-soft focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/25"
            >
              View saved result
            </button>
          </div>
        </div>
      ) : null}

      <div className="surface-card rounded-[32px] p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand">
              Major Match Test
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Find major directions that fit how you think, work, and learn.
            </h2>
            <p className="mt-4 text-sm leading-8 text-ink-muted">
              This short test uses interest and preference patterns to recommend bachelor-level major directions. It is designed for exploration, not diagnosis.
            </p>
          </div>
          <div className="rounded-[24px] border border-brand/20 bg-brand/10 px-5 py-4 text-sm text-ink">
            <p className="font-semibold">{progress}% complete</p>
            <p className="mt-1 text-ink-muted">
              Step {stepIndex + 1} of {majorMatchSections.length}
            </p>
          </div>
        </div>

        <div className="mt-6 h-2 rounded-full bg-surface-muted" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress} aria-label="Major Match Test progress">
          <div
            className="h-full rounded-full bg-brand transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <form className="surface-card rounded-[32px] p-6 sm:p-8" onSubmit={handleSubmit}>
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand">
            Section {stepIndex + 1}
          </p>
          <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink">
            {currentSection.title}
          </h3>
          <p className="mt-2 text-sm leading-7 text-ink-muted">{currentSection.description}</p>
        </div>

        <div className="grid gap-4">
          {currentQuestions.map((question) => (
            <fieldset key={question.id} className="rounded-[26px] border border-border bg-white p-4 sm:p-5">
              <legend className="px-1 text-sm font-semibold leading-7 text-ink">
                {question.prompt}
              </legend>
              {question.helper ? (
                <p className="mt-1 text-sm text-ink-muted">{question.helper}</p>
              ) : null}
              <div className="mt-4 grid gap-2 sm:grid-cols-5">
                {responseScale.map((option) => {
                  const inputId = `${question.id}-${option.value}`;

                  return (
                    <label key={option.value} htmlFor={inputId} className="block">
                      <input
                        id={inputId}
                        type="radio"
                        name={question.id}
                        value={option.value}
                        checked={answers[question.id] === option.value}
                        onChange={() => updateAnswer(question.id, option.value)}
                        className="peer sr-only"
                      />
                      <span className="flex min-h-16 items-center justify-center rounded-2xl border border-border bg-surface-muted px-3 py-3 text-center text-xs font-semibold text-ink-muted transition peer-checked:border-brand-deep peer-checked:bg-brand peer-checked:text-ink peer-focus-visible:ring-4 peer-focus-visible:ring-brand/25">
                        {option.label}
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          ))}
        </div>

        {showStepWarning ? (
          <div className="mt-5 rounded-[22px] border border-brand/25 bg-brand/10 px-4 py-3 text-sm text-ink" aria-live="polite">
            Please answer every statement in this section before continuing.
          </div>
        ) : null}

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              setStepIndex((current) => Math.max(0, current - 1));
              setShowStepWarning(false);
            }}
            disabled={stepIndex === 0}
            className="rounded-full border border-border bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:border-ink disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/25"
          >
            Back
          </button>
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-deep bg-brand px-5 py-3 text-sm font-semibold text-ink shadow-[0_16px_32px_rgba(228,178,0,0.2)] transition hover:bg-brand-soft focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/25"
          >
            {stepIndex === majorMatchSections.length - 1 ? "Show recommendations" : "Continue"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </form>

      <div className="rounded-[28px] border border-border bg-white/78 p-5 text-sm leading-7 text-ink-muted">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <p>
            This tool is based on career-interest fit logic. It does not measure mental health, ability, or final suitability. Use it as one input alongside grades, entry requirements, family context, advising, and real curriculum research.
          </p>
        </div>
      </div>
    </div>
  );
}