import Exception from '../exceptions/Exception';

interface ExceptionHTTPCodeMapping { [key: string]: typeof Exception }
interface ExceptionStatusMapping { [key: string]: typeof Exception }

class ExceptionMapper {
    private static instance?: ExceptionMapper = undefined;

    /**
     * Returns the class instance as a singleton.
     *
     * @returns {ExceptionMapper}
     */
    public static getInstance(): ExceptionMapper {
        if ( typeof ExceptionMapper.instance === 'undefined' ){
            ExceptionMapper.instance = new ExceptionMapper();
        }
        return ExceptionMapper.instance;
    }

    private exceptionHTTPCodeMapping: ExceptionHTTPCodeMapping = Object.create(null);
    private exceptionStatusMapping: ExceptionStatusMapping = Object.create(null);

    /**
     * Registers the exception that should be thrown whenever a request fails with the given code.
     *
     * @param {number} HTTPCode
     * @param {Exception.constructor} exception
     *
     * @returns {ExceptionMapper}
     */
    public registerExceptionByHTTPCode(HTTPCode: number, exception: typeof Exception): this {
        this.exceptionHTTPCodeMapping[HTTPCode] = exception;
        return this;
    }

    /**
     * Registers the exception that should be thrown whenever a request fails with the given status.
     *
     * @param {string} status
     * @param {Exception.constructor} exception
     *
     * @returns {ExceptionMapper}
     */
    registerExceptionByStatus(status: string, exception: typeof Exception): this {
        this.exceptionStatusMapping[status] = exception;
        return this;
    }

    /**
     * Returns the exception defined for the given HTTP status code.
     *
     * @param {number} HTTPCode
     *
     * @returns {?Exception.constructor}
     */
    public getExceptionByHTTPCode(HTTPCode: number): typeof Exception {
        return this.exceptionHTTPCodeMapping[HTTPCode] ?? null;
    }

    /**
     * Returns the exception defined for the given status.
     *
     * @param {string} status
     *
     * @returns {?Exception.constructor}
     */
    public getExceptionByStatus(status: string): typeof Exception {
        return this.exceptionStatusMapping[status] ?? null;
    }
}

export default ExceptionMapper;
