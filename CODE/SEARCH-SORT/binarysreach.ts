function binarySearch<T>(arr: T[], target: T): number {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    else if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}
 const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
 const key = 5;
 const resul = binarySearch(arr, key);
 if (resul !== -1) {
     console.log(`Element found at index: ${resul}`);
 } else {
     console.log("Element not found in the array.");
 }  