
import { defineConfig } from 'vite';

export default defineConfig({
  base: process.env.VERCEL ? '/' : '/Portfolio/', // set this to '/' for Vercel and '/Portfolio/' for GitHub Pages
});