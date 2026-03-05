export type ScrollRevealDelay = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export function scrollRevealClass(
  isInView: boolean,
  delay?: ScrollRevealDelay,
): string {
  const base = "scroll-animate-in";
  const delayClass =
    delay !== undefined && delay > 0 ? `scroll-animate-in-delay-${delay}` : "";
  const visible = isInView ? "scroll-animate-in-visible" : "";
  return [base, delayClass, visible].filter(Boolean).join(" ");
}
