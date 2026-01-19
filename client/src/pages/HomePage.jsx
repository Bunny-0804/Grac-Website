import Topbar from '../components/HomeTopBar.jsx'
import '../styles/HomePage.css'
import HeroShowcase from '../components/HeroShowCase.jsx';

function Home()
{
    return(
        <>
        <div className='HomePage'>
            <div className='HomePageHeader'>
                <Topbar/>
            </div>
            <div className='HomePageBody'>
                <HeroShowcase/>
            </div>
        </div>
        </>
    );
}

export default Home;