ALTER TABLE task_resources ALTER COLUMN resource_id SET NOT NULL;
ALTER TABLE task_resources ADD CONSTRAINT unique_resource_id UNIQUE(resource_id);
ALTER TABLE task_resources ADD COLUMN member_id INT REFERENCES club_member (member_id) ON DELETE SET NULL DEFAULT NULL ;
ALTER TABLE task_resources ADD COLUMN archieve_name VARCHAR(100) DEFAULT NULL; --for remembering the member name even on deletion of the member