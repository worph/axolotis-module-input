import {Input, InputType} from "./InputEvent";

export class KeyboardKey implements Input {
    /**
     *
     * @param keyCode https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_code_values
     * @param type
     */
    constructor(public keyCode: string) {

    }

    getType(): InputType {
        return "keyboard";
    }
}
