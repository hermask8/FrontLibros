import React, {useEffect, useRef} from 'react';
import { Modal, Row, Col, Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
//import { SoloPalabras } from '../../../Layouts/Validaciones/Validacion';


const Fromulario = ({ onHide, show, sendForm, DataForm, Opcion}) =>{
    const firstInput = useRef(),
    { handleSubmit, register, errors } = useForm(),
        
    onSubmit = (data,e) => {
        sendForm(e);
        e.target.reset();//limpiar los campos
    };
   // useEffect(()=>{
     //   if(show){
       //     firstInput.current.focus();
       // }            
    //},[show])

    return (   
            
            <Modal  show={show} size="lg" onHide={onHide} >
                <Modal.Header closeButton  className="text-center">
                    <Modal.Title id="contained-modal-title-vcenter">
                    {!DataForm.id?"Crear":"Actualizar"} Registro
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id="FormularioCrear" onSubmit={handleSubmit(onSubmit)}>
                        <Row>
                            
                            <Col>
                                <Form.Group controlId="nombre">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control 
                                        name="nombre" 
                                        defaultValue={DataForm.nombre} 
                                        placeholder="Nombres" 
                                        readOnly={ Opcion === 1? true : false }
                                        //onKeyPress={(e) => SoloPalabras(e)}
                                        
                                    />
                                    <Form.Text className="text-danger">
                                        {/*errors.nombre && errors.nombre.message*/}
                                    </Form.Text>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="apellido">
                                    <Form.Label>Apellidos</Form.Label>
                                    <Form.Control 
                                        name="apellido" 
                                        defaultValue={DataForm.apellido} 
                                        placeholder="Apellidos" 
                                        readOnly={ Opcion === 1? true : false }
                                        //onKeyPress={(e) => SoloPalabras(e)}
                                        
                                    />
                                    <Form.Text className="text-danger">
                                        {/*errors.nombre && errors.nombre.message*/}
                                    </Form.Text>
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group controlId="genero">
                                    <Form.Label>Genero</Form.Label>
                                    <Form.Control 
                                        name="genero" 
                                        defaultValue={DataForm.genero} 
                                        placeholder="Genero" 
                                        readOnly={ Opcion === 1? true : false }
                                        //onKeyPress={(e) => SoloPalabras(e)}
                                        
                                    />
                                    <Form.Text className="text-danger">
                                        {/*errors.nombre && errors.nombre.message*/}
                                    </Form.Text>
                                </Form.Group>
                            </Col>
                           
                        </Row>
                        
                        <hr/>
                        <Row>
                            <Col>
                                <Form.Group >
                                    { Opcion === 2?<Button  variant={!DataForm.id?"success":"warning"} id="Guardar" className="float-right" type="submit" value={DataForm.id}>{!DataForm.id?"Crear":"Actualizar"}</Button>:"" }
                                    <Button variant="danger" className="float-right mr-2" onClick={onHide} >Salir</Button>
                                </Form.Group>                               
                            </Col>
                        </Row>                       
                    </Form>
                </Modal.Body>
            </Modal>
        )   
    }     

// Especificamos que solo acepte una funcion
Fromulario.propTypes = {
    sendForm: PropTypes.func.isRequired

};

export default Fromulario;