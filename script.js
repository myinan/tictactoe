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
        play: function(num) {
              this.choices.push(num);
              if (this.choices.length === 3) {gameModule.determineWinner(this)};
        },
    };
    return obj;
};

const gameModule = (function() {
    const winningArr = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];
    let loserArrs = [];

    const determineWinner = function(obj) {
        // One of the players has won the game
        win(obj);
        //Stalemate
    }

    function win(obj) {
        winningArr.forEach((member) => {
            if (member.every((val, index) => val === obj.choices[index])) { 
                console.log(`${obj.name} has won!`); 
                obj.points += 1;
                obj.choices = [];
            }
        });
        getLosers(obj);
    }

    function getLosers(obj) {
        loserArrs.push(obj.choices);
        console.log(loserArrs);
    }

    return { determineWinner }
})();

let playerFirst = player("John", "O");
let playerSecond = player("Jane", "X");


playerFirst.play(1);
playerFirst.play(2);
playerFirst.play(3);

playerSecond.play(1);
playerSecond.play(2);
playerSecond.play(3);