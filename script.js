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
        _winRound(object);
        //Stalemate round
        _stalemateRound(object);
        // One of the players has won the game
        _winGame(object);
    };

    function _winRound(obj) {
        winningArr.some((member) => {
            if (member.every((val) =>  obj.choices.includes(val))) {
                domAccessModule.updateResult("winRound");
                isWinner = true;
            }
        });
    };

    function _stalemateRound(obj) {
        if(obj.choices.length == 5 && isWinner == false) { 
            domAccessModule.updateResult("stalemateRound");
        }
        isWinner = false;
    };

    function _winGame(obj) {
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
    dialog.addEventListener("click", _handleDialog);
    containerBoard.addEventListener("click", _playGame);

    function _handleDialog(event) {
        if ( event.target.id == "confirmBtn" && (firstPlayerName.value == "" || secondPlayerName.value == "")) {
            event.preventDefault();
            alert("Please provide names");
            return;
        }
        if (event.target.id == "confirmBtn") {
            event.preventDefault();

            //Create player objects
            let playerFirst = player(firstPlayerName.value, "X");
            let playerSecond = player(secondPlayerName.value, "O");

            playersArr.push(playerFirst, playerSecond);
            dialog.close();
        }
        else if (event.target.id == "cancelBtn") { window.location.reload() };
    }

    function _playGame(event) {
        let chosenNumber = event.target.getAttribute("data-value");

        if (roundCount % 2 == 1 && chosenNumber) {
            playersArr[0].play(+chosenNumber);
            roundCount++;
            _checkGameResult(playersArr[0], result);
            return;
        }
        else if (roundCount % 2 == 0 && chosenNumber) {
            playersArr[1].play(+chosenNumber);
            roundCount++;
            _checkGameResult(playersArr[1], result);
            return;
        }
    }

    function _checkGameResult(obj, res) {
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

    function _render(obj) {

    }

    function updateResult(newResult) {
        result = newResult;
    }

    return { updateResult } 
})();