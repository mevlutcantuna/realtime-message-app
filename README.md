# Realtime Chat App

A full-stack realtime messaging app. Users sign in with email/password or Google, create or join chat rooms, and exchange messages instantly over WebSockets.

- **Live client:** https://message-app-realtime-mct.netlify.app/
- **Live server:** https://realtime-message-app.herokuapp.com/

## Features

- Email/password and Google authentication (Firebase Auth)
- Create and delete chat rooms
- Send and receive messages in realtime via Socket.io
- Persistent message and room history (MongoDB)
- Protected routes — chat is only accessible when signed in

## Tech Stack

**Client** (`/client`)
- React + TypeScript
- Redux Toolkit for state management
- Firebase for authentication
- Socket.io-client for realtime messaging
- Formik for form handling
- AntDesign, PrimeReact, PrimeFlex for UI
- React Hot Toast for notifications

**Server** (`/server`)
- Node.js + Express
- Socket.io for realtime events
- MongoDB + Mongoose
- Deployed on Heroku

## Project Structure

```
.
├── client/               # React/TypeScript frontend
│   └── src/
│       ├── app/          # App root, routing, Firebase & Redux store setup
│       ├── components/   # Shared components (Header, Layout, PrivateRoute, ...)
│       ├── features/     # Feature slices: chat, room, user (Redux + UI)
│       ├── lib/          # API client and utilities
│       └── types/        # Shared TypeScript types
└── server/               # Node/Express backend
    └── app/
        ├── controller/   # Route handlers (room, message)
        ├── model/        # Mongoose schemas (Room, Message)
        ├── router/       # Express routers
        └── index.js      # App entry point, DB connection, Socket.io setup
```

## How It Works

- Rooms and messages are stored in MongoDB via REST endpoints (`/room`, `/all-rooms`, `/room/:id`, `/send-message`, `/room-messages/:id`).
- Room creation/deletion and new messages are additionally broadcast over Socket.io (`create-room`, `delete-room`, `send-message` events) so every connected client updates instantly without polling.
- Firebase handles authentication on the client; `PrivateRoute` guards the main chat layout so only authenticated users can access rooms.

## Getting Started

### Prerequisites

- Node.js
- A MongoDB instance (connection string)
- A Firebase project (for authentication)

### Server setup

```bash
cd server
yarn install
```

Create a `.env` file in `/server` with:

```
DB_URL=<your MongoDB connection string>
```

Run it:

```bash
yarn dev    # nodemon, for local development
yarn start  # plain node
```

### Client setup

```bash
cd client
yarn install
```

Create a `.env` file in `/client` with your Firebase config:

```
REACT_APP_API_KEY=
REACT_APP_AUTH_DOMAIN=
REACT_APP_PROJECT_ID=
REACT_APP_STORAGE_BUCKET=
REACT_APP_MESSAGING_SENDER_ID=
REACT_APP_APP_ID=
```

Run it:

```bash
yarn start
```

The client runs at `http://localhost:3000` and expects the server to be reachable for both REST calls and the Socket.io connection.
