import { Container, Nav, Navbar } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../../../auth/authSlice';
import Login from '../../../auth/pages/Login/Login.component';
import './NavBar.styles.css';
import { useTranslation } from 'react-i18next'


const NavBar = () => {
  const { t, i18n } = useTranslation(["welcome"]);
  const dispatch = useDispatch();

  return (
    <Navbar className='NavBar'  expand="lg" data-bs-theme="dark">
      <Container>
        <Navbar.Brand to="/users/all_users" as={Link}>{t('logo')}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link to="/users/all_users" as={Link}>{t('home')}</Nav.Link>
            {/* <Nav.Link to="/auth/login" as={Link}>
              <Login/>
            </Nav.Link> */}
            <Nav.Link onClick={() => dispatch(logout())}>
            {t('logout')}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar