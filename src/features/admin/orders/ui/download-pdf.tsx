"use client"

import { useEffect, useState } from "react"
import { useTranslations } from "next-intl"

import { PDFDownloadLink } from "@react-pdf/renderer"
import { OrderPdfDocument } from "./pdf"
import { FullOrder } from "../model/orders"

interface DownloadBtnProps {
  order: FullOrder
}

export function DownloadOrderInvoiceBtn({ order }: DownloadBtnProps) {
  const t = useTranslations()

  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <button disabled className='bg-gray-300 text-white px-4 py-2 rounded'>
        {t("Loading Invoice")}
      </button>
    )
  }

  return (
    <PDFDownloadLink
      document={<OrderPdfDocument order={order} />}
      fileName={`invoice-${order.id}.pdf`}
      className="inline-flex cursor-pointer items-center h-8 px-4 rounded-md flex-row-reverse justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-blue-500 text-white shadow-xs hover:bg-blue-600 dark:focus-visible:ring-blue-400"
    >
      {({ blob, url, loading, error }) => (loading ? t("Generating PDF") : t("Download Invoice"))}
    </PDFDownloadLink>
  )
}
