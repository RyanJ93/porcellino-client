import StorageNode from '../suppport/StorageNode';

class StorageService {
    private storageNodeMap: Map<string, StorageNode>;

    public constructor(){
        this.storageNodeMap = new Map();
    }

    public hasStorageNode(collectionName: string): boolean {
        return this.storageNodeMap.has(collectionName);
    }

    public getStorageNode(collectionName: string): StorageNode {
        if ( !this.storageNodeMap.has(collectionName) ){
            this.storageNodeMap.set(collectionName, new StorageNode());
        }
        return this.storageNodeMap.get(collectionName)!;
    }
}

export default StorageService;
