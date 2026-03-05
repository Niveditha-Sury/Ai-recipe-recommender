import { createContext, useContext } from "react";

// Context is initialized with null or undefined without the <Type> generic
export const AppContext = createContext(undefined);

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useApp must be used within an AppProvider");
    }
    return context;
};
