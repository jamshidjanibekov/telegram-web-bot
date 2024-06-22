import './App.css'
import {getData} from "./constants/db.js";
import Card from "./components/card/card.jsx";
import Cart from "./components/cart/cart.jsx";
import {useCallback, useEffect, useState} from "react";

const courses = getData()
const telegram = window.Telegram.WebApp;
const App = () => {
  const [cartItems , setCartItems] = useState([])

  useEffect(() => {
    telegram.ready()
  }, []);

  const onAddItem = (item) => {
    const existItem = cartItems.find(c => c.id === item.id)

    if (existItem){
      const data = cartItems.map(c => c.id === item.id ? {...existItem, quantity: existItem.quantity + 1} : c)
      setCartItems(data)
    }else {
      const newData = [...cartItems, {...item, quantity: 1}];
      setCartItems(newData)
    }
  }
  const onRemoveItem = item => {
    const existItem = cartItems.find(c => c.id === item.id);

    if (existItem.quantity === 1) {
      const newData = cartItems.filter(c => c.id !== existItem.id);
      setCartItems(newData);
    } else {
      const newData = cartItems.map(c =>
          c.id === existItem.id
              ? { ...existItem, quantity: existItem.quantity - 1 }
              : c
      );
      setCartItems(newData);
    }
  }

  const onSendData = useCallback(() =>{
    const queryID = telegram.initDataUnsave?.query_id

    if (queryID) {
      fetch('https://localhost:8080', {
        method:'Post',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(cartItems)
      })
    }else {
      telegram.sendDate(JSON.stringify(cartItems))
    }

  },[cartItems])

  useEffect(() => {
    telegram.onEvent('mainButtonClicked', onSendData)

    return () => telegram.offEvent('mainButtonClicked', onSendData)

  }, [onSendData]);

  const onCheckout = () =>{
    telegram.MainButton.text = 'Sotib olish :)'
    telegram.MainButton.show()
  }
  return (
    <>
      <h1 className='heading'>Sammi kurslar</h1>
      <Cart cartItems={cartItems} onCheckout={onCheckout}/>
    {/*  Card*/}
      <div className='cards__container'>
        {courses.map(course =>(
          <>
            <Card
                key={course.id}
                course={course}
                onAddItem = {onAddItem}
                onClick={onRemoveItem}
            />
          </>
        ))}
      </div>
    </>
  );
};

export default App;