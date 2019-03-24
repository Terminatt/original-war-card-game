define(() => {
  const infoContainer = document.querySelector(".infoContainer");
  let time = 0;
  let score = 0;
  let clicks = 0;
  let intervalId = null;

  return {
    getTime: function() {
      return time;
    },
    getScore: function() {
      return score;
    },
    getClicks: function() {
      return clicks;
    },
    getAllStats: function() {
      return {
        time: time,
        score: score,
        clicks: clicks
      };
    },
    startTimer: function() {
      intervalId = setInterval(() => {
        time++;
      }, 1000);
    },
    stopTimer: function() {
      clearInterval(intervalId);
    },
    increaseScore: function() {
      score += 100;
    },
    increaseClicks: function() {
      clicks++;
    }
  };
});
