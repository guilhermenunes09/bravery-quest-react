import React, { Component } from 'react';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { createQuestion } from '../services/QuestionService';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
class Questions extends Component {

  constructor(props) {
    super(props);
    this.state = {title: '', question: ''};

    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeQuestion = this.handleChangeQuestion.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeTitle(event) {
    this.setState({title: event.target.value});
  }

  handleChangeQuestion(event) {
    this.setState({question: event.target.value});
  }

  handleClick = () => {
    console.log("clicked");
    
  };

  handleSubmit(event) {
    event.preventDefault();
    const question = { title: this.state.title, question: this.state.question };
    createQuestion(question);
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
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 1, minWidth: '100%', maxWidth: '100%' },
                  }}
                  noValidate
                  autoComplete="off"
                  onSubmit={this.handleSubmit}
                >
                  <div>
                    <TextField id="outlined-basic" name="title" label="Title" variant="outlined" onChange={this.handleChangeTitle} />
                  </div>
                  <div>
                    <TextField
                      id="filled-multiline-static"
                      name="question"
                      label="Pergunta"
                      multiline
                      rows={4}
                      defaultValue="Default Value"
                      onChange={this.handleChangeQuestion} 
                      variant="filled"
                    />
                  </div>
                  <div>
                    <Button type="submit" variant="outlined">Save</Button>
                  </div>
                </Box>
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

export default Questions;