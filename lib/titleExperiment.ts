// Helper to rotate titles based on the week of the year
// This allows A/B testing titles automatically across different builds without needing edge middleware.

export const HOMEPAGE_TITLES = [
    "Free LinkedIn Profile Score Checker (2026)", // Baseline
    "Analyze Your LinkedIn Profile Score Instantly", // Action-oriented
    "LinkedIn SEO Checker – Get Your Profile Ranking", // SEO-focused
    "Check Your LinkedIn Strength Score Free", // Strength-focused
];

export function getDynamicHomepageTitle(): string {
    // Get the current week number
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1);
    const diff = now.getTime() - start.getTime();
    const oneWeek = 1000 * 60 * 60 * 24 * 7;
    const weekNumber = Math.floor(diff / oneWeek);

    // Rotate the title based on the week number
    const titleIndex = weekNumber % HOMEPAGE_TITLES.length;
    return HOMEPAGE_TITLES[titleIndex];
}
