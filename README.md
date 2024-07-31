# NextJS React For Students Management

This project is a NextJS application that primarily utilizes React and client-side components, making REST requests to a backend service.

## Features

- Built with NextJS for optimal performance and SEO
- Focuses on client-side rendering using React components
- Makes REST API calls to a backend service for data fetching
- Demonstrates effective use of React hooks and state management with Context API

## Getting Started

### Prerequisites

- Node.js (version lts)
- npm or yarn

### Installation

1. Clone the repository:
   
   git clone https://github.com/Mandy9943/students-management-front
   

2. Navigate to the project directory:
   
   cd students-management-front
   

3. Install dependencies:
   
   npm install
   # or
   yarn install
   

4. Start the development server:
   
   npm run dev
   # or
   yarn dev
   

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## API Integration

This app uses Axios for making REST requests to the backend service. The main configuration for the Axios instance is located in `services/index.ts`. To use the API, make sure to set the `NEXT_PUBLIC_API_URL` environment variable.


NEXT_PUBLIC_API_URL=http://localhost:5050


This will ensure that the Axios instance is correctly configured with the base URL for your API.


## Deployment

To deploy your app, follow the [NextJS deployment documentation](https://nextjs.org/docs/deployment).

