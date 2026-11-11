import { Outlet, Link } from "react-router-dom";
export function Posts() {
  return (
    <>
      <h2>Trang Posts</h2>
      <Link to="/posts">Danh sách</Link>
      {' | '}
      <Link to="/posts/new">Tạo bài viết</Link>
      {' | '}
      <Outlet />
    </>
  )
}
