
const compareArrays = (a, b) => {
    return JSON.stringify(a) === JSON.stringify(b);
};

function checkPossibleMoves(current, discovered) {
    let curLast = current.at(-1);
    let possibleMoves = [];


    if (curLast[0] - 1 > 0) {
        if (curLast[0] - 2 > 0) {
            if (curLast[1] - 1 > 0) {
                //-2 -1
                let node = [];
                current.forEach(x => node.push(x));
                let newNode = [curLast[0] - 2, curLast[1] - 1]; 
                node.push(newNode);
                if (!discovered.find((x) => compareArrays(x, newNode))) {
                    discovered.push(newNode);
                    possibleMoves.push(node);
                }

            }

            if (curLast[1] + 1 <= 8) {
                //-2 +1
                let node = [];
                current.forEach(x => node.push(x));
                let newNode = [curLast[0] - 2, curLast[1] + 1]; 
                node.push(newNode);
                if (!discovered.find((x) => compareArrays(x, newNode))) {
                    discovered.push(newNode);
                    possibleMoves.push(node);
                }

            }
        }


        if (curLast[1] - 2 > 0) {
            //-1 -2
            let node = [];
            current.forEach(x => node.push(x));
            let newNode = [curLast[0] - 1, curLast[1] - 2]; 
            node.push(newNode);
            if (!discovered.find((x) => compareArrays(x, newNode))) {
                discovered.push(newNode);
                possibleMoves.push(node);

            }

        }

        if (curLast[1] + 2 <= 8) {
            //-1 +2
            let node = [];
            current.forEach(x => node.push(x));
            let newNode = [curLast[0] - 1, curLast[1] + 2]; 
            node.push(newNode);
            if (!discovered.find((x) => compareArrays(x, newNode))) {
                discovered.push(newNode);
                possibleMoves.push(node);

            }

        }

    }

    if (curLast[0] + 1 <= 8) {
        if (curLast[0] + 2 <= 8) {
            if (curLast[1] - 1 > 0) {
                //+2 -1
                let node = [];
                current.forEach(x => node.push(x));
                let newNode = [curLast[0] + 2, curLast[1] - 1]; 
                node.push(newNode);
                if (!discovered.find((x) => compareArrays(x, newNode))) {
                    discovered.push(newNode);
                    possibleMoves.push(node);

                }

            }

            if (curLast[1] + 1 <= 8) {
                //+2 +1
                let node = [];
                current.forEach(x => node.push(x));
                let newNode = [curLast[0] + 2, curLast[1] + 1]; 
                node.push(newNode);
                if (!discovered.find((x) => compareArrays(x, newNode))) {
                    discovered.push(newNode);
                    possibleMoves.push(node);

                }

            }
        }


        if (curLast[1] - 2 > 0) {
            //+1 -2
            let node = [];
            current.forEach(x => node.push(x));
            let newNode = [curLast[0] + 1, curLast[1] - 2]; 
            node.push(newNode);
            if (!discovered.find((x) => compareArrays(x, newNode))) {
                discovered.push(newNode);
                possibleMoves.push(node);

            }

        }

        if (curLast[1] + 2 <= 8) {
            //+1 +2
            let node = [];
            current.forEach(x => node.push(x));
            let newNode = [curLast[0] + 1, curLast[1] + 2]; 
            node.push(newNode);
            if (!discovered.find((x) => compareArrays(x, newNode))) {
                discovered.push(newNode);
                possibleMoves.push(node);

            }
        }

    }

    return possibleMoves;
}


function knightMoves(current, target, discovered = []) {

    let queue = [[current]];
    discovered.push(current);

    let possible = checkPossibleMoves(queue.shift(), discovered);
    possible.forEach(e => queue.push(e));

    while (queue.length > 0) {
        let currentElement = queue.shift();
        if (compareArrays(currentElement.at(-1), target)) {
            return console.log(`You made it in ${currentElement.length - 1} moves!  Here's your path:`,...currentElement);
        }
        else {
            possible = checkPossibleMoves(currentElement, discovered);
            possible.forEach(move => queue.push(move));
        }

    }

    return 'something went wrong. Target not found!'

}


console.log(knightMoves([3, 1], [7, 8]));
console.log(knightMoves([2, 2], [8, 8]));
console.log(knightMoves([1, 2], [3, 7]));
console.log(knightMoves([1, 1], [8, 1]));
console.log(knightMoves([2, 1], [1, 6]));
