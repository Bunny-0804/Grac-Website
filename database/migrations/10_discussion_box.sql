CREATE TYPE tags AS ENUM('Project_idea' , 'Event_idea', 'Resource_request' , 'Help Wanted');
CREATE TYPE flags AS ENUM('up' , 'down' , 'flag');

CREATE TABLE tag(   tag_id SERIAL PRIMARY KEY , 
                    member_id INT ,
                    task_id INT , 
                    project_id INT ,
                    event_id INT , 
                    FOREIGN KEY (member_id) REFERENCES club_member(member_id) ON DELETE SET NULL, 
                    FOREIGN KEY (task_id) REFERENCES task(task_id) ON DELETE SET NULL,
                    FOREIGN KEY (project_id) REFERENCES project(project_id) ON DELETE SET NULL,
                    FOREIGN KEY (event_id) REFERENCES event(event_id) ON DELETE SET NULL
                );

CREATE TABLE discussion_box(    post_id SERIAL PRIMARY KEY ,
                                discussion_header TEXT NOT NULL , 
                                discussion_body TEXT , 
                                discussion_tag tags NOT NULL ,
                                tag_id INT ,
                                member_id INT ,
                                votes INT DEFAULT 0 ,
                                FOREIGN KEY (tag_id) REFERENCES tag(tag_id) ON DELETE SET NULL, 
                                FOREIGN KEY (member_id) REFERENCES club_member(member_id) ON DELETE CASCADE
                            );



CREATE TABLE vote(  vote_id SERIAL PRIMARY KEY , 
                    post_id INT NOT NULL , 
                    member_id INT NOT NULL , 
                    value flags NOT NULL ,
                    FOREIGN KEY (member_id) REFERENCES club_member(member_id) ON DELETE CASCADE,
                    FOREIGN KEY (post_id) REFERENCES discussion_box(post_id) ON DELETE CASCADE,
                    UNIQUE(post_id , member_id)
                );


CREATE OR REPLACE FUNCTION voting()
RETURNS TRIGGER AS $$
BEGIN
    IF(TG_OP = 'INSERT') THEN 
        IF(SELECT 1 FROM vote WHERE post_id = NEW.post_id and member_id = NEW.member_id) THEN 
            RAISE EXCEPTION 'Cant Post new vote , Vote already cast';
        ELSE
            IF(NEW.value = 'up') THEN
                UPDATE discussion_box d SET votes = votes + 1 WHERE d.post_id = NEW.post_id;
            ELSIF(NEW.value = 'down') THEN
                UPDATE discussion_box d SET votes = votes - 1 WHERE d.post_id = NEW.post_id;
            END IF;
            RETURN NEW;
        END IF;

    ELSIF(TG_OP = 'UPDATE') THEN
        IF(OLD.value != NEW.value) THEN
            IF(OLD.value = 'up') THEN
                UPDATE discussion_box d SET votes = votes - 1 WHERE d.post_id = NEW.post_id;
                IF(NEW.value = 'down') THEN
                    UPDATE discussion_box d SET votes = votes - 1 WHERE d.post_id = NEW.post_id;
                END IF;

            ELSIF(OLD.value = 'down') THEN
                UPDATE discussion_box d SET votes = votes + 1 WHERE d.post_id = NEW.post_id;
                IF(NEW.value = 'up') THEN
                    UPDATE discussion_box d SET votes = votes + 1 WHERE d.post_id = NEW.post_id;
                END IF;
            
            ELSE
                IF(NEW.value = 'up') THEN
                    UPDATE discussion_box d SET votes = votes + 1 WHERE d.post_id = NEW.post_id;
                ELSIF(NEW.value = 'down') THEN
                    UPDATE discussion_box d SET votes = votes - 1 WHERE d.post_id = NEW.post_id;
                END IF;
            END IF;
        END IF;
        RETURN NEW;

    ELSE
        IF(OLD.value = 'up') THEN
            UPDATE discussion_box d SET votes = votes - 1 WHERE d.post_id = OLD.post_id;
        ELSIF(OLD.value = 'down') THEN
            UPDATE discussion_box d SET votes = votes + 1 WHERE d.post_id = OLD.post_id;
        END IF;
        RETURN OLD;
    END IF;

    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER vote_consistency
BEFORE INSERT OR UPDATE OR DELETE ON vote
FOR EACH ROW 
EXECUTE FUNCTION voting();