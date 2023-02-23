import { RouteUrl}  from './GlobalRoute';


function validarStatusCode(response)
{
    
    if(response.status >= 400 ){
        window.alert("Error: "+response.status);
        localStorage.removeItem('user');
        window.location.href = '/login';        
        return false;
    }
    else
    {

    }
}
// **************************************************************************
// funcion que obtiene todos los registros
// **************************************************************************
export async function GetRecords(url){

    const response = await fetch(`${RouteUrl}/${url}`,
    {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
        },
    }
    ).catch(error => {
        window.alert("Lo sentimos, error de conexión con el servidor");
        //localStorage.removeItem('user');
        //window.location.href = '/login';

    });
   // validarStatusCode(response);
    const responseJson = await response.json();
    if(responseJson.response === undefined){
        return responseJson;
    }
    else{
        return responseJson.response;
    }
}


// **************************************************************************
// Funcion guardar registros
// **************************************************************************
export async function PostRecords(url,form){
    var formData= null; 
    formData = new FormData(form);
    //formData.append('id_usuario', JSON.parse(localStorage.getItem('user')).userid);    
     // Convierte el formulario en un elemento json serializandolo
    var data = JSON.stringify(Object.assign(...Array.from(formData.entries(), ([x,y]) => ({[x]:y}))),theReplacer, 2)
    // elviamos el formulario con fetch por el metodo post
    const response = await fetch(`${RouteUrl}/${url}`,
        {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                //'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
            },
            body: data
        }
    ).catch(error => {
        window.alert("Lo sentimos, error de conexión con el servidor");
        localStorage.removeItem('user');
        window.location.href = '/login';

    });
    validarStatusCode(response);
    const responseJson =  await response.json();
    return responseJson;
}


// **************************************************************************
// Funcion para login
// **************************************************************************
export async function postLogin(url,form){
    // Convierte el formulario en un elemento json serializandolo
   var data = JSON.stringify(Object.assign(...Array.from(new FormData(form).entries(), ([x,y]) => ({[x]:y}))),theReplacer, 2)
   // elviamos el formulario con fetch por el metodo post
   const response = await fetch(`${RouteUrl}/${url}`,
       {
           method: 'POST',
           mode: 'cors',
           headers: {
               'Access-Control-Allow-Origin': '*',
               'Accept': 'application/json',
               'Content-Type': 'application/json',
           },
           body: data
       }
   ).catch(error => {
    window.alert("Lo sentimos, error de conexión con el servidor");
    localStorage.removeItem('user');
    window.location.href = '/login';

});
   validarStatusCode(response);
   const responseJson =  await response.json();
   return responseJson;
}








// **************************************************************************
// funcion editar registros
// **************************************************************************

export async function PutRecords(url, form){
    var formData= null; 
    formData = new FormData(form);
    formData.append('id_usuario', JSON.parse(localStorage.getItem('user')).userid);    
     // Convierte el formulario en un elemento json serializandolo
    var data = JSON.stringify(Object.assign(...Array.from(formData.entries(), ([x,y]) => ({[x]:y}))),theReplacer, 2)
    // elviamos el formulario con fetch por el metodo post
    const response = await fetch(`${RouteUrl}/${url}`,
        {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
            },
            body: data
        }
    ).catch(error => {
        window.alert("Lo sentimos, error de conexión con el servidor");
        localStorage.removeItem('user');
        window.location.href = '/login';

    });
    validarStatusCode(response);
    const responseJson = await response.json();
    return responseJson;
}

// **************************************************************************
// Funcion obtener un registro
// **************************************************************************
export async function GetOneRecord(url){
    const response = await fetch(`${RouteUrl}/${url}`,{
            method:'GET',
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
            },
        }
    ).catch(error => {
        window.alert("Lo sentimos, error de conexión con el servidor");
        localStorage.removeItem('user');
        window.location.href = '/login';

    });
    validarStatusCode(response);
    const responseJson = await response.json();
    return responseJson;
}

// **************************************************************************
// Funcion dar de baja un registro
// **************************************************************************
export async function DeleteRecord(url){
    const response = await fetch(`${RouteUrl}/${url}`,{
            method:'GET',
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
            },
        }
    );
    validarStatusCode(response);
    const responseJson = await response.json();
    return responseJson;
}

export async function CambioCon(url){
    const response = await fetch(`${RouteUrl}/${url}`,
        {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
            }
        }
    ).catch(error => {
        window.alert("Lo sentimos, error de conexión con el servidor");
        localStorage.removeItem('user');
        window.location.href = '/login';

    });
    validarStatusCode(response);
    const responseJson = await response.json();
    return responseJson;
}

// **************************************************************************
// Funcion extraer imagenes boletin
// **************************************************************************
export async function ExtractImagesRoute(url){
    const response = await fetch(`${RouteUrl}/${url}`,{
            method:'GET',
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
        }        
    )
    const responseJson = await response.json();
    return responseJson;
}

export async function download(url, filename) {
    const response = await fetch(`${RouteUrl}/${url}`,{
        method:'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
        }
    }).then(function(t) {
        return t.blob().then((b)=>{
            var a = document.createElement("a");
            a.href = URL.createObjectURL(b);
            a.setAttribute("download", filename);
            a.click();
        }
        );
    }).catch(error => {
        window.alert("Lo sentimos, error de conexión con el servidor");
        localStorage.removeItem('user');
        window.location.href = '/login';

    });
    
    const responseJson = await response;
    return responseJson;
    }

// **************************************************************************
// remplazamos las comillas a los campos que sean numericos
// **************************************************************************

function theReplacer(key, value) {
    return key === "id" || key === "creado_por" ? +value : value;
}


// **************************************************************************
// exportamos las funciones creadas
// **************************************************************************
export default {
    CambioCon,
    GetRecords,
    postLogin,
    PostRecords,
    PutRecords,
    GetOneRecord,
    DeleteRecord
}