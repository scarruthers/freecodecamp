import React from 'react'

import './MarkdownPreviewer.css'
import { marked } from 'marked'

const defaultEditorValue = [
    "# This is a test heading 1",
    "## This is a test heading 2",
    "This includes a [link](https://www.google.com) to Google.\r\n",
    "Here we have **bold** and *italicized* text, or ***better yet***.\r\n",
    "This has inline code: `const TRUE = true;`.\r\n",
    "This is a code block:\r\n",
    "```",
    "const TRUE = true;",
    "const FALSE = false;",
    "let counter = 0;",
    "```\r\n",
    "> And this is a blockquote.\r\n",
    "Here's a list:",
    "1. Item 1",
    "2. Item 2",
    "",
    "And last but not least, an image:\r\n",
    "![Picture of code](https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Programming_code.jpg/320px-Programming_code.jpg 'Picture of code')",
    "",
    ">Martin Vorel, CC BY-SA 4.0 <https://creativecommons.org/licenses/by-sa/4.0>, via Wikimedia Commons"
].join("\r\n");

marked.use({
    gfm: true,
    breaks: true
});

class MarkdownPreviewer extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            markdown: ""
        }

        this.markdownUpdate = this.markdownUpdate.bind(this);
    }

    // Automatically render our default markdown
    // TODO set the textarea value here?
    componentDidMount() {
        const editor = document.getElementById("editor");
        editor.value = defaultEditorValue;
        this.setState({
            markdown: defaultEditorValue
        }, this.renderMarkdown(defaultEditorValue))
    }

    // Update the previewer whenever the editor is updated
    markdownUpdate(event) {
        // Update our input state and render the markdown
        this.setState({
            markdown: event.target.value
        }, this.renderMarkdown(event.target.value));
    }

    // TODO?: sanitize input
    renderMarkdown(markdown) {
        document.getElementById("preview").innerHTML = marked.parse(markdown);

        // Update textarea height to keep both sides uniform
        document.getElementById("editor").style.height = document.getElementById("preview").scrollHeight + "px";
    }

    render() {
        return (
            <div id="full-container">
                <div className="row">
                    <div className="col-2"></div>
                    <div id="markdown-container" className="col-4">
                        <h3 className="text-center">Your Markdown:</h3>
                        <div className="form-floating">
                            <textarea id="editor" className="form-control" onChange={this.markdownUpdate} autoCorrect="off"></textarea>
                        </div>
                    </div>
                    
                    <div id="preview-container" className="col-4">
                        <h3 className="text-center">Markdown Preview:</h3>
                        <div id="preview" className="border border-1 rounded"></div>
                    </div>
                    <div className="col-2"></div>
                </div>
            </div>
        );
    }
}

export default MarkdownPreviewer;

