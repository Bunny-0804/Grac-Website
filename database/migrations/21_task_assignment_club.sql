CREATE OR REPLACE FUNCTION task_assign()
RETURNS TRIGGER AS $$
BEGIN
    IF(TG_OP = 'INSERT') THEN
        UPDATE task t SET completion = 'assigned' WHERE t.task_id = NEW.task_id; 
        RETURN NEW;

    ELSE
        UPDATE task t SET completion = 'unassigned' WHERE t.task_id = OLD.task_id;
    END IF;

    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER vote_consistency
BEFORE INSERT OR DELETE ON task_assignment
FOR EACH ROW 
EXECUTE FUNCTION task_assign();