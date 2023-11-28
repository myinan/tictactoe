const gameBoard = (function() {
    const arr = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ];
    return { arr }
})();

function player(name, mark) {
    obj = {
        name,
        mark,
        choices: [],
        points: 0,
    }
    return Object.assign(obj, prototype);
};

const prototype = (function() {  
    const play = function(num) {
            this.choices.push(num);
            game.determineWinner(this.choices);
    }
    return { play };
})();

const game = (function() {
    const determineWinner = function(arr) {
        if (arr.length < 3) return;
        console.log(gameBoard.arr[0], arr);
    }
    return { determineWinner }
})();

let playerFirst = player("John", "O");
let playerSecond = player("Jane", "X");


playerFirst.play(3);
playerFirst.play(3);
playerFirst.play(3);