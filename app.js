// searchBtn
const searchBtn = document.querySelector("#search-btn");
const navSearch = document.querySelector(".header-nav__search");

window.onscroll = () => {
  searchBtn.classList.remove("fa-times");
  navSearch.classList.remove("active");
  navMenu.classList.remove("active");
  searchListAll.classList.remove("active")
}

searchBtn.addEventListener("click", () => {
  searchBtn.classList.toggle("fa-times");
  searchListAll.classList.remove("active");
  navSearch.classList.toggle("active");
});

// Todolists in Searchbar
const searchBar = document.querySelector("#search-bar")
const searchList = document.querySelector(".search-list")
const searchListAll = document.querySelector(".search-list__all")
const searchIcon = document.querySelector(".search-icon > i")
const removeBtn = document.querySelector('.search-list__remove')
const listItem = document.querySelector('.search-list ul li')

searchBar.addEventListener("focus", () => {
  searchListAll.classList.add("active")
})

let lists = getListFromLocalStorage()
renderLists(lists)

searchBar.addEventListener("keypress", (event) => {
  if (event.key == "Enter") {
    searchEvent()
  }
})

searchIcon.addEventListener("click", (e) => {
  e.preventDefault()
  searchEvent()
})

function searchEvent() {
  searchIcon.classList.add("fa-search")
  if (!searchBar.value) {
    alert("Please enter this field")
    listItem.classList.add("hide")
    renderLists("")
  }
  lists = getListFromLocalStorage()

  let listId = searchIcon.getAttribute("id")
  if (listId) {
    lists[listId] = searchBar.value
    searchIcon.removeAttribute("id")
  } else {
    lists.push(searchBar.value)
  }

  setListIntoLocalStorage()
  renderLists(lists)
  searchBar.value = ""
  searchBar.focus()
}

removeBtn.addEventListener("click", () => {
  localStorage.removeItem("lists")
})

function editList(id) {
  lists = getListFromLocalStorage()
  searchBar.value = lists[id]
  searchBar.focus()
  searchIcon.setAttribute("id", id)
  searchIcon.classList.remove("fa-search")
  searchIcon.classList.add("fa-pen")
}

function deleteList(id) {
  lists = getListFromLocalStorage()
  lists.splice(id, 1)
  setListIntoLocalStorage()
  renderLists(lists)
}

function renderLists(lists) {
  result = "<ul>"
  lists.forEach((list, index) => {
    return result +=
      `<li>
          <h3>${list}</h3>
          <i class="fas fa-edit list-edit" onClick={editList(${index})}></i>
          <i class="fas fa-trash list-trash" onClick={deleteList(${index})}></i>
       </li>`
  })
  result += "</ul>"
  searchList.innerHTML = result;
}

function setListIntoLocalStorage() {
  return localStorage.setItem("lists", JSON.stringify(lists))
}

function getListFromLocalStorage() {
  return localStorage.getItem("lists") ? JSON.parse(localStorage.getItem("lists")) : []
}

// End: Todolists in Searchbar

// click event: validator
let userModal = document.querySelector(".user-modal");
let userBtn = document.querySelector("#user-btn");
let loginFormContainer = document.querySelector(".login-form__container");

userBtn.addEventListener("click", () => {
  userBtn.style.color = "var(--red-color)"
  userModal.classList.add("open");
})
userModal.addEventListener("click", () => {
  userModal.classList.remove("open");
  userBtn.style.color = "var(--white-color)"
})
loginFormContainer.addEventListener("click", (event) => {
  event.stopPropagation();
});

// end-click event: validator
// start: validate for login & signup
const loginBtn = document.querySelector(".login-btn");
const signupBtn = document.querySelector(".signup-btn");
const formSignup = document.querySelector(".form-signup");
const formLogin = document.querySelector(".form-login");

const userformBtns = document.querySelectorAll(".userform-btn");

userformBtns.forEach((userformBtn, index) => {
  const userforms = document.querySelectorAll(".userform");
  const userformBtnActive = document.querySelector(".userform-btn.active");

  const userform = userforms[index];
  userformBtn.onclick = function () {
    document.querySelector(".userform-btn.active").classList.remove("active");
    document.querySelector(".userform.active").classList.remove("active");

    this.classList.add("active");
    userform.classList.add("active");

  }

});

// validate login & sign up
const formControls = document.querySelectorAll(".form-control");

formControls.forEach((formControl) => {

  formControl.onblur = function () {
    const passwordLog = document.querySelector("#password-log");
    const username = document.querySelector("#username");
    const usernameValue = username.value.trim();
    const passwordLogValue = passwordLog.value.trim();
    //  username
    if (usernameValue === "") {
      formError(username, "Please enter your fullname");
    } else {
      formSuccess(username);
    }

    //   password
    if (passwordLogValue === "") {
      formError(passwordLog, "Please enter your password");
    } else if (passwordLogValue.length < 8) {
      formError(passwordLog, "Please enter at least 8 characters");
    } else {
      formSuccess(passwordLog);
    }

    const email = document.querySelector("#email");
    const password1 = document.querySelector("#password1");
    const password2 = document.querySelector("#password2");
    // const passwords = document.querySelectorAll(".password");
    const fullName = document.querySelector("#fullname");
    const fullNameValue = fullName.value.trim();
    const emailValue = email.value.trim();
    const password1Value = password1.value.trim();
    const password2Value = password2.value.trim();
    //   fullname
    if (fullNameValue === "") {
      formError(fullName, "Please enter your fullname");
    } else {
      formSuccess(fullName);
    }
    //   email
    if (emailValue === "") {
      formError(email, "Please enter your email")
    }
    else if (!isEmail(emailValue)) {
      formError(email, "Your email is not valid");
    }
    else {
      formSuccess(email);
    }

    //   password
    if (password1Value === "") {
      formError(password1, "Please enter your password");
    } else if (password1Value.length < 8) {
      formError(password1, "Please enter at least 8 characters");
    } else {
      formSuccess(password1);
    }
    //   repeat password
    if (password2Value === "") {
      formError(password2, "Please enter your password");
    } else if (password1Value.length < 8) {
      formError(password2, "Please enter at least 8 characters");
    } else if (password2Value !== password1Value) {
      formError(password2, "Your password does not match")
    } else {
      formSuccess(password2);
    }

  }
  formControl.oninput = function () {
    formNormal(formControl);
  }
  formControl.onclick = function () {
    formNormal(formControl);
  }
});

formLogin.addEventListener("submit", (el) => {

  el.preventDefault();

  const passwordLog = document.querySelector("#password-log");
  const username = document.querySelector("#username");
  const usernameValue = username.value.trim();
  const passwordLogValue = passwordLog.value.trim();
  //  username
  if (usernameValue === "") {
    formError(username, "Please enter your fullname");
  } else {
    formSuccess(username);
  }

  //   password
  if (passwordLogValue === "") {
    formError(passwordLog, "Please enter your password");
  } else if (passwordLogValue.length < 8) {
    formError(passwordLog, "Please enter at least 8 characters");
  } else {
    formSuccess(passwordLog);
  }

});


formSignup.addEventListener("submit", (e) => {

  e.preventDefault();
  const email = document.querySelector("#email");
  const password1 = document.querySelector("#password1");
  const password2 = document.querySelector("#password2");
  const fullName = document.querySelector("#fullname");
  const fullNameValue = fullName.value.trim();
  const emailValue = email.value.trim();
  const password1Value = password1.value.trim();
  const password2Value = password2.value.trim();
  //   fullname
  if (fullNameValue === "") {
    formError(fullName, "Please enter your fullname");
  } else {
    formSuccess(fullName);
  }
  //   email
  if (emailValue === "") {
    formError(email, "Please enter your email")
  }
  else if (!isEmail(emailValue)) {
    formError(email, "Your email is not valid");
  }
  else {
    formSuccess(email);
  }

  //   password
  if (password1Value === "") {
    formError(password1, "Please enter your password");
  } else if (password1Value.length < 8) {
    formError(password1, "Please enter at least 8 characters");
  } else {
    formSuccess(password1);
  }
  //   repeat password
  if (password2Value === "") {
    formError(password2, "Please enter your password");
  } else if (password1Value.length < 8) {
    formError(password2, "Please enter at least 8 characters");
  } else if (password2Value !== password1Value) {
    formError(password2, "Your password does not match")
  } else {
    formSuccess(password2);
  }
});

function formError(input, message) {
  const formGroup = input.parentElement;
  const formMessage = formGroup.querySelector(".form-message");

  formMessage.innerText = message;
  formGroup.classList.add("error");
  formGroup.classList.remove("success");
};

function formSuccess(input) {
  const formGroup = input.parentElement;
  const formMessage = formGroup.querySelector(".form-message");

  formMessage.innerText = "";
  formGroup.classList.add("success");
  formGroup.classList.remove("error");
};

function formNormal(input) {
  const formGroup = input.parentElement;
  const formMessage = formGroup.querySelector(".form-message");

  formMessage.innerText = "";
  formGroup.classList.remove("error");
};

function isEmail(emailContent) {
  var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(emailContent);

  const formGroup = input.parentElement;
  const formMessage = formGroup.querySelector(".form-message");

  formMessage.innerText = message;
  formGroup.classList.add("error");
  formGroup.classList.remove("success");
};

// end: validate for login & signup

// start: menu
const navMenu = document.querySelector(".header-nav__menu");
const navOverlay = document.querySelector(".header-nav__overlay");
const navUl = document.querySelector(".header-nav__ul");
const navLinks = document.querySelectorAll(".header-nav__link")
const navClose = document.querySelector(".header-nav__close");

navMenu.addEventListener("click", () => {
  navUl.classList.add("active");
})

navClose.addEventListener("click", () => {
  navUl.classList.remove("active");
})

navLinks.forEach((navLink) => {
  navLink.addEventListener("click", () => {
    navUl.classList.remove("active");
  })
})

// end: menu

const sliderMain = document.querySelector('.slider-main');
const sliderWapper = document.querySelector('.slider-wrapper');
const sliderImage = document.querySelector('.slider-main img');
const sliderDots = document.querySelectorAll('.slider-dot');
const cityName = document.querySelector('.slider__discription .city-name');
const destination = document.querySelector('.slider__discription .destination-name');
const buttonLeft = document.querySelector('.manual-btn-left');
const buttonRight = document.querySelector('.manual-btn-right');
var currentItem = 0;

var images = [
  {
    image: "https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2017/08/hoi-an-quang-nam-vntrip-1.jpg",
    name: "Hoi An",
    city: "old town",
  },
  {
    image: "https://bvhttdl.mediacdn.vn/2021/3/4/novotel-danang-han-river-16147730147051967826485-1614820280963-16148202809642045608135.jpg",
    name: "Da nang",
    city: "city",
  },
  {
    image: "http://halohanoi.vn/wp-content/uploads/2021/03/Lang-Bac.png",
    name: "Ha noi",
    city: "capital",
  },
  {
    image: "https://codotphcm.com/images/khoanh/thum_15936505450.jpg",
    name: "ho chi minh",
    city: "city",
  }
];

function showImage(photo) {
  const item = images[photo];

  sliderImage.src = item.image;
  cityName.innerText = item.name;
  destination.innerText = item.city;
}

buttonLeft.addEventListener("click", () => {
  currentItem--;
  if (currentItem < 0) {
    currentItem = images.length - 1;
  }
  showImage(currentItem);
  showDot()
});

buttonRight.addEventListener("click", () => {
  currentItem++;
  if (currentItem > images.length - 1) {
    currentItem = 0;
  }
  showImage(currentItem);
  showDot()
});

function showDot() {
  sliderDots.forEach((dott) => {
    if (dott !== currentItem) {
      dott.classList.remove('active')
    }
  });
  sliderDots[currentItem].classList.add('active');
}

sliderDots.forEach((dot) => {
  dot.addEventListener('click', (e) => {
    sliderDots.forEach((dott) => {
      if (dott !== dot) {
        dott.classList.remove('active')
      }
    })
    e.target.classList.add('active');
    const slideIndex = parseInt(e.target.dataset.index);
    currentItem = slideIndex;
    showImage(slideIndex);
  })
})

// -----------------show top links----------------
const topLink = document.querySelector(".top-link");

window.addEventListener("scroll", () => {
  const scrollHeight = window.pageYOffset;
  if (scrollHeight > 3900) {
    topLink.classList.add("top-link--show")
  } else {
    topLink.classList.remove("top-link--show")
  }
})
// -----------set container__about-counter--------------
const moutainCounter = document.querySelector(".about-milestone__counter--mountain")
const islandCounter = document.querySelector(".about-milestone__counter--island")
const photoCounter = document.querySelector(".about-milestone__counter--photo")
const cruiseCounter = document.querySelector(".about-milestone__counter--cruise")

function counterUp(element, to) {
  const speed = 200
  let from = 0;
  let step = to / speed
  const counter = setInterval(() => {
    from += step
    if (from > to) {
      clearInterval(counter)
      element.innerText = to
    } else {
      element.innerText = Math.ceil(from)
    }
  }, 2)
}

setInterval(() => {
  counterUp(moutainCounter, 17)
  counterUp(islandCounter, 213)
  counterUp(photoCounter, 11923)
  counterUp(cruiseCounter, 50)
}, 10000)

// ---------------End: set container__about-counter---------
// ---------------- smooth scroll ------------------
const scrollLinks = document.querySelectorAll(".scroll-link");

scrollLinks.forEach((scrollLink) => {
  scrollLink.addEventListener("click", (e) => {

    e.preventDefault();
    const navbar = document.querySelector(".header-navbar");

    const id = scrollLink.getAttribute('href').slice(1);
    const element = document.getElementById(id);

    const navHeight = navbar.getBoundingClientRect().height;
    const position = element.offsetTop - navHeight;
    window.scrollTo({
      left: 0,
      top: position,
    });
  })
})

// -------------next destination slides--------------------------
const places = [
  {
    id: 1,
    image: "https://www.bienphong.com.vn//images/media/oldimages/510z_23a_w550.jpg",
    city: "An Giang",
    amount: 9,
  },
  {
    id: 2,
    image: "https://cdn3.ivivu.com/2015/11/du-lich-da-lat-ivivu1-540x305.jpg",
    city: "Da Lat",
    amount: 12,
  },
  {
    id: 3,
    image: "https://btnmt.1cdn.vn/2020/10/27/sls-nhung-dia-diem-chup-anh-cuoi-dep-o-ninh-binh-03_0.jpg",
    city: "Ninh Binh",
    amount: 10,
  },
  {
    id: 4,
    image: "https://statics.vinpearl.com/Anh%201%20du%20lich%20Hue%20.jpg",
    city: "Hue",
    amount: 14,
  },
  {
    id: 5,
    image: "http://www.nuibavi.com/nuibavi-images/news/img1/cao-nguyen-hoa-man-mocchau.jpg",
    city: "Moc Chau",
    amount: 4,
  },
  {
    id: 6,
    image: "https://luxtraveldmc.com/blog/wp-content/uploads/2019/12/dak-lak-vietnam.jpg",
    city: "Dak Lak",
    amount: 5,
  },
  {
    id: 7,
    image: "https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2017/08/1-3.jpg",
    city: "Can Tho",
    amount: 11,
  },
  {
    id: 8,
    image: "https://asianwaytravel.com/wp-content/uploads/2018/11/tnung-lake.jpg",
    city: "Pleiku",
    amount: 5,
  },
  {
    id: 9,
    image: "https://www.vietvisiontravel.com/wp-content/uploads/2019/01/mu-cang-chai-yen-bai-vietnam-vacation.jpg",
    city: "Yen Bai",
    amount: 6,
  },
  {
    id: 10,
    image: "https://dulichvietbiz.com/wp-content/uploads/2019/11/soc-trang-co-gi-choi-8-min.jpg",
    city: "Soc Trang",
    amount: 4,
  },
  {
    id: 11,
    image: "https://dulich9.com/wp-content/uploads/2019/05/Kinh-nghiem-du-lich-Tay-Nguyen-09.jpg",
    city: "Kon Tum",
    amount: 6,
  },
  {
    id: 12,
    image: "https://pharatravel.com/wp-content/uploads/2019/04/bai-trang-2.jpg",
    city: "Ninh Thuan",
    amount: 6,
  },
  {
    id: 13,
    image: "https://motogo.vn/wp-content/uploads/2020/12/thue-xe-may-phu-yen-1.jpg",
    city: "Phu Yen",
    amount: 8,
  },
  {
    id: 14,
    image: "https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2020/11/du-lich-quy-nhon-thang-12-2.jpg",
    city: "Quy Nhon",
    amount: 8,
  },
  {
    id: 15,
    image: "https://upload.wikimedia.org/wikipedia/commons/8/85/Nh%C3%A0_th%E1%BB%9D_ch%C3%ADnh_V%C4%83n_mi%E1%BA%BFu_Tr%E1%BA%A5n_Bi%C3%AAn.jpg",
    city: "Dong Nai",
    amount: 4,
  },
  {
    id: 16,
    image: "https://media.tacdn.com/media/attractions-splice-spp-674x446/07/12/61/e5.jpg",
    city: "Nha Trang",
    amount: 11,
  }
]

const nextPlacesWrapper = document.querySelector(".container__destination-places-wrapper")

function displayNextPlaces() {

  let nextPlaces = places.map((place, index) => {
    return place = `
  <div id=${index} class="destination__wrapper-place">
     <img src=${place.image} alt="" draggable="false">
     <div class="destination__wrapper-place-content">
       <h2>${place.city}</h2>
       <p>${place.amount} tours available</p>
     </div>
  </div>
  `
  })
  nextPlaces = nextPlaces.join("")
  nextPlacesWrapper.innerHTML = nextPlaces
}

displayNextPlaces()

let isMousedown = false
let startX, scrollLeft

nextPlacesWrapper.addEventListener("mousedown", (e) => {
  isMousedown = true

  startX = e.pageX - nextPlacesWrapper.offsetLeft
  scrollLeft = nextPlacesWrapper.scrollLeft
})

nextPlacesWrapper.addEventListener("mouseup", () => {
  isMousedown = false
})

nextPlacesWrapper.addEventListener("mouseleave", () => {
  isMousedown = false
})

nextPlacesWrapper.addEventListener("mousemove", (e) => {
  if (!isMousedown) return
  const x = e.pageX - nextPlacesWrapper.offsetLeft
  nextPlacesWrapper.scrollLeft = scrollLeft - (x - startX)
})


const desLeftBtn = document.querySelector(".destination-control--left")
const desRightBtn = document.querySelector(".destination-control--right")
const nextPlaces = document.querySelectorAll(".destination__wrapper-place")
const nextPlaceee = document.querySelector(".destination__wrapper-place")

let nextPlace = nextPlaces[0]

desRightBtn.addEventListener("click", (e) => {
  nextPlacesWrapper.scrollLeft += nextPlace.offsetWidth + 16
  console.log(nextPlacesWrapper.scrollLeft)
})

desLeftBtn.addEventListener("click", () => {
  nextPlacesWrapper.scrollLeft -= nextPlace.offsetWidth + 16
})

nextPlaces.forEach(nextPlace => {
  let showNextPlaces = setInterval(() => {
    nextPlacesWrapper.scrollLeft += nextPlace.offsetWidth + 16
  }, 8000)
})

// -------------End:next destination slides-----------------------
// -----------------popular services --------------------
const servicesContents = document.querySelectorAll(".services-content")

servicesContents.forEach(servicesContent => {
  let showTextBtn = servicesContent.querySelector(".services-content__title-btn")

  showTextBtn.addEventListener("click", () => {
    servicesContents.forEach(item => {
      if (item !== servicesContent) {
        item.classList.remove("show-text")
      }
    })
    servicesContent.classList.toggle("show-text")
  })
})

// -------------auto slide image----------------

// -------------End: auto slide image----------------

// -----------------------video player--------------
const servicesVideo = document.querySelector(".services-video-view")
const servicesVideoControls = document.querySelector(".services-video-player__controls")
const servicesVideoToggle = document.querySelector(".services-video-player__toggle-btn")
const servicesVideoTime = document.querySelector(".services-video-player__time")
const servicesVideoProgress = document.querySelector(".services-video-player__progress")
const servicesVideoProgressFill = document.querySelector(".services-video-player__progress-filled")
const servicesVideoBtns = document.querySelectorAll(".services-video-player__button")
const videoVolume = document.querySelector(".services-video-player__volume")
const videoVolumeIcon = document.querySelector(".services-video-player__volume #video-volume")
const servicesVideoVolume = document.querySelector(".services-video-player__volume-control")
const servicesVideoProgressFillBlock = document.querySelector(".services-video-player__progress-filled-block")

servicesVideo.play()
servicesVideo.addEventListener("click", handleVideoToggle)
servicesVideoToggle.addEventListener("click", handleVideoToggle)
servicesVideo.addEventListener("timeupdate", handleVideoProgress)

const servicesVideoVolumeChange = servicesVideoVolume.addEventListener("change", () => {
  servicesVideo.volume = servicesVideoVolume.value
  handleVideoVolume()
})

videoVolumeIcon.addEventListener("click", handleVolumeToggle)

servicesVideoBtns.forEach(videoBtn => {
  videoBtn.addEventListener("click", (e) => {
    servicesVideo.currentTime += +e.target.dataset.skip
  })
})
servicesVideoProgress.addEventListener("click", scrub)
function scrub(e) {
  servicesVideo.currentTime = (e.offsetX / servicesVideoProgress.offsetWidth) * servicesVideo.duration
}

function handleVolumeToggle() {
  videoVolumeIcon.classList.toggle("fa-volume-mute")
  if (videoVolumeIcon.classList.contains("fa-volume-mute")) {
    servicesVideoVolume.value = 0
    servicesVideo.volume = 0
  } else {
    servicesVideoVolume.value = servicesVideoVolumeChange
    servicesVideo.volume = servicesVideoVolume.value
  }
}

function handleVideoVolume() {
  if (servicesVideo.volume <= 0) {
    videoVolumeIcon.classList.add("fa-volume-mute")
  } else {
    videoVolumeIcon.classList.add("fa-volume")
    videoVolumeIcon.classList.remove("fa-volume-mute")
  }
}

function handleVideoToggle() {
  if (servicesVideo.paused) {
    servicesVideo.play()
    servicesVideoToggle.innerHTML = '<i class="fas fa-pause"></i>'
  } else {
    servicesVideo.pause()
    servicesVideoToggle.innerHTML = '<i class="fas fa-play"></i>'
  }
}

function handleVideoProgress() {
  const progressPercent = (servicesVideo.currentTime / servicesVideo.duration) * 100
  servicesVideoProgressFill.style.width = `${progressPercent}%`
  servicesVideoProgressFillBlock.style.left = "100%"

  servicesVideoTime.innerText = `${formatTime(servicesVideo.currentTime)} / ${formatTime(servicesVideo.duration)}`
}

function formatTime(time) {
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time - minutes * 60)
  let minutesValue, secondsValue

  minutesValue = minutes < 10 ? "0" + minutes : minutes
  secondsValue = seconds < 10 ? "0" + seconds : seconds

  const mediaTime = minutesValue + ":" + secondsValue
  return mediaTime
}
// -----------------------End: video player-------------



