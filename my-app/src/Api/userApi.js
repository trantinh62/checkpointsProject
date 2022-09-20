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
  axiosClient.get("/api/checkpoint/all-reivew-id", {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

export const getReviewsByCheckpointIdAndUserId = (
  token,
  useReviewId,
  useUserId
) =>
  axiosClient.get(
    `/api/review/list-review?useReviewId=${useReviewId}&useUserId=${useUserId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    }
  );

export const getDetailCheckpointApi = (token, id) =>
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
export const getCheckedUser = (token, check_id, user_id) =>
  axiosClient.get(`/api/review/${check_id}/${user_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
