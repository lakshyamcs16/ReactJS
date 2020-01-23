export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, i]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, i]);
    // We overwrite the value at index k in the original array with the
    // value at index i in the auxiliary array.
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([j, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([j, j]);
    // We overwrite the value at index k in the original array with the
    // value at index j in the auxiliary array.
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}

export function getBubbleSortAnimations(array) {
  const animations = [
    []
  ];
  let n = array.length;
  if (n <= 1) return array;

  for (var i = 0; i < n; i++) {
    animations[i] = [];
    for (var j = 0; j < n - i - 1; j++) {
      animations[i].push([j, j + 1]);
      animations[i].push([j, j + 1]);
      if (array[j] > array[j + 1]) {
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }

      animations[i].push([j, array[j]]);
      animations[i].push([j + 1, array[j + 1]]);
    }

  }
  return animations;
}

function quicksortFn(array, s, e) {
  var pivot = array[e];

  var j = s - 1;

  for (var i = s; i < e; i++) {
    if (pivot > array[i]) {
      j++;

      let temp = array[j];
      array[j] = array[i];
      array[i] = temp;
    }
  }

  let temp = array[j + 1];
  array[j + 1] = array[e];
  array[e] = temp;
  return (j + 1);
}

function quickSort(array, s, e) {
  if (s < e) {
    var fix = quicksortFn(array, s, e);
    quickSort(array, s, fix - 1);
    quickSort(array, fix + 1, e);
  }
}

export function getQuickSortAnimations(array) {
  quickSort(array, 0, array.length - 1);

}

/* HEAP SORT
function leftChild(i) {
    return 2 * i + 1;
}

function rightChild(i) {
    return 2 * i + 2 ;
}

function heapify(a, n, i) {
    let left = leftChild(i);
    let right = rightChild(i);
    let max = i;

    if(left<n && a[max] < a[left])
        max = left
    if(right<n && a[max] < a[right])
        max = right
    
    if(max != i) {
        let temp = a[max];
        a[max] = a[i];
        a[i] = temp;

        heapify(a, n, max)
    }
}

function sort() {
    { 
        let n = a.length; 
  
        for (let i = n / 2 - 1; i >= 0; i--) 
            heapify(a, n, i); 
  
        for (let i=n-1; i>=0; i--) 
        { 
            let temp = a[0]; 
            a[0] = a[i]; 
            a[i] = temp; 
  
            heapify(a, i, 0); 
        } 
    } 
} */