export default class EventBus {
    constructor() {
        this.listeners = {}
    }

    on(event, fn) {
        console.log(`DANS LE ON de EVENTBUS (Event : ${event})`);
        if (!this.listeners[event]) {
            this.listeners[event] = []
        }
        this.listeners[event].push(fn)
        console.log("this.listeners[event]", this.listeners[event]);
        
    }

    emit(event, data) {
        console.log("Event : ", event);
        
        const list = this.listeners[event]
        console.log("List : ", list);
        
        if (!list) return

        for (const fn of list) {
            console.log("fn : ", fn);
            fn(data)
        }
    }
}