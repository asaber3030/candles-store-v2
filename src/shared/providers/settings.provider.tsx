"use client"

import { Settings } from "@prisma/client"

import React, { createContext } from "react"

export const AppSettingsContext = createContext<Settings | null>(null)

export const AppSettingsProvider = ({ children, settings }: { children: React.ReactNode; settings: Settings | null }) => {
  return <AppSettingsContext.Provider value={settings}>{children}</AppSettingsContext.Provider>
}
