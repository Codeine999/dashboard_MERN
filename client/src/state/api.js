import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
    reducerPath: "adminApi",
    tagTypes: ["User", "Products", "Customrs", "Transaction", "Blog","login", "Header"
    ],

    endpoints: (build) => ({
        login: build.mutation({
            query: ({ email, password }) => ({
              url: '/login',
              method: 'POST',
              body: { email, password },
            }),
          }),
        getUser: build.query({
            query: (id) => `general/user/${id}`,
            providesTags: ["User"],
        }),
        getProducts: build.query({
            query: () => "client/products",
            providesTags: ["Products"],
        }),
        getCustomers: build.query({
            query: () => "user/all",
            providesTags: ["Customers"],
        }),
        getTransaction: build.query({
            query: () => "client/transaction",
            providesTags: ["Transaction"],
        }),
        getBlogs: build.query({
            query: () => "blog",
            providesTags: ["Blog"],
        }),
        getBlogById: build.query({
            query: (id) => `blog/${id}`,
            providesTags: ["Blog"],
        }),
        createBlog: build.mutation({
            query: (newBlog) => ({
              url: "blog",
              method: "POST",
              body: newBlog,
            }),
            invalidatesTags: ["Blog"],
        }),
        updateBlog: build.mutation({
            query: ({ id, updatedBlog }) => ({
              url: `blog/${id}`,
              method: 'PUT',
              body: updatedBlog,
            }),
            invalidatesTags: ['Blog'],
          }),
        deletePost: build.mutation({
            query: (id) => ({
              url: `blog/${id}`,
              method: "DELETE",
            }),
            invalidatesTags: ["Blog"],
        }),
        updateHeader: build.mutation({
          query: ({ id, updateHeader }) => ({
            url: `update/header/`,
            method: 'PUT',
            body: updateHeader,
          }),
          invalidatesTags: ['Header'],
        }),
        getHeaderQuery: build.query({
          query: () => "update/header/",
          providesTags: ["Header"],
        }),
        createHeader: build.mutation({
          query: (newHeader) => ({
            url: "update/header",
            method: "POST",
            body: newHeader,
          }),
          invalidatesTags: ["Header"],
      })
      }),
    })

export const { 
  useGetUserQuery, 
  useLoginMutation, 
  useGetProductsQuery, 
  useGetCustomersQuery, 
  useGetTransactionQuery,
  useGetBlogsQuery,
  useGetBlogByIdQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeletePostMutation,
  useUpdateHeaderMutation,
  useGetHeaderQuery,
  useCreateHeaderMutation
 } = api;