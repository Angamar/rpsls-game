import eslintPluginReact from "eslint-plugin-react";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactRefresh from "eslint-plugin-react-refresh";
import eslintConfigPrettier from "eslint-config-prettier/flat";

export default [
  eslintConfigPrettier,
  {
    ignores: ["**/eslint.config.*", "**/node_modules/**", "**/*.config.*"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: [
          "./packages/ui/tsconfig.json",
          "./packages/api/tsconfig.json",
          "./packages/shared/tsconfig.json",
        ],
        tsconfigRootDir: process.cwd(),
        sourceType: "module",
      },
    },
    rules: {
      // shared rules for all TS code
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["warn"],
      "@typescript-eslint/explicit-function-return-type": "off",
    },
  },

  // React-specific config for UI
  {
    files: ["packages/ui/**/*.tsx", "packages/ui/**/*.ts"],
    plugins: {
      react: eslintPluginReact,
      "react-hooks": eslintPluginReactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },

  // Node.js-specific config for API
  {
    files: ["packages/api/**/*.ts"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {
      "no-console": "off",
    },
  },
];
