import { create } from "zustand";

interface AppReadyState {
  loginReady: boolean;
  setLoginReady: (v: boolean) => void;
}

export const useAppReadyStore = create<AppReadyState>((set) => ({
  loginReady: false,
  setLoginReady: (v) => set({ loginReady: v }),
}));
