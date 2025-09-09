function whileOutside () {
    if (timer > 0) {
        timer += -1
    } else if (timer <= 0) {
    	
    }
    checkPins()
}
function whileInside () {
    basic.showLeds(`
        # # . # #
        # # . # #
        # # . # #
        # # . # #
        # # . # #
        `)
    basic.pause(500)
    basic.clearScreen()
    basic.pause(500)
}
function checkPins () {
    if (pins.digitalReadPin(DigitalPin.P15) == 1) {
        dfplayermini.press(dfplayermini.playType.Play)
    }
    if (pins.digitalReadPin(DigitalPin.P15) == 0) {
        dfplayermini.press(dfplayermini.playType.Pause)
    }
}
function reset () {
    timer = randint(3, 60)
    music.setBuiltInSpeakerEnabled(true)
    pins.digitalWritePin(DigitalPin.P9, 1)
    pins.digitalWritePin(DigitalPin.P13, 1)
}
let timer = 0
let Index = 0
let vibration = 0
dfplayermini.connect(SerialPin.P8, SerialPin.P14)
dfplayermini.setVolume(10)
timer = 0
let ifInside = 1
basic.forever(function () {
    if (input.lightLevel() < 70 && ifInside == 1) {
        whileInside()
    } else if (input.lightLevel() < 70) {
        ifInside = 1
        music.setBuiltInSpeakerEnabled(false)
        pins.digitalWritePin(DigitalPin.P9, 0)
        pins.digitalWritePin(DigitalPin.P13, 0)
        whileInside()
    } else if (input.lightLevel() >= 70 && ifInside == 1) {
        ifInside = 0
        reset()
        whileOutside()
    } else if (input.lightLevel() >= 70) {
        whileOutside()
    }
})
