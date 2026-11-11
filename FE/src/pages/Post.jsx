import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function Post() {
    const { slug } = useParams()
    const [post, setPost] = useState(null);
    const [status, setStatus] = useState("loading");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        async function loadPost() {
            try {
                const response = await fetch(`http://localhost:3000/posts/${slug}`);
                if (!response.ok) {
                    throw new Error(`API trả về lỗi ${response.status}`);
                }

                const result = await response.json();
                setPost(result.data);
                setStatus("success");
            } catch {
                setErrorMessage("Không tải được bài viết. Kiểm tra backend tại http://localhost:3000.");
                setStatus("error");
            }
        }

        loadPost();
    }, [slug]);
    if (status === "loading") {
        return <p>Đang tải...</p>;
    }

    if (status === "error") {
        return <p>{errorMessage}</p>;
    }

    if (!post) {
        return <p>Không tìm thấy bài viết.</p>;
    }
    return (
        <div>
            <h3>{post.title}</h3>
            <p>{post.description}</p>
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
