import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function Post() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [form, setForm] = useState({ title: "", description: "" });
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadPost() {
            try {
                const response = await fetch(`http://localhost:3000/posts/${slug}`);
                const result = await response.json();
                if (!response.ok) throw new Error("Không tải được bài viết.");

                setPost(result.data);
                setForm({
                    title: result.data.title,
                    description: result.data.description,
                });
            } catch (error) {
                console.error("Không tải được bài viết:", error);
            } finally {
                setLoading(false);
            }
        }
        loadPost();
    }, [slug]);

    function handleChange(event) {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    }

    async function updatePost(event) {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/posts/${slug}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const result = await response.json();
            if (!response.ok) throw new Error("Không cập nhật được bài viết.");

            setPost(result.data);
            setForm({
                title: result.data.title,
                description: result.data.description,
            });
            setIsEditing(false);
        } catch (error) {
            console.error("Không cập nhật được bài viết:", error);
        }
    }

    async function deletePost() {
        try {
            const response = await fetch(`http://localhost:3000/posts/${slug}`, {
                method: "DELETE",
            });
            if (!response.ok) throw new Error("Không xóa được bài viết.");

            navigate("/posts");
        } catch (error) {
            console.error("Không xóa được bài viết:", error);
        }
    }

    if (loading) return <p>Đang tải bài viết...</p>;
    if (!post) return <p>Không tìm thấy bài viết.</p>;

    return (
        <main>
            {isEditing ? (
                <form onSubmit={updatePost}>
                    <label>Tiêu đề: </label>
                    <input
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        required
                    />
                    <br />
                    <label>Mô tả: </label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        required
                    />
                    <br />
                    <button type="submit">Lưu</button>
                    <button type="button" onClick={() => setIsEditing(false)}>Hủy</button>
                </form>
            ) : (
                <>
                    <h3>{post.title}</h3>
                    <p>{post.description}</p>
                    <button type="button" onClick={() => setIsEditing(true)}>Sửa</button>
                    <button type="button" onClick={deletePost}>Xóa</button>
                </>
            )}
        </main>
    );
}
