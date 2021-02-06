    CREATE TABLE IF NOT EXISTS users(
        id text PRIMARY KEY,
        name text ,
        email text,
        password text
    );

    CREATE TABLE IF NOT EXISTS products(
        id text PRIMARY KEY,
        name text,
        category text,
        priece double precision,
        stock integer
    );
