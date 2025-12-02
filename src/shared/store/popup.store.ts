import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PopupState {
  isOpen: boolean;
  hasBeenShown: boolean;
  showPopup: () => void;
  closePopup: () => void;
  trigger: () => void;
  resetState: () => void;
}

const initialState = {
  isOpen: true,
  hasBeenShown: false,
};

export const usePopupStore = create<PopupState>()(
  persist(
    (set) => ({
      ...initialState,

      showPopup: () =>
        set((state) => ({
          isOpen: true,
        })),

      trigger: () =>
        set(() => ({
          isOpen: !initialState.isOpen,
          hasBeenShown: false,
        })),

      closePopup: () =>
        set(() => ({
          isOpen: false,
          hasBeenShown: true,
        })),

      resetState: () => set(initialState),
    }),
    {
      name: "popup-storage",
    }
  )
);
