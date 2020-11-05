export default class Snake {
  constructor(scene) {
    this.scene = scene;
    this.body = [];
    this.tail = 0;
    this.lastMoveTime = 0;
    this.moveInterval = 100;
    this.bodySize = 16;
    this.direction = Phaser.Math.Vector2.LEFT;
    //place a red square and set the beginning of the coordinates to 0
    this.body.push(
      this.scene.add
        .rectangle(640 / 2, 640 / 2, this.bodySize, this.bodySize, 0x00e500)
        .setOrigin(0)
    );
    this.apple = this.scene.add
      .rectangle(
        Math.floor(
          ((this.scene.game.config.width - this.bodySize * 2) *
            (Math.random() + 0.025)) /
            16
        ) * 16,
        Math.floor(
          ((this.scene.game.config.height - this.bodySize * 2) *
            (Math.random() + 0.025)) /
            16
        ) * 16,
        this.bodySize,
        this.bodySize,
        0xe50000
      )
      .setOrigin(0);

    scene.input.keyboard.on("keydown", (e) => {
      this.keydown(e);
    });
    this.placeApple();
    this.placeBorders();
  }
  placeApple() {
    this.apple.x =
      Math.floor(
        ((this.scene.game.config.width - this.bodySize * 2) *
          (Math.random() + 0.025)) /
          16
      ) * 16;
    this.apple.y =
      Math.floor(
        ((this.scene.game.config.height - this.bodySize * 2) *
          (Math.random() + 0.025)) /
          16
      ) * 16;
  }
  keydown(event) {
    switch (event.keyCode) {
      case 37: //left
        if (this.tail < 1) this.direction = Phaser.Math.Vector2.LEFT;
        else if (this.direction != Phaser.Math.Vector2.RIGHT) {
          this.direction = Phaser.Math.Vector2.LEFT;
        }
        break;
      case 38: //up
        if (this.tail < 1) this.direction = Phaser.Math.Vector2.UP;
        else if (this.direction != Phaser.Math.Vector2.DOWN) {
          this.direction = Phaser.Math.Vector2.UP;
        }
        break;
      case 39: //right
        if (this.tail < 1) this.direction = Phaser.Math.Vector2.RIGHT;
        else if (this.direction != Phaser.Math.Vector2.LEFT) {
          this.direction = Phaser.Math.Vector2.RIGHT;
        }
        break;
      case 40: //down
        if (this.tail < 1) this.direction = Phaser.Math.Vector2.DOWN;
        else if (this.direction != Phaser.Math.Vector2.UP) {
          this.direction = Phaser.Math.Vector2.DOWN;
        }
        break;
    }
  }
  //update the screen
  update(time) {
    if (time >= this.lastMoveTime + this.moveInterval) {
      this.lastMoveTime = time;
      this.move();
    }
  }
  move() {
    if (this.body[0].x == this.apple.x && this.body[0].y == this.apple.y) {
      this.tail++;
      console.log(this.tail);
      this.body.push(
        this.scene.add
          .rectangle(0, 0, this.bodySize, this.bodySize, 0x00e500)
          .setOrigin(0)
      );
      this.placeApple();
    }
    //game over if hit the borders
    if (
      this.body[0].x === 0 ||
      this.body[0].y === 0 ||
      this.body[0].x === this.scene.game.config.width - this.bodySize ||
      this.body[0].y === this.scene.game.config.height - this.bodySize
    )
      this.scene.scene.restart();

    for (let i = this.body.length - 1; i > 0; i--) {
      this.body[i].x = this.body[i - 1].x;
      this.body[i].y = this.body[i - 1].y;
    }

    this.body[0].x += this.direction.x * 16;
    this.body[0].y += this.direction.y * 16;
    //game over if hit itself
    for (let i = 1; i < this.tail; i++) {
      if (
        this.body[0].x === this.body[i].x &&
        this.body[0].y === this.body[i].y
      )
        this.scene.scene.restart();
    }
  }
  //place borders
  placeBorders() {
    for (let i = 0; i < this.scene.game.config.width; i++) {
      this.scene.add
        .rectangle(0, i, this.bodySize, this.bodySize, 0x731d1d)
        .setOrigin(0);
      this.scene.add
        .rectangle(
          this.scene.game.config.width - this.bodySize,
          i,
          this.bodySize,
          this.bodySize,
          0x731d1d
        )
        .setOrigin(0);
      this.scene.add
        .rectangle(i, 0, this.bodySize, this.bodySize, 0x731d1d)
        .setOrigin(0);
      this.scene.add
        .rectangle(
          i,
          this.scene.game.config.width - this.bodySize,
          this.bodySize,
          this.bodySize,
          0x731d1d
        )
        .setOrigin(0);
    }
  }
}
