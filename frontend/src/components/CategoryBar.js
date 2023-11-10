import React from 'react'
import { Container, Row, Button, Col } from 'react-bootstrap'

const CategoryBar = () => {
  return (
    <Container fluid style={{display: 'flex', width: '100%', height: '50px', justifyContent: 'center'}}>
      <div style={{backgroundColor: 'lightblue', width: '60%', display: 'flex', alignContent: 'center', justifyContent: 'space-between', alignItems: 'center'}}>
        
          <a>Cycling</a>
          <a>Camping</a>
          <a>Hiking</a>

      </div>
    </Container>
  )
}

export default CategoryBar