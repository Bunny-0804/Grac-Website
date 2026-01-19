import '../styles/HomeTopBar.css'
import Button from './MinimalButtonTopBar.jsx'
import { useNavigate } from 'react-router-dom';



function HomeTopBar()
{
    const navigate = useNavigate();

    return(
        <>
        <div className="HomeTopBar">
            <div>
                <p className = 'Logo'>Grac</p>
            </div>
            <ul className='ButtonBar'>
                <li><Button>Home</Button></li>
                <li><Button>About us</Button></li>
                <li><Button>Events</Button></li>
                <li> <Button>Projects</Button></li>
                <li><Button>Teams</Button></li>
                <li><Button>Resources</Button></li>
                <li><Button>Gallery</Button></li>
                <li><Button>Contact</Button></li>
            </ul> 
            <div className="LoginButtons">
                <button className="AuthButton BtnLogin" onClick={() => navigate('/login')}>Login</button>
                <button className="AuthButton BtnSignup" onClick={() => navigate('/login')}>Join the club</button>
            </div>  
        </div>
        </>    
    );
}

export default HomeTopBar;