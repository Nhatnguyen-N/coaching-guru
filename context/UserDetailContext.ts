import { UserDetail } from "@/types/UserDetail.types";
import { createContext, Dispatch, SetStateAction, useContext } from "react";

type UserDetailContextType = {
  userDetail: UserDetail | null,
  setUserDetail: Dispatch<SetStateAction<UserDetail | null>>;
}

export const UserDetailContext = createContext<UserDetailContextType>({
  userDetail: null,
  setUserDetail: () => { }
});
export const useUserDetail = () => {
  const context = useContext(UserDetailContext);
  if (!context) {
    throw new Error("useUserDetail must be used within a UserDetailProvider");
  }
  return context;
}