interface IPropes{
massege:string;


}
const Error=({massege}:IPropes)=>{
    return massege?<span className="text-red-700 font-semibold text-sm block">{massege}</span> :null;
}
export default Error;