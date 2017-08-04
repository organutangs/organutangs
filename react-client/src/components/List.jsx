import React from 'react';
import ListItem from './ListItem.jsx';

const List = (props) => (
  <div>
    <div className="yelp-list">
      <pre>{ console.log('props', props) }</pre>
      {props.items.map((item, index) => <ListItem key={index} handleClick={props.handleClick} item={item}/>)}
    </div>
  </div>
);

export default List;