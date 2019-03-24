define(() => {
  return {
    intervalId: null,
    imgQuantity: 6,
    turn: "right",
    lastIndex: null,

    dynamicallyChangeBackground: function() {
      const backgroundFront = document.querySelector(".backgroundFront"),
        backgroundRear = document.querySelector(".backgroundRear");

      this.intervalId = setInterval(() => {
        this.changeImage(backgroundRear, backgroundFront);

        if (this.turn === "right") {
          backgroundFront.classList.add("anComeFromRight");
          backgroundFront.classList.remove("anComeFromLeft");
          this.turn = "left";
        } else if (this.turn === "left") {
          backgroundFront.classList.add("anComeFromLeft");
          backgroundFront.classList.remove("anComeFromRight");
          this.turn = "right";
        }
      }, 20000);
    },
    changeImage: function(backgroundRear, backgroundFront) {
      if (this.lastIndex !== null) {
        backgroundRear.style.backgroundImage = `url('../img/background/background_0${
          this.lastIndex
        }.jpg')`;
      } else {
        backgroundRear.style.backgroundImage =
          "url(../img/background/backgroundMain_01.jpg)";
      }
      backgroundFront.style.backgroundImage = `url('${this.randomlyPickImg()}')`;
    },
    randomlyPickImg: function() {
      let index = Math.floor(Math.random() * this.imgQuantity);
      while (this.lastIndex === index) {
        index = Math.floor(Math.random() * this.imgQuantity);
      }
      this.lastIndex = index;
      return `../img/background/background_0${index}.jpg`;
    },
    setMainMenuBackground: function() {
      document.querySelector(".backgroundFront").style.backgroundImage =
        "url(../img/background/backgroundMain_01.jpg)";
    },
    stopBackgroundAnimations: function() {
      this.setMainMenuBackground();
      clearInterval(this.intervalId);
    }
  };
});
