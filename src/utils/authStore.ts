import { deleteItemAsync, getItem, setItem } from "expo-secure-store";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type UserState = {
  isLoggedIn: boolean;
  token: string | null;
  logIn: (token: string) => void;
  logOut: () => void;
};

export const useAuthStore = create(
  persist<UserState>(
    (set) => ({
      isLoggedIn: false,
      token: null,
      logIn: (token) => {
        set((state) => {
          return { ...state, isLoggedIn: true, token };
        });
      },
      logOut: () => {
        set((state) => {
          return { ...state, isLoggedIn: false, token: null };
        });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => ({
        setItem,
        getItem,
        removeItem: deleteItemAsync,
      })),
    },
  ),
);
