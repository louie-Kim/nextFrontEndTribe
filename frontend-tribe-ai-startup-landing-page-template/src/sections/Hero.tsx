'use client';

import { Button } from "@/components/Button";
import starsBg from "@/assets/stars.png";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { log } from "console";
import Image from "next/image";
import { useRef } from "react";
 

/**
 * starsBg {
  src: '/_next/static/media/stars.0c47b3bb.png',
  height: 600,
  width: 800,
  blurDataURL: '/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fstars.0c47b3bb.png&w=8&q=70',
  blurWidth: 8,
  blurHeight: 6
}
 */
// console.log('starsBg',starsBg); // starsBg 는 객체 

//  style={{backgroundImage: `url(${starsBg.src})`}} : 리액트 인라인 스타일 방식
//  backgroundImage 속성에는 직접 파일경로 넣을수 없음 -> url()로 감싸서 넣어줘야함
export const Hero = () => {

  const sectionRef = useRef(null);


  // scrollYProgress: 0~1 사이의 값으로 스크롤 위치를 퍼센트로 표현
  const { scrollYProgress } = useScroll({ 
    target:sectionRef, 
    offset :["start end","end start"], // scrollYProgress 값이 0 → 1로 증가하고, 반대로 스크롤을 올리면 1 → 0으로 감소
  })

  useMotionValueEvent(scrollYProgress, "change", (value)=>{
    console.log('scrollYProgress',value)
    
  })

  // 스크롤 다운 -> 별들이 아래쪽으로 내려감 
  const backgroundPositionY = useTransform( scrollYProgress, [0,1], [ -300, 300] )


  return (
  /**
   * mask-image는 색상이 아니라 투명도를 결정하는 역할만 함
      mask-image에서 색상 값(예: black, red, blue)은 "색상"이 아니라 "투명도"로만 해석됩니다.
      즉, black, red, blue 이런 색상이 들어가도 화면에서 직접 보이는 색은 아닙니다.
      mask-image에서는 어떤 색을 넣어도 결국 "(불투명) ↔ (완전 투명)"으로만 작동
      black → 기준값값
      transparent → 완전 투명 (요소가 사라짐)
      red, blue 같은 다른 색상을 넣어도 결국 투명도 값으로 변환되므로 눈에 보이지 않음.
      
      ✔ 0~10% → 투명 → 불투명 (점점 보이기 시작함, Fade-in 효과)
      ✔ 10~90% →  (100% 보임, 영향 없음)
      ✔ 90~100% → 불투명 → 투명 (점점 사라짐, Fade-out 효과)

   */
  <motion.section 
    ref={sectionRef}
    className="h-[492px] md:h-[800px] flex items-center overflow-hidden relative [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]"
    style={{
      backgroundImage: `url(${starsBg.src})`,
      backgroundPositionY,
    }}
    animate={{ 
      backgroundPositionX: starsBg.width, //  배경 이미지의 X축 위치를 starsBg.width 값만큼 왼->오 이동
     }}
    transition={{ repeat: Infinity, ease: 'linear', duration: 120, }} 

    >
    {/* inset-0: section 구역안 top, right, bottom, left 값을 모두 0 */}
    {/* _center_center : x center, y center */}
    {/* rgb(140,69,255,.5)_15%,rgb(14,0,36,.5)_78% : 연보라색 15%까지, 남색 78%까지 퍼짐 -> 마지막 완전투명 transparent */}
    <div className="absolute inset-0 bg-[radial-gradient(75%_75%_at_center_center,rgb(140,69,255,.5)_15%,rgb(14,0,36,.5)_78%,transparent)]"></div>

    {/* planet div */}
    {/* 50%_50% 방사형의 퍼짐 크기, _at_16.8%_18.3%: 그라디언트의 시작 위치(50%_50%은 정중앙), white,rgb(184,148,255)_37.7%: 0% ~ 37.7% 사이에서 white → rgb(184,148,255)로 서서히 변화하는 구간 -> 나머지 rgb(24,0,66) 남색으로 채움 */}
    {/* test <div className="absolute h-64 w-64 bg-purple-500 rounded-full border border-white/30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(50%_50%_at_50%_50%,white,black_70%)]"></div> */}
    
    {/* start planet */}
    <div className="absolute h-64 w-64 md:h-96 md:w-96 bg-purple-500 rounded-full border border-white/20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
    bg-[radial-gradient(50%_50%_at_16.8%_18.3%,white,rgb(184,148,255)_37.7%,rgb(24,0,66))] 
    shadow-[-20px_-20px_50px_rgb(225,225,225,.5),-20px_-20px_80px_rgb(225,225,225,.1),0_0_50px_rgb(140,69,255)]"></div>
    {/* end planet */}


    {/* start ring-1 */}
    {/*border border-white opacity-20 : 선아래 모든 점들 색을 하나로 통일 -> 선이 점을 뚫고 지나가거 안보이게 */}
    {/*  inline-flex -> flex 상관없음*/}
    <motion.div 
    style={{ 
      translateY:'-50%',
      translateX:'-50%',
     }}
    animate={{ 
        rotate:'1turn'
     }} 
     transition={{ 
      repeat: Infinity,
      duration: 60,
      ease: 'linear',  // 일정한 속도로 회전
      }}
     className="absolute h-[344px] w-[344px] md:h-[580px] md:w-[580px] border border-white opacity-20 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="absolute h-2 w-2 left-0 bg-white rounded-full top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute h-2 w-2 left-1/2 bg-white rounded-full top-0 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute h-5 w-5 left-full border border-white rounded-full top-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-center">
        <div className="h-2 w-2 bg-white rounded-full"></div>
      </div>
    </motion.div>
    {/* end ring-1 */}

    {/* start ring-2 */}
    <motion.div 
    style={{  translateY:'-50%', translateX:'-50%', }}
    animate={{ rotate:'-1turn' }}
    transition={{ repeat: Infinity, duration: 60, ease: 'linear', }}

    className="absolute h-[444px] w-[444px] md:h-[780px] md:w-[780px] rounded-full border border-white opacity-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed"></motion.div>
    {/* end ring-2 */}
    
    {/* start ring-3 */}
    <motion.div 
    style={{  translateY:'-50%', translateX:'-50%', }}
    animate={{ rotate:'1turn' }}
    transition={{ repeat: Infinity, duration: 90, ease: 'linear', }}
    className="absolute h-[544px] w-[544px] md:h-[980px] md:w-[980px] rounded-full border border-white opacity-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="absolute h-2 w-2 left-0 bg-white rounded-full top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute h-2 w-2 left-full bg-white rounded-full top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
    </motion.div>
    {/* end ring-3 */}



    {/* planet, rings의 부모 */}
    {/* container -> center: true, 중앙 정렬-> (margin left, right : auto)*/}
    <div className="container relative mt-16">
      {/* tracking-tighter: 글자 간격을 줄임 */}
      {/* radial-gradient(<size> at <position>, <color-stops>) */}
      {/* radial-gradient : 방사형 그라디언트, 100%_100%_ : width, height , white,white,rgb(74,32,138,.5):흰색 → 흰색+보라 → 반투명 보라, bg-white: .5 opacity보이도록 */}
      {/* text-transparent bg-clip-text : bg 백그라운드를 clip잘라서 text 글자에 넣는다 */}
      {/*  linear-gradient testing <h1 className="text-8xl font-semibold tracking-tighter bg-[linear-gradient(to_bottom,white,white,rgb(74,32,138,.5))]">AI SEO</h1> */}
      {/* md:leading-none: 세로줄 사이 간격이 줄어듬 */}
      <h1 className="text-8xl md:text-[168px] md:leading-none font-semibold tracking-tighter bg-white bg-[radial-gradient(100%_100%_at_top_left,white,white,rgb(74,32,138,.5))] text-transparent bg-clip-text text-center">
        AI SEO
      </h1>
      {/* md:text-xl -> max-w-xl mx-auto : md 이후 글자가 커지면, 일정한 크기와 간격을 보장장 */}
      <p className="text-lg md:text-xl text-white/70 mt-5 text-center max-w-xl mx-auto">
        Elevate your site's visibility effortlessly with AI, 
        where smart technology meets user-friendly SEO tools
      </p>
      <div className="flex justify-center mt-5">
        <Button>Join Waitlist</Button>
      </div>
    </div>
    
  </motion.section>
  )   

 

};
