/**
 * Git Hub Link
 *
 * Created on : 12 Dec 2024
 * Description : Basic Server-Index Program on Node.js with File Search and Download Features.
 * To run the program, type the following commands in the terminal:
 * 1) npm install :- to install all dependencies.
 * 2) node server.js
 *
 * Place all the files you want to list in the "shared" folder.
 * Users can view files in a directory listing, search for specific files, and download them directly.
 * To check if the server is running, visit http://localhost:3000/files/.
 *
 * Created by Naman Jain
 */

// Import the required modules
const express = require('express');
const path = require('path');
const serveIndex = require('serve-index'); // Import serve-index

// Initialize the app
const app = express();

// Define the folder to share
const folderToShare = path.join(__dirname, './shared');

/**
 * Middleware to serve static files and enable directory indexing with a custom template.
 * The template includes a search bar, a download button for each file, and an enhanced UI layout.
 */
app.use(
  '/files',
  express.static(folderToShare),
  serveIndex(folderToShare, {
    icons: true,
    template: (locals, callback) => {
      // Generate file rows with search functionality
      const fileList = locals.fileList
        .map(
          (file) => `
            <tr class="file-row">
              <td class="file-name">${file.name}</td>
              <td>${file.stat.size} bytes</td>
              <td><a href="${locals.directory}${file.name}" download class="download-btn">Download</a></td>
            </tr>`
        )
        .join('');

      // HTML template with search bar and styled file table
      const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>File Index</title>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f9f9f9;
              color: #333;
            }
            header {
              background-color: #4CAF50;
              color: white;
              text-align: center;
              padding: 1rem 0;
            }
            .search-bar {
              margin: 20px auto;
              text-align: center;
            }
            input[type="text"] {
              padding: 10px;
              width: 60%;
              font-size: 16px;
              border: 1px solid #ccc;
              border-radius: 5px;
            }
            table {
              width: 80%;
              margin: 20px auto;
              border-collapse: collapse;
              background: white;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            th, td {
              border: 1px solid #ddd;
              padding: 12px;
              text-align: left;
            }
            th {
              background-color: #f4f4f4;
            }
            tr:nth-child(even) {
              background-color: #f9f9f9;
            }
            tr:hover {
              background-color: #f1f1f1;
            }
            .download-btn {
              display: inline-block;
              padding: 5px 10px;
              background-color: #4CAF50;
              color: white;
              text-decoration: none;
              border-radius: 3px;
            }
            .download-btn:hover {
              background-color: #45a049;
            }
            footer {
              text-align: center;
              margin: 20px 0;
              color: #666;
            }
          </style>
          <script>
            // JavaScript function to filter files based on the search query
            function filterFiles() {
              const query = document.getElementById('searchInput').value.toLowerCase();
              const rows = document.querySelectorAll('.file-row');

              rows.forEach(row => {
                const fileName = row.querySelector('.file-name').textContent.toLowerCase();
                row.style.display = fileName.includes(query) ? '' : 'none';
              });
            }
          </script>
        </head>
        <body>
          <header>
            <h1>File Index</h1>
          </header>
          <div class="search-bar">
            <input id="searchInput" type="text" placeholder="Search files..." onkeyup="filterFiles()" />
          </div>
          <table>
            <thead>
              <tr>
                <th>File Name</th>
                <th>Size</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${fileList}
            </tbody>
          </table>
          <footer>
            <p>&copy; 2024 File Server by Naman Jain</p>
          </footer>
        </body>
        </html>
      `;

      callback(null, html);
    },
  })
);

// Set up a basic route
app.get('/', (req, res) => {
  res.send(
    `<h1>Welcome</h1><p>Access shared files at <a href="/files">/files</a></p>`
  );
});

// Start the server
const PORT = 3000; // Port on which the service is running
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  console.log(`Shared folder is accessible at http://localhost:${PORT}/files`);
});
