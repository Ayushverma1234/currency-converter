let currApi =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const btn = document.querySelector(" form button");
const drop = document.querySelectorAll(".dropdown select");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".stm");

for (select of drop) {
  for (code in countryList) {
    let optionVal = document.createElement("option");

    optionVal.innerText = code;

    optionVal.value = code;

    if (select.name === "from" && code === "USD") {
      optionVal.selected = "Selected";
    } else if (select.name === "to" && code === "INR") {
      optionVal.selected = "Selected";
    }
    select.append(optionVal);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  let currCode = element.value;
  let countCode = countryList[currCode];
  let newSRC = `https://flagsapi.com/${countCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSRC;
};

const updateExchange = async () => {
  let amount = document.querySelector(".amount input");
  let amountValue = amount.value;
  if (amountValue === "" || amountValue < 0) {
    amountValue = 1;
    amount.value = "1";
  }

  const url = `${currApi}/${fromCurr.value.toLowerCase()}.json`;

  let response = await fetch(url);
  let data = await response.json();
  let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
  let finalAmount = (rate * amountValue).toFixed(2);

  msg.innerText = `${amountValue} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};
btn.addEventListener("click", async (evt) => {
  evt.preventDefault(); // page will not refresh after button click
  updateExchange();
});

window.addEventListener("load", ()=>{
    updateExchange();
    
})
