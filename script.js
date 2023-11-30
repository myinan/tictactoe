function player(name, mark) {
    let obj = {
        name,
        mark,
        choices: [],
        points: 0,
        play: function(num) {
              this.choices.push(num);
              if (this.choices.length == 3) {gameModule.determineWinner(this)};
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
            if (member.every((val, index) => val == obj.choices[index])) { 
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

const domAccessModule = (function() {
    let playersArr = [];
    let roundCount = 1;

    //Store DOM nodes
    const dialog = document.getElementById("dialog");
    const containerBoard = document.getElementById("board-container");
    const firstPlayerName = document.getElementById("name1");
    const secondPlayerName = document.getElementById("name2");
    
    document.addEventListener("DOMContentLoaded", () => dialog.showModal());
    dialog.addEventListener("click", handleDialog);
    containerBoard.addEventListener("click", handleGameBoardClick);

    function handleDialog(event) {
        if (event.target.id == "confirmBtn") {
            event.preventDefault();

            //Create player objects
            let playerFirst = player(firstPlayerName.value, "X");
            let playerSecond = player(secondPlayerName.value, "O");

            playersArr.push(playerFirst, playerSecond);
            dialog.close();     
        }
        else if (event.target.id == "cancelBtn") { dialog.close() };
    }

    function handleGameBoardClick(event) {
        if (roundCount % 2 == 1 && (event.target.getAttribute("data-value"))) {
            playersArr[0].play(event.target.getAttribute("data-value"));
            roundCount++;

            console.log(roundCount);
            console.log(playersArr[0]);

            return;
        }
        else if (roundCount % 2 == 0 && (event.target.getAttribute("data-value"))) {
            playersArr[1].play(event.target.getAttribute("data-value"));
            roundCount++;

            console.log(roundCount);
            console.log(playersArr[1]);

            return;
        }
    }
})();