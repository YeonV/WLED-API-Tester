const globals = {
  ip: "192.168.1.186"
};

const template = {
  template: {
    name: "template",
    fx: 0,
    fxSpeed: 128,
    extra: "&NF=2",
    colorOne: "FF0000",
    colorTwo: "FFB14A",
    timeInMin: 10,
    brightnessStart: 5,
    brightnessEnd: 255,
    urlString: `http://${globals.ip}/win&FX=0&SX=128&CL=h00FF0000&C2=h00FFB14A&A=5&NL=10&NT=255&NF=2`,
    useFX: true,
    useSX: true,
    useCL: true,
    useC2: true,
    useA: true,
    useNL: true,
    useNT: true,
    useEXTRA: true
  }
};
const effectsyz = { ...template, ...effects };

const setURLonEffect = (effect, el) => {
  effectsyz[effect.name].urlString = `http://${globals.ip}/win${
    effectsyz[effect.name].useFX ? `&FX=${effectsyz[effect.name].fx}` : ``
  }${
    effectsyz[effect.name].useSX ? `&SX=${effectsyz[effect.name].fxSpeed}` : ``
  }${
    effectsyz[effect.name].useCL
      ? `&CL=h00${effectsyz[effect.name].colorOne}`
      : ``
  }${
    effectsyz[effect.name].useC2
      ? `&C2=h00${effectsyz[effect.name].colorTwo}`
      : ``
  }${
    effectsyz[effect.name].useA
      ? `&A=${effectsyz[effect.name].brightnessStart}`
      : ``
  }${
    effectsyz[effect.name].useNL
      ? `&NL=${effectsyz[effect.name].timeInMin}`
      : ``
  }${
    effectsyz[effect.name].useNT
      ? `&NT=${effectsyz[effect.name].brightnessEnd}`
      : ``
  }${effectsyz[effect.name].useEXTRA ? `${effectsyz[effect.name].extra}` : ``}`;

  $(".url", el)[0].innerText = effectsyz[effect.name].urlString;
  $(".url", el)[0].href = effectsyz[effect.name].urlString;
  $(".title-url", el)[0].href = effectsyz[effect.name].urlString;
  $(".settings-row a.url", el)[0].innerText = effectsyz[effect.name].urlString;
  $(".settings-row a.url", el)[0].href = effectsyz[effect.name].urlString;
};

const renderEffectList = (effectList, filterString) => {
  $("#effectlist")[0].innerHTML = (filterString
    ? Object.keys(effectList)
        .filter(p => p.toLowerCase() !== "template")
        .filter(p => p.toLowerCase().includes(filterString.toLowerCase()))
    : Object.keys(effectList)
  )
    .map(
      (e, i) => /*html*/ `   
          <div class="effect ${
            effectList[e].name === "template" ? "template dev" : ""
          }">
        <div class="title">
          <a class="title-url" target="hiddenFrame" href="http://${
            globals.ip
          }/${effectList[e].urlString}">${
        effectList[e].name
      }<span class="countdown"></span></a>      
          ${
            effectList[e].name === "template"
              ? ""
              : effectList[e].name === "sunrise"
              ? ""
              : '<div  class="deleteButton dev"><i class="icons">&#xe037;</i></div>'
          }
          
          <div  class="settingsButton">
            <div class="chevron-arrow down"></div>
          </div>
        </div>
        <div class="settings">
            <div class="settings-row">
            <div class="settings-row-group floating mw100">
            <label class="floating">URL</label>
                <a class="url" class="url" target="hiddenFrame" href="${
                  effectList[e].urlString
                }"
                >${effectList[e].urlString}</a>
            </div>
            </div>
          <div class="settings-row">
            <div class="settings-row-group floating mw205">
              <label class="floating">From</label>
              
              <i class="icons ${
                effectList[e].useCL ? "active" : ""
              } cl" style="margin-right: 0.5rem">&#xe2b3;</i>
      
              
              <input class="colorPickerOne" type="color" value="#${
                effectList[e].colorOne
              }" />
              <i class="icons ${
                effectList[e].useA ? "active" : ""
              } brightnessA" style="margin-left: 1rem;margin-right: 0.5rem;">&#xe2a6;</i>
              <input
                class="brightStart"
                type="range"
                min="0"
                max="255"
                value="${effectList[e].brightnessStart}"
              />
            </div>
            <div class="settings-row-group floating mw205">
              <label class="floating">To</label>
              <i class="icons ${
                effectList[e].useC2 ? "active" : ""
              } c2" style="margin-right: 0.5rem">&#xe2b3;</i>
              <input class="colorPickerTwo" type="color" value="#${
                effectList[e].colorTwo
              }" />
             <i class="icons ${
               effectList[e].useNT ? "active" : ""
             } brightnessB" style="margin-left: 1rem;margin-right: 0.5rem;">&#xe2a6;</i>
              <input
                class="brightEnd"
                type="range"
                min="0"
                max="255"
                value="${effectList[e].brightnessEnd}"
              />
            </div>
            <div class="settings-row-group floating mw205">
              <label class="floating">Time in Min</label>
              <i class="icons ${
                effectList[e].useNL ? "active" : ""
              } nl" style="margin-right: 0.5rem">&#xe325;</i>
              <input class="time" type="range" min="1" max="120" value="${
                effectList[e].timeInMin
              }" />
            </div>
            
          </div>
          <div class="settings-row">
            <div class="settings-row-group floating">
              <label class="floating">FX:</label>
              <i class="icons ${
                effectList[e].useFX ? "active" : ""
              } fx" style="margin-right: 0.5rem">&#xe409;</i>
              <input style="width: 60px;" class="fx" min="0" max="150" type="number" value="${
                effectList[e].fx
              }" />

              <i class="icons ${
                effectList[e].useSX ? "active" : ""
              } sx" style="margin-left: 1rem;margin-right: 0.5rem;">&#xe325;</i>
              <input
                class="fxSpeed"
                type="range"
                min="0"
                max="255"
                value="${effectList[e].fxSpeed}"
              />
            </div>
          
            <div class="settings-row-group floating ml1" style="flex: 1">
              <label class="floating">Extra:</label>
              <i class="icons ${
                effectList[e].useEXTRA ? "active" : ""
              } extra" style="margin-right: 0.5rem">&#xe23d;</i>
              <input class="extra " type="text"  value="${
                effectList[e].extra
              }" style="flex: 1" />
            </div>           
            
          </div>
        </div>
      </div>
        `
    )
    .join("");
};

renderEffectList(effectsyz);

/* START Event-Handlers*/

$("#inputIP").each((i, ele) => {
  /* prepared with each if multiple required. (change id to class then) */
  $(ele).focusout(() => {
    getCurrentState();
  });
  $(ele).keypress(e => {
    if (e.which === 13) {
      $(ele).blur();
    }
  });
  $(ele).on("input", e => {
    globals.ip = e.currentTarget.value;
    $("#effectlist .effect").each((i, element) => {
      const effectName = $(".title-url", element)[0].innerText.toLowerCase();
      setURLonEffect(effectsyz[effectName], element);
    });
  });
});

$(() => {
  getCurrentState();

  const changeHandlers = () => {
    let timer2 = null;
    let isRunning = false;
    $(".effect").each((i, el) => {
      $(el).on("click", ".title .settingsButton", e => {
        $(el).toggleClass("show");
        $(".settings", el).toggleClass("show");
        $(".chevron-arrow", el).toggleClass("down");
        $(".chevron-arrow", el).toggleClass("up");
      });
      $(el).on("click", ".settings-row-group.floating i", e => {
        const effectName = $(".title-url", el)[0].innerText.toLowerCase();
        const cl = $(e.currentTarget).hasClass("cl");
        const brightnessA = $(e.currentTarget).hasClass("brightnessA");
        const c2 = $(e.currentTarget).hasClass("c2");
        const brightnessB = $(e.currentTarget).hasClass("brightnessB");
        const nl = $(e.currentTarget).hasClass("nl");
        const sx = $(e.currentTarget).hasClass("sx");
        const fx = $(e.currentTarget).hasClass("fx");
        const extra = $(e.currentTarget).hasClass("extra");
        $(e.currentTarget).toggleClass("active");
        if (cl) {
          effectsyz[effectName].useCL = $(e.currentTarget).hasClass("active");
        }
        if (brightnessA) {
          effectsyz[effectName].useA = $(e.currentTarget).hasClass("active");
        }
        if (c2) {
          effectsyz[effectName].useC2 = $(e.currentTarget).hasClass("active");
        }
        if (brightnessB) {
          effectsyz[effectName].useNT = $(e.currentTarget).hasClass("active");
        }
        if (nl) {
          effectsyz[effectName].useNL = $(e.currentTarget).hasClass("active");
        }
        if (nl) {
          effectsyz[effectName].useNL = $(e.currentTarget).hasClass("active");
        }
        if (sx) {
          effectsyz[effectName].useSX = $(e.currentTarget).hasClass("active");
        }
        if (fx) {
          effectsyz[effectName].useFX = $(e.currentTarget).hasClass("active");
        }
        if (extra) {
          effectsyz[effectName].useEXTRA = $(e.currentTarget).hasClass(
            "active"
          );
        }
        setURLonEffect(effectsyz[effectName], el);
      });

      $(el).on("click", ".title a.title-url", e => {
        const timer = $("input.time", el)[0].value * 60;
        const display = $("span.countdown", el)[0];

        if (timer2 && timer2.running && isRunning) {
          timer2.stop();
          isRunning = false;
          $(".effect").each((i, element) => {
            $(element).removeClass("active");
          });
          setLastCheckedState();
        } else {
          if (isRunning) {
            timer2.stop();
            isRunning = false;
            $(".effect").each((i, element) => {
              $(element).removeClass("active");
            });
            setLastCheckedState();
          }
          timer2 = new CountDownTimer(timer);
          $(el).addClass("active");
          isRunning = true;
          timer2
            .onTick(format(display))
            .onTick(checkExpired)
            .start();
        }

        function checkExpired() {
          if (this.expired()) {
            $(el).removeClass("active");
          } else {
          }
        }

        function format(display) {
          return function(minutes, seconds) {
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            display.textContent = minutes + ":" + seconds;
          };
        }
      });

      $(el).on("click", ".title .deleteButton", e => {
        const effectName = $(".title-url", el)[0].innerText.toLowerCase();
        const confirmDelete = confirm(
          `Are you sure you want to delete ${effectName}?`
        );
        if (confirmDelete === true) {
          delete effectsyz[effectName];
          // console.log("deleting:", effectName);
          renderEffectList(effectsyz);
        }
      });

      $(".time", el).each((i, ele) => {
        $(ele).on("input", e => {
          const effectName = $(".title-url", el)[0].innerText.toLowerCase();
          effectsyz[effectName].timeInMin = e.currentTarget.value;
          setURLonEffect(effectsyz[effectName], el);
        });
      });
      $(".colorPickerOne", el).each((i, ele) => {
        $(ele).on("input", e => {
          const effectName = $(".title-url", el)[0].innerText.toLowerCase();
          effectsyz[effectName].colorOne = e.currentTarget.value
            .replace("#", "")
            .toUpperCase();
          setURLonEffect(effectsyz[effectName], el);
        });
      });
      $(".colorPickerTwo", el).each((i, ele) => {
        $(ele).on("input", e => {
          const effectName = $(".title-url", el)[0].innerText.toLowerCase();
          effectsyz[effectName].colorTwo = e.currentTarget.value
            .replace("#", "")
            .toUpperCase();
          setURLonEffect(effectsyz[effectName], el);
        });
      });
      $(".brightStart", el).each((i, ele) => {
        $(ele).on("input", e => {
          const effectName = $(".title-url", el)[0].innerText.toLowerCase();
          effectsyz[effectName].brightnessStart = e.currentTarget.value;
          setURLonEffect(effectsyz[effectName], el);
        });
      });
      $(".brightEnd", el).each((i, ele) => {
        $(ele).on("input", e => {
          const effectName = $(".title-url", el)[0].innerText.toLowerCase();
          effectsyz[effectName].brightnessEnd = e.currentTarget.value;
          setURLonEffect(effectsyz[effectName], el);
        });
      });
      $(".fx", el).each((i, ele) => {
        $(ele).on("input", e => {
          const effectName = $(".title-url", el)[0].innerText.toLowerCase();
          effectsyz[effectName].fx = e.currentTarget.value;
          setURLonEffect(effectsyz[effectName], el);
        });
      });
      $(".fxSpeed", el).each((i, ele) => {
        $(ele).on("input", e => {
          const effectName = $(".title-url", el)[0].innerText.toLowerCase();
          effectsyz[effectName].fxSpeed = e.currentTarget.value;
          setURLonEffect(effectsyz[effectName], el);
        });
      });
      $(".extra", el).each((i, ele) => {
        $(ele).on("input", e => {
          const effectName = $(".title-url", el)[0].innerText.toLowerCase();
          effectsyz[effectName].extra = e.currentTarget.value;
          setURLonEffect(effectsyz[effectName], el);
        });
      });
      $(".dev").each((i, ele) => {
        $(ele).hide();
      });
      $("#inputIP").removeClass("and-dev");
    });
  };
  changeHandlers();

  $(".save").on("click", e => {
    const userEffectName = prompt("Effect Name", "Sunrise");

    if (userEffectName !== null) {
      if (!Object.keys(effectsyz).includes(userEffectName.toLowerCase())) {
        const newName = userEffectName.toLowerCase();
        const tempOldName = Object.keys(effectsyz)[0];
        const tempObj = {
          name: newName,
          colorOne: effectsyz[tempOldName].colorOne,
          colorTwo: effectsyz[tempOldName].colorTwo,
          timeInMin: effectsyz[tempOldName].timeInMin,
          brightnessStart: effectsyz[tempOldName].brightnessStart,
          brightnessEnd: effectsyz[tempOldName].brightnessEnd,
          urlString: effectsyz[tempOldName].urlString,
          fx: effectsyz[tempOldName].fx,
          fxSpeed: effectsyz[tempOldName].fxSpeed,
          extra: effectsyz[tempOldName].extra,
          useCL: effectsyz[tempOldName].useCL,
          useA: effectsyz[tempOldName].useA,
          useC2: effectsyz[tempOldName].useC2,
          useNT: effectsyz[tempOldName].useNT,
          useFX: effectsyz[tempOldName].useFX,
          useSX: effectsyz[tempOldName].useSX,
          useEXTRA: effectsyz[tempOldName].useEXTRA
        };
        effectsyz[newName] = tempObj;
        console.log("SAVED:", effectsyz);
        $("#inputIP").removeClass("and-dev");
        renderEffectList(effectsyz);
        changeHandlers();
      } else {
        alert("Effect already in List!");
      }
    }
  });
  $("#searchInput").each((i, ele) => {
    /* prepared with each if multiple required. (change id to class then) */
    $(ele).on("input", e => {
      renderEffectList(effectsyz, e.currentTarget.value);
      $(".effect.template.dev").each((i, element) => {
        $("#inputIP").hasClass("and-dev") ? false : false;
      });
      changeHandlers();
    });
  });
  $("#dev-toggler").on("click", () => {
    $(".dev").each((i, ele) => {
      $(ele).toggle();
    });
    $("#inputIP").toggleClass("and-dev");
  });

  $("#export").on("click", e => {
    // console.log('Exporting:', effectsyz);
    const filtered = Object.filter(
      effectsyz,
      effect => effect.name !== "template"
    );
    download(
      "effects.js",
      `const effects = ${JSON.stringify(filtered, "\t", 2)}`
    );
  });
});
/* END Event-Handlers*/
