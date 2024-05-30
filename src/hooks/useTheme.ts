import { useLayoutEffect, useState } from 'react'


const isDefaultTheme = window?.matchMedia('(prefers-color-scheme: default)').matches
const defaultTheme = isDefaultTheme ? 'default' : 'light'

export const useTheme = () => {

  const [theme, setTheme] = useState(
    localStorage.getItem('app-theme') || defaultTheme
  )

  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('app-theme', theme)
  }, [theme])

  return { theme, setTheme }
}