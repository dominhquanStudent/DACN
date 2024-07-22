'use client'
import { useRef,useState } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from './Store'


export default function StoreProvider({
  children
  
}: {
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore>()
  const [isLoggedIn, setIsLoggedIn] = useState(true) // Added isLoggedIn state

  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}