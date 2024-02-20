import React from 'react';
import Select from 'react-select';
import "../Sorts/Sorts.css"

const SortOptions = ({ onSortChange }) => {

  const options = [
    { value: 'nameAZ', label: 'Name (A-Z)' },
    { value: 'nameZA', label: 'Name (Z-A)' },
    { value: 'lessAttack', label: 'Less attack' },
    { value: 'greatestAttack', label: 'Greatest attack' }
  ];

  const handleSortChange = (selectedOption) => {
    if(selectedOption) {
    onSortChange(selectedOption.value)
    } else {
      onSortChange("reset")
    }
  };

  return (
    <div className='sort-container'>
      <Select 
      options={options} 
      onChange={handleSortChange}
      placeholder="Sort"
      isClearable = { true }
      isSearchable = { true }
      />
    </div>
  );
};

export default SortOptions;
