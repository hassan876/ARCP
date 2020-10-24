const getPublicationStatus = (publication_status) => {
    switch (publication_status) {
        case 1:
            return 'Published';
        case 2:
            return 'Draft';
        default:
            return 'Archived'
    }
}
export default getPublicationStatus;