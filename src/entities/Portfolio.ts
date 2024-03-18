import Currency from './Currency';
import Entity from './Entity';

type PortfolioProperties = {
    currency: Currency;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    id: number;
};

class Portfolio implements Entity {
    private currency: Currency;
    private createdAt: Date;
    private updatedAt: Date;
    private name: string;
    private id: number;

    public constructor(properties: PortfolioProperties){
        this.createdAt = properties.createdAt;
        this.updatedAt = properties.updatedAt;
        this.currency = properties.currency;
        this.name = properties.name;
        this.id = properties.id;
    }

    public setCreatedAt(createdAt: Date): void {
        this.createdAt = createdAt;
    }

    public getCreatedAt(): Date {
        return this.createdAt;
    }

    public setUpdatedAt(updatedAt: Date): void {
        this.updatedAt = updatedAt;
    }

    public getUpdatedAt(): Date {
        return this.updatedAt;
    }

    public setCurrency(currency: Currency): void {
        this.currency = currency;
    }

    public getCurrency(): Currency {
        return this.currency;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getName(): string {
        return this.name;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getId(): number {
        return this.id;
    }
}

export default Portfolio;
