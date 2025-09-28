import type { Iproduact } from "../interfaces";
import Image from "./Imag";
import ButtonI from "./UI/ButtonI";
import { textS } from "../Utils/Function";



interface IPropes{
    proudact:Iproduact;


}
const ProudactC=({proudact}:IPropes)=>{
    const{title,imag,des,price,category}=proudact
    return(
        <div className=" border max-w-sm md:max-w-lg md:max-0 mx-auto rounded-md p-2 flex flex-col">
            <Image imagU={imag} alt="" className="rounded-md mb-2">
            </Image>
          <h3>{textS(title,25)}</h3>
         <p>{textS(des)}</p>
       <div className="flex space-x-3 my-3">   
    <span className="w-5 h-5 bg-amber-400 rounded-full cursor-pointer "/>
    <span className="w-5 h-5 bg-red-500 rounded-full cursor-pointer"/>
    <span className="w-5 h-5 bg-blue-800 rounded-full cursor-pointer"/>
 </div>
<div className="flex justify-between items-center">
    <span>{price}</span>
          <Image imagU={category.imag} alt={category.name} className="w-10 h-10 rounded-full object-bottom" />
</div>

<div className="flex justify-between items-center mt-5 space-x-2 text-white font-bold ">
    <ButtonI className="bg-blue-600 w-full "   >Edit</ButtonI>

    <ButtonI  className="bg-red-600 w-full "  >Delet</ButtonI>
</div>
        </div>
    )
}
export default ProudactC;