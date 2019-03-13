define(() => {
  function Card(domElement, id) {
    this.domElement = domElement;
    this.cardState = "hidden";
    this.id = id;
    this.imageUrl;
  }

  Card.prototype.setToVisible = function() {
    this.cardState = "visible";
    this.domElement
      .querySelector(".cardContainer__card")
      .classList.add("cardContainer__card--clicked");
  };

  Card.prototype.setToHidden = function() {
    if (this.cardState === "visible") {
      this.cardState = "hidden";
      this.domElement.classList.remove("deck__card--clicked");
    }
  };

  Card.prototype.addListenerToCard = function() {
    this.domElement.addEventListener("click", () => {
      this.setToVisible();
    });
  };

  Card.prototype.setImageUrl = function(index) {
    this.imageUrl = `../img/faces/face_0${index}.png`;
  };

  return {
    createCard: function() {
      const cardDomElementContainer = this.createDomElement();
      return new Card(cardDomElementContainer, new Date().valueOf());
    },
    createDomElement: function() {
      const cardDomElementContainer = document.createElement("DIV"),
        cardDomElement = document.createElement("DIV"),
        cardDomFront = document.createElement("DIV"),
        cardDomBack = document.createElement("DIV");

      cardDomElementContainer.classList.add("deck__cardContainer");
      cardDomElementContainer.classList.add("deck__cardContainer--hidden");
      cardDomElement.classList.add("cardContainer__card");
      cardDomFront.classList.add("card__front");
      cardDomBack.classList.add("card__back");

      cardDomElement.appendChild(cardDomFront);
      cardDomElement.appendChild(cardDomBack);
      cardDomElementContainer.appendChild(cardDomElement);

      return cardDomElementContainer;
    }
  };
});
