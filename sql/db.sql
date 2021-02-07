    CREATE TABLE IF NOT EXISTS user(
        id text PRIMARY KEY,
        name text ,
        email text,
        password text
    );

    CREATE TABLE IF NOT EXISTS product(
        id text PRIMARY KEY,
        name text,
        category text,
        priece double precision,
        stock integer
    );
