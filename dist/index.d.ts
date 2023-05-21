import { AxModule } from 'axolotis-module-definition';
import { ContainerModule } from 'inversify';

type InputType = "keyboard" | "compound_1d" | "compound_2d" | "mouse_click" | "mouse_wheel" | "mouse_axis";
interface Input {
    getType(): InputType;
}
declare class KeyboardKey implements Input {
    keyCode: string;
    type: "keyup" | "keydown" | "any";
    constructor(keyCode: string, type?: "keyup" | "keydown" | "any");
    getType(): InputType;
}
declare class MouseButton implements Input {
    btn: "Mouse-0" | "Mouse-1" | "Mouse-2" | "Mouse-3" | "Mouse-4";
    type: "mousedown" | "mouseup" | "any";
    constructor(btn?: "Mouse-0" | "Mouse-1" | "Mouse-2" | "Mouse-3" | "Mouse-4", type?: "mousedown" | "mouseup" | "any");
    getType(): InputType;
}
declare class MouseWheel implements Input {
    type: "up" | "down" | "any";
    constructor(type?: "up" | "down" | "any");
    getType(): InputType;
}
declare class MouseAxis implements Input {
    type: "x" | "y";
    constructor(type?: "x" | "y");
    getType(): InputType;
}
declare class Compound1DInput implements Input {
    eventXPositive: string;
    eventXNegative: string;
    constructor(eventXPositive: string, eventXNegative: string);
    getType(): InputType;
}
declare class Compound2DInput implements Input {
    eventX: string;
    eventY: string;
    constructor(eventX: string, eventY: string);
    getType(): InputType;
}
interface BooleanEvent {
    actionName: string;
    state: boolean;
    sourceEvt: any;
}
interface ScalarEvent {
    actionName: string;
    state: number;
    sourceEvt: any;
}
interface Scalar2DEvent {
    actionName: string;
    state: {
        x: number;
        y: number;
    };
    sourceEvt: any;
}
declare class InputService {
    inputList: {
        [id: string]: Input[];
    };
    private booleanCallbackList;
    private scalarCallbackList;
    private scalar2DCallbackList;
    private booleanState;
    private scalarState;
    private scalar2DState;
    private compoundManager;
    private keyboardManager;
    private mouseManager;
    constructor();
    initializeCaptureElement(el?: HTMLElement): void;
    notifyScalar(id: string, event: ScalarEvent): void;
    notify2DScalar(id: string, event: Scalar2DEvent): void;
    notifyBoolean(id: string, event: BooleanEvent): void;
    register(actionName: string, inputObject: Input): void;
    setBooleanValue(actionName: string, state: boolean): void;
    getBooleanValue(actionName: string): boolean;
    getScalarValue(actionName: string): number;
    getScalar2DValue(actionName: string): {
        x: number;
        y: number;
    };
    getBooleanEvent(actionName: string): BooleanEvent;
    getScalarEvent(actionName: string): ScalarEvent;
    getScalar2DEvent(actionName: string): Scalar2DEvent;
    register2DScalarEvent(actionName: string, callback: (event: Scalar2DEvent) => void): () => void;
    registerScalarEvent(actionName: string, callback: (event: ScalarEvent) => void): () => void;
    registerBooleanEvent(actionName: string, callback: (event: BooleanEvent) => void): () => void;
    private registerGeneric;
}

declare const InputServiceName: unique symbol;

declare class AxInputModule implements AxModule {
    getModule(): ContainerModule;
}

export { AxInputModule, BooleanEvent, Compound1DInput, Compound2DInput, Input, InputService, InputServiceName, InputType, KeyboardKey, MouseAxis, MouseButton, MouseWheel, Scalar2DEvent, ScalarEvent };
