import { BlogPosts } from "../data/blogPosts";
import { Link } from 'react-router-dom';
export function PostList() {
    return (
        <>
            <h3>Danh sách bài đăng</h3>
            <ul>
                {Object.entries(BlogPosts).map(([slug, post]) => (
                    <li key={slug}>
                        <Link to={`/posts/${slug}`}>
                            <h4>{post.title}</h4>
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
}
