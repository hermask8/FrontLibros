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
                                <Form.Group controlId="nombre1">
                                    <Form.Label>Primer Nombre</Form.Label>
                                    <Form.Control 
                                        name="nombre1" 
                                        defaultValue={DataForm.nombre1} 
                                        placeholder="Primer Nombre" 
                                        readOnly={ Opcion === 1? true : false }
                                        //onKeyPress={(e) => SoloPalabras(e)}
                                        
                                    />
                                    <Form.Text className="text-danger">
                                        {/*errors.nombre && errors.nombre.message*/}
                                    </Form.Text>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="nombre2">
                                    <Form.Label>Segundo Nombre</Form.Label>
                                    <Form.Control 
                                        name="nombre2" 
                                        defaultValue={DataForm.nombre1} 
                                        placeholder="Segundo Nombre" 
                                        readOnly={ Opcion === 1? true : false }
                                        //onKeyPress={(e) => SoloPalabras(e)}
                                        
                                    />
                                    <Form.Text className="text-danger">
                                        {/*errors.nombre && errors.nombre.message*/}
                                    </Form.Text>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="nombre3">
                                    <Form.Label>Tercer Nombre</Form.Label>
                                    <Form.Control 
                                        name="nombre3" 
                                        defaultValue={DataForm.nombre1} 
                                        placeholder="Tercer Nombre" 
                                        readOnly={ Opcion === 1? true : false }
                                        //onKeyPress={(e) => SoloPalabras(e)}
                                        
                                    />
                                    <Form.Text className="text-danger">
                                        {/*errors.nombre && errors.nombre.message*/}
                                    </Form.Text>
                                </Form.Group>
                            </Col>

                            
                           
                        </Row>
                        <Row>
                        <Col>
                                <Form.Group controlId="apellido1">
                                    <Form.Label>Primer Apellido</Form.Label>
                                    <Form.Control 
                                        name="apellido1" 
                                        defaultValue={DataForm.nombre1} 
                                        placeholder="Primer Apellido" 
                                        readOnly={ Opcion === 1? true : false }
                                        //onKeyPress={(e) => SoloPalabras(e)}
                                        
                                    />
                                    <Form.Text className="text-danger">
                                        {/*errors.nombre && errors.nombre.message*/}
                                    </Form.Text>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="apellido2">
                                    <Form.Label>Segundo Apellido</Form.Label>
                                    <Form.Control 
                                        name="apellido2" 
                                        defaultValue={DataForm.nombre1} 
                                        placeholder="Segundo Apellido" 
                                        readOnly={ Opcion === 1? true : false }
                                        //onKeyPress={(e) => SoloPalabras(e)}
                                        
                                    />
                                    <Form.Text className="text-danger">
                                        {/*errors.nombre && errors.nombre.message*/}
                                    </Form.Text>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="dpi">
                                    <Form.Label>DPI</Form.Label>
                                    <Form.Control 
                                        name="dpi" 
                                        defaultValue={DataForm.nombre1} 
                                        placeholder="DPI" 
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