import i18n from 'i18next';

class Exception extends Error {
    private localizedMessage?: string;

    public constructor(message: string, exception?: Error){
        super(message);

        if ( exception instanceof Error && typeof this.stack !== 'undefined' ){
            const lines = ( this.message.match(/\n/g)||[] ).length + 1;
            this.stack = this.stack.split('\n').slice(0, lines + 1).join('\n') + '\n' + exception.stack;
        }
    }

    public extractHTTPResponseProperties(response: any){}

    public getDefaultLocalizedMessage(): string {
        return i18n.t('exception.message');
    }

    public setLocalizedMessage(localizedMessage: string): this {
        this.localizedMessage = localizedMessage;
        return this;
    }

    public getLocalizedMessage(): string {
        return this.localizedMessage ?? this.getDefaultLocalizedMessage();
    }
}

export default Exception;
