let currentState = {};

const getCurrentState = () => {
  $.getJSON(
    `http://${globals.ip}/json/state`,
    function(data) {
      currentState = data;
      console.log("Got State:", currentState);
      $(".globals-wrapper li").addClass("online");
      $(".dev2 textarea#currentState")[0].value = JSON.stringify(
        currentState,
        null,
        4
      );
    },
    function(data, status, xhr) {
      console.log("RESPONSE", data, status, xhr);
    }
  );
};

const getEffectList = () => {
  $.getJSON(`http://${globals.ip}/json/effect`, function(data) {
    globals.wledEffects = data;
    console.log("Got Effects:", globals.wledEffects);
  });
};
const getPaletteList = () => {
  $.getJSON(`http://${globals.ip}/json/palette`, function(data) {
    globals.wledPalettes = data;
    console.log("Got Palettes:", globals.wledPalettes);
  });
};
getEffectList();
getPaletteList();

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
$("#dev-button5").on("click", () => {
  getEffectList();
  getPaletteList();
});

$("#dev-button3").on("click", () => {
  setLastCheckedState();
});
$("#dev-button4").on("click", () => {
  const newState = $(".dev2 textarea#currentState")[0].value;
  setState(JSON.parse(newState));
});
