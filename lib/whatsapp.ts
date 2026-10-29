import config from './config';

export interface OrderItem {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPrice?: number;
  quantity: number;
  image: string;
  category?: string;
}

export interface CustomerDetails {
  name: string;
  phone: string;
  address: string;
  city: string;
  notes?: string;
}

export interface OrderSummary {
  subtotal: number;
  shippingFee: number;
  tax: number;
  grandTotal: number;
}

function formatCurrency(amount: number): string {
  const symbol = config.currency === 'PKR' ? '₨' : config.currencySymbol;
  const formattedAmount = new Intl.NumberFormat('en-PK', {
    maximumFractionDigits: 2,
  }).format(amount);
  return `${symbol}${formattedAmount}`;
}

/** Normalize the WhatsApp recipient number to digits in international format. */
function normalizeWhatsAppNumber(phoneNumber: string): string {
  return phoneNumber.replace(/\D/g, '').replace(/^00/, '');
}

/** Build a clean, mobile-friendly order message with WhatsApp formatting. */
export function generateWhatsAppMessage(
  customer: CustomerDetails,
  items: OrderItem[],
  _summary: OrderSummary,
  notes?: string
): string {
  const validItems = items.filter((item) =>
    item && typeof item.title === 'string' && item.title.trim() &&
    Number.isFinite(item.price) && Number.isFinite(item.quantity) && item.quantity > 0
  );
  const summary = calculateOrderSummary(validItems);
  const totalItems = validItems.reduce((total, item) => total + item.quantity, 0);
  const itemLines = validItems.flatMap((item, index) => {
    const unitPrice = item.discountPrice ?? item.price;
    const lineTotal = unitPrice * item.quantity;
    return [
      `${index + 1}. *${item.title}*`,
      `   ${item.quantity} × ${formatCurrency(unitPrice)} = ${formatCurrency(lineTotal)}`,
    ];
  });

  const customerLines = [
    ['Name', customer?.name],
    ['Phone', customer?.phone],
    ['Address', customer?.address],
    ['City', customer?.city],
  ].flatMap(([label, value]) => {
    const cleanValue = typeof value === 'string' ? value.trim() : '';
    return cleanValue ? [`*${label}:* ${cleanValue}`] : [];
  });
  const customerNotes = typeof customer?.notes === 'string' ? customer.notes.trim() : '';
  const additionalNotes = typeof notes === 'string' ? notes.trim() : '';
  const orderNumber = String(Date.now()).slice(-6);

  return [
    '🛍️ *Malka Beauty & Hair Oil*',
    `📦 *New Order #${orderNumber}*`,
    '',
    '━━━━━━━━━━━━━━━━━━',
    '',
    ...(customerLines.length ? ['👤 *CUSTOMER DETAILS*', '', ...customerLines] : []),
    '',
    '━━━━━━━━━━━━━━━━━━',
    '',
    `🧴 *ORDER ITEMS (${totalItems} ${totalItems === 1 ? 'PRODUCT' : 'PRODUCTS'})*`,
    '',
    ...itemLines,
    '',
    '━━━━━━━━━━━━━━━━━━',
    '',
    '💰 *ORDER SUMMARY*',
    '',
    `Subtotal: ${formatCurrency(summary.subtotal)}`,
    `Shipping: ${summary.shippingFee === 0 ? 'FREE' : formatCurrency(summary.shippingFee)}`,
    ...(summary.tax > 0 ? [`Tax (${config.taxPercentage}%): ${formatCurrency(summary.tax)}`] : []),
    '',
    `*TOTAL: ${formatCurrency(summary.grandTotal)}*`,
    '',
    '━━━━━━━━━━━━━━━━━━',
    '',
    ...(customerNotes ? ['📝 *CUSTOMER NOTES*', customerNotes, ''] : []),
    ...(additionalNotes ? ['📝 *ADDITIONAL NOTES*', additionalNotes, ''] : []),
    'Please confirm your order and delivery details.',
    '',
    'Thank you for choosing *Malka Beauty & Hair Oil*! ❤️',
  ].join('\n');
}

export function generateWhatsAppUrl(
  customer: CustomerDetails,
  items: OrderItem[],
  summary: OrderSummary,
  notes?: string
): string {
  const message = generateWhatsAppMessage(customer, items, summary, notes);
  const recipient = normalizeWhatsAppNumber(config.whatsappNumber);
  return `https://wa.me/${recipient}?text=${encodeURIComponent(message)}`;
}

export function calculateOrderSummary(items: OrderItem[]): OrderSummary {
  const subtotal = items.reduce((sum, item) => {
    const price = item.discountPrice ?? item.price;
    return sum + price * item.quantity;
  }, 0);

  const shippingFee = subtotal >= config.freeShippingThreshold ? 0 : config.shippingFee;
  const tax = Math.round((subtotal * config.taxPercentage) / 100);
  return { subtotal, shippingFee, tax, grandTotal: subtotal + shippingFee + tax };
}

export function validateCustomerDetails(
  customer: Partial<CustomerDetails>
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  if (!customer.name || customer.name.trim().length < 2) errors.push('Name is required (minimum 2 characters)');

  const phoneDigits = customer.phone?.replace(/\D/g, '') ?? '';
  if (phoneDigits.length < 7 || phoneDigits.length > 15) errors.push('Enter a valid phone number with 7 to 15 digits');
  if (!customer.address || customer.address.trim().length < 5) errors.push('Address is required (minimum 5 characters)');
  if (!customer.city || customer.city.trim().length < 2) errors.push('City is required (minimum 2 characters)');
  return { valid: errors.length === 0, errors };
}

const whatsappUtils = { generateWhatsAppMessage, generateWhatsAppUrl, calculateOrderSummary, validateCustomerDetails };
export default whatsappUtils;
