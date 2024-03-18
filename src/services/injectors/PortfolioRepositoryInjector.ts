import PortfolioRepository from '../../repositories/PortfolioRepository';
import Injector from './Injector';

class PortfolioRepositoryInjector implements Injector {
    public inject(): PortfolioRepository {
        return new PortfolioRepository();
    }
}

export default PortfolioRepositoryInjector;
