export default (tasks, initContext) => {
  return new Promise(resolve => {
    tasks.reduce((acc, cur, curIndex, arr) => {
      return acc.then(x => {
        if (arr.length === curIndex + 1) {
          return cur(x).then(final => resolve(final));
        } else {
          return cur(x);
        }
      });
    }, Promise.resolve(initContext));
  });
};
