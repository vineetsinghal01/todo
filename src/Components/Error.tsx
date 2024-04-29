import React from "react";

interface ErrorProps {
    error: string;
}

const Error: React.FC<ErrorProps> = ({ error }) => {
    if (error) return <div style={{ color: "red" }}>*{error}</div>;
    return null;
};

export default Error;
