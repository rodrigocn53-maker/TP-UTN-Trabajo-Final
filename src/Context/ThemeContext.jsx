import { useState } from "react";
import '../ContactSideBar/ContactSideBar.css'
import ContactSidebar from "../ContactSideBar/ContactSideBar";
import { ThemeContext } from "./Contexts";

//Creamos el contexto

const ThemeContextProvider = ({children}) => {
    const [isDark, setIsDark] = useState(false)

    /* Si el tema es dark, lo cambiamos a light y viceversa */
    const toggleTheme = () => {
        setIsDark(!isDark)
    }

    const changeToDarkMode = () => {
        setIsDark(true)
    }

    const changeToLightMode = () => {
        setIsDark(false)
    }

    /* Valores que seran accesibles desde todos los componentes hijos de nuestro contexto */
    const providerValues = {
        isDark,
        toggleTheme,
        changeToDarkMode,
        changeToLightMode
    }

    return (
        <ThemeContext.Provider
            value={providerValues}
        >
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeContextProvider