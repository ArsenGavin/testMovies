import { MOVIES_DATA, MOVIES_TITLES, MOVIES_GENRES } from "./props";
const URL = "http://localhost:3000";

describe("Global Test e2e 🏠", () => {
  beforeEach(() => {
    cy.visit(URL);
  });

  it("Classic Render", () => {
    cy.url().should("include", "/");
    cy.title().should("include", "Wookie Movie");
  });

  it("Render NavBar Component", () => {
    cy.get("#navBar");
    cy.get("#favBtnLink").click();
    cy.url().should("include", "/favorites");
    cy.get("#linkNavBarHome").click();
    cy.url().should("include", "/");
    cy.get("#logoImg");
    cy.get("#container-Link-FavBtn-autoComplete");
    cy.get("#favBtn");
    MOVIES_TITLES.map((movieTitle) => {
      cy.get("#autoComplete").click().type(movieTitle).click();
      cy.contains(movieTitle).click();
      let currentMovie = MOVIES_DATA.find(
        (movie) => movie.title === movieTitle
      );
      let currentId = currentMovie.id;
      cy.get("#container1CardMovie" + currentId);
      cy.get("#autoComplete").clear();
    });
  });

  it("Render TypesMovies Component", () => {
    cy.get("#containerTypes");
    MOVIES_GENRES.map((genre) => {
      cy.get("#genre" + genre);
      cy.contains(genre);
    });
  });

  it("Render TypeMovie Component, CardMovie Component and favorite function", () => {
    cy.contains("Favorite");
    MOVIES_GENRES.map((genre) => {
      cy.get("#containerPoster" + genre);
    });
    MOVIES_DATA.map((movie) => {
      cy.get("#poster" + movie.id).click();
      cy.get("#container1CardMovie" + movie.id);

      cy.get("#card1CardMovie" + movie.id);
      cy.get("#imgCardMovie" + movie.id);
      cy.get("#card2CardMovie" + movie.id);
      cy.get("#container2CardMovie" + movie.id);
      cy.get("#titleCardMovie" + movie.id);
      cy.get("#ratingCardMovie" + movie.id);
      cy.get("#container3CardMovie" + movie.id);
      cy.get("#yearsCardMovie" + movie.id);
      cy.get("#lenghtCardMovie" + movie.id);
      cy.get("#director" + movie.id);
      cy.get("#castCardMovie" + movie.id);
      cy.get("#overviewCardMovie" + movie.id);
      cy.contains(movie.title);
      cy.contains(movie.released_on.substr(0, 4));
      cy.contains(movie.length);
      Array.isArray(movie.director)
        ? movie.director.map((director) => {
            cy.contains(director);
          })
        : cy.contains(movie.director);
      Array.isArray(movie.cast)
        ? movie.cast.map((cast) => {
            cy.contains(cast);
          })
        : cy.contains(movie.cast);
      cy.get("#addIconBtnFavCardMovie" + movie.id).click();
      cy.get("#linkNavBarHome").click();
    });
    cy.get("#favBtnLink").click();
    MOVIES_DATA.map((movie) => {
      cy.get("#PosterFavorite" + movie.id).click();
      cy.get("#container1CardMovie" + movie.id);
      cy.get("#removeIconBtnFavCardMovie" + movie.id).click();
      cy.get("#favBtnLink").click();
    });
    cy.get("#favoriteYet");
  });
});
