let currentState = {};

const getCurrentState = () => {
  $.getJSON(`http://${globals.ip}/json/state`, function(data) {
    currentState = data;
    console.log("Got State:", currentState);
    $(".dev2 textarea#currentState")[0].value = JSON.stringify(
      currentState,
      null,
      4
    );
  });
};

const setLastCheckedState = () => {
  console.log("Setting Last Current State");
  setState(currentState);
};
const setState = state => {
  console.log("Setting State:", state);
  $.ajax({
    type: "POST",
    url: `http://${globals.ip}/json/state`,
    async: true,
    timeout: 1000,
    data: JSON.stringify(state),
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

$("#dev-button2 , #json-get-current").on("click", () => {
  getCurrentState();
});

$("#dev-button3").on("click", () => {
  setLastCheckedState();
});
$("#dev-button4").on("click", () => {
  const newState = $(".dev2 textarea#currentState")[0].value;
  setState(JSON.parse(newState));
});
