import SecurityContext from './SecurityContext';

class SecurityContextHolder {
    private static securityContext?: SecurityContext;

    public static getContext(): SecurityContext {
        if ( typeof SecurityContextHolder.securityContext === 'undefined' ){
            SecurityContextHolder.securityContext = new SecurityContext();
        }
        return SecurityContextHolder.securityContext;
    }
}

export default SecurityContextHolder;
