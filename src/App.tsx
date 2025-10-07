

import './App.css'
import ProudactC from './components/UI/ProudactC'
import ButtonI from './components/UI/ButtonI';
import Model from './components/UI/Model';
import  {v4 as uuid} from "uuid";
import Error from './components/UI/Error';
import CircleCo from './components/UI/CircleCo';
import { produactlis,formlist, Color, category } from './data'
import Input from './components/UI/Input';
import { useState, type ChangeEvent, type FormEvent } from 'react'
import type { IErrors, Iproduact } from './interfaces';
import { produactV } from './validation';
import Select from './components/UI/Select';
import type { proudactN } from './types';
import toast, { Toaster } from 'react-hot-toast';







function App() {
  const defultProduactObj={
    title:'',
    des:'',
    imag:'',
    price:'',
    color:[],
    category:{
      name:'',
      imag:"",
    },

  };
  const[prodacts,setprodacts]=useState<Iproduact[]>(produactlis);
  const[prodact,setprodact]=useState<Iproduact>(defultProduactObj);
  const[proudactU,setproudactU]=useState<Iproduact>(defultProduactObj);
  const[isDelete,setdelete]=useState(false);
  const[proudactUindex,setproudactindex]=useState<number>(0);
  

  const[errors ,seterrors]=useState<IErrors>({  title:'',
    des:'',
    imag:'',
    price:'',color:""});
   
   const [isOpen, setIsOpen] = useState(false);
   const [isOpenE, setIsOpenE] = useState(false);
    const [selected, setSelected] = useState(category[0]);
   const[tempColor,settempColor]=useState<string[]>([]);
  

const close=()=> setIsOpen(false);
const open=()=> setIsOpen(true);
const closeE=()=> setIsOpenE(false);
const openE=()=> setIsOpenE(true);
const closeD=()=> setdelete(false);
const openD=()=> setdelete(true);

  

const onChangeHandler=(event:ChangeEvent<HTMLInputElement>)=>{
  const{value,name}=event.target;
  setprodact({
...prodact,
[name]:value,
  });
 seterrors({
  ...errors,
  [name]: ""
});
};
const onChangeEHandler=(event:ChangeEvent<HTMLInputElement>)=>{
  const{value,name}=event.target;
  setproudactU({
...proudactU,
[name]:value,
  });
 seterrors({
  ...errors,
  [name]: ""
});
};
 const onCancel=()=>{
   
    setprodact(defultProduactObj)
    setproudactU(defultProduactObj)
  }
  const removeProudactH=()=>{
    const filterd=prodacts.filter(prodacts=>prodacts.id!==proudactU.id);
    setprodacts(filterd);
    closeD();

toast.error("This product has been deleted", {
  icon: "❌",
 style:{
  backgroundColor:"red",
  color:"white",
  
 }
});
  }
const submitHandler = (event: FormEvent<HTMLFormElement>): void => {
  event.preventDefault();

  const { title, des, imag, price } = prodact;
  const errors = produactV({
    title,
    des,
    imag,
    price,
    color: tempColor, // ✅ لازم تستخدم tempColor مش prodact.color
  });

  console.log(errors);

  const hasError = Object.values(errors).some(value => value !== "")&&Object.values(errors).every(value => value !== "");
  console.log(hasError);

  if (hasError) {
    seterrors(errors);
    return;
  }

  setprodacts(prev => [
    { ...prodact, id: uuid(), color: tempColor ,category:selected},
    ...prev,
  ]);
  setprodact(defultProduactObj);
  settempColor([]);
  close();
    toast('this proudact is added',{
   
    icon:"✅",
     style:{
  backgroundColor:"green",
  color:"white",
  
 }
  });
};
const submitEHandler = (event: FormEvent<HTMLFormElement>): void => {
  event.preventDefault();

  const { title, des, imag, price } = proudactU;

  // التحقق من الصحة
  const validationErrors = produactV({ title, des, imag, price, color: tempColor });
  const hasError = Object.values(validationErrors).some(value => value !== "")&& Object.values(validationErrors).every(value => value !== "");
  if (hasError) {
    seterrors(validationErrors);
    return;
  }

  // تحديث قائمة المنتجات
  const updatedProductList = [...prodacts];
  updatedProductList[proudactUindex] = {
    ...proudactU,
    color: Array.from(new Set([...proudactU.color, ...tempColor])), // دمج الألوان بدون تكرار
  };
  setprodacts(updatedProductList);

  // إعادة تعيين الأخطاء والقيم المؤقتة
  seterrors({ title:'', des:'', imag:'', price:'', color:'' });
  setproudactU(defultProduactObj);
  settempColor([]);

  // إغلاق المودال
  closeE();
  toast('this proudact is update',{
   
    icon:"✅",
     style:{
  backgroundColor:"green",
  color:"white",
  
 }
  });
};



 const rendarproduact=prodacts.map((prodact,index)=>(
<ProudactC key={prodact.id} proudact={prodact } openE={openE} openD={openD}  index={index} setproudactindex={setproudactindex} setproudactU={setproudactU}/>
 )
);
 const rendarformlist=formlist.map(input=><div className='text-black flex flex-col' key={input.id}>
  <label  htmlFor={input.id}>{input.label}</label>
  <Input type={input.type} id={input.id} name={input.name} value={prodact[input.name]} onChange={onChangeHandler}/>
  <Error massege={errors[input.name]}/>
  </div>)
   const rendarupadteP=(id:string,name:proudactN,lable:string)=>{
    return(
    <div className='text-black flex flex-col' >
  <label  htmlFor={id}>{lable}</label>
  <Input type="text" id={id} name={name} value={proudactU[name]} onChange={onChangeEHandler}/>
  <Error massege={errors[name]}/>
  </div>
    );
   };
  
   const rendarColor = Color.map(color => (
  <CircleCo
    color={color}
    key={color}
    
     onClick={() => {
       if (tempColor.includes(color) 
  ) {
    settempColor(prev => prev.filter(item => item !== color));
    return;
  }
   if (proudactU.color.includes(color) 
  ) {
    settempColor(prev => prev.filter(item => item !== color));
    return;
    
  }
  settempColor(prev => [...prev, color]);
    if (errors.color) {
    seterrors(prev => ({ ...prev, color: "" }));
    return;
  }

     }}
  />
 
  
));

    

  

  return (
    <>
<main className="container mx-auto px-3  sm:max-w-[540px]   md:max-w-[720px] lg:max-w-[960px]  xl:max-w-[1140px]  2xl:max-w-[1320px]">
    <ButtonI className='bg-indigo-600 w-fit m-2 ' onClick={open}>Add Proudact</ButtonI>
  <div className="grid grid-cols-1 gap-4  sm:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4">
    {rendarproduact}
  </div>
</main>
{/*Addd proudact*/}
<Model isOpen={isOpen} close={close} title='Add produact'  >
  <form onSubmit={submitHandler} className='space-y-3'>
  {rendarformlist}
   <Select selected={selected} setSelected={setSelected}  />
  <div className="flex items-center flex-wrap space-x-1"> 
  {rendarColor}
 </div>

  <div className="flex items-center flex-wrap space-x-1"> 
 {tempColor.map(color=><span className="text-white p-1 mr-1 mb-1 rounded-md text-xs" style={{ backgroundColor: color }} key={color}>{color}</span>)
 }
 <Error massege={errors.color} />
 </div>
 

  <div className='flex items-center space-x-3'>
    
    
   <ButtonI className='bg-blue-600 w-full '>Submit</ButtonI>
  <ButtonI  className='bg-red-600 w-full ' onClick={onCancel} >Cancel</ButtonI>
  </div>
   </form>
</Model>
{/*Edit proudact*/}
<Model isOpen={isOpenE} close={closeE} title='Edit produact'  >
  <form onSubmit={submitEHandler} className='space-y-3'>
 

{rendarupadteP('title','title','Produact title')}
{rendarupadteP('des','des','Des')}
{rendarupadteP('image','imag','image')}
{rendarupadteP('price','price','price')}
  
  

  <Select selected={proudactU.category} setSelected={(value=>setproudactU({...proudactU,category:value}))}  />
  <div className="flex items-center flex-wrap space-x-1"> 
  {rendarColor}
 </div>

  <div className="flex items-center flex-wrap space-x-1"> 
 {tempColor.concat(proudactU.color).map(color=><span className="text-white p-1 mr-1 mb-1 rounded-md text-xs" style={{ backgroundColor: color }} key={color}>{color}</span>)
 }
 <Error massege={errors.color} />
 </div>
 

  <div className='flex items-center space-x-3'>
    
    
   <ButtonI  className='bg-green-600 w-full '>Update</ButtonI>
  <ButtonI  className='bg-red-600 w-full ' onClick={() => { onCancel()}} >Cancel</ButtonI>
  </div>
   </form>
</Model>
{/*Delet proudact*/}
<Model isOpen={isDelete} close={closeD} title='Are you sure you want to delet' desc='deleting will remove this proudact'  >
  
 

  <div className='flex items-center space-x-3'>
    
    
   <ButtonI  className='bg-green-600 w-full ' onClick={removeProudactH}>Yes</ButtonI>
  <ButtonI  className='bg-red-600 w-full ' onClick={closeD} >No</ButtonI>
  </div>
  
</Model>
<Toaster/>

    </>
  )
}

export default App
