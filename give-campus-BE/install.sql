
create table institutions(
    id SERIAL PRIMARY KEY,
    name TEXT,
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
    user INTEGER REFERENCES users(id),
    name TEXT,
    amount DECIMAL,
    institution TEXT,
    date DATE
);

create table pledges(
    id SERIAL PRIMARY KEY,
    user INTEGER REFERENCES users(id),
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

