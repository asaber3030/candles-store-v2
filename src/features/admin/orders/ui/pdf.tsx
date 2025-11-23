"use client"

import React from "react"
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer"
import { FullOrder } from "@/entities/order/model/order"

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 12, fontFamily: "Helvetica" },
  header: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  title: { fontSize: 24, fontWeight: "bold" },
  meta: { flexDirection: "column", alignItems: "flex-end" },
  section: { marginBottom: 10 },
  label: { fontSize: 10, color: "grey", marginBottom: 2 },
  value: { fontSize: 12, marginBottom: 5 },

  // Table Styles
  table: { width: "auto", borderWidth: 1, borderColor: "#e5e7eb", marginVertical: 10 },
  tableRow: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#e5e7eb", alignItems: "center", minHeight: 24 },
  tableHeader: { backgroundColor: "#f3f4f6", fontWeight: "bold" },
  tableCell: { padding: 5, fontSize: 10 },

  // Column widths (Table)
  col1: { width: "45%" }, // Product Name
  col2: { width: "15%" }, // Attributes
  col3: { width: "10%", textAlign: "center" }, // Qty
  col4: { width: "15%", textAlign: "right" }, // Price
  col5: { width: "15%", textAlign: "right" }, // Total

  // Address Section Layout
  addressContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  addressCol: { width: "30%" }, // Changed from 45% to 30% to fit 3 columns

  totals: { flexDirection: "column", alignItems: "flex-end", marginTop: 20 },
  totalRow: { flexDirection: "row", marginBottom: 5 },
  totalLabel: { width: 100, textAlign: "right", paddingRight: 10, fontSize: 10, color: "grey" },
  totalValue: { width: 80, textAlign: "right", fontWeight: "bold", fontSize: 12 },
  grandTotal: { fontSize: 14, borderTopWidth: 1, borderTopColor: "#000", paddingTop: 5, marginTop: 5 }
})

interface OrderPdfProps {
  order: FullOrder
}

export const OrderPdfDocument: React.FC<OrderPdfProps> = ({ order }) => {
  const formatDate = (date: Date | string) => new Date(date).toLocaleDateString("en-GB")
  const formatCurrency = (amount: number) => `${amount.toLocaleString()} EGP`

  return (
    <Document>
      <Page size='A4' style={styles.page}>
        {/* --- Header --- */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>INVOICE</Text>
            <Text style={{ fontSize: 10, marginTop: 5 }}>Order #{order.id}</Text>
          </View>
          <View style={styles.meta}>
            <Text style={styles.label}>Date Issued</Text>
            <Text style={styles.value}>{formatDate(order.orderedAt)}</Text>
            <Text style={styles.label}>Payment Method</Text>
            <Text style={styles.value}>{order.paymentMethod}</Text>
          </View>
        </View>

        {/* --- Address Section (From | Bill To | Ship To) --- */}
        <View style={styles.addressContainer}>
          {/* 1. Company / From Info */}
          <View style={styles.addressCol}>
            <Text style={[styles.section, { fontWeight: "bold", borderBottom: 1, paddingBottom: 2 }]}>From:</Text>
            {order.company ? (
              <>
                <Text style={styles.value}>{order.company.name}</Text>
                <Text style={styles.label}>{order.company.email}</Text>
                <Text style={styles.label}>{order.company.phoneNumber}</Text>
                {/* Note: User model implies address is a relation, so we stick to scalar fields here unless you fetch company addresses */}
              </>
            ) : (
              // Fallback if no company assigned (e.g. use Site Name)
              <Text style={styles.label}>Main Store</Text>
            )}
          </View>

          {/* 2. Customer Info */}
          <View style={styles.addressCol}>
            <Text style={[styles.section, { fontWeight: "bold", borderBottom: 1, paddingBottom: 2 }]}>Bill To:</Text>
            <Text style={styles.value}>{order.user.name}</Text>
            <Text style={styles.label}>{order.user.email}</Text>
            <Text style={styles.label}>{order.user.phoneNumber}</Text>
          </View>

          {/* 3. Shipping Info */}
          <View style={styles.addressCol}>
            <Text style={[styles.section, { fontWeight: "bold", borderBottom: 1, paddingBottom: 2 }]}>Ship To:</Text>
            <Text style={styles.value}>
              {order.address.streetName}, {order.address.streetNo}
            </Text>
            <Text style={styles.value}>
              {order.address.city.name}, {order.address.country.name}
            </Text>
            <Text style={styles.label}>Tel: {order.address.phoneNumber}</Text>
          </View>
        </View>

        {/* --- Table Header --- */}
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={[styles.tableCell, styles.col1]}>Item Description</Text>
          <Text style={[styles.tableCell, styles.col2]}>Details</Text>
          <Text style={[styles.tableCell, styles.col3]}>Qty</Text>
          <Text style={[styles.tableCell, styles.col4]}>Unit Price</Text>
          <Text style={[styles.tableCell, styles.col5]}>Total</Text>
        </View>

        {/* --- Standard Items Rows --- */}
        {order.items.map((item) => (
          <View style={styles.tableRow} key={`item-${item.id}`}>
            <Text style={[styles.tableCell, styles.col1]}>
              {item.product.name} ({item.product.sku})
            </Text>
            <Text style={[styles.tableCell, styles.col2]}>{[item.size?.label, item.color?.color].filter(Boolean).join(", ")}</Text>
            <Text style={[styles.tableCell, styles.col3]}>{item.quantity}</Text>
            <Text style={[styles.tableCell, styles.col4]}>{formatCurrency(item.unitPrice)}</Text>
            <Text style={[styles.tableCell, styles.col5]}>{formatCurrency(item.totalPrice)}</Text>
          </View>
        ))}

        {/* --- Totals Summary --- */}
        <View style={styles.totals}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal</Text>
            <Text style={styles.totalValue}>{formatCurrency(order.subTotal)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Delivery</Text>
            <Text style={styles.totalValue}>{formatCurrency(order.deliveryValue)}</Text>
          </View>

          {order.discountValue > 0 && (
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Discount</Text>
              <Text style={[styles.totalValue, { color: "red" }]}>- {formatCurrency(order.discountValue)}</Text>
            </View>
          )}

          <View style={[styles.totalRow, styles.grandTotal]}>
            <Text style={[styles.totalLabel, { fontWeight: "bold", color: "black" }]}>Grand Total</Text>
            <Text style={styles.totalValue}>{formatCurrency(order.total)}</Text>
          </View>
        </View>
      </Page>
    </Document>
  )
}
