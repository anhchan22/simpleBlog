- Trong `index.js`:
```node
const express = require("express");
const cors = require("cors");
const { BlogPosts } = require("./BlogPosts");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Các API sẽ viết tại đây

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
```
Chú ý thứ tự: `app.use(express.json())` phải được khai báo trước các route cần sử dụng middleware đó.