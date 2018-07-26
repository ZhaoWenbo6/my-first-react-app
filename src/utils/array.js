export const intersection = (a, b) => a.filter(v => b.includes(v));
export const difference = (a, b) => a.concat(b).filter(v => !a.includes(v) || !b.includes(v));

export function intersectionArr(a, b) {
  const markArr = [];
  const unmarkArr = [];
  a.forEach(aItem => {
    if (b.lenght > 0) {
      b.forEach(bItem => {
        if (bItem.sku === aItem.sku) {
          markArr.push(bItem);
        } else {
          unmarkArr.push(aItem);
        }
      });
    } else {
      unmarkArr.push(aItem);
    }
  });
  return [markArr, unmarkArr];
}
