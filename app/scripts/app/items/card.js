define(() => {
  function Card(domElement, id) {
    this.domElement = domElement;
    this.cardState = "hidden";
    this.id = id;
    this.imageUrl;
  }

  Card.prototype.setToVisible = function() {
    this.cardState = "visible";
    this.domElement.classList.add("deck__card--clicked");
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
      const cardDomElement = document.createElement("DIV");
      cardDomElement.classList.add("deck__card");
      cardDomElement.classList.add("deck__card--hidden");

      return new Card(cardDomElement, new Date().valueOf());
    },
    generateUniqueRandomNumber: function() {}
  };
});
