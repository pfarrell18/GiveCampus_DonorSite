 create table institutions(
    id SERIAL PRIMARY KEY,
    institution TEXT,
    city VARCHAR,
    state VARCHAR,
    imgsrc TEXT
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
    institution_id INTEGER REFERENCES institutions(id), 
    email TEXT,
    amount DECIMAL,
    date DATE
);

create table pledges(
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    email TEXT,
    name TEXT,
    institution_id INTEGER REFERENCES institutions(id), 
    match_amount DECIMAL,
    divisor DECIMAL,
    cap DECIMAL,
    start_date DATE,
    end_date DATE,
    donor_based BOOLEAN,
    date DATE
);



insert into institutions (institution, city, state, imgsrc)
VALUES 
('University of Chicago', 'Chicago', 'IL', 'https://d3qi0qp55mx5f5.cloudfront.net/shared-resources/i/template/uc_wordmark_hires.gif'),
('University of Vermont', 'Burlington', 'VT', 'https://www.uvm.edu/sites/default/files/UVMLogoSolidBlackstacked.png'),
('Johns Hopkins University', 'Baltimore', 'MD', 'https://brand.jhu.edu/assets/uploads/sites/5/2016/01/university.logo_.small_.vertical.black_.png'),
('University of Georgia', 'Athens', 'GA', 'https://brand.uga.edu/wp-content/uploads/GEORGIA-FS-2CR-1024x335.png'),
('Rice University', 'Houston', 'TX', 'https://www.greatvaluecolleges.net/wp-content/uploads/2019/05/rice-university.png');