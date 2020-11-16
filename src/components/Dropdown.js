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
        role="button"
        tabindex="0"
        className={dropdownStyles.button} 
        onClick={showDropdownMenu}
        onKeyDown={(ev) => {
          if (ev.keyCode === 40) {
            showDropdownMenu(ev);
          }
        }}
      >
        {title}
      </div>
      { menuDisplayed ? (
        <ul>
          {items.map((item) => {
            return ( 
              <li key={item.id}>
                <div 
                  role="button" 
                  tabindex="0"
                  onKeyDown={(ev) => {
                    if (ev.keyCode === 13) {
                      action(item.id);
                    }
                  }}
                  onClick={() => action(item.id)}
                >
                  <button 
                    href="#" 
                    onClick={(e) => e.preventDefault()}
                  >
                      {item.name}
                  </button>
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
