import PropTypes from 'prop-types';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';

FlyInDialog.propTypes = {
  anchor: PropTypes.string,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  handleClose: PropTypes.func,
  children: PropTypes.node,
};

export default function FlyInDialog(props) {
  const {
    anchor = 'right',
    open,
    setOpen,
    handleClose = () => null,
    children,
  } = props;

  // eslint-disable-next-line no-unused-vars
  const toggleDrawer = (anchor, open) => (e) => {
    if (e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
      return;
    }
  };

  const handleCloseWrapper = () => {
    setOpen(false);
    handleClose();
  };

  return (
    <Box
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Drawer
        anchor={anchor}
        open={open}
        onClose={handleCloseWrapper}
        PaperProps={{
          style: { width: '75%', backgroundColor: '#333', overflowX: 'clip' },
        }}
      >
        {children}
      </Drawer>
    </Box>
  );
}
