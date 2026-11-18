import { Routes, Route, Link } from 'react-router-dom'
import { useState } from 'react'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { Posts } from './pages/Posts'
import { NoMatch } from './pages/NoMatch'
import { Post } from './pages/Post'
import { PostList } from './pages/PostList'
import { NewPost } from './pages/NewPost'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
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
                        <Link to="/register" style={{ padding: 5 }}>Register</Link>
                    </>
                )}
            </nav>

            <Routes>
                <Route path="/" element={<Home />} >
                </Route>
                <Route path="/about" element={<About />} />
                <Route path="/posts" element={<Posts />}>
                    <Route index element={<PostList />} />
                    <Route path=':slug' element={<Post user={user} />} />
                    <Route path='new' element={
                        <ProtectedRoute user={user}><NewPost /></ProtectedRoute>
                    } />
                </Route>
                <Route path='/login' element={<Login onLogin={setUser} />} />
                <Route path='/register' element={<Register />} />
                <Route path="/stats" element={
                    <ProtectedRoute user={user}><Stats /></ProtectedRoute>
                } />
                <Route path='*' element={<NoMatch />} />
            </Routes >
        </>
    )
}


