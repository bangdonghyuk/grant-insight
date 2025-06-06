
import "./globals.css";
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <div className="wrap">
          <Header />
          <div className="container">
            <div className="content">{children}</div>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
