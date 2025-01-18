import '../componentsStyles/nav.css';
import {Link} from 'react-router';

function Nav() {
    return (
        <div className='menu'>
            <ul>
                {/* <li>LOGO</li> */}
                <li >
                    <Link className={'link'} exact to={"/"}>
                        <p className={'navLink'}>HOME</p>
                    </Link>
                </li>
                <li >
                    <Link className={'link'} to={"/movies/popular"}>
                        <p className={'navLink'}>POPULAR</p>
                    </Link>
                </li>
                <li >
                    <Link className={'link'} to={"/movies/top_rated"}>
                        <p className={'navLink'}>TOP RATED</p>
                    </Link>
                </li>
                <li >
                    <Link className={'link'} to={"/movies/upcoming"}>
                        <p className={'navLink'}>UPCOMING</p>
                    </Link>
                </li>
            </ul>   
        </div>
    );
  }

  export default Nav;