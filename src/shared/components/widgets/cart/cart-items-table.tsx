"use client";

import { useCartStore } from "@/features/cart/model/cart.store";
import { Button } from "@/shared/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table";
import { X, Plus, Minus } from "lucide-react";
import { formatCurrency } from "@/shared/lib/numbers";
import { useTranslations } from "next-intl";
import { LinkBtn } from "@/shared/components/common/link-button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../ui/tooltip";

export const CartItemsTable = () => {
  const t = useTranslations();

  const { items, increaseQuantity, decreaseQuantity, clearCart, removeItem } = useCartStore();

  return (
    <div className="flex-1">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t("Product")}</TableHead>
            <TableHead>{t("Size")}</TableHead>
            <TableHead>{t("Color")}</TableHead>
            <TableHead>{t("Quantity")}</TableHead>
            <TableHead>{t("Unit Price")}</TableHead>
            <TableHead>{t("Total")}</TableHead>
            <TableHead>{t("Action")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center text-gray-500">
                {t("Your cart is empty")}
              </TableCell>
            </TableRow>
          ) : (
            items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <img src={item.image} alt={item.name} className="w-12 h-10 object-cover rounded" />

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <p className="truncate max-w-[130px] cursor-default">{item.name}</p>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs wrap-break-word">{item.name}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </TableCell>

                <TableCell>{item.size?.label || "-"}</TableCell>
                <TableCell>
                  {item.color ? <span className="inline-block w-5 h-5 rounded-full border" style={{ backgroundColor: item.color.color }} /> : "-"}
                </TableCell>
                <TableCell className="flex items-center gap-2">
                  <Button size="icon" variant="outline" onClick={() => decreaseQuantity(item.id)}>
                    <Minus size={12} />
                  </Button>
                  {item.quantity}
                  <Button size="icon" variant="outline" onClick={() => increaseQuantity(item.id)}>
                    <Plus size={12} />
                  </Button>
                </TableCell>
                <TableCell className="text-green-700">{formatCurrency(item.unitPrice)}</TableCell>
                <TableCell className="text-green-700">{formatCurrency(item.totalPrice)}</TableCell>
                <TableCell>
                  <Button size="icon" variant="destructive" onClick={() => removeItem(item.id)}>
                    <X size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <div className="flex gap-2">
        <Button variant="destructive" className="mt-4" onClick={clearCart} disabled={items.length === 0}>
          {t("Clear Cart")}
        </Button>
        <LinkBtn href={"/products"} variant="outline" className="mt-4">
          {t("Continue Shopping")}
        </LinkBtn>
      </div>
    </div>
  );
};
