const pairs = [
    { images: ['image1a.jpg', 'image1b.jpg'], message: 'Internet i les xarxes socials són un escenari cada cop més freqüent per <b>als ciberdelinqüents que volen robar-nos les dades, vendre-les o fer-nos xantatge</b> perquè les puguem recuperar.' },
    { images: ['image2a.jpg', 'image2b.jpg'], message: 'Les aplicacions intel·ligents, com <b>els rellotges que utilitzem per fer esport, registren la nostra activitat i la nostra ubicació i geolocalització</b>. Això pot ser utilitzat per altres persones i no sempre amb les millors intencions, com és el cas dels lladres.' },
    { images: ['image3a.jpg', 'image3b.jpg'], message: 'La contrasenya és la manera més habitual de protegir l’accés als nostres perfils a les xarxes socials o aplicacions. Cada cop més, hi ha persones que es dediquen a robar-les i vendre-les. <b>Si vols protegir-te, cal que utilitzis una clau forta, llarga, amb majúscules, minúscules i símbols</b>. Si és una frase o un concepte, més enllà d’una sola paraula, molt millor!' },
    { images: ['image4a.jpg', 'image4b.jpg'], message: 'Les xarxes socials ens connecten amb altres persones i també serveixen per mirar vídeos, divertir-nos... Però cal anar amb compte i <b>ser conscient que tot el que es puja i es comparteix per aquesta via deixa d’estar sota el nostre control</b>. Altres persones ho podrien compartir i utilitzar de manera que potser no voldríem, i ens podria perjudicar.' },
    { images: ['image5a.jpg', 'image5b.jpg'], message: 'Els videojocs i els jocs en línia ens traslladen a escenaris estimulants i ens fan protagonistes de la història. També ens permeten jugar amb altres persones en temps real i compartir dades amb elles. <b>Cal ser curós amb quines dades compartim, perquè quedaran fora del nostre control</b>.' },
    { images: ['image6a.jpg', 'image6b.jpg'], message: 'La tecnologia i en especial internet té multitud d’avantatges. També presenta riscos, perquè moltes vegades proporcionem informació sense ser gaire conscients de les conseqüències que pot tenir. <b>Quan entrem en un web, hem d’acceptar o rebutjar galetes (cookies), i això proporciona a l’empresa o entitat informació sobre nosaltres</b>. També, quan comprem per internet, moltes vegades ens demanen dades sobre nosaltres i cal que siguem conscients de què volem proporcionar.' },
    { images: ['image7a.jpg', 'image7b.jpg'], message: 'El mòbil no només serveix per parlar per telèfon o xatejar. També visualitzem vídeos i compartim fotografies i informació que diu molt sobre qui som. <b>Abans d’utilitzar el móbil per compartir dades, consulta-ho amb un adult, el pare, la mare, el teu germà gran</b>... Un mòbil no és cap joguina i cal que siguem conscients dels riscos que també pot suposar.' },
    { images: ['image8a.jpg', 'image8b.jpg'], message: 'Quan compartim notes de veu per les xarxes socials, moltes vegades pensem en una conversa privada, però la xarxa permet compartir qualsevol arxiu de manera fàcil i es podria fer viral. <b>Abans d’enviar una nota de veu o compartir-la, pensa què passaria si es fes pública</b>.' },
    { images: ['image9a.jpg', 'image9b.jpg'], message: 'La videovigilància s’utilitza principalment per mantenir la seguretat de persones, béns o instal·lacions. També per prevenir el frau, per controlar operacions, etc. <b>Quan et gravin, sempre te n’han d’informar amb un cartell identificatiu clarament visible</b>.' },
    { images: ['image10a.jpg', 'image10b.jpg'], message: 'Algunes joguines connectades a internet, que ens parlen o interactuen amb nosaltres, <b>poden gravar les converses i la veu i utilitzar-les sense que en siguem conscients, o vendre-les</b>. Cal comprovar la configuració de l’aparell i donar només els permisos necessaris per jugar.' }
];

let images = [];
pairs.forEach(pair => {
    images = images.concat(pair.images);
});

const backImage = 'back.jpg';  // La imatge del revers de les cartes

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;

function shuffle(array) {
    array.sort(() => 0.5 - Math.random());
}

function createBoard() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = ''; // Netegem el tauler per a un nou joc'
    shuffle(images);
    images.forEach(image => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.image = image;

        const cardInner = document.createElement('div');
        cardInner.classList.add('card-inner');

        const cardFront = document.createElement('div');
        cardFront.classList.add('card-front');
        const imgFront = document.createElement('img');
        imgFront.src = image;
        cardFront.appendChild(imgFront);

        const cardBack = document.createElement('div');
        cardBack.classList.add('card-back');
        const imgBack = document.createElement('img');
        imgBack.src = backImage;
        cardBack.appendChild(imgBack);

        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);

        card.addEventListener('click', flipCard);

        gameBoard.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    const firstImagePair = pairs.find(pair => pair.images.includes(firstCard.dataset.image));
    const secondImagePair = pairs.find(pair => pair.images.includes(secondCard.dataset.image));
    const isMatch = firstImagePair === secondImagePair;

    if (isMatch) {
        showModal(firstImagePair.images, firstImagePair.message);
        disableCards();
        matchedPairs++;
        if (matchedPairs === pairs.length) {
            setTimeout(() => {
                waitForModalToClose(showEndModal);
            }, 500);
        }
    } else {
        unflipCards();
    }
}

function showModal(images, message) {
    const modal = document.getElementById('modal');
    const modalMessage = document.getElementById('modal-message');
    const modalImages = document.getElementById('modal-images');
    const closeButton = document.querySelector('.close-button');

    // Neteja les imatges anteriors
    modalImages.innerHTML = '';

    // Afegir les imatges de la parella a la finestra modal
    images.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        modalImages.appendChild(img);
    });

    modalMessage.innerHTML = message;
    modal.style.display = 'block';

    closeButton.onclick = function() {
        modal.style.display = 'none';
    };

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };
}

function waitForModalToClose(callback) {
    const modal = document.getElementById('modal');
    const observer = new MutationObserver(() => {
        if (modal.style.display === 'none') {
            observer.disconnect();
            callback();
        }
    });

    observer.observe(modal, { attributes: true, attributeFilter: ['style'] });
}

function showEndModal() {
    const endModal = document.getElementById('end-modal');
    const restartButton = document.getElementById('restart-button');

    endModal.style.display = 'block';

    restartButton.onclick = function() {
        endModal.style.display = 'none';
        resetGame();
    };

    window.onclick = function(event) {
        if (event.target == endModal) {
            endModal.style.display = 'none';
        }
    };
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

function resetGame() {
    matchedPairs = 0;
    createBoard();
}

document.addEventListener('DOMContentLoaded', createBoard);
