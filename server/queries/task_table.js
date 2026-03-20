const addtask = `INSERT INTO task(task_description , task_assignment_date , task_due_date , project_id , completion_weightage) VALUES ($1 , $2 , $3 , $4 , $5)`;
const deleteTask = `DELETE FROM task WHERE task_id = $1`;
const updatetask = `UPDATE task SET task_description = $1 , task_assignment_date = $2 , task_due_date = $3 , completion_weightage = $4 WHERE task_id = $5`;
const createTaskAssignment = `INSERT INTO task_assignment(task_id , member_id) VALUES ($1 , $2)`;
const deleteTaskAssignment = `DELETE FROM task_assignment WHERE assignment_id = $1`;
const setTaskStatus = `UPDATE task SET completion = $1 WHERE task_id = $2`;
const assignTaskResource = `INSERT INTO task_resources(task_id , resource_id , member_id) VALUES($1 , $2 , $3)`;
const updateTaskResource = `UPDATE task_resources SET resource_id = $1 , member_id = $2 WHERE resource_assignment_id = $3`;
const uploadAttachment = `INSERT INTO task_attachment(task_id , file_name , file_url , file_type , file_uploaded_at , member_id) VALUES($1 , $2 , $3 , $4 , $5 , $6)`;
const deleteAttachment = `DELETE FROM task_attachment WHERE attachment_id = $1 AND (member_id = $2 OR member_role = $3)`;

module.exports = {
    addtask ,
    deleteTask ,
    updatetask ,
    createTaskAssignment ,
    deleteTaskAssignment ,
    setTaskStatus ,
    assignTaskResource , 
    updateTaskResource ,
    uploadAttachment ,
    deleteAttachment
}