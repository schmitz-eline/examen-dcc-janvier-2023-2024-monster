import {Player} from './Player';
import {settings} from './settings';

const monsterGame = {
    init() {
        this.players = [new Player(settings.defaultPlayerName1), new Player(settings.defaultPlayerName2)];
        this.formElement = document.getElementById(settings.playGameFormId);
        this.labelPlayerElement = document.getElementById(settings.playerNameId);
        this.controlElement = document.querySelector(settings.controlDivSelector);
        this.actionsButtons = document.querySelectorAll(settings.actionsSelector);
        this.cardElements = document.querySelectorAll(settings.players_container_selector);
        this.logElement = document.querySelector(settings.logContainerSelector);
        this.addEventListeners();
    },

    hideFormAndShowControls(evt) {
        evt.currentTarget.classList.add(settings.hideElementClass);
        this.controlElement.classList.remove(settings.hideElementClass);
    },

    changePlayerName(evt) {
        evt.preventDefault();
        this.players[0].name = evt.currentTarget.querySelector('input').value;
        this.labelPlayerElement.textContent = this.players[0].name;
        this.hideFormAndShowControls(evt);
    },

    updateCard(i) {
        this.cardElements[i].querySelector(settings.labelSelector).textContent = settings.remaining_life_message(this.players[i].health);
        this.cardElements[i].querySelector(settings.progressSelector).value = this.players[i].health;
    },

    displayLogs(name, i, damage) {
        this.logElement.insertAdjacentHTML('beforeend', settings.actions[name].message(this.players[i], damage));
    },

    play(name) {
        let gameOverName = null;
        for (let i = 0; i < this.players.length; i++) {
            const damage = Math.floor(Math.random() * settings.actions[name].max_impact);
            this.players[i].health += damage;
            this.updateCard(i);
            this.displayLogs(name, i, damage);
            if (this.players[i].health <= 0) {
                gameOverName = this.players[i].name;
            }
        }

        if (gameOverName) {
            this.lostGame(gameOverName);
        }
    },

    start(evt) {
        this.players = [new Player(settings.defaultPlayerName1), new Player(settings.defaultPlayerName2)];
        this.changePlayerName(evt);
        this.logElement.innerHTML = '';
        for (let i = 0; i < this.players.length; i++) {
            this.updateCard(i);
        }
    },

    addEventListeners() {
        for (const actionsButton of this.actionsButtons) {
            actionsButton.addEventListener('click', (evt) => {
                if (evt.currentTarget.dataset.name === 'give-up') {
                    // TODO :
                } else {
                    this.play(evt.currentTarget.dataset.name);
                }
            });
        }

        this.formElement.addEventListener('submit', (evt) => {
            this.start(evt);
        });
    },

    lostGame(name) {
        this.formElement.classList.remove(settings.hideElementClass);
        this.controlElement.classList.add(settings.hideElementClass);
        this.logElement.insertAdjacentHTML('beforeend', settings.lost_message(name));
    }
};

monsterGame.init();