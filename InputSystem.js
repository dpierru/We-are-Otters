export default class InputSystem {
    constructor(canvas) {
        this.canvas = canvas
        this.clickInWorldListeners = []
        
        canvas.addEventListener("click", (e) => {
            this.handleClick(e)
        })
    }

    handleClick(e) {
        console.log("Click dans le canvas !")
        
        const rect = this.canvas.getBoundingClientRect()

        const pos = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        }

        for (const fn of this.clickInWorldListeners) {
            fn(pos)
        }
    }

    onClickInWorld(fn) {
        this.clickInWorldListeners.push(fn)
    }
}