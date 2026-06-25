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
  year?: number;
  body?: string;
  status?: string;
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

export type ChatAction = {
  label: string;
  href: string;
};

export type ChatMessage = {
  id: string;
  role: "assistant" | "user";
  content: string;
  actions?: ChatAction[];
};

export type ChatQuickAction = {
  label: string;
  prompt: string;
  href?: string;
};

export type BioButton = {
  icon: {
    type: string;
    name: string;
  };
  title: string;
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
