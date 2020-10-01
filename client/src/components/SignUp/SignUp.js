import React from 'react';
import { useHistory } from 'react-router-dom';
import Banner from '../Banner/Banner';
import '../styles.css';

const SignUp = () => {
    const history = useHistory();

    const onClickLoginBtn = () => {
        history.push('/login')
    }
    return (
        <>
            <div className = 'container-fluid'>
                <div className = 'row'>
                    <div className = 'col-lg-7 px-0'>
                        <Banner />
                    </div>
                    <div className = 'col-lg-5 px-0'>
                        <div className = 'sign-up-container container d-flex justify-content-center'>
                           
                            <div className = 'row align-content-between align-items-center'>
                                <div className = 'col-lg-6'>
                                    {/* insert your company logo */}
                                    [Company Logo]
                                </div>
                                <div className = 'col-lg-6 d-flex justify-content-end'>
                                    <button className = 'btn custom-btn secondary' onClick = {onClickLoginBtn}>
                                        Already have an account?
                                    </button>
                                </div>
                                <div className = 'col-lg-12'>
                                    <h1 className = 'custom-text primary bold mb-2'>Sign Up.</h1>
                                    <form>
                                        <div className = 'form-group'>
                                            <label>Full Name</label>
                                            <input type="text" class="form-control" placeholder = 'Full Name'/>
                                        </div>
                                        <div className = 'form-group'>
                                            <label>Email Address</label>
                                            <input type="text" class="form-control" placeholder = 'Email Address'/>
                                        </div>
                                        <div className = 'form-group'>
                                            <label>Phone Number</label>
                                            <input type="phone" class="form-control" placeholder = 'Phone Number'/>
                                        </div>
                                        <div className = 'form-row'>
                                            <div className = 'form-group col-lg-6'>
                                                <label>Password</label>
                                                <input type="password" class="form-control" placeholder = 'Password'/>
                                            </div>
                                            <div className = 'form-group col-lg-6'>
                                                <label>Confirm Password</label>
                                                <input type="password" class="form-control" placeholder = 'Confirm Password'/>
                                            </div>
                                        </div>
                                        <div className = 'form-group form-check'>
                                            <input type="checkbox" className="form-check-input" />
                                            <label className="form-check-label" >Agree to the <a href = '/' className = 'custom-text primary'>Terms of Use</a> and <a href= '/' className = 'custom-text primary'>Privacy Policy</a></label>
                                        </div>
                                        <button type="submit" className="btn btn-block custom-btn primary">Sign Up</button>
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

export default SignUp;