import {cloneDeep} from "lodash";

/**
 *
 */
export class FilterEventEmitter {


    constructor(value, filter) {
        this.lastValue = value ?? {action: 'init_event_emitter', payload: this};
        /**
         *
         * @type {* []}
         */
        this.subscriptions = {};
        this.filter = filter ?? this._filter;
        this.filter = this.filter.bind(this);

    }

    next(value) {
        this.lastValue = value;
        this.emit();
    }

    _filter({filter, action, payload}) {
        if (!filter) {
            return false;
        }
        const filters = filter.split(',').map(e => e.trim());
        return filters.some((e) => {
            const regex = new RegExp(e);
            return regex.test(action) || action === e;
        })
    }

    emit() {
        const {action, payload} = this.lastValue;
        let filteredSubscription = [];
        for (let i in this.subscriptions) {
            if (this.filter({filter: i, action, payload})) {
                filteredSubscription = [...this.subscriptions[i], ...filteredSubscription];
            }
        }
        filteredSubscription.forEach(this.emitSubscriptor.bind(this))
    }

    emitSubscriptor(subscriptor) {

        subscriptor.getCallback()(cloneDeep(this.lastValue));
    }

    listen({event, callback, id, overwrite = false}) {
        this._initSubscriptionEvent(event, callback);
        let res = new Subscriptor({callback, id, eventEmitter: this});
        const exist = this.subscriptions[event].find(c => {
            return c.id === id
        });
        if (!exist) {
            this.subscriptions[event].push(res);
            if (this.filter({filter: event, action: this.lastValue.action, payload: this.lastValue.payload})) {
                this.emitSubscriptor(res);
            }
        } else {
            res = exist;
            res.setCallback(callback);
        }

        return res;
    }

    _initSubscriptionEvent(event) {
        if (!this.subscriptions[event]) {
            this.subscriptions[event] = [];
        }

    }

    remove(subscritor) {
        for (let i in this.subscriptions) {
            this.subscriptions[i] = this.subscriptions[i].filter(c => c !== subscritor);
        }
    }


}

export class Subscriptor {
    constructor({id, callback, eventEmitter}) {
        this.callback = callback;
        this.id = id;
        this.eventEmitter = eventEmitter;
    }

    unsubscribe() {
        this.eventEmitter.remove(this);
    }

    getCallback() {
        return this.callback;
    }
    setCallback(callback) {
        this.callback = callback;
    }
}