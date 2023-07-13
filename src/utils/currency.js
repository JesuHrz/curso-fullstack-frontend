export const currencyFormat = (price, { locale = 'es-CO', ...options } = {}) => {
  const currency = new Intl.NumberFormat(locale, {
    currency: 'COP',
    ...options,
    style: 'currency'
  })

  return currency.format(price)
}
