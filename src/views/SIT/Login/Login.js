import React, {Component} from 'react';
import { Image } from 'react-bootstrap';
import Zoom from 'react-reveal/Zoom';
import './index.css';
import Img from '../../../assets/img/brand/logo.png';
import Img2 from '../../../assets/img/brand/logo.png';
import Img3 from '../../../assets/img/brand/logo.png';
import Img4 from '../../../assets/img/brand/logo.png';
import Img5 from '../../../assets/img/brand/logo.png';
import logo from '../../../assets/img/brand/logo.png';
import mini from '../../../assets/img/brand/ministerio.png';
// import Bsvg from '../Storage/img/Login/background.svg';
import { userService } from '../../../Services/user.service';
//import Formulario from "./Form";
class Login extends Component {
  constructor(props) {
    super(props);

   // if("user2" in localStorage){
     // localStorage.removeItem('user2');
      //}
    userService.logout();

    this.state = {
        username: '',
        password: '',
        submitted: false,
        loading: false,
        errorLogin: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}

handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
}







handleSubmit(e) {
    
    e.preventDefault();

    this.setState({ submitted: true });
    const { username, password } = this.state;
    //if("user2" in localStorage){
     // localStorage.removeItem('user2');
     // }
    // stop here if form is invalid
    //if (!(username && password)) {
     //   return;
   // }

    this.setState({ loading: true });
    userService.login(username, password)
        .then(
            user => {
               // const { from } = this.props.location.state || { from: { pathname: "/" } };
               // this.props.history.push(from);
            },
            error => 
            {
              if(String(error) === 'TypeError: Failed to fetch' || String(error) === 'TypeError: NetworkError when attempting to fetch resource.'){
                  this.setState({ errorLogin: 'El navegador no pudo establecer una conexi??n al servidor', loading: false })
              }
              else{
                  
                  this.setState({ errorLogin: error, loading: false });
              }                    
          }
        );
  
}
  render()
  
  {
    const { username, password, submitted, loading, errorLogin } = this.state;
    return(
    <header>
     <div className="container h-100" >
          <div className="row h-100 align-items-center">
            <div className="col-12">
               <div id="containerSec">
                  <div className="row"> 
                  <Zoom left cascade>
                    <Image src={mini} className="Minis" style={{ position:'absolute', left: '15px', bottom: '10px', width:"190px", height: '50px', zIndex:100 }}/>
                  </Zoom>
                    <div className="col-md-7 banner-sec">
                      <div className="frame">
                        <img className="img_sl active" src={Img} alt="img"/>
                        <img className="img_sl" src={Img2} alt="img"/>
                        <img className="img_sl" src={Img3} alt="img"/>
                        <img className="img_sl" src={Img4} alt="img"/>
                        <img className="img_sl" src={Img5} alt="img"/>
                      </div>
                      
                      <div className="overlay"></div>
                    </div>
                    {/* // login */}

                    
                    <div className="col-lg-5 col-md-12 col-xs-12 contenedor-login" >
                      
                      <div className="form">
                      <Zoom top cascade>
                        {/* <div className="logo">
                        <img className="LogoImg" src={logo} alt="img"/>
                      </div>*/}
                      
                      <div className="header">
                        <h2 className="Titulo"><Zoom top cascade>SIT</Zoom></h2>
                      </div>
                      <form className="FormInput" name="form" onSubmit={this.handleSubmit}>
                        <div className="input-wrapper">
                        <div className={`form-group ${submitted && !username && !errorLogin && "mb-5"}`}>
                        <div className="input-field">
                            <i className="text-info fa fa-user"></i>
                            <input type="text" placeholder="Usuario" className={"form-control"+(submitted && !username && errorLogin ? ' is-invalid' : '')} name="username" value={username} onChange={this.handleChange} style={{background: '#FFF'}}/>
                            {submitted && !username && !errorLogin &&
                              <div className="alert alert-danger alert-sm w-100 text-center">Se requiere nombre de usuario</div>
                            }
                          </div>
                        </div>
                        <div className={`form-group ${submitted && !password && username && !errorLogin &&  "mb-5"}`}>
                          <div className="input-field">
                              <i className="text-warning fa fa-key"></i>
                              <input type="password" placeholder="Contrase??a" className={"form-control"+(submitted && !username && errorLogin ? ' is-invalid' : '')} name="password" value={password} onChange={this.handleChange} style={{background: '#FFF'}} autoComplete="off"/>
                              {submitted && !password && !errorLogin &&
                                <div className="alert alert-danger alert-sm w-100 text-center">se requiere contrase??a</div>
                              }
                             
                            </div>
                        </div>
                        {errorLogin &&
                          <p>
                            <div className={'text-center text-danger font-w'}><strong>{errorLogin}</strong></div>
                          </p>
                          
                        }
                        
                        </div>
                        <div className="login">
                          <div className="form-group">
                            <button className="btn btn-lg btn-primary btn-block btn-login color-button" type="submit" disabled={loading}  >
                              <div className="txt">Iniciar Sesi??n</div>
                            </button>
                          </div>
                        </div>
                        <div className="social text-center">
                          <div className="form-group">
                            <a href="/Contrasena" className="card-link float-left">Olvidaste tu contrase??a?</a>
                           
                          </div>
                        </div>
                        <div className="pt-1 text-center txt3 text-dark-light">
                          <small><i className="fa fa-copyright"> </i> Todos los derechos reservados SIT</small>
                        </div>
                      </form>
                      </Zoom>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </header>
    );
  }
}

export default Login;