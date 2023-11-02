class Player extends Sprite {//start of class
    constructor({ //start of constructor
      position,
      collisionBlocks,
      platformCollisionBlocks,
      imageSrc,
      frameRate,
      scale = 0.5,
      animations,
    })//end of constructor 
    {//start of func
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
    } //end of func
  
    switchSprite(key) { //start of switch sprite
      if (this.image === this.animations[key].image || !this.loaded) return
  
      this.currentFrame = 0
      this.image = this.animations[key].image
      this.frameBuffer = this.animations[key].frameBuffer
      this.frameRate = this.animations[key].frameRate
    }//end of switch sprite
  
    updateCamerabox() { //start of update camera box
      this.camerabox = {
        position: {
          x: this.position.x - 50,
          y: this.position.y,
        },
        width: 200,
        height: 80,
      }
    } //end of camera box
  
    checkForHorizontalCanvasCollision() { //start of checkfor horizontal canvas collision
      if (
        this.hitbox.position.x + this.hitbox.width + this.velocity.x >= 576 ||
        this.hitbox.position.x + this.velocity.x <= 0
      ) {
        this.velocity.x = 0
      }
    } //end of check for horizontal canvas collection
  
    shouldPanCameraToTheLeft({ canvas, camera }) { //this pans the camera to the left when playing
      const cameraboxRightSide = this.camerabox.position.x + this.camerabox.width
      const scaledDownCanvasWidth = canvas.width / 4
  
      if (cameraboxRightSide >= 576) return
  
      if (
        cameraboxRightSide >=
        scaledDownCanvasWidth + Math.abs(camera.position.x)
      ) {
        camera.position.x -= this.velocity.x
      }
    }//end of panning camera
  
    shouldPanCameraToTheRight({ canvas, camera }) { //this pans the camera to the right when playing
      if (this.camerabox.position.x <= 0) return
  
      if (this.camerabox.position.x <= Math.abs(camera.position.x)) {
        camera.position.x -= this.velocity.x
      }
    }//end of panning camera
  
    shouldPanCameraDown({ canvas, camera }) { //this pans the camera down
      if (this.camerabox.position.y + this.velocity.y <= 0) return
  
      if (this.camerabox.position.y <= Math.abs(camera.position.y)) {
        camera.position.y -= this.velocity.y
      }
    } //end of panning camera down
  
    shouldPanCameraUp({ canvas, camera }) { //this pans the camera up
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
    } //end of panning camera
  
    update() {
      this.updateFrames()
      this.updateHitbox()
  
      this.updateCamerabox()
      // c.fillStyle = 'rgba(0, 0, 255, 0.2)'
      // c.fillRect(
      //   this.camerabox.position.x,
      //   this.camerabox.position.y,
      //   this.camerabox.width,
      //   this.camerabox.height
      // )
  
      // draws out the image
      // c.fillStyle = 'rgba(0, 255, 0, 0.2)'
      // c.fillRect(this.position.x, this.position.y, this.width, this.height)
  
      // c.fillStyle = 'rgba(255, 0, 0, 0.2)'
      // c.fillRect(
      //   this.hitbox.position.x,
      //   this.hitbox.position.y,
      //   this.hitbox.width,
      //   this.hitbox.height
      // )
  
      this.draw()
  
      this.position.x += this.velocity.x
      this.updateHitbox()
      this.checkForHorizontalCollisions()
      this.applyGravity()
      this.updateHitbox()
      this.checkForVerticalCollisions()
    }
  
    updateHitbox() { //this updates the hit box
      this.hitbox = {
        position: {
          x: this.position.x + 35,
          y: this.position.y + 26,
        },
        width: 14,
        height: 27,
      }
    } //end of updating hit box
  
    checkForHorizontalCollisions() { //checks for the horizontal collisions 
      for (let i = 0; i < this.collisionBlocks.length; i++) {
        const collisionBlock = this.collisionBlocks[i]
  
        if (
          collision({
            object1: this.hitbox,
            object2: collisionBlock,
          })
        ) {
          if (this.velocity.x > 0) {
            this.velocity.x = 0
  
            const offset =
              this.hitbox.position.x - this.position.x + this.hitbox.width
  
            this.position.x = collisionBlock.position.x - offset - 0.01
            break
          }
  
          if (this.velocity.x < 0) {
            this.velocity.x = 0
  
            const offset = this.hitbox.position.x - this.position.x
  
            this.position.x =
              collisionBlock.position.x + collisionBlock.width - offset + 0.01
            break
          }
        }
      }
    } //end of check for horizontal collisions
  
    applyGravity() { //this applys gravity
      this.velocity.y += gravity
      this.position.y += this.velocity.y
    }//end of applying gravity
  
    checkForVerticalCollisions() { //checks for vertical collisions 
      for (let i = 0; i < this.collisionBlocks.length; i++) {
        const collisionBlock = this.collisionBlocks[i]
  
        if (
          collision({
            object1: this.hitbox,
            object2: collisionBlock,
          })
        ) {
          if (this.velocity.y > 0) {
            this.velocity.y = 0
  
            const offset =
              this.hitbox.position.y - this.position.y + this.hitbox.height
  
            this.position.y = collisionBlock.position.y - offset - 0.01
            break
          }
  
          if (this.velocity.y < 0) {
            this.velocity.y = 0
  
            const offset = this.hitbox.position.y - this.position.y
  
            this.position.y =
              collisionBlock.position.y + collisionBlock.height - offset + 0.01
            break
          }
        }
      }
  
      // platform collision blocks
      for (let i = 0; i < this.platformCollisionBlocks.length; i++) {
        const platformCollisionBlock = this.platformCollisionBlocks[i]
  
        if (
          platformCollision({
            object1: this.hitbox,
            object2: platformCollisionBlock,
          })
        ) {
          if (this.velocity.y > 0) {
            this.velocity.y = 0
  
            const offset =
              this.hitbox.position.y - this.position.y + this.hitbox.height
  
            this.position.y = platformCollisionBlock.position.y - offset - 0.01
            break
          }
        }
      }
    }//end of vertical collisions
  }//end of class