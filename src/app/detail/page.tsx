// app/detail/page.tsx
'use client';

import { useDetailStore } from '../stores/detailStore';
import styles from './page.module.css';

export default function DetailPage() {
  const { detail } = useDetailStore();

  if (!detail) {
    return <div>데이터를 불러오는 중입니다...</div>;
  }

  console.log(detail);

  function formatDate(yyyymmdd: string) {
    if (!yyyymmdd || yyyymmdd.length !== 8) return yyyymmdd;
    const year = yyyymmdd.slice(0, 4);
    const month = yyyymmdd.slice(4, 6);
    const day = yyyymmdd.slice(6, 8);
    return `${year}년 ${month}월 ${day}일`;
  }

  return (
    <div className={styles.detail}>

      <div className={styles.detail__top}>
        <div className={styles.detail__name}>
          {detail.PSSRP_INSTT_NM}
        </div>

        <div className={styles.detail__tit}>
            {detail.DDTLBZ_NM}
        </div>

        <div className={styles.detail__box}>
            <div className={styles.detail__boxTit}>
              지원예산액
            </div>

            <div className={styles.detail__boxMoney}>
              {Number(detail.SPORT_BGAMT).toLocaleString()}원
            </div>
        </div>

        <div className={styles.detail__grayBox}>
          <div className={styles.detail__grayBox_item}>
            <div className={styles.detail__grayBox_tit}>접수 마감일</div>
            <div className={styles.detail__grayBox_text}>{formatDate(detail.RCEPT_END_DE)}</div>
          </div>
          <div className={styles.detail__grayBox_item}>
            <div className={styles.detail__grayBox_tit}>접수 방법</div>
            <div className={styles.detail__grayBox_text}>{detail.REQST_RCEPT_MTH_CN}</div>
          </div>
          <div className={styles.detail__grayBox_item}>
            <div className={styles.detail__grayBox_tit}>전화 문의</div>
            <div className={styles.detail__grayBox_text}>{detail.CHARGER_TELNO}</div>
          </div>
        </div>
      </div>


      <div className={styles.detail__bottom}>

        <div className={styles.detail__subTit}>사업요약</div>
        <div className={styles.detail__content}>
          {detail.BSNS_SMRY.split(/\r\n|\n/).map((line: string, i: number) => (
              <div key={i}>{line}</div>
          ))}
        </div>


        <div className={styles.detail__subTit}>지원대상</div>
          <div className={styles.detail__content}>
          {detail.SPORT_TRGET_CN.split(/\r\n|\n/).map((line: string, i: number) => (
              <div key={i}>{line}</div>
          ))}
        </div>
       
          <div className={styles.detail__subTit}>선정기준</div>
          <div className={styles.detail__content}>
            {detail.SLCTN_STDR_DC.split(/\r\n|\n/).map((line: string, i: number) => (
                <div key={i}>{line}</div>
            ))}
          </div>

          <div className={styles.detail__subTit}>선정결과 발표방법</div>
          <div className={styles.detail__content}>
            {detail.SLCTN_RESULT_DSPTH_MTH_CN.split(/\r\n|\n/).map((line: string, i: number) => (
                <div key={i}>{line}</div>
            ))}
          </div>

          <div className={styles.detail__subTit}>제출서류 안내</div>
          <div className={styles.detail__content}>
            {detail.PRESENTN_PAPERS_GUIDANCE_CN.split(/\r\n|\n/).map((line: string, i: number) => (
                <div key={i}>{line}</div>
            ))}
          </div>

          <div className={styles.detail__subTit}>접수기간</div>
          <div className={styles.detail__content}>
            {formatDate(detail.RCEPT_BEGIN_DE)} ~ {formatDate(detail.RCEPT_END_DE)}
          </div>

          <div className={styles.detail__subTit}>주관기관</div>
          <div className={styles.detail__content}>
            {detail.PSSRP_INSTT_NM.split(/\r\n|\n/).map((line: string, i: number) => (
                <div key={i}>{line}</div>
            ))}
          </div>
      </div>
    </div>
  );
}
