let currentState = {};

const getCurrentState = () => {
  $.getJSON(`http://${globals.ip}/json/state`, function(data) {
    currentState = data;
    console.log("Got State:", currentState);
  });
};

const setLastCheckedState = () => {
  console.log("Setting State:", currentState);
  $.ajax({
    type: "POST",
    url: `http://${globals.ip}/json/state`,
    async: true,
    timeout: 1000,
    data: JSON.stringify(currentState),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(data) {
      console.log("State set", data);
    },
    failure: function(errMsg) {
      alert(errMsg);
    }
  });
};

$("#dev-button2").on("click", () => {
  getCurrentState();
});

$("#dev-button3").on("click", () => {
  setLastCheckedState();
});
