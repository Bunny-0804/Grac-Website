CREATE TABLE event_projects(    ep_id SERIAL PRIMARY KEY , 
                                event_id INT NOT NULL , 
                                project_id INT NOT NULL ,
                                FOREIGN KEY (event_id) REFERENCES event (event_id) ON DELETE CASCADE ,
                                FOREIGN KEY (project_id) REFERENCES project (project_id) ON DELETE CASCADE
);

INSERT INTO event_projects (event_id , project_id) 
SELECT event_id , project_id FROM event;

ALTER TABLE event DROP COLUMN project_id;


ALTER TABLE event ADD COLUMN event_name VARCHAR(100);
ALTER TABLE event ADD COLUMN event_description TEXT;
UPDATE event
SET 
    event_name = 'Project Event #' || event_id,
    event_description = 'System generated description for event record ' || event_id
WHERE event_id BETWEEN 1 AND 25;