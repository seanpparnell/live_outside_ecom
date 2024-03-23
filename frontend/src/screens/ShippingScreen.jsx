import React, {useState} from 'react';
import { Form, Button} from 'react-bootstrap'
import FormContainer from '../components/FormContainer';


const ShippingScreen = () => {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(`submit address: ${address}, ${city}, ${postalCode}. ${country}`)
  }

  return (
    <>
    <FormContainer>
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='address' className='my-2'>
          <Form.Label>Address</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Address'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></Form.Control>
            <Form.Label>City</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter City'
              value={city}
              onChange={(e) => setCity(e.target.value)}
            ></Form.Control>
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Postal Code'
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            ></Form.Control>
            <Form.Label>Country</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter County'
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            ></Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary' className='my-2'>
          Continue
        </Button>
      </Form>
    </FormContainer>
    </>
  )
}

export default ShippingScreen