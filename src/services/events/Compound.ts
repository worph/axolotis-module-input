import {Input, InputType} from "./InputEvent";

export class Compound1DInput implements Input {
    constructor(public eventXPositive: string, public eventXNegative: string) {
    }

    getType(): InputType {
        return "compound_1d";
    }

}

export class Compound2DInput implements Input {
    constructor(public eventX: string, public eventY: string) {
    }

    getType(): InputType {
        return "compound_2d";
    }

}
