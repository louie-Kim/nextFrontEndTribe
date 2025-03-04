/** @type {import('next').NextConfig} */

import { log } from 'console';

// SVG 파일을 React 컴포넌트처럼 사용하고 싶을 때 필요한 설정
const nextConfig = {
   
  // @svgr/webpack 설정 
  webpack(config) {
    // console.log("🚀기본 config", config.module.rules);
    // Grab the existing rule that handles SVG imports
    // fileLoaderRule = next-image-loader
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg")
    );

    // console.log("🔍 Existing SVG Rule:", fileLoaderRule); // 3개의 방식 나옴

    config.module.rules.push(
      // 1.기존 next-image-loader (.svg?url) 방식
      // resourceQuery 객체는 ? 이후의 **쿼리 문자열(query string)**을 감지하고 
      // 특정 규칙을 적용하는 역할
      {
        ...fileLoaderRule,    // 기존의 fileLoaderRule 설정을 그대로 복사
        test: /\.svg$/i,      // .svg 파일만 처리하도록 Webpack에 지시 , test : 사용가능
        resourceQuery: /url/, // import 시 ?url이 포함-> *.svg?url
      },
      // 2. @svgr/webpack 컴포넌트 방식 (.svg)
      // import Logo from "@/assets/logo.svg";
      {
        test: /\.svg$/i,   
        //  issuer:{ not: /\.(css|scss|sass)$/ },  CSS, SCSS, SASS 파일에서 .svg를 import하지 못하도록 제한    
        issuer: fileLoaderRule.issuer,  //  issuer  -> import
        /**
         *  이미지 최적화 및 메타데이터 처리 관련 쿼리
         *  resourceQuery: {
              not: [
                /__next_metadata__/,
                /__next_metadata_route__/,
                /__next_metadata_image_meta__/
              ]
            },
         */
        // not: [...] -> 배열에 포함된 쿼리 문자열을 가진 파일은 이 규칙에서 제외
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
        use: ["@svgr/webpack"], // @svgr/webpack을 사용하여 React 컴포넌트로 변환
        /**
         * import logo from "./logo.svg?__next_metadata__"; // 제외됨
           import logo from "./logo.svg?__next_metadata_route__"; // 제외됨
           import logo from "./logo.svg?__next_metadata_image_meta__"; // 제외됨
           import logo from "./logo.svg?url"; // 제외됨

         */
      }
    );

    /**
     *  
        Next.js의 기본 파일 로더가.svg 파일을 URL로 (.svg?url) 변환하는 시도원천 차단! 
        -> 1,2 방식 선택적으로 사용
     */
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
  
};

export default nextConfig;
