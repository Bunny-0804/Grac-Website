const activeEvents =    `SELECT e.event_id ,
                                e.event_start_date ,
                                e.event_end_date ,
                                p.project_id , 
                                p.project_name , 
                                p.project_description
                        FROM event e
                        LEFT JOIN project p ON p.project_id = e.project_id
                        WHERE e.event_start_date <= CURRENT_DATE AND e.event_end_date >= CURRENT_DATE`

module.exports = {
    activeEvents
}