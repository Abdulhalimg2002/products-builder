import type { ButtonHTMLAttributes, ReactNode } from "react";

interface IPropes extends ButtonHTMLAttributes<HTMLButtonElement>{
children:ReactNode;
className?:string;
width?:"w-full"|"w-fit";

}
const ButtonI=({children,className ,width,...rest}:IPropes)=>{
    return(
        <button className={`${className} p-2 ${width} rounded-md text-white font-bold `} {...rest}>{children}</button>
        
    )
}
export default ButtonI;