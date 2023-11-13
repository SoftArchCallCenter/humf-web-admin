import { API_GATEWAY_URL } from "@/variable";

const KITCHEN_URL = `${API_GATEWAY_URL}/kitchen`

const getTickets = async (resId) => {
    try{
        const access_token = sessionStorage.getItem("access_token")
        const respone = await fetch(`${KITCHEN_URL}/${resId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${access_token}`,
            }
        });
        const result = await respone.json();
        if (!respone.ok) {
            return {err:true, result: null};
        } else {
            if (Object.keys(result).length !== 0){
                return {err:false, result};
            }
            return {err:false, result: null};
        }
    } catch (error) {
        console.log(error)
        return {err:true, result: null};
    }
}

const updateTicket = async ({ticketId, status}) => {
    try{
        const access_token = sessionStorage.getItem("access_token")
        const respone = await fetch(`${KITCHEN_URL}/${ticketId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                headers: {
                    "Authorization": `Bearer ${access_token}`,
                }
            },
            body: JSON.stringify({status}),
        });
        const result = await respone.json();
        if (!respone.ok) {
            return {err:true, result: null};
        } else {
            return {err:false, result: null};
        }
    } catch (error) {
        console.log(error)
        return {err:true, result: null};
    }
}

module.exports = {
    getTickets,
    updateTicket
}