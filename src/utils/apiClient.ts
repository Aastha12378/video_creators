import axios from "axios";

export const defaultAxios = axios.create({
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    Expires: "0",
  },
});

export function apiClient(url: string, data = {}, method = "POST") {
  return new Promise((resolve, reject) => {
    defaultAxios({
      method,
      url,
      headers: {},
      data,
    })
      .then((res) => {
        if (res?.data) {
          resolve(res?.data);
        } else {
          let msg = res?.data?.message;
          if (res?.data?.data) {
            msg = { msg, data: res?.data?.data };
          }
          reject(msg);
        }
      })
      .catch((err) => {
        let msg = err?.response?.data?.message || err?.message;
        reject(msg);
      });
  });
}
