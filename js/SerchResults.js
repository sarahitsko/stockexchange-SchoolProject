class SearchResults {
  constructor(results) {
    this.results = results;
    //this.url = urlWithInput(query);
    this.image = document.createElement("img");
  }

  async renderResults(stocks) {
    console.log(stocks);

    for (let i = 0; i < stocks.length; i++) {
      const symbol = stocks[i].symbol;
      const companyDetails = await fetchProfile(symbol);
      console.log(companyDetails);
      //let perc = companyDetails.profile.changesPercentage;

      const stockRow = document.createElement("div");

      let link = document.createElement("a");
      link.classList.add("list_item");
      link.href = `/company.html?symbol=${symbol}`;
      link.innerHTML = companyDetails.profile.companyName;

      const img = document.createElement("img");
      img.src = companyDetails.profile.image;
      img.height = 38;

      const symbolElement = document.createElement("span");
      symbolElement.innerHTML = `(${symbol})`;
      symbolElement.classList.add("symbolElement");

      const priceChange = document.createElement("span");
      priceChange.innerHTML = `(${Number(
        companyDetails.profile.changesPercentage
      ).toFixed(2)})`;
      if (parseFloat(companyDetails.profile.changesPercentage) > 0) {
        priceChange.classList.add("pos_sign");
      } else {
        priceChange.classList.add("neg_sign");
      }

      stockRow.appendChild(img);
      stockRow.appendChild(link);
      stockRow.appendChild(symbolElement);
      stockRow.appendChild(priceChange);
      this.results.appendChild(stockRow);

      fetchProfile(stocks[i].symbol);
    }

    async function fetchProfile(symbol) {
      const url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`;
      const companies = await fetch(url);
      const company = await companies.json();
      if (companies) {
        const profile = companies.profile;
        //createProfile(profile);
        //fetchStockData();
      }

      spinner.classList.add("visually-hidden");
      return company;
      // fetchProfile(Param);
      // console.log(Param);
    }
  }
}
