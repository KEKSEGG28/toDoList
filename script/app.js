const btnNode = document.querySelector(".btn");
const inputNode = document.querySelector(".input");
const subtitleNode = document.querySelector(".subtitle");
const dliNode = document.querySelector(".dinput");
const todoInputNode = document.querySelector(".todoinput");
const ulNode = document.querySelector(".dlu");
const divliNode = document.querySelector(".dli");
const dliBtnNode = document.querySelector(".dlibtn");
const deletecomNode = document.querySelector(".deletecom");
const deleteallNode = document.querySelector(".deleteall");
let dataNote = JSON.parse(localStorage.getItem("dataNote")) ?? [];
const LS_DATE_KEY = "dataNote";
function btnHandler(e) {
  e.preventDefault();
  let inputValue = inputNode.value.trim();
  let dataObj = {
    id: Date.now(),
    p: inputValue,
    isDone: false,
  };
  ulNode.scrollTop = - ulNode.scrollHeight;
  // ulNode.scrollTop = -ulNode.scrollHeight - divliNode.scrollHeight;

  if (!inputValue) return;
  dataNote.push(dataObj); /// пушим обьект в массив
  inputNode.value = ""; /// обновление инпута после добавления
  renderUl(dataNote); ///функция рендера строк
  lengthCheckOn();

  console.log(dataNote);
  console.log(dataNote[0].id);
}
/// классы выключаем
function lengthCheckOn() {
  if (dataNote.length > 0) {
    dliBtnNode.classList.remove("dlibtnOff"); /// выключаем класс на кнопках
    todoInputNode.classList.add("borderdiv"); /// рисуем диву наверху полосу
  }
}
/// классы включаем
function lengthCheckOff() {
  if (dataNote.length < 1) {
    dliBtnNode.classList.add("dlibtnOff"); /// включаем класс на кнопках
  }
}
//создаем лишку

const createUL = ({ id, p, isDone }) => {
  console.log(id, p, isDone);
  const liNode = document.createElement("li");

  liNode.className = "string";
  liNode.innerHTML = `
                  <input class="checkbox" type="checkbox" id="checkbox"/>
                  <p class="subtitle" id="subtitle">${p}</p>
                  <button class="delete">❌</button>
                `;

  const checkNode = liNode.querySelector("#checkbox");
  checkNode.checked = isDone;
  const subtitleNode = liNode.querySelector(".subtitle");

  const deleteNode = liNode.querySelector(".delete");
  checkNode.addEventListener("change", () => checkHandler(id, isDone));

  deleteNode.addEventListener("click", () => clickHandler(id));
  return liNode;
};
///чекбокс
function checkHandler(id) {
  let findobj = dataNote.find((obj) => obj.id === id);
  findobj.isDone = !findobj.isDone;
  renderUl(dataNote);
}
///удалить на крестик
function clickHandler(id) {
  dataNote = dataNote.filter((obj) => obj.id != id);
  lengthCheckOff();
  renderUl(dataNote);
}
///удалить выбранное
function clickcomHandler() {
  dataNote = dataNote.filter((obj) => !obj.isDone);
  lengthCheckOff();
  renderUl(dataNote);
}
///удалить все
function clickallHandler() {
  dataNote = [];
  lengthCheckOff();
  renderUl(dataNote);
}
///рендер карт
const renderUl = (dataNote) => {
  ulNode.innerHTML = "";
  dataNote.forEach((obj) => {
    const liNode = createUL(obj);
    ulNode.append(liNode);
  });
  localStorage.setItem("dataNote", JSON.stringify(dataNote));
};

todoInputNode.addEventListener("submit", btnHandler);
deletecomNode.addEventListener("click", clickcomHandler);
deleteallNode.addEventListener("click", clickallHandler);
lengthCheckOn(dataNote);
renderUl(dataNote);
