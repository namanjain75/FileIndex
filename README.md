
# Basic Server-Index Program on Node.js

## Description
This is a simple Node.js server that serves files from a shared folder and provides a directory listing with a search and download functionality. Users can search for specific files, view file details, and download them directly from the browser.

## Features
- List all files in the "shared" folder.
- Search for files by name.
- Download files directly via a download button.
- Clean and responsive UI with file size display.
  
## Prerequisites
- Node.js installed on your machine.

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

## Usage

1. Place all the files you want to list in the `shared` folder inside the project directory.
   
2. Run the server:
   ```bash
   node server.js
   ```

3. Open your browser and visit:
   ```
   http://localhost:3000/files/
   ```

4. You can search for files using the search bar and click on the download button to download any file.

## Example

Once the server is running, you can access the shared files directory at:
```
http://localhost:3000/files/
```

## Created by
**Naman Jain**  
*Created on: 12 Dec 2024*
