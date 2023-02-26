import {AxModuleAsync} from "axolotis-module-definition";
import {AsyncContainerModule, interfaces} from "inversify";
import {InputServiceID} from "./Identifier";
import {InputService} from "./services/input/InputService";

export * from "./Identifier";

export class AxBasicModule implements AxModuleAsync{
    getModule(): AsyncContainerModule {
        return new AsyncContainerModule(async (bind: interfaces.Bind) => {
            bind(InputServiceID).toDynamicValue(async () => {
                return new InputService()
            }).inSingletonScope();

        });
    }

}
