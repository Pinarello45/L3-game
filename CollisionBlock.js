class CollisionBlock {
    constructor({ position, height = 16 }) {
      this.position = position
      this.width = 16
      this.height = height
    }
   //collision block class
    draw() {
      c.fillStyle = 'rgba(255, 0, 0, 0.5)'
      c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
  //draws the collision blocks
    update() {
      this.draw()
    }
  }