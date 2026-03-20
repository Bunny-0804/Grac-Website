ALTER TABLE task_resources DROP COLUMN archieve_name;
ALTER TABLE task_resources DROP CONSTRAINT task_resources_member_id_fkey;
ALTER TABLE task_resources ADD CONSTRAINT task_resources_member_id_fkey FOREIGN KEY (member_id) REFERENCES club_member(member_id) ON DELETE NO ACTION; 