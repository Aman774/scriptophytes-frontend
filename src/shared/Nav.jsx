import React,{useEffect,useState} from 'react';

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import urls from './urls'
import axios from './axios'

function Topbar(props) {

  const [categories,setCategories] =useState(null)
    useEffect(()=>{
    


    axios.get(urls.category.getAll).then(response=>{
      console.log("categories",response.data)
      setCategories(response.data)
    }).catch(error=>{
      console.log(error)
    })



    },[])












    return (
        <div>
             <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Navbar.Brand href="#home">Scriptophytes</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      {/* <Nav.Link href="#features">Features</Nav.Link>
      <Nav.Link href="#pricing">Pricing</Nav.Link> */}
      <NavDropdown title="Categories" id="collasible-nav-dropdown">

        {categories!==null?(categories.length>0?(categories.map((val,index)=>{

          return(        <NavDropdown.Item key={index} href={`/categoryArticle/${val.id}`}>{val.category}</NavDropdown.Item>
          )
        })):(<div>No categories available</div>)):(<div>Loading</div>)}

      </NavDropdown>
    </Nav>
    <Nav>
      <Nav.Link href="/dashboard">Write Blogs</Nav.Link>
      {/* <Nav.Link eventKey={2} href="#memes">
        Dank memes
      </Nav.Link> */}
    </Nav>
  </Navbar.Collapse>
</Navbar> 

        </div>
    );
}

export default Topbar;
