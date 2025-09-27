import Cart from "../models/cart.js";
// import Order from "../models/orders.js";

export async function addcart(req, res) {
  try {
    const {product_id, quantity } = req.body;
    const qty = Number(quantity);
    console.log(req.session.userId);
    
    const userId = req.session.userId;
    console.log(userId);

    if (!product_id || !quantity) {
      return res.status(400).json({ error: "Product Or Quantity Require..." });
    }
    const ifcartitem = await Cart.findOne({ product_id,user_id: userId });

    if (ifcartitem) {
      ifcartitem.quantity += qty;
      await ifcartitem.save();
      return res.status(200).json({ message: "CartItem Update" });
    }
    const create = await Cart.create({
      product_id,
      user_id: userId,
      quantity: qty,
    });
    return res.status(200).json({ message: "Item added Successfully", create });
  } catch (error) {
    console.log(error);
    res.status(403).json({ error: "Error happens" });
  }
}
