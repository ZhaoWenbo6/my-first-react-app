import _ from 'lodash';

export const intersection = (a, b) => a.filter(v => b.includes(v));
export const difference = (a, b) => a.concat(b).filter(v => !a.includes(v) || !b.includes(v));

export function intersectionArr(a, b) {
  const markArr = [];
  const unMarkArr = [];
  a.forEach(aItem => {
    if (b.length > 0) {
      b.map(bItem => {
        if (bItem.sku === aItem.sku) {
          aItem.isChecked = true;
          markArr.push(aItem);
        } else {
          unMarkArr.push(aItem);
        }
      });
    } else {
      unMarkArr.push(aItem);
    }
  });
  return [_.uniq(markArr), _.uniq(unMarkArr)];
}
