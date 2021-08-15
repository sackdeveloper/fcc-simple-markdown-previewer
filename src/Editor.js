import React from 'react';
import marked from 'marked';
// import hljs from 'highlight.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSearch, faExpand  } from '@fortawesome/free-solid-svg-icons';
import './Editor.css';


const DOMPurify = require('dompurify')(window);


var edit = <FontAwesomeIcon className="areaIcon" icon={faEdit} />;
var preview = <FontAwesomeIcon className="areaIcon" icon={faSearch} />;
var expand = <FontAwesomeIcon className="expandIcon" icon={faExpand} />;


const markDown = (text) => {
    marked.setOptions({
        renderer: new marked.Renderer(),
		gfm: true,
		tables: true,
		breaks: false,
		pedantic: false,
		sanitize: true,
		smartLists: true,
		smartypants: false,
        })
    
    let input = marked(text);
    return {__html: DOMPurify.sanitize(input)};
};

const Previewer = (props) => {

     return (
         //set this className
    <div className={props.classes} id="preview"> 
        <div className="header">
            <div> {preview} </div>
            <h3>Previewer</h3>
            <div onClick={props.previewMax}> {expand} </div>
        </div>

        <div className="previewMain" >
            <div className="previewerText" dangerouslySetInnerHTML={markDown(props.input)} />
        </div>
        
    </div>
    )
}

class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: placeholder,
            editMax: false,
            previewMax: false
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleEditMax = this.handleEditMax.bind(this);
        this.handlePreviewMax = this.handlePreviewMax.bind(this);
    }

    

    handleChange(event) {
        this.setState({input: event.target.value});
    }

    handleEditMax() {
        this.setState((editMax) => {
            return {editMax: !this.state.editMax};
        })
    };

    handlePreviewMax() {
        this.setState((previewMax) => {
            return {previewMax: !this.state.previewMax};
        })
        console.log(this.state.previewMax);
    };


    render() {
        const classes = 
        this.state.editMax
        ? ['editor max', 'previewer min', 'editorTextMax']
        : this.state.previewMax
        ? ['editor min', 'previewer max', 'editorText']
        : ['editor', 'previewer', 'editorText'];

        return (
            <div className="content">
                    {/* change this className */}
                <div className={classes[0]}>
                    <div className="header">
                        <div>{edit}</div>
                        <h3>Editor</h3>
                        <div onClick={this.handleEditMax}> {expand} </div>
                    </div>

                    <div className="textArea">
                        <textarea className={classes[2]} id="editor" value={this.state.input}
                            onChange={this.handleChange} />
                    </div>
                </div>

                <Previewer input={this.state.input} previewMax={this.handlePreviewMax} classes={classes[1]} />
            </div>
        )
    }

    
}

const placeholder = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`;

export default Editor;