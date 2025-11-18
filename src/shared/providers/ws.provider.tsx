"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { Socket } from "socket.io-client"
import { initializeSocket, disconnectSocket } from "@/shared/api/socket"

type SocketContextType = {
  socket: Socket | null
  isConnected: boolean
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false
})

export const useSocketContext = () => useContext(SocketContext)

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const newSocket = initializeSocket()
    setSocket(newSocket)

    newSocket.connect()

    const onConnect = () => {
      setIsConnected(true)
      console.log("✅ Socket connected: ", newSocket.id)
    }

    const onDisconnect = () => {
      setIsConnected(false)
      console.log("🔌 Socket disconnected")
    }

    newSocket.on("connect", onConnect)
    newSocket.on("disconnect", onDisconnect)

    return () => {
      console.log("🧹 Cleaning up socket.")
      newSocket.off("connect", onConnect)
      newSocket.off("disconnect", onDisconnect)
      disconnectSocket()
      setSocket(null)
      setIsConnected(false)
    }
  }, [])

  return <SocketContext.Provider value={{ socket, isConnected }}>{children}</SocketContext.Provider>
}
