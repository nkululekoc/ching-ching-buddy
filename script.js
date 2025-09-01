document.addEventListener("DOMContentLoaded", function () {
  const loanAmountSlider = document.getElementById("loanAmount");
  const interestRateSlider = document.getElementById("interestRate");
  const loanPeriodSlider = document.getElementById("loanPeriod");

  const loanAmountValueDisplay = document.getElementById("loanAmountValue");
  const interestRateValueDisplay = document.getElementById("interestRateValue");
  const loanPeriodValueDisplay = document.getElementById("loanPeriodValue");

  const monthlyPaymentDisplay = document.getElementById("monthlyPayment");
  const totalInterestPaidDisplay = document.getElementById("totalInterestPaid");
  const totalAmountPaidDisplay = document.getElementById("totalAmountPaid");

  function calculateLoan() {
    const loanAmount = parseFloat(loanAmountSlider.value);
    const annualInterestRate = parseFloat(interestRateSlider.value);
    const loanPeriodYears = parseFloat(loanPeriodSlider.value);

    loanAmountValueDisplay.textContent = loanAmount.toLocaleString();
    interestRateValueDisplay.textContent = annualInterestRate.toFixed(1);
    loanPeriodValueDisplay.textContent = loanPeriodYears;

    const monthlyInterestRate = annualInterestRate / 100 / 12;
    const numberOfPayments = loanPeriodYears * 12;

    let monthlyPayment = 0;
    let totalInterestPaid = 0;
    let totalAmountPaid = 0;

    if (annualInterestRate === 0) {
      monthlyPayment = loanAmount / numberOfPayments;
      totalInterestPaid = 0;
      totalAmountPaid = loanAmount;
    } else {
      monthlyPayment =
        (loanAmount *
          monthlyInterestRate *
          Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
        (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
      totalAmountPaid = monthlyPayment * numberOfPayments;
      totalInterestPaid = totalAmountPaid - loanAmount;
    }

    monthlyPaymentDisplay.textContent = `R${monthlyPayment.toLocaleString(
      undefined,
      { minimumFractionDigits: 0, maximumFractionDigits: 0 }
    )}`;
    totalInterestPaidDisplay.textContent = `R${totalInterestPaid.toLocaleString(
      undefined,
      { minimumFractionDigits: 0, maximumFractionDigits: 0 }
    )}`;
    totalAmountPaidDisplay.textContent = `R${totalAmountPaid.toLocaleString(
      undefined,
      { minimumFractionDigits: 0, maximumFractionDigits: 0 }
    )}`;
  }

  loanAmountSlider.addEventListener("input", calculateLoan);
  interestRateSlider.addEventListener("input", calculateLoan);
  loanPeriodSlider.addEventListener("input", calculateLoan);

  calculateLoan();
});

(function () {
  if (!window.chatbase || window.chatbase("getState") !== "initialized") {
    window.chatbase = (...arguments) => {
      if (!window.chatbase.q) {
        window.chatbase.q = [];
      }
      window.chatbase.q.push(arguments);
    };
    window.chatbase = new Proxy(window.chatbase, {
      get(target, prop) {
        if (prop === "q") {
          return target.q;
        }
        return (...args) => target(prop, ...args);
      },
    });
  }
  const onLoad = function () {
    const script = document.createElement("script");
    script.src = "https://www.chatbase.co/embed.min.js";
    script.id = "IF0-m3C2uD3AZM3p39JB7";
    script.domain = "www.chatbase.co";
    document.body.appendChild(script);
  };
  if (document.readyState === "complete") {
    onLoad();
  } else {
    window.addEventListener("load", onLoad);
  }
})();
