document.addEventListener('DOMContentLoaded', event => {
  firebase.auth().signInWithEmailAndPassword('atulmerchia@gmail.com', 'password').catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

  }).then(function(){
    firebase.auth().currentUser.updateProfile({
      displayName: 'Atul Merchia'
    });
  }).then(function(){
    let username = firebase.auth().currentUser.displayName;
    firebase.database().ref('users/' + username + '/datasetVariables').child('numTransactions').set(0);
    firebase.database().ref('users/' + username + '/datasetVariables').child('numClients').set(0);
  });

  document.getElementById('submit').onclick = function(){

    let transactionId = -1;
    let username = firebase.auth().currentUser.displayName;
    let ref = firebase.database().ref('/users/' + username + '/datasetVariables/numTransactions');
    ref.once('value', data => {
      transactionId = data.val();
    }, err => {
      console.log('err');
    })
    .then(function(){
      ref.set(transactionId+1);

      obj = {
        'transactionId': transactionId,
        'date': formatDate(new Date())
      };
      let inputs = document.getElementsByTagName('input');
      for(var i = 0; i < inputs.length; i++)
        obj[inputs[i].getAttribute('fieldname')] = inputs[i].value;

      let clientId = -1;

      let idstring = (obj['name'] + '|' + obj['address']).toLowerCase();
      let clientRef = firebase.database().ref('/users/' + username + '/' + idstring + '/clientId');

      clientRef.once('value', data => {
        if(data.val() != null){
          clientId = data.val();
          idstring += '|' + transactionId;
          console.log(clientId);
        }
        else{
          newClientRef = firebase.database().ref('/users/' + username + '/datasetVariables/numClients');
          newClientRef.once('value', data => {
            clientId = data.val();
            console.log(clientId);
          }, err => {
            console.log('err');
          })
          .then(function(){
            newClientRef.set(clientId+1);
            console.log(clientId);
            obj['clientId'] = clientId;
            firebase.database().ref('users/' + username).child(idstring).set(obj);
          })
        }
      }, err => {
        console.log('err');
      })
      .then(function(){
        console.log(clientId);
        obj['clientId'] = clientId;
        firebase.database().ref('users/' + username).child(idstring).set(obj);
      });
    });
  };
});

function formatDate(d){
  let mm = d.getMonth() + 1;
  let dd = d.getDate();
  return mm + "/" + dd + "/" + (1900 + d.getYear());
}
