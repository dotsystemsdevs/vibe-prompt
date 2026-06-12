import Link from "next/link";

/**
 * The quiet, one-line pointer to the newsletter. Used everywhere EXCEPT the two
 * places that own the actual form (the homepage and /weekly), so the signup form
 * never repeats across the site.
 */
export function WeeklyFixLink({ className = "text-meta" }: { className?: string }) {
  return (
    <p className={className}>
      Get one AI build failure and its fix in your inbox each week.{" "}
      <Link href="/weekly" className="vp-link">
        The Weekly Fix →
      </Link>
    </p>
  );
}
