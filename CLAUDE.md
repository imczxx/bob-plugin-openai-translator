# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

This is a plugin for the Bob translation application, designed to provide translation services using OpenAI's models. The project is written in TypeScript.

**Commands:**
*   **Install dependencies**: `pnpm install`
*   **Build the plugin**: `pnpm build` (based on `rollup.config.ts`)

**Architecture:**
*   `src/main.ts`: The entry point of the plugin, handling the main logic and integration with Bob.
*   `src/adapter/`: Contains different adapters for various OpenAI-compatible APIs (e.g., `openai.ts`, `azure-openai.ts`).
*   `rollup.config.ts`: Rollup configuration for building and bundling the plugin.
*   `package.json`: Defines project scripts and dependencies.
