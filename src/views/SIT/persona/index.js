import React, {Component} from 'react';
import {  Col, Button } from 'react-bootstrap';
import Formulario from "./Form";
import Listar from "./List";
import Header from "../../../components/Headers/Header";
import {
    Badge,
    Card,
    CardHeader,
    CardFooter,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Media,
    Pagination,
    PaginationItem,
    PaginationLink,
    Progress,
    Table,
    Container,
    Row,
    UncontrolledTooltip,
  } from "reactstrap";
//import Confirm from "../../../Layouts/BootBoxConfirm/";
//import SnackBar from "../../../Layouts/Toast/";
//import {GetRoute, DeleteRoute, PostRoute, PutRoute,CambioCon} from "../../../Services/RouteBase";
import {GetRecords, PostRecords} from "../../../Services/BaseRoute"
class Index extends Component {

    constructor(props) {
        super(props);
        // declaramos nuestras variables
        this.state = {
            ModalToggle : false,
            block: true,
            toogleToast : false,
            toogleToastmsg : "",
            DataForm: {
                id: null,
                nombre: null,
                apellido: null,
                genero: null
            },
            contador: 0,
            Opcion: null,
            DataList: [],
            // AlertBox
            showBox: false,
            idDetalle: null,
            estado2:null,
            ConfirmBnt : false,
            setShowAlert : false,
            Options: null
        }

    }

    // *************************************************************
    // funciones extras
    // *************************************************************
    // Monstart Alerta de confirmacion
    showAlertBoxDesactivar = (id, estado,Op) =>
    {
        //console.log(Op)
        
        this.setState
        (
            {
                showBox : true,
                idDetalle: id,
                estado2:estado,
                Options: Op
            }
        )
    }

    // Boton de Confirmar
    handleConfirm = () => 
    {   
        //Se confirma si la opcion es 1 es para activar o desactivar el registro, si es 2 se reinicia la contraseña.
        //console.log(this.state.idDetalle)
        this.state.Options === 1 ? this.Eliminar(this.state.idDetalle): this.Reiniciar(this.state.idDetalle) 
         return false;
    }
    
    // Boton de salir o Cancelar
    handleCancel = () => {
        return false;
    }

    ToggleModal = (e) =>
    {
        this.setState(
            {
                DataForm:
                {
                    id: null,
                    nombre: null,
                    apellido: null,
                    genero: null
                },
                Opcion: 2,
                block:!this.state.block,
                ModalToggle : !this.state.ModalToggle
            }
        );
    }

    AbrirSnack = () => {
        this.setState
        (
            {
                toogleToast: !this.state.toogleToast
            }
        );
    }
    //   ************************************************************
    // se invoca inmediatamente después de que un componente se monte
    //   ************************************************************
    async componentDidMount(){
        this.setState
        (
            {
                DataList : await this.GetAll(),
                //DataList2 : await this.GetAllUni(),
                //DataList3 : await this.GetAllRen(),
                //DataListRol: await this.GetAllRol()
            }
        )
    }

    async componentDidUpdate(prevProps, prevState){

        if(this.state.showBox)
        {
            this.setState
            (
                {
                    showBox: false,
                }
            )
        }
        
        if(prevState.contador !== this.state.contador)
        {
            this.setState
            (
                {
                    DataList : await this.GetAll(),
                   // DataList2 : await this.GetAllUni(),
                    //DataList3 : await this.GetAllRen(),
                    //DataListRol: await this.GetAllRol(),
                    //contador : 0,
                    showBox : false,
                    Options: null
                }
            )
        }
    }

   // CRUD
    // *************************************************************
    // funcion que obtiene todos los registros de solicitudes
    // *************************************************************
    GetAll = () => {
        return GetRecords(`User/all` );
    }
    
   
    //GetAllRen= () => {return GetRoute(`Institucion/all`)}
    // *************************************************************
    // Funcion que guarda el registro
    // *************************************************************
    SendForm =(ev) =>{
        ev.preventDefault();
        
        const id = (document.getElementById('Guardar').value) && document.getElementById('Guardar').value;
        // Comparamos la opcion
        if(id){
            if(this.state.Opcion === 2 || this.state.Opcion === 3 ){
                this.Edit(id, ev.target);
            }
            else if(this.state.Opcion === 4){
                this.Edit2(id, ev.target);
            }
            else if(this.state.Opcion === 5){
                this.EditRol(id, ev.target);
            }
            else if(this.state.Opcion === 6){
                this.EditRen(id, ev.target);
            }
            this.setState
            (
                {
                    toogleToast:true, 
                    toogleToastmsg: 'Registro Modificado Exitosamente',
                    contador: 1
                }
            )    
        }
        else{
            this.Create(ev.target);
        
            this.setState
            (
                {
                    toogleToast:true, 
                    toogleToastmsg: 'Registro Creado Exitosamente',
                    contador: 1
                }
            )    
        }
        this.setState
            (
                {
                    id: null,
                    nombre: null,
                    apellido: null,
                    genero: null,
                    block:!this.state.block,
                    ModalToggle : !this.state.ModalToggle, 
                }
            );    
    }
    // *************************************************************
    // funcion que obtiene un registro
    // *************************************************************
    Consultar = (resp, opcion) => {
        this.setState
        (
            {
                DataForm: resp,
                Opcion: opcion,
                ModalToggle : !this.state.ModalToggle
            }            
        );  
    }
    
    // *************************************************************
    // enviamos los datos para crear
    // *************************************************************
    
    async Create(form) {
        return await PostRecords(`User/insert_person`, form);

    }
    
    // *************************************************************
    // enviamos los datos para actualizar
    // *************************************************************
    
    

    // *************************************************************
    // enviamos los datos para añadir un nuevo rol
    // *************************************************************
    
   // async createRol(id, form) {
    //    return await PutRoute(`Usuario/storeRol/${id}`, form);
   // }
    
    // *************************************************************
    //funcion eliminar registro
    // *************************************************************
    Eliminar = (id) =>
    {

        //DeleteRoute(`Persona/destroyPersona/${id}`);
        this.setState
        (
            {   
                toogleToast:true, 
                toogleToastmsg:'Registro Desactivado Exitosamente',
                contador: 1
            }
        );
    }



    // *************************************************************
    //funcion para eliminar contraseña
    // *************************************************************
    
    Reiniciar = (id) =>
    {
        
       // CambioCon(`Usuario/Usuario/${id}`);
        this.setState
        (
            {   
                toogleToast:true, 
                toogleToastmsg:'El reset fue hecho exitosamente',
                contador: 1
            }
        );
    }

    // renderizamos 
    // *************************************************************
    render(){
        return(
            <>
            <Header />
                <Container className="mt--7" fluid>
                    <Row >
                    <div className="col">
                    <Card className="shadow">
                    <CardHeader className="border-0">
                        <h3 className="mb-0">Personas</h3>
                     </CardHeader>
                     
                        <Col className="text-center">
                            <h1 className="font-weight-bold">Personas</h1>
                        </Col>
                        
                        <Col>
                            <Button variant='primary' onClick={this.ToggleModal} >Crear  </Button>
                            {/* mandamos a llamar al formulario */}
                            <Formulario show={this.state.ModalToggle} onHide={this.ToggleModal} sendForm={this.SendForm} DataForm={this.state.DataForm} Opcion={this.state.Opcion}   />
                        </Col>
                        
                        <Listar Datas={this.state.DataList} See={this.Consultar} Destroy={this.showAlertBoxDesactivar}/>
                        
                    
                        
                        </Card>
                </div>
                    </Row>
                    
                    
                    
                    
                    {/* <Confirm 
                            showDesactivar={this.state.showBox} 
                            Confirm={this.handleConfirm} 
                            Cancel={this.handleCancel} 
                            Close={this.handleCancel} 
                        />*/}
                   
                    
                   {/*<SnackBar ToogleToast={this.state.toogleToast} ToastHide={this.AbrirSnack} msj={this.state.toogleToastmsg}/> */} 
                 
                </Container>
           </>
        )
    }

}

export default Index;