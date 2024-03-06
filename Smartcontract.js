const firebaseConfig = {
    apiKey: "AIzaSyCGhUb4WEnyJv4c8S8WLrrQWFwVfGGq3lw",
    authDomain: "drive-clone-60412.firebaseapp.com",
    projectId: "drive-clone-60412",
    storageBucket: "drive-clone-60412.appspot.com",
    messagingSenderId: "76779718149",
    appId: "1:76779718149:web:2ef3c2cf1a00d38a69be6c"
  };


  const firebaseApp = firebaase.initializeApp(firebaseConfig)

  const auth = firebaase.auth()
  const provider = new firebaase.auth.GoogleAuthProvider()
  const storage = firebaase.storage()
  const db = firebaseApp.firestore()
  
  export { auth, provider, db, storage }
  const handleClose = () => {
    setOpen(false);
};

const handleChange = (e) => {
    if (e.target.files[0]) {
        setFile(e.target.files[0])
    }
}

const handleUpload = () => {
    setUploading(true)

    storage.ref(`files/${file.name}`).put(file).then(snapshot => {
        console.log(snapshot)

        storage.ref('files').child(file.name).getDownloadURL().then(url => {
            //post image inside the db

            db.collection('myFiles').add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                caption: file.name,
                fileUrl: url,
                size: snapshot._delegate.bytesTransferred,
            })

            setUploading(false)
            setOpen(false)
            setFile(null)
        })

        storage.ref('files').child(file.name).getMetadata().then(meta => {
            console.log(meta.size)
        })

    })
}

//return (
    <div className='newFile'>
        <div className="newFile__container" onClick={handleOpen}>
            <AddIcon fontSize='large' />
            <p>New</p>
        </div>

        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <div style={modalStyle} className={classes.paper}>
                <p>Select files you want to upload!</p>
                {
                    uploading ? (
                        <p>Uploading...</p>
                    ) : (
                            <>
                                <input type="file" onChange={handleChange} />
                                <button onClick={handleUpload}>Upload</button>
                            </>
                        )
                }
            </div>
        </Modal>
    </div>
//)
}

export default NewFile
