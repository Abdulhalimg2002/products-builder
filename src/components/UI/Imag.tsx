

interface IPropes{
imagU:string;
alt:string;
className:string;
}
const Imag=({imagU,alt,className}:IPropes)=>{
    return(
        <img src= {imagU} alt={alt} className={className} />
    )
}
export default Imag;