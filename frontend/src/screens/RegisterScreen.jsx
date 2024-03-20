import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../slices/authSlice';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Loader from '../components/Loader';
import {useRegisterMutation } from '../slices/usersApiSlice';
import { toast } from 'react-toastify';
import FormContainer from '../components/FormContainer';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [ register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth)

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('direct') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate])

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return
    } else {
      try {
        const res = await register({ name, email, password}).unwrap()
        dispatch(setCredentials({...res}))
        navigate(redirect)
      } catch (err) {
        toast.error(err?.data?.message || err.error)
      }
    }
  }

  return (
    <FormContainer style={{display: 'flex', alignItems: 'center', justifyContent: 'center', alignContent: 'center'}}>
      <h1>Register</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          >
          </Form.Control>
        </Form.Group>
        <Form.Group controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          >
          </Form.Control>
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          >
          </Form.Control>
        </Form.Group>
        <Form.Group controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          >
          </Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary' disabled={isLoading}>
          Register
        </Button>
        { isLoading && <Loader />}
      </Form>
      {/* <Row>
        <Col>
          New Customer ? <Link to={ redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
        </Col>
      </Row> */}
    </FormContainer>
  )
}

export default RegisterScreen;