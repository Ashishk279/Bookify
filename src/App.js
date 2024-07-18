import React from 'react';
import { Routes, Route } from 'react-router-dom';
// CSS
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

// Pages
// import { RegisterPage } from './pages/Register';
// import { LoginPage } from './pages/Login';
import { MyNavbar } from './components/Navbar';
import { ListingPage } from "./pages/List"
import { HomePage } from './pages/Home';
import { BookDetailPage } from './pages/Detail';
import { OrderPage } from './pages/ViewOrders';
import { ViewOrderDetails } from './pages/ViewOrderDetails';
// import { useEffect } from 'react';
// import { messaging, useFirebase } from './context/firebase';
// import { getToken } from 'firebase/messaging';

function App() {
  // const [notification, setnotification] = React.useState({title: "", body: ""})
  //  const firebase = useFirebase()

  // const requestPermission = async () => {
  //   const permission = await Notification.requestPermission()

  //   if (permission === 'granted') {
  //     // Generate Token
  //     try {
  //       const token = await getToken(messaging, { vapidKey: 'BBmJ54TXv6bO6osz3qiLoSMQVzu-GZKduEwEQH9sKpk9b1ZUMW0z38r9YvYIoeO8jyFeMxrW1mkA6ob1AOhPpR8' })
  //       console.log("Token ", token)
  //     } catch (error) {
  //       console.log("Error occured when requesting to receive the token", error)
  //     }
  //   } else if (permission === 'denied') {
  //     alert("You denied the notification")
  //   }

  //   await firebase.onMessageListener().then(payload => {
  //     setnotification({
  //       title: payload?.notification?.title,
  //       body: payload?.notification?.body
  //     })
  //   })
  // }
  // useEffect(() => {
  //   // Req user for notification permission
  //   requestPermission()
  // }, [])
  return (
    <div>
      <MyNavbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        {/* <Route path='/register' element={<RegisterPage />} /> */}
        {/* <Route path='/login' element={<LoginPage />} /> */}
        <Route path='/book/list' element={<ListingPage />} />
        <Route path='/book/view/:bookId' element={<BookDetailPage />} />
        <Route path='/book/orders' element={<OrderPage />} />
        <Route path='/books/orders/:bookId' element={<ViewOrderDetails />} />
        
      </Routes>
    </div>
  );
}

export default App;
