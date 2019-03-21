define(() => {
  return {
    intervalId: null,
    turn: "front",
    imgQuantity: 8,

    dynamicallyChangeBackground: function () {
      const backgroundFront = document.querySelector(".backgroundFront"),
        backgroundBack = document.querySelector(".backgroundRear");
      this.intervalId = setInterval(() => {
        this.changeImage(backgroundFront, backgroundBack);
        console.log("changing");

        if (backgroundFront.classList.contains("anDisappear")) {
          backgroundFront.classList.remove("anDisappear");
          backgroundBack.classList.add("anDisappear");
        } else if (backgroundBack.classList.contains("anDisappear")) {
          backgroundBack.classList.remove("anDisappear");
          backgroundFront.classList.add("anDisappear");
        }
      }, 2000)

    },
    changeImage: function (backgroundBack, backgroundFront) {
      if (this.turn === "front") {
        backgroundBack.style.backgroundImage = `url('${this.randomlyPickImg}')`;
        turn = "back";
      } else if (this.turn === "back") {
        backgroundFront.style.backgroundImage = `url('${this.randomlyPickImg}')`;
        turn = "front";
      }
    },
    randomlyPickImg: function () {
      return `../img/background/background_0${Math.floor(Math.random * this.imgQuantity)}`
    },
    setMainMenuBackground: function () {
      document.querySelector(".backgroundFront").style.backgroundImage = "url(../img/background/backgroundMain_01.jpg)";
    }
  }
})