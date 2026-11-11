import { Outlet, Link } from "react-router-dom";
import { PostList } from "./PostList";
import { Post } from "./Post";

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
