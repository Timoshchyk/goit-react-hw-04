import axios from "axios";

const API_KEY = "t0qyi3naDpSfQj9P4h4Tj3gZ8pTOAVGXJJPI0p0fPM8";
axios.defaults.params = {
  orientation: "landscape",
  per_page: 15,
};

export const getPhotos = async (query, page) => {
  const { data } = await axios.get(
    `https://api.unsplash.com/search/photos?query=${query}&page=${page}&client_id=${API_KEY}`
  );

  return data;
};
