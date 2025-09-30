import React from "react";

const About = () => {

    const aboutSection = {
        padding : '60px 120px',
        maxWidth : '1200px',
        margin : '0 auto',
    };
//     const heroStyle = {
//         textAlign : 'center',
//         padding : '80px 20px',
//         backgroundcolor : '#2c3e50',
//         color : 'white',
//         marginBottom : '60px'
//     };
//     const cardStyle = {
//     backgroundColor: 'white',
//     padding: '30px',
//     borderRadius: '10px',
//     boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
//     margin: '20px',
//     flex: '1',
//     minWidth: '250px'
//   };

//   const cardsContainerStyle = {
//     display: 'flex',
//     flexWrap: 'wrap',
//     justifyContent: 'center',
//     gap: '20px',
//     marginTop: '40px'
//   };

  return(
    <div>
        <div className="aboutSection-style" style={aboutSection}>
            <h3>About Page</h3>
        </div>
    </div>
  )

}

export default About;