import {Input, InputType} from "./InputEvent";

export class MouseAxis implements Input {
    constructor(public type: "x" | "y" = "x") {
    }

    getType(): InputType {
        return "mouse_axis";
    }
}
