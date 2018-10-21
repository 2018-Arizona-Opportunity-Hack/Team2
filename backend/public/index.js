document.addEventListener('DOMContentLoaded', event => {

  document.getElementById('company').onclick = createCompany;
  document.getElementById('employee').onclick = createEmployee;

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
      console.log(err);
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
