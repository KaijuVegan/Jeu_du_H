class Game {
    constructor(players, nbrCard) {
        this.players = players;
        this.nbrCard = nbrCard;
        this.gameBoard = document.getElementById("gameboard");
        this.gameBoard.style = "display: block;";
        this.question = document.getElementById("question");
        this.answer = document.getElementById("answer");
        this.result = document.getElementById("result");
        this.step = 0;
        this.maxStep = 3;
        this.turn = 0;
        this.maxTurn = players.length;
        this.deck = this.createDeck(nbrCard);
        this.hState = false;
        this.drink = 1;
        this.playersDecks = [];
        for (let player of players) {
            this.playersDecks.push([]);
        }
        this.rule();
    }

    rule() {
        if (this.turn === this.players.length) {
            this.step += 1
            this.turn = 0
        }
        if (this.step === 0) {
            this.askColor();
        } else if (this.step === 1) {
            this.askOverUnder();
        } else if (this.step === 2) {
            this.askInnerOuter();
        } else if (this.step === 3) {
            this.askSign();
        } else if (this.step === 4) {
            this.turn = 0;
            this.question.innerHTML = "";
            this.answer.innerHTML = "";
            this.result.innerHTML = "";
            let hBtn = document.createElement('button');
            hBtn.innerText = "Commencer le H!";
            this.gameBoard.appendChild(hBtn);
            hBtn.addEventListener('click', () => {
                this.gameBoard.removeChild(hBtn);
                this.hGame();
            })
        }
    }//rule

    askColor() {
        question.innerText = this.players[this.turn] + " quelle couleur?"
        let btnRed = document.createElement('button');
        let btnBlack = document.createElement('button');
        let answer = document.getElementById("answer")
        btnRed.innerText = "Rouge"
        btnBlack.innerText = "Noir"
        this.answer.appendChild(btnRed);
        this.answer.appendChild(btnBlack);

        btnRed.addEventListener('click', () => {
            this.answer.innerHTML = "";
            let card = this.drawCard()
            let color = card.split(' ')[1]
            if (color === "trêfle" || color === "pique") {
                this.result.innerHTML = this.convertCardName(card) + ", " + this.players[this.turn] + " a perdu! Il prend une gorgée!";
            } else if (color === "carreau" || color === "coeur") {
                this.result.innerHTML = this.convertCardName(card) + ", " + this.players[this.turn] + " a gagné! Il donne une gorgée!";
            }
            this.nextTurn();
        })

        btnBlack.addEventListener('click', () => {
            this.answer.innerHTML = "";
            let card = this.drawCard()
            let color = card.split(' ')[1]
            if (color === "trêfle" || color === "pique") {
                this.result.innerHTML = this.convertCardName(card) + ", " + this.players[this.turn] + " a gagné! Il donne une gorgée!";
            } else if (color === "carreau" || color === "coeur") {
                this.result.innerHTML = this.convertCardName(card) + ", " + this.players[this.turn] + " a perdu! Il prend une gorgée!";
            }
            this.nextTurn();
        })
    }//askColor()

    askOverUnder() {
        question.innerText = this.players[this.turn] + " en dessus ou en dessous?"
        let btnOver = document.createElement('button');
        let btnUnder = document.createElement('button');
        btnOver.innerText = "Au dessus"
        btnUnder.innerText = "En dessous"
        this.answer.appendChild(btnOver);
        this.answer.appendChild(btnUnder);

        btnOver.addEventListener('click', () => {
            this.answer.innerHTML = "";
            let card = this.drawCard();
            let nbr = card.split(' ')[0];
            if (nbr < this.playersDecks[this.turn][0].split(' ')[0]) {
                this.result.innerHTML = this.convertCardName(card) + ", " + this.players[this.turn] + " a perdu! Il prend deux gorgées!";
            } else if (nbr > this.playersDecks[this.turn][0].split(' ')[0]) {
                this.result.innerHTML = this.convertCardName(card) + ", " + this.players[this.turn] + " a gagné! Il donne deux gorgées!";
            } else {
                this.result.innerHTML = this.convertCardName(card) + ", " + this.players[this.turn] + " poteau, tu double!";
            }
            this.nextTurn();
        })

        btnUnder.addEventListener('click', () => {
            this.answer.innerHTML = "";
            let card = this.drawCard();
            let nbr = card.split(' ')[0];
            if (nbr > this.playersDecks[this.turn][0].split(' ')[0]) {
                this.result.innerHTML = this.convertCardName(card) + ", " + this.players[this.turn] + " a perdu! Il prend deux gorgées!";
            } else if (nbr < this.playersDecks[this.turn][0].split(' ')[0]) {
                this.result.innerHTML = this.convertCardName(card) + ", " + this.players[this.turn] + " a gagné! Il donne deux gorgées!";
            } else {
                this.result.innerHTML = this.convertCardName(card) + ", " + this.players[this.turn] + " poteau, tu double!";
            }
            this.nextTurn();
        })
        this.poteau();
    }//askOverUnder

    askInnerOuter() {
        question.innerText = this.players[this.turn] + " entre ou en dehors?"
        let btnInner = document.createElement('button');
        let btnOuter = document.createElement('button');
        btnInner.innerText = "Entre"
        btnOuter.innerText = "En dehors"
        this.answer.appendChild(btnInner);
        this.answer.appendChild(btnOuter);

        btnInner.addEventListener('click', () => {
            this.answer.innerHTML = "";
            let card = this.drawCard();
            let nbr = parseInt(card.split(' ')[0]);
            let arr = [];
            for (let cards of this.playersDecks[this.turn]) {
                arr.push(cards.split(" ")[0])
            }
            arr.sort(function (a, b) {
                return a - b;
            });

            if (arr[1] === nbr && arr[0] !== arr[1] && arr[2] !== arr[1]) {
                this.result.innerHTML = this.convertCardName(card) + ", " + this.players[this.turn] + " a gagné! Il donne trois gorgées!";
            } else {
                this.result.innerHTML = this.convertCardName(card) + ", " + this.players[this.turn] + " a perdu! Il prend trois gorgées!";
            }
            this.nextTurn();
        })

        btnOuter.addEventListener('click', () => {
            this.answer.innerHTML = "";
            let card = this.drawCard();
            let nbr = parseInt(card.split(' ')[0]);
            let arr = [];
            for (let cards of this.playersDecks[this.turn]) {
                arr.push(cards.split(" ")[0])
            }
            arr.sort(function (a, b) {
                return a - b;
            });

            if (arr[1] !== nbr) {
                this.result.innerHTML = this.convertCardName(card) + ", " + this.players[this.turn] + " a gagné! Il donne trois gorgées!";
            } else {
                this.result.innerHTML = this.convertCardName(card) + ", " + this.players[this.turn] + " a perdu! Il prend trois gorgées!";
            }
            this.nextTurn();
        })
        this.poteau();
    }//askOuterInner

    askSign() {

        question.innerText = this.players[this.turn] + " quel signe?"
        let btnSpade = document.createElement('button');
        let btnHearth = document.createElement('button');
        let btnDiamond = document.createElement('button');
        let btnClub = document.createElement('button');

        btnSpade.innerText = "Pique";
        btnHearth.innerText = "Coeur";
        btnDiamond.innerText = "Carreau";
        btnClub.innerText = "Trêfle";

        this.answer.appendChild(btnSpade);
        this.answer.appendChild(btnHearth);
        this.answer.appendChild(btnDiamond);
        this.answer.appendChild(btnClub);

        btnSpade.addEventListener('click', () => {
            this.answer.innerHTML = "";
            let card = this.drawCard();
            let sign = card.split(' ')[1];
            if (sign = "pique") {
                this.result.innerHTML = this.convertCardName(card) + ", " + this.players[this.turn] + " a gagné! Il donne quatre gorgées!";
            } else {
                this.result.innerHTML = this.convertCardName(card) + ", " + this.players[this.turn] + " a perdu! Il prend quatre gorgées!";
            }
            this.nextTurn();
        })

        btnHearth.addEventListener('click', () => {
            this.answer.innerHTML = "";
            let card = this.drawCard();
            let sign = card.split(' ')[1];
            if (sign = "coeur") {
                this.result.innerHTML = this.convertCardName(card) + ", " + this.players[this.turn] + " a gagné! Il donne quatre gorgées!";
            } else {
                this.result.innerHTML = this.convertCardName(card) + ", " + this.players[this.turn] + " a perdu! Il prend quatre gorgées!";
            }
            this.nextTurn();
        })

        btnDiamond.addEventListener('click', () => {
            this.answer.innerHTML = "";
            let card = this.drawCard();
            let sign = card.split(' ')[1];
            if (sign = "carreau") {
                this.result.innerHTML = this.convertCardName(card) + ", " + this.players[this.turn] + " a gagné! Il donne quatre gorgées!";
            } else {
                this.result.innerHTML = this.convertCardName(card) + ", " + this.players[this.turn] + " a perdu! Il prend quatre gorgées!";
            }
            this.nextTurn();
        })

        btnClub.addEventListener('click', () => {
            this.answer.innerHTML = "";
            let card = this.drawCard();
            let sign = card.split(' ')[1];
            if (sign = "trêfle") {
                this.result.innerHTML = this.convertCardName(card) + ", " + this.players[this.turn] + " a gagné! Il donne quatre gorgées!";
            } else {
                this.result.innerHTML = this.convertCardName(card) + ", " + this.players[this.turn] + " a perdu! Il prend quatre gorgées!";
            }
            this.nextTurn();
        })
        this.poteau();
    }//signAsk


    hGame() {
        if (this.turn !== 10) {
            let takeGive = "prend";
            if (this.turn % 2 === 0) {
                takeGive = "donne";
            }
            switch (this.turn) {
                case this.turn = 0: this.drink = 1; break;
                case this.turn = 1: this.drink = 1; break;
                case this.turn = 2: this.drink = 2; break;
                case this.turn = 3: this.drink = 2; break;
                case this.turn = 4: this.drink = 3; break;
                case this.turn = 5: this.drink = 3; break;
                case this.turn = 6: this.drink = 4; break;
                case this.turn = 7: this.drink = 4; break;
                case this.turn = 8: this.drink = "un echec critique! un cul sec pour sa sale gueule!"; break;
                case this.turn = 9: this.drink = "un cul sec le saligo!"; break;
                default: 'shit happened';
            }
            this.hState = true;
            let card = this.drawCard();
            this.question.innerHTML = "carte tirée: " + this.convertCardName(card);
            let cardExist = false;
            for (let i = 0; i < this.players.length; i++) {
                for (let j = 0; j < 3; j++) {
                    if (this.playersDecks[i][j].split(" ")[0] === card.split(" ")[0]) {
                        let looser = document.createElement('div');
                        looser.innerHTML = this.players[i] + " a " + this.convertCardName(this.playersDecks[i][j]) + ", il " + takeGive + " " + this.drink;
                        this.result.appendChild(looser)
                        cardExist = true;
                    }
                }
            }
            if (cardExist === false) {
                this.result.innerHTML = "";
                this.answer.innerText = "Il n'y a pas de " + this.convertCardName(card).split(" ")[0];
                let redrawBtn = document.createElement('button');
                redrawBtn.innerHTML = "Tirer une autre carte";
                this.gameBoard.appendChild(redrawBtn);
                redrawBtn.addEventListener('click', () => {
                    this.question.innerHTML = "";
                    this.answer.innerHTML = "";
                    this.result.innerHTML = "";
                    this.gameBoard.removeChild(redrawBtn);
                    this.hGame()
                })
            } else if (cardExist === true) {
                this.turn++;
                this.nextTurn();
            }
        } else {
            this.gameBoard.innerHTML = "Bravo, vous êtes parvenu au bout!"
        }
    }


    nextTurn() {
        let nextBtn = document.createElement('button');
        nextBtn.innerText = "Tour suivant";
        this.gameBoard.appendChild(nextBtn);
        nextBtn.addEventListener('click', () => {
            this.gameBoard.removeChild(nextBtn);
            this.question.innerHTML = "";
            this.answer.innerHTML = "";
            this.result.innerHTML = "";
            if (this.hState === false) {
                this.turn += 1;
                this.rule();
            } else if (this.hState === true) {
                this.hGame();
            }

        })
    }//nextTurn

    poteau() {
        let poteauBtn = document.createElement('button');
        poteauBtn.innerHTML = "Poteau";
        this.answer.appendChild(poteauBtn);
        poteauBtn.addEventListener('click', () => {
            this.answer.innerHTML = "";
            let card = this.drawCard();
            let playerDeck = this.playersDecks[this.turn].slice(0, -1)
            let poteau = false;
            for (let handCard of playerDeck) {
                if (handCard.split(" ")[0] === card.split(" ")[0]) {
                    poteau = true;
                }
            }
            if (poteau === true) {
                this.result.innerHTML = this.convertCardName(card) + ", " + this.players[this.turn] + ", poteau rentrant! Il donne " + (this.turn + 1) * 2 + " gorgées!";
            } else {
                this.result.innerHTML = this.convertCardName(card) + ", " + this.players[this.turn] + ", poteau sortant! Il prend " + (this.turn + 1) * 2 + " gorgées!";
            }
            this.nextTurn();
        });
    }

    createDeck() {
        let deck = [];
        let signs = [" pique", " coeur", " carreau", " trêfle"]
        let deckStyle;
        if (this.nbrCard) {
            deckStyle = 8
        } else {
            deckStyle = 13
        }
        for (let i = 0; i < deckStyle; i++) {
            for (let sign of signs) {
                deck.push(i.toString() + sign)
            }
        }

        function shuffle(array) {
            let currentIndex = array.length, randomIndex;
            while (currentIndex != 0) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;
                [array[currentIndex], array[randomIndex]] = [
                    array[randomIndex], array[currentIndex]];
            }
            return array;
        }
        return shuffle(deck);
    }//createDeck

    drawCard() {

        if (this.deck[0] !== undefined) {
            let card = this.deck[0];
            if (this.hState === false) {
                let playerDiv = document.getElementById("player" + (this.turn + 1))
                let cardDrawed = document.createElement('span');
                cardDrawed.innerText = " " + this.convertCardName(card);
                playerDiv.appendChild(cardDrawed);
                this.playersDecks[this.turn].push(card);
            }
            this.deck.shift();
            return card;
        } else {
            this.answer.innerHTML = "Il ne reste plus de carte!"
        }
    }//drawCard


    convertCardName(card) {
        let splitedName = card.split(" ");
        let realValue;
        if (this.nbrCard) {
            switch (splitedName[0]) {
                case "0": realValue = "7"; break;
                case "1": realValue = "8"; break;
                case "2": realValue = "9"; break;
                case "3": realValue = "10"; break;
                case "4": realValue = "valet"; break;
                case "5": realValue = "dame"; break;
                case "6": realValue = "roi"; break;
                case "7": realValue = "as"; break;
            }
        } else {
            realValue = parseInt(splitedName[0]) + 2;
            if (splitedName[0] === "11") {
                realValue = "Valet"
            } else if (splitedName[0] === "12") {
                realValue = "dame"
            } else if (splitedName[0] === "13") {
                realValue = "roi"
            } else if (splitedName[0] === "14") {
                realValue = "as"
            }
        }
        let newName = realValue + " de " + splitedName[1]
        return newName
    }//convertCardName
}//class