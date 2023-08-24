export const toPrice = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
});

export const toPlural = (number) => {
    const declension = ['год', 'года', 'лет'];
    const cases = [2, 0, 1, 1, 1, 2];
    return declension[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
}
