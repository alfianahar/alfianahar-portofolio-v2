export type NavigationItem = {
  label: string;
  href: string;
  external?: boolean;
};

export type SocialLink = {
  label: string;
  href: string;
  username?: string;
};

export type HeroRole = {
  fun: string;
  real: string;
};

export type Project = {
  title: string;
  slug: string;
  description: string;
  thumbnail: {
    src: string;
    alt: string;
  };
  role: string;
  position: string[];
  type: string;
  tags: string[];
  stack: string[];
  outcome?: string;
  links?: {
    live?: string;
    repo?: string;
    caseStudy?: string;
  };
};

export type ProjectFilterKind = "all" | "tag" | "type" | "position";

export type ProjectFilter = {
  kind: ProjectFilterKind;
  value?: string;
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  location?: string;
  summary: string;
  highlights: string[];
  stack?: string[];
};

export type ChatAction = {
  label: string;
  href: string;
};

export type ChatMessage = {
  id: string;
  role: "assistant" | "user";
  content: string;
  timestamp?: string;
  actions?: ChatAction[];
};

export type ChatQuickAction = {
  label: string;
  prompt: string;
  href?: string;
};

export type BioAction = {
  label: string;
  href: string;
  description: string;
  external?: boolean;
};

export type BioButton = {
  id: number;
  icon: {
    type: string;
    name: string;
  };
  title: string;
  style: string;
  target: string;
};

export type Profile = {
  name: string;
  displayName: string;
  title: string;
  email: string;
  location: string;
  website: string;
  bio: string;
};
