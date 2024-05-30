import React, { useEffect, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link, useNavigate } from 'react-router-dom';
import { ContactService } from '../services/ContactService';

function AddContact() {
    let navigate=useNavigate()
    let [details,setDetails]=useState({
        loading:false,
        contact:{
            name:"",
            photo:"",
            mobile:"",
            email:"",
            company:"",
            title:"",
            group:""
        },
        groupsCat:[],
        errorMessage:" "
    })
    let InputUp=(e)=>{
        setDetails({
            ...details,
            contact:{
                ...details.contact,
                [e.target.name]:e.target.value
            }
        })
    }
    useEffect(()=>{
      const fetchData=async()=>{
        try{
            setDetails((prevDetails) => ({
                ...prevDetails,
                loading: true
            }));
            let result=await ContactService.getGroupName();
            setDetails((prevDetails)=>({
                 ...prevDetails,
                 loading:false,
                 groupsCat:result.data
            }))
        }
        catch{

        }
        
      }
      fetchData()
    },[])
    let SubmitForm = async (e) => {
        e.preventDefault();
        try {
            console.log("Submitting form with contact details:", details.contact);
            let result = await ContactService.createContact(details.contact);
            if (result) {
                navigate('/', { replace: true })
            }
        } catch (err) {
            console.error("Error creating contact:", err);
            setDetails((prevDetails) => ({
                ...prevDetails,
                errorMessage: "Error creating contact"
            }))
        }
    }
    let{loading,contact,groupsCat,errorMessage}=details
    return (
        <div>
            <div className='section1'>
                <Container>
                    <div className='form_element shadow mt-4'>
                        <Row>
                            <Col lg={6} md={6} sm={6}>
                                <img src="https://i.postimg.cc/pTxB8SJF/woman-making-video-call.avif" className='img-fluid h-100' />
                            </Col>
                            <Col lg={6} md={6} sm={6} xs={12} className="mx-auto">
      <h3 className='mt-3 text-center'>CREATE CONTACT</h3>
      <Form onSubmit={SubmitForm}>
        <Form.Group className="mb-3 mt-3">
          <Form.Control 
            type="text" 
            name="name" 
            value={contact.name} 
            onChange={InputUp} 
            placeholder="Username" 
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control 
            type="text" 
            name="photo" 
            value={contact.photo} 
            onChange={InputUp} 
            placeholder="Photo URL" 
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control 
            type="text" 
            name="mobile" 
            value={contact.mobile} 
            onChange={InputUp} 
            placeholder="Mobile" 
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control 
            type="email" 
            name="email" 
            value={contact.email} 
            onChange={InputUp} 
            placeholder="Email" 
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control 
            type="text" 
            name="company" 
            value={contact.company} 
            onChange={InputUp} 
            placeholder="Company" 
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control 
            type="text" 
            name="title" 
            value={contact.title} 
            onChange={InputUp} 
            placeholder="Title" 
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Select 
            name="group" 
            value={contact.group} 
            onChange={InputUp}
          >
            <option value="">Select a Group</option>
            {groupsCat.length > 0 && 
              groupsCat.map(i => (
                <option key={i.id} value={i.id}>{i.name}</option>
              ))
            }
          </Form.Select>
        </Form.Group>
        <div className='d-flex justify-content-center mb-3'>
          <Button type="submit" className='btn btn-success'>Create</Button>
          <Link to={"/"}>
            <Button variant="dark" className='ms-3'>Cancel</Button>
          </Link>
        </div>
      </Form>
    </Col>
                        </Row>
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default AddContact
