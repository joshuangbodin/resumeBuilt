import { ResumeInput } from "@/types/app.types"
import { SETRESUME, SETUSER } from "./actiontypes"

export const setUserEmail = (userdata: any) => {
    return {
        type: SETUSER,
        payload:userdata
    }
}

export const setResumeData = (resume:ResumeInput = {
    name: "",
    contact: "",
    jobRole: "",
    experience: [],
    education: [],
    skills: []
}) => {
     return {
        type: SETRESUME,
        payload:resume
        
    }
}