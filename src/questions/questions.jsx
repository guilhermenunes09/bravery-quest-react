import React, { Component } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { createQuestion } from '../services/QuestionService';

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
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
          onSubmit={this.handleSubmit}
        >
          <div>
            <TextField id="outlined-basic" name="title" label="Title" variant="outlined" onChange={this.handleChangeTitle} />
            
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

            <Button type="submit" variant="outlined">Save</Button>
          </div>
        </Box>
      </>
    )
  }
}

export default Questions; // Don’t forget to use export default!