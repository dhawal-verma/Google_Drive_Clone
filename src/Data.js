import React from "react";
import "./css/data.css";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ListIcon from "@mui/icons-material/List";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
function Data() {
  const [files, setFiles] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      const querySnapshot = await getDocs(collection(db, "myfiles"));
      setFiles(querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      })))
    })();
  }, []);

  function formatBytes(bytes, decimals = 2) {
    if (bytes===0) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm))+' ' + sizes[i]};

  return (
    <div className="data">
      <div className="data_header">
        <div className="data_header_left">
          <p>My Drive</p>
          <ArrowDropDownIcon />
        </div>
        <div className="data_header_right">
          <ListIcon />
          <InfoOutlinedIcon />
        </div>
      </div>
      <div className="data_content">
        <div className="data_grid">
          {files.map((file) => {
            return (
              <div className="data_file">
                <InsertDriveFileIcon />
                <p>{file.data.filename}</p>
              </div>
            );
          })}
        </div>
        <div className="data_list">
          <div className="details_row">
            <p>
              <b>
                Name <ArrowDownwardIcon />
              </b>
            </p>
            <p>
              <b>Owner</b>
            </p>
            <p>
              <b>Last Modified</b>
            </p>
            <p>
              <b>File Size</b>
            </p>
          </div>
          {
            files.map((file)=>{
                return <div className="details_row">
                <a className='tag'href={file.data.fileURL} rel="noreferrer" target="_blank"><p><InsertDriveFileIcon />{file.data.filename} </p></a>
                <p>Me</p>
                <p>{new Date(file.data.timestamp?.seconds*1000).toUTCString()} </p>
                <p>{formatBytes(file.data.size)}</p>
              </div>
            })
          }
          
        </div>
      </div>
    </div>
  );
}

export default Data;
