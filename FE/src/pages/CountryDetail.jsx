import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
export function CountryDetail() {
  const { id } = useParams();
  const [country, setCountry] = useState()

  useEffect(() => {
    async function loadCountry() {

      const response = await fetch(
        `http://localhost:3000/countries/${id}`
      )
      const result = await response.json()
      setCountry(result.data)
    }
    loadCountry()
  }, [id])


  if (!id) {
    return (
      <main>
        <p>Không tìm thấy thông tin quốc gia.</p>
        <Link to="/countries">Quay lại danh sách</Link>
      </main>
    );
  }

  if (!country) {
    return <p>Đang tải...</p>;
  }
  return (
    <main>
      <h2>Day la chi tiet cua {country.country}</h2>
      <Link to="/countries">Quay lại danh sách</Link>
    </main>
  );
}
