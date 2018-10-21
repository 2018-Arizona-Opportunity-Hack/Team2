export function login(data) {
  console.log(data);
  console.log(data['email'] + " " + data['password']);
  firebase.auth().SignInWithEmailAndPassword(data['email'], data['password']);
  return timedPromise((resolve, reject) => {
    (true && resolve || reject)({
      ...data,
      userId: 'something'
    });
  }, 2000);
}

const stringyList = window.localStorage.getItem('formsList');
const formsList = stringyList && JSON.parse(stringyList) || [];

export function createNewForm(data) {
  return timedPromise((resolve) => {
    const newItem = {...data, formId: Date.now()};
    formsList.push(newItem);
    window.localStorage.setItem(
      'formsList',
      formsList
    );
    resolve(newItem);
  });
}

export function getFormList() {
  return timedPromise((resolve) =>
    resolve({formsList})
  );
}

function timedPromise(fn, time = 1000) {
  console.log('API - CALL', fn);
  return new Promise((resolve, reject) => {
    setTimeout(() => {fn(resolve, reject)}, time);
  });
}
