import Entity from '../Entity';

interface APIResponseMapper {
    makeListFromAPIResponse(responseData: any): Entity[];
    makeFromAPIResponse(responseData: any): Entity;
}

export default APIResponseMapper;
