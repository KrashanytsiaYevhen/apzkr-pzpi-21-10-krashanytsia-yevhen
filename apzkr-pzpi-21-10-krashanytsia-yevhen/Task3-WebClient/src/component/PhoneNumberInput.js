import React from 'react';
import styles from './PhoneNumberInput.module.css';
import {PhoneInput} from "react-international-phone";

const PhoneNumberInput = ({ value, onChange }) => {
    return (
        <div>
            <PhoneInput
                style={{marginBottom: 16}}
                inputStyle={{width: '100%', fontSize: 16, padding: 5}}
                defaultCountry="ua"
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

export default PhoneNumberInput;