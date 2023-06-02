import {Input, InputType} from "./InputEvent";

export class MouseButton implements Input {
    constructor(
        public btn: "Mouse-0" | "Mouse-1" | "Mouse-2" | "Mouse-3" | "Mouse-4" = "Mouse-0") {
    }

    getType(): InputType {
        return "mouse_click";
    }
}
