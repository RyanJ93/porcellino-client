import Portfolio from '../entities/Portfolio';
import Storage from '../facades/Storage';
import Repository from './Repository';

class PortfolioRepository implements Repository {
    private static readonly COLLECTION_NAME: string = 'portfolios';

    public isCollectionAvailable(): boolean {
        return Storage.hasCollection(PortfolioRepository.COLLECTION_NAME);
    }

    public findById(id: number): Portfolio | undefined {
        return Storage.getCollection(PortfolioRepository.COLLECTION_NAME).get(id.toString());
    }

    public findAll(): Portfolio[] {
        return Storage.getCollection(PortfolioRepository.COLLECTION_NAME).list();
    }

    public storeMany(portfolioList: Portfolio[]): void {
        Storage.getCollection(PortfolioRepository.COLLECTION_NAME).storeList('id', portfolioList);
    }

    public store(portfolio: Portfolio): void {
        Storage.getCollection(PortfolioRepository.COLLECTION_NAME).store(portfolio.getId().toString(), portfolio);
    }

    public delete(portfolio: Portfolio): void {
        Storage.getCollection(PortfolioRepository.COLLECTION_NAME).delete(portfolio.getId().toString());
    }
}

export default PortfolioRepository;
