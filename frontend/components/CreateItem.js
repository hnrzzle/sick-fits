import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem(
    title: $title
    description: $description
    price: $price
    largeImage: $largeImage
    image: $image
    ) {
      id
    }
  }
`;

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

  uploadFile = async e => {
    console.log('uploading file');
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'sickfits');

    const res = await fetch('https://api.cloudinary.com/v1_1/hnrzzle/image/upload', {
      method: 'POST',
      body: data
    });
    const file = await res.json();
    console.log(file);
    this.setState({
      image: file.secure_url,
      largeImage: file.eager[0].secure_url
    });
  }

  render() {
    const { title, description, image, largeImage, price } = this.state;

    return (
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state} >
        {(createItem, { loading, error }) => (
        <Form onSubmit={async (e) => {
          e.preventDefault();
          const res = await createItem();
          console.log(res);
          Router.push({
            pathname: '/item',
            query: { id: res.data.createItem.id }
          });
          }}
        >
          <Error error={error} />
          <fieldset disabled={loading} aria-busy={loading}>
            <label htmlFor="file">
              Title
              <input 
              type="file" 
              id="file" 
              name="file" 
              placeholder="Upload an Image" 
              required 
              onChange={this.uploadFile}
              />
            </label>
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
            <button type="submit">Submit</button>
          </fieldset>
        </Form>
      )}
    </Mutation>
    );
  }
}

export default CreateItem;

export { CREATE_ITEM_MUTATION };