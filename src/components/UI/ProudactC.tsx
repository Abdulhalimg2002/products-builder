import type { Iproduact } from "../../interfaces";
import { textS } from "../../Utils/Function";
import Image from "./Imag";
import ButtonI from "./ButtonI";
import CircleCo from "./CircleCo";



interface IPropes{
    proudact:Iproduact;
    setproudactU:(proudact:Iproduact)=>void;
    openE:()=>void;
    setproudactindex:(value:number)=>void;
      index:number;
      openD:()=>void;


}
const ProudactC=({proudact,setproudactU,openE,setproudactindex,index,openD}:IPropes)=>{
    const{title,imag,des,price,color,category}=proudact;
      const rendarColor=color.map(color=><CircleCo color={color} key={color} />);
   const onEdit = () => {
  setproudactU(proudact);
  setproudactindex(index); // 👈 لازم يجي قبل
  openE();
};
const onRemove=()=>{
   setproudactU(proudact);
       openD();
}
      
    return(
        <div className=" border max-w-sm md:max-w-lg md:max-0 mx-auto rounded-md p-2 flex flex-col">
            <Image imagU={imag} alt="" className="rounded-md mb-2 w-full h-full">
            </Image>
          <h3>{title}</h3>
         <p>{textS(des,50)}</p>
         <div className="flex items-center flex-wrap space-x-1"> 
  {rendarColor}
 </div>
 
       
<div className="flex justify-between items-center">
    <span>{price}</span>
          <Image imagU={category.imag} alt={category.name} className="w-10 h-10 rounded-full object-bottom" />
</div>

<div className="flex justify-between items-center mt-5 space-x-2 text-white font-bold ">
    <ButtonI className="bg-blue-600 w-full " onClick={onEdit}   >Edit</ButtonI>

    <ButtonI  className="bg-red-600 w-full " onClick={onRemove}  >Delet</ButtonI>
</div>
        </div>
    )
}
export default ProudactC;