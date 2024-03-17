interface MessageBagPackedErrorCollection { [key: string]: string }
interface MessageBagErrorCollection { [key: string]: string[] }

class ErrorMessageBag {
    public static makeFromHTTPResponse(response: any): ErrorMessageBag {
        let errorMessageBag: any = null;
        if ( response?.errors !== null && typeof response?.errors === 'object' ){
            errorMessageBag = new ErrorMessageBag();
            for ( const fieldName in response.errors ){
                if ( Array.isArray(response.errors[fieldName]) ){
                    response.errors[fieldName].forEach((errorMessage: string) => {
                        errorMessageBag.add(fieldName, errorMessage);
                    });
                }
            }
        }
        return errorMessageBag;
    }

    private errors: MessageBagErrorCollection = {};

    /**
     * Adds an error for a given field in the message bag.
     *
     * @param {string} fieldName
     * @param {string} errorMessage
     */
    public add(fieldName: string, errorMessage: string): this {
        if ( !Array.isArray(this.errors[fieldName]) ){
            this.errors[fieldName] = [];
        }
        this.errors[fieldName].push(errorMessage);
        return this;
    }

    /**
     * Removes all the errors for a given field.
     *
     * @param {string} fieldName
     */
    public remove(fieldName: string): this {
        delete this.errors[fieldName];
        return this;
    }

    /**
     * Drops all the error messages.
     */
    public clear(): this {
        this.errors = {};
        return this;
    }

    /**
     * Returns all the error messages for a given field.
     *
     * @param {string} fieldName
     *
     * @returns {?string[]}
     */
    public get(fieldName: string): string[] | null {
        return this.errors[fieldName] ?? null;
    }

    /**
     * Returns all the error messages.
     *
     * @returns {Object<string, string[]>}
     */
    public getAll(): MessageBagErrorCollection {
        return this.errors;
    }

    public getPackedCollection(): MessageBagPackedErrorCollection {
        const messageBagPackedErrorCollection: MessageBagPackedErrorCollection = {};
        for ( const fieldName in this.errors ){
            messageBagPackedErrorCollection[fieldName] = this.errors[fieldName].join('\n');
        }
        return messageBagPackedErrorCollection;
    }

    /**
     * Returns a string representation of the message bag.
     *
     * @returns {string}
     *
     * @override
     */
    public toString(): string {
        let output = '';
        for ( const fieldName in this.errors ){
            output += fieldName + ':\n';
            output += this.errors[fieldName].map((error: string): string => {
                return '\t' + error;
            }).join('\n');
        }
        return output;
    }
}

export default ErrorMessageBag;
