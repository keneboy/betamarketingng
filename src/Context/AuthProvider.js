import { createContext, useReducer, useState, } from "react";


const AuthContext = createContext({});

const initialState = {
    login: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {},
    adminLogin: localStorage.getItem('adminInfo') ? JSON.parse(localStorage.getItem('adminInfo')) : {},
    consultantLogin: localStorage.getItem('consultantInfo') ? JSON.parse(localStorage.getItem('consultantInfo')) : {},
}


const reducer = (state, action) => {
    switch (action.type) {
        case "ADMIN_SUCCESS":
            return { ...state, adminLogin: action.payload }
        case "ADMIN_LOGOUT":
            return { ...state, adminLogin: {} }
        case "CONSULTANT_SUCCESS":
            return { ...state, consultantLogin: action.payload }

        case "CONSULTANT_LOGOUT":
            return { ...state, consultantLogin: {} }
        default:
            return state;
    }
}
export const AuthProvider = ({ children }) => {
    // const [auth, setAuth] = useState({});
    const [updatePic, setUpdatePic] = useState(0);
    const [state, dispatch] = useReducer(reducer, initialState);
    const [search, setSearch] = useState("");
    const [nactive, setNactive] = useState(false);
    const value = { state, dispatch, updatePic, setUpdatePic, search, setSearch, nactive, setNactive }


    return (
        <AuthContext.Provider value={{ ...value }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;