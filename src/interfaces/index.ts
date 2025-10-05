import type { proudactN } from "../types";

export interface Iproduact{
    id?:string|undefined;
    title:string;
    des:string;
    
    imag:string;
    price:string;
    color:string[];
    category:{
        name:string;
        imag:string;
    };
}
export interface Iforms{
    id:string;
    name:proudactN;
     label:string;
     type:string;
}
 export interface IErrors {
  title: string;
  des: string;
  imag: string;
  price: string;
  color: string;   // ✅ small c و string
}
export interface Icategory{
    id?:string;
    name: string;
    imag:string;
}

