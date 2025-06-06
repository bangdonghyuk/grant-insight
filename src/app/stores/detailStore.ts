// stores/detailStore.ts
import { create } from 'zustand';
import type { DetailType } from '../lib/keyLabelMap';

type DetailState = {
  detail: DetailType | null;
  setDetail: (data: DetailType) => void;
};

export const useDetailStore = create<DetailState>((set) => ({
  detail: null,
  setDetail: (data) => set({ detail: data }),
}));
