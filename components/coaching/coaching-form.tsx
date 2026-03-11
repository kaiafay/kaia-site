"use client";

import { useState } from "react";
import { Loader2, Check, ArrowRight, ArrowLeft } from "lucide-react";
import { DropdownSelect } from "@/components/ui/dropdown-select";
import { Checkbox } from "@/components/ui/checkbox";
import { SectionLabel } from "@/components/ui/section-label";

const TOTAL_STEPS = 5;

const TRAINING_LENGTH_OPTIONS = [
  { value: "less-than-6", label: "Less than 6 months" },
  { value: "6mo-1yr", label: "6 months–1 year" },
  { value: "1-2yr", label: "1–2 years" },
  { value: "2-5yr", label: "2–5 years" },
  { value: "5plus", label: "5+ years" },
];

const DAYS_PER_WEEK_OPTIONS = [
  { value: "none", label: "Not currently training" },
  { value: "1-2", label: "1–2 days" },
  { value: "3-4", label: "3–4 days" },
  { value: "5plus", label: "5+ days" },
];

const TRAINING_TYPES = [
  { value: "weightlifting", label: "Weightlifting" },
  { value: "cardio", label: "Cardio" },
  { value: "yoga-pilates", label: "Yoga or Pilates" },
  { value: "sports", label: "Sports" },
  { value: "bodybuilding", label: "Bodybuilding" },
  { value: "none", label: "None" },
];

const PRIMARY_GOAL_OPTIONS = [
  { value: "build-muscle", label: "Build muscle" },
  { value: "lose-fat", label: "Lose fat" },
  { value: "recomp", label: "Body recomposition" },
  { value: "competition", label: "Competition prep" },
  { value: "general-health", label: "General health" },
  { value: "performance", label: "Improve performance" },
];

const DOCTOR_OPTIONS = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];

const CURRENT_DIET_OPTIONS = [
  { value: "no-structure", label: "No structure" },
  { value: "tracking-macros", label: "Tracking macros" },
  { value: "intuitive", label: "Intuitive eating" },
  { value: "specific", label: "Specific diet e.g. keto or vegan" },
  { value: "unsure", label: "Unsure" },
];

const GYM_ACCESS_OPTIONS = [
  { value: "commercial", label: "Yes — commercial gym" },
  { value: "home", label: "Yes — home gym" },
  { value: "no", label: "No" },
];

const BUDGET_OPTIONS = [
  { value: "under-100", label: "Under $200" },
  { value: "100-150", label: "$200–$300" },
  { value: "150-200", label: "$300–$400" },
  { value: "200plus", label: "$400+" },
  { value: "flexible", label: "Flexible" },
];

const HEAR_ABOUT_OPTIONS = [
  { value: "instagram", label: "Instagram" },
  { value: "referral", label: "Referral" },
  { value: "google", label: "Google" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "other", label: "Other" },
];

const STEP_LABELS: Record<number, string> = {
  1: "Contact & Basics",
  2: "Training Background",
  3: "Goals",
  4: "Health & Nutrition",
  5: "Logistics",
};

const inputClass = (hasError: boolean) =>
  `rounded-lg border bg-input px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-all duration-200 focus:outline-none focus:shadow-[0_0_20px_rgba(143,56,72,0.25)] disabled:opacity-60 ${
    hasError ? "border-primary/60" : "border-border focus:border-primary/50"
  }`;

export type CoachingFormState = {
  fullName: string;
  email: string;
  age: string;
  location: string;
  trainingLength: string;
  daysPerWeek: string;
  trainingTypes: string[];
  primaryGoal: string;
  targetTimeline: string;
  holdingBack: string;
  injuries: string;
  medicalConditions: string;
  doctorOrSpecialist: string;
  currentDiet: string;
  dietaryRestrictions: string;
  gymAccess: string;
  monthlyBudget: string;
  hearAbout: string;
  anythingElse: string;
};

const initialFormState: CoachingFormState = {
  fullName: "",
  email: "",
  age: "",
  location: "",
  trainingLength: "",
  daysPerWeek: "",
  trainingTypes: [],
  primaryGoal: "",
  targetTimeline: "",
  holdingBack: "",
  injuries: "",
  medicalConditions: "",
  doctorOrSpecialist: "",
  currentDiet: "",
  dietaryRestrictions: "",
  gymAccess: "",
  monthlyBudget: "",
  hearAbout: "",
  anythingElse: "",
};

export function CoachingForm() {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<CoachingFormState>(initialFormState);

  const handleChange = (field: keyof CoachingFormState, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAgeChange = (value: string) => {
    if (value === "" || /^\d{1,3}$/.test(value)) {
      handleChange("age", value);
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next.age;
        return next;
      });
    }
  };

  const handleTrainingTypeToggle = (value: string, checked: boolean) => {
    setFormData((prev) =>
      checked
        ? { ...prev, trainingTypes: [...prev.trainingTypes, value] }
        : {
            ...prev,
            trainingTypes: prev.trainingTypes.filter((v) => v !== value),
          },
    );
  };

  const clearError = (field: string) => {
    setFieldErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const validateStep1 = (): boolean => {
    const errors: Record<string, string> = {};
    if (!formData.fullName.trim()) errors.fullName = "Name is required.";
    if (!formData.email.trim()) errors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      errors.email = "Please enter a valid email.";
    if (formData.age.trim()) {
      const n = parseInt(formData.age.trim(), 10);
      if (Number.isNaN(n) || n < 1 || n > 120)
        errors.age = "Please enter a valid age (1–120).";
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const goNext = () => {
    if (step === 1 && !validateStep1()) return;
    setErrorMessage("");
    setFieldErrors({});
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  };

  const goBack = () => {
    setErrorMessage("");
    setFieldErrors({});
    setStep((s) => Math.max(s - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < TOTAL_STEPS) {
      goNext();
      return;
    }
    if (!validateStep1()) return;
    setStatus("loading");
    setErrorMessage("");
    const d = formData;
    try {
      const res = await fetch("/api/coaching", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: d.fullName.trim(),
          email: d.email.trim(),
          age: d.age.trim() || undefined,
          location: d.location.trim() || undefined,
          trainingLength: d.trainingLength || undefined,
          daysPerWeek: d.daysPerWeek || undefined,
          trainingTypes:
            d.trainingTypes.length > 0 ? d.trainingTypes : undefined,
          primaryGoal: d.primaryGoal || undefined,
          targetTimeline: d.targetTimeline.trim() || undefined,
          holdingBack: d.holdingBack.trim() || undefined,
          injuries: d.injuries.trim() || undefined,
          medicalConditions: d.medicalConditions.trim() || undefined,
          doctorOrSpecialist: d.doctorOrSpecialist || undefined,
          currentDiet: d.currentDiet || undefined,
          dietaryRestrictions: d.dietaryRestrictions.trim() || undefined,
          gymAccess: d.gymAccess || undefined,
          monthlyBudget: d.monthlyBudget || undefined,
          hearAbout: d.hearAbout || undefined,
          anythingElse: d.anythingElse.trim() || undefined,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("error");
        setErrorMessage(
          data.error ?? "Something went wrong. Please try again.",
        );
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  // Success screen
  if (status === "success") {
    return (
      <div className="flex w-full flex-col items-center rounded-xl border border-border bg-card p-8 shadow-[0_12px_40px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.04)] sm:p-12">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary bg-primary/10">
          <Check size={32} className="text-primary" strokeWidth={2.5} />
        </div>
        <h3 className="mt-6 font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          You&apos;re in!
        </h3>
        <p className="mt-4 max-w-md text-center text-base leading-relaxed text-muted-foreground">
          Thanks for applying! I&apos;ll review your application and reach out
          within 48 hours.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full rounded-xl border border-border bg-card shadow-[0_12px_40px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.04)]">
      {/* Progress bar */}
      <div className="px-6 pt-6 sm:px-8 sm:pt-8">
        <p className="mb-2 text-xs font-medium tracking-widest text-primary uppercase">
          Step {step} of {TOTAL_STEPS}
        </p>
        <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-primary transition-all duration-300 ease-out"
            style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate className="p-6 sm:p-8">
        {status === "error" && (
          <div className="mb-6 rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-foreground">
            {errorMessage}
          </div>
        )}

        {/* Step content — one at a time with transition */}
        <div className="min-h-[320px]">
          {step === 1 && (
            <div key="step1" className="animate-fade-in-up flex flex-col gap-5">
              <SectionLabel>{STEP_LABELS[1]}</SectionLabel>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="fullName"
                    className="text-sm font-medium text-foreground"
                  >
                    Full name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => {
                      handleChange("fullName", e.target.value);
                      clearError("fullName");
                    }}
                    disabled={status === "loading"}
                    className={inputClass(!!fieldErrors.fullName)}
                    placeholder="Your name"
                  />
                  {fieldErrors.fullName && (
                    <p className="text-sm text-primary/90" role="alert">
                      {fieldErrors.fullName}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-foreground"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                      handleChange("email", e.target.value);
                      clearError("email");
                    }}
                    disabled={status === "loading"}
                    className={inputClass(!!fieldErrors.email)}
                    placeholder="you@email.com"
                  />
                  {fieldErrors.email && (
                    <p className="text-sm text-primary/90" role="alert">
                      {fieldErrors.email}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="age"
                    className="text-sm font-medium text-foreground"
                  >
                    Age
                  </label>
                  <input
                    id="age"
                    type="text"
                    inputMode="numeric"
                    value={formData.age}
                    onChange={(e) => handleAgeChange(e.target.value)}
                    disabled={status === "loading"}
                    className={inputClass(!!fieldErrors.age)}
                    placeholder="e.g. 28"
                  />
                  {fieldErrors.age && (
                    <p className="text-sm text-primary/90" role="alert">
                      {fieldErrors.age}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="location"
                    className="text-sm font-medium text-foreground"
                  >
                    Location — city/state
                  </label>
                  <input
                    id="location"
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleChange("location", e.target.value)}
                    disabled={status === "loading"}
                    className={inputClass(false)}
                    placeholder="e.g. Denver, CO"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div key="step2" className="animate-fade-in-up flex flex-col gap-5">
              <SectionLabel>{STEP_LABELS[2]}</SectionLabel>
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-foreground">
                    How long have you been training?
                  </label>
                  <DropdownSelect
                    value={formData.trainingLength}
                    onValueChange={(v) => handleChange("trainingLength", v)}
                    options={TRAINING_LENGTH_OPTIONS}
                    placeholder="Select..."
                    disabled={status === "loading"}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-foreground">
                    How many days per week do you train?
                  </label>
                  <DropdownSelect
                    value={formData.daysPerWeek}
                    onValueChange={(v) => handleChange("daysPerWeek", v)}
                    options={DAYS_PER_WEEK_OPTIONS}
                    placeholder="Select..."
                    disabled={status === "loading"}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-sm font-medium text-foreground">
                    Types of training
                  </span>
                  <div className="flex flex-wrap gap-3 pt-1">
                    {TRAINING_TYPES.map((opt) => (
                      <label
                        key={opt.value}
                        className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground"
                      >
                        <Checkbox
                          checked={formData.trainingTypes.includes(opt.value)}
                          onCheckedChange={(checked) =>
                            handleTrainingTypeToggle(
                              opt.value,
                              checked === true,
                            )
                          }
                          disabled={status === "loading"}
                          className="border-muted-foreground/80 data-[state=unchecked]:bg-input data-[state=unchecked]:border-muted-foreground/80"
                        />
                        {opt.label}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div key="step3" className="animate-fade-in-up flex flex-col gap-5">
              <SectionLabel>{STEP_LABELS[3]}</SectionLabel>
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-foreground">
                    Primary goal
                  </label>
                  <DropdownSelect
                    value={formData.primaryGoal}
                    onValueChange={(v) => handleChange("primaryGoal", v)}
                    options={PRIMARY_GOAL_OPTIONS}
                    placeholder="Select..."
                    disabled={status === "loading"}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="targetTimeline"
                    className="text-sm font-medium text-foreground"
                  >
                    Target timeline
                  </label>
                  <input
                    id="targetTimeline"
                    type="text"
                    value={formData.targetTimeline}
                    onChange={(e) =>
                      handleChange("targetTimeline", e.target.value)
                    }
                    disabled={status === "loading"}
                    className={inputClass(false)}
                    placeholder='e.g. "6 months", "before summer"'
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="holdingBack"
                    className="text-sm font-medium text-foreground"
                  >
                    What&apos;s holding you back from reaching your goal right
                    now?
                  </label>
                  <textarea
                    id="holdingBack"
                    rows={3}
                    value={formData.holdingBack}
                    onChange={(e) =>
                      handleChange("holdingBack", e.target.value)
                    }
                    disabled={status === "loading"}
                    className={`resize-none ${inputClass(false)}`}
                    placeholder="Tell me more..."
                  />
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div key="step4" className="animate-fade-in-up flex flex-col gap-5">
              <SectionLabel>{STEP_LABELS[4]}</SectionLabel>
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="injuries"
                    className="text-sm font-medium text-foreground"
                  >
                    Prior injuries or physical limitations?
                  </label>
                  <textarea
                    id="injuries"
                    rows={2}
                    value={formData.injuries}
                    onChange={(e) => handleChange("injuries", e.target.value)}
                    disabled={status === "loading"}
                    className={`resize-none ${inputClass(false)}`}
                    placeholder="Optional"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="medicalConditions"
                    className="text-sm font-medium text-foreground"
                  >
                    Medical conditions relevant to training or nutrition?
                  </label>
                  <textarea
                    id="medicalConditions"
                    rows={2}
                    value={formData.medicalConditions}
                    onChange={(e) =>
                      handleChange("medicalConditions", e.target.value)
                    }
                    disabled={status === "loading"}
                    className={`resize-none ${inputClass(false)}`}
                    placeholder="Optional"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-foreground">
                    Currently working with a doctor or specialist?
                  </label>
                  <DropdownSelect
                    value={formData.doctorOrSpecialist}
                    onValueChange={(v) => handleChange("doctorOrSpecialist", v)}
                    options={DOCTOR_OPTIONS}
                    placeholder="Select..."
                    disabled={status === "loading"}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-foreground">
                    How would you describe your current diet?
                  </label>
                  <DropdownSelect
                    value={formData.currentDiet}
                    onValueChange={(v) => handleChange("currentDiet", v)}
                    options={CURRENT_DIET_OPTIONS}
                    placeholder="Select..."
                    disabled={status === "loading"}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="dietaryRestrictions"
                    className="text-sm font-medium text-foreground"
                  >
                    Dietary restrictions or allergies?
                  </label>
                  <input
                    id="dietaryRestrictions"
                    type="text"
                    value={formData.dietaryRestrictions}
                    onChange={(e) =>
                      handleChange("dietaryRestrictions", e.target.value)
                    }
                    disabled={status === "loading"}
                    className={inputClass(false)}
                    placeholder="Optional"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 5 && (
            <div key="step5" className="animate-fade-in-up flex flex-col gap-5">
              <SectionLabel>{STEP_LABELS[5]}</SectionLabel>
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-foreground">
                    Gym access?
                  </label>
                  <DropdownSelect
                    value={formData.gymAccess}
                    onValueChange={(v) => handleChange("gymAccess", v)}
                    options={GYM_ACCESS_OPTIONS}
                    placeholder="Select..."
                    disabled={status === "loading"}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-foreground">
                    Monthly coaching budget?
                  </label>
                  <DropdownSelect
                    value={formData.monthlyBudget}
                    onValueChange={(v) => handleChange("monthlyBudget", v)}
                    options={BUDGET_OPTIONS}
                    placeholder="Select..."
                    disabled={status === "loading"}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-foreground">
                    How did you hear about Kaia?
                  </label>
                  <DropdownSelect
                    value={formData.hearAbout}
                    onValueChange={(v) => handleChange("hearAbout", v)}
                    options={HEAR_ABOUT_OPTIONS}
                    placeholder="Select..."
                    disabled={status === "loading"}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="anythingElse"
                    className="text-sm font-medium text-foreground"
                  >
                    Anything else you&apos;d like me to know?
                  </label>
                  <textarea
                    id="anythingElse"
                    rows={3}
                    value={formData.anythingElse}
                    onChange={(e) =>
                      handleChange("anythingElse", e.target.value)
                    }
                    disabled={status === "loading"}
                    className={`resize-none ${inputClass(false)}`}
                    placeholder="Optional"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer: Back + Next / Submit */}
        <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-border pt-8">
          {step > 1 ? (
            <button
              type="button"
              onClick={goBack}
              disabled={status === "loading"}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-transparent px-5 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground disabled:opacity-60"
            >
              <ArrowLeft size={18} />
              Back
            </button>
          ) : (
            <span />
          )}
          <button
            type="submit"
            disabled={status === "loading"}
            className="ml-auto inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all duration-200 hover:bg-primary/90 hover:shadow-[0_0_16px_rgba(143,56,72,0.3)] disabled:opacity-60 disabled:pointer-events-none"
          >
            {status === "loading" ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Submitting...
              </>
            ) : step === TOTAL_STEPS ? (
              "Submit application"
            ) : (
              <>
                Next
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
