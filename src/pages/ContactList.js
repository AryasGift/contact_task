import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link, useParams } from 'react-router-dom';
import { ContactService } from '../services/ContactService';
import Spinner from '../components/spinner/Spinner';
import Footer from '../components/Footer';
import ReactPaginate from 'react-paginate';

function ContactList() {
  
  let [search, setSearch] = useState({
    text: ""
  })
  let [showContacts, setShowContacts] = useState({
    loading: false,
    contacts: [],
    filteredContacts: [],
    errorMessage: " "
  })
  const [currentPage, setCurrentPage] = useState(0);
  const [contactsPerPage] = useState(6);
  const [paginationVisible, setPaginationVisible] = useState(true); 
  const fetchData = async () => {
    try {
      setShowContacts({ ...showContacts, loading: true });
      var result = await ContactService.getAllContacts();
      setShowContacts({
        ...showContacts,
        loading: false,
        contacts: result.data,
        filteredContacts: result.data
      });
    }
    catch (err) {
      setShowContacts({
        ...showContacts,
        loading: false,
        errorMessage: err.message

      })

    }

  }

  useEffect(() => {
    fetchData();
  }, [])
  let clickDelete = async (contactId) => {
    try {
      await ContactService.deleteData(contactId);
      const updatedContacts = showContacts.contacts.filter(contact => contact.id !== contactId);
      setShowContacts({
        ...showContacts,
        contacts: updatedContacts,
        filteredContacts: updatedContacts,
        loading: false

        });
        setCurrentPage(0);
        setPaginationVisible(updatedContacts.length > contactsPerPage);
      }
    catch {

    }
  }
  let searches = (e) => {
    setSearch({ ...search, text: e.target.value })
    let thecontacts = showContacts.contacts.filter(
      i => {
        return i.name.toLowerCase().includes(e.target.value.toLowerCase())
      }
    )
    setShowContacts({
      ...showContacts,
      filteredContacts: thecontacts
    })

  }
  const FindingColleague = () => {
    let colleagues = showContacts.contacts.filter(i => i.group == 1)
    setShowContacts({
      ...showContacts,
      filteredContacts: colleagues
    })
    setPaginationVisible(false);
  }
  const FindingFamily = () => {
    let colleagues = showContacts.contacts.filter(i => i.group == 3)
    setShowContacts({
      ...showContacts,
      filteredContacts: colleagues
    })
    setPaginationVisible(false);
  }
  const FindingFriends = () => {
    let colleagues = showContacts.contacts.filter(i => i.group == 2)
    setShowContacts({
      ...showContacts,
      filteredContacts: colleagues
    })
    setPaginationVisible(false);
  }
  const FindingCommunity = () => {
    let colleagues = showContacts.contacts.filter(i => i.group == 5)
    setShowContacts({
      ...showContacts,
      filteredContacts: colleagues
    })
    setPaginationVisible(false);
  }
  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };
  const indexOfLastContact = (currentPage + 1) * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = showContacts.filteredContacts.slice(indexOfFirstContact, indexOfLastContact);
  let { loading, contacts, errorMessage, filteredContacts } = showContacts;
  return (
    <div>
      <div className='section1 mt-2 ms-3' style={{objectFit:'contain',overflow:'hidden'}}>
        <Row className='align-items-center justify-content-between'>
          <Col lg={6} md={6} sm={6}>
            <h1 className='heading'>Contact Manager</h1>
            <div className='fst-italic  justify-content-center' style={{objectFit:'contain'}}>
              <p>
                Welcome to the Contact Manager App, your ultimate solution for organizing and managing your contacts effortlessly. Whether you're a business professional, a student, or someone who wants to keep personal and professional connections in order, this app is designed to simplify the process of storing, accessing, and managing contact information.</p>
            </div>
            <Link to={"/add"} style={{ textDecoration: 'none' }}>
              <button className="button-63" role="button">Create Contact</button>
            </Link>
          </Col>
          <Col lg={6} md={6} sm={12} className='d-flex justify-content-center'>
            <img src="https://i.postimg.cc/0y40V6vv/flat-customer-support-illustration.avif" style={{ height: '300px', borderRadius: '50%' ,objectFit:'contain'}} />
          </Col>
        </Row>
      </div>
      <Container fluid>
        <Row className="align-items-center mt-3">
          <Col lg={6} md={6} sm={6} className="d-flex justify-content-center">
            <form className="d-flex align-items-center w-100">
              <input type="text"
                className='form-control w-75 ms-4'
                placeholder='search'
                name='text'
                value={search.text}
                onChange={searches} />
              <Button variant="primary" type="submit" className="ms-2">
                Search
              </Button>
            </form>
          </Col>
          <Col lg={6} md={6} sm={6}>
            <div className='categories'>
              <div style={{ float: 'right' }}>
                <Button variant="primary" onClick={FindingColleague}>Colleague</Button>{' '}
                <Button variant="success" onClick={FindingFamily}>Family</Button>{' '}
                <Button variant="info" onClick={FindingFriends}>Friends</Button>{' '}
                <Button variant="warning" onClick={FindingCommunity}>Community</Button>{' '}
              </div>
            </div>

          </Col>
        </Row>{
          loading ? <Spinner /> :
            <section className='contact-list mt-3 ms-4'>
              <div className='row'>
                {
                  currentContacts.length > 0 &&
                  currentContacts.map(i => {
                    return (
                      <div className='col-md-6 mb-3'>
                        <div className='card'>
                          <div className='card-body'>
                            <div className='row align-items-center d-flex justify-content-around'>
                              <div className='col-md-4'>
                                <img src={i.photo} className='img-avatar' />
                              </div>
                              <div className='col-md-7'>
                                <ul className='list-group'>
                                  <li className='list-group-item list-group-item-action'>
                                    Name: <span className='fw-bold'>{i.name}</span>
                                  </li>
                                  <li className='list-group-item list-group-item-action'>
                                    Mobile: <span className='fw-bold'>{i.mobile}</span>
                                  </li>
                                  <li className='list-group-item list-group-item-action'>
                                    Email: <span className='fw-bold'>{i.email}</span>
                                  </li>
                                </ul>
                              </div>
                              <div className='col-md-1 d-md-flex flex-column align-items-center'>
                                <Link to={`/view/${i.id}`}>
                                  <Button variant="primary" className='my-1'><i class="fa-solid fa-eye"></i></Button>{' '}
                                </Link>
                                <Link to={`/edit/${i.id}`}>
                                  <Button variant="success" className='my-1'><i class="fa-solid fa-user-pen"></i></Button>{' '}
                                </Link>
                                <Button variant="warning" className='my-1'><i class="fa-solid fa-trash" onClick={() => clickDelete(i.id)}></i></Button>{' '}

                              </div>
                            </div>
                          </div>
                        </div>

                      </div>

                    )
                  })
                }

              </div>
              {paginationVisible && (
                <ReactPaginate
                  previousLabel={"«"}
                  nextLabel={"»"}
                  breakLabel={"..."}
                  pageCount={Math.ceil(showContacts.filteredContacts.length / contactsPerPage)}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={3}
                  onPageChange={handlePageClick}
                  containerClassName={"pagination"}
                  pageClassName={"page-item"}
                  pageLinkClassName={"page-link"}
                  previousClassName={"page-item"}
                  previousLinkClassName={"page-link"}
                  nextClassName={"page-item"}
                  nextLinkClassName={"page-link"}
                  breakClassName={"page-item break"}
                  breakLinkClassName={"page-link"}
                  activeClassName={"active"}
                  disabledClassName={"disabled"}
                />
              )}

              {/* </div> */}
             
            </section>
           
        }
      </Container>
      <Footer></Footer>
    </div>
  )
}

export default ContactList