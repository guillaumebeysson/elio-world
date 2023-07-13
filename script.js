const emojis = ["1.png", "8.png", "7.png", "4.png", "2.png", "6.png", "2.png", "3.png", "5.png", "1.png", "6.png", "3.png", "7.png", "4.png", "8.png", "5.png"];

let shuf_emojis = emojis.sort(() => (Math.random() > .5) ? 2 : -1);

let startTime; // Variable pour enregistrer le moment de début du jeu
let intervalId; // Variable pour stocker l'ID de l'intervalle du chronomètre

for (let i = 0; i < emojis.length; i++) {
    let box = document.createElement('div');
    box.className = 'item';
    let image = document.createElement('img');
    image.src = 'images/' + shuf_emojis[i];
    box.appendChild(image);

    box.onclick = function () {
        if (!startTime) {
            startTime = Date.now(); // Enregistrer le moment de début du jeu lors du premier clic sur une case
            startTimer(); // Démarrer le chronomètre
        }

        this.classList.add('boxOpen');
        setTimeout(function () {
            if (document.querySelectorAll('.boxOpen').length > 1) {
                if (document.querySelectorAll('.boxOpen')[0].innerHTML == document.querySelectorAll('.boxOpen')[1].innerHTML) {
                    document.querySelectorAll('.boxOpen')[0].classList.add('boxMatch');
                    document.querySelectorAll('.boxOpen')[1].classList.add('boxMatch');
                    document.querySelectorAll('.boxOpen')[1].classList.remove('boxOpen');
                    document.querySelectorAll('.boxOpen')[0].classList.remove('boxOpen');

                    if (document.querySelectorAll('.boxMatch').length == emojis.length) {
                        showWinModal();
                        stopTimer(); // Arrêter le chronomètre lorsque vous gagnez
                    }
                } else {
                    document.querySelectorAll('.boxOpen')[1].classList.remove('boxOpen');
                    document.querySelectorAll('.boxOpen')[0].classList.remove('boxOpen');
                }
            }
        }, 500);
    }

    document.querySelector('.game').appendChild(box);
}

function showWinModal() {
    const modal = document.getElementById('winModal');
    const elapsedTimeSpan = document.getElementById('elapsedTime');
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000); // Calculer le temps écoulé en secondes
    elapsedTimeSpan.textContent = elapsedTime;
    modal.style.display = 'block';
}

function startTimer() {
    intervalId = setInterval(updateTimer, 1000);
}

function updateTimer() {
    const timerElement = document.getElementById('timer');
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000); // Calculer le temps écoulé en secondes
    timerElement.textContent = elapsedTime + ' s';
}

function stopTimer() {
    clearInterval(intervalId);
}