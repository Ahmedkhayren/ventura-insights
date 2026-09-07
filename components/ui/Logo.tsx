import Link from "next/link";

export function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link className="brand" href="/" aria-label="Ventura Insights home">
      <svg className="brand-mark" viewBox="0 0 38 38" aria-hidden="true">
        <path d="M19 2 4 10v18l15 8 15-8V10L19 2Zm0 7 8.5 4.6-4.2 2.3L19 13.6l-8.5 4.6V14L19 9Zm-8.5 15v-4.4l4.3 2.3v4.5l4.2 2.3v-4.6l4.3 2.3v4.4L19 32l-8.5-4.6V24Zm17 3.4-4.2 2.3v-4.6l-4.3-2.3 4.3-2.3 4.2 2.3v4.6Z" />
      </svg>
      <span className="brand-type" style={{ color: inverse ? "white" : undefined }}>
        <span>Ventura</span>
        <span>Insights</span>
      </span>
    </Link>
  );
}
