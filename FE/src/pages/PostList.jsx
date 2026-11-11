import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function PostList() {
    const [posts, setPosts] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [status, setStatus] = useState("loading");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        async function loadPosts() {
            try {
                const response = await fetch("http://localhost:3000/posts");
                if (!response.ok) {
                    throw new Error(`API trả về lỗi ${response.status}`);
                }

                const result = await response.json();
                setPosts(result.data);
                setStatus("success");
            } catch {
                setErrorMessage("Không tải được danh sách bài viết. Kiểm tra backend tại http://localhost:3000.");
                setStatus("error");
            }
        }

        loadPosts();
    }, []);

    return (
        <>
            <h3>Danh sách bài đăng</h3>
            <label htmlFor="post-search">Tìm kiếm</label>
            <input
                id="post-search"
                type="text"
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
            />

            {status === "loading" && <p>Đang tải danh sách bài viết...</p>}
            {status === "error" && <p>{errorMessage}</p>}
            <ul>
                {posts
                    .filter((post) =>
                        post.title.toLowerCase().includes(keyword.toLowerCase())
                    )
                    .map((post) => (
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
