define(["./items/card.js", "./items/animations.js"], (Card, Animation) => {
  return {
    state: "loading",
    cards: [],
    activeCards: [],
    cardAmount: 0,
    intervalId: null,
    loadedCards: 0,

    init: function() {
      this.listenToStateChange();
      this.attachListeners();
    },
    attachListeners: function() {
      this.attachListenerBtn16();
    },
    attachListenerBtn16: function() {
      const btnCards_16 = document.querySelector("#btnCards_16");

      btnCards_16.addEventListener("click", () => {
        const mainMenu = document.querySelector(".gameContainer__mainMenu");
        this.cardAmount = 16;
        this.animate(mainMenu, "anFadeAway", "menuHiding");
      });
    },
    addListenerToAnimEnd: function(element, stateChange) {
      element.addEventListener("animationend", () => {
        this.state = stateChange;
        element.removeEventListener("animationend", () => {});
      });
    },
    animate: function(element, cssClassAnimationName, stateChange) {
      this.addListenerToAnimEnd(element, stateChange);
      Animation.addAnimation(element, cssClassAnimationName);
    },
    animateWithClassRemove: function(
      element,
      cssClassToRemove,
      cssClassAnimationName,
      stateChange
    ) {
      this.addListenerToAnimEnd(element, stateChange);
      Animation.addAnimationWithClassDelete(
        element,
        cssClassToRemove,
        cssClassAnimationName
      );
    },
    listenToStateChange: function() {
      setInterval(() => {
        switch (this.state) {
          case "menuHiding":
            this.onMenuHiding();
            break;
          case "transparentDeckLoaded":
            this.onTransparentDeckLoaded();
            break;
          case "deckLoaded":
            this.onDeckLoaded();
            break;
          case "cardReady":
            this.onCardReady();
            break;
          case "loaded":
            window.clearInterval(this.intervalId);
            break;
        }
      }, 1);
    },
    onMenuHiding: function() {
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
    onTransparentDeckLoaded: function() {
      const deck = document.querySelector(".gameContainer__deck");
      deck.classList.remove("gameContainer__deck--invisible");
      this.state = "deckLoaded";
    },
    onDeckLoaded: function() {
      this.createCards(this.cardAmount);
      this.cloneCards();
      this.appendCards();
      this.state = "cardReady";
    },
    onCardReady: function() {
      if (this.loadedCards < this.cardAmount) {
        const index = this.loadedCards;
        let card = this.cards[index];
        this.state = "cardLoading";

        this.animateWithClassRemove(
          card.domElement,
          "deck__card--hidden",
          "anHandingOutCard",
          "cardReady"
        );
        this.loadedCards++;
      } else {
        this.state = "loaded";
      }
    },
    createCards: function(amount) {
      // the amount must be divided by two so that only 8/16/32 unique cards will be created
      amount = amount / 2;
      for (let i = 0; i < amount; i++) {
        let card = Card.createCard();
        card.addListenerToCard();

        this.cards.push(card);
      }
    },
    cloneCards: function() {
      const length = this.cards.length;
      for (let i = 0; i < length; i++) {
        let card = Card.createCard();
        card.addListenerToCard();
        card.id = this.cards[i].id;

        this.cards.push(card);
      }
    },
    appendToDeck: function(cardDomElement) {
      document
        .querySelector(".gameContainer__deck")
        .appendChild(cardDomElement);
    },
    appendCards: function() {
      const length = this.cards.length;
      for (i = 0; i < length; i++) {
        this.appendToDeck(this.cards[i].domElement);
      }
    }
  };
});
