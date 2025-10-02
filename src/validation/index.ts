

export const produactV=(produact:{title:string,des:string, imag:string, price:string})=>{

    const error:{title:string; des:string; imag:string; price:string;}={
  title:"",
    des:"",
    imag:"",
    price:"",
    };
     const validUrl: RegExp = /^(ftp|http|https):\/\/[^ "]+$/;
    if(!produact.title.trim()||produact.title.length<5 || produact.title.length>80 ){
        error.title="produact title must be between 10 or 80";
    }
     if(!produact.des.trim()||produact.des.length<10 || produact.des.length>900 ){
        error.des="produact des must be between 10 or 900";
    }

      if(!produact.imag.trim()||!validUrl.test(produact.imag) ){
        error.imag="image is must be valid";
    }
    if(!produact.price.trim()||isNaN(Number(produact.price))){
        error.price="the price must be number";
    }

    return error;
}