const express = require("express");
const axios = require("axios");
const app = express();
const port = 3000;
app.use(express.static("public"));
app.set("view engine", "pug");

async function fetchPopularGames() {
  const options = {
    method: "GET",
    url: "https://free-to-play-games-database.p.rapidapi.com/api/filter",
    params: {
      tag: "3d.mmorpg.fantasy.pvp",
    },
    headers: {
      "X-RapidAPI-Key": "a77371552fmshbd70316975a2b93p1fc797jsnda4a2f8d9921",
      "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error("Error fetching popular games:", error.message);
    throw error;
  }
}

async function fetchGameDetails(id) {
  const options = {
    method: "GET",
    url: `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,
    headers: {
      "X-RapidAPI-Key": "a77371552fmshbd70316975a2b93p1fc797jsnda4a2f8d9921",
      "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error("Error fetching game details:", error.message);
    throw error;
  }
}

async function fetchGiveAwayData() {
  const options = {
    method: "GET",
    url: "https://gamerpower.p.rapidapi.com/api/filter",
    params: {
      platform: "epic-games-store.steam.android",
    },
    headers: {
      "X-RapidAPI-Key": "a77371552fmshbd70316975a2b93p1fc797jsnda4a2f8d9921",
      "X-RapidAPI-Host": "gamerpower.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error("Error fetching upcoming games:", error.message);
    throw error;
  }
}
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/popular-games", async (req, res) => {
  try {
    const popularGames = await fetchPopularGames();
    res.render("popularGames", { popularGames });
  } catch (error) {
    res.render("error");
  }
});

app.get("/popular-games/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const gameDetails = await fetchGameDetails(id);
    res.render("gameDetails", { gameDetails });
  } catch (error) {
    res.render("error");
  }
});

app.get("/giveaways", async (req, res) => {
  try {
    const upcomingGames = await fetchGiveAwayData();
    res.render("giveaways", { upcomingGames });
  } catch (error) {
    res.render("error");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
