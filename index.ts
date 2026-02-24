//Typesccrpit basic 
// varialbe in ts 

const fn:string="sahil";
console.log(typeof fn)
const age:number=18;
console.log(typeof age )
const con:boolean=true;
console.log(typeof con)
// function in ts 
function myfun(name:string):string {
    return name
}
// object in ts
type User={
    name:string;
    age:number;
    isaccpt:boolean;
}
 const user:User={
    name:"sahil",
    age:18,
    isaccpt:true
 }
//  useing interface
interface Users {
    name:string;

}
interface User2 extends Users{
    age:number
    isaccpt:number
}
// array in ts 
const arr:(string|number)[]=["stack","queue","list",1,"linkw"]
// mutilee types
const mt:string|number= "qw"
const all:any="all tye comes "
//tulpe
const mytp:[string,number]=["sahil",1234]; //in tuple whtever you assign onl that get for examlpe in   this we do 2 type then onl 2 value posibl 