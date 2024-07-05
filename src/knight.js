import { HashMap } from "./hashmap.js";
import { LinkedList } from "./linked-lists.js";

function message(moveCount, pathArr) {
    console.log(`You made it in ${moveCount} moves!  Here's your path:`);
    console.log(...pathArr);
}

const compareArrays = (a, b) => {
    return JSON.stringify(a) === JSON.stringify(b);
};

function checkPossibleMoves(current, discard) {
    let possibleMoves = [];

    if (!discard.find((x) => compareArrays(x, current))) {
        discard.push(node);
    }

    if (current[0] - 1 > 0) {
        if (current[0] - 2 > 0) {
            if (current[1] - 1 > 0) {
                //-2 -1
                let node = [current[0] - 2, current[1] - 1];
                if (!discard.find((x) => compareArrays(x, node))) {
                    possibleMoves.push(node);
                    discard.push(node);
                }

            }

            if (current[1] + 1 <= 4) {
                //-2 +1
                let node = [current[0] - 2, current[1] + 1];
                if (!discard.find((x) => compareArrays(x, node))) {
                    possibleMoves.push(node);
                    discard.push(node);
                }

            }
        }


        if (current[1] - 2 > 0) {
            //-1 -2
            let node = [current[0] - 1, current[1] - 2];
            if (!discard.find((x) => compareArrays(x, node))) {
                possibleMoves.push(node);
                discard.push(node);

            }

        }

        if (current[1] + 2 <= 4) {
            //-1 +2
            let node = [current[0] - 1, current[1] + 2];
            if (!discard.find((x) => compareArrays(x, node))) {
                possibleMoves.push(node);
                discard.push(node);

            }

        }

    }

    if (current[0] + 1 <= 4) {
        if (current[0] + 2 <= 4) {
            if (current[1] - 1 > 0) {
                //+2 -1
                let node = [current[0] + 2, current[1] - 1];
                if (!discard.find((x) => compareArrays(x, node))) {
                    possibleMoves.push(node);
                    discard.push(node);

                }

            }

            if (current[1] + 1 <= 4) {
                //+2 +1
                let node = [current[0] + 2, current[1] + 1];
                if (!discard.find((x) => compareArrays(x, node))) {
                    possibleMoves.push(node);
                    discard.push(node);

                }

            }
        }


        if (current[1] - 2 > 0) {
            //+1 -2
            let node = [current[0] + 1, current[1] - 2];
            if (!discard.find((x) => compareArrays(x, node))) {
                possibleMoves.push(node);
                discard.push(node);

            }

        }

        if (current[1] + 2 <= 4) {
            //+1 +2
            let node = [current[0] + 1, current[1] + 2];
            if (!discard.find((x) => compareArrays(x, node))) {
                possibleMoves.push(node);
                discard.push(node);

            }
        }

    }

    return {
        possible: possibleMoves,
        discard: discard
    };
}

// PREVIOUS VERSION - function knightMoves(current, target, discard = [current], pathArr = [current]) {

//     let checkMoves = checkPossibleMoves(current, discard);
//     let possibleMoves = checkMoves.possible;
//     discard = checkMoves.discard;


//     let foundIt = null;
//     possibleMoves.forEach((space) => {
//         if (!foundIt) {
//             if (space[0] === target[0] && space[1] === target[1]) {
//                 foundIt = space;
//                 return foundIt;
//             };
//         }
//     })

//     if (!foundIt && possibleMoves.length > 0) {
//         possibleMoves.forEach((move) => {
//             return knightMoves(move, target, discard, pathArr);
//         })
//     }

//     if (foundIt) {
//         pathArr.push(foundIt);
//         if (compareArrays(current, pathArr[0])) {
//             let moveCount = pathArr.length - 1;
//             return message(moveCount, pathArr);
//         }
//         else {
//             return foundIt;
//         }
//     }

//     return;
// }

function knightMoves(current, target, discard = [current], pathArr = [current]) {



    // possiveis movimentos a partir do current
    let checkMoves = checkPossibleMoves(current, discard);
    const knight = new HashMap();
    checkMoves.possible.forEach((move) => knight.set(move, current));
    discard = checkMoves.discard;

    let lvl = 0;
    let breakout = false;
    while (discard.length < 16 && !breakout) {

        lvl++;

        if (knight.keys().some((x) => compareArrays(x, target))) {
            return console.log('achei 1');
        }

        else {
            knight.buckets.some((buc) => {
                let i = 1;
                let lvlbuc = buc;
                while (i < lvl) {
                    try {
                        lvlbuc = buc.head.nextNode;
                    } catch { }
                    i++;
                }
                try {
                    let test = lvlbuc.head.nextNode;
                    lvlbuc.head.nextNode = new HashMap();
                    let bucketMoves = checkPossibleMoves(lvlbuc.head.key, discard);
                    bucketMoves.possible.forEach((move) => lvlbuc.head.nextNode.set(move, lvlbuc.head.key));
                    discard = bucketMoves.discard;
                    let foundit;
                    if (lvlbuc.head.nextNode.keys().some((x) => {
                        if (compareArrays(x, target)) {
                            foundit = x;
                            return true;
                        } 
                        })) {
                        console.log('achei piranho', lvlbuc);
                        return breakout = true;

                    }
                } catch { }
            })
        }

    }
}

//knightMoves([3, 2], [1, 3]);
//desired outcome: 
//  => You made it in 1 moves!  Here's your path:
//    [3,2]
//    [1,3]


knightMoves([3, 2], [2, 3]);

// mas se eu usar hashmap msm, COMO EU FAÇO COM O KEY? PRA DIVIDIR NOS BUCKETS?