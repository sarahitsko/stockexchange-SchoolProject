const stocksDataUrlWithSymbol = (symbol) =>
  `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${symbol}?serietype=line`;
const profileEl = document.querySelector(".profile");
const canvas = document.querySelector("canvas");

const queries = new URLSearchParams(window.location.search);
const symbol = queries.get("symbol");

function createProfile(profile) {
  // description,image,website
  // changesPercentage,companyName

  const companyName = document.createElement("h2");
  const image = document.createElement("img");
  const desc = document.createElement("p");
  const perc = document.createElement("span");

  companyName.innerText = profile.companyName;
  image.src = profile.image;
  desc.innerText = profile.description;

  const sign_class =
    parseFloat(profile.changesPercentage) < 0 ? "neg_sign" : "pos_sign";
  perc.innerText = profile.changesPercentage;
  perc.innerHTML = `(${Number(profile.changesPercentage).toFixed(2)})`;

  perc.classList.add(sign_class);

  profileEl.appendChild(image);
  profileEl.appendChild(companyName);
  profileEl.appendChild(perc);
  profileEl.appendChild(desc);
}

async function fetchProfile() {
  const url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`;
  const companyProfile = await fetch(url);
  const profile = await companyProfile.json();

  if (profile) {
    createProfile(profile.profile);
    fetchStockData();
  }
}

function chartData(stockHistory) {
  const mappedStocks = stockHistory;
  const labels = [];
  const close = [];

  for (let stock of mappedStocks) {
    close.push(stock.close);
    labels.push(stock.date);
  }

  const data = {
    labels: labels.reverse(),
    datasets: [
      {
        label: "Stock History",
        data: close.reverse(),
        fill: true,
        borderColor: "rgb(255, 99, 132)",
        tension: 0.1,
        backgroundColor: "rgb(255, 99, 132)",
      },
    ],
  };
  return {
    type: "line",
    data: data,
  };
}

async function fetchStockData() {
  const stocksData = await fetch(stocksDataUrlWithSymbol(symbol))
    .then((res) => res.json())
    .catch(console.log);

  const stockHistory = stocksData.historical;
  new Chart(canvas.getContext("2d"), chartData(stockHistory));
}

fetchProfile();
