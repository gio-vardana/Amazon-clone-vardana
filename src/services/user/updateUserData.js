import { baseAPI } from "../baseApi";


export const updateUserData = async (updatesObj) => {
  const token = localStorage.getItem("token");
	const response = await baseAPI.put('/api/User/updateuserdata', 
    updatesObj,
    {headers: {
      Authorization: "Bearer " + token,
    }});
	return response;
}