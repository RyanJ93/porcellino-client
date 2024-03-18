import PortfolioRepositoryInjector from '../services/injectors/PortfolioRepositoryInjector';
import InjectionManager from '../suppport/InjectionManager';
import Provider from './Provider';

class RepositoryProvider implements Provider {
    public async run(): Promise<void> {
        InjectionManager.getInstance().register('PortfolioRepository', new PortfolioRepositoryInjector());
    }
}

export default RepositoryProvider;
