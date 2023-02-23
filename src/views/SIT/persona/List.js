import React from 'react'; 
import { DropdownButton, Dropdown, Alert, Col} from 'react-bootstrap';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import PropTypes from 'prop-types';


const Listar = ({Datas, See, Destroy}) =>
  { 
    // declaramos para realizar la busqueda
    const { SearchBar } = Search,
    // personalizar completamente el componente de paginación 
    customTotal = (from, to, size) => (
      <span className="react-bootstrap-table-pagination-total">
        Mostrando { from } a { to } de { size } resultados
      </span>
    ),
    // Opciones de paginacion
     options = 
        {
          hideSizePerPage: true, // Ocultar el menú desplegable sizePerPage siempre
          showTotal: true, //indica el rango de filas de la página actual. 
          paginationTotalRenderer: customTotal //llamamos a la funcion que personaliza componente
        },
    // Encabezado y configuracion de cada columna de la tabla
    // indicamos las columnas que tendra nuestra tabla
      columns = [  
        {
          dataField: 'nombreCompleto', // el nombre del campo que declaramos al momento de hacer nuestra consulta en la BD
          text: 'Nombre', //el texto que queremos visualizar
          sort: true, // Ordenamiento de valores ASC o DESC
          headerAlign: 'center', // aliniamos el encabezado de la columna (center, left, right)
          align: 'center', //Aliniamos los valores de la columna
        },        
        {
          dataField: 'fecha_nacimiento', // el nombre del campo que declaramos al momento de hacer nuestra consulta en la BD
          text: 'Fecha Nacimiento', //el texto que queremos visualizar
          sort: true, // Ordenamiento de valores ASC o DESC
          headerAlign: 'center', // aliniamos el encabezado de la columna (center, left, right)
          align: 'center', //Aliniamos los valores de la columna
        },
        {
          dataField: 'genero', // el nombre del campo que declaramos al momento de hacer nuestra consulta en la BD
          text: 'Genero', //el texto que queremos visualizar
          sort: true, // Ordenamiento de valores ASC o DESC
          headerAlign: 'center', // aliniamos el encabezado de la columna (center, left, right)
          align: 'center', //Aliniamos los valores de la columna
        },
        {
          dataField: 'estado', // el nombre del campo que declaramos al momento de hacer nuestra consulta en la BD
          text: 'Estado', //el texto que queremos visualizar
          sort: true, // Ordenamiento de valores ASC o DESC
          headerAlign: 'center', // aliniamos el encabezado de la columna (center, left, right)
          searchable: false, // establece si deseamos que al momento de buscar tome en cuenta esta columna
          align: 'center', //Aliniamos los valores de la columna
          // establecemos el formato que deseamos retornar puede ser cualquier elemento hxml
          formatter: (cellContent, row) => (
            <div  style={{ "backgroundColor" : "#7FFFD4", "borderRadius": "10px"}} >
                {row.estado === 1?"Activo":row.estado===2?"Inactivo":row.estado===0?"Nuevo":"ERROR"}
            </div>
                
         )
        },
        {
          dataField: 'id',
          text: 'Acciones',
          headerAlign: 'center',
          align: 'center',
          searchable: false,
          formatter: (cellContent, row) => (
            <DropdownButton size="sm" title="Acciones">
              <Dropdown.Item as="button" onClick={()=> See(row,1)} className="dropdown-item"><i className="fas fa-eye fa-sm fa-fw mr-2 text-gray-1000"></i><span>Ver</span></Dropdown.Item>
              {row.estado ===1?<Dropdown.Item as="button" onClick={()=> See(row,3)} className="dropdown-item"><i className="fas fa-edit fa-sm fa-fw mr-2 text-gray-1000"></i><span>Editar</span></Dropdown.Item>:""}
              {/*row.estado ===1?<Dropdown.Item as="button" onClick={()=> See(row,5)} className="dropdown-item"><i className="fas fa-edit fa-sm fa-fw mr-2 text-gray-1000"></i><span>Editar Rol Usuario</span></Dropdown.Item>:""
              <Dropdown.Item as="button" onClick={()=> Destroy(row.usuario,row.estado,2)} className="dropdown-item"><i className="fa fa-ban fa-sm fa-fw mr-2 text-gray-1000"></i><span>Reset Contraseña</span></Dropdown.Item>
              <Dropdown.Item as="button" onClick={()=> Destroy(row.id,row.estado,1)} className="dropdown-item"><i className={`fa ${row.estado ===1? 'fa-ban': 'fa-check'} fa-sm fa-fw mr-2 text-gray-1000`}></i><span>{row.estado ===1?"Desactivar":"Activar" }</span></Dropdown.Item>*/}
              
              {/* <Dropdown.Item as="button" className="dropdown-item"><i className="fas fa-trash fa-sm fa-fw mr-2 text-gray-1000"></i><span>Eliminar</span></Dropdown.Item> */}
            </DropdownButton>
          )
        }
      ]
    return(
    <div style={{"width":"100%"}} className="pt-1">
      {/* establecemos el kit de herramientas de tabla definiendo los data que proviene de la base de datos y las columnas establecidas anteriormente*/}
      <ToolkitProvider
        keyField="id"
        data={ Datas }
        columns={ columns }
        search
      >
          {
            props => (
              <div>
                {/* establecemos el input que realizara la busqueda */}
                <Col lg={4} className="float-right">
                  <SearchBar { ...props.searchProps } placeholder="Buscar"/>
                </Col>
                {/* establecemos nuestra tabla y la personalizamos*/}  
                <BootstrapTable
                  { ...props.baseProps } // obtenemos todos los prop como la data y columns
                    bootstrap4 //utilizar los estilos de bootstrap4
                    hover //activa una fila al pasar el mouse dentro de la tabla
                    noDataIndication="Sin Datos" // establece un mensaje si no encuentra ningun valor 
                    headerWrapperClasses="thead-light" //establece el tema del header de la tabla
                    condensed //reduce la altura de cada fila dentro de la tabla 
                    pagination={ paginationFactory(options) } //Habilitamos una paginación en la tabla:
                />
              </div>
            )
          }
        </ToolkitProvider>
      </div>
       
    )
  }

  
  // Especificamos que solo acepte una funcion
  Listar.propTypes = {
    See: PropTypes.func.isRequired,
    Destroy: PropTypes.func.isRequired

};
export default Listar;