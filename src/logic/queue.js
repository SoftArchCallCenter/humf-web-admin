import { API_GATEWAY_URL } from "@/variable";

const QUEUE_URL = `${API_GATEWAY_URL}/queue`

const consumeQueue = async (resId) => {
    try{
        const access_token = sessionStorage.getItem("access_token")
        const respone = await fetch(`${QUEUE_URL}/${resId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${access_token}`,
            }
        });
        const result = await respone.json();
        if (!respone.ok) {
            return {err:true, result: null};
        } else {
            if (result.menus){
                return {err:false, result};
            }
            return {err:false, result: null};
        }

    } catch (error) {
        console.log(error)
        return {err:true, result: null};
    }
    
}

const acceptOrder = async (acceptOrderDto) => {
    try{
        const access_token = sessionStorage.getItem("access_token")
        const respone = await fetch(`${QUEUE_URL}/accept`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${access_token}`,
            },
            body: JSON.stringify(acceptOrderDto),
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
    consumeQueue,
    acceptOrder
}