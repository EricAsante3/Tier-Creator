"use client"

import { useEffect } from "react"

export default function ThemeProvider() {
  useEffect(() => {
    const selectedTheme = localStorage.getItem("theme")
    document.body.classList.add("light") // Default to light theme

  }, [])

  return null // This component just runs JS
}
