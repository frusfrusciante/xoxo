let ceil = document.querySelectorAll(".game-item"), reset = document.querySelector("#reset-game"), message = document.querySelector('#message'), player = "X", stepCount = 0, 
 winCombinations = [[1, 2, 3], [1, 4, 7], [1, 5, 9], [2, 5, 8], [3, 6, 9], [3, 5, 7], [4, 5, 6], [7, 8, 9]], dataX = [], dataO = [];

function currentStep() {
    let num = +this.getAttribute('data-ceil');
    if (!this.textContent) {
        this.innerText = player;
        player === 'X' ? dataX.push(num) && this.classList.add('x') : dataO.push(num) && this.classList.add('o');
        if ((dataO.length > 2 || dataX.length > 2) && (checkWin(dataO, num)) || checkWin(dataX, num)) {
            for (let i = 0; i < ceil.length; i++) {
                ceil[i].removeEventListener('click', currentStep);
            }

            return(message.innerText = "Победил игрок " + player);

        }
        changePlayer();
        stepCount++;
        stepCount === 9 ? (message.innerText = "Ничья") : (message.innerText = "Ходит игрок" + player);

    }
}

for (let i = 0; i < ceil.length; i++) {
    ceil[i].addEventListener("click", currentStep);
}

function changePlayer() {
    player === "X" ? (player = "O") : (player = "X");
}

reset.addEventListener('click', function() {
    for (let i = 0; i < ceil.length; i++) {
        ceil[i].innerText = '';
    }
    dataO = [];
    dataX = [];
    player = "O";
    stepCount = 0;
    message.innerText = "Ходит игрок " + player;
    for (let i = 0; i < ceil.length; i++) {
        ceil[i].addEventListener('click', currentStep);
        ceil[i].classList.remove("x", "o");
    } 
});

function checkWin(arr, number) {
    for (let w = 0, wLen = winCombinations.length; w < wLen; w++) {
        let someWinArr = winCombinations[w], count = 0;
        if (someWinArr.indexOf(number) !== -1) {
            for (let k = 0, kLen = someWinArr.length; k < kLen; k++) {
                if (arr.indexOf(someWinArr[k]) !== -1) {
                    count++;
                    if (count === 3) {
                        return true;
                    }
                }
            }
            count = 0;
        }
    }
}