'use client';

import { useEffect, useState} from 'react';
import { useRouter } from 'next/navigation';
import { useDetailStore } from './stores/detailStore';
import type { DetailType } from './lib/keyLabelMap';
import styles from "./page.module.css";

export default function Home() {
  const [pageNo, setPageNo] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [data, setData] = useState<any[]>([]);
  const router = useRouter();

  const [active, setActive] = useState('T_OPD_PBNS');
  const [selectedRealm, setSelectedRealm] = useState('');

  const [loading, setLoading] = useState(false);
  const { setDetail } = useDetailStore();
  const handleClick = (item: DetailType) => {
    setDetail(item);
    router.push(`/detail`);
  };


const fetchDataByType = async (type: string, page: number = 1, realm?: string) => {
  setLoading(true);

  try {
    const query = new URLSearchParams({
      type,
      pageNo: String(page),
      numOfRows: '10',
    });

    if (realm) {
      query.append('realm_nm', realm);
    }

    const res = await fetch(`/api/bojo?${query.toString()}`);
    const json = await res.json();
    const items = json.response?.body?.items?.item || [];

    if (page === 1) {
      setData(items);
    } else {
      setData(prev => [...prev, ...items]);
    }

    console.log(json);

    const totalCount = Number(json.response?.body?.totalCount || 0);
    const currentItemCount = (page - 1) * 20 + items.length;
    setHasMore(currentItemCount < totalCount);
  } catch (error) {
    console.error('API 호출 실패:', error);
  } finally {
    setLoading(false);
  }
};
  
    // 초기 useEffect
    useEffect(() => {
      // 초기 로딩 or 분야 선택 변경 시 호출
      fetchDataByType(active, 1, selectedRealm);
      setPageNo(1);
    }, [selectedRealm]);

    // 셀렉트 변경 핸들러도 재활용
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newTab = e.target.value;
      setActive(newTab);
      fetchDataByType(newTab, 1, selectedRealm);
      setPageNo(1);
    };

  const API_CODES = [
    { name: '공모사업', code: 'T_OPD_PBNS' },
    { name: '분야부문별 보조금 예산현황', code: 'T_OPD_PRMSCT_SBBGST' },
    { name: '중앙부처별 보조금 예산현황', code: 'T_OPD_PCMNOF_SBBGST' },
    { name: '비목별 보조금 예산현황', code: 'T_OPD_PEXTM_SBBGST' },
    { name: '분야부문별 보조사업자현황', code: 'T_OPD_PRMSCT_ABZMST' },
    { name: '중앙부처별 보조사업자현황', code: 'T_OPD_PCMNOF_ABZMST' },
    { name: '내역사업현황', code: 'T_OPD_DTLBZ_CSTS' },
    // { name: '보조사업현황', code: 'T_OPD_ASBS_IFPBNT' },
    // { name: '보조사업자정보공시목록', code: 'T_OPD_ABZM_IFPBNT_LIST' },
    // { name: '중요재산정보공시목록', code: 'T_OPD_IMPRPR_IFPBNT_LIST' },
  ];

  const REALM_NM_OPTIONS = [
    "일반·지방행정",
    "공공질서및안전",
    "통일·외교",
    "국방",
    "교육",
    "문화및관광",
    "환경",
    "사회복지",
    "보건",
    "농림수산",
    "산업·중소기업및에너지",
    "교통및물류",
    "통신",
    "국토및지역개발",
    "과학기술",
  ];

  function formatDate(yyyymmdd: string) {
    if (!yyyymmdd || yyyymmdd.length !== 8) return yyyymmdd;
    const year = yyyymmdd.slice(0, 4);
    const month = yyyymmdd.slice(4, 6);
    const day = yyyymmdd.slice(6, 8);
    return `${year}년 ${month}월 ${day}일`;
  }

  function decodeHtmlEntities(html: string) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.documentElement.textContent || '';
  }

  return (
    <div className={styles.home}>
      <div className={styles.selectArea}>
        <div className={styles.selectBox}>
          <select className={styles.selectBox__select} onChange={handleChange}>
            {API_CODES.map((item, index) => (
              <option key={index} value={item.code}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.selectBox}>
          <select
            className={styles.selectBox__select}
            value={selectedRealm}
            onChange={(e) => setSelectedRealm(e.target.value)}
          >
            <option value="">전체</option>
            {REALM_NM_OPTIONS.map((realm) => (
              <option key={realm} value={realm}>
                {realm}
              </option>
            ))}
          </select>
        </div>
      </div>


      <div className={styles.content}>
        <div className={styles.total}>
          <p>조회 데이터<strong>{data.length}</strong></p>
        </div>
        {loading ? (
          <p>로딩 중...</p>
        ) : data.length > 0 ? (
            <ul className={styles.listBox}>
              {data.map((item, index) => {
                switch (active) {
                  case 'T_OPD_PBNS': // 공모사업
                    return (
                      <li key={index} className={styles.listBox__item}>
                        <div className={styles.listBox__tit}>{item.PSSRP_INSTT_NM}</div>
                        <div className={styles.listBox__name}>{decodeHtmlEntities(item.PBLANC_NM)}</div>
                        <div className={styles.listBox__grayBox}>{item.REALM_NM}</div>
                        <div className={styles.listBox__box}>
                          <div className={styles.listBox__subTit}>
                            지원예산액
                          </div>
                          <div className={styles.listBox__text}>{Number(item.SPORT_BGAMT).toLocaleString()}원</div>
                        </div>
                        
                        <div className={styles.listBox__box}>
                          <div className={styles.listBox__subTit}>
                            접수마감일
                          </div>
                          <div className={styles.listBox__text}>{formatDate(item.RCEPT_END_DE)}</div>
                        </div>

                        <div className={styles.listBox__btns}>
                          <button className={styles.listBox__btn} onClick={() => handleClick(item)}>자세히 보기</button>
                        </div>
                      </li>
                    );

                  case 'T_OPD_PRMSCT_SBBGST':
                  case 'T_OPD_PCMNOF_SBBGST':
                  case 'T_OPD_PEXTM_SBBGST': // 예산현황
                    return (
                      <li key={index} className={styles.listBox__item}>

                        <div className={styles.listBox__tit}>
                          {item.JRSD_NM && item.JRSD_NM.trim() !== '' ? item.JRSD_NM : item.REALM_NM}
                        </div>

                        <div className={styles.listBox__name}>{item.SECT_NM}</div>
                        <div className={styles.listBox__box}>
                            <div className={styles.listBox__subTit}>예산</div>
                            <div className={styles.listBox__text}>{Number(item.BGAMT).toLocaleString()}억원</div>
                        </div>
                        <div className={styles.listBox__box}>
                            <div className={styles.listBox__subTit}>연도</div>
                            <div className={styles.listBox__text}>{item.BSNSYEAR} </div>
                        </div>
                        <div className={styles.listBox__box}>
                            <div className={styles.listBox__subTit}>기준일</div>
                            <div className={styles.listBox__text}>{item.STDR_DE.slice(0,4)}-{item.STDR_DE.slice(4,6)}-{item.STDR_DE.slice(6,8)}</div>
                        </div>
                      </li>
                    );

                  case 'T_OPD_PRMSCT_ABZMST':
                  case 'T_OPD_PCMNOF_ABZMST': // 보조사업자현황
                    return (
                      <li key={index} className={styles.listBox__item}>
                        <div className={styles.listBox__tit}>{item.REALM_NM}</div>
                        <div className={styles.listBox__name}>{item.SECT_NM}</div>
                        <div className={styles.listBox__box}>
                            <div className={styles.listBox__subTit}>보조사업자수</div>
                            <div className={styles.listBox__text}>{Number(item.ABZM_CO).toLocaleString()}</div>
                        </div>
                        <div className={styles.listBox__box}>
                            <div className={styles.listBox__subTit}>연도</div>
                            <div className={styles.listBox__text}>{item.BSNSYEAR} </div>
                        </div>
                        <div className={styles.listBox__box}>
                            <div className={styles.listBox__subTit}>기준일</div>
                            <div className={styles.listBox__text}>{item.STDR_DE.slice(0,4)}-{item.STDR_DE.slice(4,6)}-{item.STDR_DE.slice(6,8)}</div>
                        </div>
                      </li>
                    );

                  case 'T_OPD_DTLBZ_CSTS': // 내역사업현황
                    return (
                      <li key={index} className={styles.listBox__item}>
                        <div className={styles.listBox__tit}>{item.JRSD_NM}</div>
                        <div className={styles.listBox__name}>{item.DTLBZ_NM}</div>
                        <div className={styles.listBox__box}>
                            <div className={styles.listBox__subTit}>지출액</div>
                            <div className={styles.listBox__text}>{item.BUDGET_CRNTAM ? `${(Number(item.BUDGET_CRNTAM) / 100).toLocaleString()}억원` : '-'}</div>
                        </div>
                        <div className={styles.listBox__box}>
                            <div className={styles.listBox__subTit}>연도</div>
                            <div className={styles.listBox__text}>{item.BSNSYEAR} </div>
                        </div>
                        <div className={styles.listBox__box}>
                            <div className={styles.listBox__subTit}>기준일</div>
                            <div className={styles.listBox__text}>{item.STDR_DE.slice(0,4)}-{item.STDR_DE.slice(4,6)}-{item.STDR_DE.slice(6,8)}</div>
                        </div>
                      </li>
                    );
                  default:
                    return (
                      <li key={index} className={styles.listBox__item}>
                        <div className={styles.listBox__tit}>{item.REALM_NM}</div>
                        <div className={styles.listBox__tit}>{item.SECT_NM}</div>
                      </li>
                    );
                  }
              })}
            </ul>
        ) : (
          <p>데이터가 없습니다.</p>
        )}

        {hasMore && !loading && (
          <div className={styles.btns}>
            <button
              className={styles.loadMore}
              onClick={() => {
                const nextPage = pageNo + 1;
                setPageNo(nextPage);
                fetchDataByType(active, nextPage, selectedRealm); // 🔥 realm도 넘김
              }}
            >
              더보기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
