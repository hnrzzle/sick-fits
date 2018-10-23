import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import formatMoney from '../lib/formatMoney';
import Title from './styles/Title';
import ItemStyles from './styles/ItemStyles';
import PriceTag from './styles/PriceTag';

class Item extends Component {
  static PropTypes = {
    item: PropTypes.object.isRequired
  };

  render() {
    const { id, title, price, description, image, largeImage } = this.props.item;
    return (
      <ItemStyles>
      {image && <img src={image} alt={title} />}
        <Title>
          <Link href={{
            pathname:'/item',
            query: { id: id },
          }}>
            {title}
          </Link>
        </Title>
        <PriceTag>{formatMoney(price)}</PriceTag>
        <p>{description}</p>

        <div className="buttonList">
          <Link 
            href={{
              pathname: 'update',
              query: { id: id }
            }}
          >
          <a>Edit ✏️</a>
        </Link>
        <button>Add to Cart</button>
        <button>Delete</button>
        </div>
      </ItemStyles>
    );
  }
}


export default Item;