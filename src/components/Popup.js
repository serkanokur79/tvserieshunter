import React, {useState} from 'react';
import { Modal, Button } from "antd";


function Popup(props){
   const { title, children, openPopup, setOpenPopup } = props;
   
  const [visible, setVisible] = useState(openPopup);

  const showModal = () => {
    setVisible(true);
    setOpenPopup(true);
  };

  const handleOk = () => {
    setVisible(false);
    setOpenPopup(false);
  };

  const handleCancel = () => {
    setVisible(false);
    setOpenPopup(false);
  };


  return (
      <>
        <Modal
          title={title}
          visible={visible}
          onOk={()=>handleOk()}
          onCancel={()=>handleCancel()}
        >
            {children}
        </Modal>
      </>
    );
}


export default Popup;
