import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type');
  const pageNo = searchParams.get('pageNo') || '1';
  const numOfRows = searchParams.get('numOfRows') || '20';
  const realmNm = searchParams.get('realm_nm'); // ✅ 분야명 추가

  const serviceKey = process.env.DATA_API_KEY;
  const baseUrl = 'https://apis.data.go.kr/1051000/MoefOpenAPI';
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const resultType = 'json';

  // ✅ realmNm이 있으면 파라미터에 추가
  const url = `${baseUrl}/${type}?serviceKey=${serviceKey}&pageNo=${pageNo}&numOfRows=${numOfRows}&resultType=${resultType}&bsnsyear=${year}${
    realmNm ? `&realm_nm=${encodeURIComponent(realmNm)}` : ''
  }`;

  const res = await fetch(url);
  const json = await res.json();
  return NextResponse.json(json);
}
