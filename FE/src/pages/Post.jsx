import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
export function Post({ user }) {
    const { slug } = useParams();
    const [post, setPost] = useState([])
    const [status, setStatus] = useState("loading")
    const [editting, setEditting] = useState(false)
    const [form, setForm] = useState({
        title: "",
        description: ""
    })
    const navigate = useNavigate()
    const [comment, setComment] = useState("")

    useEffect(() => {
        async function loadPost() {
            try {
                const response = await fetch(`http://localhost:3000/posts/${slug}`);
                const result = await response.json();
                setPost(result.data);
                setForm({
                    title: result.data.title,
                    description: result.data.description
                })
                setStatus("success")
            } catch {
                setStatus("error")
            }
        }
        loadPost();
    }, [slug]);

    function handleSua() {
        setForm({
            title: post.title,
            description: post.description
        })
        setEditting(true)
    }

    async function handleXoa() {
        try {
            const response = await fetch(`http://localhost:3000/posts/${slug}`, {
                method: "delete"
            })
            if (!response.ok) {
                console.log("xoa bai viet that bai")
            }
            alert("xoa bai viet thanh cong")
            navigate("/posts")
        } catch (error) {
            console.log("Loi, khong xoa duoc.")
        }

    }

    function handleChange(event) {
        const { name, value } = event.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    async function handleLuu(event) {
        event.preventDefault()
        try {
            const response = await fetch(`http://localhost:3000/posts/${slug}`, {
                method: "put",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            })

            const updatedPost = await response.json()
            setPost(updatedPost.data ?? updatedPost)
            setEditting(false)
            navigate(`/posts/${slug}`)
        } catch (error) {
            console.error("Loi, khong sua duoc bai viet:", error)
        }
    }

    function handleHuy() {
        setEditting(false)
    }

    async function handleComment(event) {
        event.preventDefault()
        const response = await fetch(`http://localhost:3000/posts/${slug}/comments`, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: user?.username,
                name: user?.name,
                text: comment
            })
        })

        if (!response.ok) {
            console.log("Them binh luan that bai")
            return
        }

        const result = await response.json()
        setPost(result)
        setComment("")
    }
    return (
        <div>
            {status == "loading" && <p>Dang tai bai viet...</p>}
            {status == "error" && <p>Loi Backend</p>}
            {editting && user ? (
                <form onSubmit={handleLuu}>
                    <br />
                    <label>Title:</label>
                    <input type="text" name="title" value={form.title} onChange={handleChange} />
                    <br />
                    <label>Description:</label>
                    <input type="text" name="description" value={form.description} onChange={handleChange} />
                    <br />
                    <button type="submit">Luu</button>
                    <button type="button" onClick={handleHuy}>Huy</button>
                </form>
            ) : (
                <>
                    <h3>{post.title}</h3>
                    <p>{post.description}</p>
                    {user && (
                        <>
                            <button onClick={handleSua}>Sửa</button>
                            <button onClick={handleXoa}>Xóa</button>
                        </>
                    )}
                </>
            )
            }

            <h3>Binh luan</h3>
            <form onSubmit={handleComment} >
                <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} />
                <button>Gui</button>
            </form>
            {post.comments && post.comments.map((item, index) => (
                <div key={index}>
                    <p>
                        <b>{item.name}: </b> {item.text}
                        <br />
                        <small>{new Date(item.createdAt).toLocaleString("vi-VN")}</small>
                    </p>

                </div>
            ))}
        </div>
    )
}











// export function Post() {
//   const [showForm, setShowForm] = useState(true);
//   const { register, handleSubmit, reset } = useForm();

//   function onSubmit(data) {
//     alert(`Bài viết "${data.title}" đã được tạo!`);
//     reset();
//   }

//   return (
//     <>
//       <h3>Tạo bài viết mới</h3>
//       <button onClick={() => setShowForm(!showForm)}>
//         {showForm ? "Ẩn form" : "Hiện form"}
//       </button>

//       {showForm && (
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <p>
//             <label>Tiêu đề: </label>
//             <input {...register("title", { required: true })} />
//           </p>

//           <p>
//             <label>Danh mục: </label>
//             <select {...register("category")}>
//               <option>Công nghệ</option>
//               <option>Học tập</option>
//               <option>Đời sống</option>
//             </select>
//           </p>

//           <p>
//             <label>Nội dung: </label>
//             <textarea {...register("content", { required: true })} />
//           </p>

//           <button type="submit">Tạo bài viết</button>
//         </form>
//       )}
//     </>
//   );
// }

// export function Post() {
//   const [showForm, setShowForm] = useState(true);
//   const [title, setTitle] = useState("");
//   const [category, setCategory] = useState("Công nghệ");
//   const [content, setContent] = useState("");

//   function handleSubmit(event) {
//     event.preventDefault();
//     alert(`Bài viết "${title}" đã được tạo!`);
//     setTitle("");
//     setContent("");
//   }

//   return (
//     <>
//       <h3>Tạo bài viết mới</h3>
//       <button type="button" onClick={() => setShowForm(!showForm)}>
//         {showForm ? "Ẩn form" : "Hiện form"}
//       </button>

//       {showForm && (
//         <form onSubmit={handleSubmit}>
//           <p>
//             <label>Tiêu đề: </label>
//             <input
//               value={title}
//               onChange={(event) => setTitle(event.target.value)}
//               required
//             />
//           </p>

//           <p>
//             <label>Danh mục: </label>
//             <select
//               value={category}
//               onChange={(event) => setCategory(event.target.value)}
//             >
//               <option>Công nghệ</option>
//               <option>Học tập</option>
//               <option>Đời sống</option>
//             </select>
//           </p>

//           <p>
//             <label>Nội dung: </label>
//             <textarea
//               value={content}
//               onChange={(event) => setContent(event.target.value)}
//               required
//             />
//           </p>

//           <button type="submit">Tạo bài viết</button>
//         </form>
//       )}
//     </>
//   );
// }
