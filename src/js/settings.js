export const settings = {
    defaultPlayerName1: 'John',
    playGameFormId: 'play-game',
    submitButtonSelector: 'button[type="submit"]',
    // Attention il y en a 2. 👌
    players_container_selector: '.player-container__player',
    logContainerSelector: '.log',
    controlDivSelector: '.controls',
    actionsSelector: '.controls__btn',
    logItemSelector: '.log__item',
    hideElementClass: 'visuallyhidden',
    playerNameSelector: '.player-container__player__header',
    playerNameId: 'player-name',
    healthMaxValue: 100,
    givUpName: 'give-up',
    labelSelector: 'label',
    progressSelector: 'progress',
    play_again_message: 'Rejouer',
    defaultPlayerName2: 'Monster',
    lost_message: (name) => `<p class="log__item">${name} a perdu !</p>`,
    remaining_life_message: (value) => `${value}% de vie restante`,
    actions: {
        attack: {
            max_impact: -7,
            message(player, damage) {
                return `<li class="log__item">${player.name} a subi une attaque simple de ${Math.abs(damage)}. Il en est à ${player.health}.</li>`;
            }
        },
        special_attack: {
            max_impact: -14,
            message(player, damage) {
                return `<li class="log__item">${player.name} a subi une attaque spéciale de ${Math.abs(damage)}. Il en est à ${player.health}.</li>`;
            }
        },
        heal: {
            max_impact: 7,
            message(player, damage) {
                return `<li class="log__item">${player.name} a été soigné de de ${Math.abs(damage)}. Il en est à ${player.health}.</li>`;
            }
        }
    },
};