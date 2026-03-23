import { useReducer } from "react";
import {cartReducer, initialState} from "./reducer/cartReducer"

import ProductList from "./components/ProductList";
import Cart from "./components/Cart";

function App() {

  const [state, dispatch] = useReducer(cartReducer, initialState)
  return (
    <div>
      <h1>
        Shopping Cart
      </h1>
      <ProductList dispatch={dispatch}/>
      <Cart cart={state.cart} dispatch={dispatch}/>
    </div>
  )
}

export default App;