const applytoJoin = 'INSERT INTO applicants (password_hash , applicant_roll_no , applicant_email) VALUES (($1) , ($2) , ($3))';

module.exports = {
    applytoJoin
};