/**
 * 
 * @param {string} txt 
 * @param {number} [max=50] 
 * @returns 
 */
export function textS(txt:string,max:number=50){
    console.log(txt.slice(0,max));
    if(txt.length>=max)return `${txt.slice(0,max)}....`;
    return txt;
}