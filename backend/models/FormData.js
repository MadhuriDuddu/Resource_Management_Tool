const mongoose = require('mongoose');
const { Schema } = mongoose;

const FormDataSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    experience: String,
    technology: String,
    status: String,
    projectName: String,
    reportingTo: String,
    reportingManagerEmail: String
});

const FormData = mongoose.model('FormData', FormDataSchema);

module.exports = FormData;
