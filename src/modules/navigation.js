const phoneTransitionTimeouts = [];

function clearPhoneTransitionTimeouts() {
  while (phoneTransitionTimeouts.length) {
    clearTimeout(phoneTransitionTimeouts.pop());
  }
}

function schedulePhoneTransition(callback, delay) {
  const timeoutId = setTimeout(() => {
    const timeoutIndex = phoneTransitionTimeouts.indexOf(timeoutId);
    if (timeoutIndex >= 0) {
      phoneTransitionTimeouts.splice(timeoutIndex, 1);
    }
    callback();
  }, delay);

  phoneTransitionTimeouts.push(timeoutId);
  return timeoutId;
}

export function initNavigation(state) {
  const horizontalPhoneDOM = document.getElementById("horizontalPhoneScreen");
  const moonContent = document.getElementById("moonContent");
  const scrollTeller = document.getElementById("scrollTeller");
  const loadingScreen = document.getElementById("loading");
  const screenContent = document.getElementById("screenContent");
  const curtains = document.querySelector(".curtains");
  const leftCurtain = document.querySelector(".leftHalf");
  const rightCurtain = document.querySelector(".rightHalf");
  const homeSection = document.getElementById("homeSection");

  function resetPhoneOverlayState() {
    loadingScreen.classList.remove("hidden");
    loadingScreen.style.display = "";
    screenContent.classList.add("displayHide");
    curtains.classList.add("displayHide");
    curtains.style.display = "";
    leftCurtain.classList.remove("hoverLeft");
    rightCurtain.classList.remove("hoverRight");
    horizontalPhoneDOM.classList.add("displayHide");
    horizontalPhoneDOM.style.opacity = "0";
    horizontalPhoneDOM.style.pointerEvents = "none";
  }

  resetPhoneOverlayState();

  window.PhoneFullscreenModeSwitch = () => {
    if ((!state.phoneFullscreen && !state.nophonefullscreen) || (!state.phoneFullscreen && state.nophonefullscreen)) {
      state.smartphoneMode = true;
      state.phoneFullscreen = true;
      state.nophonefullscreen = false;
      clearPhoneTransitionTimeouts();
      resetPhoneOverlayState();
      
      moonContent.classList.add("hidden");
      scrollTeller.classList.add("hidden");

      schedulePhoneTransition(() => {
        horizontalPhoneDOM.classList.remove("displayHide");
        schedulePhoneTransition(() => {
          horizontalPhoneDOM.style.opacity = "1";
          horizontalPhoneDOM.style.pointerEvents = "auto";
        }, 50);
      }, 1200);

      schedulePhoneTransition(() => {
        moonContent.classList.add("displayHide");
        scrollTeller.classList.add("displayHide");
      }, 500);

      schedulePhoneTransition(() => {
        loadingScreen.classList.add("hidden");
      }, 1800);
      schedulePhoneTransition(() => {
        loadingScreen.style.display = "none";
        screenContent.classList.remove("displayHide");
        homeSection.classList.remove("displayHide");
        curtains.classList.remove("displayHide");
      }, 2400);
      schedulePhoneTransition(() => {
        rightCurtain.classList.add("hoverRight");
        leftCurtain.classList.add("hoverLeft");
      }, 2600);
      schedulePhoneTransition(() => {
        curtains.style.display = "none";
      }, 3600);

    } else {
      state.smartphoneMode = false;
      state.phoneFullscreen = false;
      state.nophonefullscreen = true;
      clearPhoneTransitionTimeouts();
      scrollTeller.classList.remove("hidden");
      moonContent.classList.remove("hidden");
      horizontalPhoneDOM.style.opacity = "0";
      horizontalPhoneDOM.style.pointerEvents = "none";
      
      schedulePhoneTransition(() => {
        resetPhoneOverlayState();
        scrollTeller.classList.remove("displayHide");
        moonContent.classList.remove("displayHide");
      }, 1200);
    }
  };

  let currentView = homeSection;
  window.changeScene = (to) => {
    currentView.classList.add("displayHide");
    currentView = document.getElementById(to);
    currentView.classList.remove("displayHide");
  };
}
