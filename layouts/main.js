import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '../components/navbar'
import { Container, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
export default ({ children }) => (
    <div>
        <NavBar/>
        { children }
    </div>
);