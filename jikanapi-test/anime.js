/* NavSearchID and Main grid creation  */
const animeNavSearchInput = document.getElementById("a-nav-srch-id");

const animeNavResultsContainer = document.querySelector(
  ".a-srch-rlt-main-cont",
);

/* Input Event */
animeNavSearchInput.addEventListener("keydown", async (event) => {
  if (event.key === "Enter") {
    animeNavSearchInput.blur();

    const animeName = animeNavSearchInput.value;

    const response = await fetch(
      `https://api.jikan.moe/v4/anime?q=${animeName}`,
    );

    const data = await response.json();

    /* innerHTML new data deletion */
    animeNavResultsContainer.innerHTML = "";

    /* for each anime */
    data.data.forEach((anime) => {
      /* for each studio */
      let stdlb = "";

      anime.studios.forEach((studio) => {
        if (stdlb == "") {
          stdlb = studio.name;
        } else {
          stdlb = stdlb + ", " + studio.name;
        }
      });

      if (!anime.studios?.length) {
        stdlb = "Unknown";
      }

      /* for each date */
      let dateFrom = "Unknown";
      let dateTo = "Unknown";
      let formattedDate = "Unknown";

      if (anime.episodes > 1) {
        if (anime.aired.from) {
          const [year, month, day] = anime.aired.from.split("T")[0].split("-");

          dateFrom = `${day}-${month}-${year}`;
        }

        if (anime.aired.to) {
          const [year, month, day] = anime.aired.to.split("T")[0].split("-");

          dateTo = `${day}-${month}-${year}`;
        }

        formattedDate = `${dateFrom} to ${dateTo}`;
      } else {
        if (anime.aired.from) {
          const [year, month, day] = anime.aired.from.split("T")[0].split("-");

          formattedDate = `${day}-${month}-${year}`;
        } else {
          formattedDate = "Unknown";
        }
      }

      /* for each genre */
      let genlb = "";

      anime.genres.forEach((genre) => {
        if (genlb == "") {
          genlb = genre.name;
        } else {
          genlb = genlb + ", " + genre.name;
        }
      });

      if (!anime.genres?.length) {
        genlb = "Unknown";
      }

      /* for each demographics */
      let demographicslb = "";

      anime.demographics.forEach((demographic) => {
        if (demographicslb == "") {
          demographicslb = demographic.name;
        } else {
          demographicslb = demographicslb + ", " + demographic.name;
        }
      });

      if (!anime.demographics?.length) {
        demographicslb = "Unknown";
      }

      /* for each synopsis */
      let synolb = "";

      if (!anime.synopsis) {
        synolb = "Unknown";
      } else {
        synolb = anime.synopsis;
      }

      /* for each rank */
      let ranklb = "";

      if (!anime.rank) {
        ranklb = "-";
      } else {
        ranklb = anime.rank;
      }

      /* for each score */
      let scorelb = "";

      if (!anime.score) {
        scorelb = "-";
      } else {
        scorelb = anime.score;
      }

      /* for each popularity */
      let populb = "";

      if (!anime.popularity) {
        populb = "-";
      } else {
        populb = anime.popularity;
      }

      /* for each title */
      let titlelb = "";

      if (anime.title.length > 86) {
        titlelb = `${anime.title.substring(0, 86)}...`;
      } else {
        titlelb = anime.title;
      }

      /* Main grid fill */
      animeNavResultsContainer.innerHTML += `<div class="a-srch-rlt-dad-cont">
                <span class="a-srch-rlt-img-cont">
                    <img src="${anime.images.jpg.image_url}" alt="anime">
                </span>

                <div class="a-srch-rlt-info-cont">
                    <div class="a-srch-rlt-tdata-cont">
                        <div class="a-srch-rlt-title-cont">
                            <p>${titlelb}</p>
                        </div>

                        <div class="a-srch-rlt-extdata-cont">
                            <p>${anime.type}</p>
                            <p>${anime.episodes}</p>
                            <p>${anime.status}</p>
                            <p>${formattedDate}</p>
                            <p>${stdlb}</p>
                            <p>${genlb}</p>
                            <p>${demographicslb}</p>
                        </div>
                    </div>

                    <div class="a-srch-rlt-reg-cont">
                    <div class="a-srch-rlt-reg-lbl">
                        <label>Completed</label>
                    </div>
                    <div class="a-srch-rlt-reg-lbl">
                        <label>Rating</label>
                    </div>
                    <div class="a-srch-rlt-reg-lbl">
                        <label>Episodes</label>
                    </div>
                    </div>
                </div>

                <span class="a-srch-rlt-logscrdes-cont">
                    <div class="a-srch-rlt-logscr-cont">
                        <div class="a-srch-rlt-scr-cont">
                            <div class="a-srch-rlt-scrlbl-cont">
                                <p>Rank</p>
                            </div>
                            <div class="a-srch-rlt-scrnum-cont">
                                <p>${ranklb}</p>
                            </div>
                        </div>
                        <div class="a-srch-rlt-scr-cont">
                            <div class="a-srch-rlt-scrlbl-cont">
                                <p>Score</p>
                            </div>
                            <div class="a-srch-rlt-scrnum-cont">
                                <p>${scorelb}</p>
                            </div>
                        </div>
                        <div class="a-srch-rlt-scr-cont">
                            <div class="a-srch-rlt-scrlbl-cont">
                                <p>Popularity</p>
                            </div>
                            <div class="a-srch-rlt-scrnum-cont">
                                <p>${populb}</p>
                            </div>
                        </div>
                        <div class="a-srch-rlt-log-btn">
                            <button class="a-srch-rlt-log-btn">+ Log</button>
                        </div>
                    </div>

                    <div class="a-srch-rlt-desc-cont">
                        <p>${synolb}</p>
                    </div>
                </span>

            </div>
            `;
    });
  }
});

/* Final Edition */
