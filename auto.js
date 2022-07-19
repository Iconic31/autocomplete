const inputTag =document.getElementById("searchBox");
const productContainerTag = document.getElementsByClassName("productContainer")[0];
const EnterContainerTag = document.getElementsByClassName("EnterContainer")[0];

// start fetch data

let products;
const resourceUrl = "https://fakestoreapi.com/products";
// fetch(resourceUrl)
// .then((response) => {
//     console.log("helo");
//     const productDatas = response.json();
//     return productDatas;
// })
// .then((product) => {
//     products = product;
//     console.log("products")
//     console.log(products)
//     inputTag.disabled = false;
// })
// .catch((err) => {
//     console.log("Inside Catch: ", err)
// });

const test = async () => {
    const response = await fetch(resourceUrl);
    const jsonObj = await response.json();
    products = jsonObj;
    console.log(products)
    inputTag.disabled = false;
};

test();



// end fetch data


let filterProducts;

inputTag.addEventListener("keyup" , (e) => {

    if(
        e.key === "ArrowDown" ||
        e.key === "ArrowUp" ||
        e.key === "Enter"
    ){
        keyDownAndUp(e.key);
        return;
    }

    productContainerTag.innerHTML = "";

    const getSearchText = e.target.value.toLowerCase();

    if(getSearchText.trim() === ""){
        return;
    }

    filterProducts = products.filter((product) => {
        return product.title.toLowerCase().includes(getSearchText);
    });

    const hasFilterProducts = filterProducts.length > 0;

    if(hasFilterProducts){
        for(let i = 0; i < filterProducts.length; i++){
            const productItemContainer = document.createElement("div");
            productItemContainer.classList.add("productItemContainer");
            productItemContainer.id = filterProducts[i].id;

            const productItemText = document.createElement("span");
            productItemText.classList.add("productItemText");
            productItemText.append(filterProducts[i].title);

            const productItemImg = document.createElement("img");
            productItemImg.classList.add("productItemImg");
            productItemImg.src = filterProducts[i].image;

            productItemContainer.append(productItemText,productItemImg);
            productContainerTag.append(productItemContainer)
            
        }
    }

});

let indexToSelect = -1;
const keyDownAndUp = (key) => {

    //for ArrowDown
    if(key === "ArrowDown"){

        if(productContainerTag.hasChildNodes() !== true){
            return;
        }

        if(indexToSelect === filterProducts.length - 1){
            indexToSelect = -1;
            deselectProducts();
            return;
        }

        indexToSelect += 1;
        
        const productToSelect = selectProducts(indexToSelect);

        productToSelect.classList.add("selected");

        if(indexToSelect > 0){
            deselectProducts();
            return;
        }

    }

    // for ArrowUp
    if(key === "ArrowUp"){

        if(indexToSelect === -1){
            return;
        }

        if(indexToSelect === 0){
            indexToSelect = -1;
            deselectProducts();
            return;
        }

        indexToSelect -= 1;
        const productToSelect = selectProducts(indexToSelect);
        deselectProducts();
        productToSelect.classList.add("selected")

    }

    // for Enter
    if(key === "Enter"){

        if(inputTag.value === ""){
            return;
        }

        productContainerTag.style.display = "none";

        const enterProductContainer = `
            <div class="enterProductContainer card showing">
                <div class="card-header d-flex justify-content-between pt-3">
                    <h5 class="titles">${filterProducts[indexToSelect].title}</h5>
                    <button type="button" class="btn-close"></button>
                </div>
                <div class="card-body choiceProduct" >
                    <img src="${filterProducts[indexToSelect].image}" class="enterImg" alt="enterProduct" />
                </div>
                <div class="card-footer d-flex justify-content-between align-items-center">
                    <div>
                        <span>Price : ${filterProducts[indexToSelect].price} $ </span>
                        <span>Rating : ${filterProducts[indexToSelect].rating.rate}</span>
                        <span>Count : ${filterProducts[indexToSelect].rating.count}</span>
                    </div>
                    <div>
                        <button type="button" class="btn btn-outline-danger enterBtns mt-5">Buy<i class="fa-solid fa-cart-shopping"></i></button>
                    </div>
                </div>
            </div>
        `;

        EnterContainerTag.innerHTML = enterProductContainer;

        const closeBtn = document.getElementsByClassName("btn-close")[0];
        const enterProductContainerTag = document.getElementsByClassName("enterProductContainer")[0];

        closeBtn.addEventListener("click", () => {
            const showResult = enterProductContainerTag.classList.contains("showing");
            if(showResult){
                enterProductContainerTag.style.display = "none";
                productContainerTag.style.display = "block";
                enterProductContainerTag.classList.remove("showing");

                productContainerTag.innerHTML = "";
                inputTag.value = "";
                indexToSelect = -1;
            }
        });

        const enterBtns = document.getElementsByClassName("enterBtns")[0];

        enterBtns.addEventListener("click", () => {

            window.alert("Thanks for buying our products")

        });

    }
    
};

const selectProducts = (index) => {
    const productToSelectId = filterProducts[indexToSelect].id.toString();
    const productToSelect = document.getElementById(productToSelectId);
    productToSelect.style.background = " rgb(209, 101, 166)";
    productToSelect.firstChild.style.color = "#fff";
    return productToSelect;
};

const deselectProducts = () => {
    const productToDeselect = document.getElementsByClassName("selected")[0];
    productToDeselect.style.background = "#fff";
    productToDeselect.firstChild.style.color = "#000";
    productToDeselect.classList.remove("selected");
}