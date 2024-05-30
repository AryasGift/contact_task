import React from 'react'
import { Container } from 'react-bootstrap'

function Footer() {
  return (
    <div className='footer w-100' style={{objectFit:'contain'}}>
      <div className=' d-flex justify-content-center'>
         <div className='icon1 mt-3' style={{backgroundColor:'white', borderRadius:"50%"}}><i className="fa-brands fa-facebook fa-2x p-2"></i></div>
         <div className='icon2 mt-3 ms-3' style={{backgroundColor:'white',borderRadius:"50%"}}><i class="fa-brands fa-instagram fa-2x p-2"></i></div>
         <div className='icon3 mt-3 ms-3' style={{backgroundColor:'white',borderRadius:"50%"}}><i class="fa-brands fa-twitter fa-2x p-2"></i></div>
         <div className='icon4 mt-3 ms-3' style={{backgroundColor:'white',borderRadius:"50%"}}><i class="fa-brands fa-google fa-2x p-2"></i></div>
         <div className='icon5 mt-3 ms-3' style={{backgroundColor:'white',borderRadius:"50%"}}><i class="fa-brands fa-youtube fa-2x p-2"></i></div>
       </div>
       <div className='d-flex justify-content-center mt-3' style={{gap:'30px'}}>
         <a href="" style={{textDecoration:'none' ,color:'aliceblue'}}>Home</a>
         <a href="" style={{textDecoration:'none',color:'aliceblue'}}>News</a>
         <a href="" style={{textDecoration:'none',color:'aliceblue'}}>About</a>
         <a href="" style={{textDecoration:'none',color:'aliceblue'}}>Contact Us</a>
         <a href=""style={{textDecoration:'none',color:'aliceblue'}}>Our Team</a>

       </div>
      
    </div>
  )
}

export default Footer
