function Cart({ cart, dispatch }) {
    return (
        <div>
            <h2>Cart</h2>
            {cart.map(item => (
                <div key={item.id}>
                    <h3>{item.title}</h3>
                    <p>Quantity: {item.quantity}</p>
                    <button
                        onClick={() => dispatch({
                            type: "INCREASE_QTY",
                            payload: item.id
                        })}>+</button>


                    <button
                        onClick={() => dispatch({
                            type: "DECREASE_QTY",
                            payload: item.id
                        })}>-</button>


                    <button
                        onClick={() => dispatch({
                            type: "REMOVE_FROM_CART",
                            payload: item.id
                        })}
                    >Remove</button>
                </div>
            ))}
        </div>
    )
}

export default Cart;