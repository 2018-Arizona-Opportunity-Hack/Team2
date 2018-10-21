function handleLogin(){
  firebase.auth().signInWithEmailAndPassword(
    document.getElementById('mail').value,
    document.getElementById('pass').value
  )
  .catch(err => {
    alert(err);
  })
  .then(function(){

  });
}
// exports.csvJsonReport = functions.https.onRequest((request, response)=> {
//   var report = {'a': 0, 'b', 1};
// })
// function handleCreate(){
//   createCompany();
// }

document.addEventListener('DOMContentLoaded', event => {
  // let button = document.getElementById('login');
  // if(button != null) button.onclick = handleLogin;
  // else document.getElementById('create').onclick = handleCreate;

  document.getElementById('company').onclick = createCompany;
  document.getElementById('employee').onclick = createEmployee;

  document.getElementById('login').onclick = function(){
    let username = firebase.auth().currentUser.uid, numEntries;
    let csvContent = '';

    promise = firebase.database().ref('/users/' + username + '/compId')
      .once('value', data => {
        compId = data.val();
      }
      , err => {
        console.log(err);
      });

    let promise2 = promise.then(function(value){
        console.log(promise);
        firebase.database().ref('/comps/' + compId).orderByChild('transactionId').endAt(0).on('child_added', snapshot => {
          for(element in snapshot.val())
            csvContent += element + ',';
          csvContent += '\r\n';
        });
      }, function(){});

    let promise3 = promise2.then(function(value){
        console.log(promise2);
        firebase.database().ref('/comps/' + compId).orderByChild('transactionId').on('child_added', snapshot => {
          snap = snapshot.val();
          if(snap['compId'] == undefined){
            for(element in snap)
              csvContent += snap[element] + ',';
            csvContent += '\r\n';
          }
          console.log(csvContent);
        })
      }, function(){});

    let promise4 = promise3.then(function(value){
      var link = document.createElement("a");
      link.download = 'transactions.csv';
      link.href = 'data:text/csv;charset=utf-8' + csvContent;
      link.click();
    }, function(){});
  };

  function piechartcreator(){
    var map = {};
    var compId;
    let username = firebase.auth().currentUser.uid;
    firebase.database().ref('/users/' + username + '/compId')
      .once('value', data => {
        compId = data.val();
      }
      , err => {
        console.log(err);
      })
      .then(function(){
        firebase.database().ref('/comps/' + compId).orderByChild('data').on('child_added', snapshot => {
          snap = snapshot.val();
          if(snap['date'] != null){
            if(snap['date'].substring(0,2) == 10 && snap['date'].substring(6) == 2018)
              if(map[snap['category']] == undefined)
                map[snap['category']] = 0;
              map[snap['category']] += parseInt(snap['amount']);
          }
        });
      })
      .then(function(){
        console.log(map);
      });
  }

  document.getElementById('submit').onclick = function(){

    let transactionId = -1, compId, ref;
    let username = firebase.auth().currentUser.uid;
    firebase.database().ref('/users/' + username + '/compId')
      .once('value', data => {
        compId = data.val();
      }
      , err => {
        console.log(err);
      })
      .then(function(){
        ref = firebase.database().ref('/comps/' + compId + '/datasetVariables/numTransactions');
        ref.once('value', data => {
          transactionId = data.val();
          ref.set(transactionId+1);
        }, err => {
          console.log('err');
        })
        .then(function(){
          obj = {
            'transactionId': transactionId,
            'date': formatDate(new Date())
          };
          let inputs = document.getElementsByClassName('objfield');
          for(var i = 0; i < inputs.length; i++)
            obj[inputs[i].getAttribute('fieldname')] = inputs[i].value;

          let clientId = -1;

          let idstring = (obj['name'] + '|' + obj['address']).toLowerCase();
          let clientRef = firebase.database().ref('/comps/' + compId + '/' + idstring + '/clientId');

          clientRef.once('value', data => {
            if(data.val() != null){
              clientId = data.val();
              idstring += '|' + transactionId;
            }
            else{
              newClientRef = firebase.database().ref('/comps/' + compId + '/datasetVariables/numClients');
              newClientRef.once('value', data => {
                clientId = data.val();
              }, err => {
                console.log('err');
              })
              .then(function(){
                newClientRef.set(clientId+1);
                obj['clientId'] = clientId;
                firebase.database().ref('/comps/' + compId).child(idstring).set(obj);
              })
            }
          }, err => {
            console.log('err');
          })
          .then(function(){
            obj['clientId'] = clientId;
            firebase.database().ref('/comps/' + compId).child(idstring).set(obj);
          });
        });
      });
    };
});

function createCompany(){
  var name = document.getElementById('name').value;
  var mail = document.getElementById('mail').value;
  var pass = document.getElementById('pass').value;

  firebase.auth().createUserWithEmailAndPassword(mail, pass)
    .catch(err => {
      alert(err);
      return;
    })
    .then(function(){
      firebase.auth().currentUser.updateProfile({
        displayName: name
      });
    })
    .then(function(){
      let id = firebase.auth().currentUser.uid;
      firebase.database().ref('/users/' + id).child('compId').set(id);
      firebase.database().ref('/authUsers/' + id).push(id);
      firebase.database().ref('/comps/' + id + '/datasetVariables').child('numTransactions').set(0);
      firebase.database().ref('/comps/' + id + '/datasetVariables').child('numClients').set(0);
      firebase.database().ref('/comps/' + id + '/datasetVariables').child('compId').set(name);
    });
}

function createEmployee(){
  if(firebase.auth().currentUser == null) return;

  var secondaryConfig = {
    apiKey: "AIzaSyDXOa0IciS54W7V0H9BQNghBatbZh8ZcuI",
    authDomain: "ohacks-8e26a.firebaseapp.com",
    databaseURL: "https://ohacks-8e26a.firebaseio.com",
  };
  let app2 = firebase.initializeApp(secondaryConfig, 'Secondary');

  var name = document.getElementById('name').value;
  var mail = document.getElementById('mail').value;
  var pass = document.getElementById('pass').value;

  var newUser;
  app2.auth().createUserWithEmailAndPassword(mail, pass)
    .catch(err => {
      console.log(err);
    })
    .then(function(){
      app2.auth().currentUser.updateProfile({
        displayName: name
      });
      newUser = app2.auth().currentUser.uid;
      app2.auth().signOut();
      app2.delete()
    })
    .then(function(){
      compId = firebase.auth().currentUser.uid;
      firebase.database().ref('/users/' + newUser).child('compId').set(compId);
      firebase.database().ref('/authUsers/' + compId).push(newUser);
    })
}

function formatDate(d){
  let mm = d.getMonth() + 1;
  let dd = d.getDate();
  return mm + "/" + dd + "/" + (1900 + d.getYear());
}
