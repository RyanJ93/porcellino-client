'use strict';

import ServiceNotAvailableException from '../exceptions/ServiceNotAvailableException';
import EMailAddressTakenException from '../exceptions/EMailAddressTakenException';
import UnauthorizedException from '../exceptions/UnauthorizedException';
import InvalidInputException from '../exceptions/InvalidInputException';
import NotFoundException from '../exceptions/NotFoundException';
import ExceptionMapper from '../suppport/ExceptionMapper';
import ErrorCode from '../enum/ErrorCode';
import Provider from './Provider';

class ExceptionMappingProvider implements Provider {
    public async run(): Promise<void> {
        const exceptionMapper = ExceptionMapper.getInstance();
        exceptionMapper.registerExceptionByStatus(ErrorCode.ERR_EMAIL_ADDRESS_TAKEN, EMailAddressTakenException);
        exceptionMapper.registerExceptionByStatus(ErrorCode.ERR_UNAUTHORIZED, UnauthorizedException);
        exceptionMapper.registerExceptionByStatus(ErrorCode.ERR_INVALID_FORM, InvalidInputException);
        exceptionMapper.registerExceptionByStatus(ErrorCode.ERR_NOT_FOUND, NotFoundException);
        exceptionMapper.registerExceptionByHTTPCode(502, ServiceNotAvailableException);
    }
}

export default ExceptionMappingProvider;
