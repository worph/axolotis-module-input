import {Compound1DInput, Compound2DInput} from "../events/Compound";
import {Notifier} from "./Notifier";

export class CompoundManager {
    // CONSTRUCTOR
    public constructor(private parent: Notifier) {

    }

    public notifyActionOn(id: string) {
        // look for event in the key list
        for (const action in this.parent.getActionList()) {
            for (const keyListElementElement of this.parent.getActionList()[action]) {
                if (keyListElementElement.getType() === "compound_1d") {
                    let input = keyListElementElement as Compound1DInput;
                    if (input.eventXPositive === id || input.eventXNegative === id) {
                        let eventXPos = this.parent.getScalarEvent(input.eventXPositive);
                        let eventXNeg = this.parent.getScalarEvent(input.eventXNegative);
                        if (eventXPos && eventXNeg) {
                            this.parent.notifyScalar(action, {
                                sourceEvt: {eventXPos, eventXNeg},
                                actionName: action,
                                state: eventXPos.state - eventXNeg.state
                            });
                        }
                    }
                }
                if (keyListElementElement.getType() === "compound_2d") {
                    let input = keyListElementElement as Compound2DInput;
                    if (input.eventX === id || input.eventY === id) {
                        let eventX = this.parent.getScalarEvent(input.eventX);
                        let eventY = this.parent.getScalarEvent(input.eventY);
                        if (eventX && eventY) {
                            this.parent.notify2DScalar(action, {
                                sourceEvt: {eventX, eventY},
                                actionName: action,
                                state: {
                                    x: eventX.state,
                                    y: eventY.state,
                                }
                            });
                        }
                    }
                }
            }
        }
    }
}
