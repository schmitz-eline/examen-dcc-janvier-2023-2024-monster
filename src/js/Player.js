import {settings} from "./settings";

export class Player {
    constructor(name) {
        this.name = name;
        this.health = settings.healthMaxValue;
    }
}
