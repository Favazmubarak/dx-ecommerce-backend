import Cart from "../models/cart.js";
// import Order from "../models/orders.js";

////////////////////////// add cart  ////////////////////////
export async function addcart(req, res) {
  try {
    const { product_id, quantity } = req.body;
    const qty = Number(quantity);
    console.log(req.session.userId);

    const userId = req.session.userId;
    console.log(userId);

    if (!product_id || !quantity) {
      return res.status(400).json({ error: "Product Or Quantity Require..." });
    }
    const ifcartitem = await Cart.findOne({ product_id, user_id: userId });

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

///////////////////////// view cart  ///////////////////

export async function getcart(req, res) {
  try {
    const user_id = req.session.userId;
    const cart = await Cart.find({ user_id }).populate("product_id");
    res.status(200).json({ result: cart });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Some Error On Server" });
  }
}

///////////// update cart  ////////////////////Small error
export async function updatecart(req, res) {
  try {
    const getid = req.params.userId;
    const cart = await Cart.findById(getid);
    cart.quantity++;
    await Cart.save();
    return res.status(200).json({ message: "cart item Updated" });
  } catch (error) {
    res.status(400).json({ error: "Error Happens" });
  }
}

/////////////// delete cart  //////////////////

export async function deletecart(req, res) {
  try {
    const cartid = req.params.userId;
    const deleted = await Cart.findByIdAndDelete(cartid);
    return res.status(200).json({ message: "Cart Item deleted", deleted });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Server Error" });
  }
}

///////////get orders///////////////////
export async function getorders(req, res) {
  try {
    const id = req.params.id;
    const orders = await Order.findById(id).populate("items.product_id");
    res.status(200).json({ orders });
  } catch (error) {
    res.status(400).json({ error: "Error Happens" });
  }
}

////////////Post orders //////////////
export async function postOrders(req, res) {
  try {
    const user_id = req.session.userId;
    const cart = await Cart.find({ user_id }).populate("product_id");
    if (cart.length === 0) {
      return res.status(400).json({ error: "cart is empty" });
    }
    let orderitems = [];
    let total_price = 0;
    cart.forEach((item) => {
      const quantity = item.quantity;
      const price = item.product_id.price;
      const product_id = item.product_id._id;
      const item_total = quantity * price;
      orderitems.push({ product_id, quantity, price, item_total });
      total_price = total_price + item_total;
    });
    const orderdata = await Order.create({
      user_id,
      items: orderitems,
      total_price,
    });
    await Cart.deleteMany({ user_id });
    return res.status(200).json({ message: "order initialized", orderdata });
  } catch (error) {
    console.log(error);
    res.status(403).json({ error: "some errorh hapedned" });
  }
}
