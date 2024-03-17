import RemoteServiceException from '../exceptions/RemoteServiceException';
import SecurityContextHolder from '../suppport/SecurityContextHolder';
import ExceptionMapper from '../suppport/ExceptionMapper';
import Exception from '../exceptions/Exception';
import Facade from './Facade';

class Request implements Facade {
    private static processResponse(request: XMLHttpRequest){
        const exceptionMapper = ExceptionMapper.getInstance();
        let exception = null;
        if ( typeof request.response?.status !== 'string' && request.status > 200 ){
            const exceptionMessage = 'Remote service responded with an error: ' + request.status;
            const exceptionClass = exceptionMapper.getExceptionByHTTPCode(request.status);
            if ( exceptionClass !== null ){
                exception = new exceptionClass(exceptionMessage);
            }
        }else if ( request.response?.status !== 'SUCCESS' ){
            let exceptionClass = exceptionMapper.getExceptionByStatus(request.response?.status);
            if ( exceptionClass === null ){
                exceptionClass = RemoteServiceException;
            }
            const exceptionMessage = 'Remote service returned error: ' + request.response?.status;
            exception = new exceptionClass(exceptionMessage);
            if ( exception instanceof Exception ){
                exception.extractHTTPResponseProperties(request.response);
            }
        }
        return exception;
    }

    private static addAuthenticationHeader(request: XMLHttpRequest): void {
        const accessToken = SecurityContextHolder.getContext().getAuthenticationContract()?.getToken();
        //const accessToken = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0QHRlc3QuaXQiLCJleHAiOjE3MTA1Njc4NzQsImlhdCI6MTcxMDU2NTI4Mn0.deNU1Kz_MJTVVZy7-Ub19xqT0T9x7oz--zY8cGAxFCmbzokHXWsNCxqbGK3G9AtW6O723ekI9_HREU5VJa_tWg';
        if ( typeof accessToken === 'string' ){
            request.setRequestHeader('Authorization', 'Bearer ' + accessToken);
        }
    }

    private static appendValue(formData: FormData, fieldName: string, value: any){
        if ( value instanceof File || value instanceof Blob ){
            formData.append(fieldName, value);
        }if ( typeof value === 'object' ){
            formData.append(fieldName, JSON.stringify(value));
        }else{
            formData.append(fieldName, value);
        }
    }

    private static preparePOSTFields(data: any): FormData {
        const formData = new FormData();
        for ( const fieldName in data ){
            if ( typeof data[fieldName] !== 'undefined' && data[fieldName] !== null ){
                if ( Array.isArray(data[fieldName]) ){
                    data[fieldName].forEach((entry: any) => {
                        Request.appendValue(formData, fieldName + '[]', entry);
                    });
                }else{
                    Request.appendValue(formData, fieldName, data[fieldName]);
                }
            }
        }
        return formData;
    }

    private static buildRequestURL(url: string, query: any){
        if ( query !== null && typeof query === 'object' ){
            const queryParameters = [];
            for ( const fieldName in query ){
                if ( query[fieldName] !== null && typeof query[fieldName] !== 'undefined' ){
                    const value = encodeURIComponent(query[fieldName]);
                    const name = encodeURIComponent(fieldName);
                    queryParameters.push(name + '=' + value);
                }
            }
            url += ( url.indexOf('?') > 0 ? '&' : '?' ) + queryParameters.join('&');
        }
        return url;
    }

    private static makeRequest(method: string, url: string, query: any, data: any, authenticated: boolean): Promise<any> {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open(method, Request.buildRequestURL(url, query), true);
            let formData = null;
            if ( authenticated ){
                Request.addAuthenticationHeader(request);
            }
            if ( data !== null && typeof data === 'object' ){
                formData = Request.preparePOSTFields(data);
            }
            request.responseType = 'json';
            request.onreadystatechange = () => {
                if ( request.readyState === XMLHttpRequest.DONE ){
                    const exception = Request.processResponse(request);
                    if ( exception !== null ){
                        return reject(exception);
                    }
                    resolve(request.response);
                }
            };
            request.send(formData);
        });
    }

    public static async get(url: string, query: any = null, authenticated: boolean = true): Promise<any> {
        return await Request.makeRequest('GET', url, query, null, authenticated);
    }

    public static async post(url: string, data: any = null, authenticated: boolean = true): Promise<any> {
        return await Request.makeRequest('POST', url, null, data, authenticated);
    }

    public static async patch(url: string, data: any = null, authenticated: boolean = true): Promise<any> {
        return await Request.makeRequest('PATCH', url, null, data, authenticated);
    }

    public static async delete(url: string, query: any = null, authenticated: boolean = true): Promise<any> {
        return await Request.makeRequest('DELETE', url, query, null, authenticated);
    }
}

export default Request;
