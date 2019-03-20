define(() => {
  function Card(domElement, id) {
    this.domElement = domElement;
    this.cardState = "hidden";
    this.id = id;
    this.imageUrl;
  }

  Card.prototype.setToVisible = function () {
    this.cardState = "visible";
    this.domElement
      .querySelector(".cardContainer__card")
      .classList.add("cardContainer__card--clicked");
  };

  Card.prototype.setToHidden = function () {
    if (this.cardState === "visible") {
      setTimeout(() => {
        this.cardState = "hidden";
        this.domElement.querySelector(".cardContainer__card").classList.remove("cardContainer__card--clicked");
      }, 1000);
    }
  };

  Card.prototype.setImageUrl = function (index) {
    this.imageUrl = `../img/faces/face_0${index}.png`;
  };

  Card.prototype.setBackgroundStyle = function () {
    this.domElement.querySelector(
      ".card__back"
    ).style.backgroundImage = `url('${this.imageUrl}')`;
  };

  return {
    createCard: function () {
      const cardDomElementContainer = this.createDomElement();
      return new Card(cardDomElementContainer, this.guidGenerator());
    },
    createDomElement: function () {
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
    },
    guidGenerator: function () {
      var S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      };
      return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }
  };
});
