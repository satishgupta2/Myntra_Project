const CONVENIENCE_fEES = 99;

let BagItemObjects;
onLoad();

function onLoad() {
    loadBagItemObjects();
    displaybagItems();
    displayBagSummary();
}

function displayBagSummary() {
    let bagSummaryElement = document.querySelector('.bag-summary');
    let totalItem = BagItemObjects.length;
    let totalMRP = 0;
    let totalDiscount = 0;

    BagItemObjects.forEach(bagItem => {
        totalMRP += bagItem.original_price;
        totalDiscount += bagItem.original_price - bagItem.current_price;
    })
    let finalPayment = totalMRP - totalDiscount + CONVENIENCE_fEES;



    bagSummaryElement.innerHTML = `<div class="bag-details-container">
    <div class="price-header">PRICE DETAILS (${totalItem} Items) </div>
    <div class="price-item">
      <span class="price-item-tag">Total MRP</span>
      <span class="price-item-value">₹${totalMRP}</span>
    </div>
    <div class="price-item">
      <span class="price-item-tag">Discount on MRP</span>
      <span class="price-item-value priceDetail-base-discount">-₹${totalDiscount}</span>
    </div>
    <div class="price-item">
      <span class="price-item-tag">Convenience Fee</span>
      <span class="price-item-value">₹99</span>
    </div>
    <hr>
    <div class="price-footer">
      <span class="price-item-tag">Total Amount</span>
      <span class="price-item-value">₹${finalPayment}</span>
    </div>
  </div>
  <button class="btn-place-order">
    <div class="css-xjhrni" onclick="showToast(successMsg)">PLACE ORDER</div>
  </button>
  `;
}

function loadBagItemObjects() {
    console.log(bagItems);

    BagItemObjects = bagItems.map(itemId => {
        for (let i = 0; i < items.length; i++) {
            if (itemId == items[i].id) {
                return items[i];
            }
        }
    });
    console.log(BagItemObjects);
}

function displaybagItems() {

    let bagitemElement = document.querySelector('.bag-items-container');
    let innerHTML = '';
    BagItemObjects.forEach(bagItem => {
        innerHTML += generateHtML(bagItem);
    });

    bagitemElement.innerHTML = innerHTML;
}

function removeFromBag(itemId) {
    bagItems = bagItems.filter(bagItemId => bagItemId !== itemId);
    localStorage.setItem('bagItems', JSON.stringify(bagItems));
    loadBagItemObjects();
    displayBagIcon();
    displaybagItems();
    displayBagSummary();
}

function generateHtML(item) {
    return `<div class="bag-item-container">
        <div class="item-left-part">
            <img class="bag-item-img" src="../${item.image}">
        </div>
        <div class="item-right-part">
            <div class="company">${item.company}</div>
            <div class="item-name">${item.item_name}</div>
            <div class="price-container">
                <span class="current-price">Rs ${item.current_price}</span>
                <span class="original-price">Rs ${item.original_price}</span>
                <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
            </div>
            <div class="return-period">
                <span class="return-period-days">${item.return_period} days</span> return available
            </div>
            <div class="delivery-details">
                Delivery by
                <span class="delivery-details-days">${item.delivery_date}</span>
            </div>
        </div>

        <div class="remove-from-cart" onclick="removeFromBag(${item.id})">X</div>
    </div>`;
}

let successMsg = '<i class="ri-checkbox-circle-line"></i>  Successfully submitted';
const toastBox =document.getElementById("toastBox");
let popup =document.getElementById("popup");

function showToast(msg) {
    let toast = document.createElement('div');
    toast.classList.add('toast');
    toast.innerHTML = msg;
    toastBox.appendChild(toast);
setTimeout(() => {
    toast.remove();
}, 5000);

setTimeout(()=>{
    popup.classList.add("open-popup");
},5000);

}

function closePopup(){
    popup.classList.remove("open-popup");
}