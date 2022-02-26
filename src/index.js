import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './mini-dark.min.css';
import './mdview.css';
import Prism from 'prismjs';
import './prism.css';
//import MDPreview from './App';
import reportWebVitals from './reportWebVitals';
import DOMPurify from 'dompurify';
import { marked } from "marked";

marked.setOptions({
  breaks: true,
  highlight: function (code) {
    return Prism.highlight(code, Prism.languages.javascript, 'javascript');
  }
});
// ----------- MD PREVIEW COMPONENT -----------
class MDPreview extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      input: '',
      content: '# Welcome To MD View\! \n #### The quick and convenient markdown preview GUI \n Simply enter your markdown in the section above and it will automatically convert to the html below. Enjoy and happy coding\!\! \n By Paul Banks, MIT License, 2022',

    };
  }

  handleChange(e){
    this.setState({
      content: e.target.value,
    });
  }

  render(){
    return (
      <div className='container'>
        <hgroup>
          <h4 className='cntr arcade titleH1'>MD View</h4>
          <h6 className='cntr arcade titleH6'>Markdown Previewer</h6>
        </hgroup>
        <Editor
          changeHandler={this.handleChange.bind(this)}
        />
        <Content
          content={this.state.content}
        />
      </div>
    );
  }
}

// editor
const  Editor = (props) => {
    return (
      <div>
        <div className='row mdEntry'>
          <div id='mdEntry' className=' col-sm-8 col-sm-offset-2'>
            <textarea
              id='editor'
              className='entry'
              onChange={props.changeHandler}
              placeholder='enter your markdown here...'
            ></textarea>
          </div>
        </div>
      </div>
    );
};

// ----------- MD PREVIEW COMPONENT -----------
const Content = (props) => {
  return (
      <div className='row'>
        <div id='preview' className='content col-sm-10'
          dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(marked.parse(props.content))}} >

        </div>
      </div>
    );
};


ReactDOM.render(
  <React.StrictMode>
    <MDPreview />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
