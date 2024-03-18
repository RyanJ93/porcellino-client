import EventBroker from '../suppport/EventBroker';
import Injector from '../facades/Injector';

abstract class Service {
    protected readonly eventBroker: EventBroker;

    constructor(){
        this.eventBroker = Injector.inject('EventBroker') as EventBroker;
    }
}

export default Service;
