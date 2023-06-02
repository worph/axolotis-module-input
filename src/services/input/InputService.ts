import {BooleanEvent, Input, Scalar2DEvent, ScalarEvent} from "../events/InputEvent";
import {CompoundManager} from "../manager/CompoundManager";
import {KeyboardManager} from "../manager/KeyboardManager";
import {MouseManager} from "../manager/MouseManager";
import {Notifier} from "../manager/Notifier";

export type RaiseType = "UP" | "DOWN" | "ANY";

export class InputService implements Notifier {
    public inputList: Record<string, Input[]> = {};

    private booleanCallbackList: Record<string,
        {
            type: RaiseType,
            callback: ((event: BooleanEvent) => void)
        }[]
    > = {};
    private scalarCallbackList: Record<string, ((event: ScalarEvent) => void)[]> = {};
    private scalar2DCallbackList: Record<string, ((event: Scalar2DEvent) => void)[]> = {};

    private booleanState: Record<string, BooleanEvent> = {};
    private scalarState: Record<string, ScalarEvent> = {};
    private scalar2DState: Record<string, Scalar2DEvent> = {};

    private compoundManager: CompoundManager;
    private keyboardManager: KeyboardManager;
    private mouseManager: MouseManager;

    constructor() {
        this.keyboardManager = new KeyboardManager(this);
        this.mouseManager = new MouseManager(this);
        this.compoundManager = new CompoundManager(this);
    }

    public initializeCaptureElement(el: HTMLElement = null) {
        if (!el) {
            el = window.document.body;
        }
        this.keyboardManager.setupListeners();
        this.mouseManager.setupListeners(el);
    }

    notifyScalar(id: string, event: ScalarEvent) {
        // We have found the action : find it in the callback list
        this.scalarState[id] = event;
        if (this.scalarCallbackList[id]) {
            for (const scalarCallback of this.scalarCallbackList[id]) {
                scalarCallback(event);
            }
        }
        this.compoundManager.notifyActionOn(id);
    }

    notify2DScalar(id: string, event: Scalar2DEvent) {
        // We have found the action : find it in the callback list
        this.scalar2DState[id] = event;
        if (this.scalarCallbackList[id]) {
            for (const scalarCallback of this.scalar2DCallbackList[id]) {
                scalarCallback(event);
            }
        }
    }

    notifyBoolean(id: string, event: BooleanEvent) {
        // We have found the action : find it in the callback list
        this.booleanState[id] = event;
        if (this.booleanCallbackList[id]) {
            for (const boolCallBack of this.booleanCallbackList[id]) {
                if(event.sourceEvt.type === "keyup" && boolCallBack.type==="UP"){
                    boolCallBack.callback(event);
                }else if(event.sourceEvt.type === "keydown" && boolCallBack.type==="DOWN"){
                    boolCallBack.callback(event);
                }else if(boolCallBack.type==="ANY"){
                    boolCallBack.callback(event);
                }
            }
        }
    }

    public register(actionName: string, inputObject: Input) {
        if (!this.inputList[actionName]) {
            this.inputList[actionName] = []
        }
        this.inputList[actionName].push(inputObject);
    }

    public setBooleanValue(actionName: string, state: boolean) {
        this.booleanState[actionName].state;
        this.notifyBoolean(actionName, {
            state,
            actionName,
            sourceEvt: null,
        })
    }

    public getBooleanValue(actionName: string): boolean {
        if (this.booleanState[actionName]) {
            return this.booleanState[actionName].state;
        } else {
            return false;
        }
    }

    public getScalarValue(actionName: string): number {
        if (this.scalarState[actionName]) {
            return this.scalarState[actionName].state;
        } else {
            return 0;
        }
    }

    public getScalar2DValue(actionName: string): { x: number, y: number } {
        if (this.scalar2DState[actionName]) {
            return this.scalar2DState[actionName].state;
        } else {
            return {x: 0, y: 0};
        }
    }

    public getBooleanEvent(actionName: string): BooleanEvent {
        return this.booleanState[actionName];
    }

    public getScalarEvent(actionName: string): ScalarEvent {
        return this.scalarState[actionName];
    }

    public getScalar2DEvent(actionName: string): Scalar2DEvent {
        return this.scalar2DState[actionName];
    }

    public register2DScalarEvent(actionName: string, callback: (event: Scalar2DEvent) => void) {
        return this.registerGeneric<Scalar2DEvent>(this.scalar2DCallbackList, actionName, callback);
    }

    public registerScalarEvent(actionName: string, callback: (event: ScalarEvent) => void) {
        return this.registerGeneric<ScalarEvent>(this.scalarCallbackList, actionName, callback);
    }

    public registerBooleanEvent(actionName: string, callback: (event: BooleanEvent) => void, type: RaiseType = "ANY"): () => void {
        let list = this.booleanCallbackList;
        let data = {callback, type};
        // Check the action name callback is already registered
        if (!list[actionName]) {
            list[actionName] = [];
        }
        list[actionName].push(data);
        return () => {
            list[actionName].filter(value => {
                return value != data;
            })
        }
    }

    private registerGeneric<T>(list: {
        [id: string]: ((event: T) => void)[]
    }, actionName: string, callback: (event: T) => void): () => void {
        // Check the action name callback is already registered
        if (!list[actionName]) {
            list[actionName] = [];
        }
        list[actionName].push(callback);
        return () => {
            list[actionName].filter(value => {
                return value != callback;
            })
        }
    }

    getActionList(): { [key: string]: Input[] } {
        return this.inputList;
    }

}
