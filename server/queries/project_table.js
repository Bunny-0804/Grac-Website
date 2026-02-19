const getProjects =     `SELECT project_id,
                                project_name,
                                project_description,
                                project_start_date,
                                project_end_date 
                        FROM project 
                        WHERE project_end_date >= CURRENT_DATE AND project_start_date <= CURRENT_DATE`

const getProjectDetails =   `SELECT t.task_id,
                                    t.task_description,
                                    t.task_assignment_date,
                                    t.task_due_date,
                                    COALESCE(members_lat.data , '[]') AS assigned_members,
                                    COALESCE(attachment_lat.data,'[]') AS attachment,
                                    COALESCE(resources_lat.data,'[]') AS resources
                            FROM task t

                            --members_lat: lateral left join for member names as a object
                            LEFT JOIN LATERAL 
                            ( SELECT json_agg( json_build_object( 'member_name', m.member_name)) AS data
                              FROM task_assignment ta
                              LEFT JOIN club_member m ON m.member_id = ta.member_id
                              WHERE ta.task_id = t.task_id ) members_lat ON TRUE 

                            --attachment_lat.data: lateral left join for task_attachment details as a object
                            LEFT JOIN LATERAL
                            ( SELECT json_agg(json_build_object( 'file_name' , tat.file_name , 'file_type' , tat.file_type , 'file_url' , tat.file_url , 'file_author' , mc.member_name , 'file_uploaded_at' , tat.file_uploaded_at)) AS data
                              FROM task_attachment tat
                              LEFT JOIN club_member mc ON mc.member_id = tat.member_id
                              WHERE tat.task_id = t.task_id) attachment_lat ON TRUE
                            
                            --resource_lat.data: lateral left join for task_resources as a object
                            LEFT JOIN LATERAL 
                            ( SELECT json_agg( json_build_object( 'resource_name', r.resource_name , 'member_name' , cmc.member_name)) AS data
                              FROM task_resources tr
                              LEFT JOIN resource r ON r.resource_id = tr.resource_id
                              LEFT JOIN club_member cmc ON cmc.member_id = tr.member_id
                              WHERE tr.task_id = t.task_id ) resources_lat ON TRUE 
                            WHERE t.project_id = ($1)`

const project_lookup = `SELECT  p.project_id,
                                p.project_name,
                                p.project_description,
                                t.task_id,
                                t.task_description,
                                t.task_assignment_date,
                                t.task_due_date,
                                COALESCE(attachment_lat.data,'[]') AS attachments,
                                COALESCE(resource_lat.data,'[]') AS resources
                                FROM task_assignment ta 
                                JOIN task t ON t.task_id = ta.task_id
                                JOIN project p ON p.project_id = t.project_id
                                --attachment_lat.data: lateral left join for task_attachment details as a object
                                LEFT JOIN LATERAL
                                ( SELECT json_agg(json_build_object( 'file_name' , tat.file_name , 'file_type' , tat.file_type , 'file_url' , tat.file_url , 'file_author' , mc.member_name , 'file_uploaded_at' , tat.file_uploaded_at)) AS data
                                  FROM task_attachment tat
                                  LEFT JOIN club_member mc ON mc.member_id = tat.member_id
                                  WHERE tat.task_id = ta.task_id) attachment_lat ON TRUE
                                --resource_lat.data: lateral left join for task_resources as a object
                                LEFT JOIN LATERAL 
                                ( SELECT json_agg( json_build_object( 'resource_name', r.resource_name , 'member_name' , cmc.member_name)) AS data
                                  FROM task_resources tr
                                  LEFT JOIN resource r ON r.resource_id = tr.resource_id
                                  LEFT JOIN club_member cmc ON cmc.member_id = tr.member_id
                                  WHERE tr.task_id = ta.task_id ) resource_lat ON TRUE 
                                WHERE ta.member_id = ($1)`;

module.exports = {
    getProjects,
    getProjectDetails , 
    project_lookup
} ;