var firebaseConfig = {
    apiKey: "AIzaSyBnHZVyQWsRDL_wHHh2HHsq9MD3Rrnr2OU",
    authDomain: "agroservicecentrestore.firebaseapp.com",
    databaseURL: "https://agroservicecentrestore.firebaseio.com",
    projectId: "agroservicecentrestore",
    storageBucket: "",
    messagingSenderId: "118722953513",
    appId: "1:118722953513:web:d942e2137524d2fd"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  

function renderTable(){
    var order = firebase.database().ref("order/");
    order.on("child_added", function(data){
          var orderValue = data.val();
          document.getElementById("table").innerHTML+=`
             <tr> 
              <td> ${orderValue.id}</td>
              <td> ${orderValue.order}</td>
              <td> ${orderValue.total}</td>
             </tr>
          `;
    });
};