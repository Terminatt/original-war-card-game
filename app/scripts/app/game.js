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

    init: function () {
      DBackground.setMainMenuBackground();
      this.attachListeners();
    },
    attachListeners: function () {
      this.attachListenerBtn16();
      this.attachListenerToInps();
      this.attachListenerToWinBoxBtn();
      document.querySelector(".winButton").addEventListener("click", () => {
        this.winGame();
      });
    },
    attachListenerBtn16: function () {
      document.querySelector("#cards16").addEventListener("click", () => {
        this.cardAmount = 16;
        this.startGame();
      });
    },
    attachListenerToInps: function () {
      document.querySelectorAll(".winBoxTransparent__input").forEach((el) => {
        el.addEventListener("input", (event) => {
          if (!event.target.classList.contains("winBoxTransparent__input--filled") && event.target.value !== "") {
            el.classList.add("winBoxTransparent__input--filled");
          } else if (event.target.value === "") {
            el.classList.remove("winBoxTransparent__input--filled");
          }
        })
      })
    },
    attachListenerToWinBoxBtn: function () {
      document.querySelector(".winBoxTransparent__btn").addEventListener("click", (event) => {
        const value = document.querySelector(".winBoxTransparent__input").value;
        if (this.state === "waitingToSave") {
          const ranks = document.querySelector(".winBoxTransparent__ranks");
          this.animateWithClassRemove(ranks, "winBoxTransparent--invisibility", "anAppear", "scoreSaved");
        }
      })
    },
    startGame: function () {
      const mainMenu = document.querySelector(".gameContainer__mainMenu");
      this.showInfoMenu();
      this.animate(mainMenu, "anFadeAway", "menuHiding");
      DBackground.dynamicallyChangeBackground();
    },
    addListenerToAnimEnd: function (element, stateChange, cb) {
      let onAnimationEnd = () => {
        cb = cb.bind(this);
        this.state = stateChange;
        cb();
        element.removeEventListener("animationend", onAnimationEnd);
      };
      element.addEventListener("animationend", onAnimationEnd);
    },
    addAnimationWithClassDelete: function (element, classToRemove, classToAdd) {
      element.classList.remove(classToRemove);
      element.classList.add(classToAdd);
    },
    addAnimation: function (element, classToAdd) {
      element.classList.add(classToAdd);
    },
    animate: function (element, cssClassAnimationName, stateChange) {
      this.addListenerToAnimEnd(element, stateChange, this.listenToStateChange);
      this.addAnimation(element, cssClassAnimationName);
    },
    animateWithClassRemove: function (
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
    listenToStateChange: function () {
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
        case "scoreBoardReady":
          this.onElementLoaded(
            ".winBoxTransparent",
            null,
            null,
            "anAppearCentered",
            "scoreBoardLoaded"
          );
          break;
        case "scoreBoardLoaded":
          this.onElementLoaded(
            ".winBoxTransparent__statsTitle",
            null,
            null,
            "anAppearFromRight",
            "titleLoaded"
          );
          break;
        case "titleLoaded":
          this.onElementLoaded(
            ".winBoxTransparent__score",
            Stats.getScore,
            "SCORE",
            "anAppear",
            "scoreLoaded"
          );
          break;
        case "scoreLoaded":
          this.onElementLoaded(
            ".winBoxTransparent__time",
            Stats.getTime,
            "TIME",
            "anAppear",
            "timeLoaded"
          );
          break;
        case "timeLoaded":
          this.onElementLoaded(
            ".winBoxTransparent__clicks",
            Stats.getClicks,
            "CLICKS",
            "anAppear",
            "clicksLoaded"
          );
          break;
        case "clicksLoaded":
          this.onElementLoaded(
            ".winBoxTransparent__inputContainer",
            null,
            null,
            "anAppearCentered",
            "waitingToSave"
          );
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
      cb();
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
      cb();
    },
    onCardReady: function (cb) {
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
    onElementLoaded: function (elClass, getter, text, animation, state) {
      const element = document.querySelector(elClass);
      if (text) {
        const value = getter();
        element.innerHTML = `${text}: ${value}`;
      }
      element.classList.remove("winBoxTransparent--invisibility");
      element.classList.remove("winBoxTransparent--invisible");
      this.animate(element, animation, state);
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
        if (card.getCardState() === "visible") {
          return;
        }

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
    appendToDeck: function (cardDomElement) {
      document
        .querySelector(".gameContainer__deck")
        .appendChild(cardDomElement);
    },
    appendCards: function () {
      for (i = 0; i < this.cards.length; i++) {
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
    checkIfWon: function () {
      if (this.cardAmount === this.foundCards.length) {
        this.onWonGame();
      }
    },
    showInfoMenu: function () {
      document
        .querySelector(".infoContainer")
        .classList.remove("infoContainer--hidden");
    },
    hideInfoMenu: function () {
      document
        .querySelector(".infoContainer")
        .classList.add("infoContainer--hidden");
    },
    winGame: function () {
      this.cardAmount = 0;

      this.checkIfWon();
    },
    onWonGame: function () {
      const transparentDeck = document.querySelector(
        ".gameContainer__transparentDeck"
      ),
        deck = document.querySelector(".gameContainer__deck");
      Stats.stopTimer();
      DBackground.stopBackgroundAnimations();

      this.addAnimation(transparentDeck, "anScaleDown");
      this.animate(deck, "anScaleDown", "scoreBoardReady");
    }
  };
});
