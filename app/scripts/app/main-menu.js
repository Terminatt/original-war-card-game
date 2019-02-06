define(() => {
  return {
    attachListeners: function() {
      this.attachListenerBtn16();
    },
    attachListenerBtn16: function() {
      const btnCards_16 = document.querySelector("#btnCards_16");

      btnCards_16.addEventListener("click", () => {
        const mainMenu = document.querySelector(".gameContainer__mainMenu");
        // const deck = document.querySelector(".gameContainer__deck");
        const transparentDeck = document.querySelector(
          ".gameContainer__transparentDeck"
        );

        mainMenu.classList.add("anFadeAway");
        setTimeout(() => {
          transparentDeck.classList.remove("invisible");
          transparentDeck.classList.add("anComeIn");
        }, 2000);
      });
    }
  };
});
