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
                    <Link className={'link'} to={"/about"}>
                        <p className={'navLink'}>ABOUT</p>
                    </Link>
                </li>
                <li >
                    <Link className={'link'} to={"/projects"}>
                        <p className={'navLink'}>PROJECTS</p>
                    </Link>
                </li>
            </ul>   
        </div>
    );
  }

  export default Nav;