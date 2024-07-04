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
    let possibleMoves = checkMoves.possible;
    discard = checkMoves.discard;

    // procura pelo target nessas opções
    if (possibleMoves.find((move) => compareArrays(move, target))) {
        console.log('achei 1');
    }

    // se nao encontrou, checa possiveis movimentos a partir de cada possivel movimento (eliminando o space anterior 
    // - sempre dá pra voltar de onde saiu)
  let letsbreak = false;
    while (discard.length < 16 && !letsbreak) {
        let tempMoves;
        possibleMoves.some((move) => {
            tempMoves = checkPossibleMoves(move, discard);
            move = tempMoves.possible;
            discard = tempMoves.discard;
            if (move.find((move) => compareArrays(move, target))) {
                console.log('achei 2', move);
                letsbreak = true;
                return true;
            }
            else { return false; }
        })
    }

    // procura pelo target nessas opções

    // repete isso até encontrar

    // retorna o primeiro caminho a chegar no target (será O mais curto OU UM deles, se mais de 1 opção)

}

//knightMoves([3, 2], [1, 3]);
//desired outcome: 
//  => You made it in 1 moves!  Here's your path:
//    [3,2]
//    [1,3]

const knight = new HashMap();

knightMoves([3, 2], [3, 1]);