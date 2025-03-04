'use client';

import { Button } from "@/components/Button";
import starBg  from "@/assets/stars.png";
import gridLines from "@/assets/grid-lines.png";
import { motion, useScroll, useMotionValueEvent, useTransform, useMotionTemplate, useMotionValue } from "framer-motion";
import { RefObject, useEffect, useRef } from "react";


//custom hook
// borderdDrivRef -> to : border border-white/15 py-24 rounded-xl overflow-hidden relative group
const useRelativeMousePosition = ( to: RefObject<HTMLElement> ) => {

  console.log('to',to);
  

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const updateMousePosition = ( event: MouseEvent ) =>{
    console.log('event',event); // MouseEvent {isTrusted: true, screenX: 0, screenY: 0, clientX: 0, clientY: 0, x:0, y:0 …}
    
    if( !to.current ) return;
    // rect : left, top 값
    // getBoundingClientRect(): 
    const { top , left } = to.current.getBoundingClientRect(); // 뷰포트 내 절대 위치 (top, left 좌표) 를 얻을 수 있습니다
    // console.log('event',event.x, event.y);
    
    // console.log('top',top);
    // console.log('left',left);
    
    mouseX.set( event.x - left );
    mouseY.set( event.y - top );
  }

  useEffect(()=>{
    window.addEventListener('mousemove', updateMousePosition)

    //컴포넌트가 언마운트 될 때 이벤트 리스너를 제거
    return ()=>{
      window.removeEventListener('mousemove', updateMousePosition)
    }

  },[]) 

  return [ mouseX, mouseY ];
}


export const CallToAction = () => {

  const sectionRef = useRef<HTMLElement>(null);
  const borderdDrivRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({ target: sectionRef, offset:[ 'start end', 'end start' ] }); // scrollYProgress 값이 0 → 1로 증가하고, 반대로 스크롤을 올리면 1 → 0으로 감소

  // useMotionValueEvent(scrollYProgress, "change", (value)=>{
  //   console.log('scrollYProgress',value)
    
  // })  
 
  // 스크롤 다운 -> 별들이 아래쪽으로 내려감
  const backgroundPositionY = useTransform( scrollYProgress, [0,1], [ -300, 300] )

  const [ mouseX, mouseY ] = useRelativeMousePosition( borderdDrivRef );

  const maskImage = useMotionTemplate `radial-gradient(50% 50% at ${mouseX}px ${mouseY}px, black, transparent)`
 
  

  return (
    <section className="py-20 md:py-24" ref={sectionRef}>
      <div className="container">
        {/* group :  자식 요소에서 group-hover, group-focus 같은 상태를 감지*/}
        <motion.div 
        ref={borderdDrivRef}
        className="border border-white/15 py-24 rounded-xl overflow-hidden relative group" 
        animate={{
            backgroundPositionX: starBg.width  //배경화면 좌-> 우로 이동
          }}
          transition={{ 
            repeat: Infinity,
            duration: 60,
            ease: 'linear'
          }}
        style={{
          backgroundPositionY,
          backgroundImage: `url(${starBg.src})`
          }}>
         
            {/* bg-blend-overlay : 배경 이미지(gridLines)와 배경 색상(rgb(74,32,138))이 합쳐져서 표시*/}
            {/*  [mask-image:radial-gradient(50%_50%_at_50%_35%_)] :50%_50% -> size , _at_50%_35% -> left , top*/}
            {/* group-hover:opacity-0 : 효과가 완전히 사라짐 */}
            <div 
            className="absolute inset-0 bg-[rgb(74,32,138)] bg-blend-overlay
            [mask-image:radial-gradient(50%_50%_at_50%_35%,black,transparent)] group-hover:opacity-0 transition duration-700" 
            style={{
              backgroundImage: `url(${gridLines.src})`
              }}></div>  

            {/* group-hover:opacity-100 : 효과가 나타남 */}
            <motion.div 
            className="absolute inset-0 bg-[rgb(74,32,138)] bg-blend-overlay
            opacity-0 group-hover:opacity-100 transition duration-700" 
            style={{
              maskImage,
              backgroundImage: `url(${gridLines.src})`
              }}></motion.div>  
            
            <div className="relative">

                <h2 className="text-5xl md:text-6xl max-w-sm mx-auto tracking-tighter text-center font-medium">
                  AI-driven SEO for everyone.
                </h2>
                <p className="text-center text-lg md:text-xl max-w-xs mx-auto text-white/70 px-4 mt-5 tracking-tight">
                Achive clear, impactful results without the complexity
                </p>

                <div className="flex justify-center mt-8">
                  <Button>Join waitlist</Button>
                </div>

            </div>

        </motion.div>
      </div>
    </section>
  )
};
