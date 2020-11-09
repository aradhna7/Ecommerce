
//add item to cart
export const addItem = (item, next) =>{
    let cart = [];
    if(typeof window!== "undefined"){
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'))
        }
        cart.push({
            ...item,
            count: 1
        })

        //remove duplicates
        //build an Array from new Set and turn it back into array using Array.from
        //so that later we can re-map it
        //new set will allow only unique values in it
        //so pass the ids of each object/product
        //if the loop tries to add same value again, it'll ignore
        //...with thearray of ids we got on when first map() was used
        //run map() o it again and return the actual product from cart

        cart = Array.from(new Set(cart.map((p)=> (p._id)))).map(id=>{
            return cart.find(p=> p._id === id)
        })

        localStorage.setItem('cart', JSON.stringify(cart));
        next();
    }
}


//get no. of items in cart
export const itemTotal = () =>{
    if(typeof window!== "undefined"){
        if(localStorage.getItem('cart')){
            return JSON.parse(localStorage.getItem('cart')).length;
        }

    }
    return 0;
}


//get items in cart
export const getCart = () =>{
    if(typeof window!== "undefined"){
        if(localStorage.getItem('cart')){
            return JSON.parse(localStorage.getItem('cart'));
        }

    }
    return [];
}


//update quantity of product
export const updateItem = (productId, count) =>{

    let cart = [];

    if(typeof window!== "undefined"){
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'));
        }

        cart.map((product, i)=>{
            if(product._id === productId){
                cart[i].count = count;
            }
        })

        localStorage.setItem('cart', JSON.stringify(cart));
    }
}


//remove product from cart
export const removeItem = (productId) =>{

    let cart = [];

    if(typeof window!== "undefined"){
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'));
        }

        cart.map((product, i)=>{
            if(product._id === productId){
                cart.splice(i, 1);
            }
        })

        localStorage.setItem('cart', JSON.stringify(cart));
    }
    return cart;
}



export const emptyCart = next =>{
    if(typeof window!== "undefined"){
        localStorage.removeItem('cart');
        next();
    }
}