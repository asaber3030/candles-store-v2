"use client"

import katex from "katex"

import { normalizeLatex } from "@/shared/lib/functions"
import "katex/dist/katex.min.css"

type Props = {
  latex: string
  displayMode?: boolean
}

export function MathRenderer({ latex, displayMode = false }: Props) {
  const normalized = normalizeLatex(latex)

  return (
    <span
      dangerouslySetInnerHTML={{
        __html: katex.renderToString(normalized, {
          throwOnError: true,
          displayMode
        })
      }}
    />
  )
}
