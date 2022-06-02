import { createContext, ReactNode, useEffect, useReducer } from 'react'
import AuthReducer from './AuthReducer'
import { User } from '../types/User'

type AuthContextProviderProps = {
  children: ReactNode;
}

const INITIAL_STATE = {
  //@ts-expect-error
  user: JSON.parse(localStorage.getItem<User>("user") || null),
  isFetching: false,
  error: false
}

export const AuthContext = createContext(INITIAL_STATE)

export const AuthContextProvider = (props: AuthContextProviderProps) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)

  useEffect(()=>{
    localStorage.setItem("user", JSON.stringify(state.user))
  },[state.user])

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
