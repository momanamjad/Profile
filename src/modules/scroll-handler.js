export function initScrollHandler(state, callbacks) {
  const totalSections = 3;
  let screenShowTimeout;
  let screenHideTimeout;

  function clearLaptopScreenTimers() {
    if (screenShowTimeout) { clearTimeout(screenShowTimeout); screenShowTimeout = undefined; }
    if (screenHideTimeout) { clearTimeout(screenHideTimeout); screenHideTimeout = undefined; }
  }

  function hideLaptopScreen() {
    clearLaptopScreenTimers();
    const div = document.getElementById("saviorOfScrolls");
    if (div) div.classList.remove('screen-on');
    screenHideTimeout = setTimeout(() => {
      if (state.currentSection !== 2) {
        callbacks.setScreenVisible(false);
      }
      screenHideTimeout = undefined;
    }, 700);
  }

  function queueLaptopScreenShow(delay) {
    clearLaptopScreenTimers();
    screenShowTimeout = setTimeout(() => {
      if (state.currentSection === 2) {
        callbacks.setScreenVisible(true);
        const div = document.getElementById("saviorOfScrolls");
        if (div) {
          div.classList.remove('screen-on');
          setTimeout(() => { div.classList.add('screen-on'); }, 10);
        }
      }
      screenShowTimeout = undefined;
    }, delay);
  }

  function updateActiveDot() {
    document.querySelectorAll(".dot").forEach((el, index) => {
      if (index == state.currentSection) {
        el.classList.add("selected");
      } else {
        el.classList.remove("selected");
      }
    });
  }

  window.addEventListener('wheel', (e) => {
    e.preventDefault();
    if (!state.smartphoneMode && !state.timerStarted) {
      state.timerStarted = true;
      state.lastSection = state.currentSection;
      
      if (e.deltaY > 0 && state.currentSection < totalSections - 1) {
        state.currentSection++;
      } else if (e.deltaY < 0 && state.currentSection > 0) {
        state.currentSection--;
      }

      if (state.lastSection != state.currentSection) {
        if (state.currentSection != 2) {
          hideLaptopScreen();
        } else {
          queueLaptopScreenShow(state.laptopInitiated ? 400 : 800);
          state.laptopInitiated = true;
        }
        
        updateActiveDot();
        window.scrollTo({
          top: state.currentSection * window.innerHeight,
          behavior: 'smooth'
        });
      }

      setTimeout(() => {
        state.timerStarted = false;
      }, 1400);
    }
  }, { passive: false });

  document.querySelectorAll(".dot").forEach((el, index) => {
    el.addEventListener("click", () => {
      state.lastSection = state.currentSection;
      state.currentSection = index;
      
      if (state.currentSection != 2) {
        hideLaptopScreen();
      } else {
        queueLaptopScreenShow(state.lastSection == 0 ? 800 : 400);
        state.laptopInitiated = true;
      }

      updateActiveDot();
      window.scrollTo({
        top: state.currentSection * window.innerHeight,
        behavior: 'smooth'
      });
    });
  });

  updateActiveDot();
}
