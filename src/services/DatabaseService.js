
const { firebase } = window;

class DatabaseService {
  getDbByNode(nodeName) {
    return nodeName ? firebase.database().ref(nodeName) : firebase.database().ref();
  }
  getRequestsByMemberId(memberId) {
    return this.getDbByNode('requests').orderByChild('memberId').equalTo(memberId);
  }
  getAll() {
    return this.getDbByNode();
  }
  getCustomers() {
    return this.getDbByNode('customers');
  }

  createDocumentRequest(item) {
    return this.getDbByNode('requests').push(item);

  }

  addFileReference(requestId, memberId, metadata) {
    console.log('metadata', metadata);
    const data = { timeCreated: metadata.timeCreated, name: metadata.name, fullPath: metadata.fullPath }
    this.getDbByNode(`requests/${requestId}/`).child('files').push(data);
  }

  create(item) {
    return this.getDbByNode().push(item);
  }

  update(key, value) {
    return this.getDbByNode().child(key).update(value);
  }

  delete(key) {
    return this.getDbByNode().child(key).remove();
  }

  deleteAll() {
    return this.getDbByNode().remove();
  }
}

export default new DatabaseService();