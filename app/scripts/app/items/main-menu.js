define(() => {
  return {
    state: "inMenu",
    attachListeners: function() {
      this.attachListenerBtn16();
    },
    attachListenerBtn16: function() {
      const btnCards_16 = document.querySelector("#btnCards_16");

      btnCards_16.addEventListener("click", () => {
        const mainMenu = document.querySelector(".gameContainer__mainMenu");
        const deck = document.querySelector(".gameContainer__deck");
        const transparentDeck = document.querySelector(
          ".gameContainer__transparentDeck"
        );

        mainMenu.classList.add("anFadeAway");
        this.stackAnimation(
          transparentDeck,
          "invisible",
          "anComeIn",
          2000
        ).then(() => {
          this.stackAnimation(deck, "invisible", "anComeIn", 2000).then(() => {
            this.state = "notInMenu";
          });
        });
      });
    },

    stackAnimation: function(element, classToRemove, classToAdd, time) {
      return new Promise(function(resolve) {
        setTimeout(() => {
          element.classList.remove(classToRemove);
          element.classList.add(classToAdd);
          resolve();
        }, time);
      });
    }
  };
});
