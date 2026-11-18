import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Register() {
  const [input, setInput] = useState({
    name: "",
    dateOfBirth: "",
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  async function handleRegister(event) {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      navigate("/login");
    } catch {
      console.log("Tao tai khoan that bai")
    }
  }

  return (
    <form onSubmit={handleRegister}>
      <h2>Đăng ký</h2>
      <label>Tên:</label>
      <input
        id="name"
        value={input.name}
        onChange={(event) => setInput({ ...input, name: event.target.value })}
        required
      />
      <br />
      <label>Ngày sinh:</label>
      <input
        id="dateOfBirth"
        type="date"
        value={input.dateOfBirth}
        onChange={(event) => setInput({ ...input, dateOfBirth: event.target.value })}
        required
      />
      <br />
      <label>Username:</label>
      <input
        id="username"
        value={input.username}
        onChange={(event) => setInput({ ...input, username: event.target.value })}
        required
      />
      <br />
      <label>Mật khẩu:</label>
      <input
        id="password"
        type="password"
        value={input.password}
        onChange={(event) => setInput({ ...input, password: event.target.value })}
        required
      />
      <br />
      <button type="submit">Đăng ký</button>
    </form>
  );
}
