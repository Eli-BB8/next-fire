import Link from 'next/link';
import { useContext } from 'react';
import { UserContext } from '../lib/context';


export default function Navbar({ }) {
  const { user , username } = useContext(UserContext);

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link href="/" passHref>
            <button className="btn-logo">FEED</button>
          </Link>
        </li>

        {/* user is signed in and has username */}
        {username &&
          <>
            <li className="push-left">
              <Link href="/admin" passHref>
                <button className="btn-blue">Write Posts</button>
              </Link>
            </li>
            <li>
              <Link href={`/${username}`} passHref>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={user?.photoURL} alt={`${username}`}/>
              </Link>
            </li>
          </>
        }
        {!username && (
          <Link href="/enter" passHref>
            <button className="btn-blue">Login</button>
          </Link>
        )}
      </ul>
    </nav>
  )
}
