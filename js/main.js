// show sitting
let showSet = document.querySelector(".gear-container");
let setting = document.querySelector(".setting");
let iconGear = document.getElementById("set");
showSet.addEventListener("click", function () {
  setting.classList.toggle("open");
  iconGear.classList.toggle("fa-spin");
  showSet.classList.toggle("clicked");
});

// change page color
const colorLi = document.querySelectorAll(".color-list li");
if (window.localStorage.getItem("color") !== null) {
  document.documentElement.style.setProperty(
    "--main-color",
    window.localStorage.getItem("color")
    // e.target.dataset.color => elzero
  );

  colorLi.forEach((li) => {
    li.classList.remove("active");
    if (
      li.getAttribute("data-color") === window.localStorage.getItem("color")
    ) {
      li.classList.add("active");
    }
  });
}

colorLi.forEach((li) => {
  li.addEventListener("click", (e) => {
    colorLi.forEach((li) => {
      li.classList.remove("active");
    });
    e.target.classList.add("active");
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.getAttribute("data-color")
      // e.target.dataset.color => elzero
    );
    window.localStorage.setItem("color", e.target.getAttribute("data-color"));
  });
});

// change background
let landBack = document.querySelector(".landing");
let imgArr = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];
let backgroundOption = true;
let backInterval;
function randmizeImgs() {
  if (backgroundOption === true) {
    backInterval = setInterval(function () {
      let rand = Math.floor(Math.random() * imgArr.length);
      landBack.style.backgroundImage = `url(images/${imgArr[rand]})`;
    }, 10000);
  }
}
// change background option
if (window.localStorage.getItem("background") !== null) {
  if (window.localStorage.getItem("background") === "yes") {
    backgroundOption = true;
  } else backgroundOption = false;
}
randmizeImgs();

const randomBack = document.querySelectorAll(".random-background span");
randomBack.forEach(function (span) {
  span.addEventListener("click", (e) => {
    randomBack.forEach((span) => {
      span.classList.remove("active");
    });
    e.target.classList.add("active");
    if (e.target.dataset.background === "yes") {
      if (backgroundOption === false) {
        backgroundOption = true;
        randmizeImgs();
      }
    } else {
      backgroundOption = false;
      clearInterval(backInterval);
    }
    window.localStorage.setItem("background", e.target.dataset.background);
  });
  if (
    span.dataset.background ===
    window.localStorage.getItem("background", span.dataset.background)
  ) {
    randomBack.forEach((span) => {
      span.classList.remove("active");
    });
    span.classList.add("active");
  }
});

// scroll on skills
let ourSkills = document.querySelector(".skills");
let spanProgress = document.querySelectorAll(".skill-progress span");
window.onscroll = function () {
  let skillsOffsetTop = ourSkills.offsetTop;
  let skillsHeight = ourSkills.offsetHeight;
  let windowHeight = this.innerHeight;
  let windowTop = this.pageYOffset;
  if (windowTop > skillsOffsetTop + skillsHeight - windowHeight - 1) {
    spanProgress.forEach((span) => {
      span.style.width = span.dataset.progress;
    });
  }
};

// gallary images
let imagesPop = document.querySelectorAll(".gallary img");
imagesPop.forEach((img) => {
  img.addEventListener("click", function (e) {
    let popupOverlay = document.createElement("div");
    popupOverlay.className = "popup-overlay";
    document.body.appendChild(popupOverlay);
    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";
    let popupImage = document.createElement("img");
    popupImage.src = img.src;
    popupImage.className = "popup-image";
    popupBox.appendChild(popupImage);
    document.body.appendChild(popupBox);

    let closeImage = document.createElement("i");
    closeImage.className = "close-image";
    closeImage.classList.add("fa-solid", "fa-x");
    document.body.appendChild(closeImage);
    let btnClose = document.querySelector(".close-image");
    btnClose.onclick = function () {
      popupOverlay.remove();
      popupBox.remove();
      btnClose.remove();
    };
  });
});

//bullets
goto(document.querySelectorAll(".bullets"));

// enhance navbar
let allLinks = document.querySelectorAll(".landing .links a");
goto(allLinks);
allLinks.forEach((link) => {
  link.addEventListener("click", () => {
    allLinks.forEach((link) => {
      link.classList.remove("active");
    });
    link.classList.add("active");
  });
});

//show and hide bullets
let bulletsSpan = document.querySelectorAll(".bullets-option span");
let navBullets = document.querySelector(".nav-bullets");
if (window.localStorage.getItem("bullets") != null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });
  if (window.localStorage.getItem("bullets") === "show") {
    navBullets.style.display = "flex";
    bulletsSpan.forEach((span) => {
      if (span.dataset.display === "show") span.classList.add("active");
    });
  } else {
    navBullets.style.display = "none";
    bulletsSpan.forEach((span) => {
      if (span.dataset.display === "hide") span.classList.add("active");
    });
  }
}
bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    bulletsSpan.forEach((span) => {
      span.classList.remove("active");
    });
    span.classList.add("active");
    if (e.target.dataset.display === "show") {
      navBullets.style.display = "flex";
    } else navBullets.style.display = "none";
    window.localStorage.setItem("bullets", span.dataset.display);
  });
});

//function to go to some where
function goto(elemrnts) {
  elemrnts.forEach((ele) => {
    ele.addEventListener("click", function (e) {
      e.preventDefault();
      // console.log(e.target.dataset.section);
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

// reset setting
let reset = document.querySelector(".reset");
reset.onclick = function () {
  localStorage.clear();
  window.location.reload();
};

// toggle menu
let toggle = document.querySelector(".toggle-menu");
let links = document.querySelector(".landing .links");
toggle.addEventListener("click", function (e) {
  e.stopPropagation();
  links.classList.toggle("open");
  links.parentElement.classList.toggle("zind");
  this.classList.toggle("active");
  if (setting.classList.contains("open")) {
    setting.classList.toggle("open");
    iconGear.classList.toggle("fa-spin");
    showSet.classList.toggle("clicked");
  }
});
links.onclick = function (e) {
  e.stopPropagation();
};
document.addEventListener("click", (e) => {
  if (e.target !== links && e.target !== toggle) {
    if (links.classList.contains("open")) {
      links.classList.remove("open");
      toggle.classList.remove("active");
      links.parentElement.classList.toggle("zind");
    }
  }
});
