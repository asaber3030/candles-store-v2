import { getCookie } from "cookies-next"
import { io, Socket } from "socket.io-client"

import authConfig from "../config/services/auth.config"
import appConfig from "../../app.config"

let socket: Socket | null = null

export const initializeSocket = (): Socket => {
  if (socket) {
    socket.disconnect()
  }

  const token = getCookie(authConfig.cookieName)

  socket = io(appConfig.socketUrl, {
    transports: ["websocket"],
    autoConnect: appConfig.socket.autoConnect,
    reconnection: appConfig.socket.reconnection,
    reconnectionAttempts: appConfig.socket.reconnectionAttempts,
    reconnectionDelay: appConfig.socket.reconnectionDelay,
    auth: { token: token },
    extraHeaders: { Authorization: `Bearer ${token}` }
  })

  return socket
}

export const getInitializedSocket = (): Socket | null => {
  return socket
}

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect()
    socket = null
  }
}
