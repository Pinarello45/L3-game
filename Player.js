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
  
      