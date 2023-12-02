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
    };

    function _winRound(obj) {
        winningArr.some((member) => {
            if (member.every((val) =>  obj.choices.includes(val))) {
                winnerArray = member;
                domAccessModule.updateResult("winRound", winnerArray);
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

    return { determineWinner }
})();

const domAccessModule = (function() {
    let playersArr = [];
    let roundCount = 1;
    let result;
    let winnerArray;

    //Store DOM nodes
    const dialog = document.getElementById("dialog");
    const containerBoard = document.getElementById("board-container");
    const firstPlayerName = document.getElementById("name1");
    const secondPlayerName = document.getElementById("name2");

    const statusFirstName = document.getElementById("first-player-name");
    const statusFirstScore = document.getElementById("first-player-score");
    const statusFirstMark = document.getElementById("first-player-mark");

    const statusSecondName = document.getElementById("second-player-name");
    const statusSecondScore = document.getElementById("second-player-score");
    const statusSecondMark = document.getElementById("second-player-mark");

    const displayWinner = document.getElementById("display-winner");
    let boxes = document.querySelectorAll('#board-container > div');

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
            _renderPlayersInfo();
            dialog.close();
        }
        else if (event.target.id == "cancelBtn") { window.location.reload() };
    }

    function _playGame(event) {
        let chosenNumber = event.target.getAttribute("data-value");

        if (roundCount % 2 == 1 && chosenNumber) {
            playersArr[0].play(+chosenNumber);
            roundCount++;

            event.target.classList.add("unclickable");
            event.target.innerText = `${playersArr[0].mark}`;
            event.target.style.backgroundColor = "#85ceff";

            _checkGameResult(playersArr[0], result);
            return;
        }
        else if (roundCount % 2 == 0 && chosenNumber) {
            playersArr[1].play(+chosenNumber);
            roundCount++;

            event.target.classList.add("unclickable");
            event.target.innerText = `${playersArr[1].mark}`;
            event.target.style.backgroundColor = "#85ceff";

            _checkGameResult(playersArr[1], result);
            return;
        }
    }

    function _checkGameResult(obj, res) {
        if (res == "winRound") {
            // Set the background color of winning numbers to green
            obj.choices.forEach((choice) => {
                boxes.forEach((box) => {
                    if (choice == box.getAttribute("data-value") && winnerArray.includes(choice)) {
                        box.style.backgroundColor = "green";
                    }
                })
            })

            _resetResRoundChoices();

            obj.points++;
            if (obj.points < 5) { 
                displayWinner.innerText = `${obj.name} has won the round!`;
                _renderPlayersInfo();
                containerBoard.classList.add("unclickable"); // Set the board unclickable
                setTimeout(_resetBoxes, 1000); // _resetBoxes reverts back to clickable 
            }
            else if (obj.points == 5) {
                _renderPlayersInfo();
                displayWinner.innerText = `${obj.name} has won the game!`;
                containerBoard.classList.add("unclickable");
            };
        }
        else if (res == "stalemateRound") {
            _resetResRoundChoices();
            displayWinner.innerText = `Round ended in stalemate.`;
            _renderPlayersInfo();
            containerBoard.classList.add("unclickable");
            setTimeout(_resetBoxes, 1000);
        }
    }

    function _resetResRoundChoices() {
        result = "";
        roundCount = 1;
        playersArr.forEach((player) => {
            player.choices = [];
        });
    }

    function _renderPlayersInfo() {
        statusFirstName.innerText = `${playersArr[0].name}`;
        statusFirstScore.innerText = `Score: ${playersArr[0].points}`;
        statusFirstMark.innerText = `Mark: ${playersArr[0].mark}`;

        statusSecondName.innerText = `${playersArr[1].name}`;
        statusSecondScore.innerText = `Score: ${playersArr[1].points}`;
        statusSecondMark.innerText = `Mark: ${playersArr[1].mark}`;
    }

    function _resetBoxes() {
             // boxes = document.querySelectorAll('#board-container > div');
                boxes.forEach(function(box) {
                box.innerText = "";
                box.style.backgroundColor = "#2c85c0";
                box.classList.remove("unclickable");
                });

        containerBoard.classList.remove("unclickable");
    }

    function updateResult(newResult, winnerArr) {
        result = newResult;
        winnerArray = winnerArr;
    }

    return { updateResult } 
})();