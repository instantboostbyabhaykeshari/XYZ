import apiConnector from "../apiConnector.js";
import { order } from "../apis.js";
import {setLoading} from "../../Slices/authSlice.js";

export const fetchAllOrder = (email) => {
    return async(dispatch) => {
        dispatch(setLoading(true));
        try{
            const response = await apiConnector("POST", order.ALL_ORDER, {email});
            console.log("Order fetching response: ", response);

            return response;
        }catch(err){
            console.log(err);
            console.log("Error in fetching all orders api.");
        }
        dispatch(setLoading(false));
    }
}