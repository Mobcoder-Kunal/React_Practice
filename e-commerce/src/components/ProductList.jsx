import { products } from "../data/products";

function ProductList({ dispatch }) {
    return (
        <div>
            {products.map(product => (
                <div key={product.id}>
                    <h3>{product.title}</h3>
                    <p>₹{product.price}</p>

                    <button
                        onClick={() => dispatch({
                            type: "ADD_TO_CART",
                            payload: product
                        })}>Add to cart</button>
                </div>
            ))}
        </div>
    )
}

export default ProductList;