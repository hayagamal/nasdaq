# Nasdaq Stocks Application

This is a web application built with **React.js** and **TypeScript** that allows users to explore stocks listed on the **Nasdaq** exchange. Users can search for stocks by **ticker symbol** or **company name**, and load more stocks by clicking `Load more` button and they scroll through the data. The app uses **SWR** for caching and fetching stock data, **CSS** for styling, and **CSS variables** for a consistent design system. Additionally, **`useReducer`** is used to manage the application’s state, especially handling URL changes, setting search terms and cursor pagination.

## Features

- **Display Stocks**: View all stocks listed on the Nasdaq exchange, including their ticker symbol and company name.
- **Search**: Search for stocks by **ticker symbol** or **company name**. The search feature triggers a backend search and filters the displayed stocks.
- **Load More**: Users can click the **Load More** button to load additional stocks (pagination). This fetches the next set of stock data using cursor-based pagination.
- **Caching**: The data is cached using **SWR** to minimize redundant network requests and improve performance.
- **Responsive UI**: The user interface is styled with **CSS**, and **CSS variables** are used to ensure a consistent design system across the application.
- **State Management**: **`useReducer`** is used to manage state changes, particularly handling URL changes from the `baseUrl` to `next_url` for cursor-based pagination.

---

## Technologies Used

- **React.js**
- **TypeScript**
- **SWR**
- **CSS**
- **CSS Variables**
- **JEST**

---

## Setup Instructions

### Prerequisites

- **Node.js** (version 16 or above recommended)
- **npm** or **yarn** as the package manager

### Installation Steps

1. **Clone the repository**:
   ```bash
   git clone git@github.com:hayagamal/nasdaq-thndr.git
   cd my-app
   npm run start
   
