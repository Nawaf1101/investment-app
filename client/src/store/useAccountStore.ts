import { create } from "zustand";

interface AuthState {
  isLoggedIn: boolean;
  user: { name: string; email: string };
  setLogin: () => void;
  setLogout: () => void;
  setUser: (name: string, email: string) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  user: { name: "", email: "" },
  setLogin: () => set({ isLoggedIn: true }),
  setLogout: () => set({ isLoggedIn: false, user: { name: "", email: "" } }),
  setUser: (name, email) =>
    set((state) => ({ user: { name: name, email: email } })),
}));

export default useAuthStore;
