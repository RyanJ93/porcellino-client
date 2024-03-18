class StorageNode {
    private entries: Map<string, any>;

    public constructor(){
        this.entries = new Map();
    }

    public storeList(keyPropertyName: string, list: any[]): void {
        list.forEach((entry: any) => {
            const key: string = entry[keyPropertyName]?.toString() ?? '';
            if ( key !== '' ){
                this.entries.set(key, entry);
            }
        });
    }

    public store(key: string, value: any): void {
        this.entries.set(key, value);
    }

    public get(key: string): any {
        return this.entries.get(key);
    }

    public delete(key: string): void {
        this.entries.delete(key);
    }

    public list(): any {
        return Array.from(this.entries.values());
    }
}

export default StorageNode;
