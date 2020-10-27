import React from 'react';
import { makeStyles, Container } from '@material-ui/core';
import { Navbar } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    color: theme.palette.common.white,
    height: '100%'
  },
  container:{
    marginTop:"1rem"
  }
}));

function PublicLayout(props) {
  const classes = useStyles(props);
  const { children } = props;
  return (
    <div className={classes.root}>
      <Navbar />
      <Container className={classes.container}>
      {children}
      </Container>
    </div>
  );
}

export default PublicLayout;
