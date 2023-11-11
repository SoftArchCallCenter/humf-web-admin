import { API_GATEWAY_URL } from "@/variable";

const MENU_URL = `${API_GATEWAY_URL}/menus`

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
        const respone = await fetch(`${MENU_URL}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
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
        const respone = await fetch(`${MENU_URL}/${menuId}`, {
            method: "DELETE",
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