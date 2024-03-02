type SupportedLocaleProperties = {
    label: string,
    code: string,
    icon: string
};

class SupportedLocale {
    private readonly label: string;
    private readonly code: string;
    private readonly icon: string;

    public constructor(properties: SupportedLocaleProperties){
        this.label = properties.label;
        this.code = properties.code;
        this.icon = properties.icon;
    }

    public getLabel(): string {
        return this.label;
    }

    public getCode(): string {
        return this.code;
    }

    public getIcon(): string {
        return this.icon;
    }
}

export default SupportedLocale;
