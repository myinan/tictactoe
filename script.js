function player(name, mark) {
    let obj = {
        name,
        mark,
        choices: [],
        points: 0,
        play: function(num) {
              this.choices.push(num);
              if (this.choices.length >= 3) {gameModule.determineWinner(this)};
        },
    };
    return obj;
};

const gameModule = (function() {
    const winningArr = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];
    let isWinner;

    const determineWinner = function(object) {
        // One of the players has won a round
        winRound(object);
        //Stalemate round
        stalemateRound(object);
        // One of the players has won the game
        winGame(object);
    };

    function winRound(obj) {
        winningArr.some((member) => {
            if (member.every((val) =>  obj.choices.includes(val))) {
                domAccessModule.updateResult("winRound");
                isWinner = true;
            }
        });
    };

    function stalemateRound(obj) {
        if(obj.choices.length == 5 && isWinner == false) { 
            domAccessModule.updateResult("stalemateRound");
        }
        isWinner = false;
    };

    function winGame(obj) {
        if(obj.points == 5) { domAccessModule.updateResult("winGame"); };
    }

    return { determineWinner }
})();

const domAccessModule = (function() {
    let playersArr = [];
    let roundCount = 1;
    let result;

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
            playersArr[0].play(+event.target.getAttribute("data-value"));
            roundCount++;
            checkGameResult(playersArr[0], result);
            return;
        }
        else if (roundCount % 2 == 0 && (event.target.getAttribute("data-value"))) {
            playersArr[1].play(+event.target.getAttribute("data-value"));
            roundCount++;
            checkGameResult(playersArr[1], result);
            return;
        }
    }

    function checkGameResult(obj, res) {
        if (res == "winRound") {
            console.log(`${obj.name} has won the round!`);
            result = "";
            roundCount = 1;
            obj.points++;
            playersArr.forEach((player) => {
                player.choices = [];
            });   
        }
        else if (res == "stalemateRound") {
            console.log("STALEMATE");
            result = "";
            roundCount = 1;
        }
        else if (res == "winGame") {
            console.log(`${obj.name} has won the game!`);
            result = "";
            roundCount = 1;
        }
    }

    function updateResult(newResult) {
        result = newResult;
    }

    return { updateResult } 
})();