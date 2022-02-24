const Heap = function Heap(comparitionFunction) {
    const heap = [];

    function peek() {
        return heap.length > 0 ? heap[0] : null;
    }

    function insert(value) {
        heap.push(value);
        siftUp();
    }

    function pop() {
        swap(0, heap.length - 1);
        const value = heap.pop();
        siftDown();

        return value;
    }

    function size() {
        return heap.length;
    }

    function siftUp() {
        let index = heap.length - 1;
        let parent = getParent(index);

        while (0 <= parent && comparitionFunction(heap[index], heap[parent])) {
            swap(parent, index);
            index = parent;
            parent = getParent(index);
        }
    }

    function siftDown() {
        let index = 0;
        let childIndex = getChildIndex(index);

        while (childIndex < heap.length && comparitionFunction(heap[childIndex], heap[index])) {
            swap(index, childIndex);
            index = childIndex;
            childIndex = getChildIndex(index);
        }
    }

    function getParent(index) {
        return Math.floor((index - 1) / 2);
    }

    function getChildIndex(index) {
        const firstChildIndex = index * 2 + 1;
        const secondChildIndex = index * 2 + 1;

        return comparitionFunction(heap[firstChildIndex], heap[secondChildIndex]) ? firstChildIndex : secondChildIndex;
    }

    function swap(firstIndex, secondIndex) {
        [heap[firstIndex], heap[secondIndex]] = [heap[secondIndex], heap[firstIndex]];
    }

    return {
        heap,
        peek,
        insert,
        pop,
        size
    };
};

const smallerThan = (smaller, biggest) => smaller < biggest;
const biggerThan = (biggest, smaller) => biggest > smaller;
const heapify = function heapify(arr, comparitionFunction) {
    const heap = new Heap(comparitionFunction);

    for (const value of arr)
        heap.insert(value);

    return heap;
};

const createMinHeap = function createMinHeap(arr) {
    return heapify(arr, smallerThan);
};

const createMaxHeap = function createMaxHeap(arr) {
    return heapify(arr, biggerThan);
};

module.exports = {createMinHeap, createMaxHeap};
