import { API_GATEWAY_URL } from "@/variable";

const AUTH_URL = `${API_GATEWAY_URL}/auth`

const getUserId = (router) => {
    const user = sessionStorage.getItem('user')
    if (user){
        return JSON.parse(user).userId
    } else {
        alert("please sign in")
        router.push("/")
        return
    }
}

const signup = async (signupUserDto) => {
    try{
        const respone = await fetch(`${AUTH_URL}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(signupUserDto),
        });
        const result = await respone.json();
        if (!respone.ok) {
            return {err:true, result: null};
        } else {
            return {err:false, result};
        }
    } catch (error) {
        console.log(error)
        return {err:true, result: null};
    } 
}

const login = async (loginUserDto) => {
    try{
        const respone = await fetch(`${AUTH_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginUserDto),
        });
        const result = await respone.json();
        if (!respone.ok) {
            return {err:true, result: null};
        } else {
            return {err:false, result};
        }
    } catch (error) {
        console.log(error)
        return {err:true, result: null};
    } 
}

const logout = async () => {
    try{
        const access_token = sessionStorage.getItem("access_token")
        // console.log(access_token)
        const respone = await fetch(`${AUTH_URL}/logout`, {
            method: "POST",
            headers: {
                "authorization": `Bearer ${access_token}`
            }
        });
        const result = await respone.json();
        if (!respone.ok) {
            return {err:true, result: null};
        } else {
            return {err:false, result};
        }
    } catch (error) {
        console.log(error)
        return {err:true, result: null};
    } 
}

module.exports = {
    getUserId,
    signup,
    login,
    logout
}