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
              if (this.choices.length === 3) {gameModule.determineWinner(this.choices)};
        },
    };
    return obj;
};

const gameModule = (function() {
    const winArr = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];
    const determineWinner = function(arr) {
        winArr.forEach((member) => {
            if (member.every((val, index) => val === arr[index])) {
                console.log("You've won!");
                return;
            }
        });        
    }
    return { determineWinner }
})();

let playerFirst = player("John", "O");
let playerSecond = player("Jane", "X");


playerFirst.play(1);
playerFirst.play(2);
playerFirst.play(3);