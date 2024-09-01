import React, { useState } from 'react';
import { BaseProvider, Select, Option } from '@base-ui/core';
import './App.css'; // Import your custom styles if needed

const SelectComponent = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <Select
      value={selectedOption}
      onChange={handleChange}
      placeholder="Select an option"
      style={{ width: '200px' }} // You can adjust the style as needed
    >
      <Option value="option1">Option 1</Option>
      <Option value="option2">Option 2</Option>
      <Option value="option3">Option 3</Option>
    </Select>
  );
};

export default SelectComponent;
