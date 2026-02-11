CREATE TABLE applicants ( applicant_id SERIAL PRIMARY KEY,
                          password_hash VARCHAR(255) NOT NULL,
                          applicant_roll_no VARCHAR(20) UNIQUE NOT NULL,
                          applicant_email VARCHAR(100) UNIQUE NOT NULL,
                          application_time_stamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                        );

ALTER TABLE club_member ADD COLUMN club_joining TIMESTAMP;
CREATE TYPE member_status AS ENUM('active','left');
ALTER TABLE club_member ADD COLUMN status member_status DEFAULT 'active';