import { store } from "@/types/app.types";
import { createContext, ReactNode, useState } from "react";

interface props {
  children: ReactNode;
}
const defaultState: storeProps = {
  storage: {
    userdata: undefined,
    resumeData: {
      name: "",
      contact: "",
      jobRole: "",
      experience: [],
      education: [],
      skills: [],
    },
  },
  setStorage: function (store: store): void {},
};

export const Store = createContext<storeProps>(defaultState);

type storeProps = {
  storage: store;
  setStorage: (store: store) => void;
};

const Provider = ({ children }: props) => {
  const [storage, setStorage] = useState<store>({
    userdata: {
      email: "",
    },
    resumeData: {
      name: "",
      contact: "",
      jobRole: "",
      experience: [],
      education: [],
      skills: [],
    },
  });
  return (
    <Store.Provider value={{ storage, setStorage }}>{children}</Store.Provider>
  );
};

export default Provider;
