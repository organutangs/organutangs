import React from 'react';

const ListItem = (props) => (
  <div>
    <div className="yelp-list-entry">
        <div className="media-left media-middle">
          <img className="listing-object" src={props.item.image_url} alt="" />
          </div>
        <div className="listing-body">
          <div className="yelp-list-entry-name" onClick={(e)=> props.handleClick(props.item)}>{props.item.name}</div>
          <div className="yelp-list-entry-address">{props.item.location.address1}</div>
        </div>
      </div>
  </div>
)

export default ListItem;