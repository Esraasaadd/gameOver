
class GameApp {
  constructor() {
    this.myLinks = document.querySelectorAll(".nav-link");
    this.myHome = document.querySelector(".home");
    this.myDetails = document.querySelector(".details");
    this.myClose = document.getElementById("close");
    this.MMORPG = document.getElementById("MMORPG");
    this.SHOOTER = document.getElementById("SHOOTER");
    this.SAILING = document.getElementById("SAILING");
    this.PERMADEATH = document.getElementById("PERMADEATH");
    this.SUPERHERO = document.getElementById("SUPERHERO");
    this.PIXEL = document.getElementById("PIXEL");
    this.myRow = document.querySelector(".row-games");
    this.loading = document.querySelector(".loading");
    this.myClose.addEventListener("click", () => {
      this.myHome.classList.remove("d-none");
      this.myDetails.classList.add("d-none");    
    });
    this.orderFun();
  }

  async getGames(type) {
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "dba269b0d1msh4c8acf6c93c9f65p16a105jsnf1c4601cd8e5",
        "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
      },
    };
    const resp = await fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${type}`,
      options
    );
    const data1 = await resp.json();
    return data1;
  }

  async getDetails(id) {
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "dba269b0d1msh4c8acf6c93c9f65p16a105jsnf1c4601cd8e5",
        "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
      },
    };
    const resp = await fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,
      options
    );
    const data2 = await resp.json();
    return data2;
  }

  display(data1) {
    let container = "";
    for (let i = 0; i < data1.length; i++) {
      container += `<div class="item col col-12 col-md-6 col-lg-4 col-xl-3 m-auto p-2" id=${
        data1[i].id
      }>
              <div class="card bg-transparent">
                <img src="${
                  data1[i].thumbnail
                }" class="card-img-top p-3" alt="...">
                <div class="card-body p-0">
                    <div class="card-header d-flex justify-content-between border-0">
                        <h5 class="card-title h6 small">${data1[i].title}</h5>
                        <span class="free">Free</span>
                    </div>
                  <p class="card-text small text-center opacity-50">${data1[
                    i
                  ].short_description
                    .split(" ")
                    .slice(0, 5)
                    .join(" ")}</p>
                  <div class="card-footer d-flex justify-content-between">
                    <span class="badge badge-bg">${data1[i].genre}</span>
                    <span class="badge badge-bg">${data1[i].platform}</span>
                  </div>
                </div>              
            </div>
            </div>`;
    }
    this.myRow.innerHTML = container;
    this.displayDetails(); // Ensure the event listener in displayDetails() is on the current cards in the DOM
    this.loading.classList.add("d-none"); // Hide the loading element
  }

    displayDetails() {
    let myCards = document.querySelectorAll(".item");
    for (let i = 0; i < myCards.length; i++) {
      myCards[i].addEventListener("click", async () => {
        this.loading.classList.remove("d-none"); // Show the loading element
        let elementId = myCards[i].id;
        let details = await this.getDetails(elementId);
        this.myHome.classList.add("d-none");
        this.myDetails.classList.remove("d-none");
        document
          .querySelector(".datails-body img")
          .setAttribute("src", details.thumbnail);
        document.querySelector("#title").innerHTML = details.title;
        document.querySelector("#category").innerHTML = details.genre;
        document.querySelector("#platform").innerHTML = details.platform;
        document.querySelector("#status").innerHTML = details.status;
        document.querySelector("#desc").innerHTML = details.description;
        document.querySelector("#link").setAttribute("href", details.game_url);
        this.loading.classList.add("d-none"); // Hide the loading element
      });
    }
  }

  async orderFun() {
    this.MMORPG.classList.add("active-link");
    this.loading.classList.remove("d-none"); // Show the loading element
    this.display(await this.getGames("mmorpg"));
    for (let i = 0; i < this.myLinks.length; i++) {
      this.myLinks[i].addEventListener("click", async () => {
        this.loading.classList.remove("d-none"); // Show the loading element
        this.display(await this.getGames(`${this.myLinks[i].innerHTML}`));
        this.MMORPG.classList.remove("active-link");
        this.SHOOTER.classList.remove("active-link");
        this.SAILING.classList.remove("active-link");
        this.PERMADEATH.classList.remove("active-link");
        this.SUPERHERO.classList.remove("active-link");
        this.PIXEL.classList.remove("active-link");
        this.myLinks[i].classList.add("active-link");
      }); 
    }
  }

}

  new GameApp();

