import React,{ useState} from 'react';
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { emailrgx, pwrgx } from '../constant' 



const schema = yup
  .object({

    email:yup
      .string()
      .matches(emailrgx, 'Email is required') //error msg
      .required('Email is required')
      .trim(),
    password:yup 
    .string()
    .matches(pwrgx, 'password is required')
    .required('password is required')
    .trim(),
  })

  const Loginpage = () => { 

    const[eye,seteye]=useState(true);
    const [inputValues,setInputValues] = useState({
      email:" ",
      password:" ",
      })

      const {
        handleSubmit,
        control,
        formState: { errors },
        } = useForm({
        resolver: yupResolver(schema),
        })
        
      const  onSubmit = () => {
        console.log("data")
      }

      const onEyeClick = () =>{
        seteye(!eye)
        }
        return (
          <>
          <Helmet>
            <title>
              Login - qBotica
            </title>
            <meta name ="description"
            content="Login page"/>
          </Helmet>
           {/* Account Logo */}
          <div className="container">
          <div className="account-logo">
          <Link> 
          <img src='../Assets/img/qBotica-logo-2.png' alt="qBotica Logo"/>
          </Link>  
          </div> 
          {/* Account title */}
          <div className="account-box">
            <div className="account-wrapper">
              <h3 className="account-title">
                Login
              </h3>
            </div>
            {/* Account Form */}
            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label>Email ID</label>
                <Controller
                name = "email"
                control = {control}
                render = {({field : {value,onChange}}) =>
                (<input className={
                  `form-control ${errors?.email?"error-input":""}`}
                  type="text" value={value}
                  onChange={onChange}
                  autoComplete="false"/>
                 )}
                 />
                 <small>{errors?.email?.message}</small>
                </div>
                  <div className='form-group'>
                    <div className='row'>
                      <div className="col">
                        <lable>Password</lable>
                      </div>
                      <div className="col-auto">
                        <Link className='text-muted'>
                        Forgot Password?</Link>
                      </div>     
                    </div>
                    <Controller
                      name = "password"
                      control = {control}
                      render = {({field : {value,onChange}}) => (
                        <div className="pass-group">
                          <input type={eye ? "password" : "text"} className={
                            `form-control ${errors?.password?"error-input":""}`}
                      value={value}
                      onChange={onChange}
                      autoComplete="false"/>
                        <span onClick={onEyeClick} className={`fa toggle-password" ${eye ? "fa-eye-slash" : "fa-eye" }`}/>
                        </div>
                 )}
                 />
                <small>{errors?.password?.message}</small> 
                  </div>
                  <div className="form-group text-center">
                    <button className="btn btn-primary account-btn" type='submit'> Login
                    </button>
                  </div>
          
                  </form>
                  <div className="account-footer">
                    <p>Don't have an account yet?</p>
                </div>
              </div>
            </div>

          </div>


          </>
        );
   }

export default Loginpage;