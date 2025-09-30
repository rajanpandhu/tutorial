import React from "react";

const Banner = ({title, subtitle, backgroundImage, backgroundColor = '#f8f9fa', height = '400px'}) => {
    const bannerStyle = {
        backgroundColor : backgroundColor,
        backgroundImage : backgroundImage ? `url(${backgroundImage})` : 'none',
        backgroundSize : 'cover',
        backgroundPosition : 'center',
        padding : '60px 20px',
        textAlign : 'center',
        minHeight : height,
        display : 'flex',
        flexDirection : 'column',
        justifyContent : 'center',
        alignItems : 'center',
    };
    return (
        <section style={bannerStyle} data-bg={{backgroundImage}}>
            <h1 style={{ fontSize : '48px', color: 'white', textShadow : '2px 2px 4px rgba(0, 0, 0, 0.5)'}}>
                {title}
            </h1>
            { subtitle && (
                <p style={{fontSize:'24px', color:'white', textShadow:'1px 1px 3px rgba(0,0,0,0.5)'}}>
                    {subtitle}
                </p>
            )}

        </section>
    )
}

export default Banner;