class Sprite { //start of class function
    constructor({
      position,
      imageSrc,
      frameRate = 1,
      frameBuffer = 3,
      scale = 1,
    }) 
    //settings of the sprite
    {//start of function
      this.position = position
      this.scale = scale
      this.loaded = false
      this.image = new Image()
      this.image.onload = () => {
        this.width = (this.image.width / this.frameRate) * this.scale
        this.height = this.image.height * this.scale
        this.loaded = true
      }
      this.image.src = imageSrc
      this.frameRate = frameRate
      this.currentFrame = 0
      this.frameBuffer = frameBuffer
      this.elapsedFrames = 0
    }//end of function
  
    draw() {//start of function
      if (!this.image) return
  
      const cropbox = {//start
        position: {
          x: this.currentFrame * (this.image.width / this.frameRate),
          y: 0,
        },
        width: this.image.width / this.frameRate,
        height: this.image.height,
      }//end
  
      c.drawImage(
        this.image,
        cropbox.position.x,
        cropbox.position.y,
        cropbox.width,
        cropbox.height,
        this.position.x,
        this.position.y,
        this.width,
        this.height
      )
    }//end of function
  
    update() {//start
      this.draw()
      this.updateFrames()
    }//end
  
    updateFrames() {//start of func
      this.elapsedFrames++
  
      if (this.elapsedFrames % this.frameBuffer === 0) {
        if (this.currentFrame < this.frameRate - 1) this.currentFrame++
        else this.currentFrame = 0
      }
    }//end of func
  }
  //sprite class end