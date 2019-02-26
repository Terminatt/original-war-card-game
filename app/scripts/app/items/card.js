define(() => {
  return {
    createCard: function() {
      let cardDomElement = document.createElement("DIV");
      cardDomElement.classList.add("deck__card");
      cardDomElement.classList.add("deck__card--hidden");

      return {
        domElement: cardDomElement,
        cardState: "hiding",
        id: null,
        image: null,
        changeCardState: function(newState) {
          this.cardState = newState;
        },
        generateRandomImage: function(imageNames) {
          this.image = imageNames[Math.floor(Math.random * imageNames.length)];
        }
      };
    }
  };
});
