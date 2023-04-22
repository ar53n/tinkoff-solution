import { create } from "zustand";

export const useCostStore = create((set) => ({
  costs: [],
  fetch: async (text) => {
    const response = await fetch("http://localhost:3000/api/cost", {
      method: "POST",
      body: JSON.stringify({ text: text }),
    });
    set({ costs: await response.json() });
  },
}));
