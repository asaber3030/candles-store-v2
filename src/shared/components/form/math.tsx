"use client"

import React, { useEffect, useRef } from "react"
import "mathlive"

type MathLiveInputProps = {
  value: string
  onChange: (val: string) => void
  className?: string
  style?: React.CSSProperties
}

export const MathLiveInput: React.FC<MathLiveInputProps> = ({ value, onChange, className, style }) => {
  const ref = useRef<any>(null)

  useEffect(() => {
    if (!ref.current) return
    const el = ref.current

    // Set current value
    el.value = value || ""

    // Remove previous listener
    if (el._mathFieldListener) el.removeEventListener("input", el._mathFieldListener)

    // Add input listener
    const listener = (evt: any) => onChange(evt.target.value)
    el.addEventListener("input", listener)
    el._mathFieldListener = listener
  }, [value, onChange])

  return React.createElement("math-field", {
    ref,
    className,
    style: { minHeight: "50px", border: "1px solid #ddd", borderRadius: "5px", fontSize: "18px", width: "100%", ...style },
    "virtual-keyboard-mode": "manual",
    "virtual-keyboard-theme": "material",
    "smart-fence": true,
    "smart-superscript": true,
    "letter-shape-style": "tex"
  })
}
