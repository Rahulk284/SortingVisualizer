//MERGE SORT
export function animateMergeSort(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    divideMerge(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
}

function divideMerge(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations,
) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    divideMerge(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    divideMerge(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
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
        animations.push([i,j]);
        animations.push([i,j]);

        if (auxiliaryArray[i] <= auxiliaryArray[j]){
            animations.push([k, auxiliaryArray[i]]);
            mainArray[k++] = auxiliaryArray[i++];
        }  
        else {
            animations.push([k, auxiliaryArray[j]]);
            mainArray[k++] = auxiliaryArray[j++];
        }

    }
    while (i <= middleIdx) {
        animations.push([i, i]);
        animations.push([i, i]);

        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
    }

    while (j <= endIdx) {
        animations.push([j, j]);
        animations.push([j, j]);

        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
    }
}

//QUICK SORT

export function animateQuickSort(array) {
    const animations = [];
    quickSort(0, array.length - 1, array, animations);
    return animations;
}

function quickSort(startIdx, endIdx, array, animations) {
    if (startIdx < endIdx) {
        let pivotIdx = partition(startIdx, endIdx, array, animations);
        animations.push([pivotIdx, pivotIdx, false, true])
        quickSort(startIdx, pivotIdx - 1, array, animations);
        quickSort(pivotIdx + 1, endIdx, array, animations);
    }
}

function partition(startIdx, endIdx, array, animations) {
    let pivotIdx = startIdx;
    let pivotValue = array[endIdx];
  
    for (let i = startIdx; i < endIdx; i++) {
        animations.push([i, endIdx, false, false]);
        if (array[i] < pivotValue) {
            animations.push([i, pivotIdx, true, false]);
            swap(array, i, pivotIdx);
            pivotIdx++;
        }
    }
  
    animations.push([pivotIdx, endIdx, true, true]);
    swap(array, pivotIdx, endIdx);
  
    return pivotIdx;
}

//SELECTION SORT

export function animateSelectionSort(array) {
    const animations = [];
    selectionSort(array, animations);
    return animations;
}

function selectionSort(array, animations) {
    for (let i = 0; i < array.length; i++) {
        let lowIdx = i;
        for (let j = i; j < array.length; j++) {
            animations.push([lowIdx, j, 0])
            animations.push([lowIdx, j, 0])
            if (array[lowIdx] > array[j]) {
                lowIdx = j;
            }
        }
        animations.push([lowIdx, i, 1]);
        swap(array, lowIdx, i);
    }
    return animations;
}

//HEAP SORT

export function animateHeapSort(array) {
    const animations = [];
    heapSort(array, animations);
    return animations;
}

function heapSort(array, animations) {
    let n = array.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(array, n, i, animations);
    }

    for (let i = n - 1; i > 0; i--) {
        var temp = array[0];
        array[0] = array[i];
        array[i] = temp;
        animations.push([0, i, 1]);

        heapify(array, i, 0, animations);

        animations.push([i, i, 0]);
    }
}

function heapify(arr, n, i, animations) {
    var largest = i; 
    var l = 2 * i + 1;
    var r = 2 * i + 2;

    if (l < n && arr[l] > arr[largest])
        largest = l;

    if (r < n && arr[r] > arr[largest])
        largest = r;

    if (largest !== i) {
        animations.push([i, largest, 1]);
        var swap = arr[i];
        arr[i] = arr[largest];
        arr[largest] = swap;

        heapify(arr, n, largest, animations);
    }
}


  
function swap(array, i, j) {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

