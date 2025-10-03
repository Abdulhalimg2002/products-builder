

import './App.css'
import ProudactC from './components/ProudactC'
import ButtonI from './components/UI/ButtonI';
import Model from './components/UI/Model';
import  {v4 as uuid} from "uuid";
import Error from './components/UI/Error';
import CircleCo from './components/UI/CircleCo';
import { produactlis,formlist, Color } from './data'
import Input from './components/UI/Input';
import { useState, type ChangeEvent, type FormEvent } from 'react'
import type { IErrors, Iproduact } from './interfaces';
import { produactV } from './validation';





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
  const[errors ,seterrors]=useState<IErrors>({  title:'',
    des:'',
    imag:'',
    price:'',color:""});
   
   const [isOpen, setIsOpen] = useState(false);
   const[tempColor,settempColor]=useState<string[]>([]);
   console.log(tempColor)

const close=()=> setIsOpen(false);
const open=()=> setIsOpen(true);
  

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
 const onCancel=()=>{
   
    setprodact(defultProduactObj)
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

  const hasError = Object.values(errors).some(value => value !== "");
  console.log(hasError);

  if (hasError) {
    seterrors(errors);
    return;
  }

  setprodacts(prev => [
    { ...prodact, id: uuid(), color: tempColor },
    ...prev,
  ]);
  setprodact(defultProduactObj);
  settempColor([]);
  close();
};

 const rendarproduact=prodacts.map(prodact=><ProudactC key={prodact.id} proudact={prodact }/> );
 const rendarformlist=formlist.map(input=><div className='text-black flex flex-col' key={input.id}>
  <label  htmlFor={input.id}>{input.label}</label>
  <Input type={input.type} id={input.id} name={input.name} value={prodact[input.name]} onChange={onChangeHandler}/>
  <Error massege={errors[input.name]}/>
  </div>)
  
   const rendarColor = Color.map(color => (
  <CircleCo
    color={color}
    key={color}
    
     onClick={() => handleColorClick(color)}
  />
  
));

    
const handleColorClick = (color: string) => {
  if (tempColor.includes(color)) {
    settempColor(prev => prev.filter(item => item !== color));
  } else {
    settempColor(prev => [...prev, color]);
  }

  // إزالة رسالة الخطأ عند اختيار اللون
  if (errors.color) {
    seterrors(prev => ({ ...prev, color: "" }));
  }
};

  

  return (
    <>
<main className="container mx-auto px-3  sm:max-w-[540px]   md:max-w-[720px] lg:max-w-[960px]  xl:max-w-[1140px]  2xl:max-w-[1320px]">
    <ButtonI className='bg-indigo-600 w-fit m-2 ' onClick={open}>Add Proudact</ButtonI>
  <div className="grid grid-cols-1 gap-4  sm:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4">
    {rendarproduact}
  </div>
</main>

<Model isOpen={isOpen} close={close} title='Add produact'  >
  <form onSubmit={submitHandler} className='space-y-3'>
  {rendarformlist}
  <div className="flex items-center flex-wrap space-x-1"> 
  {rendarColor}
 </div>

  <div className="flex items-center flex-wrap space-x-1"> 
 {tempColor.map(color=><span className="text-white p-1 mr-1 mb-1 rounded-md text-xs" style={{ backgroundColor: color }} key={color}>{color}</span>)
 }
 </div>
 <Error massege={errors.color} />
  <div className='flex items-center space-x-3'>
    
   <ButtonI className='bg-blue-600 w-full '>Submit</ButtonI>
  <ButtonI  className='bg-red-600 w-full ' onClick={onCancel} >Cancel</ButtonI>
  </div>
   </form>
</Model>


    </>
  )
}

export default App
