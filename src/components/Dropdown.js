import React, { useState, useEffect } from 'react';

import dropdownStyles from "../styles/components/Dropdown.module.scss";

const Dropdown = ({ title, items, action }) => {
  const [menuDisplayed, setDisplay] = useState(false);

  const hideDropdownMenu = () => {
    setDisplay(false)
  }

  const showDropdownMenu = (event) => {
    event.preventDefault();
    setDisplay(true);
  }

  useEffect(() => {
    if (menuDisplayed) {
      document.addEventListener('click', hideDropdownMenu);
      return () => { 
        document.removeEventListener('click', hideDropdownMenu) 
      };
    } 
  }, [menuDisplayed])


  return (
    <div className={dropdownStyles.dropdown}>
      <div 
        className={dropdownStyles.button} 
        onClick={showDropdownMenu}
      >
        {title}
      </div>
      { menuDisplayed ? (
        <ul>
          {items.map((item) => {
            return ( 
              <li key={item.id}>
                <div onClick={() => action(item.id)}> 
                  {item.name} 
                </div>
              </li> 
            );
          })}
        </ul>
      ) : (
        null
      )}
    </div>
  );
}

export default Dropdown;
