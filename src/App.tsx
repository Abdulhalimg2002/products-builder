

import './App.css'
import ProudactC from './components/ProudactC'
import ButtonI from './components/UI/ButtonI';
import Model from './components/UI/Model';
import { produactlis,formlist } from './data'
import Input from './components/UI/Input';
import { useState, type ChangeEvent, type FormEvent } from 'react'
import type { Iproduact } from './interfaces';





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
  const[prodact,setprodact]=useState<Iproduact>(defultProduactObj);
   const [isOpen, setIsOpen] = useState(false);

const close=()=> setIsOpen(false);
const open=()=> setIsOpen(true);
  

const onChangeHandler=(event:ChangeEvent<HTMLInputElement>)=>{
  const{value,name}=event.target;
  setprodact({
...prodact,
[name]:value,
  });
};
const submitHandler=(event: FormEvent<HTMLFormElement>): void =>{
  event.preventDefault();
 close();

  };
  const onCancel=()=>{
    console.log("cancel");
    setprodact(defultProduactObj)
  }
 const rendarproduact=produactlis.map(prodact=><ProudactC key={prodact.id} proudact={prodact }/> );
 const rendarformlist=formlist.map(input=><div className='text-black flex flex-col' key={input.id}>
  <label  htmlFor={input.id}>{input.label}</label>
  <Input type={input.type} id={input.id} name={input.name} value={prodact[input.name]} onChange={onChangeHandler}/>
 </div>)
  
    

    


  

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
 
  <div className='flex items-center space-x-3'>
    
   <ButtonI className='bg-blue-600  '>Submit</ButtonI>
  <ButtonI  className='bg-red-600 ' onClick={onCancel} >Cancel</ButtonI>
  </div>
   </form>
</Model>


    </>
  )
}

export default App
