import type { Config } from "tailwindcss";

const config: Config = {
  // tailwind 적용폴더 + 확장자
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // ex) <div className="container"/>
    container: {
      center: true, // 중앙 정렬-> (margin left, right : auto)
      padding: {
        // container 클래스 패딩 설정
        DEFAULT: "20px",
        lg: "80px",
      },
        // container 클래스 브레이크 포인트 설정
      screens: {
        sm: "375px",
        md: "768px",
        lg: "1200px",
      },
    },
    // Tailwind 전체의 반응형 브레이크포인트
    screens: {
      sm: "375px",
      md: "768px",
      lg: "1200px",
    },
    // 기본 Tailwind 테마를 확장 
    extend: {
      // colors: {
      //   primary: "#1DA1F2", // 트위터 블루
      //   secondary: "#657786",
      // },
    },
  },

  plugins: [],
};
export default config;
