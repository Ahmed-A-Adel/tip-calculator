export const app = {
  tipAmount: "",
  perPerson: "",
  total: "",
  bill: "",
  tipPersent: "",
  memo: "",
};

export const calcBill = function (bill, tips, people) {
  const tipAmount = bill * +tips;
  const person = bill / people;
  const total = tipAmount / people + person;
  app.tipAmount = tipAmount;
  app.perPerson = person;
  app.total = total;
};
