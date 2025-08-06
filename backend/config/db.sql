CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    long_description TEXT NOT NULL,
    website_url TEXT,
    image_urls TEXT[],
    tags TEXT[],
    is_featured BOOLEAN DEFAULT FALSE
);

CREATE TABLE experience (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    start_date TEXT,
    end_date TEXT,
    position TEXT NOT NULL,
    icon_path TEXT,
    description TEXT[]
);

CREATE TABLE education (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    start_date TEXT,
    end_date TEXT,
    position TEXT,
    icon_path TEXT,
    description TEXT[]
);

CREATE TABLE contacts (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  submitted_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
