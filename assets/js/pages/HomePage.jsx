import React from 'react'

const HomePage = (props) => {
    return ( 
        <>
            <div className='jumbotron'>
                <h1 className='display-3'>Hello world</h1>
                <p className='lead'>This is simple hero unit , simple jumbotron style</p>
                <hr className='my-4 '/>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
                </p>
                <p className='lead'>
                    <a className='btn btn-primary btn-lg' href='#' role='button'>Learn more</a>
                </p>
            </div>
        </>
     );
}
 
export default HomePage;