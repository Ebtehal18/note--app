const btnNotes = document.querySelector(".btn--notes");
const btnHeader = document.querySelector(".btn--header");
const notes = document.querySelector(".notes");
const addNote = document.querySelector(".btn");
const mainNote = document.querySelector(".main--home");
const form = document.querySelector(".inputs");
const formSearch = document.querySelector("form");
const inputs = document.querySelectorAll(".input--form ");
const container = document.querySelector(".container");
const notePage = document.querySelector(".note--page");
const addPage = document.querySelector(".add--page");
const addBtnNote = document.querySelector(".btn--addnote");
const titleInput = document.querySelector(".title");
const authorInput = document.querySelector(".author");
const textareaInput = document.querySelector(".textarea");
const notesContainer = document.querySelector(".notes--all-notees");
const searchInput = document.querySelector(".search--input");
const allNotes = () => document.querySelectorAll(".notes--all");
const header = document.querySelector(".header");
const main = document.querySelector(".maiin");

// mobile
const searchMobileInput = document.querySelector(".search--input--mobile");
const menu = document.querySelectorAll(".menu");
const closeIcon = document.querySelector(".close--icon");
const searchIcon = document.querySelector(".search--icon");
const closeSearch = document.querySelector(".close--search");
const originalsrc = searchIcon.src;
const secondSrc = "images/close-search.svg";
const searchMobile = document.querySelector(".form--mobile");
const backGround = document.querySelector(".notes--menu--main");
const firstchild = document.querySelector(".main-firstchild");
const secodChild = document.querySelector(".main--secodchild ");

const noResults = document.querySelector(".search");
const pinnedBtn = document.querySelector(".btn--pinned");
const pinnedContainer = document.querySelector(".pinned");
const warnings = document.querySelectorAll(".warning");
const delette = () => document.querySelectorAll(".delete");
const now = new Date();

const options = {
  day: "numeric",
  month: "short",
  year: "numeric",
};
const formatDate = function (date, local) {
  const calcdaysPassed = (day1, day2) => {
    Math.round(Math.abs(day2 - day1) / (1000 * 60 * 60 * 24));
  };
  const daysPassed = calcdaysPassed(new Date(), date);

  if (daysPassed === 0) return `Today`;
  if (daysPassed === 1) return `Yasterday`;
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  return new Intl.DateTimeFormat(local, options).format(date);
};

const hideNotes = function () {
  notes.style.display = "none";
  btnHeader.style.display = "block";
};
const headerBtn = function () {
  notes.style.display = "block";
  btnHeader.style.display = "none";
};
const addBtn = function () {
  console.log(main);
  main.classList.remove("main--inputs");
  if (window.innerWidth < 600) {
    firstchild.classList.add("main--inputs");
    notes.classList.add("main--inputs");
  } else {
    notes.style.display = "none";
    mainNote.style.display = "none";
    form.style.display = "flex";
    container.style.gridTemplateColumns = "250px 1fr";
  }
  secodChild.classList.remove("main--inputs");
  notePage.classList.remove("active");
  addPage.classList.add("active");
};

const fetchData = function (key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : false;
};
const saveData = function (key, value) {
  localStorage.setItem(key, JSON.stringify(value));
};

const renderUnpinnedNotes = function (unpinnedNotes) {
  if (unpinnedNotes) {
    let noteslist = "<p class='note-sentence'>Notes</p>";
    unpinnedNotes.forEach((note) => {
      noteslist += `
     <div class="notes--all">
       <h2 class="pineed--heading">${note.title}</h2>
       <div class="container--text">
         <p class="pinned--description">${note.textarea}</p>
       </div>
       <div class="date">
         <p class="date--detail">${note.time}</p>
         <p class="delete">Delete</p>
       </div>
     </div>`;
    });
    notesContainer.innerHTML = noteslist;
  } else {
    notesContainer.innerHTML = `<p class="note-sentence">There are no notes to show </p>`;
  }
};

const renderPinnedNotes = function ([pinnedNote]) {
  let pinnedlist = "";
  if (pinnedNote) {
    pinnedlist += `
      <div class="notes--all">
        <p class="pinned--title">PINNED</p>
        <h2 class="pineed--heading">${pinnedNote.title}</h2>
        <div class="container--text">
          <p class="pinned--description">${pinnedNote.textarea}</p>
        </div>
        <div class="date">
          <p class="date--detail">${pinnedNote.time}</p>
          <p class="delete">Delete</p>
        </div>
      </div>`;
    pinnedContainer.innerHTML = pinnedlist;
  } else {
    pinnedContainer.innerHTML = `<p class="empty--string">There are no pinned notes to show </p>`;
  }
};

const deleteNotes = function (e, index) {
  const notes = fetchData("notes");

  notes.splice(index, 1);
  saveData("notes", notes);
  initNotes(notes);
};
const showMainNote = function (e, index) {
  if (window.innerWidth > 600) {
    main.classList.remove("main--inputs");
    firstchild.classList.remove("main--inputs");
    mainNote.style.display = "block";
  }
  const nottes = fetchData("notes");
  const clickedNote = nottes[index];
  let mainNotebody;
  mainNotebody = ` <h1 class="main--heading">${clickedNote.title}</h1>
  <div class="main--details">
    <p class="date--detail">${clickedNote.time} /</p>
    <p class="author--person">By ${clickedNote.author}</p>
  </div>
  <p class="main--note">
    ${clickedNote.textarea}
  </p> `;

  mainNote.innerHTML = mainNotebody;
  if (window.innerWidth < 600) {
    main.classList.remove("main--inputs");
    firstchild.classList.remove("main--inputs");
    notes.classList.add("main--inputs");
  }
};
const initListenersNotes = () => {
  delette().forEach((note, index) => {
    note.addEventListener("click", (e) => deleteNotes(e, index));
  });
  allNotes().forEach((mainNote, index) => {
    mainNote.addEventListener("click", (e) => showMainNote(e, index));
  });
};
const renderData = function (notes) {
  let pinnedNote;
  notes.forEach((note) => {
    if (note.pinned) {
      pinnedNote = note;
      return;
    }
  });

  if (notes.length) {
    if (pinnedNote) {
      renderPinnedNotes([pinnedNote]);
      const unpinnedNotes = notes.filter((note) => !note.pinned);
      renderUnpinnedNotes(unpinnedNotes);
    } else {
      renderPinnedNotes([]);
      renderUnpinnedNotes(notes);
    }
  }
  titleInput.value = authorInput.value = textareaInput.value = "";
};
const initNotes = function (notes) {
  if (notes.length) {
    saveData("notes", notes);
    renderData(notes);
    initListenersNotes();
  } else {
    mainNote.innerHTML = `<h1 class="main--heading">There are no tasks to show </h1>`;
    pinnedContainer.innerHTML = `<p class="empty--string">There are no pinned notes to show </p>`;
    notesContainer.innerHTML = `<p class="note-sentence">There are no notes to show </p>`;
  }
};

const createNote = function (pinned) {
  const note = {
    pinned: pinned,
    title: titleInput.value,
    author: authorInput.value,
    textarea: textareaInput.value,
    time: formatDate(new Date(), "en-US"),
  };
  return note;
};

const addData = function (e) {
  e.preventDefault();
  const note = createNote(false);
  const notes = fetchData("notes") || [];
  notes.push(note);
  initNotes(notes);
};

const chekedIspineed = function (e) {
  e.preventDefault();
  const note = createNote(true);
  let notes = fetchData("notes") || [];
  const existingPinnedIndex = notes.findIndex((n) => n.pinned);

  if (existingPinnedIndex !== -1) {
    notes.splice(existingPinnedIndex, 1);
  }

  if (note.pinned) {
    notes.unshift(note);
    initNotes(notes);
  }
};
const showForm = function () {
  if (window.innerWidth < 600) {
    notes.classList.add("main--inputs");
    container.style.gridTemplateColumns = "1fr";
  } else {
    notes.style.display = "block";
    form.style.display = "none";
    container.style.gridTemplateColumns = "250px 320px 1fr";
  }
};
// data validation///////////////////////////////
const dataValid = function () {
  return (
    titleInput.value.trim() !== "" &&
    authorInput.value.trim() !== "" &&
    textareaInput.value.trim() !== ""
  );
};
const handleFormSubmit = function (e, onDataValid) {
  notePage.classList.add("active");
  addPage.classList.remove("active");
  e.preventDefault();
  inputs.forEach((input) => input.classList.remove("error-input"));
  if (dataValid()) {
    onDataValid(e);
    showForm();
  } else {
    inputs.forEach((input) => {
      input.value.trim() !== ""
        ? input.classList.remove("error-input")
        : input.classList.add("error-input");
    });
  }
  if (window.innerWidth < 600) {
    main.classList.add("main--inputs");
    firstchild.classList.add("main--inputs");
    secodChild.classList.add("main--inputs");
    notes.classList.remove("main--inputs");
  }
};

const clickAddBtn = function (e) {
  handleFormSubmit(e, addData);
};

const clickPinnedBtn = function (e) {
  handleFormSubmit(e, chekedIspineed);
};
// search ////////////////////
const searchQuery = function (query) {
  const notes = fetchData("notes") || [];
  const searchReasult = notes.filter((note) => {
    return (
      note.title.toLowerCase().startsWith(query.toLowerCase()) ||
      note.author.toLowerCase().startsWith(query.toLowerCase()) ||
      note.textarea.toLowerCase().startsWith(query.toLowerCase()) ||
      note.time.toLowerCase().startsWith(query.toLowerCase())
    );
  });
  return searchReasult;
};
const performSearch = function (inputValue, isMobile = false) {
  const query = inputValue.trim();
  const result = searchQuery(query);

  if (result.length === 0) {
    isMobile
      ? noResults.classList.remove("mobile--noresults")
      : notes.classList.add("no--results");
    pinnedContainer.innerHTML = "";
    notesContainer.innerHTML = "";
  } else {
    isMobile
      ? noResults.classList.add("mobile--noresults")
      : notes.classList.remove("no--results");
    renderData(result);
    allNotes().forEach((mainNote) =>
      mainNote.classList.add("notes--all--search")
    );
    initListenersNotes();
  }
  if (query === "") {
    allNotes().forEach((mainNote) =>
      mainNote.classList.remove("notes--all--search")
    );
  }
  // console.log(query);
};

const doSearch = function (e) {
  e.preventDefault();
  performSearch(searchInput.value);
};

const doSearchMobbile = function (e) {
  performSearch(searchMobileInput.value, true);
};

// enevent listeners
searchInput.addEventListener("input", doSearch);
searchMobileInput.addEventListener("input", doSearchMobbile);
addPage.addEventListener("click", addBtn);
notePage.addEventListener("click", (e) => {
  if (dataValid()) {
    notePage.classList.add("active");
    addPage.classList.remove("active");
    clickAddBtn(e);
    clickPinnedBtn(e);
  }
});
btnNotes.addEventListener("click", hideNotes);
btnHeader.addEventListener("click", headerBtn);
addNote.addEventListener("click", addBtn);
addBtnNote.addEventListener("click", (e) => clickAddBtn(e));
pinnedBtn.addEventListener("click", (e) => clickPinnedBtn(e));

const initData = function () {
  initNotes(fetchData("notes"));
};
initData();

// mobile
menu.forEach((menuItem) => {
  menuItem.addEventListener("click", function () {
    header.classList.toggle("menu-active");
    container.style.gridTemplateColumns =
      container.style.gridTemplateColumns === "1fr" ? "250px 1fr" : "1fr";
  });
});
const closingIcon = function () {
  container.style.gridTemplateColumns =
    container.style.gridTemplateColumns === "1fr" ? "250px 1fr" : "1fr";
  header.classList.toggle("menu-active");
};
closeIcon.addEventListener("click", closingIcon);
const searcingIcon = function () {
  header.classList.add("menu-active");
  container.style.gridTemplateColumns = "1fr";
  if (searchIcon.src === originalsrc) {
    backGround.style.backgroundColor = "rgba(246, 246, 246, 1)";
    searchMobile.classList.remove("form-mobile--none");
    searchIcon.src = secondSrc;
  } else {
    backGround.style.backgroundColor = "#fff";
    searchIcon.src = originalsrc;
    searchMobile.classList.add("form-mobile--none");
  }
};
searchIcon.addEventListener("click", searcingIcon);
const changingIconSrc = function () {
  header.classList.add("menu-active");
  container.style.gridTemplateColumns = "1fr";
  if (searchIcon.src === secondSrc) {
    backGround.style.backgroundColor = "#fff";
    searchIcon.src = originalSrc;
    searchMobile.classList.add("form-mobile--none");
  }
};
searchIcon.addEventListener("click", changingIconSrc);
