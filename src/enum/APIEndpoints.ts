enum APIEndpoints {
    PORTFOLIO_DELETE = '/api/portfolio/{portfolioId}/delete',
    PORTFOLIO_EDIT = '/api/portfolio/{portfolioId}/edit',
    PORTFOLIO_CREATE = '/api/portfolio/create',
    AUTHENTICATION_RENEW = '/api/auth/renew',
    AUTHENTICATION_LOGIN = '/api/auth/login',
    PORTFOLIO_LIST = '/api/portfolio',
    USER_SIGNUP = '/api/user/signup',
    CURRENCY_LIST = '/api/currency',
    USER_INFO = '/api/user/info'
}

export default APIEndpoints;
