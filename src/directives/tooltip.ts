function throttle(func, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

export default {
  mounted(el, binding) {
    el.setAttribute('data-tooltip', binding.value);
    el.classList.add('tooltip');

    const updatePosition = throttle((e) => {
      el.style.setProperty('--tooltip-x', `${e.clientX}px`);
      el.style.setProperty('--tooltip-y', `${e.clientY}px`);
    }, 16);

    el._tooltipHandler = updatePosition;
    el.addEventListener('mousemove', updatePosition);
  },

  updated(el, binding) {
    el.setAttribute('data-tooltip', binding.value);
  },

  unmounted(el) {
    if (el._tooltipHandler) {
      el.removeEventListener('mousemove', el._tooltipHandler);
    }
  },
};
