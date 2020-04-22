function download(filename, text) {
  const element = document.createElement('a');
  element.setAttribute(
    'href',
    'data:text/plain;charset=utf-8,' + encodeURIComponent(text)
  );
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}
// function startTimer(duration, display) {
//   var start = Date.now(),
//     diff,
//     minutes,
//     seconds;
//   function timer() {
//     // get the number of seconds that have elapsed since
//     // startTimer() was called
//     diff = duration - (((Date.now() - start) / 1000) | 0);
//     if (diff <= 0) {
//       clearInterval(timer);
//       timer = false;
//     }
//     // does the same job as parseInt truncates the float
//     minutes = (diff / 60) | 0;
//     seconds = diff % 60 | 0;

//     minutes = minutes < 10 ? '0' + minutes : minutes;
//     seconds = seconds < 10 ? '0' + seconds : seconds;

//     display.textContent = minutes + ':' + seconds;

//     if (diff <= 0) {
//       // add one second so that the count down starts at the full duration
//       // example 05:00 not 04:59
//       start = Date.now() + 1000;
//       clearInterval(timer);
//       timer = false;
//     }
//   }

//   // we don't want to wait a full second before the timer starts
//   timer();
//   setInterval(timer, 1000);
// }

function CountDownTimer(duration, granularity) {
  this.duration = duration;
  this.granularity = granularity || 1000;
  this.tickFtns = [];
  this.running = false;
}

CountDownTimer.prototype.start = function() {
  if (this.running) {
    return;
  }
  this.running = true;
  var start = Date.now(),
    that = this,
    diff,
    obj;

  (function timer() {
    diff = that.duration - (((Date.now() - start) / 1000) | 0);

    if (diff > 0) {
      setTimeout(timer, that.granularity);
      if (isRunning) {
      }
    } else {
      diff = 0;
      that.running = false;
    }

    obj = CountDownTimer.parse(diff);
    that.tickFtns.forEach(function(ftn) {
      ftn.call(this, obj.minutes, obj.seconds);
    }, that);
  })();
};

CountDownTimer.prototype.onTick = function(ftn) {
  if (typeof ftn === 'function') {
    this.tickFtns.push(ftn);
  }
  return this;
};

CountDownTimer.prototype.expired = function() {
  return !this.running;
};

CountDownTimer.parse = function(seconds) {
  return {
    minutes: (seconds / 60) | 0,
    seconds: seconds % 60 | 0
  };
};

Object.filter = (obj, predicate) =>
  Object.keys(obj)
    .filter(key => predicate(obj[key]))
    .reduce((res, key) => ((res[key] = obj[key]), res), {});
