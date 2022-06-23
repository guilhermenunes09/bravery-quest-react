import React, { Component } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { showQuestion } from '../services/QuestionService';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

class QuestionsShow extends Component {

  constructor(props) {
    super(props);
    this.state = {title: '', question: ''};
  }

  componentDidMount() {
    console.log("Mounted");
    const res = showQuestion(6);
    res.then(response => {
      console.log(response)
      this.setState({title: response.title, question: response.question});
    });
  }


  render() {
    return(
      <>
      <Grid container spacing={3}>
        <Grid item xs>
          <Item>xs</Item>
        </Grid>
        <Grid item xs={6}>
          <Item>

            {this.state.title}

            {this.state.question}
            
          </Item>
        </Grid>
        <Grid item xs>
          <Item>xs</Item>
        </Grid>
      </Grid>
      </>
    )
  }
}

export default QuestionsShow;