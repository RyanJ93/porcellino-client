import IllegalArgumentException from '../exceptions/IllegalArgumentException';
import Injector from '../services/injectors/Injector';
import Injectable from './traits/Injectable';

interface InjectorRegister {
    [key: string]: Injector;
}

class InjectionManager {
    private static injectorRegister: InjectorRegister = Object.create(null);
    private static instance?: InjectionManager;

    static getInstance(): InjectionManager {
        if ( typeof InjectionManager === 'undefined' ){
            InjectionManager.instance = new InjectionManager();
        }
        return InjectionManager.instance!;
    }

    public register(name: string, injector: Injector): void {
        if ( name === '' ){
            throw new IllegalArgumentException('Invalid name.');
        }
        InjectionManager.injectorRegister[name] = injector;
    }

    public inject(name: string, parameters: any = []): Injectable | undefined {
        const injector = InjectionManager.injectorRegister[name] ?? null;
        return injector === null ? undefined : injector.inject(...parameters);
    }
}

export default InjectionManager;
