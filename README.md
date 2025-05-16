# Friday Cinemas

![alt text](public/favicon/apple-icon-180x180.png)

## 💻 Tech Stack:

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React](https://img.shields.io/badge/zustand-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
[![TailwindCSS](https://img.shields.io/badge/Tailwind%20CSS-%2338B2AC.svg?logo=tailwind-css&logoColor=white)](#)
[![Axios](https://img.shields.io/badge/axios.js-854195?style=for-the-badge&logo=axios&logoColor=5A29E4)](#)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=fff)](#)
![Vittest](https://img.shields.io/badge/-vitest-6e9f18?style=flat&logo=vitest&logoColor=ffffff)
![Prettier](https://img.shields.io/badge/prettier-%23F7B93E.svg?style=for-the-badge&logo=prettier&logoColor=black)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)

---

## API Source:

https://www.themoviedb.org/

## Preview

- Home (Web)

<img src="public/markdown/home.png" alt="Home Page" height="300px">

- Home (Mobile)

<img src="public/markdown/home-mobile.png" alt="Home Mobile" height="500px">

- SideBar (Mobile)

<img src="public/markdown/sidebar.png" alt="Sidebar" height="500px">

- Hovering Movie Card

<img src="public/markdown/hovering-card.png" alt="Hover" height="300">

- Movie Detail Page

<img src="public/markdown/movies-detail.png" alt="Movie Details" height="300">

- Search Page

<img src="public/markdown/search.png" alt="Search Page" height="300">

- Pagination Button

<img src="public/markdown/pagination.png" alt="Pagination" height="300px">

## Unit Test

![Unit Testing](public/markdown/unit-test.png)

## Installation:

This guide explains how to install Vitest using PNPM and how to run tests in your project.

---

## Prerequisites

- Node.js version >= 18.0.0
- Vite version >= 5.0.0
- PNPM installed globally (if not, install it via `npm install -g pnpm`)

---

1. Clonning This Project

```
git clone https://github.com/septalonika/Friday-Cinemas.git
```

Once it's clonned, you will need to move to the folder repository on your local device

```
cd Friday-Cinemas
```

2. Install Dependendecies

```
pnpm install
```

3. Once you're done with the development, you will need to add your progress and commit it based on the changes you've made

```
git add (changed file) // sample file index.html

git commit -m "update message" // sample commit "Adding Header"

git push origin dev

```

4. Merge it into main branch for the production build

```
git fetch
git checkout main
git pull origin main
git pull origin dev --no-rebase // if you're facing any conflicts, you will need to resolve it manually
git commit -m "Merge dev into main"
git push origin main
```

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
