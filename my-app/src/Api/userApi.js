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

export const getListReviews = (token, useReviewId, useUserId) =>
  axiosClient.get("/api/review/list-review", {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    params: { useReviewId: useReviewId, useUserId: useUserId },
  });

export const reviewApi = (data, token, check_id, user_id) =>
  axiosClient.put(`/api/review/${check_id}/${user_id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
export const inviteApi = (data) => axiosClient.post("/api/invite", data);

export const getCheckpointsByUserId = (token) =>
  axiosClient.get("/api/checkpoint/all", {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

export const getListChecksApi = (token) =>
  axiosClient.get("/api/checkpoint", {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

export const getCheckApi = (token, id) =>
  axiosClient.get(`/api/checkpoint/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

export const getListUsersApi = (token) =>
  axiosClient.get("/api/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

export const getReviewsByCheckpointId = (token, id) =>
  axiosClient.get(`api/review/${id}/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

export const getReviewsByCheckpointIdAndUserId = (
  token,
  checkpoint_id,
  user_id
) =>
  axiosClient.get(`api/review/${checkpoint_id}/${user_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

export const getListUsersByCheckpointId = (token, checkpoint_id) =>
  axiosClient.get(`api/review/${checkpoint_id}/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

export const getAllCheckpointApi = (token) =>
  axiosClient.get("/api/checkpoint", {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
