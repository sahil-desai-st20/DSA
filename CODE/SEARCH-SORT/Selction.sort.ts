function Selctionsort(arr:number[]) {
    const n=arr.length;
    for(let i=0;i<n-1;i++){
        let minindex=i;
        for(let j=i+1;j<n;j++){
            if(arr[j]<arr[minindex]){
                minindex=j;
            }
        }
        if(minindex!==i){
            const temp=arr[i];
            arr[i]=arr[minindex];
            arr[minindex]=temp;
        }
    }
    return arr;
}
const arrr1=[64, 25, 12, 22, 11];
console.log(Selctionsort(arrr1));