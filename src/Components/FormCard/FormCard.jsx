import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Style from './FormCard.module.css'
import DinamycForm from './DinamycForm';


export default function FormCard({database, readOnly}) {

  const [showForm,setShowForm] = React.useState(true)
  const [id,setId] = React.useState(0)

  const switchForm = (id) =>{
    setShowForm(!showForm)
    setId(id)
  }

  return (
    <div className={Style.formCard}>
        <Container fluid >
            <Row>
                <h1 className={Style.gradient}>Formulario GreyDive</h1>
                {showForm ? <p style={readOnly? {display:'none'}:{color:'red',display:'flex',justifyContent:'flex-start'}}>Los campos con * son obligatorios</p> : <p style={{color:'#9f804b',display:'flex',justifyContent:'flex-start'}}>Ruta de sus datos https://greydive-ten.vercel.app/form/{id}.</p> }
            </Row>
            <Row style={readOnly? {paddingTop:'32px'}: {} }>
               {showForm ? <DinamycForm readOnly={readOnly} database={database} switchForm={switchForm}/> : <h2 className={Style.gradient}>Felicidades se ha enviado tu formulario correctamente.</h2>}
            </Row>
            
        </Container>
        
    </div>
  )
}
