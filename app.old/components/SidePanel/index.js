/**
 * 
 */
import React, { useState } from 'react';
import styled from 'styled-components';
import Button from './Button';
import NavPanel from './NavPanel';
import messages from './messages';
import { useTheme } from '../../contexts/ThemeContext';

const Wrapper = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 9999;  
  padding: 0;
  margin: 0;
  overflow: hidden;
  z-index: 9999;
`;

const SidePanel = () => {
  const { toggleTheme, isDarkMode } = useTheme();
  const [panelState, setPanelState] = useState(false);

  const togglePanel = () => {
    setPanelState((prev) => !prev);
  };

  const navItems = [
    {
      handleRoute: toggleTheme,//() => alert('Theme toggled!'),
      children: isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode',
    //children: messages.toggleTheme.defaultMessage,
    },
  ];

  return (
    <Wrapper>
      <Button onClick={togglePanel}>{messages.button.defaultMessage}</Button>
      <NavPanel state={panelState} items={navItems} />
    </Wrapper>
  );
};

export default SidePanel;
