import type { NavigationItem } from "../types/content";

export const navigationItems = [
  { label: "Services", href: "/#services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/#blog" },
  { label: "Contact", href: "/about#contact" },
] satisfies NavigationItem[];
