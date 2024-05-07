import React, { ChangeEvent } from "react";

interface TextInputProps {
    value?: string;
    handleChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

const TextInput: React.FC<TextInputProps> = ({
    value = "",
    handleChange = (f) => f,
    placeholder = "",
}) => {
    return (
        <input
            type="text"
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
        />
    );
};

export default TextInput;
