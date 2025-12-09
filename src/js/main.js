import {Player} from "./Player";
import {settings} from "./settings";

const monsterGame = {
    init() {
        this.players = [new Player(settings.defaultPlayerName1), new Player(settings.defaultPlayerName2)];
        this.formElement = document.getElementById(settings.playGameFormId);
        this.playerNameElement = document.getElementById(settings.playerNameId);
        this.controlDivElement = document.querySelector(settings.controlDivSelector);
        this.actionButtonElements = document.querySelectorAll(settings.actionsSelector);
        this.cardElements = document.querySelectorAll(settings.players_container_selector);
        this.logElement = document.querySelector(settings.logContainerSelector);
        this.submitButtonElement = document.querySelector(settings.submitButtonSelector);

        this.eventListeners();
    },

    eventListeners() {
        this.formElement.addEventListener('submit', (event) => {
            event.preventDefault();
            this.updatePlayerName(event);
            this.hideFormAndShowControls();
            this.logElement.innerHTML = '';
            for (let i = 0; i < this.players.length; i++) {
                this.players[i].health = settings.healthMaxValue;
                this.updateCards(i);
            }
        });

        this.actionButtonElements.forEach((button) => {
            button.addEventListener('click', (event) => {
                if (event.currentTarget.dataset.name === 'give-up') {
                    this.lostGame(this.players[0].name);
                } else {
                    this.play(event.currentTarget.dataset.name);
                }
            });
        });
    },

    updatePlayerName(event) {
        this.players[0].name = event.currentTarget.querySelector('input').value;
        this.playerNameElement.textContent = event.currentTarget.querySelector('input').value;
    },

    hideFormAndShowControls() {
        this.formElement.classList.add(settings.hideElementClass);
        this.controlDivElement.classList.remove(settings.hideElementClass);
    },

    play(name) {
        let gameOverName = null;

        for (let i = 0; i < this.players.length; i++) {
            const damage = Math.floor(Math.random() * settings.actions[name].max_impact);
            this.players[i].health += damage;
            this.updateCards(i);
            this.displayLogs(name, damage, i);
            if (this.players[i].health <= 0) {
                gameOverName = this.players[i].name;
            }
        }

        if (gameOverName) {
            this.lostGame(gameOverName);
        }
    },

    updateCards(i) {
        this.cardElements[i].querySelector(settings.labelSelector).textContent = settings.remaining_life_message(this.players[i].health);
        this.cardElements[i].querySelector(settings.progressSelector).value = this.players[i].health;
    },

    displayLogs(name, damage, i) {
        this.logElement.insertAdjacentHTML('beforeend', settings.actions[name].message(this.players[i], damage));
    },

    lostGame(name) {
        this.formElement.classList.remove(settings.hideElementClass);
        this.controlDivElement.classList.add(settings.hideElementClass);
        this.logElement.insertAdjacentHTML('beforeend', settings.lost_message(name));
        this.submitButtonElement.textContent = settings.play_again_message;
    },
}

monsterGame.init();