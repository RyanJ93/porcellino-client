import PortfolioMapper from '../entities/mappers/PortfolioMapper';
import RuntimeException from '../exceptions/RuntimeException';
import APIEndpoints from '../enum/APIEndpoints';
import Portfolio from '../entities/Portfolio';
import Request from '../facades/Request';
import Storage from '../facades/Storage';
import Service from './Service';

class PortfolioService extends Service {
    private portfolio?: Portfolio;

    public constructor(portfolio: Portfolio | undefined = undefined){
        super();

        this.setPortfolio(portfolio);
    }

    public setPortfolio(portfolio?: Portfolio): void {
        this.portfolio = portfolio;
    }

    public getPortfolio(): Portfolio | undefined {
        return this.portfolio;
    }

    public getById(id: number): Portfolio | undefined {
        return this.portfolio = Storage.getCollection('portfolios').get(id.toString());
    }

    public async getList(): Promise<Portfolio[]> {
        const response = await Request.get(APIEndpoints.PORTFOLIO_LIST);
        return new PortfolioMapper().makeListFromAPIResponse(response);
    }

    public async fetchList(refresh: boolean = false): Promise<Portfolio[]> {
        if ( !refresh && Storage.hasCollection('portfolios') ){
            return Storage.getCollection('portfolios').list();
        }
        const portfolioList: Portfolio[] = await this.getList();
        Storage.getCollection('portfolios').storeList('id', portfolioList);
        return portfolioList;
    }

    public async create(name: string, currencyId: number): Promise<Portfolio> {
        const response = await Request.post(APIEndpoints.PORTFOLIO_CREATE, { currencyId: currencyId, name: name });
        const portfolio: Portfolio = new PortfolioMapper().makeFromAPIResponse(response);
        Storage.getCollection('portfolios').store(portfolio.getId().toString(), portfolio);
        this.eventBroker.emit('portfolioCreate', portfolio);
        return this.portfolio = portfolio;
    }

    public async update(name: string): Promise<Portfolio> {
        if ( typeof this.portfolio === 'undefined' ){
            throw new RuntimeException('No portfolio defined.');
        }
        const portfolioId: string = this.portfolio.getId().toString();
        const url: string = APIEndpoints.PORTFOLIO_EDIT.replace('{portfolioId}', portfolioId);
        const response = await Request.patch(url, { name: name });
        const portfolio: Portfolio = new PortfolioMapper().makeFromAPIResponse(response);
        Storage.getCollection('portfolios').store(portfolioId, portfolio);
        this.eventBroker.emit('portfolioUpdate', portfolio);
        return this.portfolio = portfolio;
    }

    public async delete(): Promise<void> {
        if ( typeof this.portfolio === 'undefined' ){
            throw new RuntimeException('No portfolio defined.');
        }
        await Request.delete(APIEndpoints.PORTFOLIO_DELETE.replace('{portfolioId}', this.portfolio.getId().toString()));
        Storage.getCollection('portfolios').delete(this.portfolio.getId().toString());
        this.eventBroker.emit('portfolioDelete', this.portfolio.getId());
        this.portfolio = undefined;
    }
}

export default PortfolioService;
