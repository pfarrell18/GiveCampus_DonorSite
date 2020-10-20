 create table institutions(
    id SERIAL PRIMARY KEY,
    email TEXT,
    institution TEXT,
    city VARCHAR,
    state VARCHAR
);

create table users(
    id SERIAL PRIMARY KEY,
    name TEXT,
    card_number INTEGER,
    zipcode TEXT,
    institution INTEGER REFERENCES institutions(id)
);


create table donations(
    id serial primary key,
    user_id INTEGER REFERENCES users (id),
    email TEXT,
    amount DECIMAL,
    institution TEXT,
    date DATE
);

create table pledges(
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    email TEXT,
    name TEXT,
    institution TEXT,
    match_amount DECIMAL,
    divisor DECIMAL,
    cap DECIMAL,
    start_date DATE,
    end_date DATE,
    donor_based BOOLEAN,
    date DATE
);

