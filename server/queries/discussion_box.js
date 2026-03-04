const post =   `INSERT INTO discussion_box (discussion_header , discussion_body , discussion_tag , tag_id , member_id) VALUES 
                (($1) , ($2) , ($3) , ($4) , ($5))`;

const getComments = `SELECT d.post_id ,
                        d.discussion_header ,
                        d.discussion_body ,
                        d.member_id  
                        FROM tag t 
                        INNER JOIN discussion_box d ON d.tag_id = t.tag_id 
                        WHERE t.post_id = ($1) AND d.discussion_tag = 'Comment'
                        ORDER BY d.votes DESC`;

const getTopPosts = `SELECT * FROM discussion_box 
                    WHERE discussion_tag != 'Comment' 
                    ORDER BY votes DESC`;

const getLatestPosts = `SELECT * FROM discussion_box 
                        WHERE discussion_tag != 'Comment' 
                        ORDER BY uploaded_at DESC`;

const getByTagsLatest = `SELECT * FROM discussion_box 
                         WHERE discussion_tag = ($1) 
                         ORDER BY uploaded_at DESC`;

const getByTagsTop =    `SELECT * FROM discussion_box 
                         WHERE discussion_tag = ($1) 
                         ORDER BY votes DESC`;

module.exports = {
    post ,
    getComments ,
    getTopPosts ,
    getLatestPosts ,
    getByTagsLatest ,
    getByTagsTop
};  