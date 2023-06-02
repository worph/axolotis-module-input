export type InputType = "keyboard" | "compound_1d" | "compound_2d" | "mouse_click" | "mouse_wheel" | "mouse_axis";

export interface Input {
    getType(): InputType;
}

export interface BooleanEvent {
    actionName: string,
    state: boolean,
    sourceEvt: any
}

export interface ScalarEvent {
    actionName: string,
    state: number,
    sourceEvt: any
}

export interface Scalar2DEvent {
    actionName: string,
    state: { x: number, y: number },
    sourceEvt: any
}
