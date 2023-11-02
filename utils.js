function collision({ object1, object2 }) { //start collision function
    return (
      object1.position.y + object1.height >= object2.position.y &&
      object1.position.y <= object2.position.y + object2.height &&
      object1.position.x <= object2.position.x + object2.width &&
      object1.position.x + object1.width >= object2.position.x
    )
  }//end collision function
  
  function platformCollision({ object1, object2 }) { //start platform collision function
    return (
      object1.position.y + object1.height >= object2.position.y &&
      object1.position.y + object1.height <=
        object2.position.y + object2.height &&
      object1.position.x <= object2.position.x + object2.width &&
      object1.position.x + object1.width >= object2.position.x
    )
  } //end platform collision function