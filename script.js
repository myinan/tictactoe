const gameBoard = (function() {
    let arr = [
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
            console.log(this.choices);
        }
    }
    return obj;
};

let playerFirst = player("John", "O");
let playerSecond = player("Jane", "X");