import {AxModule} from "axolotis-module-definition";
import {ContainerModule, interfaces} from "inversify";
import {InputServiceName} from "./Identifier";
import {InputService} from "./services/input/InputService";
export * from "./services/input/InputService";

export * from "./Identifier";
export * from "./services/input/InputService";
export * from "./services/events/Compound";
export * from "./services/events/InputEvent";
export * from "./services/events/KeyboardKey";
export * from "./services/events/MouseButton";
export * from "./services/events/MouseWheel";
export * from "./services/events/MouseAxis";
export * from "./services/manager/CompoundManager";
export * from "./services/manager/KeyboardManager";
export * from "./services/manager/MouseManager";

export class AxInputModule implements AxModule{
    getModule(): ContainerModule {
        return new ContainerModule((bind: interfaces.Bind) => {
            bind(InputServiceName).toDynamicValue(() => {
                return new InputService()
            }).inSingletonScope();

        });
    }

}
