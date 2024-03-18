import EventBrokerInjector from '../services/injectors/EventBrokerInjector';
import InjectionManager from '../suppport/InjectionManager';
import Provider from './Provider';

class EventProvider implements Provider {
    async run(): Promise<void> {
        InjectionManager.getInstance().register('EventBroker', new EventBrokerInjector());
    }
}

export default EventProvider;
