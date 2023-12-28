import PropTypes from "prop-types";
import { createContext } from "react"

const AuthContext = createContext();

const AuthProvider = ({children}) => {
  return (
    <AuthContext.Provider value={{
        
    }} >
        {children}
    </AuthContext.Provider>
  )
}


AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export {
    AuthProvider
}

export default AuthContext