let bagItems;
onload();

function onload(){
 let bagItemsStr=localStorage.getItem('bagItems');
    bagItems =bagItemsStr ? JSON.parse(bagItemsStr) :[];
displayItemsOnHomePage();
displayBagIcon();
}
function addtoBag(itemId){
    bagItems.push(itemId);
    localStorage.setItem('bagItems',JSON.stringify(bagItems));
    displayBagIcon();

}
function displayBagIcon(){
let bagitemcount =document.querySelector('.bag-item-count');
if(bagItems.length > 0 ){
    bagitemcount.style.visibility ='visible';
bagitemcount.innerText =bagItems.length;
}else{
    bagitemcount.style.visibility ='hidden';
    
}
}
function displayItemsOnHomePage() {

let mainContainerElement = document.querySelector('.main-container');
if(!mainContainerElement){
    return;
}
let innerHTML ='';
items.forEach(item =>{
innerHTML +=` <div class="item-container">
<img class="item-image" src="${item.image}" alt="land">
<div class="rating">${item.rating.stars} ⭐ | ${item.rating.count}</div>

<div class="compnay-name">${item.company}</div>
<div class="item-name">${item.item_name}</div>
<div class="price"><span class="current-price">Rs ${item.current_price} </span> 
<span class="original-price">Rs ${item.original_price}</span>
<span class="discont">(${item.discount_percentage}% OFF)</span>
</div>
<button class="btn-add-bag" onclick="addtoBag(${item.id})">Add to bag</button>
</div>`;
});
mainContainerElement.innerHTML = innerHTML;
}