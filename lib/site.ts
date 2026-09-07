export const siteConfig = {
  name: "Ventura Insights",
  title: "Ventura Insights — Strategic Communications Consultancy",
  description:
    "Independent communications counsel for organizations navigating reputation, change, and growth.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  email: "hello@venturainsights.example",
  social: {
    linkedin: "https://www.linkedin.com/",
    x: "https://x.com/",
    instagram: "https://www.instagram.com/",
  },
};

export const navItems = [
  { href: "/insights", label: "Insights" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
