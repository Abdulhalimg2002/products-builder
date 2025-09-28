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
    name:string;
     label:string;
     type:string;
}