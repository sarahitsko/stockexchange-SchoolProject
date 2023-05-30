class Marquee {
  constructor(marquee) {
    this.marquee = marquee;
    this.url =
      "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/quotes/nyse";
  }

  async marqueeData() {
    const res = await fetch(this.url);
    const dailyData = await res.json();

    for (let i = 0; i < 200; i++) {
      const symbol = dailyData[i].symbol;
      const price = document.createElement("h3");
      price.classList.add("category");
      price.innerHTML = `<span class="neg_sign">${symbol}</span> (${Number(
        dailyData[i].price
      ).toFixed(2)})`;

      this.marquee.append(price);
      if (dailyData[i].price > 0) {
        price.classList.add("pos_sign");
      } else {
        price.classList.add("neg_sign");
      }
    }
  }
}
