define(() => {
  return {
    createCard: function() {
      let cardDomElement = document.createElement("DIV");
      card.classList.add("gameContainer__card");
      return {
        domElement: card,
        cardState: "hiding"
      };
    }
  };
});
