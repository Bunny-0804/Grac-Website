const project_lookup = `SELECT  p.project_id,
                                p.project_name,
                                p.project_description,
                                t.task_id,
                                t.task_description,
                                t.task_assignment_date,
                                t.task_due_date
                                FROM task_assignment ta 
                                JOIN task t ON t.task_id = ta.task_id
                                JOIN project p ON p.project_id = t.project_id
                                WHERE ta.member_id = ($1)`;

module.exports = {
    project_lookup
};