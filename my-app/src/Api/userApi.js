import axiosClient from "./axiosClient";

export const loginApi = (data) => axiosClient.post("/api/login", data);
export const forgotApi = (data) =>
  axiosClient.post("/api/invite_reset_password", data);
export const profileApi = (data, token) =>
  axiosClient.put("/api/profile", data, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

export const passApi = (data, token) =>
  axiosClient.put("/api/profile/change_password", data, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

export const getProfileApi = (token) =>
  axiosClient.get("/api/profile/detail", {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
