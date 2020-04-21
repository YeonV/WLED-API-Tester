const globals = {
  ip: '192.168.1.186'
};

const template = {
  template: {
    name: 'template',
    fx: 0,
    extra: '',
    colorOne: 'FF0000',
    colorTwo: 'FFB14A',
    timeInMin: 10,
    brightnessStart: 5,
    brightnessEnd: 255,
    urlString: 'win&FX=0&CL=h00FF0000&C2=h00FFB14A&A=5&NL=10&NT=255&NF=2'
  }
};
const effectsyz = {...template, ...effects};

const setURLonEffect = (effect, el) => {
  effectsyz[
    effect.name
  ].urlString = `http://${globals.ip}/win&FX=${effectsyz[effect.name].fx}&CL=h00${effectsyz[effect.name].colorOne}&C2=h00${effectsyz[effect.name].colorTwo}&A=${effectsyz[effect.name].brightnessStart}&NL=${effectsyz[effect.name].timeInMin}&NT=${effectsyz[effect.name].brightnessEnd}&NF=2${effectsyz[effect.name].extra}`;

  $('.url', el)[0].innerText = effectsyz[effect.name].urlString;
  $('.url', el)[0].href = effectsyz[effect.name].urlString;
  $('.title-url', el)[0].href = effectsyz[effect.name].urlString;
  $('.settings-row a.url', el)[0].innerText = effectsyz[effect.name].urlString;
  $('.settings-row a.url', el)[0].href = effectsyz[effect.name].urlString;
};

const renderEffectList = () => {
  $('#effectlist')[0].innerHTML = Object.keys(effectsyz)
    .map(
      (e, i) => /*html*/ `   
          <div class="effect ${
            effectsyz[e].name === 'template' ? 'template dev' : ''
          }">
        <div class="title">
          <a class="title-url" target="hiddenFrame" href="http://${
            globals.ip
          }/${effectsyz[e].urlString}">${effectsyz[e].name}</a>
          <!--div>
            <a class="url" class="url" target="hiddenFrame" href="http://${
              globals.ip
            }/${effectsyz[e].urlString}"
              >${effectsyz[e].urlString.replace('win', '')}</a
            >
          </div-->
          ${
            effectsyz[e].name === 'template'
              ? ''
              : effectsyz[e].name === 'sunrise'
              ? ''
              : '<div  class="deleteButton dev"><i class="icons">&#xe037;</i></div>'
          }
          
          <div  class="settingsButton">
            <div class="chevron-arrow down"></div>
          </div>
        </div>
        <div class="settings">
            <div class="settings-row">
            <div class="settings-row-group floating mw100">
            <label>URL</label>
                <a class="url" class="url" target="hiddenFrame" href="http://${
                  globals.ip
                }/${effectsyz[e].urlString}"
                >http://${globals.ip}/${effectsyz[e].urlString}</a>
            </div>
            </div>
          <div class="settings-row">
            <div class="settings-row-group floating mw205">
              <label>From</label>
              <i class="icons" style="margin-right: 0.5rem">&#xe2b3;</i><input class="colorPickerOne" type="color" value="#${
                effectsyz[e].colorOne
              }" />
              <i class="icons" style="margin-left: 1rem;margin-right: 0.5rem;">&#xe2a6;</i>
              <input
                class="brightStart"
                type="range"
                min="0"
                max="100"
                value="${effectsyz[e].brightnessStart}"
              />
            </div>
            <div class="settings-row-group floating mw205">
              <label>To</label>
              <i class="icons" style="margin-right: 0.5rem">&#xe2b3;</i>
              <input class="colorPickerTwo" type="color" value="#${
                effectsyz[e].colorTwo
              }" />
             <i class="icons" style="margin-left: 1rem;margin-right: 0.5rem;">&#xe2a6;</i>
              <input
                class="brightEnd"
                type="range"
                min="0"
                max="255"
                value="${effectsyz[e].brightnessEnd}"
              />
            </div>
            <div class="settings-row-group floating mw205">
              <label>Time in Min</label>
              <i class="icons" style="margin-right: 0.5rem">&#xe325;</i>
              <input class="time" type="range" min="1" max="120" value="${
                effectsyz[e].timeInMin
              }" />
            </div>
            
          </div>
          <div class="settings-row">
            <div class="settings-row-group floating">
              <label>FX:</label>
              <i class="icons" style="margin-right: 0.5rem">&#xe409;</i>
              <input style="width: 60px;" class="fx" min="0" max="150" type="number" value="${
                effectsyz[e].fx
              }" />
            </div>
            <div class="settings-row-group floating ml1" style="flex: 1">
              <label>Extra:</label>
              <i class="icons" style="margin-right: 0.5rem">&#xe23d;</i>
              <input class="extra " type="text"  value="${
                effectsyz[e].extra
              }" style="flex: 1" />
            </div>           
            
          </div>
        </div>
      </div>
        `
    )
    .join('');
};

renderEffectList();

/* START Event-Handlers*/

$('#inputIP').each((i, ele) => {
  /* prepared with each if multiple required. (change id to class then) */
  $(ele).on('input', e => {
    globals.ip = e.currentTarget.value;
    $('#effectlist .effect').each((i, element) => {
      const effectName = $('.title-url', element)[0].innerText.toLowerCase();
      setURLonEffect(effectsyz[effectName], element);
    });
  });
});

$(() => {
  const changeHandlers = () => {
    $('.effect').each((i, el) => {
      $(el).on('click', '.title .settingsButton', e => {
        $(el).toggleClass('show');
        $('.settings', el).toggleClass('show');
        $('.chevron-arrow', el).toggleClass('down');
        $('.chevron-arrow', el).toggleClass('up');
      });

      $(el).on('click', '.title .deleteButton', e => {
        const effectName = $('.title-url', el)[0].innerText.toLowerCase();
        const confirmDelete = confirm(
          `Are you sure you want to delete ${effectName}?`
        );
        if (confirmDelete === true) {
          delete effectsyz[effectName];
          console.log('deleting:', effectName);
          renderEffectList();
        }
      });

      $('.time', el).each((i, ele) => {
        $(ele).on('input', e => {
          const effectName = $('.title-url', el)[0].innerText.toLowerCase();
          effectsyz[effectName].timeInMin = e.currentTarget.value;
          setURLonEffect(effectsyz[effectName], el);
        });
      });
      $('.colorPickerOne', el).each((i, ele) => {
        $(ele).on('input', e => {
          const effectName = $('.title-url', el)[0].innerText.toLowerCase();
          effectsyz[effectName].colorOne = e.currentTarget.value
            .replace('#', '')
            .toUpperCase();
          setURLonEffect(effectsyz[effectName], el);
        });
      });
      $('.colorPickerTwo', el).each((i, ele) => {
        $(ele).on('input', e => {
          const effectName = $('.title-url', el)[0].innerText.toLowerCase();
          effectsyz[effectName].colorTwo = e.currentTarget.value
            .replace('#', '')
            .toUpperCase();
          setURLonEffect(effectsyz[effectName], el);
        });
      });
      $('.brightStart', el).each((i, ele) => {
        $(ele).on('input', e => {
          const effectName = $('.title-url', el)[0].innerText.toLowerCase();
          effectsyz[effectName].brightnessStart = e.currentTarget.value;
          setURLonEffect(effectsyz[effectName], el);
        });
      });
      $('.brightEnd', el).each((i, ele) => {
        $(ele).on('input', e => {
          const effectName = $('.title-url', el)[0].innerText.toLowerCase();
          effectsyz[effectName].brightnessEnd = e.currentTarget.value;
          setURLonEffect(effectsyz[effectName], el);
        });
      });
      $('.fx', el).each((i, ele) => {
        $(ele).on('input', e => {
          const effectName = $('.title-url', el)[0].innerText.toLowerCase();
          effectsyz[effectName].fx = e.currentTarget.value;
          setURLonEffect(effectsyz[effectName], el);
        });
      });
      $('.extra', el).each((i, ele) => {
        $(ele).on('input', e => {
          const effectName = $('.title-url', el)[0].innerText.toLowerCase();
          effectsyz[effectName].extra = e.currentTarget.value;
          setURLonEffect(effectsyz[effectName], el);
        });
      });
      $('.dev').each((i, ele) => {
        $(ele).hide();
      });
    });
  };
  changeHandlers();

  $('.save').on('click', e => {
    const userEffectName = prompt('Effect Name', 'Sunrise');

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
          extra: effectsyz[tempOldName].extra
        };
        effectsyz[newName] = tempObj;
        // console.log('SAVED:', effectsyz);
        //$('#inputIP').removeClass('and-dev');
        renderEffectList();
        changeHandlers();
      } else {
        alert('Effect already in List!');
      }
    }
  });
  $('#dev-toggler').on('click', () => {
    $('.dev').each((i, ele) => {
      $(ele).toggle();
    });
    $('#inputIP').toggleClass('and-dev');
  });
  $('#export').on('click', e => {
    // console.log('Exporting:', effectsyz);
    const filtered = Object.filter(
      effectsyz,
      effect => effect.name !== 'template'
    );
    download(
      'effects.js',
      `const effects = ${JSON.stringify(filtered, '\t', 2)}`
    );
  });
});
/* END Event-Handlers*/
