import axios from "axios";

export const getImage  = (callback) => {
    axios
      .get("http://localhost:8000/api/images")
      .then((res) => {
        callback(res.data.data);
        // console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };