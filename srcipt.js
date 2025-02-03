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

const tree = new Tree([4, 2, 6, 1, 3, 5, 7]);

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

function insert(root, data) {
    let ptr = root;

    if (ptr == null) {
        ptr = new Node(data);
    } else if (ptr.left == null && data < ptr.data) {
        ptr.left = new Node(data);
    } else if (ptr.right == null && data > ptr.data) {
        ptr.right = new Node(data);
    } else if (data > ptr.data) {
        insert(ptr.right, data);
    } else {
        insert(ptr.left, data);
    }
}

function remove(root, data) {
    console.log("we're here again ptr", root);
    if (root == null) {
        return null;
    } else if (root.data == data) {
        console.log("i foudn it");
        if (root.left == null && root.right == null) {
            console.log("i am trying to eleminate thsi ", root);
            return null;
        } else if (root.left == null) {
            return root.right;
        } else if (root.right == null) {
            return root.left;
        } else {
            let successor = findMin(root.right);
            root.data = successor.data;
            root.right = remove(root.right, successor.data);
            return root;
        }
    } else {
        if (data < root.data) {
            console.log("were left ptr.data", root.data);

            console.log("went left");
            root.left = remove(root.left, data);
        } else if (data > root.data) {
            console.log("we are right");

            console.log("went right ptr.data", root.data);
            root.right = remove(root.right, data);
        }
        return root;
    }
}

function findMin(node) {
    while (node.left != null) {
        node = node.left;
    }
    return node;
}

function levelOrder(tree, qeue = [], callback) {
    if (tree == null) {
        return;
    } else {
        callback(tree);
        qeue.push(tree.left);
        qeue.push(tree.right);
        //console.log("the que now ", qeue);
        if (qeue.length !== 0) {
            levelOrder(qeue.shift(), qeue, callback);
        }
    }
}

function height(tree) {
    if (tree == null) {
        return -1;
    } else {
        return max(1 + height(tree.left), 1 + height(tree.right));
    }
}

function max(a, b) {
    if (a > b) return a;
    else return b;
}

function depth(tree, data) {
    if (tree == null) {
        throw new Error("data doesn't exist");
    } else {
        if (tree.data == data) {
            return 0;
        } else {
            if (data > tree.data) {
                return 1 + depth(tree.right, data);
            } else {
                return 1 + depth(tree.left, data);
            }
        }
    }
}

function isBalanced(tree) {
    if (tree == null) {
        return true;
    } else {
        return (
            Math.abs(height(tree.left) - height(tree.right)) <= 1 &&
            isBalanced(tree.left) &&
            isBalanced(tree.right)
        );
    }
}

//console.log(tree.root.left.left);
insert(tree.root, 0);
//insert(tree.root, 5);
//console.log("smaller", findSmallerRemoval(tree.root));
//console.log("last line bigger", findBiggerRemoval(tree.root));
remove(tree.root, 7);
remove(tree.root, 5);
remove(tree.root, 0);

//console.log(tree.root);
prettyPrint(tree.root);
levelOrder(tree.root, [], (data) => {
    console.log(data.data);
});
//console.log("the height is ", depth(tree.root, 4));
console.log("is balanced ", isBalanced(tree.root));
