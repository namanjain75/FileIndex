
# Basic Server-Index Program on Node.js

## Description
This is a simple Node.js server that serves files from a shared folder and provides a directory listing with search, upload, and download functionality. Users can:
- Upload files to the server.
- View and search files in the shared directory.
- Download files directly via a download button.
- Navigate easily between different pages using a clean and responsive UI.

## Features
- **File Listing**: List all files in the "shared" folder.
- **Search Functionality**: Search for files by name using the search bar.
- **File Download**: Download files directly from the server via a download button.
- **File Upload**: Upload files to the server securely with password protection.
- **Clean UI**: A user-friendly, responsive interface with file size and type information.
- **Navigation**: Easy navigation between the home page, file view page, and upload page.

## Prerequisites
- [Node.js](https://nodejs.org/) installed on your machine.

## Installation

1. Clone the repository:
   ```bash
   git clone <your-repository-link>
   ```

2. Navigate to the project directory:
   ```bash
   cd <project-directory>
   ```

3. Install the required dependencies:
   ```bash
   npm install
   ```
4. configure the password (Change the password in .env file )
```
UPLOAD_PASSWORD='ENTER_PASSWORD_HERE'
```

## Usage

1. Place all the files you want to list in the `shared` folder inside the project directory.
   
2. Start the server:
   ```bash
   node server.js
   ```

3. Open your browser and visit:
   ```
   http://localhost:3000/
   ```

4. **Home Page**: You will be presented with links to "View Files" and "Upload Files".
   - Click on **View Files** to see a directory of the uploaded files and use the search bar to find specific files.
   - Click on **Upload Files** to upload files securely with a password.

5. You can search for files using the search bar, view file details (name, size, and type), and download any file with a simple click.

## Example

Once the server is running, you can access the shared files directory at:
```
http://localhost:3000/
```
From there, you can upload files, search for them, and download them as needed.

## Created by
**Naman Jain**  
*Created on: 12 Dec 2024*
