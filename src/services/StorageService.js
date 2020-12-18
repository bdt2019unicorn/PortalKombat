import DatabaseService from "./DatabaseService";

const { firebase } = window;
const storage = firebase.storage().ref();
const defaultMemberStorage = 'member';
class StorageService {
    getAll(memberId) {
        return storage.child(`${defaultMemberStorage}/${memberId}`).listAll();
    }
    downloadFile(fileName) {
        storage.child(`member/KWKS12345/${fileName}`).getDownloadURL().then(function (url) {
            // `url` is the download URL for 'images/stars.jpg'

            // This can be downloaded directly:
            console.log('urll', url)
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = function (event) {
                var blob = xhr.response;
            };
            xhr.open('GET', url);
            xhr.send();


        }).catch(function (error) {
            // Handle any errors
        });
    }

    upload(requestId, memberId, files) {
        console.log('file', files)

        files.map((file) => {
            const memberStorage = storage.child(`${defaultMemberStorage}/${memberId}/${file.name}`);
            memberStorage.put(file).then((snapshot) => {
                console.log('success maybe?', snapshot);
                DatabaseService.addFileReference(requestId, memberId, snapshot.metadata)
            });
        })
    }
}

export default new StorageService();
