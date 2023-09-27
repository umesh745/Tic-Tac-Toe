import { Modal } from "@mui/material";
import { appConstant } from "../../theme/appConstant";
import { audioFnc } from "../../constant/audioFnc";
import { images } from "../../theme/imageConstant";

export const ModalPopup = (props) => {

  const { onClose, open, msg, onBtnClick } = props;
  audioFnc.win();

  return (
    <Modal open={open} onClose={onClose}>
      <div className="win_modal_box_wrap">
        <img src={open === appConstant.draw ? images.draw : images.win} />
        <h1>{msg}</h1>
        <button onClick={onBtnClick}>{appConstant?.playAgain}</button>
      </div>
    </Modal>
  );
};
