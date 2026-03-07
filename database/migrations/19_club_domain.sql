ALTER TABLE club_member ADD COLUMN domain domains DEFAULT 'technical';
UPDATE club_member SET domain = 'technical' WHERE domain IS NULL;
ALTER TABLE club_member ALTER COLUMN domain SET NOT NULL;