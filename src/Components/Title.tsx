import React from "react";

interface TitleProps {
    handleClass?: string;
    children?: string;
}

const Title: React.FC<TitleProps> = ({ handleClass = "", children = "" }) => {
    return <h2 className={handleClass}>{children}</h2>;
};

export default Title;
