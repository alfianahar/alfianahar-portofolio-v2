import eslintPluginAstro from "eslint-plugin-astro";

export default [
  ...eslintPluginAstro.configs.recommended,
  {
    ignores: [".astro/**", "dist/**", "node_modules/**", "public/**", ".git/**"],
  },
];
