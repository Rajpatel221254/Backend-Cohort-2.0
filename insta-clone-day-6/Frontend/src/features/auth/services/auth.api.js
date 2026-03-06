import axios from "axios";

const authApi = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  withCredentials: true,
});

export async function register(email, username, password) {
  try {
    const response = await authApi.post("/register", {
      username,
      email,
      password,
    });

    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function login(identifier, password) {
  try {
    const response = await authApi.post("/login", {
      identifier,
      password,
    });

    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function getMe() {
  try {
    const response = await authApi.get("/me");

    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function updateUserInfo(formData) {
  try {
    const response = await axios.patch(
      "http://localhost:3000/api/user/",
      formData,
      {
        withCredentials: true,
      },
    );

    return response.data;
  } catch (err) {
    console.log(err);
  }
}
