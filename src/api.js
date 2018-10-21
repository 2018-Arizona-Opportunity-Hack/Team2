/* global firebase */

export function login({email, password}) {
  return new Promise((resolve, reject) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((response) => {
        const {user: {uid}} = response;
        resolve({userId: uid});
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function createUser({email, password}) {
  return new Promise((resolve, reject) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((response) => {
        const {user: {uid}} = response;
        resolve({userId: uid});
      })
      .catch((err) => {
        reject(err);
      });
  });
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
