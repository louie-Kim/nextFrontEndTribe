'use client'

import acmeLogo from "@/assets/logo-acme.png"
import apexLogo from "@/assets/logo-apex.png"
import celestialLogo from "@/assets/logo-celestial.png"
import quantumLogo from "@/assets/logo-quantum.png"
import pulseLogo from "@/assets/logo-pulse.png"
import echoLogo from "@/assets/logo-echo.png"
import { motion } from "framer-motion"

// console.log("echoLogo", echoLogo); // 이미지 객체 echoLogo.src로 사용가능

// flex-1 -> h2 , 로고리스트 50% ,50% 공간 차지
export const LogoTicker = () => {

  return (
  <section className="py-20 md:py-24">
    <div className="container">
      <div className="flex items-center gap-5">
        {/* flex-1 -> md:flex-none : flex-1 해제, 본래 콘텐츠 크기만큼만 차지*/}
        <div className="flex-1 md:flex-none">
          <h2>Trusted by top innovative teams</h2>
        </div>
        
        {/* flex flex-1 -> h2 영역 이외의 모든 영역 차지, acmeLogo로고부터 보임 */}
        <div className="flex flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
          {/* flex-none : 해당 div가 부모의 크기에 따라 늘어나거나 줄어들지 않도록 고정 */}
          {/*  -translate-x-1/2 : 로고리스트 전체 50% 왼쪽으로 이동 = initial={{ translateX: '-50%' }}*/}
          <motion.div 
          initial={{ translateX: "-50%" }}  // 시작 위치: 로고길이 + 갭 + 패딩 + img의  절반 왼쪽에서 시작
          animate={{ translateX:"0" }}      // 최종 위치
          transition={{ repeat: Infinity, duration: 10, ease: 'linear', }}
          className="flex flex-none gap-14 pr-14 -translate-x-1/2">
          {[
            acmeLogo, 
            pulseLogo, 
            echoLogo, 
            celestialLogo, 
            apexLogo, 
            quantumLogo,
            acmeLogo, 
            pulseLogo, 
            echoLogo, 
            celestialLogo, 
            apexLogo, 
            quantumLogo,
          ]
          .map((logo) => (
              <img src={logo.src} key={logo.src} className="h-6 w-auto" />
            ))}
        </motion.div>
        </div>

      </div>
    </div>
  </section>
  )


};
