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
  
    checkForHorizontalCanvasCollision() {
      if (
        this.hitbox.position.x + this.hitbox.width + this.velocity.x >= 576 ||
        this.hitbox.position.x + this.velocity.x <= 0
      ) {
        this.velocity.x = 0
      }
    }
  
    shouldPanCameraToTheLeft({ canvas, camera }) {
      const cameraboxRightSide = this.camerabox.position.x + this.camerabox.width
      const scaledDownCanvasWidth = canvas.width / 4
  
      if (cameraboxRightSide >= 576) return
  
      if (
        cameraboxRightSide >=
        scaledDownCanvasWidth + Math.abs(camera.position.x)
      ) {
        camera.position.x -= this.velocity.x
      }
    }
  
    shouldPanCameraToTheRight({ canvas, camera }) {
      if (this.camerabox.position.x <= 0) return
  
      if (this.camerabox.position.x <= Math.abs(camera.position.x)) {
        camera.position.x -= this.velocity.x
      }
    }
  
    shouldPanCameraDown({ canvas, camera }) {
      if (this.camerabox.position.y + this.velocity.y <= 0) return
  
      if (this.camerabox.position.y <= Math.abs(camera.position.y)) {
        camera.position.y -= this.velocity.y
      }
    }
  
    shouldPanCameraUp({ canvas, camera }) {
      if (
        this.camerabox.position.y + this.camerabox.height + this.velocity.y >=
        432
      )
        return
  
      const scaledCanvasHeight = canvas.height / 4
  
      if (
        this.camerabox.position.y + this.camerabox.height >=
        Math.abs(camera.position.y) + scaledCanvasHeight
      ) {
        camera.position.y -= this.velocity.y
      }
    }
  
   