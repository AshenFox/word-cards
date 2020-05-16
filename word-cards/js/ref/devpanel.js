// devpanel
const devpanel = document.querySelector(".devpanel");
const devpanelHeader = document.querySelector(".devpanel__header");
const devpanelBody = document.querySelector(".devpanel__body");

devpanel.onmousedown = function (event) {
  let shiftX = event.clientX - devpanel.getBoundingClientRect().left;
  let shiftY = event.clientY - devpanel.getBoundingClientRect().top;

  moveAt(event.clientX, event.clientY);

  function moveAt(clientX, clientY) {
    devpanel.style.left = clientX - shiftX + "px";
    devpanel.style.top = clientY - shiftY + "px";
  }

  function onMouseMove(event) {
    moveAt(event.clientX, event.clientY);
  }

  document.addEventListener("mousemove", onMouseMove);

  devpanel.onmouseup = function () {
    document.removeEventListener("mousemove", onMouseMove);
    devpanel.onmouseup = null;
  };
};

devpanel.ondragstart = function () {
  return false;
};

function closeDevpan() {
  devpanelBody.classList.toggle("hidden");
}

async function clearCollectoins() {
  try {
    let httpParam = new HttpParam("GET", false, true);
    let response = await fetch(url + "/edit/clearcollections", httpParam);

    console.log(JSON.parse(await response.text()));
  } catch (err) {
    console.log(err);
  }
}

async function studyRegimeTest() {
  let result = await active.studyRegime({ moduleID: active._id });
  console.log(result);
}
