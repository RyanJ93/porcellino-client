import Entity from './Entity';

type CurrencyProperties = {
    symbol: string;
    code: string;
    name: string;
    id: number;
}

class Currency implements Entity {
    private readonly id: number;
    private readonly code: string;
    private readonly name: string;
    private readonly symbol: string;

    public constructor(properties: CurrencyProperties){
        this.symbol = properties.symbol;
        this.name = properties.name;
        this.code = properties.code;
        this.id = properties.id;
    }

    public getSymbol(): string {
        return this.symbol;
    }

    public getName(): string {
        return this.name;
    }

    public getCode(): string {
        return this.code;
    }

    public getId(): number {
        return this.id;
    }
}

export default Currency;
