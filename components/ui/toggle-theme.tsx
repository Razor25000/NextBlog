"use client"
import { Moon, Sun } from "lucide-react"
import { Button } from "./button"
import { useTheme } from "next-themes"

const ToogleTheme = () => {
    const { theme, setTheme } = useTheme()
    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark")
        
        
    }

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme}
    className=" flex items-center"
    
    >
        <Moon className="h-6 w-6 cursor-pointer scale-100 dark:scale-0"/>
        <Sun className="h-6 w-6 cursor-pointer dark:scale-100 scale-0"/>
    </Button>
  )
}
export default ToogleTheme