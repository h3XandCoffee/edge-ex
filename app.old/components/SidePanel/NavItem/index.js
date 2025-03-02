/**
 * 
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 8px 0;
`;
//import Wrapper from './Wrapper';

function NavItem({ handleRoute, children }) {
  return (
    <Wrapper>
      <button onClick={handleRoute}>{children}</button>
    </Wrapper>
  );
}

NavItem.propTypes = {
  handleRoute: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default NavItem;
