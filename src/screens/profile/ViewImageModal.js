import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/core/SvgIcon/SvgIcon";
import TextField from "@material-ui/core/TextField";
import { red } from "@material-ui/core/colors";
import Divider from "@material-ui/core/Divider";

function getModalStyle() {
    const top = 30;
    const left = 33;

    return {
        top: `${top}%`,
        left: `${left}%`
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
        position: "absolute",
        width: "33%",
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    avatar: {
        backgroundColor: red[500]
    }
}));



export default function ViewImageModal(props) {
    const classes = useStyles();
    const { selectedImage, openImageView, handleClose } = props;
    const [modalStyle] = React.useState(getModalStyle);
    const [fullname, setFullname] = React.useState("");

    console.log("selectedImage...", selectedImage);

    function fullnameChangeHandler(e) {
        setFullname(e.target.value);
        props.updateClickHandler(e.target.value);
    }

    return (
        <div>
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={openImageView}
          >
            <div style={modalStyle} className={classes.paper}>
              <Grid
                container
                spacing={1}
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Grid item xs={6}>
                  {selectedImage ? (
                    <img
                      src={selectedImage.images.standard_resolution.url}
                      alt={selectedImage.images.standard_resolution.url}
                      style={{
                        height: "100%",
                        maxWidth: "100%",
                        width: selectedImage.images.standard_resolution.width
                      }}
                    ></img>
                  ) : null}
                </Grid>
                <Grid item xs={6}>
                  {selectedImage ? (
                    <div>
                      <Grid
                        container
                        spacing={1}
                        direction="row"
                        justify="center"
                        alignItems="center"
                      >
                        <Grid item xs={4}>
                          <Avatar
                            alt={selectedImage.user.full_name}
                            src={selectedImage.user.profile_picture}
                          />
                        </Grid>{" "}
                        <Grid item xs={8}>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            {selectedImage.user.username}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Divider variant="fullWidth"/>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {selectedImage.caption.text.split("#")[0]}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {selectedImage.tags.map(tag => {
                          return (
                            <span
                              style={{ color: "#1976d2", fontSize: "14px" }}
                              size="small"
                              key={tag}
                              color="primary"
                            >
                              #{tag}{" "}
                            </span>
                          );
                        })}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="div"
                      >
                      </Typography>
                      <div style={{ margin: "1rem" }}>
                        <form
                          className={classes.root}
                          noValidate
                          autoComplete="off"
                        >
                        </form>
                      </div>
                    </div>
                  ) : null}
                </Grid>
              </Grid>
            </div>
          </Modal>
        </div>
      );
    }