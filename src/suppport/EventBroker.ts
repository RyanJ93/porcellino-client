import IllegalArgumentException from '../exceptions/IllegalArgumentException';
import Injectable from './traits/Injectable';

type EventHandler = (...args: any) => Promise<void> | void;

type EventHandlerProperties = {
    once: boolean;
};

interface EventListenerCollection {
    [key: string]: Map<EventHandler, EventHandlerProperties>;
}

class EventBroker implements Injectable {
    private listeners: EventListenerCollection = Object.create(null);

    public on(eventName: string, handler: EventHandler, once: boolean = false): void {
        if ( typeof handler !== 'function' ){
            throw new IllegalArgumentException('Invalid handler function.');
        }
        if ( eventName === '' ){
            throw new IllegalArgumentException('Invalid event name.');
        }
        if ( !( this.listeners[eventName] instanceof Map ) ){
            this.listeners[eventName] = new Map();
        }
        this.listeners[eventName].set(handler, { once: once });
    }

    public off(eventName: string, handler: EventHandler): void {
        if ( typeof handler !== 'function' ){
            throw new IllegalArgumentException('Invalid handler function.');
        }
        if ( eventName === '' ){
            throw new IllegalArgumentException('Invalid event name.');
        }
        if ( this.listeners[eventName] instanceof Map ){
            this.listeners[eventName].delete(handler);
        }
    }

    public once(eventName: string, handler: EventHandler): void {
        return this.on(eventName, handler, true);
    }

    public emit(eventName: string, ...args: any): void {
        if ( eventName === '' ){
            throw new IllegalArgumentException('Invalid event name.');
        }
        if ( this.listeners[eventName] instanceof Map ){
            for ( const [handler, props] of this.listeners[eventName] ){
                handler(...args);
                if ( props.once ){
                    this.off(eventName, handler);
                }
            }
        }
    }
}

export default EventBroker;
