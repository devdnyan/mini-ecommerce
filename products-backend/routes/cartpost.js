const express = require('express');
const router = express.Router();
const path = require('path');
const cartDataPath = path.join(__dirname, '..', 'products', 'cart.json');
const fs = require('fs');

router.get('/cart', (req, res) => {
    const rawData = fs.readFileSync(cartDataPath);
    const cartData = JSON.parse(rawData);
    res.json(cartData.cart);
});

router.post('/cart', (req, res) => {
    const { item: newItem } = req.body;
    
    const rawData = fs.readFileSync(cartDataPath);
    const cartData = JSON.parse(rawData);

    const existingItemIndex = cartData.cart.findIndex(item => item.id === newItem.id);
    
    if (existingItemIndex !== -1) {
        cartData.cart[existingItemIndex].quantity = (cartData.cart[existingItemIndex].quantity || 0) + (newItem.quantity || 1);
    } else {
        cartData.cart.push({...newItem, quantity: newItem.quantity || 1 });
    }
    fs.writeFileSync(cartDataPath, JSON.stringify(cartData, null, 2));
    res.status(200).json({ message: 'Item added to cart', cart: cartData.cart });
});

router.delete('/cart/:id', (req, res) => {
    const itemId = Number(req.params.id);

    const rawData = fs.readFileSync(cartDataPath);
    const cartData = JSON.parse(rawData);

    const itemStatus = cartData.cart.find(item => item.id === itemId);
    if (itemStatus) {
        cartData.cart = cartData.cart.filter(item => item.id !== itemId);
        fs.writeFileSync(cartDataPath, JSON.stringify(cartData, null, 2));
        res.status(200).json({ message: 'Item removed from cart', cart: cartData.cart });
    }else{
        res.status(404).json({ message: 'Item not found in cart' });
    }  
});

router.patch('/cart/:id', (req, res) => {
    const itemId = Number(req.params.id);

    const rawData = fs.readFileSync(cartDataPath);
    const cartData = JSON.parse(rawData);

    const itemIndex = cartData.cart.findIndex(item => item.id === itemId);
    if (itemIndex !== -1) {
        const quantity = cartData.cart[itemIndex].quantity;
        if (quantity > 1) {
            cartData.cart[itemIndex].quantity = quantity - 1;
            fs.writeFileSync(cartDataPath, JSON.stringify(cartData, null, 2));
            res.status(200).json({ message: 'Item quantity decreased', cart: cartData.cart });
        } else {
            cartData.cart.splice(itemIndex, 1);
            fs.writeFileSync(cartDataPath, JSON.stringify(cartData, null, 2));
            res.status(200).json({ message: 'Item removed from cart', cart: cartData.cart });
        }
    } else {
        res.status(404).json({ message: 'Item not found in cart' });
    }
});
module.exports = router;