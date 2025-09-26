import { store } from "@/types/app.types";
import { GETSTATE, SETRESUME, SETUSER } from "./actiontypes";

const initialState:store = {
    userdata: {
        email:''
    },
    resumeData: {
        name: "",
        contact: "",
        jobRole: "",
        experience: [],
        education: [],
        skills: [],
    }
}


export const storeReducer = (state = initialState ,  action: { type: string , payload : any}) => {
    switch (action.type) {
        case SETUSER:
            {
                return {...state ,  userdata: action.payload }
            }
        case SETRESUME:{
            return {...state , resumeData: action.payload}
        }
        default:
            return state
    }
}