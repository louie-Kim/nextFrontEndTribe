import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { twMerge } from "tailwind-merge";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] }); //  Sans-serif 폰트
// console.log('구글 폰트',inter.className); // inter는 Google Fonts 클래스, __className_d65c78


export const metadata: Metadata = {
  title: "AI Startup Landing Page",
  description: "A landing page for an AI startup created with Frontend Tribe",
};

export default function RootLayout({children,}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* inter.className: Google Fonts클래스 + 나머지 tailwind 스타일, antialiased: 다크모드에서 폰트가 부드럽게 보이게하기  */}
      <body className={twMerge(inter.className, "bg-black text-white antialiased")}>
        {/* page.tsx : Home() : '/' */}
        {children} 
      </body>
    </html>
  );
}
