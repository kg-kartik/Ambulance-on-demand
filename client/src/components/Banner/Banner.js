import React from 'react'

const Banner = () => {
    return (
        <div className = 'image-container d-flex justify-content-center align-items-center'>
            <div className = 'container'>
                <div className = 'row'>
                    <div className = 'col-lg-12  mx-auto'>
                        {/* insert your company name */}
                        <h2 className = 'banner-title'>Welcome to [Company's Name]</h2>

                        {/* insert what your company do / about below */}
                        <p className = 'banner-desc'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut volutpat mi sodales, vestibulum nisi id, tincidunt ante. Proin iaculis laoreet nulla, at consequat erat tincidunt sit amet</p>
                    </div>
                    <div className = 'col-lg-12 d-flex justify-content-center'>
                        <img 
                        src = {require('../../assets/images/Prevent epidemic rebound-cuate.svg')} 
                        alt = 'prevent-epidemic'
                        width = '70%'
                        height = '100%'/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Banner;