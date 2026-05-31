export default class InputSystem {
    constructor(eventBus, canvas) {
        this.canvas = canvas
        this.eventBus = eventBus
        this.clickInWorldListeners = []
        
        canvas.addEventListener("click", (e) => {
            this.handleClickInCanvas(e)
        })
    }

    handleClickInCanvas(e) {
        this.eventBus.emit("clickInWorld", e)
        
        // console.log("Click dans le canvas !")
        
        // const rect = this.canvas.getBoundingClientRect()

        // const pos = {
        //     x: e.clientX - rect.left,
        //     y: e.clientY - rect.top
        // }

        // for (const fn of this.clickInWorldListeners) {
        //     fn(pos)
        // }
    }
}