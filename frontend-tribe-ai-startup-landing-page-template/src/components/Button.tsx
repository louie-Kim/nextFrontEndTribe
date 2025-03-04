import { log } from "console"
// React.PropsWithChildren : props의 타입정의 
// props는 모든 타입의 속성을 가질 수 있으며, children을 필수적으로 포함
export const Button = (props: React.PropsWithChildren) => {

    // console.log('Button props',props);
    

    return(
        //  rounded-s-xl rounded-e-xl : test ,  shadow-[0px_0px_12px_#8c45ff] : x축, y축, 블러(퍼지는)정도, 색  
        <button className="relative py-2 px-3 rounded-lg font-medium text-sm bg-gradient-to-b from-[#190d2e] to-[#4a208a] shadow-[0px_0px_12px_#8c45ff]">
            {/* inset-0: top, right, bottom, left 값을 모두 0 */}
            <div className="absolute inset-0">
                {/*mask-image : 투명도 조절 ( black: 투명도 변화의 기준값, 색이 직접 보이는게 아님) 1 -> 0.5 -> 0 */}
                {/* 색을 보이게 하려면 -> [background:linear-gradient(to_top,blue,transparent)] */}
                <div className="rounded-lg border border-white/20 absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]"></div>
                <div className="rounded-lg border absolute inset-0 border-white/40 [mask-image:linear-gradient(to_top,black,transparent)]"></div>
                {/* shadow-[0_0_10px_rgb(140,69,255,.7)_inset] : _inset 요소 내부로 퍼지는 그림자 */}
                <div className="absolute inset-0 shadow-[0_0_10px_rgb(140,69,255,.7)_inset] rounded-lg"></div>
            </div>
            <span>{props.children}</span>
        </button>
    )

}

