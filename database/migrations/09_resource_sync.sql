CREATE OR REPLACE FUNCTION resource_sync()
RETURNS TRIGGER AS $$
BEGIN
    IF(TG_OP = 'INSERT') THEN 
        UPDATE resource SET resource_status = 'assigned' WHERE resource_id = NEW.resource_id;
    ELSIF(TG_OP = 'UPDATE') THEN 
        UPDATE resource SET resource_status = 'unassigned' WHERE resource_id = OLD.resource_id;
        UPDATE resource SET resource_status = 'assigned' WHERE resource_id = NEW.resource_id;
    ELSEIF(TG_OP = 'DELETE') THEN
        UPDATE resource SET resource_status = 'unassigned' WHERE resource_id = OLD.resource_id;
    END IF;
    
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER sync_resources
AFTER INSERT OR UPDATE OR DELETE ON task_resources
FOR EACH ROW 
EXECUTE FUNCTION resource_sync();