define(() => {
  return {
    createCard: function () {
      let cardDomElement = document.createElement("DIV");
      cardDomElement.classList.add("deck__card");
      cardDomElement.classList.add("deck__card--hidden");

      return {
        domElement: cardDomElement,
        cardState: "hidden",
        setToVisible: function () {
          this.cardState = "visible";
          this.domElement.classList.add("deck__card--clicked");
        },
        setToHidden: function () {
          if (this.cardState === "visible") {
            this.cardState = "hidden";
            this.domElement.classList.remove("deck__card--clicked");
          }
        },
        addListenerToCard: function () {
          this.domElement.addEventListener("click", () => {
            this.setToVisible();
          });
        },
      }
    },
  };
});
