import { Store } from "@/store/state/store"
import { useContext } from "react"

const useStore = () => {
    const {storage , setStorage} = useContext(Store)

    return {store:storage , setStore:setStorage}
}

export default useStore