import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
export function PostList() {
    const [posts, setPosts] = useState([])
    const [err, setErr] = useState("")
    const [status, setStatus] = useState("loading")
    useEffect(() => {
        async function loadPosts() {
            try {
                const response = await fetch("http://localhost:3000/posts");
                if (!response.ok) {
                    throw new Error("BE đang gặp lỗi.");
                }

                const result = await response.json();

                setPosts(result.data);
                setStatus("success")
            } catch {
                setErr("Khong tai duoc danh sach bai viet. Kiem tra BE.")
                setStatus("error")
            }
        }
        loadPosts();
    }, []);

    return (
        <>
            <h3>Danh sách bài đăng</h3>
            {status == "loading" && <p>Dang tai danh sach</p>}
            {status == "error" && <p>{err}</p>}
            <ul>
                {posts.map((post) => (
                    <li key={post.slug}>
                        <Link to={`/posts/${post.slug}`}>
                            <h4>{post.title}</h4>
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
}
