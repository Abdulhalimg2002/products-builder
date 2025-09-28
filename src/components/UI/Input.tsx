
import type { InputHTMLAttributes } from "react";


interface IPropes extends InputHTMLAttributes<HTMLInputElement> {


}
const Input=({ ...rest}:IPropes)=>{
    return(
 <input  className="border-[1px] border-gray-400 focus:border-indigo-500  focus:ring-1 focus:outline-none focus: ring-indigo-500 rounded-lg px-3 py-3 text-md mb-2 shadow-md" {...rest} />
    )
}
export default Input;