
const SummonConfetti = (idAsString) => {

// ammount to add on each button press
    const confettiCount = 64;
    const sequinCount = 32;

// "physics" variables
    const gravityConfetti = 0.28;
    const gravitySequins = 0.45;
    const dragConfetti = 0.075;
    const dragSequins = 0.02;
    const terminalVelocity = 3;

    const button = document.getElementById(`button-${idAsString}`);

    // get button position relative to the top-left corner of the page
    const buttonRect = button.getBoundingClientRect();
    const buttonX = buttonRect.left + buttonRect.width / 2;
    const buttonY = buttonRect.top + buttonRect.height / 2;

// var disabled = false
    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    let cx = ctx.canvas.width / 2
    let cy = ctx.canvas.height / 2

    // add Confetto/Sequin objects to arrays to draw them
    let confetti = []
    let sequins = []

// colors, back side is darker for confetti flipping
    const colors = [
        { front : '#FACE8F', back: '#F7B759' }, // Orange
        { front : '#A99C56', back: '#94884B' }, // Green
        { front : '#EECFA0', back: '#A16840' },  // Brown
        { front : '#FCE9CA', back: '#EECFA0' },  // Biege
        { front : '#B6685E', back: '#571B09' }  // Red/Brown
        // { front : '#B87647', back: '#571B09' }  // Brown2
    ]

// helper function to pick a random number within a range
    const randomRange = (min, max) => Math.random() * (max - min) + min

// helper function to get initial velocities for confetti
// this weighted spread helps the confetti look more realistic
    const initConfettoVelocity = (xRange, yRange) => {
        const x = randomRange(xRange[0], xRange[1])
        const range = yRange[1] - yRange[0] + 1
        let y = yRange[1] - Math.abs(randomRange(0, range) + randomRange(0, range) - range)
        if (y >= yRange[1] - 1) {
            // Occasional confetto goes higher than the max
            y += (Math.random() < .25) ? randomRange(1, 3) : 0
        }
        return {x: x, y: -y}
    }

// Confetto Class
    function Confetto() {
        this.randomModifier = randomRange(0, 99)
        this.color = colors[Math.floor(randomRange(0, colors.length))]
        this.dimensions = {
            x: randomRange(5, 9),
            y: randomRange(8, 15),
        }
        this.position = {
            x: randomRange(buttonX - button.offsetWidth/4, buttonX + button.offsetWidth/4),
            y: randomRange(buttonY + button.offsetHeight/2 + 8 - 60, buttonY + (1.5 * button.offsetHeight) - 8 - 60),
        }
        this.rotation = randomRange(0, 2 * Math.PI)
        this.scale = {
            x: 1,
            y: 1,
        }
        this.velocity = initConfettoVelocity([-9, 9], [6, 11])
    }
    Confetto.prototype.update = function() {
        // apply forces to velocity
        this.velocity.x -= this.velocity.x * dragConfetti
        this.velocity.y = Math.min(this.velocity.y + gravityConfetti, terminalVelocity)
        this.velocity.x += Math.random() > 0.5 ? Math.random() : -Math.random()

        // set position
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        // spin confetto by scaling y and set the color, .09 just slows cosine frequency
        this.scale.y = Math.cos((this.position.y + this.randomModifier) * 0.09)
    }

// Sequin Class
    function Sequin() {
        this.color = colors[Math.floor(randomRange(0, colors.length))].back;
            this.radius = randomRange(1, 2);
            this.position = {
                x: randomRange(buttonX - button.offsetWidth/3, buttonX + button.offsetWidth/3),
                y: randomRange(buttonY + button.offsetHeight/2 + 8 - 60, buttonY + (1.5 * button.offsetHeight) - 8 - 60),
            };

            this.velocity = {
                x: randomRange(-6, 6),
                y: randomRange(-8, -12)
            }
    }
    Sequin.prototype.update = function() {
        // apply forces to velocity
        this.velocity.x -= this.velocity.x * dragSequins
        this.velocity.y = this.velocity.y + gravitySequins

        // set position
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }

// add elements to arrays to be drawn
    const initBurst = () => {
        for (let i = 0; i < confettiCount; i++) {
            confetti.push(new Confetto())
        }
        for (let i = 0; i < sequinCount; i++) {
            sequins.push(new Sequin())
        }
    }

    window.initBurst = initBurst;

    const render = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        confetti.forEach((confetto, index) => {
            let width = (confetto.dimensions.x * confetto.scale.x)
            let height = (confetto.dimensions.y * confetto.scale.y)

            // move canvas to position and rotate
            ctx.translate(confetto.position.x, confetto.position.y)
            ctx.rotate(confetto.rotation)

            // update confetto "physics" values
            confetto.update()

            // get front or back fill color
            ctx.fillStyle = confetto.scale.y > 0 ? confetto.color.front : confetto.color.back

            // draw confetto
            ctx.fillRect(-width / 2, -height / 2, width, height)

            // reset transform matrix
            ctx.setTransform(1, 0, 0, 1, 0, 0)

            // clear rectangle where button cuts off
            if (confetto.velocity.y < 0) {
                ctx.clearRect(canvas.width/2 - button.offsetWidth/2, canvas.height/2 + button.offsetHeight/2, button.offsetWidth, button.offsetHeight)
            }
        })

        sequins.forEach((sequin, index) => {
            // move canvas to position
            ctx.translate(sequin.position.x, sequin.position.y)

            // update sequin "physics" values
            sequin.update()

            // set the color
            ctx.fillStyle = sequin.color

            // draw sequin
            ctx.beginPath()
            ctx.arc(0, 0, sequin.radius, 0, 2 * Math.PI)
            ctx.fill()

            // reset transform matrix
            ctx.setTransform(1, 0, 0, 1, 0, 0)

            // clear rectangle where button cuts off
            if (sequin.velocity.y < 0) {
                ctx.clearRect(canvas.width/2 - button.offsetWidth/2, canvas.height/2 + button.offsetHeight/2, button.offsetWidth, button.offsetHeight)
            }
        })

        // remove confetti and sequins that fall off the screen
        // must be done in seperate loops to avoid noticeable flickering
        confetti.forEach((confetto, index) => {
            if (confetto.position.y >= canvas.height) confetti.splice(index, 1)
        })
        sequins.forEach((sequin, index) => {
            if (sequin.position.y >= canvas.height) sequins.splice(index, 1)
        })

        window.requestAnimationFrame(render)
    }

    window.initBurst()
    render()

}

export default SummonConfetti;