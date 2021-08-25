import "./model.js";
import "./view.js";
const totalInput = document.querySelector("#total");
const peopleInput = document.querySelector("#people");
const tip = document.querySelector("#tip");
const totalTip = document.querySelector("#total-tip");
const btn = document.querySelector(".btn-container");
const btnAll = document.querySelectorAll(".btn-all");
const btnReset = document.querySelector(".btn-reset");
const errorMessage = document.querySelector(".error-message");
const headings = document.querySelectorAll(".results__headings-block");
let tipPersent;
let memo;
/*
---------++++++++++ Functions +++++++++------------
*/
// _______________________________________________________________
const removeBtnAll = function () {
  btnAll.forEach((btn) => btn.classList.remove("btn-all--active"));
};
removeBtnAll();
// ________________________________________________________________

// ________________________________________________________________
const maintainHeadingsGap = function (headings, total) {
  const totalArr = String(total).split(".");
  console.log(totalArr[0].length);
  // console.log(String(total).slice("."), total);
  headings.forEach((head) => {
    totalArr[0].length == 2
      ? head.classList.add("results__headings-block--length-2")
      : head.classList.remove("results__headings-block--length-2");
    totalArr[0].length == 3
      ? head.classList.add("results__headings-block--length-3")
      : head.classList.remove("results__headings-block--length-3");
    totalArr[0].length == 4
      ? head.classList.add("results__headings-block--length-4")
      : head.classList.remove("results__headings-block--length-4");
  });
};
// ________________________________________________________________

// ________________________________________________________________
const calcBill = function (bill, tips, people) {
  const tipAmount = bill * +tips;
  const person = bill / people;
  const total = tipAmount / people + person;
  tip.textContent = totalTip.textContent = "";
  tip.textContent = `$${tipAmount.toFixed(2)}`;
  totalTip.textContent = `$${total.toFixed(2)}`;
  maintainHeadingsGap(headings, total);
};
// ________________________________________________________________

// ________________________________________________________________
const reset = function () {
  totalInput.value = "";
  peopleInput.value = "";
  tip.textContent = `$0.00`;
  totalTip.textContent = `$0.00`;
  btnReset.classList.remove("btn-reset--active");
  peopleInput.classList.remove("people-input--red");
  errorMessage.style.display = "none";
  removeBtnAll();
  tipPersent = memo = "";
};
// ________________________________________________________________

/*
--------++++++++ Event handlers ++++++++-------------
*/
// ________________________________________________________________
totalInput.addEventListener("input", function () {
  const bill = this.value;
  if (tipPersent && memo) calcBill(bill, tipPersent, memo);

  //  prsent buttons handler
  // ...............................................................
  btn.addEventListener("click", function (e) {
    tipPersent = +e.target.dataset.id;
    // add and remove ative class
    if (!e.target.classList.contains("btn-all")) return;
    btnAll.forEach((btn) => btn.classList.remove("btn-all--active"));
    e.target.classList.add("btn-all--active");
    //end of add and remove ative class
    if (!tipPersent) return;
    if (bill && memo) calcBill(bill, tipPersent, memo);
  });
  // ...............................................................

  // ...............................................................
  peopleInput.addEventListener("input", function () {
    memo = this.value;
    if (memo < 1) {
      peopleInput.classList.add("people-input--red");
      errorMessage.style.display = "unset";
    } else {
      calcBill(bill, tipPersent, memo);
      btnReset.classList.add("btn-reset--active");
      peopleInput.classList.remove("people-input--red");
      errorMessage.style.display = "none";
    }
  });
  // ...............................................................
});
// _________________________________________________________________
btnReset.addEventListener("click", reset);
// _________________________________________________________________
reset();
