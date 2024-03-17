import APIResponseMapper from './APIResponseMapper';
import Currency from '../Currency';

class CurrencyMapper implements APIResponseMapper {
    public makeListFromAPIResponse(responseData: any): Currency[] {
        return responseData.currencyList.map((currencyData: any): Currency => {
            return this.makeFromAPIResponse(currencyData);
        });
    }

    public makeFromAPIResponse(responseData: any): Currency {
        return new Currency(responseData);
    }
}

export default CurrencyMapper;
