import React from 'react';
import Banner from '../Banner/Banner';
import '../styles.css';
import { useHistory } from 'react-router-dom';

const Login = () => {
    const history = useHistory();

    const onClickSignUpBtn = () => {
        history.push('/sign-up')
    }

    return (
        <>
            <div className = 'container-fluid'>
                <div className = 'row'>
                    <div className = 'col-lg-7 px-0'>
                        <Banner />
                    </div>
                    <div className = 'col-lg-5 px-0'>
                        <div className = 'login-container container d-flex justify-content-center'>
                           
                            <div className = 'row align-content-between align-items-center'>
                                <div className = 'col-lg-6'>
                                    {/* insert your company logo */}
                                    [Company Logo]
                                </div>
                                <div className = 'col-lg-6 d-flex justify-content-end'>
                                    <button className = 'btn custom-btn secondary' onClick = {onClickSignUpBtn}>Don't have an account?</button>
                                </div>
                                <div className = 'col-lg-12'>
                                    <h1 className = 'custom-text primary bold mb-4'>Login.</h1>
                                    <form>
                                        <div className="form-group">
                                            <label >Email address</label>
                                            <input type="email" className="form-control" placeholder = 'Email Address'/>
                                        </div>
                                        <div className="form-group">
                                            <label>Password</label>
                                            <input type="password" className="form-control" placeholder = 'Password' />
                                        </div>
                                        <div className = 'form-row'>
                                            <div className="form-group col-lg-6">
                                                <div className = 'form-check'>
                                                    <input type="checkbox" className="form-check-input" />
                                                    <label className="form-check-label" >Remember me</label>
                                                </div>
                                            </div>
                                            <div className = 'form-group col-lg-6 d-flex justify-content-end'>
                                                <a href = '/' className = 'custom-text primary semi-bold'>Forgot Password?</a>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-block custom-btn primary">Login</button>
                                    </form>
                                    
                                </div>
                                <div className = 'col-lg-12'>
                                    <p className ='d-flex justify-content-center custom-text secondary'>
                                        {/* insert your company name */}
                                        © [Your Company]. 2020. All rights reserved.
                                    </p>
                                </div>
                            </div>
                           
                        </div>
                    </div>
                    
                </div>
            </div>
        </>
    );
}

export default Login;