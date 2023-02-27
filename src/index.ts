import {AxModule} from "axolotis-module-definition";
import {ContainerModule, interfaces} from "inversify";
import {InputServiceName} from "./Identifier";
import {InputService} from "./services/input/InputService";
export * from "./services/input/InputService";

export * from "./Identifier";

export class AxInputModule implements AxModule{
    getModule(): ContainerModule {
        return new ContainerModule((bind: interfaces.Bind) => {
            bind(InputServiceName).toDynamicValue(() => {
                return new InputService()
            }).inSingletonScope();

        });
    }

}
