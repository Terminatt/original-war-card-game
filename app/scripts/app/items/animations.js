define(() => {
  return {
    addAnimationWithClassDelete: function (element, classToRemove, classToAdd) {
      element.classList.remove(classToRemove);
      element.classList.add(classToAdd);
    },
    addAnimation: function (element, classToAdd) {
      element.classList.add(classToAdd);
    }
  };
});
