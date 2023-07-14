const emojis = ["1.png", "8.png", "7.png", "4.png", "2.png", "6.png", "2.png", "3.png", "5.png", "1.png", "6.png", "3.png", "7.png", "4.png", "8.png", "5.png", "9.png", "9.png", "10.png", "10.png", "11.png", "11.png", "12.png", "12.png", "13.png", "13.png", "14.png", "14.png", "15.png", "15.png", "16.png", "16.png", "17.png", "17.png", "18.png", "18.png"];


// Fonction pour mélanger le tableau en utilisant l'algorithme de Fisher-Yates
function shuffleArray(array) {
    let currentIndex = array.length;
    let temporaryValue, randomIndex;

    // Tant qu'il reste des éléments à mélanger
    while (currentIndex !== 0) {
        // Sélectionner un élément non mélangé restant
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // Échanger cet élément avec l'élément actuel
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

let shuf_emojis = shuffleArray(emojis);

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
    // confetti
    if (window.confetti) {
        var count = 200;
        var defaults = {
            origin: { y: 0.7 },
        };

        function fire(particleRatio, opts) {
            confetti(
                Object.assign({}, defaults, opts, {
                    particleCount: Math.floor(count * particleRatio),
                })
            );
        }

        fire(0.25, {
            spread: 26,
            startVelocity: 55,
        });
        fire(0.2, {
            spread: 60,
        });
        fire(0.35, {
            spread: 100,
            decay: 0.91,
        });
        fire(0.1, {
            spread: 120,
            startVelocity: 25,
            decay: 0.92,
        });
        fire(0.1, {
            spread: 120,
            startVelocity: 45,
        });
    }
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