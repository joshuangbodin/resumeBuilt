import { supabase } from "./supabase"

export const getUserData = async (email: string) => {
   try{
    const {data , error} = await supabase.from('users').select('premium , email')
    if(data){
        return data.filter(item => item.email == email)
    }
}catch(e){

}

}