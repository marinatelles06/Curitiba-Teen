const firebase = require("firebase/app");
const {
  getDatabase,
  ref,
  child,
  get,
  push,
  set,
  update,
} = require("firebase/database");

const firebaseConfig = {
  apiKey: "AIzaSyAWfdFjYVl9kL8_h4W8xyuok5R4C8ZIcfg",
  authDomain: "ia-cs-d4b31.firebaseapp.com",
  databaseURL: "https://ia-cs-d4b31-default-rtdb.firebaseio.com",
  projectId: "ia-cs-d4b31",
  storageBucket: "ia-cs-d4b31.appspot.com",
  messagingSenderId: "891840727026",
  appId: "1:891840727026:web:13b39b92be83ddfdbb8d6b"
};

const app = firebase.initializeApp(firebaseConfig);

class Database {
  read(reference) {
    return new Promise((resolve, reject) => {
      var dbRef = ref(getDatabase());
      get(child(dbRef, reference))
        .then((db) => {
          if (db.exists()) {
            resolve(db.val());
          } else {
            resolve({})
          }
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }

  update(reference, data) {
    var db = getDatabase();

    update(ref(db, reference), data);
  }

  set(reference, data) {
    var db = getDatabase();

    set(ref(db, reference), data);
  }
}

module.exports = {
  app: app,
  database: new Database(),
};
