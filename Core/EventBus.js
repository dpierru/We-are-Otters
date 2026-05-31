export default class EventBus {
    constructor() {
        this.listeners = {}
    }

    on(event, fn) {
        // console.log(`DANS LE ON de EVENTBUS (Event : ${event})`);
        if (!this.listeners[event]) {
            this.listeners[event] = []
        }
        this.listeners[event].push(fn)
        // console.log("this.listeners[event]", this.listeners[event]);
        
    }

    emit(event, data) {
        console.log("Event : ", event, data);

        // On passe par une liste intermédiaire au cas un un évènement 
        // casse la liste des listeners. 
        const list = this.listeners[event]
        if (!list) return

        for (const fn of list) {
            fn(data)
        }
    }
}