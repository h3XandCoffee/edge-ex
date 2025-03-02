/**
 * 
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import NavItem from '../NavItem';

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  height: 100%;
  background-color: #f4f4f4;
  transform: ${(props) => (props.state ? 'translateX(0)' : 'translateX(100%)')};
  transition: transform 0.3s ease-in-out;
`;

function NavPanel({ state, items }) {
  return (
    <Wrapper state={state}>
      {items && items.map((item, index) => <NavItem key={index} {...item} />)}
    </Wrapper>
  );
}

NavPanel.propTypes = {
  state: PropTypes.bool,
  items: PropTypes.array,
};

NavPanel.propTypes = {
  state: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      handleRoute: PropTypes.func.isRequired,
      children: PropTypes.node.isRequired,
    })
  ),
};

export default NavPanel;
