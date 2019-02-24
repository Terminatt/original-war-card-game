define(["./items/card.js", "./items/animations.js"], (Card, Animation) => {
  return {
    state: "loading",
    gameMode: "",

    init: function () {
      this.listenToStateChange();
      this.attachListeners();
    },
    attachListeners: function () {
      this.attachListenerBtn16();
    },
    attachListenerBtn16: function () {
      const btnCards_16 = document.querySelector("#btnCards_16");

      btnCards_16.addEventListener("click", () => {
        const mainMenu = document.querySelector(".gameContainer__mainMenu");
        this.gameMode = "16";
        this.animate(mainMenu, "anFadeAway", "menuHiding");
      });
    },
    addListenerToAnimEnd: function (element, stateChange) {
      element.addEventListener("animationend", () => {
        element.removeEventListener("animationend", () => {
          this.state = stateChange;
        });
      })
    },
    animate: function (element, cssClassAnimationName, stateChange) {
      this.addListenerToAnimEnd(element, stateChange);
      Animation.addAnimation(element, cssClassAnimationName);
    },
    animateWithClassRemove: function (element, cssClassAnimationName, cssClassToRemove, stateChange) {
      this.addListenerToAnimEnd(element, stateChange);
      Animation.addAnimationWithClassDelete(element, cssClassToRemove, cssClassAnimationName);
    },
    listenToStateChange: function () {
      setInterval(() => {
        switch (this.state) {
          case "menuHiding":
            const transparentDeck = document.querySelector(".gameContainer__transparentDeck");
            this.animateWithClassRemove(transparentDeck, "invisible", "anComeIn", "transparentDeckLoaded");
            break;
          case "transparentDeckLoaded":
            const deck = document.querySelector(".gameContainer__deck");
            deck.classList.remove("invisible");
            this.state = "deckLoaded";
            break;
          case "deckLoaded":
            //TODO fill in for cards
            break;
          case "loaded":
            //TODO fill in for loaded
            break;
        }
      }, 1)
    }
  };
});
