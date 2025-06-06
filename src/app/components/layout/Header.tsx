'use client';

import { useRouter, usePathname } from 'next/navigation';
import styles from "./header.module.css";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const isDetailPage = pathname.startsWith('/detail');

  return (
    <header className={styles.header}>
      {isDetailPage && (
        <button onClick={() => router.back()} className={styles.header__back}>
          ← 뒤로가기
        </button>
      )}
      <h1>국가보조금 정보 서비스</h1>
    </header>
  );
}
