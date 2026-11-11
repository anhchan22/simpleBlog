import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export function Countries() {
  const [countries, setCountries] = useState([]);
  const [status, setStatus] = useState("loading");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadCountries() {
      try {
        const response = await fetch("http://localhost:3000/countries");
        const result = await response.json();
        setCountries(result.data);
        setStatus("success");
      } catch {
        setTimeout(() => {
          setErrorMessage(
            "Không kết nối được BE.",
          );
          setStatus("error");
        }, 3000);
      }
    }
    loadCountries();
  }, []);

  return (
    <main>
      <h2>Danh sách quốc gia</h2>
      {status === "loading" && <p>Đang tải danh sách quốc gia...</p>}
      {status === "error" && <p>{errorMessage}</p>}
      {countries
      .map((country)=>(
        <p key={country.id}>
          <Link to={`/countries/${country.id}`}>{country.country}</Link>
        </p>
      ))
      }
    </main>
  );
}
