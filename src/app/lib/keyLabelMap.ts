// lib/keyLabelMap.ts

export const keyLabelMap = {
  BSNSYEAR: "사업연도",
  DDTLBZ_NM: "사업명",
  BSNS_SMRY: "사업요약",
  BSNS_PURPS_CN: "사업목적",
  BSNS_BEGIN_DE: "사업시작일",
  BSNS_END_DE: "사업종료일",
  SPORT_CN: "지원내용",
  SPORT_TRGET_CN: "지원대상",
  PBLANC_NM: "공고명",
  PBLANC_BEGIN_DE: "공고시작일",
  PBLANC_END_DE: "공고종료일",
  RCEPT_BEGIN_DE: "접수시작일",
  RCEPT_END_DE: "접수종료일",
  RCEPT_END_TM: "접수마감시간",
  REQST_RCEPT_MTH_CN: "접수방법",
  PRESENTN_PAPERS_GUIDANCE_CN: "제출서류 안내",
  SLCTN_STDR_DC: "선정기준",
  SLCTN_DE: "선정일",
  SLCTN_RESULT_DSPTH_MTH_CN: "선정결과 발표방법",
  CHARGER_NM: "담당자명",
  CHARGER_TELNO: "담당자 연락처",
  CHARGER_EMAIL: "담당자 이메일",
  PSSRP_INSTT_NM: "주관기관",
  SPORT_BGAMT: "지원예산",
  REALM_NM: "분야",
  EXPC_EFFECT_CN: "기대효과",
  EXCL_TRGET_CN: "지원 제외 대상"
} as const;

export type DetailKey = keyof typeof keyLabelMap;
export type DetailType = Record<DetailKey, string>;
