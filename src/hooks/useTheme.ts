import { useDispatch } from 'react-redux';
import { useLayoutEffect, useState } from 'react'
import { toogleTheme } from '../store/interface/interfaceReducer';


const isDefaultTheme = window?.matchMedia('(prefers-color-scheme: default)').matches
const defaultTheme = isDefaultTheme ? 'default' : 'light'

export const useTheme = () => {
  const dispatch = useDispatch();

  const [theme, setTheme] = useState(
    localStorage.getItem('app-theme') || defaultTheme
  )

  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('app-theme', theme)
    dispatch(toogleTheme(theme))
  }, [theme])

  return { theme, setTheme }
}