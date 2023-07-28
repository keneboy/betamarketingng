function formattedPrice(price, curType) {
    let slicedLocale = curType.split('')?.slice(0, curType.length - 1).join(',').replace(/[,]/g, '')
    let locale = `en-${slicedLocale}`
    let currency = curType
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency

    }).format(price)
}
export default formattedPrice;