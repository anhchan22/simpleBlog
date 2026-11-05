import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export function Countries() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [status, setStatus] = useState("loading");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadCountries() {
      try {
        const response = await fetch("http://localhost:3000/countries");
        if (!response.ok) {
          throw new Error("BE đang gặp lỗi.");
        }

        const result = await response.json();
        setCountries(result.data);
        setStatus("success");
      } catch {
        setTimeout(() => {
          setErrorMessage(
            "Không kết nối được BE. Hãy kiểm tra backend tại http://localhost:3000 rồi tải lại trang.",
          );
          setStatus("error");
        }, 3000);
      }
    }
    loadCountries();
  }, []);

  useEffect(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    setFilteredCountries(
      countries.filter((country) =>
        country.country.toLowerCase().includes(normalizedSearch),
      ),
    );
  }, [countries, searchTerm]);

  return (
    <main>
      <h2>Danh sách quốc gia</h2>

      <label >Tìm quốc gia</label>
      <input
        type="search"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        disabled={status !== "success"}
      />

      {status === "loading" && <p role="status">Đang tải danh sách quốc gia...</p>}
      {status === "error" && <p role="alert">{errorMessage}</p>}
      {status === "success" && filteredCountries.length === 0 && (
        <p>Không tìm thấy quốc gia phù hợp.</p>
      )}
      {status === "success" &&
        filteredCountries.map((country) => (
          <p key={country.id}>
            <Link to={`/countries/${country.id}`}>{country.country}</Link>
          </p>
        ))}
    </main>
  );
}
