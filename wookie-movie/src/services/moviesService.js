export const getMoviesService = async () => {
  let uri = `https://wookie.codesubmit.io/movies`;

  let h = new Headers();
  h.append("Authorization", "Bearer Wookie2021");

  let req = new Request(uri, {
    method: "GET",
    headers: h,
    credentials: "same-origin",
  });
  const response = await fetch(req);
  return response.json();
};
