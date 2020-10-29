class Timer {
    constructor(duration, startButton, pauseButton, cbs) {
        this.duration = duration
        this.startButton = startButton
        this.pauseButton = pauseButton 
        if (cbs) {
            this.onStart = cbs.onStart
            this.onTick = cbs.onTick
            this.onComplete = cbs.onComplete
        }

        this.startButton.addEventListener('click', this.start)
        this.pauseButton.addEventListener('click', this.pause)
    }
    start = () => {
        if (this.onStart) {
            this.onStart(this.timeRemaining)
        }
        this.tick()
        this.interval = setInterval(this.tick, 20)
    }
    pause = () => {
        clearInterval(this.interval)
    }
    onDurationChange() {

    }
    tick = () => {
        
        if (this.timeRemaining <= 0) {
            this.pause()
            if (this.onComplete) {
                this.onComplete()
            }  
        } else {
            if (this.onTick) {
                this.onTick(this.timeRemaining)
            }
            this.timeRemaining = this.timeRemaining - 0.02
        }
    }
    get timeRemaining() {
        return parseFloat(this.duration.value)
    }
    set timeRemaining(time) {
        this.duration.value = time.toFixed(2)
    }
}