import React from 'react';
import { useSelector } from 'react-redux';

const ListContainer = () => {
  const selectedPage = useSelector(state => {
    return state;
  });

  return <div>{selectedPage}</div>;
};

export default ListContainer;
