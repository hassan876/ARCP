
const collapseLargeString = (text, limit) => {
    if (text.length <= limit) {
        return text;
    }
    else {
        return text.substring(0, limit) + '...'
    }

}
export default collapseLargeString;