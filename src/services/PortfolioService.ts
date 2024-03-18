import PortfolioRepository from '../repositories/PortfolioRepository';
import PortfolioMapper from '../entities/mappers/PortfolioMapper';
import RuntimeException from '../exceptions/RuntimeException';
import APIEndpoints from '../enum/APIEndpoints';
import Portfolio from '../entities/Portfolio';
import Injector from '../facades/Injector';
import Request from '../facades/Request';
import Service from './Service';

class PortfolioService extends Service {
    private readonly portfolioRepository: PortfolioRepository;
    private portfolio?: Portfolio;

    public constructor(portfolio: Portfolio | undefined = undefined){
        super();

        this.portfolioRepository = Injector.inject('PortfolioRepository') as PortfolioRepository;
        this.setPortfolio(portfolio);
    }

    public setPortfolio(portfolio?: Portfolio): void {
        this.portfolio = portfolio;
    }

    public getPortfolio(): Portfolio | undefined {
        return this.portfolio;
    }

    public getById(id: number): Portfolio | undefined {
        return this.portfolio = this.portfolioRepository.findById(id);
    }

    public async getList(): Promise<Portfolio[]> {
        const response = await Request.get(APIEndpoints.PORTFOLIO_LIST);
        return new PortfolioMapper().makeListFromAPIResponse(response);
    }

    public async fetchList(refresh: boolean = false): Promise<Portfolio[]> {
        if ( !refresh && this.portfolioRepository.isCollectionAvailable() ){
            return this.portfolioRepository.findAll();
        }
        const portfolioList: Portfolio[] = await this.getList();
        this.portfolioRepository.storeMany(portfolioList);
        return portfolioList;
    }

    public async create(name: string, currencyId: number): Promise<Portfolio> {
        const response = await Request.post(APIEndpoints.PORTFOLIO_CREATE, { currencyId: currencyId, name: name });
        const portfolio: Portfolio = new PortfolioMapper().makeFromAPIResponse(response);
        this.portfolioRepository.store(portfolio);
        this.eventBroker.emit('portfolioCreate', portfolio);
        return this.portfolio = portfolio;
    }

    public async update(name: string): Promise<Portfolio> {
        if ( typeof this.portfolio === 'undefined' ){
            throw new RuntimeException('No portfolio defined.');
        }
        const url: string = APIEndpoints.PORTFOLIO_EDIT.replace('{portfolioId}', this.portfolio.getId().toString());
        const response = await Request.patch(url, { name: name });
        const portfolio: Portfolio = new PortfolioMapper().makeFromAPIResponse(response);
        this.portfolioRepository.store(portfolio);
        this.eventBroker.emit('portfolioUpdate', portfolio);
        return this.portfolio = portfolio;
    }

    public async delete(): Promise<void> {
        if ( typeof this.portfolio === 'undefined' ){
            throw new RuntimeException('No portfolio defined.');
        }
        await Request.delete(APIEndpoints.PORTFOLIO_DELETE.replace('{portfolioId}', this.portfolio.getId().toString()));
        this.portfolioRepository.delete(this.portfolio);
        this.eventBroker.emit('portfolioDelete', this.portfolio.getId());
        this.portfolio = undefined;
    }
}

export default PortfolioService;
