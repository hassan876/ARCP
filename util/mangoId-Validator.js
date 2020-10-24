const validate = (id) => {

    let ObjectId_pattern = new RegExp("^[0-9a-fA-F]{24}$");
    return ObjectId_pattern.test(id);
}

module.exports = validate;