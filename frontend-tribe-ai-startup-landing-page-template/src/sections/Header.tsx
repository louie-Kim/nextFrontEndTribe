"use client";
// svg를 컴포넌트로 : /___.svg?url 이렇게 안씀 
import LogoIcon from "@/assets/logo.svg";
import MenuIcon from "@/assets/icon-menu.svg"
import {Button}  from "@/components/Button";


export const Header = () => {
  return( 
    // sticky top-0 : 상단에 고정
    <header className="py-4 border-b border-white/15 md:border-none sticky top-0 z-10">
      {/* 모바일 블러 */}
      <div className="absolute inset-0 backdrop-blur -z-10 md:hidden"></div>
      {/* lg:1200px -> 패딩이 80px 커지면서 마진이 줄어듬 -> 자식들 사이 벌어짐 */}
      <div className="container ">
        {/* max-w-2xl -> mx-auto : 중앙정렬 */}
        {/* backdrop-blur */}
        <div className="flex justify-between items-center md:border border-white/15 md:p-2.5 rounded-xl max-w-2xl mx-auto relative">
          {/* 큰화면 블러 */}
          <div className="absolute inset-0 backdrop-blur -z-10 hidden md:block"></div>
          <div>
            {/* inline-flex : 부모가 <LogoIcon className="h-8 w-8"/> 공간 만큼차지 */}
            <div className="border h-10 w-10 rounded-lg flex justify-center items-center border-white/15">
            <LogoIcon className="h-8 w-8"/>
          </div>
          </div>
          {/* hidden -> 768px에서 나타남 */}
          <div className="hidden md:block">
            {/* white 70% -> 100% , transition : 부드럽게 작동 */}
            <nav className="flex gap-8 text-sm">
                <a href="#" className="text-white/70 hover:text-white transition">Features</a>
                <a href="#" className="text-white/70 hover:text-white transition">Developers</a>
                <a href="#" className="text-white/70 hover:text-white transition">Pricing</a>
                <a href="#" className="text-white/70 hover:text-white transition">Changlog</a>
            </nav>
          </div>

          <div className="flex gap-4 items-center">
            <Button>Join Waitlist</Button>
            <MenuIcon className="md:hidden"/>
          </div>

        </div>
      </div>
    </header>
  );
};


