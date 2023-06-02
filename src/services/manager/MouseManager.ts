import {MouseAxis} from "../events/MouseAxis";
import {MouseButton} from "../events/MouseButton";
import {MouseWheel} from "../events/MouseWheel";
import {Notifier} from "./Notifier";

export class MouseManager {
    setupListeners(el: HTMLElement) {

        el.addEventListener('mousedown', (evt) => {
            this.checkMouseEvent(evt, "mousedown");
        });
        el.addEventListener('mouseup', (evt) => {
            this.checkMouseEvent(evt, "mouseup");
        });
        el.addEventListener('mouseout', (evt) => {
            this.checkMouseEvent(evt, "mouseup");
        });
        el.addEventListener("mousemove", (evt) => {
            for (const action in this.parent.getActionList()) {
                for (const keyListElementElement of this.parent.getActionList()[action]) {
                    if (keyListElementElement.getType() === "mouse_axis") {
                        let input = keyListElementElement as MouseAxis;
                        if (input.type === "x") {
                            this.parent.notifyScalar(action, {
                                sourceEvt: evt,
                                actionName: action,
                                state: evt.offsetX,
                            });
                        }
                        if (input.type === "y") {
                            this.parent.notifyScalar(action, {
                                sourceEvt: evt,
                                actionName: action,
                                state: evt.offsetY,
                            });
                        }
                    }
                }
            }
        });
        el.addEventListener("wheel", (evt: any) => {
            for (const action in this.parent.getActionList()) {
                for (const keyListElementElement of this.parent.getActionList()[action]) {
                    if (keyListElementElement.getType() === "mouse_wheel") {
                        let input = keyListElementElement as MouseWheel;
                        if (input.type === "up") {
                            throw new Error("not yet implemented");
                        }
                        if (input.type === "down") {
                            throw new Error("not yet implemented");
                        }
                        this.parent.notifyScalar(action, {
                            sourceEvt: evt,
                            actionName: action,
                            state: evt.deltaY,
                        });
                    }
                }
            }
        });
    }

    // CONSTRUCTOR
    public constructor(private parent: Notifier) {

    }

    private checkMouseEvent(evt: MouseEvent, state: string) {
        //https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
        let key = "Mouse-" + evt.button;
        for (const action in this.parent.getActionList()) {
            for (const keyListElementElement of this.parent.getActionList()[action]) {
                if (keyListElementElement.getType() === "mouse_click") {
                    let input = keyListElementElement as MouseButton;
                    if (input.btn == key) {
                        this.parent.notifyBoolean(action, {
                            sourceEvt: evt,
                            actionName: action,
                            state: state === "mousedown",//mousedown = true, mouseup = false
                        });
                        this.parent.notifyScalar(action, {
                            sourceEvt: evt,
                            actionName: action,
                            state: state === "mousedown" ? 1.0 : 0.0,//mousedown = 1.0, mouseup = 0.0
                        });
                    }
                }
            }
        }
    }
}
