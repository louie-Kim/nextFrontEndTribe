import Logo from "@/assets/logo.svg"  // Default Import
import XSocial from"@/assets/social-x.svg" 
import InstaSocial from "@/assets/social-instagram.svg"
import YTSocial from "@/assets/social-youtube.svg"
/**
 * SVG 파일을 import할 때는 Named Export({})가 지원되지 않으므로, 
 * import { Logo } from "@/assets/logo.svg"는 잘못된 방식
 */
// console.log("logo 컴포넌트", Logo);   // [Function: SvgLogo]


export const Footer = () => (

  <footer className="py-5 border-t border-white/15">

    <div className="container">
        {/* flex-1 속성을 가진 요소들이 남은 공간을 균등하게 나눠 가짐 1/3 */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-8">
        {/* <div className="flex flex-col items-center gap-8"> */}

            <div className="flex gap-2 items-center lg:flex-1">
              <Logo className="h-6 w-6"/>  
              <div className="font-medium">AI Startup Landing page</div>
            </div>

            <nav className="flex flex-col lg:flex-row gap-5 lg:gap-7 lg:flex-1 lg:justify-center">
              <a href="#" className="text-white/70 hover:text-white text-xs md:text-sm transition">
              Features
              </a>
              <a href="#" className="text-white/70 hover:text-white text-xs md:text-sm transition">
              Developers
              </a>
              <a href="#" className="text-white/70 hover:text-white text-xs md:text-sm transition">
              Company
              </a>
              <a href="#" className="text-white/70 hover:text-white text-xs md:text-sm transition">
              Blog
              </a>
              <a href="#" className="text-white/70 hover:text-white text-xs md:text-sm transition">
              Changelog
              </a>
            </nav>
          
            {/* justify-end : 맨 오른쪽으로 위치시킴 */}
            <div className="flex gap-5 lg:flex-1 lg:justify-end">
              <XSocial className="text-white/40 hover:text-white transition"/>
              <InstaSocial className="text-white/40 hover:text-white transition"/>
              <YTSocial className="text-white/40 hover:text-white transition"/>
            </div>

        </div>
    </div>

  </footer>

);
