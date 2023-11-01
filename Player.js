class Player extends Sprite {
    constructor({
      position,
      collisionBlocks,
      platformCollisionBlocks,
      imageSrc,
      frameRate,
      scale = 0.5,
      animations,
    }) {
      super({ imageSrc, frameRate, scale })
      this.position = position
      this.velocity = {
        x: 0,
        y: 1,
      }
  
      this.collisionBlocks = collisionBlocks
      this.platformCollisionBlocks = platformCollisionBlocks
      this.hitbox = {
        position: {
          x: this.position.x,
          y: this.position.y,
        },
        width: 10,
        height: 10,
      }
  
      this.animations = animations
      this.lastDirection = 'right'
  
      for (let key in this.animations) {
        const image = new Image()
        image.src = this.animations[key].imageSrc
  
        this.animations[key].image = image
      }
  
      this.camerabox = {
        position: {
          x: this.position.x,
          y: this.position.y,
        },
        width: 200,
        height: 80,
      }
    }
  
    switchSprite(key) {
      if (this.image === this.animations[key].image || !this.loaded) return
  
      this.currentFrame = 0
      this.image = this.animations[key].image
      this.frameBuffer = this.animations[key].frameBuffer
      this.frameRate = this.animations[key].frameRate
    }
  
    updateCamerabox() {
      this.camerabox = {
        position: {
          x: this.position.x - 50,
          y: this.position.y,
        },
        width: 200,
        height: 80,
      }
    }
  
   