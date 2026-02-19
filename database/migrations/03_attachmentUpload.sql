ALTER TABLE task_attachment ADD COLUMN member_id INT REFERENCES club_member (member_id) ON DELETE SET NULL;
UPDATE task_attachment SET member_id = 1 WHERE attachment_id = 1;
UPDATE task_attachment SET member_id = 2 WHERE attachment_id = 2;
ALTER TABLE task_attachment ALTER COLUMN member_id SET NOT NULL;