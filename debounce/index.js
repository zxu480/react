
const test = function(...args) {
  console.log(...args);
}

function debounce(func, wait = 0, options = {}) {
  const {leading = false, trailing = true, maxWait} = options;
  let timer = null;
  let lastExecutedTime = 0;

  return function(...args) {
    const now = Date.now();

    clearTimeout(timer);

    if ((leading && !timer) || (maxWait && now - lastExecutedTime >= maxWait)) {
      func.apply(this, args);
      lastExecutedTime = now;
    }

    timer = setTimeout(() => {
      if (trailing && lastExecutedTime !== now) {
        func.apply(this, args);
        lastExecutedTime = Date.now();
      }
      timer = null;
    }, wait);
  };
}

function throttle(func, wait = 0, options = {}) {
  const {leading = true, trailing = true} = options;
  return debounce(func, wait, {leading, trailing, maxWait: wait});
}

const debounced = debounce(test, 1000, {})
const throttled = throttle(test, 1000)
