import React from 'react';

const ListItem = (props) => (
  	<div className="yelp-list-entry-container" onClick={(e)=> props.handleClick(props.item)}>
	    <div className="yelp-list-entry">
	        <div className="media-left media-middle">
	          <img className="listing-object" src={props.item.image_url} alt="" />
	         </div>
	        <div className="listing-body">
	          <div className="yelp-list-entry-name" >{props.item.name}</div>
	          <div className="yelp-list-entry-rating">{'Rating: ' + props.item.rating}</div>
	        	<div className="yelp-list-entry-price">{'Price: ' + props.item.price}</div>
	        	<div className="yelp-list-entry-reviews">{'Reviews: ' + props.item.review_count}</div>
	        </div>
	        <div className="yelp-list-entry-address">
	          	<div className="yelp-list-entry-address1">{props.item.location.address1}</div>
	          	<div className="yelp-list-entry-city">{props.item.location.city + ', ' + props.item.location.zip_code}</div>
	          	<div className="yelp-list-entry-phone">{props.item.phone}</div>
	        </div>
	      </div>
      </div>
)

export default ListItem;