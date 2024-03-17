import StorageService from '../services/StorageService';
import StorageNode from '../suppport/StorageNode';
import Facade from './Facade';

class Storage extends Facade {
    private static storageServiceInstance: StorageService;

    public static getStorageService(): StorageService {
        if ( typeof this.storageServiceInstance === 'undefined' ){
            this.storageServiceInstance = new StorageService();
        }
        return this.storageServiceInstance;
    }

    public static hasCollection(collectionName: string): boolean {
        return Storage.getStorageService().hasStorageNode(collectionName);
    }

    public static getCollection(collectionName: string): StorageNode {
        return Storage.getStorageService().getStorageNode(collectionName);
    }
}

export default Storage;
