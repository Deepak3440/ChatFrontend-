import React from 'react';

const GenderCheckbox = ({ onCheckboxChange, selectedGender }) => {
  const handleCheckboxChange = (e) => {
    const { id } = e.target;
    onCheckboxChange(id);
  };

  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id="male"
        name="gender"
        className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
        onChange={handleCheckboxChange}
        checked={selectedGender === 'male'}
      />
      <label htmlFor="male" className="ml-2 text-sm text-gray-700">Male</label>

      <input
        type="checkbox"
        id="female"
        name="gender"
        className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out ml-4"
        onChange={handleCheckboxChange}
        checked={selectedGender === 'female'}
      />
      <label htmlFor="female" className="ml-2 text-sm text-gray-700">Female</label>
    </div>
  );
}

export default GenderCheckbox;
