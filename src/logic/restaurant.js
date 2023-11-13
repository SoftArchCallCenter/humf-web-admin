import { API_GATEWAY_URL } from "@/variable";

const RESTAURANT_URL = `${API_GATEWAY_URL}/restaurant`

const getRestaurantByUserId = async (userId) => {
    try{
        const access_token = sessionStorage.getItem("access_token")
        const respone = await fetch(`${RESTAURANT_URL}/user/${userId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${access_token}`
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

const addRestaurant = async (createRestaurantDto) => {
    try{
        const access_token = sessionStorage.getItem("access_token")
        const respone = await fetch(`${RESTAURANT_URL}`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${access_token}`,
            },
            body: JSON.stringify(createRestaurantDto),
        })
        const result = await respone.json();
        if (!respone.ok) {
            return {err:true, result: null};
        } else {
            return {err:false, result};
        }
    } catch (error){
        console.log(error)
        return {err:true, result: null}
    }
}

const deleteRestaurant = async (resId) => {
    try{
        const access_token = sessionStorage.getItem("access_token")
        const respone = await fetch(`${RESTAURANT_URL}/${resId}`,{
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${access_token}`,
            }
        })
        const result = await respone.json();
        if (!respone.ok) {
            return {err:true, result: null};
        } else {
            return {err:false, result};
        }
    } catch (error){
        console.log(error)
        return {err:true, result: null}
    }
}

const getResId = (router) => {
    const resId = sessionStorage.getItem('resId')
    if (resId){
        return +resId
    } else {
        alert("please add restaurant")
        router.push("/kitchen")
        return
    }
}

module.exports = {
    getRestaurantByUserId,
    addRestaurant,
    deleteRestaurant,
    getResId
}