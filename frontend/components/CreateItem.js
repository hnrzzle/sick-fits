import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';

class CreateItem extends Component {
  state = {
    title: '',
    description: '',
    image: '',
    largeImage: '',
    price: 0,
  };

  handleChange = (e) => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;

    this.setState({ [name]: val });
  }

  render() {
    const { title, description, image, largeImage, price } = this.state;

    return (
      <Form>
        <fieldset>
          <label htmlFor="title">
            Title
            <input 
            type="text" 
            id="title" 
            name="title" 
            placeholder="Title" 
            required 
            value={title}
            onChange={this.handleChange}
            />
          </label>
          <label htmlFor="price">
            Title
            <input 
            type="number" 
            id="price" 
            name="price" 
            placeholder="Price" 
            required 
            value={price}
            onChange={this.handleChange}
            />
          </label>
          <label htmlFor="description">
            Description
            <textarea 
            id="description" 
            name="description" 
            placeholder="Description" 
            required 
            value={description}
            onChange={this.handleChange}
            />
          </label>
        </fieldset>
      </Form>
    );
  }
}

export default CreateItem;