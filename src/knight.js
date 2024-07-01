function knightMoves(current, target) {
    let moveCount = 0;
    let pathArr = [target];

    //current tem que estar entre [1,1] e [4,4]
    //target tem que estar entre [1,1] e [4,4]

    //se target = current -> return 0 moves e pathArr = [target]

    let possibleMoves = [];

    if (current[0] - 1 > 0) {
        if (current[0] - 2 > 0) {
            if (current[1] - 1 > 0) {
                //-2 -1
                possibleMoves.push([current[0] - 2, current[1] - 1]);

            }

            if (current[1] + 1 <= 4) {
                //-2 +1
                possibleMoves.push([current[0] - 2, current[1] + 1]);

            }
        }


        if (current[1] - 2 > 0) {
            //-1 -2
            possibleMoves.push([current[0] - 1, current[1] - 2]);

        }

        if (current[1] + 2 <= 4) {
            //-1 +2
            possibleMoves.push([current[0] - 1, current[1] + 2]);

        }

    }

    if (current[0] + 1 <= 4) {
        if (current[0] + 2 <= 4) {
            if (current[1] - 1 > 0) {
                //+2 -1
                possibleMoves.push([current[0] + 2, current[1] - 1]);

            }

            if (current[1] + 1 <= 4) {
                //+2 +1
                possibleMoves.push([current[0] + 2, current[1] + 1]);

            }
        }


        if (current[1] - 2 > 0) {
            //+1 -2
            possibleMoves.push([current[0] + 1, current[1] - 2]);

        }

        if (current[1] + 2 <= 4) {
            //+1 +2
            possibleMoves.push([current[0] + 1, current[1] + 2]);
        }

    }

    let foundIt = null;
    possibleMoves.forEach((space) => {
        if(space[0] === target[0] && space[1] === target[1]) {
            foundIt = space;
            moveCount++;
            return pathArr.push[foundIt];
        };
    })

    while(!foundIt) {
        moveCount++;
        possibleMoves.forEach((move) => {
            return knightMoves(move, target);
        })
    }

    return message(moveCount, pathArr);
}

function message(moveCount, pathArr) {
    console.log(`You made it in ${moveCount} moves!  Here's your path:`);
    console.log(...pathArr);
}


knightMoves([3, 2], [1, 3]);
//desired outcome: 
//  => You made it in 1 moves!  Here's your path:
//    [3,2]
//    [1,3]