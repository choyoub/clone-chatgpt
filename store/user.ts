import { User } from "@/types/db";
import { create } from "zustand";

type State = {
  user: Partial<User>;
};

type Action = {
  updateUser: (user: State["user"]) => void;
};

const useUserStore = create<State & Action>((set) => ({
  user: {
    id: "",
    name: "",
  },
  updateUser: (user) => set({ user }),
}));

export default useUserStore;
