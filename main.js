const title = document.getElementById("title");
const price = document.getElementById("price");
const tax = document.getElementById("tax");
const discount = document.getElementById("discount");
const total = document.getElementById("total");
const quantity = document.getElementById("quantity");
const category = document.getElementById("category");
const createBtn = document.getElementById("submit");
const updateBtn = document.getElementById("update");
const deleteAllBtn = document.getElementById("deleteAll");
const cancelBtn = document.getElementById("cancelBtn");
const search = document.getElementById("search");
let tempVar;

// get total
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +tax.value - +discount.value;
    total.innerHTML = result + "&#36";
    total.style.background = "#1D9345";
    if (result <= 0) {
      total.innerHTML = "Invalid";
      total.style.background = "#EB4644";
    }
  } else {
    //   price.style.borderColor = "red";
    total.innerHTML = "";
    total.style.background = "#EB4644";
  }
}

// create products
let productData;
if (localStorage.product != null) {
  productData = JSON.parse(localStorage.product);
} else {
  productData = [];
}
let productObject;
// save localstorage
createBtn.onclick = function () {
  let productObject = {
    title: title.value,
    price: price.value,
    tax: tax.value,
    discount: discount.value,
    total: total.innerHTML,
    quantity: quantity.value,
    category: category.value,
  };
  //count function
  if (title.value != "" && price.value != "" && quantity.value <= 100) {
    if (productObject.quantity > 1) {
      for (let i = 0; i < productObject.quantity; i++) {
        productData.push(productObject);
      }
    } else {
      productData.push(productObject);
    }
    clearData();
  } else if (title.value == "") {
    title.style.borderColor = "red";
  } else if (price.value == "") {
    price.style.borderColor = "red";
  } else {
    quantity.style.borderColor = "red";
  }
  // save to localstorage
  localStorage.setItem("product", JSON.stringify(productData));
  deleteCount();
  showData();
};
// Title & Price Not Empty
function notEmpty() {
  title.style.borderColor = "";
  price.style.borderColor = "";
  quantity.style.borderColor = "";
}

// clear inputs
function clearData() {
  title.value = "";
  price.value = "";
  tax.value = "";
  discount.value = "";
  total.innerHTML = "";
  quantity.value = "";
  category.value = "";
  search.value = "";
  total.style.background = "#251591";
}
// read
function showData() {
  let table = "";
  for (let i = 0; i < productData.length; i++) {
    table += `<tr>
              <th>${i + 1}</th>
              <th>${productData[i].title}</th>
              <th>${productData[i].price}</th>
              <th>${productData[i].tax}</th>
              <th>${productData[i].discount}</th>
              <th>${productData[i].total}</th>
              <th>${productData[i].category}</th>
              <th onclick="updateData(${i})" class="icon"><img src="imgs/icons8-edit-32.png" alt="Edit" /></th>
              <th onclick="deleteData(${i})" class="icon">
                <img src="imgs/icons8-delete-32.png" alt="Delete" />
              </th>
            </tr>`;
  }
  document.getElementById("tbody").innerHTML = table;
  deleteCount();
}
showData();

// delete
function deleteData(i) {
  productData.splice(i, 1);
  localStorage.product = JSON.stringify(productData);
  deleteCount();
  showData();
}
function deleteCount() {
  if (productData.length > 0) {
    deleteAllBtn.innerHTML = "Delete All " + "(" + productData.length + ")";
  } else {
    deleteAllBtn.innerHTML = "Delete All";
  }
}
function deleteAll() {
  localStorage.clear();
  productData.splice(0);
  deleteCount();
  showData();
}
// update
function updateData(i) {
  title.value = productData[i].title;
  price.value = productData[i].price;
  tax.value = productData[i].tax;
  discount.value = productData[i].discount;
  getTotal();
  category.value = productData[i].category;
  quantity.style.display = "none";
  createBtn.style.display = "none";
  deleteAllBtn.style.display = "none";
  updateBtn.style.display = "block";
  cancelBtn.style.display = "block";
  tempVar = i;
  this.scroll({
    top: 0,
  });
}
updateBtn.onclick = function () {
  let productObject = {
    title: title.value,
    price: price.value,
    tax: tax.value,
    discount: discount.value,
    total: total.innerHTML,
    quantity: quantity.value,
    category: category.value,
  };
  productData[tempVar] = productObject;
  localStorage.setItem("product", JSON.stringify(productData));
  backToNormal();
  clearData();
  showData();
};
function backToNormal() {
  updateBtn.style.display = "none";
  cancelBtn.style.display = "none";
  createBtn.style.display = "block";
  deleteAllBtn.style.display = "block";
  quantity.style.display = "block";
  showData();
  clearData();
  showData();
}

// search
function searchData(value) {
  let table = "";
  for (let i = 0; i < productData.length; i++) {
    if (productData[i].title.toLowerCase().includes(value.toLowerCase())) {
      table += `<tr>
              <th>${i + 1}</th>
              <th>${productData[i].title}</th>
              <th>${productData[i].price}</th>
              <th>${productData[i].tax}</th>
              <th>${productData[i].discount}</th>
              <th>${productData[i].total}</th>
              <th>${productData[i].category}</th>
              <th onclick="updateData(${i})" class="icon"><img src="icons8-edit-32.png" alt="Edit" /></th>
              <th onclick="deleteData(${i})" class="icon">
                <img src="icons8-delete-32.png" alt="Delete" />
              </th>
            </tr>`;
    }
  }
  document.getElementById("tbody").innerHTML = table;
  if (search != "") {
    quantity.style.display = "none";
    createBtn.style.display = "none";
    deleteAllBtn.style.display = "none";
    cancelBtn.style.display = "block";
  }
}
