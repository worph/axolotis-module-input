import {Input, InputType} from "./InputEvent";

export class MouseWheel implements Input {
    constructor(public type: "up" | "down" | "any" = "any") {
    }

    getType(): InputType {
        return "mouse_wheel";
    }
}
