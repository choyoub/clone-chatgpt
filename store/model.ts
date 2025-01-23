import { create } from "zustand";

type State = {
  model: string;
};

type Action = {
  updateModel: (model: State["model"]) => void;
};

const useModelStore = create<State & Action>((set) => ({
  model: "gpt-3.5-turbo",
  updateModel: (model) => set({ model }),
}));

export default useModelStore;
