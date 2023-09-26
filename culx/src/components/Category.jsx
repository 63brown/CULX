import {FaPizzaSlice, FaHamburger} from 'react-icons/fa';
import {GiNoodles, GiCroissant} from 'react-icons/gi'
import styled from 'styled-components';
import {NavLink} from 'react-router-dom';
import React from 'react'

function Category() {
  return (
    <List>
      <NavLink to={'/cuisine/Italian'}>
        <FaPizzaSlice />
        <h4>Italian</h4>
      </NavLink>
      <NavLink to={'/cuisine/American'}>
        <FaHamburger />
        <h4>American</h4>
      </NavLink>
      <NavLink to={'/cuisine/Asian'}>
        <GiNoodles />
        <h4>Asian</h4>
      </NavLink>
      <NavLink to={'/cuisine/French'}>
        <GiCroissant />
        <h4>French</h4>
      </NavLink>
    </List>
  )
}

const List = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0rem;
  `;

export default Category