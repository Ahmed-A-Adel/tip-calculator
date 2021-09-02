// debugger;
class CalcTipView {
  tip;
  totalTip;
  constructor() {
    this.tip = document.querySelector("#tip");
    this.totalTip = document.querySelector("#total-tip");
  }
  renderTipResults(tipAmount, total) {
    try {
      if (!tipAmount || !total)
        throw new Error("tipAmount or total is indefind");
      this.totalTip.textContent = this.tip.textContent = "";
      this.tip.textContent = `$${tipAmount.toFixed(2)}`;
      this.totalTip.textContent = `$${total.toFixed(2)}`;
    } catch (err) {
      console.error(err);
    }
  }
  maintaingHeadingsGap(headings, total) {
    const totalArr = String(total).split(".");
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
  }

  peopleInputLessOrEqualOne(
    peopleInput,
    errorMessage,
    call = false,
    btnReset = ""
  ) {
    if (call) {
      peopleInput.classList.remove("people-input--red");
      btnReset.classList.add("btn-reset--active");
      errorMessage.style.display = "none";
    } else {
      peopleInput.classList.add("people-input--red");
      errorMessage.style.display = "unset";
    }
  }
  removeBtnAll(btnAll, btnCustom) {
    btnAll.forEach((btn) => btn.classList.remove("btn-all--active"));
  }
  reset(
    totalInput,
    peopleInput,
    tip,
    totalTip,
    btnReset,
    errorMessage,
    btnCustom,
    tipHidden,
    selectHidden
  ) {
    totalInput.value = "";
    peopleInput.value = "";
    tip.textContent = `$0.00`;
    totalTip.textContent = `$0.00`;
    btnReset.classList.remove("btn-reset--active");
    peopleInput.classList.remove("people-input--red");
    errorMessage.style.display = "none";
    btnCustom.classList.remove("btn-custom--active");
    tipHidden.value = selectHidden.value = "";
  }
  clearModelProperties(model) {
    model.app.tipPersent =
      model.app.perPerson =
      model.app.bill =
      model.app.total =
        "";
  }
}

export default new CalcTipView();
