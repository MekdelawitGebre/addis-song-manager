# Addis Software Test Project – Song Manager

This project is a full-stack application for managing a list of songs. The frontend is built with React and interacts with a REST API (mocked using MirageJS) to perform CRUD operations on songs.

---

## Features

- **Paginated list of songs** (title, artist, album, year)
- **CRUD operations**: Create, Read, Update, Delete via API calls
- **Responsive design** using Emotion
- **Global state management** with Redux Toolkit and Redux-Saga
- **Custom toast notifications** for user feedback

---

## Technologies Used

- **ReactJS** (functional components)
- **Redux Toolkit** & **Redux-Saga**
- **Emotion** (for styling)
- **MirageJS** (mock backend)
- **Webpack** (manual configuration, no CRA)
- **TypeScript**
- **dotenv-webpack** (for environment variables)

---

## Setup Instructions

1. **Clone the repository:**

   ```sh
   git clone https://github.com/MekdelawitGebre/addis-song-manager.git
   cd addis-song-manager
   ```

2. **Create a `.env` file in the project root:**

   ```env
   API_BASE_URL=/api/songs
   ```

   - For production or custom API, set the appropriate URL.

3. **Install dependencies:**

   ```sh
   npm install
   ```

4. **Start the development server:**

   ```sh
   npm start
   ```

   The app will run at [http://localhost:3000](http://localhost:3000).

5. **Build for production:**
   ```sh
   npm run build
   ```

---

## API Endpoints (MirageJS Mock Server)

All API calls are intercepted and handled by MirageJS in development mode.

- **GET `/api/songs?page=1&limit=6`**
  Returns a paginated list of songs and the total count.
  ```json
  {
    "songs": [ { "id": "1", "title": "...", ... }, ... ],
    "total": 25
  }
  ```
- **POST `/api/songs`**
  Creates a new song.
  **Body:**
  ```json
  { "title": "...", "artist": "...", "album": "...", "year": 2024 }
  ```
  **Response:** The created song object.
- **PUT `/api/songs/:id`**
  Updates a song by ID.
  **Body:**
  ```json
  { "title": "...", "artist": "...", "album": "...", "year": 2024 }
  ```
  **Response:** The updated song object.
- **DELETE `/api/songs/:id`**
  Deletes a song by ID.
  **Response:** Status 204 on success.

---

## Webpack Configuration

- **Manual setup:** No Create React App (CRA) used.
- **Entry:** `src/index.tsx`
- **Output:** `dist/bundle.js`
- **Loaders:**
  - `babel-loader` for `.ts`/`.tsx` files
  - `style-loader` and `css-loader` for CSS
  - **Custom rule for images and SVGs:**
    ```js
    {
      test: /\.(png|jpe?g|gif|svg)$/i,
      type: 'asset/resource',
    },
    ```
- **Plugins:**
  - `HtmlWebpackPlugin` for HTML template (`public/index.html`)
  - `dotenv-webpack` for loading environment variables from `.env`
- **Dev Server:**
  Runs on port 3000 with hot reloading.
- **Environment Variables:**
  - Set `API_BASE_URL` in  `.env` file for local development.
  

---

## AI Usage

- **AI tools used:** ChatGPT was used for code review, bug fixing, and some code generation (e.g., toast component, MirageJS setup, README drafting).
- **Verification:**
  - All code was reviewed and tested manually in the browser.
  - Debugging was performed using browser dev tools and console logs.
  - MirageJS endpoints were tested via the UI and network tab.

---

## Testing

This project uses **Jest** and **React Testing Library** for unit and component tests.

**To run tests:**

```sh
npm install --save-dev jest ts-jest @types/jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
npm test
```

**Tests are provided in:**

- `src/tests/songsSlice.test.ts`
- `src/tests/SongCard.test.tsx`

---

