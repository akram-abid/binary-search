function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    const middle = Math.floor(arr.length / 2);

    const left = arr.slice(0, middle);
    const right = arr.slice(middle);

    return merge(mergeSort(left), mergeSort(right));
}

function removeDuplicate(arr) {
    const numbers = [];
    for (let i = 0; i < arr.length; i++) {
        if (!numbers.includes(arr[i])) {
            numbers.push(arr[i]);
        }
    }
    return numbers;
}

function merge(arr1, arr2) {
    const result = [];
    let i = 0;
    let j = 0;

    while (i < arr1.length && j < arr2.length) {
        if (arr1[i] <= arr2[j]) {
            result.push(arr1[i]);
            i++;
        } else {
            result.push(arr2[j]);
            j++;
        }
    }

    while (i < arr1.length) {
        result.push(arr1[i]);
        i++;
    }

    while (j < arr2.length) {
        result.push(arr2[j]);
        j++;
    }

    return result;
}

function buildTree(array) {
    array = mergeSort(removeDuplicate(array));

    let n = array.length;

    if (n === 0) return null;

    // Create the root node
    let mid = Math.floor((n - 1) / 2);
    let root = new Node(array[mid]);

    let q = [{ node: root, range: [0, n - 1] }];
    let frontIndex = 0;

    while (frontIndex < q.length) {
        let front = q[frontIndex];
        let curr = front.node;
        let [s, e] = front.range;
        let index = s + Math.floor((e - s) / 2);

        // If left subtree exists
        if (s < index) {
            let midLeft = s + Math.floor((index - 1 - s) / 2);
            let left = new Node(array[midLeft]);
            curr.left = left;
            q.push({ node: left, range: [s, index - 1] });
        }

        // If right subtree exists
        if (e > index) {
            let midRight = index + 1 + Math.floor((e - index - 1) / 2);
            let right = new Node(array[midRight]);
            curr.right = right;
            q.push({ node: right, range: [index + 1, e] });
        }

        frontIndex++;
    }
    return root;
}

class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(arr) {
        this.root = buildTree(arr);
    }
}

const tree = new Tree([4, 2, 6, 1, 3]);

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

function insert(root, data){
    console.log("called")
    let ptr = root;

    if(ptr == null){
        console.log("done", ptr);
        ptr = new Node(data);
        console.log("after", ptr);
    }else if(ptr.left == null && data < ptr.data){
        ptr.left = new Node(data);
    }else if(ptr.right == null && data > ptr.data){
        ptr.right = new Node(data);
    }
    else if(data > ptr.data){
        insert(ptr.right, data);
    }else{
        insert(ptr.left, data);
    }
}
console.log(tree.root.left.left);
insert(tree.root, 0);
insert(tree.root, 5)
prettyPrint(tree.root);
