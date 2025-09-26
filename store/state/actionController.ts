import { ResumeInput } from "@/types/app.types"
import { SETRESUME, SETUSER } from "./actiontypes"

export const setUserEmail = (email: string) => {
    return {
        type: SETUSER,
        payload:{email}
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