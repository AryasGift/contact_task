import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ContactService } from '../services/ContactService';
import Spinner from '../components/spinner/Spinner';

function EditContact() {
    let navigate=useNavigate();
    let { contactId } = useParams();
    const [Edit, setEdit] = useState({
        loading: false,
        contact: {
            name: "",
            photo: "",
            mobile: "",
            email: "",
            company: "",
            title: "",
            group: ""
        },
        groupsCat: [],
        errorMessage: ""

    })
    useEffect(() => {
        const fetchData = async () => {
            try {
                setEdit({ ...Edit, loading: true })
                let result = await ContactService.getSingleContact(contactId)
                let groupRes=await ContactService.getGroupName();
                setEdit({
                    ...Edit,
                    loading: false,
                    contact: result.data,
                    groupsCat:groupRes.data
                })
            }
            catch (err) {
                setEdit({
                    ...Edit,
                    loading: false,
                    errorMessage: err.message
                })
            }
        }
        fetchData()

    }, [contactId])
    let updateInput=(e)=>{
       setEdit({
        ...Edit,
        contact:{
            ...Edit.contact,
            [e.target.name]:e.target.value
        }
       })
    }
    let submitForm=async()=>{
        try {
            let result = await ContactService. updateData(Edit.contact,contactId);
            if (result) {
                navigate('/', { replace: true })
            }
        } catch (err) {
            console.error("Error creating contact:", err);
            setEdit((prevDetails) => ({
                ...prevDetails,
                errorMessage: "Error creating contact"
            }))
        }
    }
    let { loading, contact, groupsCat, errorMessage } = Edit;
    return (
        <div>
            {
                loading ? <Spinner/>:
                <Container>
                <Row>

                    <Col lg={6} md={6} sm={6}>
                        <h3 className='mt-3'> EDIT CONTACT</h3>
                        <form>
                            <div class="mb-3 mt-3 me-3">
                                <input type="text" 
                                class="form-control me-3" 
                                id="Input1" 
                                name='name'
                                onChange={updateInput}
                                value={contact.name}
                                placeholder="username" />
                            </div>
                            <div class="mb-3 me-3">
                                <input type="text" 
                                class="form-control"
                                 id="Input1"
                                 name='photo'
                                 onChange={updateInput} 
                                 value={contact.photo}
                                 placeholder="photo url" />
                            </div>
                            <div class="mb-3 me-3">
                                <input type="text" 
                                class="form-control" 
                                id="mobile"
                                name='mobile'
                                onChange={updateInput} 
                                value={contact.mobile}
                                placeholder="Mobile" />
                            </div>
                            <div class="mb-3 me-3">
                                <input type="email" 
                                class="form-control" 
                                id="Input1" 
                                name='email'
                                onChange={updateInput}
                                value={contact.email}
                                placeholder="Email" />
                            </div>
                            <div class="mb-3 me-3">
                                <input type="text" 
                                class="form-control" 
                                id="Input1"
                                name='company'
                                onChange={updateInput}
                                value={contact.company}
                                placeholder="Company" />
                            </div>
                            <div class="mb-3 me-3">
                                <input type="text" 
                                class="form-control" 
                                id="Input1"
                                name='title'
                                onChange={updateInput} 
                                value={contact.title}
                                 placeholder="Title" />
                            </div>
                            <div class="mb-3 me-3">
                                <select className='form-control'
                                name='group'
                                onChange={updateInput} 
                                value={contact.group}>
                                    <option value="">select group</option>{
                                        groupsCat.length>0 && groupsCat.map(i=>{
                                            return(
                                                <option key={i.id} value={i.id}>{i.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='mb-3'>
                                <Button variant="primary"onClick={submitForm} >Update</Button>
                                <Link to={"/"}>
                                    <Button variant="dark" className='ms-3'>Cancel</Button>
                                </Link>
                            </div>
                        </form>
                    </Col>
                    <Col lg={6} md={6} sm={6} xs={6}>
                        <div className=' d-flex justify-content-center mt-5'>
                            <img src={contact.photo} className='img-avatar' />
                        </div>
                        <div className='Details text-center'>
                           <h2 className='heading'>{contact.name}</h2>
                           <h4 className='headingText'>{contact.mobile}</h4>
                           <h4 className='headingText'>{contact.title}</h4>
                        </div>
                    </Col>
                </Row>
            </Container>
            }
           
        </div>
    )
}

export default EditContact
