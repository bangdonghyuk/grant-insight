import { create } from 'zustand';

// detail 데이터의 타입 정의
export type DetailType = {
  [key: string]: string;
  // 또는 정확한 타입이 필요하다면 아래처럼 구체적으로 정의
  // PBLANC_NM: string;
  // SECT_NM?: string;
  // JRSD_NM?: string;
  // ...
};

type DetailState = {
  detail: DetailType | null;
  setDetail: (data: DetailType) => void;
};

export const useDetailStore = create<DetailState>((set) => ({
  detail: null,
  setDetail: (data) => set({ detail: data }),
}));
