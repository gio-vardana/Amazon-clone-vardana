import { baseAPI } from "../baseApi";

export const userSignIn = async (loginObj) => {
    const response = await baseAPI.post("/api/User/LogIn", loginObj);
    return response;
};