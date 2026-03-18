document.querySelector("body").addEventListener("wheel", (e) => {
    e.preventDefault();
}, {passive: false});

document.addEventListener('mousedown', (e) => {
  if (e.button === 1) { // 1 = middle mouse button
    e.preventDefault();
  }
});

const loadingScreen = document.querySelector(".Loader");
const iframe = document.querySelector(".iframe");
const startButton = document.querySelector(".startButton");
const windows = document.querySelector(".windows");

document.querySelector(".turnon").addEventListener("click", () => {
    startButton.classList.add("displayHide");
    loadingScreen.classList.remove("displayHide");
    setTimeout(() => {
        loadingScreen.classList.add("displayHide");
        windows.classList.remove("displayHide");
    }, 3000);
});

var appBlue;
var activeWindow = 0;
document.querySelectorAll(".app img").forEach((img) => {
    img.addEventListener("click", (e) => {
        e.stopPropagation();
        if(appBlue)
            appBlue.style.background = "transparent";
        appBlue = img;
        img.style.background = "rgba(51, 153, 255, 0.3)";
    });
});

document.querySelector(".apps").addEventListener("click", (e) =>{
    if(appBlue)
        appBlue.style.background = "transparent";
})

document.querySelectorAll(".app img").forEach((app) => {
    app.addEventListener("dblclick", () => {
        activeWindow = document.getElementById(app.id + "Window");
        activeWindow.classList.remove("displayHide");
        if(app.id == "recursion"){
            const recursionIframe = document.createElement("iframe");
            recursionIframe.id = "recursionIframe";
            recursionIframe.src = "https://momanamjad.github.io/Portfolio/";
            // console.log("#" + app.id + "Window" + " .appWindow");
            document.querySelector("#" + app.id + "Window" + " .appWindow").appendChild(recursionIframe);
        }
    });
});

//<iframe id="recursion" src="http://localhost:5173/Portfolio/"></iframe>
// document.querySelector(".appWindow").addEventListener( "wheel", (e) => {
//     e.preventDefault();
//     console.log("daw");
// }, {passive: false});

document.querySelectorAll(".crossButton").forEach((button) => {
    button.addEventListener("click", () => {
        activeWindow.classList.add("displayHide");
        if(activeWindow.id == "recursionWindow"){
            document.getElementById("recursionIframe").remove();
        }
    });
});
