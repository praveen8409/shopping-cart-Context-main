import { createContext, useContext, useState } from "react";
import CartModal from "./components/CartModal";

const itemContext = createContext();

function useValue(){
    const value = useContext(itemContext);
    return value;
}

function CustomItemContext({children}){
    const [total, setTotal] = useState(0);
    const [item, setItem] = useState(0);
    const [showCart, setShowCart] = useState(false);
    const [cart, setCart] = useState([]);

    

    const handleReset = ()=>{
          setTotal(0);
          setItem(0);
    }

    const toggle = () => {
      setShowCart(!showCart);
    };

    const handleAdd = (product) => {
          console.log(product)
          const index = cart.findIndex((item)=> item.id === product.id);

          if(index === -1){
            setCart([...cart, {...product, qty:1}]);
            console.log(cart);
            setTotal(total + product.price);
          }else{
            cart[index].qty++;
            setCart(cart);
            setTotal(total+cart[index].price);
            console.log(cart);
          }

          setItem(item+1);
      };
    
      const handleRemove = (price) => {
        if(total<=0){
          return
        }else{
          setTotal((prevState)=> prevState - price);
          setItem(item - 1);
        }
      };

    return(
        <itemContext.Provider value={
            {total,
              item,
              handleAdd,
              handleRemove,
              handleReset,
              toggle,
              cart}
            }>
             {showCart && <CartModal toggle={toggle} />}
            {children}
        </itemContext.Provider>
    )
}

export {itemContext, useValue};
export default CustomItemContext;