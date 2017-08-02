import React from 'react';
import ListItem from './ListItem.jsx';

const List = (props) => (
  <div>
    <h4>Yelp Results</h4>
    <pre>{console.log('props', props)}</pre>
    { props.items.sampleData.map(item => <ListItem handleClick={props.handleClick} item={item}/>)}
  	
  </div>
 	 

)

export default List;