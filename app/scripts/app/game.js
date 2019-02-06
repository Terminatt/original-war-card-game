define(["./card.js", "./main-menu.js"], (Card, Menu) => {
  return {
    init: () => {
      Menu.attachListeners();
    }
  };
});
