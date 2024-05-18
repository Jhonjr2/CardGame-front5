import React, { useEffect, useState } from 'react';

const Avatar = ({ firstName, lastName, width, height, fontSize }) => {

    const [backgroundColor, setBackgroundColor] = useState();

    useEffect(() => {
        setBackgroundColor(getRandomColor());
    }, []);

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const initials = firstName.charAt(0) + lastName.charAt(0);

    const avatarStyle = {
        backgroundColor: backgroundColor,
        color: '#fff',
        width: width,
        height: height,
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: fontSize,
        textTransform: 'uppercase',
        padding: '7px',
    };

    return <div style={avatarStyle}>{initials}</div>;
};

export default Avatar;
