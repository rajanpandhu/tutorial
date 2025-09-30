import React, { useState } from 'react';
import Banner from '../Banner';
import BannerImage from '../../assets/banner.jpg';
import Button from '../Button';

const Home = () => {
     const [welcomeMessage, setWelcomeMessage] = useState('Welcome to Tasty Bites! 🍕');
      const [orderCount, setOrderCount] = useState(0);
         const [secBtn, setsecBtn] = useState('Welcome to Tasty Bites! 🍕');
        const [itemCount, setitemCount] = useState(0);

        const handleOrderClick = () => {
    setOrderCount(orderCount + 1);
    setWelcomeMessage(`Thank you! You've clicked ${orderCount + 1} times 😊`);
  };

  const handleClick = () => {
     if (itemCount < 20) {
      setitemCount(itemCount + 1);
      setsecBtn(`New Thank You Message ${itemCount + 1}`);
    } else {
      // 20 pe pahunch gaye to message dikhao
      setsecBtn('Maximum limit reached! Cannot add more items 🚫');
    }
  };

   const handleOrderNow = () => {
    alert('Order Now button clicked! 🍕');
  };
    const handleViewMenu = () => {
    alert('View Menu button clicked! 📋');
  }
    return(
        <>
        <div className="home-page">
            <Banner 
                    title="Welcome to Tasty Bites! 🍕"
                    subtitle="Where Every Bite Tells a Story"
                    description="Experience authentic Italian flavors crafted with love and tradition. From wood-fired pizzas to homemade pasta, we bring Italy to your table."
                    buttonText="Order Now"
                    onButtonClick={handleOrderNow}
                    backgroundImage={BannerImage}
                    secondaryButtonText="View Menu"
                    onSecondaryButtonClick={handleViewMenu}
                    backgroundColor="#e74c3c"
                    height="600px"
                  />


      {/* Main Content */}
      <main style={{padding: '40px 20px', textAlign: 'center'}}>
        {/* Dynamic Message from STATE */}
        <h2>{welcomeMessage}</h2>
        
        <p style={{fontSize: '18px', color: '#7f8c8d'}}>
          Best Italian food in the city! 🇮🇹
        </p>

        {/* Order Button with Event Handler */}
        <button 
          onClick={handleOrderClick}
          style={{
            backgroundColor: '#e74c3c',
            color: 'white',
            padding: '15px 30px',
            fontSize: '18px',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            margin: '20px',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
        >
          Order Now! (Clicked: {orderCount} times)
        </button>

        {/* Show special message after 3 clicks */}
        {orderCount >= 3 && (
          <div style={{
            backgroundColor: '#d4edda',
            border: '1px solid #c3e6cb',
            borderRadius: '8px',
            padding: '15px',
            margin: '20px auto',
            maxWidth: '400px'
          }}>
            <h3>🎉 Wow! You're really interested!</h3>
            <p>Special discount coming soon...</p>
          </div>
        )}
      </main>

      {itemCount >= 4 && itemCount <= 8 && (
         <div style={{
            backgroundColor: '#d4edda',
            border: '1px solid #c3e6cb',
            borderRadius: '8px',
            padding: '15px',
            margin: '20px auto',
            maxWidth: '400px'
          }}>

            <p>Special discount coming soon...</p>
          </div>

      )}
        <p>{secBtn }</p>
       <Button variant="primary" onClick={handleClick} childern="Secondary Button" disabled={itemCount >= 20 && ('true')}>
      </Button> 
              
        </div>
        </>
    )
}

export default Home;