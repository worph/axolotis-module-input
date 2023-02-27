import {AxModuleAsync} from "axolotis-module-definition";
import {AsyncContainerModule, interfaces} from "inversify";
import {InputServiceName} from "./Identifier";
import {InputService} from "./services/input/InputService";

export * from "./Identifier";

export class AxInputModule implements AxModuleAsync{
    getModule(): AsyncContainerModule {
        return new AsyncContainerModule(async (bind: interfaces.Bind) => {
            bind(InputServiceName).toDynamicValue(async () => {
                return new InputService()
            }).inSingletonScope();

        });
    }

}
