'use client';

import avatar1 from "@/assets/avatar-1.png";
import avatar2 from "@/assets/avatar-2.png";
import avatar3 from "@/assets/avatar-3.png";
import avatar4 from "@/assets/avatar-4.png";
import Image from "next/image";
import { motion } from "framer-motion";

const testimonials = [
  {
    text: "“This product has completely transformed how I manage my projects and deadlines”",
    name: "Sophia Perez",
    title: "Director @ Quantum",
    avatarImg: avatar1,
  },
  {
    text: "“These AI tools have completely revolutionized our SEO entire strategy overnight”",
    name: "Jamie Lee",
    title: "Founder @ Pulse",
    avatarImg: avatar2,
  },
  {
    text: "“The user interface is so intuitive and easy to use, it has saved us countless hours”",
    name: "Alisa Hester",
    title: "Product @ Innovate",
    avatarImg: avatar3,
  },
  {
    text: "“Our team's productivity has increased significantly since we started using this tool”",
    name: "Alec Whitten",
    title: "CTO @ Tech Solutions",
    avatarImg: avatar4,
  },
];

export const Testimonials = () => {
  return (
    <section className="py-20 md:py-24">

      <div className="container">
        <h2 className="text-5xl md:text-6xl text-center tracking-tighter font-medium">
          Beyound Expectations.</h2>
        <p className="text-white/70 text-lg md:text-xl text-center mt-5 tracking-tight max-w-sm mx-auto">
        Our revolutionary AI SEO tools have transformed our clients's strategies</p>
        {/* 20~80% 구간은 전부 다 보임 */}
        <div className="flex overflow-hidden mt-10 [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
          {/* testimonial: side by side 정렬 */}
          <motion.div 
          initial={{ translateX: '-50%',  }}
          animate={{ translateX: '0', }}  // 왼쪽으로 밀려 있던 리스트가(전부 돌고) 정상 위치(0%)로 이동 -> 무한반복
          transition={{ repeat: Infinity, ease: 'linear', duration: 30 }}
          className="flex gap-5 pr-5 flex-none">
          {[...testimonials, ...testimonials].map((testimonial) => (
            // flex-none : 부모의 flex에 영향을 받지 않고, 요소의 크기가 '고정'되어 있음
            // flex-none 은 flex-grow: 0 및 flex-shrink: 0 flex-basis: auto 을 포함하므로, 
            // 남은 공간을 차지하지도 않고 줄어들지도 않음.
            // max-w-xs : 카드하나의 최대너비 ,
            <div 
              key={testimonial.name} 
              className="border border-white/15 p-6 md:p-10 rounded-xl 
              bg-[linear-gradient(to_bottom_left,rgb(140,69,255,.5),black)]
              max-w-xs md:max-w-md flex-none">
              <div className="text-lg tracking-tight md:text-2xl">{testimonial.text}</div>

              <div className="flex items-center gap-3 mt-5">
                {/* relative : in order to add absolute element */}
                {/* after: 가상요소 -> 흑백 이미지를 완전히 가림 : 배경 오버레이, relative의 자식*/}
                {/* after:content-[''] , before:content-['']: 이게 있어야만 가상요소 생성가능 */}
                {/* after:mix-blend-soft-light : rgb(140,69,244) + grayscale */}
                <div className="relative 
                after:content-[''] after:absolute after:inset-0
                after:bg-[rgb(140,69,244)] after:mix-blend-soft-light
                before:content-[''] before:absolute before:inset-0 
                before:border before:border-white/30 before:z-10 before:rounded-lg">
                  <Image src={ testimonial.avatarImg } 
                  alt={`Avatar for ${testimonial.name}`} 
                  className="h-11 w-11 rounded-lg grayscale"/>
                </div>
                
                <div className="">
                  <div className="">{ testimonial.name }</div>
                  <div className="text-white/50 text-sm">{ testimonial.title }</div>
                </div>
              </div>
            </div>
          ))}
          </motion.div>
        </div>

      </div>

    </section>
  )
};
