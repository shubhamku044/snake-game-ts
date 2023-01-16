import { scoreEl } from "./variables";

enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}

enum SkipArrEl {
  VericleUp = -25,
  VericleDown = 25,
  HorizontalRight = 1,
  HorizontalLeft = -1,
}

class Snake {
  gameBoardEl: NodeListOf<ChildNode>;
  currPos: number;
  direction: Direction;
  skipArrEl: SkipArrEl;
  speed: number;
  score: number;
  snakes: number[] = [];
  intervalId: number;

  constructor(gameBoardEl: NodeListOf<ChildNode>) {
    this.gameBoardEl = gameBoardEl;
    this.currPos = 10;
    this.controlSnake();
    this.direction = Direction.Right;
    this.skipArrEl = SkipArrEl.HorizontalRight;
    this.speed = 400;
    this.snakes = [2, 1, 0];
    this.drawFood();
    this.drawSnake();
    this.score = 0;
    this.intervalId = NaN;

    this.start();
  }

  drawSnake() {
    for (const snake of this.snakes) {
      (this.gameBoardEl[snake] as HTMLDivElement).classList.add("snake");
    }
  }

  moveSnakeArr() {
    for (const snake of this.snakes) {
      (this.gameBoardEl[snake] as HTMLDivElement).classList.add("snake");
    }
  }

  move() {
    const tail: number = this.snakes.pop() as number;

    (this.gameBoardEl[tail] as HTMLDivElement).classList.remove("snake");

    let head: number = this.snakes[0] + this.skipArrEl;

    if (this.direction === Direction.Right && head % 25 === 0) head = head - 25;
    if (this.direction === Direction.Left) {
      if (head % 25 === 24) head = head + 25;
      if (head < 0) head = 24;
    }

    if (this.direction === Direction.Up && head < 0) {
      head = 1000 + head;
    }
    if (this.direction === Direction.Down && head > 1000) head = head - 1000;

    this.snakes.unshift(head);
    (this.gameBoardEl[head] as HTMLDivElement).classList.add("snake");

    this.eatFood();

    this.checkCollision();
  }

  checkCollision() {
    if (this.snakes.includes(this.snakes[0], 1)) {
      alert("Game Over");
      location.reload();
    }
  }

  start() {
    this.intervalId = setInterval(() => {
      this.move();
    }, this.speed);
  }

  eatFood() {
    if (
      (this.gameBoardEl[this.snakes[0]] as HTMLDivElement).classList.contains(
        "food"
      )
    ) {
      (this.gameBoardEl[this.snakes[0]] as HTMLDivElement).classList.remove(
        "food"
      );

      this.score += 1;
      scoreEl.textContent = this.score.toString();
      this.drawFood();
      this.appendSnake();
      // Here I am using astro vim to write comment
      if (this.score % 3 === 0) {
        if (this.speed > 600) {
          this.speed -= 50;
        } else if (this.speed > 400) {
          this.speed -= 30;
        } else if (this.speed > 200) {
          this.speed -= 20;
        } else {
          this.speed -= 10;
        }

        clearInterval(this.intervalId);
        this.start();
      }
    }
  }

  drawFood() {
    const randomElForFood = Math.floor(
      Math.random() * (this.gameBoardEl as NodeListOf<ChildNode>).length + 1
    );

    (this.gameBoardEl[randomElForFood] as HTMLElement).classList.add("food");
  }

  controlSnake() {
    document.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowUp":
          if (this.direction === Direction.Down) break;
          this.skipArrEl = SkipArrEl.VericleUp;
          this.direction = Direction.Up;
          break;
        case "ArrowDown":
          if (this.direction === Direction.Up) break;
          this.skipArrEl = SkipArrEl.VericleDown;
          this.direction = Direction.Down;
          break;
        case "ArrowLeft":
          if (this.direction === Direction.Right) break;
          this.skipArrEl = SkipArrEl.HorizontalLeft;
          this.direction = Direction.Left;
          break;
        case "ArrowRight":
          if (this.direction === Direction.Left) break;
          this.skipArrEl = SkipArrEl.HorizontalRight;
          this.direction = Direction.Right;
          break;
      }
    });
  }

  appendSnake() {
    this.snakes.push(this.snakes[this.snakes.length - 1] - this.skipArrEl);
  }
}

export { Snake };
