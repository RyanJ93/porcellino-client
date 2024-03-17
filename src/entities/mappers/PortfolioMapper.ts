import APIResponseMapper from './APIResponseMapper';
import CurrencyMapper from './CurrencyMapper';
import Portfolio from '../Portfolio';

class PortfolioMapper implements APIResponseMapper {
    public makeListFromAPIResponse(responseData: any): Portfolio[] {
        return responseData.portfolioList.map((portfolioData: any): Portfolio => {
            return this.makeFromAPIResponse({ portfolio: portfolioData });
        });
    }

    public makeFromAPIResponse(responseData: any): Portfolio {
        const properties = Object.assign({ currency: null, createdAt: null, updatedAt: null }, responseData.portfolio);
        properties.currency = new CurrencyMapper().makeFromAPIResponse(responseData.portfolio.currency);
        properties.createdAt = new Date(responseData.portfolio.createdAt);
        properties.updatedAt = new Date(responseData.portfolio.updatedAt);
        return new Portfolio(properties);
    }
}

export default PortfolioMapper;
