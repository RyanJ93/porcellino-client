import Provider from '../providers/Provider';

class ProviderManager {
    private static instance?: ProviderManager = undefined;
    private static providerRegister: Provider[] = [];

    public static getInstance(): ProviderManager {
        if ( typeof ProviderManager.instance === 'undefined' ){
            ProviderManager.instance = new ProviderManager();
        }
        return ProviderManager.instance;
    }

    public register(provider: Provider): this {
        ProviderManager.providerRegister.push(provider);
        return this;
    }

    async runProviders(): Promise<void> {
        for ( let i = 0 ; i < ProviderManager.providerRegister.length ; i++ ){
            await ProviderManager.providerRegister[i].run();
        }
    }
}

export default ProviderManager;
