import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface User {
  name: string;
  email: string;
}

interface AuthState {
  isLoggedIn: boolean;
  user: User;
  setLogin: () => void;
  setLogout: () => void;
  setUser: (name: string, email: string) => void;
}

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      isLoggedIn: false,
      user: { name: "", email: "" },
      setLogin: () => set({ isLoggedIn: true }),
      setLogout: () =>
        set({ isLoggedIn: false, user: { name: "", email: "" } }),
      setUser: (name, email) => set({ user: { name, email } }),
    }),
    {
      name: "auth-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // using sessionStorage
    }
  )
);

// const useAuthStore = create<AuthState>((set) => ({
//   isLoggedIn: false,
//   user: { name: "", email: "" },
//   setLogin: () => set({ isLoggedIn: true }),
//   setLogout: () => set({ isLoggedIn: false, user: { name: "", email: "" } }),
//   setUser: (name, email) => set((state) => ({ user: { name, email } })),
// }));

export default useAuthStore;
