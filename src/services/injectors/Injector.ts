import Injectable from '../../suppport/traits/Injectable';

interface Injector {
    inject(...args: any): Injectable;
}

export default Injector;
