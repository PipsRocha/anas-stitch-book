function whileOutside () {
    if (timer >= 0) {
        timer += -1
    } else {
        vibration += 1
    }
    checkPins()
}
function whileInside () {
    basic.showIcon(IconNames.Heart)
    basic.pause(300)
    basic.clearScreen()
    basic.pause(300)
}
function checkPins () {
    if (pins.digitalReadPin(DigitalPin.P0) == 1) {
        dfplayermini.press(dfplayermini.playType.Stop)
        Index = 1
    }
    dfplayermini.playFile(Index, dfplayermini.isRepeat.No)
}
function reset () {
    timer = randint(3, 60)
    vibration = 0
    music.setBuiltInSpeakerEnabled(true)
}
let Index = 0
let vibration = 0
let timer = 0
dfplayermini.connect(SerialPin.P2, SerialPin.P8)
dfplayermini.setVolume(25)
timer = 0
vibration = 0
let ifInside = 1
let closed = 1
Index = 0
basic.forever(function () {
    if (input.lightLevel() < 100 && ifInside == 1) {
        whileInside()
    } else if (input.lightLevel() < 100) {
        closed = 1
        ifInside = 1
        vibration = 0
        music.setBuiltInSpeakerEnabled(false)
        whileInside()
    } else if (input.lightLevel() >= 100 && ifInside == 1) {
        closed = 0
        ifInside = 0
        reset()
        whileOutside()
    } else if (input.lightLevel() >= 100) {
        whileOutside()
    }
})
