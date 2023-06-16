import React from "react";
import MobileScreenShareIcon from "@mui/icons-material/MobileScreenShare";
import DevicesIcon from "@mui/icons-material/Devices";
import "./css/sidebar.css";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import { Modal } from "@mui/material";
import {storage,db} from './firebase'
import firebase from 'firebase/compat/app';
import {ref,uploadBytes,getDownloadURL } from "firebase/storage"
import { addDoc, collection ,serverTimestamp} from "firebase/firestore";
function Sidebar() {

  

  const [open, setOpen] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);
  const [file,setFile] = React.useState(null);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleChange= (e)=>{
    if(e.target.files[0]){
      setFile(e.target.files[0])
    }}
    const handleUpload = async (event)=>{
      event.preventDefault();
      setUploading(true);

      const imageRef =await ref(storage,`files/${file.name}`)
      const snapshot = await uploadBytes(imageRef,file)
      const url = await  getDownloadURL(ref(storage, `files/${file.name}`))
        console.log(snapshot)

      const docRef = await addDoc(collection(db, "myfiles"), {
            timestamp : serverTimestamp(),
            filename : file.name,
            fileURL : url,
            size : snapshot.metadata.size
      });
      
          setUploading(false);
          setFile(null);
          setOpen(false);
        
      
    }
  
  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <div className="modal_pop">
          <form>
            <div className="modelHeading">
              <h3>Select file you want to upload</h3>
            </div>
            <div className="modalBody">
              {uploading ? (
                <p className="uploading">Uploading</p>
              ) : (
                <>
                  <input type="file" onChange={handleChange}/>
                  <input type="submit" className="post_submit" onClick={handleUpload}/>
                </>
              )}
            </div>
          </form>
        </div>
      </Modal>
      <div className="sidebar">
        <div className="sidebar_btn">
          <button onClick={handleOpen}>
            <img
              alt="new"
              src="data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2236%22 height=%2236%22 viewBox=%220 0 36 36%22%3E%3Cpath fill=%22%2334A853%22 d=%22M16 16v14h4V20z%22/%3E%3Cpath fill=%22%234285F4%22 d=%22M30 16H20l-4 4h14z%22/%3E%3Cpath fill=%22%23FBBC05%22 d=%22M6 16v4h10l4-4z%22/%3E%3Cpath fill=%22%23EA4335%22 d=%22M20 16V6h-4v14z%22/%3E%3Cpath fill=%22none%22 d=%22M0 0h36v36H0z%22/%3E%3C/svg%3E"
            />
            <span>New</span>
          </button>
        </div>
        <div className="sidebar_options">
          <div className="sidebar_option sidebar_option-active">
            <MobileScreenShareIcon />
            <span>My Drive</span>
          </div>
          <div className="sidebar_option">
            <DevicesIcon />
            <span>Computers</span>
          </div>
          <div className="sidebar_option">
            <PeopleOutlineIcon />
            <span>Share with me</span>
          </div>
          <div className="sidebar_option">
            <QueryBuilderIcon />
            <span>Recent</span>
          </div>
          <div className="sidebar_option">
            <StarOutlineIcon />
            <span>Starred</span>
          </div>
          <div className="sidebar_option">
            <DeleteOutlineIcon />
            <span>Trash</span>
          </div>
        </div>
        <hr />
        <div className="sidebar_options">
          <div className="sidebar_option">
            <CloudQueueIcon />
            <span>Storage</span>
          </div>
          <div className="progress_bar">
            <progress size="tiny" value="50" max="100" />
            <span>6.45Gb used of 15GB</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
