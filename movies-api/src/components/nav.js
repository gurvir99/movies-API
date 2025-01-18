import '../componentsStyles/nav.css';
import {Link} from 'react-router';

function Nav() {
    return (
        <div className='menu'>
            <ul>
                {/* <li>LOGO</li> */}
                <li>
                    <Link className={'link'} to="/">
                       <img alt="logo" className="header__icon" src={require('../images/logo.png')} />
                    </Link>
                </li>
                <li >
                    <Link className={'link'} exact to={"/"}>
                        <h2 className={'navLink'}>HOME</h2>
                    </Link>
                </li>
                <li >
                    <Link className={'link'} to={"/movies/popular"}>
                        <h2 className={'navLink'}>POPULAR</h2>
                    </Link>
                </li>
                <li >
                    <Link className={'link'} to={"/movies/top_rated"}>
                        <h2 className={'navLink'}>TOP RATED</h2>
                    </Link>
                </li>
                <li >
                    <Link className={'link'} to={"/movies/upcoming"}>
                        <h2 className={'navLink'}>UPCOMING</h2>
                    </Link>
                </li>
            </ul>   
        </div>
    );
  }

  export default Nav;