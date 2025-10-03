import type { HTMLAttributes } from "react";

interface IPropes extends HTMLAttributes<HTMLSpanElement>{
color:string

}
const CircleCo=({color,...rest}:IPropes)=>{
    return(
        <span className={` block w-5 h-5  rounded-full cursor-pointer "`} style={{ backgroundColor: color }}
        {...rest}
        />
    )
}
export default CircleCo;