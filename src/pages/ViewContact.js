import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { ContactService } from '../services/ContactService';
import Spinner from '../components/spinner/Spinner';

function ViewContact() {
  let {contactId}=useParams();
  let [Viewcontact,setViewcontact]=useState({
    loading:false,
    contact:{},
    groups:{},
    errorMessage:" "
  })
  useEffect(() => {
    const fetchContact = async () => {
      try {
        setViewcontact({...Viewcontact,loading:true})
        let result = await ContactService.getSingleContact(contactId);
        let groupsCat= await  ContactService.getGroup(result.data);
        console.log(result.data);
        setViewcontact({
          ...ViewContact,
          contact:result.data,
          groups:groupsCat.data,
          loading:false
        }
       )
      } catch (err) {
        console.error("Error fetching contact:", err);
        
      }
    };
    fetchContact();
  }, [contactId]);
  let {loading,contact,errorMessage,groups}=Viewcontact;
  return (
    <div>
      <div className='shadow container mt-5'>
        {
            loading?<Spinner/>:<>
            {
              Object.keys(contact).length >0 && Object.keys(groups).length >0 &&
              <Container>
            <Row className='align-items-center  edit' >
             <Col lg={6} md={6} sm={6} className='text-center mt-3'>
                <img src={contact.photo} className="img-avatar" />
                 <div className='link mt-3'>
                    <Link to={"/"} style={{textDecoration:'none'}}>
                    <button class="button-51" role="button"><i class="fa-solid fa-arrow-left"></i>Back</button>
                    </Link>
                 </div>
             </Col>
             <Col lg={6} md={6} sm={6}>
             <ul className='list-group mt-3 mb-3 d-flex flex-wrap'>
                        <li className='list-group-item list-group-item-action'>
                          Name: <span className='fw-bold'>{contact.name}</span>
                        </li>
                        <li className='list-group-item list-group-item-action'>
                          Mobile: <span className='fw-bold'>{contact.mobile}</span>
                        </li>
                        <li className='list-group-item list-group-item-action'>
                          Email: <span className='fw-bold'>{contact.email}</span>
                        </li>
                        <li className='list-group-item list-group-item-action'>
                          Company: <span className='fw-bold'>{contact.company}</span>
                        </li>
                        <li className='list-group-item list-group-item-action'>
                          Title: <span className='fw-bold'>{contact.title}</span>
                        </li>
                        <li className='list-group-item list-group-item-action'>
                          Group: <span className='fw-bold'>{groups.name}</span>
                        </li>
              </ul>
             </Col>
             </Row>
        </Container>
            }
            </>
            
        }

        </div>
    </div>
  )
}

export default ViewContact
