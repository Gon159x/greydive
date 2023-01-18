import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Style from './FormCard.module.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {documentId, collection,addDoc, query, where, getDocs } from "firebase/firestore";
import { useParams } from "react-router-dom";


export default function DinamycForm({database,switchForm, readOnly}) {
    const audioRef = React.useRef(null);
    const [archivoJson,setArchivoJson] = React.useState(null) 
    const [validated, setValidated] = React.useState(null)
    const [formData, setFormData] = React.useState(null)
    let {id} = useParams();

    const inicializarData = (data) => {
        let auxData = {}
        for(let index in data['items']){
            let object = data['items'][index]
            if(object.type != 'submit')
            auxData = {
                ...auxData,
                [object.name] : object.type === 'select' ? object.options[0].value : ""
            }
        }
        setFormData(auxData)
    }

    const startMusic = () => {
        audioRef.current.play();
    } 


    const rellenarDatos = async () => {
        const q = query(collection(database, "formulary"),where(documentId(),'==',id));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
  
        let auxData = {}
        for(let field in doc.data().formData){
            let data = doc.data().formData
            console.log(field,data[field])
            auxData = {
                ...auxData,
                [field] : data[field]
            }
        }
        setFormData(auxData)
        });
        
    }

    React.useEffect(() => {
            fetch(process.env.PUBLIC_URL + '/db.json')
                .then(response => response.json())
                .then(data => {setArchivoJson(data);inicializarData(data)})
                .catch(error => {
                console.log(error.message,"chau")
                })

            if(readOnly && database){
                rellenarDatos()
            }
        }, [database]);


        const handleSubmit = async (event) => {
            event.preventDefault();
            event.stopPropagation();
            const form = event.currentTarget;
            if (form.checkValidity() === false) {
            setValidated(true);
            return;
            }
            try {
            const docRef = await addDoc(collection(database, "formulary"), {
            formData,
            });
            console.log(docRef.id);
            alert("Form enviado exitosamente");
            switchForm(docRef.id)
            } catch (error) {
            console.error(error);
            alert("Error al enviar el formulario, intente de nuevo más tarde");
            }
            

            };

        const handleChange = (event) => {
            let auxData = formData
            auxData[event.target.name] = event.target.value
            setFormData(auxData)
        }



  return (
    <Form noValidate validated = {validated} style={{padding:'16px'}} onSubmit={handleSubmit}>
                    {archivoJson?.items.map((e,index) => e.type === 'select' || e.type === 'checkbox' ? e.type === 'select' ? 
                    <Form.Group required={e.required} key={index} style={{padding:'24px'}}>
                        <Row>
                            <Col className={Style.gradient} ><Form.Label>{e.required ? ' * ' : ''}{e.label}</Form.Label></Col>
                            <Col md='9'>
                            <Form.Select disabled = {readOnly}  onChange={event => handleChange(event)} name={e.name} style={{backgroundColor:'#2d2f33',color:'#a1864a',fontWeight:700}} className={Style.selectForm}>
                               { e.options.map((country , key) => <option key={key} value={country.value}>{country.label}</option>)}
                            </Form.Select>
                            </Col>
                        </Row>
                    </Form.Group>
                    : 
                    <Form.Group  onChange={event => handleChange(event)} key={index} style={{display:'flex',justifyContent:'center'}} className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check style={readOnly? {display:'none'}: {} } name={e.name} required={e.required} type="checkbox" label={e.label} className={Style.gradient} />
                    </Form.Group>
                    : <div  key={index}>
                    <Form.Group className='mb-3'style={{padding:'24px'}} >
                        {e.type === 'submit' ? 
                        <Button style={readOnly? {display:'none'}: {} } type= 'submit' className={`${Style.submitButton} ${Style.gradient}`}>{e.label}</Button>
                        : <Row key={index}>
                        <Col className={Style.gradient} ><Form.Label>{e.required ? ' * ' : ''}{e.label}</Form.Label></Col>
                        <Col md='9'> <Form.Control defaultValue={formData[e.name]} readOnly={readOnly} onChange={event => handleChange(event)} name={e.name} required={e.required} type={e.type}  style={{backgroundColor:'#2d2f33',color:'#a1864a',fontWeight:700}} /></Col>
                        </Row>}
                        
                    </Form.Group>
                    </div> )}
    </Form>
  )
}
