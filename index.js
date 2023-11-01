const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

class Player {
    constructor(){
        this.position = {
            x: 0,
            y: 0,
       }
    }
    draw() {
        c.fillStyle = 'red'
        c.fillRect(200, this.position.y, 100, 100)         
    }
}

let y = 100
let y2 = 100
function animate(){
    window.requestAnimationFrame(animate)
    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height)

   
    y++

    c.fillStyle = 'red'
    c.fillRect(400, y2, 100, 100)
    y2++
}

animate()