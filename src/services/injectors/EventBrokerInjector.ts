import EventBroker from '../../suppport/EventBroker';
import Injector from './Injector';

class EventBrokerInjector implements Injector {
    private eventBroker?: EventBroker;

    inject(){
        if ( typeof this.eventBroker === 'undefined' ){
            this.eventBroker = new EventBroker();
        }
        return this.eventBroker;
    }
}

export default EventBrokerInjector;
