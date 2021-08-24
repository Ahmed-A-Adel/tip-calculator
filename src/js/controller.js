import "./model.js";
import "./view.js";
const totalInput = document.querySelector("#total");
const peopleInput = document.querySelector("#people");
const tip = document.querySelector("#tip");
const totalTip = document.querySelector("#total-tip");
const btn = document.querySelector(".btn-container");
const btnAll = document.querySelectorAll(".btn-all");
const btnReset = document.querySelector(".btn-reset");
let tipPersent;
let memo;
const removeBtnAll = function () {
  btnAll.forEach((btn) => btn.classList.remove("btn-all--active"));
};
btnAll.forEach((btn) => btn.classList.remove("btn-all--active"));

const calcBill = function (bill, tips, people) {
  const tipAmount = bill * +tips;
  const person = bill / people;
  const total = tipAmount / people + person;
  tip.textContent = totalTip.textContent = "";
  tip.textContent = `$${tipAmount}`;
  totalTip.textContent = `$${total}`;
};
// calcBill(200, 10, 2);
totalInput.addEventListener("input", function () {
  const bill = this.value;
  if (tipPersent && memo) calcBill(bill, tipPersent, memo);

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
  peopleInput.addEventListener("input", function () {
    memo = this.value;
    calcBill(bill, tipPersent, memo);
    btnReset.classList.add("btn-reset--active");
  });
});
const reset = function () {
  totalInput.value = "";
  peopleInput.value = "";
  tip.textContent = `$0.00`;
  totalTip.textContent = `$0.00`;
  btnReset.classList.remove("btn-reset--active");
  removeBtnAll();
};
reset();
btnReset.addEventListener("click", reset);
