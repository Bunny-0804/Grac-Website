--fix delete relations 

ALTER TABLE task_assignment DROP CONSTRAINT task_assignment_member_id_fkey; --remove old constraint
ALTER TABLE task_assignment ADD CONSTRAINT task_assignment_member_id_fkey FOREIGN KEY (member_id) REFERENCES club_member(member_id) ON DELETE SET NULL; --set new constraint

ALTER TABLE task_resources DROP CONSTRAINT task_resources_task_id_fkey; --remove old constraint
ALTER TABLE task_resources ADD CONSTRAINT task_resources_task_id_fkey FOREIGN KEY (task_id) REFERENCES task(task_id) ON DELETE NO ACTION; --set new constraint
--trigger function to ensure tasks cant be deleted if resources are still allocated to them 
CREATE OR REPLACE function check_resource_allocation()
RETURNS TRIGGER AS $$
BEGIN
    IF EXISTS( SELECT 1 FROM task_resources WHERE task_id = OLD.task_id AND resource_id IS NOT NULL) THEN RAISE EXCEPTION 'Cant delete task %: resources are still allocated',OLD.task_id;
    ELSE
        DELETE FROM task_resources WHERE task_id = OLD.task_id;
    END IF;
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE trigger delete_task
BEFORE DELETE ON task 
FOR EACH ROW 
EXECUTE FUNCTION check_resource_allocation();

--Add completion measure to tasks 
CREATE TYPE measures AS ENUM('completed' , 'assigned' , 'unassigned' , 'archived');
ALTER TABLE task ADD COLUMN completion measures NOT NULL DEFAULT 'unassigned';
ALTER TABLE task ADD COLUMN completion_weightage INT NOT NULL DEFAULT 3; --weightage for completion percentage 