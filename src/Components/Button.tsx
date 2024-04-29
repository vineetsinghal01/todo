import React from "react";

interface ButtonProps {
    handleClass?: string;
    handleClick?: () => void;
    children?: string;
}

const Button: React.FC<ButtonProps> = ({
    handleClass = "",
    handleClick = () => {},
    children = "",
}) => {
    return (
        <button className={handleClass} onClick={handleClick}>
            {children}
        </button>
    );
};

export default Button;
