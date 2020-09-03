import axios from "axios";

export const post = (url, data) => {
  const config = {
    method: "post",
    url: process.env.MIX_API_URL + url,
    data
  };
  axios.create({
    config: {
      headers: {
        "Content-Type": "application/json"
      }
    }
  });
  return axios(config);
};

export const postJWT = (url, data) => {
  const config = {
    method: "post",
    url: process.env.MIX_API_URL + url,
    data
  };
  axios.create({
    config: {
      headers: {
        "Content-Type": "application/json"
      }
    }
  });
  axios.interceptors.request.use(
    function(config) {
      const accessToken = localStorage.getItem("token");
      config.headers["Authorization"] = `Bearer ${accessToken}`;
      return config;
    },
    function(error) {
      return Promise.reject(error);
    }
  );
  return axios(config);
};

export const getJWT = url => {
  const config = {
    method: "get",
    url: process.env.MIX_API_URL + url
  };
  axios.create({
    config: {
      headers: {
        "Content-Type": "application/json"
      }
    }
  });
  axios.interceptors.request.use(
    function(config) {
      const accessToken = localStorage.getItem("token");
      config.headers["Authorization"] = `Bearer ${accessToken}`;
      return config;
    },
    function(error) {
      return Promise.reject(error);
    }
  );
  return axios(config);
};
