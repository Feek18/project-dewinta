import axios from "axios";

export const getLayananSalon = (callback) => {
  axios
    .get("http://localhost:8000/api/layanan-salon")
    .then((res) => {
      callback(res.data.data);
      console.log(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
