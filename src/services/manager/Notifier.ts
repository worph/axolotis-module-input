import {BooleanEvent, Input, Scalar2DEvent, ScalarEvent} from "../events/InputEvent";

export interface Notifier {
    notifyBoolean(id: string, event: BooleanEvent);
    notifyScalar(id: string, event: ScalarEvent);
    notify2DScalar(id: string, event: Scalar2DEvent);

    getBooleanValue(actionName: string): boolean;
    getScalarValue(actionName: string): number;
    getScalar2DValue(actionName: string): { x: number, y: number };

    getBooleanEvent(actionName: string): BooleanEvent;
    getScalarEvent(actionName: string): ScalarEvent;
    getScalar2DEvent(actionName: string): Scalar2DEvent

    getActionList():{ [id: string]: Input[] };
}
