const availableResources = `SELECT resource_id , resource_name FROM resource WHERE resource_status = 'unassigned'`;

const myResources =     `SELECT r.resource_id , r.resource_name , tr.task_id , t.task_description
                         FROM task_resources tr 
                         LEFT JOIN resource r ON tr.resource_id = r.resource_id
                         LEFT JOIN task t ON tr.task_id  = t.task_id
                         WHERE tr.member_id = ($1)`;

module.exports = {
    availableResources ,
    myResources
}