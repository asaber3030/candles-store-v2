"use client"

import { useTranslations } from "next-intl"

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/shared/components/ui/table"
import { formatCurrency } from "@/shared/lib/numbers"

import Link from "next/link"
import { adminRoutes } from "@/shared/config/routes"
import { FullOrderItem } from "../admin/orders/model/orders"

type Props = {
  items: FullOrderItem[]
}

export const PartOrderItems = ({ items }: Props) => {
  const t = useTranslations()

  return (
    <div>
      <h3 className='text-lg font-semibold mb-2'>{t("Order Items")}</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='max-w-[150px]'>{t("Product")}</TableHead>
            <TableHead>{t("Quantity")}</TableHead>
            <TableHead>{t("Unit Price")}</TableHead>
            <TableHead>{t("Total")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell className='font-medium'>
                <Link href={adminRoutes.products.view(item.productId)} className='flex gap-2 items-center text-blue-600 hover:underline'>
                  <img className='size-20 rounded-md object-contain' src={item.product.picture} />
                  {item.product.name}
                </Link>
              </TableCell>
              <TableCell>x{item.quantity}</TableCell>
              <TableCell className='text-green-700 font-bold'>{formatCurrency(item.unitPrice)}</TableCell>
              <TableCell className='text-green-700 font-bold'>{formatCurrency(item.totalPrice)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
