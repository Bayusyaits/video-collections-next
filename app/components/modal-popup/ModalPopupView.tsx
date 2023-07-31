/* eslint-disable react/display-name */
import React, { memo, useContext } from "react";
import {
  ModalPopupStateContext,
  ModalPopupDispatchContext,
} from "../../hoc/withModal";
import { Modal } from "@mui/base";
import { Fade, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Backdrop from '@mui/material/Backdrop';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ModalPopup = memo(() => {
  const {
    isOpen,
    title,
    component: Child,
  } = useContext(ModalPopupStateContext);
  const { closeModal, onSubmitModal } = useContext(ModalPopupDispatchContext);
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isOpen}
      onClose={closeModal}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={isOpen}>
        <Box sx={style}>
          {
            title && (<Typography
            id="transition-modal-title" variant="h6" component="h2">
              {title}
            </Typography>)
          }
          <Child/>
        </Box>
      </Fade>
    </Modal>
  );
});

export default ModalPopup;
