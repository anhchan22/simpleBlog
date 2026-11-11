import { Routes, Route, Link } from 'react-router-dom'
import { useState } from 'react'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { Posts } from './pages/Posts'
import { NoMatch } from './pages/NoMatch'
import { Post } from './pages/Post'
import { PostList } from './pages/PostList'
import { NewPost } from './pages/NewPost'
import { Countries } from './pages/Countries'
import { CountryDetail } from './pages/CountryDetail'
import { Login } from './pages/Login'
import { Stats } from './pages/Stats'
import { ProtectedRoute } from "./components/ProtectedRoute";
export function AppLayout() {
    const [user, setUser] = useState(null)

    function logOut() {
        setUser(null)
    }
    return (
        <>
            <nav>
                <Link to="/" style={{ padding: 5 }}>Home</Link>
                <Link to="/about" style={{ padding: 5 }}>About</Link>
                <Link to="posts" style={{ padding: 5 }}>Posts</Link>
                <Link to="/countries" style={{ padding: 5 }}>Countries</Link>

                {user ? (
                    <>
                        <Link to="/stats" style={{ padding: 5 }}>Stats</Link>
                        {" | "}
                        <button type="button" onClick={logOut}>Logout</button>
                    </>
                ) : (
                    <>
                        {" | "}
                        <Link to="/login" style={{ padding: 5 }}>Login</Link>
                    </>
                )}
            </nav>

            <Routes>
                <Route path="/" element={<Home />} >
                </Route>
                <Route path="/about" element={<About />} />
                <Route path="/countries" element={<Countries />} />
                <Route path="/countries/:id" element={<CountryDetail />} />
                <Route path="/posts" element={<Posts />}>
                    <Route index element={<PostList />} />
                    <Route path=':slug' element={<Post />} />
                    <Route path='new' element={
                        <ProtectedRoute user={user}><NewPost /></ProtectedRoute>
                    } />
                </Route>
                <Route path='/login' element={<Login onLogin={setUser} />} />
                <Route path="/stats" element={
                    <ProtectedRoute user={user}><Stats /></ProtectedRoute>
                } />
                <Route path='*' element={<NoMatch />} />
            </Routes >
        </>
    )
}


