import eslintPluginReact from "eslint-plugin-react";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactRefresh from "eslint-plugin-react-refresh";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import globals from "globals";
import eslintPluginCypress from "eslint-plugin-cypress";

const sharedGlobals = {
  ...globals.node,
  ...globals.browser,
  ...globals.jest,
  React: true,
};

export default [
  eslintConfigPrettier,
  {
    ignores: [
      "**/eslint.config.*",
      "**/node_modules/**",
      "**/*.config.*",
      "**/*.js",
      "**/dist/**",
      "**/build/**",
    ],
  },
  js.configs.recommended,

  // UI (React + Vite)
  {
    files: ["packages/ui/**/*.ts", "packages/ui/**/*.tsx"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: ["./packages/ui/tsconfig.json"],
        tsconfigRootDir: process.cwd(),
        sourceType: "module",
      },
      globals: sharedGlobals,
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      react: eslintPluginReact,
      "react-hooks": eslintPluginReactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
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

  // API + Shared (TypeScript-only)
  {
    files: ["packages/shared/**/*.ts", "packages/api/**/*.ts"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: [
          "./packages/shared/tsconfig.json",
          "./packages/api/tsconfig.json",
        ],
        tsconfigRootDir: process.cwd(),
        sourceType: "module",
      },
      globals: sharedGlobals,
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
    },
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
          ignoreRestSiblings: true,
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/explicit-function-return-type": "off",
      "no-console": "off",
    },
  },

  // Cypress
  {
    files: ["packages/ui/cypress/**/*.ts", "packages/ui/cypress/**/*.tsx"],
    ignores: [
      "packages/ui/src/**/*.test.ts",
      "packages/ui/src/**/*.test.tsx",
      "packages/ui/src/**/*.spec.ts",
      "packages/ui/src/**/*.spec.tsx",
    ],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: ["packages/ui/cypress/tsconfig.json"],
        tsconfigRootDir: process.cwd(),
        sourceType: "module",
      },
      globals: {
        ...sharedGlobals,
        ...globals.mocha,
        cy: "readonly",
        Cypress: "readonly",
        JQuery: "readonly",
        HTMLElement: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      cypress: eslintPluginCypress,
    },
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "cypress/no-unnecessary-waiting": "warn",
      "no-undef": "off",
    },
  },
];
