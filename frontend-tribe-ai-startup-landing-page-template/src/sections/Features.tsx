"use client";

import { DotLottieCommonPlayer, DotLottiePlayer } from "@dotlottie/react-player"
import Image from "next/image";
import productImage from "@/assets/product-image.png";
import { ComponentPropsWithoutRef, useEffect, useRef, useState } from "react";
import { animate, motion, useMotionTemplate, useMotionValue, ValueAnimationTransition } from "framer-motion";


const tabs = [
  {
    icon: "/assets/lottie/vroom.lottie",
    title: "User-friendly dashboard",
    isNew: false,
    backgroundPositionX: 0,
    backgroundPositionY: 0,
    backgroundSizeX: 150,
  },
  {
    icon: "/assets/lottie/click.lottie",
    title: "One-click optimization",
    isNew: false,
    backgroundPositionX: 98,
    backgroundPositionY: 100,
    backgroundSizeX: 135,
  },
  {
    icon: "/assets/lottie/stars.lottie",
    title: "Smart keyword generator",
    isNew: true,
    backgroundPositionX: 100,
    backgroundPositionY: 27,
    backgroundSizeX: 177,
  },
];

/**
 * 
  tab → 매개변수
  typeof tabs[number] → 매개변수 tab의 타입
 * number는 배열의 인덱스 역할
   ComponentPropsWithoutRef<'div'> 덕분에 div가 원래 가질 수 있는 속성(onClick, className 등)에 접근가능
 */
const FeatureTab = ( props: typeof tabs[number] & ComponentPropsWithoutRef<'div'> & { selected: boolean })  => {

  console.log(props) // onClick : () => handleSelectTab(tabIndex), selected: true or false

  const tabRef = useRef<HTMLDivElement>(null)

  // console.log("tab",tab);
  // useRef<타입>(초기값) → useRef가 관리하는 값의 타입을 지정.
  // <DotLottieCommonPlayer>  -> seek(), play() 사용 가능
  const dotLottieRef = useRef<DotLottieCommonPlayer>(null)

  const xPercentage = useMotionValue(0)
  const yPercentage = useMotionValue(0)

  // console.log("xPercentage, yPercentage",xPercentage, yPercentage);
  

  const maskImage = useMotionTemplate`radial-gradient(80px 80px at ${xPercentage}% ${yPercentage}%, black, transparent)`

  useEffect(()=>{
    if(!tabRef.current || !props.selected ) return;

    xPercentage.set(0)
    yPercentage.set(0)

    // getBoundingClientRect() : 요소의 height, width 를 반환
    const { height, width } = tabRef.current?.getBoundingClientRect()
    const circumfernence = height * 2 + width * 2
    const times = [ 0, width/circumfernence , (width+height)/circumfernence, (width * 2 + height)/circumfernence , 1 ]
    /**
     * 만약 width = 200px, height = 100px라면:
        circumference = 600px
        times = [0, 200/600, 300/600, 500/600, 1]
        즉, [0, 0.33, 0.5, 0.83, 1]  =>  0% → 33% → 50% → 83% → 100% 순서로 진행 ( duration: 4초 기준 )

     */

    const options: ValueAnimationTransition = {
      times,
      duration: 4, 
      repeat: Infinity, 
      ease: "linear", 
      repeatType: "loop" 
    }
    animate( xPercentage, [ 0, 100, 100, 0, 0 ] , options)
    animate( yPercentage, [ 0, 0, 100, 100, 0 ] , options)
  },[props.selected])

  const handleTabHover = () =>{
    if(dotLottieRef.current === null ) return;
    // Lottie 애니메이션이 처음부터 다시 실행
    // seek(0) : Lottie파일의 처음으로 이동
    dotLottieRef.current.seek(0)
    // play() : Lottie파일 재생
    dotLottieRef.current.play()
  }

  return(
    <div
      ref={ tabRef }
      onMouseEnter={ handleTabHover }
      className="border border-white/15 flex p-2.5 rounded-xl gap-2.5 items-center flex-1 relative"
      onClick={ props.onClick }   // ComponentPropsWithoutRef<'div'> 로  onClick 에 () => handleSelectTab(tabIndex) 전달
      >

      { props.selected && (
        <motion.div 
         style={{ maskImage, }}
         className="absolute inset-0 -m-px border border-[#A369FF] rounded-xl"></motion.div>  
      )}
      
      {/* autoplay : Lottie파일 새로 고침시 동작하게 만듬 */}
      {/* inline-flex???? */}
      <div className="h-12 w-12 border border-white/15 rounded-lg inline-flex items-center justify-center">
        <DotLottiePlayer 
        ref={dotLottieRef} 
        src={ props.icon } 
        className="h-5 w-5" 
        autoplay
        />
      </div>

      <div className="font-medium">{ props.title }</div>

      { props.isNew && <div className="text-xs rounded-full px-2 py-0.5 bg-[#8c44ff] text-black font-semibold">New</div> }

    </div>
  )
}

export const Features = () => {

  const [selectedTab , setSelectedTab] = useState(0) 
  // 초기값 설정
  const backgroundPositionX = useMotionValue(tabs[0].backgroundPositionX)  // 0
  const backgroundPositionY = useMotionValue(tabs[0].backgroundPositionY)  // 0
  const backgroundSizeX = useMotionValue(tabs[0].backgroundSizeX)          // 150 
  console.log("backgroundSizeX",backgroundSizeX);
  

  // for style
  const backgroundPosition = useMotionTemplate`${backgroundPositionX}% ${backgroundPositionY}%`
  const backgroundSize = useMotionTemplate`${backgroundSizeX}% auto`

  // backgroundSizeX.get() 현재 값
  const handleSelectTab = (index:number) =>{
    setSelectedTab(index);

    const animateOption: ValueAnimationTransition = {
       duration:2, ease: "easeInOut"
    }

    // animate(변경할 값, [변화할 값의 배열], 애니메이션 옵션)
    animate(backgroundSizeX,[ backgroundSizeX.get(), 100, tabs[index].backgroundSizeX], animateOption)    
    animate( backgroundPositionX, [ backgroundPositionX.get(), tabs[index].backgroundPositionX ],animateOption)
    animate( backgroundPositionY, [ backgroundPositionY.get(), tabs[index].backgroundPositionY ],animateOption)
  }

  return (
    <section className="py-20 md:py-24">

      <div className="container">
        {/* tracking-tighter : 글자 사이 간격 줄여줌 */}
          <h2 className="text-5xl md:text-6xl font-medium text-center tracking-tighter">Elevate your SEO efforts.</h2>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto tracking-tighter text-center mt-5">From small startups to large enterpries, 
            our AI-driven tool has revolutionized the way businesses approach SEO. </p>

        <div className="mt-10 flex flex-col lg:flex-row gap-3">
          {/* flex-1이 적용된 요소는 형제 요소들과 함께 동일한 비율로 남은 공간을 채웁니다 */}
          {tabs.map((tab, tabIndex)=>(
            // tabIndex : 0, 1, 2
            <FeatureTab 
            {...tab}
            selected ={ selectedTab === tabIndex } // true or false
            onClick={ () => handleSelectTab(tabIndex) }
            key={ tab.title }/>
            ))}
        </div>    

        <div className="border border-white/20 p-2.5 rounded-xl mt-3">
          <motion.div 
            className="aspect-video bg-cover border border-white/20 rounded-lg" 
            style={{
              backgroundPosition,
              backgroundSize,
              backgroundImage:`url(${productImage.src})`,
          }}></motion.div>  
          {/* <Image src={productImage} alt="Product image"/> */}
        </div>

      </div>

    </section>
  );
   
};
