import Entity from './Entity';

type UserProperties = {
    email: string,
    id: number
};

class User implements Entity {
    private email: string;
    private id: number;

    public constructor(properties: UserProperties){
        this.email = properties.email;
        this.id = properties.id;
    }

    public setEmail(email: string): this {
        this.email = email;
        return this;
    }

    public getEmail(): string {
        return this.email;
    }

    public setId(id: number): this {
        this.id = id;
        return this;
    }

    public getId(): number {
        return this.id;
    }
}

export default User;
