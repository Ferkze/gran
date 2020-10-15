CREATE TABLE users (
	user_id NOT NULL int PRIMARY KEY,
	name NOT NULL CHAR(50),
	email NOT NULL CHAR(50),
	password_hash NOT NULL CHAR(50),
	date_of_birth NOT NULL DATE,
	gender NOT NULL CHAR(10),
	created_at NOT NULL TIMESTAMP,
	updated_at NOT NULL TIMESTAMP,
	deleted_at NOT NULL TIMESTAMP
);

CREATE TABLE transactions (
	transaction_id NOT NULL int PRIMARY KEY,
	value NOT NULL NUMERIC(10, 2),
	category_id int,
	account_id int,
	created_at NOT NULL TIMESTAMP,
	updated_at NOT NULL TIMESTAMP,
	deleted_at NOT NULL TIMESTAMP
);

CREATE TABLE categories (
	category_id NOT NULL int PRIMARY KEY,
	name NOT NULL CHAR(50),
	created_at NOT NULL TIMESTAMP,
	updated_at NOT NULL TIMESTAMP,
	deleted_at NOT NULL TIMESTAMP
);

CREATE TABLE accounts (
	account_id NOT NULL int PRIMARY KEY,
	name NOT NULL CHAR(50),
	owner_id NOT NULL int,
	institution_id int,
	type NOT NULL CHAR(50),
	created_at NOT NULL TIMESTAMP,
	updated_at NOT NULL TIMESTAMP,
	deleted_at NOT NULL TIMESTAMP
);

CREATE TABLE institutions (
	institution_id NOT NULL int PRIMARY KEY,
	name NOT NULL CHAR(50),
	type NOT NULL CHAR(50),
	created_at NOT NULL TIMESTAMP,
	updated_at NOT NULL TIMESTAMP,
	deleted_at NOT NULL TIMESTAMP
);