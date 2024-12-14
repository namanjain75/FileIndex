const express = require('express');
const path = require('path');
const multer = require('multer');
const serveIndex = require('serve-index');
const fs = require('fs');
require('dotenv').config();
const port =process.env.SERVER_PORT

const app = express();
const folderToShare = path.join(__dirname, './shared');
const uploadPassword = process.env.UPLOAD_PASSWORD;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, folderToShare);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

app.use(express.urlencoded({ extended: true }));

app.use(
  '/files',
  express.static(folderToShare),
  serveIndex(folderToShare, {
    icons: true,
    template: (locals, callback) => {
      const fileList = locals.fileList
        .map((file) => {
          const fileType = path.extname(file.name) || 'Folder';
          const fileLink = locals.directory + file.name;

          if (file.stat.isDirectory()) {
            return `
              <tr class="file-row">
                <td class="file-name"><a href="${fileLink}/">${file.name}</a></td>
                <td>-</td>
                <td class="file-type">Folder</td>
                <td><a href="${fileLink}/" class="visit-btn">Visit</a></td>
              </tr>`;
          } else {
            const isViewable = ['.pdf', '.txt', '.html', '.jpg', '.png'].includes(fileType.toLowerCase());
            return `
              <tr class="file-row">
                <td class="file-name"><a href="${fileLink}" ${isViewable ? '' : 'download'}>${file.name}</a></td>
                <td>${file.stat.size} bytes</td>
                <td class="file-type">${fileType}</td>
                <td><a href="${fileLink}" download class="download-btn">Download</a></td>
              </tr>`;
          }
        })
        .join('');

      const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>File Index</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f4f4f9;
            }
            header {
              background-color: #4CAF50;
              color: white;
              padding: 15px;
              text-align: center;
            }
            nav {
              text-align: center;
              margin: 10px 0;
            }
            nav a {
              text-decoration: none;
              color: #4CAF50;
              margin: 0 10px;
              font-size: 18px;
            }
            nav a:hover {
              text-decoration: underline;
            }
            table {
              width: 90%;
              margin: 20px auto;
              border-collapse: collapse;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              background-color: white;
            }
            table th, table td {
              padding: 12px;
              text-align: left;
              border-bottom: 1px solid #ddd;
            }
            table th {
              background-color: #4CAF50;
              color: white;
            }
            .search-bar {
              width: 90%;
              margin: 20px auto;
              display: flex;
              justify-content: center;
            }
            .search-bar input {
              width: 100%;
              padding: 10px;
              border: 1px solid #ddd;
              border-radius: 4px;
              font-size: 16px;
            }
            .file-row:hover {
              background-color: #f1f1f1;
            }
            .visit-btn, .download-btn {
              color: white;
              padding: 6px 12px;
              text-decoration: none;
              border-radius: 4px;
            }
            .visit-btn {
              background-color: #2196F3;
            }
            .download-btn {
              background-color: #4CAF50;
            }
            footer {
              background-color: #333;
              color: white;
              text-align: center;
              padding: 10px;
              position: fixed;
              bottom: 0;
              width: 100%;
            }
          </style>
        </head>
        <body>
          <header>
            <h1>File Index</h1>
          </header>
          <nav>
            <a href="/">Home</a>
            <a href="/upload">Upload File</a>
          </nav>
          <div class="search-bar">
            <input type="text" id="searchInput" placeholder="Search for files...">
          </div>
          <table>
            <thead>
              <tr>
                <th>File Name</th>
                <th>Size</th>
                <th>Type</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody id="fileTableBody">
              ${fileList}
            </tbody>
          </table>
          <footer>
            <p>Created by Naman Jain &copy; ${new Date().getFullYear()}</p>
          </footer>
          <script>
            document.getElementById('searchInput').addEventListener('input', function () {
              const filter = this.value.toLowerCase();
              const rows = document.querySelectorAll('.file-row');
              rows.forEach(row => {
                const fileName = row.querySelector('.file-name').textContent.toLowerCase();
                row.style.display = fileName.includes(filter) ? '' : 'none';
              });
            });
          </script>
        </body>
        </html>
      `;

      callback(null, html);
    },
  })
);

// Home Page
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Home</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f4f4f9;
          text-align: center;
        }
        header {
          background-color: #4CAF50;
          color: white;
          padding: 20px;
        }
        .content {
          margin-top: 30px;
        }
        .content a {
          display: inline-block;
          padding: 15px 25px;
          margin: 10px;
          text-decoration: none;
          color: white;
          background-color: #4CAF50;
          border-radius: 5px;
          font-size: 18px;
        }
        .content a:hover {
          background-color: #45a049;
        }
        footer {
          background-color: #333;
          color: white;
          text-align: center;
          padding: 10px;
          position: fixed;
          bottom: 0;
          width: 100%;
        }
      </style>
    </head>
    <body>
      <header>
        <h1>Welcome to the File Manager</h1>
      </header>
      <div class="content">
        <a href="/files">View Files</a>
        <a href="/upload">Upload Files</a>
      </div>
      <footer>
        <p>Created by Naman Jain &copy; ${new Date().getFullYear()}</p>
      </footer>
    </body>
    </html>
  `);
});

// Upload Page
app.get('/upload', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Upload File</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f4f4f9;
          text-align: center;
        }
        header {
          background-color: #4CAF50;
          color: white;
          padding: 20px;
        }
        nav {
          text-align: center;
          margin: 10px 0;
        }
        nav a {
          text-decoration: none;
          color: #4CAF50;
          margin: 0 10px;
          font-size: 18px;
        }
        nav a:hover {
          text-decoration: underline;
        }
        .content {
          margin-top: 30px;
        }
        form {
          margin-top: 30px;
          text-align: left;
          display: inline-block;
          padding: 20px;
          background-color: white;
          border-radius: 5px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        form input[type="file"],
        form input[type="password"] {
          padding: 10px;
          width: 250px;
          margin: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
        form button {
          padding: 12px 25px;
          background-color: #4CAF50;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 18px;
        }
        form button:hover {
          background-color: #45a049;
        }
        footer {
          background-color: #333;
          color: white;
          text-align: center;
          padding: 10px;
          position: fixed;
          bottom: 0;
          width: 100%;
        }
      </style>
    </head>
    <body>
      <header>
        <h1>Upload File</h1>
      </header>
      <nav>
        <a href="/">Home</a>
        <a href="/files">View Files</a>
      </nav>
      <div class="content">
        <form action="/upload" method="POST" enctype="multipart/form-data">
          <label for="password">Password:</label>
          <input type="password" name="password" required />
          <br />
          <input type="file" name="file" required />
          <br />
          <button type="submit">Upload</button>
        </form>
      </div>
      <footer>
        <p>Created by Naman Jain &copy; ${new Date().getFullYear()}</p>
      </footer>
    </body>
    </html>
  `);
});

app.post('/upload', upload.single('file'), (req, res) => {
  const { password } = req.body;
  if (password !== uploadPassword) {
    return res.status(403).send('Invalid password.');
  }

  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  res.send(`File uploaded successfully: <a href="/files/${req.file.filename}">${req.file.filename}</a>`);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
