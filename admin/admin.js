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
  
//global 
var d = new Date();
var t = d.getTime();
var counter = t;

//form
document.getElementById("form").addEventListener("submit", (e) =>{
    var order = document.getElementById("order").value;
    var total = document.getElementById("total").value;
    e.preventDefault();
    createOerder(order,total);
    form.reset();
});
// create new order
function createOerder(order,total){
    console.log(counter);
    counter+=1;
    console.log(order);
    var newOrder={
        id:counter,
        order:order,
        total:total
    }
    let db = firebase.database().ref("order/"+counter);
    db.set(newOrder);
    document.getElementById("cardSection").innerHTML='';
   readOrder();
} 



function readOrder(){
  var order = firebase.database().ref("order/");
  order.on("child_added",function(data){
     var orderValue = data.val();
     document.getElementById("cardSection").innerHTML+=`
        <div class="card mb-3" style="margin-top: 20%">
          <div class="card-body">
            <h5 class="card-title">Order: ${orderValue.order}</h5>
            <p class="card-text">Total: ${orderValue.total}</p>

            <button type="submit" style="color:white" class="btn btn-warning" 
            onclick="updateOrder(${orderValue.id},'${orderValue.order}','${orderValue.total}')">
            <i class="fas fa-edit"></i> Edit Order</button>

            <button type="submit" class="btn btn-danger" 
            onclick="deleteOrder(${orderValue.id})">
            <i class="fas fa-trash-alt"></i> Delete Order</button>
            </div>
            </div>
     `
  });
}

function reset(){
    document.getElementById("firstSection").innerHTML=`
    <form class="border p-5 mb-5" id="form" style="margin-top: 20%">
    <div class="form-group">
       <label>Order</label>
       <input type="text" class="form-control" id="order" placeholder="order">
    </div>
    <div class="form-group">
           <label>Total</label>
           <input type="text" class="form-control" id="total" placeholder="total">
        </div>
        <button type="submit" id="button1" class="btn btn-primary"><i class="fas fa-plus"></i> Add Order</button>
        <button style="display:none" id="button2" class="btn btn-success">Update Order</button>
        <button style="display:none" id="button3" class="btn btn-success">Cancel</button>
      </form>
    `;
    document.getElementById("form").addEventListener("submit", (e) =>{
        var order = document.getElementById("order").value;
        var total = document.getElementById("total").value;
        e.preventDefault();
        createOerder(order,total);
        form.reset();
    });
}

function updateOrder(id,order,total){
    document.getElementById("firstSection").innerHTML=`
    <form class="border p-5 mb-5" id="form2" style="margin-top: 20%">
    <div class="form-group">
       <label>Order</label>
       <input type="text" class="form-control" id="order" placeholder="order">
    </div>
    <div class="form-group">
           <label>Total</label>
           <input type="text" class="form-control" id="total" placeholder="total">
        </div>
        <button  style="display:none" type="submit" id="button1" class="btn btn-primary"><i class="fas fa-plus"></i> Add Order</button>
        <button id="button2" class="btn btn-success">Update Order</button>
        <button id="button3" class="btn btn-success">Cancel</button>
      </form>
    `;
    document.getElementById("form2").addEventListener("submit", (e) =>{
        e.preventDefault();
    });
   
    document.getElementById("button3").addEventListener("click", (e)=>{
       reset();
    });

    document.getElementById("button2").addEventListener("click", (e)=>{
        updateOrder2(id,document.getElementById("order").value,
        document.getElementById("total").value);
     });
    
     document.getElementById("order").value=order;
     document.getElementById("total").value=total;
}
function updateOrder2(id,order,total){
     var orderUpdated={
         id:id,
         order:order,
         total:total
     }
     let db=firebase.database().ref("order/"+id);
     db.set(orderUpdated);
     document.getElementById("cardSection").innerHTML="";
     readOrder();
     reset();
}

function deleteOrder(id){
    console.log(id);
    var order = firebase.database().ref("order/"+id);
    order.remove();
    reset();
    document.getElementById("cardSection").innerHTML="";
    readOrder();
}

