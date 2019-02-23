define(["./items/card.js", "./items/main-menu.js"], (Card, Menu) => {
  return {
    init: () => {
      Menu.attachListeners();
    }
  };
});
