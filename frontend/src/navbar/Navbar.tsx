import { Link } from 'react-router-dom';
import "./Navbar.css"; 

interface NavBarProps {
  isAuthenticated: boolean;
}

const NavBar: React.FC<NavBarProps> = ({ isAuthenticated }) => {

    if (!isAuthenticated) {
        return null;
    }

    return (
        <nav>
            <div>
                <ul>
                    <li><Link to='/dashboard'>Home</Link></li>
                    <li><Link to='/my-journal'> My Journal </Link></li>
                    <li><Link to='/add-sched'> Add Sched </Link></li>
                    <li><Link to='/profile'> Profile </Link></li>
                    <li><Link to='/logout'> Logout </Link></li>
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;
