export function login(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() =>
      (true && resolve || reject)({
        ...data,
        userId: 'something'
       })
    , 3000);
  });
}