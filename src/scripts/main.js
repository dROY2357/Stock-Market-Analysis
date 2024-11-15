import { renderChart } from "./chart.js"; //importing renderChart function from external module

let stock = "AAPL";
let dur = "1mo";

//Function to render the summary of the currently selected stock. AAPL stock by default.

async function renderSummary(stock) {
  try {
    const response = await fetch(
      "https://stocksapi-uhe1.onrender.com/api/stocks/getstocksprofiledata"
    );
    const result = await response.json();
    document.querySelector("#summary").textContent =
      result.stocksProfileData[0][stock].summary;
  } catch (error) {
    console.log(error);
  }
}

//Function to get details of a specified stock

async function getDetails(stock) {
  let bookVal;
  let profit;
  try {
    const response = await fetch(
      "https://stocksapi-uhe1.onrender.com/api/stocks/getstockstatsdata"
    );
    const result = await response.json();
    bookVal = result.stocksStatsData[0][stock].bookValue;
    profit = result.stocksStatsData[0][stock].profit;
  } catch (error) {
    console.log(error);
  }
  return { bookVal, profit };
}

//Function to render details of a specified stock

async function renderDetails(stock) {
  const resultFetched = await getDetails(stock);
  let bookValFetched = resultFetched.bookVal;
  let profitFetched = resultFetched.profit;

  //console.log(result.stocksStatsData[0][stock]);
  const bookVal = document.querySelector("#bookVal");
  const profit = document.querySelector("#profit");
  const name = document.querySelector("#stockName");
  bookVal.textContent = `$${bookValFetched}`;
  profit.textContent = `${profitFetched}%`;
  name.textContent = stock;

  if (profitFetched > 0) {
    profit.style.color = "green";
  } else if (profitFetched <= 0) {
    profit.style.color = "red";
  }
}

//Function to render all the content on the site from fetched data

function renderAllContent(stock = "AAPL", dur = "1mo") {
  renderSummary(stock);
  renderDetails(stock);
  renderChart(stock, dur);
}

//Adding click event listener to the buttons specifying stock ranges for user to select

const m1Btn = document.querySelector("#m1Btn");
m1Btn.addEventListener("click", () => {
  renderAllContent(stock, "1mo");
  dur = "1mo";
});
const m3Btn = document.querySelector("#m3Btn");
m3Btn.addEventListener("click", () => {
  renderAllContent(stock, "3mo");
  dur = "3mo";
});
const y1Btn = document.querySelector("#y1Btn");
y1Btn.addEventListener("click", () => {
  renderAllContent(stock, "1y");
  dur = "1y";
});
const y5Btn = document.querySelector("#y5Btn");
y5Btn.addEventListener("click", () => {
  renderAllContent(stock, "5y");
  dur = "5y";
});

//Function to render all the stocks under stock list with buttons to select that specific stock

async function renderStockList() {
  const list = [
    "AAPL",
    "MSFT",
    "GOOGL",
    "AMZN",
    "PYPL",
    "TSLA",
    "JPM",
    "NVDA",
    "NFLX",
    "DIS",
  ];
  const listElem = document.querySelector("#stockListItems");

  for (let item of list) {
    const listItemElem = document.createElement("div");
    listItemElem.classList.add("list-item");
    const btnElem = document.createElement("button");
    btnElem.textContent = item;
    btnElem.className = "list-btn";
    btnElem.addEventListener("click", () => {
      renderAllContent(item, dur);
      stock = item;
    });
    const bookValSpan = document.createElement("span");
    const profitSpan = document.createElement("span");
    const { bookVal, profit } = await getDetails(item);
    bookValSpan.textContent = `$${bookVal}`;
    profitSpan.textContent = `${profit.toFixed(2)}%`;
    if (profit > 0) {
      profitSpan.style.color = "green";
    } else if (profit <= 0) {
      profitSpan.style.color = "red";
    }
    listItemElem.append(btnElem, bookValSpan, profitSpan);
    listElem.appendChild(listItemElem);
  }
}

//First render call

renderStockList();
renderAllContent();
