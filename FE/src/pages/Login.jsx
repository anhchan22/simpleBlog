import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Login({ onLogin }) {
  const [input, setInput] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(event) {
    event.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Sai tài khoản hoặc mật khẩu.");
      }

      onLogin(result.user);
      navigate("/stats");
    } catch (error) {
      setErrorMessage(error.message || "Không thể đăng nhập. Hãy kiểm tra backend.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <h2>Đăng nhập</h2>
      <label htmlFor="username">Tài khoản:</label>
      <input
        id="username"
        type="text"
        value={input.username}
        onChange={(event) => setInput({ ...input, username: event.target.value })}
        required
      />
      <br />
      <label htmlFor="password">Mật khẩu:</label>
      <input
        id="password"
        type="password"
        value={input.password}
        onChange={(event) => setInput({ ...input, password: event.target.value })}
        required
      />
      <br />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Đang đăng nhập..." : "Login"}
      </button>
      {errorMessage && <p role="alert">{errorMessage}</p>}
    </form>
  );
}