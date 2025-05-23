import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import { Linter } from "eslint";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// You can add rules directly to the final config array
const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Add custom rules override
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
];

export default eslintConfig;
