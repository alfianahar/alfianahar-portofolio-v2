import type { BioButton } from "@app-types/content";

export const bioButtons = [
  {
    id: 1,
    icon: {
      type: "",
      name: "code-alt",
    },
    title: "My page",
    style: "",
    target: "/",
  },
  {
    id: 2,
    icon: {
      type: "",
      name: "mail-send",
    },
    title: "Get in touch",
    style: "",
    target: "mailto:alfian.aswinda@gmail.com",
  },
  {
    id: 3,
    icon: {
      type: "logo",
      name: "whatsapp",
    },
    title: "Send me message",
    style: "",
    target: "https://wa.me/6285725359530",
  },
  {
    id: 4,
    icon: {
      type: "",
      name: "cool",
    },
    title: "About me",
    style: "bio-next",
    target: "/about",
  },
] satisfies BioButton[];
