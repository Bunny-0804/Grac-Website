CREATE TYPE applicant_status AS ENUM('accepted' , 'rejected' , 'pending');
CREATE TYPE domains AS ENUM ('marketing' , 'technical');

ALTER TABLE applicants ADD COLUMN status applicant_status DEFAULT 'pending';
ALTER TABLE applicants ADD COLUMN domain domains;
ALTER TABLE applicants ADD COLUMN application_url TEXT;

UPDATE applicants SET status = 'pending' WHERE status IS NULL;
UPDATE applicants SET domain = 'technical' WHERE domain IS NULL;
UPDATE applicants SET application_url = 'hfaksdjhf.com' WHERE application_url IS NULL;

ALTER TABLE applicants ALTER COLUMN status SET NOT NULL;
ALTER TABLE applicants ALTER COLUMN domain SET NOT NULL;
ALTER TABLE applicants ALTER application_url SET NOT NULL;