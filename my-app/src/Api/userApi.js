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

export const reviewApi = (data, token, review_id) =>
  axiosClient.put(`/api/review/${review_id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
export const inviteApi = (data) => axiosClient.post("/api/invite", data);

export const getCheckApi = (token) =>
  axiosClient.get("/api/checkpoint", {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

export const createApi = (data, token) =>
  axiosClient.post("/api/checkpoint", data, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

export const getCheckpointsByUserId = (token) =>
  axiosClient.get("/api/checkpoint/all", {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

export const getCheckpointsByReviewId = (token) =>
  axiosClient.get("/api/checkpoint/all-review-id", {
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

export const getCheckpointByCheckId = (token, id) =>
  axiosClient.get(`/api/checkpoint/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

export const getAllUsersApi = (token) =>
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

export const getDetailCheckpointApi = (token, id) =>
  axiosClient.get(`/api/checkpoint/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

export const getCheckedUser = (token, check_id, user_id) =>
  axiosClient.get(`/api/review/${check_id}/${user_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

export const registerApi = (data, token) =>
  axiosClient.put("/api/register?token=" + token, data);

export const resetApi = (data, token) =>
  axiosClient.put("/api/reset_password?token=" + token, data);

export const getReviewsByCheckpointIdAndReviewId = (
  token,
  check_id,
  review_id
) =>
  axiosClient.get(`/api/review/get/${check_id}/${review_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

export const getReviewsByCheckpointIdAndMyReviewId = (token, checkpoint_id) =>
  axiosClient.get(`/api/review/auth/${checkpoint_id}/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

export const getAllCheckpoints = (token) =>
  axiosClient.get("/api/checkpoint/all", {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

export const getAvgByCheckpointIdMyHistory = (token, check_id) =>
  axiosClient.get(`/api/avg/${check_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

export const getAvgByCheckpointIdAuthor = (token, check_id) =>
  axiosClient.get(`/api/avg/${check_id}/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

export const updateGpointApi = (data, token) =>
  axiosClient.put("/api/profile/update-g-point", data, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

export const updateAllUserApi = (data, token) =>
  axiosClient.put("/api/profile/many", data, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

export const deleteCheckpoint = (check_id, token) =>
  axiosClient.delete(`/api/checkpoint/delete/${check_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

export const createAndDeleteReview = (data, token) =>
  axiosClient.post("/api/review", data, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
