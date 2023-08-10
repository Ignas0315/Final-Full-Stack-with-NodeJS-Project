import { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [expiry, setIsAuthorized] = useState(0);
    const updateAuth = (newExpiry) => {
        setIsAuthorized(newExpiry + 43200);
    };

    return <AuthContext.Provider value={{ expiry, updateAuth }}>{children}</AuthContext.Provider>;
};

export { AuthContextProvider, AuthContext };
