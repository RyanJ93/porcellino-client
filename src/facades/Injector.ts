import InjectionManager from '../suppport/InjectionManager';
import Injectable from '../suppport/traits/Injectable';
import Facade from './Facade';

class Injector extends Facade {
    public static inject(name: string, parameters: any = []): Injectable | undefined {
        return InjectionManager.getInstance().inject(name, parameters);
    }
}

export default Injector;
