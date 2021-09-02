import * as model from "./model.js";
import view from "./view.js";
const totalInput = document.querySelector("#total");
const peopleInput = document.querySelector("#people");
const tip = document.querySelector("#tip");
const totalTip = document.querySelector("#total-tip");
const btn = document.querySelector(".btn-container");
const btnAll = document.querySelectorAll(".btn-all");
const btnReset = document.querySelector(".btn-reset");
const btnCustom = document.querySelector(".btn-custom");
const errorMessage = document.querySelector(".error-message");
const headings = document.querySelectorAll(".results__headings-block");
const overlay = document.querySelector(".popup-overlay");
const popupBlock = document.querySelectorAll(".popup__input-block");
const block1 = document.querySelector(".block-1");
const block2 = document.querySelector(".block-2");
const tipHidden = document.querySelector("#tip-input");
const selectHidden = document.querySelector("#tip-select");

const resetElements = [
  totalInput,
  peopleInput,
  tip,
  totalTip,
  btnReset,
  errorMessage,
  btnCustom,
  tipHidden,
  selectHidden,
];

/*
--------++++++++ Functions ++++++++-------------
*/
// _______________________________________________________
const showTipOrSelect = function (tip, select) {
  tip.style.opacity = 1;
  select.style.opacity = 1;
};
// _______________________________________________________

// _______________________________________________________
const btnsFunctionality = function (e = "", custom = false, tipPersent) {
  if (!model.app.bill) throw new Error(`tipPersent is undefined`);
  // custom part for deffrent need between all btn and custom btn
  if (!custom) {
    if (!e.target.classList.contains("btn-all")) return;
    model.app.tipPersent = +e.target.dataset.id;
    // remove active class from all the btns
    view.removeBtnAll(btnAll);
    e.target.classList.add("btn-all--active");
  } else {
    view.removeBtnAll(btnAll);
    btnCustom.classList.add("btn-custom--active");

    /* add zero for the less than 10 becaues ex: five persent
     would be like 0.05 not 0.5 that will be fifteen persent*/
    tipPersent > 9
      ? (model.app.tipPersent = +`0.${tipPersent}`)
      : (model.app.tipPersent = +`0.0${tipPersent}`);
  }
  if (model.app.bill && model.app.perPerson) {
    // calculate the tip amount and the total
    model.calcBill(model.app.bill, model.app.tipPersent, model.app.perPerson);
    // set person ture or false or the peopleInputLessurEqualOne Prameter
    const person = model.app.perPerson < 1 ? false : true;
    // add active class to reset button
    view.peopleInputLessOrEqualOne(peopleInput, errorMessage, person, btnReset);
    if (!person) return;
    // modifying the spaces betwwen the tip headings and the values
    view.maintaingHeadingsGap(headings, model.app.total);
    // Render results
    view.renderTipResults(model.app.tipAmount, model.app.total);
    // add active class to reset button
  }
};
// _______________________________________________________

// _______________________________________________________
const showAndHiddePopup = function (currPop) {
  if (tipHidden.value !== "" || selectHidden.value !== "") {
    currPop.classList.contains("block-1")
      ? (block2.style.opacity = 0)
      : (block1.style.opacity = 0);
  }
  if (tipHidden.value === "" && selectHidden.value === "") {
    currPop.classList.contains("block-1")
      ? (block2.style.opacity = 1)
      : (block1.style.opacity = 1);
  }
};
// _______________________________________________________

/*
--------++++++++ Event handlers ++++++++-------------
*/
// ________________________________________________________________
totalInput.addEventListener("input", function () {
  try {
    model.app.bill = this.value;
    if (!model.app.bill) throw new Error(`bill is undefined`);

    // calculate the bill
    if (model.app.tipPersent && model.app.perPerson) {
      // console.log(model.app.bill, model.app.tipPersent, model.app.perPerson);
      model.calcBill(model.app.bill, model.app.tipPersent, model.app.perPerson);
      // modifying the spaces betwwen the tip headings and the values
      view.maintaingHeadingsGap(headings, model.app.total);
      // Render results
      view.renderTipResults(model.app.tipAmount, model.app.total);
    }
    // ...............................................................
    btn.addEventListener("click", function (e) {
      btnsFunctionality(e);
    });
    // ...............................................................

    // ...............................................................
    peopleInput.addEventListener("input", function () {
      model.app.perPerson = this.value;
      if (
        !model.app.tipPersent ||
        !model.app.bill ||
        (!model.app.tipPersent && !model.app.bill)
      )
        return;

      if (model.app.perPerson < 1) {
        //  add red modifire to people input and render error message
        view.peopleInputLessOrEqualOne(peopleInput, errorMessage);
      } else {
        // console.log(model.app.bill, model.app.tipPersent, model.app.perPerson);
        model.calcBill(
          model.app.bill,
          model.app.tipPersent,
          model.app.perPerson
        );
        // modifying the spaces betwwen the tip headings and ites values
        view.maintaingHeadingsGap(headings, model.app.total);
        // Render the tip and the total results
        view.renderTipResults(model.app.tipAmount, model.app.total);
        // add active class to reset button
        view.peopleInputLessOrEqualOne(
          peopleInput,
          errorMessage,
          true,
          btnReset
        );
      }
    });
    // ...............................................................
  } catch (err) {
    console.error(err);
  }
});

// _________________________________________________________________
btnReset.addEventListener("click", function () {
  view.clearModelProperties(model);
  view.removeBtnAll(btnAll);
  view.reset(...resetElements);
  view.maintaingHeadingsGap(headings, model.app.total);
});
// _________________________________________________________________
btnCustom.addEventListener("click", function (e) {
  showTipOrSelect(tipHidden, selectHidden);
  overlay.classList.remove("popup-overlay--hidden");
  const submit = document.querySelector(".btn--submit");
  submit.addEventListener("click", function () {
    overlay.classList.add("popup-overlay--hidden");
    block2.style.opacity = block1.style.opacity = 1;
  });
});
popupBlock.forEach((pop) =>
  pop.addEventListener("input", function (e) {
    const currPop = e.target.closest(".popup__input-block");
    let tipPersent;
    showAndHiddePopup(currPop);
    currPop.classList.contains("block-1")
      ? (tipPersent = +tipHidden.value)
      : (tipPersent = +selectHidden.value);
    btnsFunctionality(e, true, tipPersent);
  })
);
// _________________________________________________________________

/*
---------++++++++++ Reset app +++++++++------------
*/
// Resterting the app to it's original state after refreshing the page
view.clearModelProperties(model);
view.removeBtnAll(btnAll);
view.reset(...resetElements);
view.maintaingHeadingsGap(headings, model.app.total);
