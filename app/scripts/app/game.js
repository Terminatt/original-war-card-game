define([
  "./items/card.js",
  "./items/dynamic-background.js",
  "./items/stats.js"
], (Card, DBackground, Stats) => {
  return {
    state: "loading",
    cards: [],
    activeCards: [],
    foundCards: [],
    cardAmount: 0,
    loadedCards: 0,

    init: function() {
      DBackground.setMainMenuBackground();
      this.attachListeners();
    },
    attachListeners: function() {
      this.attachListenerBtn16();
    },
    attachListenerBtn16: function() {
      document.querySelector("#btnCards_16").addEventListener("click", () => {
        this.cardAmount = 16;
        this.startGame();
      });
    },
    startGame: function() {
      const mainMenu = document.querySelector(".gameContainer__mainMenu");
      this.showInfoMenu();
      this.animate(mainMenu, "anFadeAway", "menuHiding");
      DBackground.dynamicallyChangeBackground();
    },
    addListenerToAnimEnd: function(element, stateChange, cb) {
      element.addEventListener("animationend", () => {
        cb = cb.bind(this);
        this.state = stateChange;
        cb();
        element.removeEventListener("animationend", () => {});
      });
    },
    addAnimationWithClassDelete: function(element, classToRemove, classToAdd) {
      element.classList.remove(classToRemove);
      element.classList.add(classToAdd);
    },
    addAnimation: function(element, classToAdd) {
      element.classList.add(classToAdd);
    },
    animate: function(element, cssClassAnimationName, stateChange) {
      this.addListenerToAnimEnd(element, stateChange, this.listenToStateChange);
      this.addAnimation(element, cssClassAnimationName);
    },
    animateWithClassRemove: function(
      element,
      cssClassToRemove,
      cssClassAnimationName,
      stateChange
    ) {
      this.addListenerToAnimEnd(element, stateChange, this.listenToStateChange);
      this.addAnimationWithClassDelete(
        element,
        cssClassToRemove,
        cssClassAnimationName
      );
    },
    listenToStateChange: function() {
      switch (this.state) {
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
          this.onCardReady(this.listenToStateChange);
          break;
        case "readyToClick":
          Stats.startTimer();
          break;
      }
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
    onTransparentDeckLoaded: function(cb) {
      cb = cb.bind(this);
      const deck = document.querySelector(".gameContainer__deck");
      deck.classList.remove("gameContainer__deck--invisible");
      this.state = "deckLoaded";
      cb();
    },
    onDeckLoaded: function(cb) {
      cb = cb.bind(this);
      this.createCards(this.cardAmount);
      this.setImagesToCards();
      this.cloneCards();
      this.setBackgroundStylesToCards();
      this.shuffleArray(this.cards);
      this.appendCards();
      this.state = "cardReady";
      cb();
    },
    onCardReady: function(cb) {
      cb = cb.bind(this);
      if (this.loadedCards < this.cardAmount) {
        const index = this.loadedCards;
        let card = this.cards[index];
        this.state = "cardLoading";

        this.animateWithClassRemove(
          card.domElement,
          "gameContainer__cardContainer--hidden",
          "anHandingOutCard",
          "cardReady"
        );
        this.loadedCards++;
      } else {
        this.state = "readyToClick";
        cb();
      }
    },
    createCards: function(amount) {
      // the amount must be divided by two so that only 8/16/32 unique cards will be created
      amount = amount / 2;
      for (let i = 0; i < amount; i++) {
        let card = Card.createCard();
        this.addListenerToCard(card);
        this.cards.push(card);
      }
    },
    cloneCards: function() {
      const length = this.cards.length;
      for (let i = 0; i < length; i++) {
        let card = Card.createCard();
        this.addListenerToCard(card);

        card.id = this.cards[i].id;
        card.imageUrl = this.cards[i].imageUrl;

        this.cards.push(card);
      }
    },
    addListenerToCard: function(card) {
      card.domElement.addEventListener("click", () => {
        if (this.activeCards.length < 2 && this.state === "readyToClick") {
          card.setToVisible();
          this.activeCards.push(card);
          Stats.increaseClicks();

          if (this.activeCards.length === 2) {
            this.state = "notReadyToClick";
            this.compareCards();
          }
        }
      });
    },
    appendToDeck: function(cardDomElement) {
      document
        .querySelector(".gameContainer__deck")
        .appendChild(cardDomElement);
    },
    appendCards: function() {
      for (i = 0; i < this.cards.length; i++) {
        this.appendToDeck(this.cards[i].domElement);
      }
    },
    shuffleArray: function(array) {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return array;
    },
    setImagesToCards: function() {
      for (let i = 0; i < this.cards.length; i++) {
        this.cards[i].setImageUrl(i);
      }
    },
    setBackgroundStylesToCards: function() {
      for (let i = 0; i < this.cards.length; i++) {
        this.cards[i].setBackgroundStyle();
      }
    },
    checkIfSame: function(firstCard, secondCard) {
      if (firstCard.id.localeCompare(secondCard.id) === 0) {
        return true;
      } else {
        return false;
      }
    },
    compareCards: function() {
      if (this.checkIfSame(this.activeCards[0], this.activeCards[1])) {
        this.foundCards.push(this.activeCards[0]);
        this.foundCards.push(this.activeCards[1]);
        Stats.increaseScore();
        this.activeCards = [];
        this.state = "readyToClick";
        this.checkIfWon();
      } else {
        setTimeout(() => {
          this.activeCards[0].setToHidden();
          this.activeCards[1].setToHidden();
          this.activeCards = [];
          this.state = "readyToClick";
        }, 1000);
      }
    },
    checkIfWon: function() {
      if (this.cardAmount === this.foundCards.length) {
        console.log("You Won");
      }
    },
    showInfoMenu: function() {
      document
        .querySelector(".infoContainer")
        .classList.remove("infoContainer--hidden");
    },
    hideInfoMenu: function() {
      document
        .querySelector(".infoContainer")
        .classList.add("infoContainer--hidden");
    }
  };
});
