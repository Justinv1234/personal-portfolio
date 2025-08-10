CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL
);

CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT NOT NULL,
    long_description TEXT NOT NULL,
    website_url TEXT,
    image_urls TEXT[],
    tags TEXT[],
    is_featured BOOLEAN DEFAULT FALSE
);

CREATE TYPE event_type AS ENUM ('experience', 'education');

CREATE TABLE timeline_events (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    start_date TEXT,
    end_date TEXT,
    position TEXT,
    icon_path TEXT,
    description TEXT[],
    event_type event_type NOT NULL
);

CREATE TABLE contacts (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  submitted_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);