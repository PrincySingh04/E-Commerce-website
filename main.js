let img = [
   "https://images-eu.ssl-images-amazon.com/images/G/31/2025/GW/UNREC/PC/78268._CB785061629_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/CookwareDining/tdhruvko/GW/BAU/May26/RSVD/Bergner___IV_3000x1200-1._CB763079678_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/INSLGW/74._CB783716748_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/Img26/Sports/February/GW/BAU/Legacy/Unrec/5298_Sports_-_BAU_PC_creatives_3000X1200_02._CB787728092_.jpg"
];
let index=0;
function changebg(){
    
    document.querySelector(".hero").style.backgroundImage =
    `url(${img[index]})`
}  
    function nextimg(){

    index++;

    if(index >= img.length){
        index = 0;
    }

    changebg();
}

function previmg(){

    index--;

    if(index < 0){
        index = img.length - 1;
    }
    changebg();
}
if (document.querySelector(".hero")) {
    setInterval(nextimg, 3000);
}
let targetUrl = "";


function checkLogin(url){

    let user = sessionStorage.getItem("loggedin");

    if(user === "true"){

        window.location.href = url;
    }

    else{

        targetUrl = url;

        document.getElementById("loginPopup").style.display = "flex";
    }
}


function login(){

    let user =
    document.getElementById("username").value;

    let pass =
    document.getElementById("password").value;

    if(user !== "" && pass !== ""){

        sessionStorage.setItem("loggedin","true");

        document.getElementById("loginPopup").style.display = "none";

        if(targetUrl !== ""){

            window.location.href = targetUrl;
        }
    }
}
function closePopup(){

    document.getElementById("loginPopup").style.display = "none";
}
// navbar ka sign in
function openLogin(){
     targetUrl = "";

    document.getElementById("loginPopup").style.display = "flex";
}
function redirectpage(url){
    if(url !== ""){

        window.location.href = url;
    }
}
function goTop(){

    window.scrollTo({

        top:0,

        behavior:"smooth"
    });
}
// cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let total = 0;

// page load hote hi cart update hoga
updateCart();

function addToCart(name, price){

    let found = false;

    // same product already exist karta hai kya check
    for(let i = 0; i < cart.length; i++){

        if(cart[i].product === name && cart[i].price === price){

            cart[i].quantity += 1;

            found = true;

            break;
        }
    }

    // agar product pehli baar add hua
    if(found === false){

        cart.push({
            product: name,
            price: price,
            quantity: 1
        });
    }

    // localStorage me save
    localStorage.setItem("cart", JSON.stringify(cart));

    updateCart();
}

function updateCart(){

    let cartItems =
    document.getElementById("cartItems");

    if(cartItems){

        cartItems.innerHTML = "";
    }

    total = 0;

    let totalItems = 0;

    cart.forEach((item, index)=>{

        total += item.price * item.quantity;

        totalItems += item.quantity;

        if(cartItems){

            cartItems.innerHTML += `

            <div class="cart-item">

                <div>
                    <p><b>${item.product}</b></p>

                    <p>₹${item.price}</p>

                    <p>Quantity: ${item.quantity}</p>
                </div>

                <button onclick="removeItem(${index})"
                class="btn btn-danger btn-sm">
                Remove
                </button>

            </div>

            `;
        }
    });

    // cart count update
    let cartCount =
    document.getElementById("cartCount");

    if(cartCount){

        cartCount.innerText = totalItems;
    }

    // total price update
    let totalPrice =
    document.getElementById("totalPrice");

    if(totalPrice){

        totalPrice.innerText = total;
    }
}

function removeItem(index){

    // quantity 1 se zyada hai
    if(cart[index].quantity > 1){

        cart[index].quantity -= 1;
    }

    // agar sirf 1 product bacha hai
    else{

        cart.splice(index,1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCart();
}

function openCart(){

    document.getElementById("cartPopup")
    .style.display = "flex";
}

function closeCart(){

    document.getElementById("cartPopup")
    .style.display = "none";
}
// buy now ka js
let currentProduct = "";
let currentPrice = 0;

function buyNow(product, price){

    currentProduct = product;
    currentPrice = price;

    document.getElementById("buyPopup")
    .style.display = "flex";

    document.getElementById("buyProduct")
    .innerText = product;

    document.getElementById("buyPrice")
    .innerText = price;
}

function closeBuyPopup(){

    document.getElementById("buyPopup")
    .style.display = "none";
}


function payNow(){

    let name =
    document.getElementById("customerName").value;

    let address =
    document.getElementById("customerAddress").value;

    let phone =
    document.getElementById("customerPhone").value;

    if(name === "" || address === "" || phone === ""){

        alert("Please fill all details");

        return;
    }

    if(phone.length !== 10){

        alert("Phone number must be 10 digits");

        return;
    }

    // popup close
    document.getElementById("buyPopup")
    .style.display = "none";

    document.getElementById("cartPopup")
    .style.display = "none";

    // cart empty
    cart = [];

    // localStorage clear
    localStorage.removeItem("cart");

    // cart update
    updateCart();

    // success popup
    showFireworks();
}
function showFireworks(){

    let firework =
    document.createElement("div");

    firework.innerHTML =
    "🎆🎉 ORDER SUCCESSFUL 🎉🎆";

    firework.style.position = "fixed";
    firework.style.top = "50%";
    firework.style.left = "50%";
    firework.style.transform =
    "translate(-50%,-50%)";

    firework.style.background = "white";
    firework.style.padding = "40px";
    firework.style.fontSize = "35px";
    firework.style.borderRadius = "20px";
    firework.style.boxShadow =
    "0 0 30px black";

    firework.style.zIndex = "10000";

    document.body.appendChild(firework);

    setTimeout(()=>{

        firework.remove();

    },3000);
}
// placeorder ka
function placeOrder(){

    if(cart.length === 0){

        alert("Your cart is empty");

        return;
    }

    document.getElementById("buyPopup")
    .style.display = "flex";

    document.getElementById("buyProduct")
    .innerText = "Cart Items";

    document.getElementById("buyPrice")
    .innerText = total;
}

function searchProduct() {

    let input = document.getElementById("searchInput")
    .value
    .toLowerCase();
    if(!input) return;

    let boxes =
    document.getElementsByClassName("box");

    for(let i = 0; i < boxes.length; i++) {

        let title =
        boxes[i]
        .getElementsByTagName("h2")[0]
        .innerText
        .toLowerCase();

        if(title.indexOf(input) > -1) {

            boxes[i].style.display = "";

        } else {

            boxes[i].style.display = "none";
        }
    }
}
function toggleMenu(){
    let menu = document.getElementById("menuList");

    if(menu.style.display === "none"){
        menu.style.display = "block";
    } else {
        menu.style.display = "none";
    }
}
// resposive promax
function toggleMenu() {
    document.querySelector('.navbar1').classList.toggle('open');
}


