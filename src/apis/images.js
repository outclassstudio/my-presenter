"use server";

// import axios from "axios";

// const apiClient = () => {
//   const formData = new FormData();
//   const instance = axios.create({
//     baseURL: "http://localhost:3000/",
//     headers: {
//       Authorization: `Bearer ${process.env.REACT_APP_IMAGE_TOKEN}`,
//       body: formData,
//     },
//     // withCredentials: true,
//   });

//   return instance;
// };

// export const getUploadUrl = async () => {
//   const response = await apiClient().post(
//     `https://api.cloudflare.com/client/v4/accounts/${process.env.REACT_APP_IMAGE_ACCOUNT}/images/v2/direct_upload`
//   );
//   console.log(response);
// };

export async function getUploadUrl() {
  // const formData = new FormData();
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.REACT_APP_IMAGE_ACCOUNT}/images/v2/direct_upload`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_IMAGE_TOKEN}`,
      },
      // body: formData,
    }
  );
  const data = await response.json();
  return data;
}
