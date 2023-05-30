class SearchForm {
  constructor(searchForm) {
    this.searchForm = searchForm;
  }

  load() {
    // create form
    this.searchForm.classList = "input-group container-fluid";
    this.searchForm.role = "search";

    // create input
    this.input = document.createElement("input");
    this.input.classList = "form-control me-2";
    this.input.type = "text";
    this.input.placeholder = "Search";
    this.input.id = "fromUser";
    this.input.value = "";

    // create button
    this.button = document.createElement("button");
    this.button.classList = "btn btn-outline-success";
    this.button.id = "button";
    this.button.type = "submit";
    this.button.innerText = "search";

    // spinner
    this.spinner = document.createElement("div");
    this.spinner.classList =
      "spinner-border spinner-border-lg text-success rounded-circle visually-hidden";
    this.spinner.id = "spinner";
    this.spinner.style = "width: 3rem; height: 3rem";
    this.spinner.role = "status";

    this.searchForm.appendChild(this.input);
    this.searchForm.appendChild(this.button);

    this.searchForm.appendChild(this.spinner);
  }

  callResults(query) {
    const limit = 10;

    const stocks = fetch(
      `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${query}&limit=${limit}&exchange=NASDAQ`
    )
      .then((res) => res.json().then((stocks) => this.renderResults(stocks)))
      .catch(console.log);

    //callback(stocks);
  }

  onSearch(cb) {
    this.renderResults = cb;
    this.button.addEventListener("click", (e) => {
      e.preventDefault();
      this.spinner.classList.remove("visually-hidden");
      this.callResults(this.input.value);
    });
  }
}
