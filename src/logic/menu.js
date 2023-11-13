import { API_GATEWAY_URL } from "@/variable";

const MENU_URL = `${API_GATEWAY_URL}/menu`

const getAllMenuByRestaurant = async (resId) => {
    try{
        const respone = await fetch(`${MENU_URL}/res/${resId}`, {
            method: "GET",
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

const createMenu = async (createMenuDto) => {
    try{
        const access_token = sessionStorage.getItem("access_token")
        const respone = await fetch(`${MENU_URL}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                headers: {
                    "Authorization": `Bearer ${access_token}`,
                }
            },
            body: JSON.stringify(createMenuDto),
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

const deleteMenu = async (menuId) => {
    try{
        const access_token = sessionStorage.getItem("access_token")
        const respone = await fetch(`${MENU_URL}/${menuId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${access_token}`,
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
    getAllMenuByRestaurant,
    createMenu,
    deleteMenu
}