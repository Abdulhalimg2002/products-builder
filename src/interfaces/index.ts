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