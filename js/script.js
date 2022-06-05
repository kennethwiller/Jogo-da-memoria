const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockboard = false;

function flipCard() {

    if (lockboard) return;

    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    hasFlippedCard = false; 

    checkForMatch();
}

function checkForMatch() {
    
    if(firstCard.dataset.card === secondCard.dataset.card) {
        disableCards();
        return;
    }

    unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

/* caso as cartas não sejam iguais, elas viram para a posição back */ 
function unflipCards() {

    lockboard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockboard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function embaralhar() {
    cards.forEach((card) => {
        let ramdomPosition = Math.floor(Math.random() * 12);   
        card.style.order = ramdomPosition;
    })
})();



cards.forEach((card) => {
    card.addEventListener('click', flipCard)
});


    
