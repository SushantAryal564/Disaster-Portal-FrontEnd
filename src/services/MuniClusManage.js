import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

let access_token = localStorage.getItem("access_token");
export const manageApiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api/v1/",
  }),
  tagTypes: ["ActivityLog"],
  endpoints: (builder) => ({
    getActivity: builder.query({
      query: (id) =>
        `response/activity/?disaster__is_closed=&disaster__id=${id}&disaster__Ward=`,
      providesTags: ["ActivityLog"],
    }),
    updateActivity: builder.mutation({
      query: (activity) => ({
        url: "response/activity/",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        body: activity,
      }),
      invalidatesTags: ["ActivityLog"],
    }),
  }),
});
export const { useGetActivityQuery, useUpdateActivityMutation } =
  manageApiSlice;
