import { API_GATEWAY_URL } from "@/variable";

const KITCHEN_URL = `${API_GATEWAY_URL}/kitchen`

const getTickets = async (resId) => {
    try{
        const respone = await fetch(`${KITCHEN_URL}/${resId}`, {
            method: "GET",
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
        const respone = await fetch(`${KITCHEN_URL}/${ticketId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
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