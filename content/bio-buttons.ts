import type { BioButton } from "@app-types/content";

export const bioButtons = [
  {
    icon: {
      type: "",
      name: "code-alt",
    },
    title: "My page",
    target: "/",
  },
  {
    icon: {
      type: "",
      name: "mail-send",
    },
    title: "Get in touch",
    target: "mailto:alfian.aswinda@gmail.com",
  },
  {
    icon: {
      type: "logo",
      name: "whatsapp",
    },
    title: "Send me message",
    target: "https://wa.me/6285725359530",
  },
  {
    icon: {
      type: "",
      name: "cool",
    },
    title: "About me",
    target: "/about",
  },
] satisfies BioButton[];
