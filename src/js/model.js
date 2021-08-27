export const app = {
  tipAmount: "",
  perPerson: "",
  total: "",
  bill: "",
  tipPersent: "",
  memo: "",
  PersonShare: "",
};

export const calcBill = function (bill, tips, people) {
  const tipAmount = bill * +tips;
  const person = bill / people;
  const total = tipAmount / people + person;
  app.tipAmount = tipAmount;
  app.total = total;
};
