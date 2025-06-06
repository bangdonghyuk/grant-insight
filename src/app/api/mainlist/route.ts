// app/api/bojo/route.ts
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const serviceKey = process.env.DATA_API_KEY;
  const pageNo = searchParams.get('page') ?? '1';
  const realmNm = searchParams.get('realm') ?? '';
  const year = new Date().getFullYear(); // ⬅ 현재 연도
  const resultType = 'json';

  const apiUrl = `https://apis.data.go.kr/1051000/MoefOpenAPI/T_OPD_PBNS?serviceKey=${serviceKey}&pageNo=${pageNo}&numOfRows=10&resultType=${resultType}&bsnsyear=${year}`;


  try {
    const res = await fetch(apiUrl);
    const data = await res.json();
    console.log("apiUrl:", apiUrl);
    return NextResponse.json(data);
  } catch (error) {
    console.error("API 호출 오류:", error);
    return NextResponse.json({ error: 'API 호출 오류', detail: String(error) }, { status: 500 });
  }
}
