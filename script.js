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
        // One of the players has won the round
        winRound(obj);
        //Stalemate round
        stalemateRound(loserArrs);
        // One of the players has won the game
        winGame(obj);
    };

    function winRound(obj) {
        let isWinner = false;
        winningArr.forEach((member) => {
            if (member.every((val, index) => val === obj.choices[index])) { 
                console.log(`${obj.name} has won the round!`); 
                obj.points += 1;
                obj.choices = [];
                isWinner = true;
                loserArrs = [];
            }
        });
        if(!isWinner) {
            getLosers(obj);
        }
    };

    function getLosers(obj) {
        loserArrs.push(obj.choices);
        obj.choices = [];
        console.log(loserArrs);
    };

    function stalemateRound(loserArrs) {
        if (loserArrs.length == 2) {
            console.log("Round ended in stalemate!");
            loserArrs = [];
        }
    };

    function winGame(obj) {
        if(obj.points == 5) { console.log(`${obj.name} has won the game!`)};
    }

    return { determineWinner }
})();

let playerFirst = player("John", "O");
let playerSecond = player("Jane", "X");