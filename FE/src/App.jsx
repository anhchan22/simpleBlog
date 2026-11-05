import { Routes, Route, Link } from 'react-router-dom'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { Posts } from './pages/Posts'
import { NoMatch } from './pages/NoMatch'
import { Post } from './pages/Post'
import { PostList } from './pages/PostList'
import { Popular } from './pages/Popular'
import {NewPost} from './pages/NewPost'
import { Countries } from './pages/Countries'
import { CountryDetail } from './pages/CountryDetail'
function App() {


  return (
    <>
      <nav>
        <Link to="/" style={{ padding: 5 }}>Home</Link>
        <Link to="/about" style={{ padding: 5 }}>About</Link>
        <Link to="posts" style={{ padding: 5 }}>Posts</Link>
        <Link to="/countries" style={{ padding: 5 }}>Countries</Link>
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
          <Route path='new' element={<NewPost />} />
          <Route path='popular' element={<Popular />} />
        </Route>
        <Route path='*' element={<NoMatch />} />
      </Routes >
    </>
  )
}

export default App
