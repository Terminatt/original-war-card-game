define(["./items/card.js", "./items/animations.js"], (Card, Animation) => {
  return {
    state: "loading",
    cards: [],
    activeCards: [],
    foundCards: [],
    cardAmount: 0,
    loadedCards: 0,

    init: function () {
      this.attachListeners();
    },
    attachListeners: function () {
      this.attachListenerBtn16();
    },
    attachListenerBtn16: function () {
      const btnCards_16 = document.querySelector("#btnCards_16");

      btnCards_16.addEventListener("click", () => {
        const mainMenu = document.querySelector(".gameContainer__mainMenu");
        this.cardAmount = 16;
        this.animate(mainMenu, "anFadeAway", "menuHiding");
      });
    },
    addListenerToAnimEnd: function (element, stateChange, cb) {
      element.addEventListener("animationend", () => {
        cb = cb.bind(this);
        this.state = stateChange;
        cb(this.state);
        element.removeEventListener("animationend", () => { });
      });
    },
    animate: function (element, cssClassAnimationName, stateChange) {
      this.addListenerToAnimEnd(element, stateChange, this.listenToStateChange);
      Animation.addAnimation(element, cssClassAnimationName);
    },
    animateWithClassRemove: function (
      element,
      cssClassToRemove,
      cssClassAnimationName,
      stateChange
    ) {
      this.addListenerToAnimEnd(element, stateChange, this.listenToStateChange);
      Animation.addAnimationWithClassDelete(
        element,
        cssClassToRemove,
        cssClassAnimationName
      );
    },
    listenToStateChange: function (state) {
      switch (state) {
        case "menuHiding":
          this.onMenuHiding();
          break;
        case "transparentDeckLoaded":
          this.onTransparentDeckLoaded(this.listenToStateChange);
          break;
        case "deckLoaded":
          this.onDeckLoaded(this.listenToStateChange);
          break;
        case "cardReady":
          this.onCardReady();
          break;
        case "loaded":
          break;
      }
    },
    onMenuHiding: function () {
      const transparentDeck = document.querySelector(
        ".gameContainer__transparentDeck"
      );
      this.animateWithClassRemove(
        transparentDeck,
        "gameContainer__transparentDeck--invisible",
        "anComeIn",
        "transparentDeckLoaded"
      );
    },
    onTransparentDeckLoaded: function (cb) {
      cb = cb.bind(this);
      const deck = document.querySelector(".gameContainer__deck");
      deck.classList.remove("gameContainer__deck--invisible");
      this.state = "deckLoaded";
      cb(this.state);
    },
    onDeckLoaded: function (cb) {
      cb = cb.bind(this);
      this.createCards(this.cardAmount);
      this.setImagesToCards();
      this.cloneCards();
      this.setBackgroundStylesToCards();
      this.shuffleArray(this.cards);
      this.appendCards();
      this.state = "cardReady";
      cb(this.state);
    },
    onCardReady: function () {
      if (this.loadedCards < this.cardAmount) {
        const index = this.loadedCards;
        let card = this.cards[index];
        this.state = "cardLoading";

        this.animateWithClassRemove(
          card.domElement,
          "deck__cardContainer--hidden",
          "anHandingOutCard",
          "cardReady"
        );
        this.loadedCards++;
      } else {
        this.state = "loaded";
      }
    },
    createCards: function (amount) {
      // the amount must be divided by two so that only 8/16/32 unique cards will be created
      amount = amount / 2;
      for (let i = 0; i < amount; i++) {
        let card = Card.createCard();
        this.addListenerToCard(card);
        this.cards.push(card);
      }
    },
    cloneCards: function () {
      const length = this.cards.length;
      for (let i = 0; i < length; i++) {
        let card = Card.createCard();
        this.addListenerToCard(card);

        card.id = this.cards[i].id;
        card.imageUrl = this.cards[i].imageUrl;

        this.cards.push(card);
      }
    },
    addListenerToCard: function (card) {
      card.domElement.addEventListener("click", () => {
        if (this.activeCards.length < 2) {
          card.setToVisible();
          this.activeCards.push(card);
          this.compareCards();
        }
      });
    },
    appendToDeck: function (cardDomElement) {
      document
        .querySelector(".gameContainer__deck")
        .appendChild(cardDomElement);
    },
    appendCards: function () {
      const length = this.cards.length;
      for (i = 0; i < length; i++) {
        this.appendToDeck(this.cards[i].domElement);
      }
    },
    shuffleArray: function (array) {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }

      return array;
    },
    setImagesToCards: function () {
      for (let i = 0; i < this.cards.length; i++) {
        this.cards[i].setImageUrl(i);
      }
    },
    setBackgroundStylesToCards: function () {
      for (let i = 0; i < this.cards.length; i++) {
        this.cards[i].setBackgroundStyle();
      }
    },
    checkIfSame: function (firstCard, secondCard) {
      if (firstCard.id.localeCompare(secondCard.id) === 0) {
        return true;
      } else {
        return false;
      }
    },
    compareCards: function () {
      if (this.activeCards.length !== 2) { return; }
      if (this.checkIfSame(this.activeCards[0], this.activeCards[1])) {
        this.foundCards.push(this.activeCards[0]);
        this.foundCards.push(this.activeCards[1]);
        this.activeCards = [];
      } else {
        this.activeCards[0].setToHidden();
        this.activeCards[1].setToHidden();
        this.activeCards = [];
      }
    }
  };
});
