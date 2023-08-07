import { create } from "zustand";

interface IStore {
  selectedId: number | undefined;
  typeMedia: string;
  setSelectedID: (selectedId: number, typeMedia: string) => void;
}

export const useStore = create<IStore>((set) => {
  return {
    selectedId: undefined,
    typeMedia: "",
    setSelectedID: (selectedId: number, typeMedia: string) =>
      set((state) => ({ ...state, selectedId, typeMedia })),
  };
});
