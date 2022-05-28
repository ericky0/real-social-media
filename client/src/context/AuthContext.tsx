import { createContext, ReactNode, useReducer } from 'react'
import AuthReducer from './AuthReducer'

type AuthContextProviderProps = {
  children: ReactNode;
}

const INITIAL_STATE = {
  user: {
    _id: "628f5b558e201698bce8a067",
    username: "Erick Hogarth",
    email: "erick@gmail.com",
    profilePicture: "person/1.jpeg",
    coverPicture: "",
    isAdmin: false,
    followers: [],
    followings: []
  },
  isFetching: false,
  error: false
}

export const AuthContext = createContext(INITIAL_STATE)

export const AuthContextProvider = (props: AuthContextProviderProps) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        // @ts-expect-error
        dispatch
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}
