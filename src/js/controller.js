import * as model from "./model.js";
import view from "./view.js";
const totalInput = document.querySelector("#total");
const peopleInput = document.querySelector("#people");
const tip = document.querySelector("#tip");
const totalTip = document.querySelector("#total-tip");
const btn = document.querySelector(".btn-container");
const btnAll = document.querySelectorAll(".btn-all");
const btnReset = document.querySelector(".btn-reset");
const errorMessage = document.querySelector(".error-message");
const headings = document.querySelectorAll(".results__headings-block");
const resetElements = [
  totalInput,
  peopleInput,
  tip,
  totalTip,
  btnReset,
  errorMessage,
];

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
      if (!model.app.bill) throw new Error(`tipPersent is undefined`);

      // add and remove ative class
      if (!e.target.classList.contains("btn-all")) return;
      model.app.tipPersent = +e.target.dataset.id;
      view.removeBtnAll(btnAll);
      e.target.classList.add("btn-all--active");
      //end of add and remove ative class
      if (model.app.bill && model.app.perPerson) {
        model.calcBill(
          model.app.bill,
          model.app.tipPersent,
          model.app.perPerson
        );
        const ques = model.app.perPerson < 1 ? false : true;
        // add active class to reset button
        view.peopleInputLessOrEqualOne(
          peopleInput,
          errorMessage,
          ques,
          btnReset
        );
        if (!ques) return;
        // modifying the spaces betwwen the tip headings and the values
        view.maintaingHeadingsGap(headings, model.app.total);
        // Render results
        view.renderTipResults(model.app.tipAmount, model.app.total);
        // add active class to reset button
      }
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

/*
---------++++++++++ Reset app +++++++++------------
*/
// Resterting the app to it's original state after refreshing the page
view.clearModelProperties(model);
view.removeBtnAll(btnAll);
view.reset(...resetElements);
view.maintaingHeadingsGap(headings, model.app.total);
