import {AxModule} from "axolotis-module-definition";
import {ContainerModule, interfaces} from "inversify";
import {InputServiceID} from "./Identifier";
import {InputService} from "./services/input/InputService";

export * from "./Identifier";

export class AxBasicModule implements AxModule{
    getModule(): ContainerModule {
        console.log("AxBasicModule installed 2");
        return new ContainerModule((bind: interfaces.Bind) => {
            bind(InputService.name).toDynamicValue(() => {
                return new InputService()
            }).inSingletonScope();
            bind(InputServiceID).toDynamicValue(() => {
                return new InputService()
            }).inSingletonScope();

        });
    }

}
