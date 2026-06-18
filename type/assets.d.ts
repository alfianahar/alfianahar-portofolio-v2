declare module "*.css";

declare module "*.svg" {
  import type { StaticImageData } from "next/image";

  const src: StaticImageData;
  export default src;
}
