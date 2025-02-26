// ColorGuessingGame/store.js
import create from "zustand";

export const useStore = create((set) => ({
  language: "en",
  mode: "easy",
  score: 0,
  setLanguage: (lang) => set({ language: lang }),
  setMode: (mode) => set({ mode }),
  incrementScore: () => set((state) => ({ score: state.score + 1 })),
}));
