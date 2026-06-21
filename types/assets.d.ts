declare module "*.css";

declare module "*.svg" {
  import type { StaticImageData } from "next/image";

  const src: StaticImageData;
  export default src;
}

declare module "*.md?raw" {
  const content: string;
  export default content;
}
