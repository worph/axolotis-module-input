import {KeyboardKey} from "../events/KeyboardKey";
import {InputService} from "../input/InputService";
import {Notifier} from "./Notifier";

export class KeyboardManager {
    setupListeners() {
        // KEY UP LISTENER
        window.addEventListener('keyup', (evt) => {
            this.checkKeyBoardEvent(evt);
        });
        // KEY DOWN LISTENER
        window.addEventListener('keydown', (evt) => {
            this.checkKeyBoardEvent(evt);
        });
    }

    // CONSTRUCTOR
    public constructor(private parent: Notifier) {
    }

    private checkKeyBoardEvent(evt: KeyboardEvent) {
        // check this is not a repeat
        if (evt.repeat == false) {
            // look for event in the key list
            for (const action in this.parent.getActionList()) {
                for (const keyListElementElement of this.parent.getActionList()[action]) {
                    if (keyListElementElement.getType() === "keyboard") {
                        let input = keyListElementElement as KeyboardKey;
                        if (input.keyCode == evt.code) {
                            this.parent.notifyBoolean(action, {
                                sourceEvt: evt,
                                actionName: action,
                                state: evt.type === "keydown",//keydown = true, keyup = false
                            });
                            this.parent.notifyScalar(action, {
                                sourceEvt: evt,
                                actionName: action,
                                state: evt.type === "keydown" ? 1.0 : 0.0,//keydown = 1.0, keyup = 0.0
                            });
                        }
                    }
                }
            }
        }
    }

}
