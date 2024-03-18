import EventBroker from '../suppport/EventBroker';
import Injector from './Injector';
import Facade from './Facade';

class Event extends Facade {
    public static getBroker(): EventBroker {
        return Injector.inject('EventBroker') as EventBroker;
    }
}

export default Event;
