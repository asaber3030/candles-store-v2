import { FullOrder } from "@/entities/order/model/order"
import { formatCurrency } from "../lib/numbers"
import appConfig from "../config/defaults/app"
import { deliveryRoutes } from "../config/routes/delivery.routes"

export function CompanyOrderTemplate({ order }: { order: FullOrder }) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Invoice #${order?.id} | Order Confirmation</title>
        <style>
            /* Reset styles for email compatibility */
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f8fafc;
                -webkit-text-size-adjust: 100%;
                -ms-text-size-adjust: 100%;
                width: 100% !important;
            }
            .container {
                max-width: 980px;
                margin: 0 auto;
                background-color: #ffffff;
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
            }
            /* Header */
            .header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 40px 40px 20px;
                text-align: center;
            }
            .company-name {
                font-size: 28px;
                font-weight: 700;
                margin-bottom: 8px;
                letter-spacing: -0.5px;
            }
            .invoice-title {
                font-size: 36px;
                font-weight: 300;
                margin: 10px 0;
                opacity: 0.95;
            }
            .invoice-number {
                background: rgba(255, 255, 255, 0.15);
                display: inline-block;
                padding: 8px 24px;
                border-radius: 50px;
                font-size: 16px;
                font-weight: 600;
                margin-top: 15px;
                letter-spacing: 0.5px;
            }
            /* Content */
            .content {
                padding: 40px;
                color: #2d3748;
                line-height: 1.6;
            }
            .order-info {
                display: flex;
                justify-content: space-between;
                margin-bottom: 40px;
                padding-bottom: 25px;
                border-bottom: 1px solid #e2e8f0;
            }
            .info-box {
                flex: 1;
            }
            .info-label {
                color: #718096;
                font-size: 14px;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                margin-bottom: 8px;
            }
            .info-value {
                font-size: 16px;
                font-weight: 500;
                color: #2d3748;
            }
            /* Items Table */
            .section-title {
                font-size: 20px;
                font-weight: 600;
                color: #2d3748;
                margin: 35px 0 20px;
                padding-bottom: 10px;
                border-bottom: 2px solid #e2e8f0;
            }
            .items-table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 30px;
            }
            .items-table th {
                background-color: #f7fafc;
                color: #4a5568;
                font-weight: 600;
                text-align: left;
                padding: 16px 12px;
                font-size: 14px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                border-bottom: 2px solid #e2e8f0;
            }
            .items-table td {
                padding: 20px 12px;
                border-bottom: 1px solid #edf2f7;
                vertical-align: top;
            }
            .item-name {
                font-weight: 500;
                color: #2d3748;
            }
            .item-quantity, .item-price, .item-total {
                text-align: right;
            }
            .text-right {
                text-align: right;
            }
            /* Summary */
            .summary {
                background-color: #f8fafc;
                border-radius: 8px;
                padding: 30px;
                margin-top: 30px;
            }
            .summary-row {
                display: flex;
                flex-direction: column;
                width: 100%;
                margin-bottom: 12px;
                padding-bottom: 12px;
            }
            .summary-row span {
              display: block;
            }
            .summary-label {
                color: #4a5568;
                font-weight: 500;
                display: block;
            }
            .summary-value {
                font-weight: 500;
                color: #2d3748;
                display: block;
            }
            .grand-total {
                border-top: 2px solid #667eea;
                border-bottom: none;
                margin-top: 15px;
                padding-top: 20px;
                font-size: 18px;
                font-weight: 600;
                color: #2d3748;
            }
            /* Footer */
            .footer {
                background-color: #2d3748;
                color: #cbd5e0;
                padding: 40px;
                text-align: center;
                font-size: 14px;
            }
            .footer-links {
                margin: 20px 0;
            }
            .footer-links a {
                color: #a0aec0;
                text-decoration: none;
                margin: 0 15px;
                transition: color 0.2s;
            }
            .footer-links a:hover {
                color: #fff;
            }
            .copyright {
                font-size: 13px;
                color: #718096;
                margin-top: 25px;
            }
            .contact-info {
                margin-top: 25px;
                font-size: 14px;
                line-height: 1.8;
            }
            .contact-info a {
                color: #a0aec0;
                text-decoration: none;
            }
            /* Status badge */
            .status-badge {
                display: inline-block;
                padding: 6px 16px;
                background-color: #c6f6d5;
                color: #22543d;
                border-radius: 50px;
                font-size: 14px;
                font-weight: 600;
                margin-top: 10px;
            }
            /* Responsive */
            @media (max-width: 600px) {
                .container {
                    border-radius: 0;
                }
                .content, .header, .footer {
                    padding: 25px;
                }
                .order-info {
                    flex-direction: column;
                    gap: 20px;
                }
                .items-table th, .items-table td {
                    padding: 12px 8px;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <!-- Header -->
            <div class="header">
                <div class="company-name">Sharkia Candles</div>
                <div class="invoice-title">INVOICE</div>
                <div class="invoice-number">#${order?.id}</div>
                <div class="status-badge">ORDER CONFIRMED</div>
            </div>

            <!-- Content -->
            <div class="content">
                <!-- Order Information -->
                <div class="order-info">
                    <div class="info-box">
                        <div class="info-label">Invoice Date</div>
                        <div class="info-value">${new Date(order?.orderedAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}</div>
                    </div>
                    <div class="info-box">
                        <div class="info-label">Customer ID</div>
                        <div class="info-value">${order?.user?.id || "N/A"}</div>
                    </div>
                    <div class="info-box">
                        <div class="info-label">Payment Method</div>
                        <div class="info-value">Credit Card</div>
                    </div>
                </div>

                <!-- Billing & Shipping -->
                <div style="display: flex; gap: 30px; margin-bottom: 40px;">
                    <div style="flex: 1;">
                        <div class="section-title">Bill To</div>
                        <div style="line-height: 1.8;">
                            <strong>${order?.user?.name || "Customer"}</strong><br>
                            ${order?.user?.email}<br>
                            ${order?.address?.phoneNumber || "N/A"}
                        </div>
                    </div>
                    <div style="flex: 1;">
                        <div class="section-title">Ship To</div>
                        <div style="line-height: 1.8;">
                            <strong>${order?.user?.name || "Customer"}</strong><br>
                            ${order?.address?.streetName || "N/A"}<br>
                            ${order?.address?.city?.name}, ${order?.address?.country?.name}<br>
                            ${order?.address?.notes ? `Notes: ${order.address.notes}` : ""}
                        </div>
                    </div>
                </div>

                <!-- Order Items -->
                <div class="section-title">Order Details</div>
                <table class="items-table">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th class="text-right">Quantity</th>
                            <th class="text-right">Unit Price</th>
                            <th class="text-right">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${order?.items
                          .map(
                            (item) => `
                            <tr>
                                <td class="item-name">${item.product?.name || "Product"}</td>
                                <td class="item-quantity">${item.quantity || 1}</td>
                                <td class="item-price">${formatCurrency(item.unitPrice || 0)}</td>
                                <td class="item-total">${formatCurrency(item.totalPrice || 0)}</td>
                            </tr>
                        `
                          )
                          .join("")}
                    </tbody>
                </table>

                <!-- Order Summary -->
                <div class="summary">
      
                    <div class="summary-row">
                        <span class="summary-label">Shipping: </span>
                        <span class="summary-value" style='font-weight: 900;'>${formatCurrency(order?.deliveryValue)}</span>
                    </div>
                    <div class="summary-row grand-total">
                        <span>Total Amount: </span>
                        <span style='font-weight: 900;'>${formatCurrency(order?.total)}</span>
                    </div>
                </div>

                <!-- Additional Notes -->
                <div style="margin-top: 40px; padding: 25px; background-color: #f0f9ff; border-radius: 8px; border-left: 4px solid #3b82f6;">
                    <div style="font-weight: 600; color: #1e40af; margin-bottom: 10px;">Important Information</div>
                    <div style="color: #4b5563; font-size: 14px; line-height: 1.6;">
                        • Your order is being processed and will ship within 1-2 business days<br>
                        • You will receive tracking information via email once shipped<br>
                        • For any questions, please contact our support team<br>
                        • Estimated delivery: 3-7 business days
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <div class="footer">
                <div class="footer-links">
                    <a href="${appConfig.appUrl}${deliveryRoutes.orders.details(order.id)}">Track Order</a>
                    <a href="${appConfig.appUrl}">Contact Support</a>
                </div>
                <div class="contact-info">
                    <div>Sharkia Candles</div>
                </div>
                <div class="copyright">
                    &copy; ${new Date().getFullYear()} Sharkia Candles. All rights reserved.<br>
                    Invoice ID: ${order?.id} | Order Date: ${new Date(order?.orderedAt).toLocaleDateString()}
                </div>
            </div>
        </div>
    </body>
    </html>
  `
}
