import CurrencyMapper from '../entities/mappers/CurrencyMapper';
import APIEndpoints from '../enum/APIEndpoints';
import Currency from '../entities/Currency';
import Storage from '../facades/Storage';
import Request from '../facades/Request';

class CurrencyService {
    public async getList(): Promise<Currency[]> {
        const response = await Request.get(APIEndpoints.CURRENCY_LIST);
        return new CurrencyMapper().makeListFromAPIResponse(response);
    }

    public async fetchList(refresh: boolean = false): Promise<Currency[]> {
        if ( !refresh && Storage.hasCollection('currencies') ){
            return Storage.getCollection('currencies').list();
        }
        const currencyList: Currency[] = await this.getList();
        Storage.getCollection('currencies').storeList('id', currencyList);
        return currencyList;
    }
}

export default CurrencyService;
