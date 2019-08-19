export default function formatCurrency (amount) {
  amount = parseFloat(amount)
  if (typeof amount !== 'number') {
    return amount
  }
  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })
  return formatter.format(amount)
}
