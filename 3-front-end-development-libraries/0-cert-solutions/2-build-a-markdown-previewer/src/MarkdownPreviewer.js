import React from 'react'

import './MarkdownPreviewer.css'

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
        this.setState({
            markdown: document.getElementById("editor").value
        })
    }

    // Update the previewer whenever the editor is updated
    markdownUpdate(event) {
        this.setState({
            markdown: event.target.value
        })
        console.log(this.state.markdown);
    }

    render() {
        return (
            <div id="full-container">
                <h1 className="text-primary text-center">MarkdownPreviewer</h1>
                <div className="row">
                    <div className="col-1"></div>
                    <div id="markdown-container" className="col-4">
                        
                        <div className="form-floating">
                            {
                                // TODO: figure out how to preserve the line breaks in placeholder
                                // separate into a different react class?
                                // incorporate \r\n somehow?
                            }
                            <textarea id="editor" className="form-control" onChange={this.markdownUpdate}>
                            # This is a test heading 1
                            ## This is a test heading 2
                            
                            This includes a (link)[https://www.google.com] to Google.

                            This has inline code: `const TRUE = true;`.

                            This is a code block:

                            ```
                            const TRUE = true;
                            const FALSE = false;
                            let counter = 0;
                            ```
                            </textarea>
                            <label id="editor-label" for="editor">Enter your markdown here:</label>
                        </div>
                    </div>
                    <div className="col-2"></div>
                    <div id="preview-container" className="col-4">
                        <h3 className="text-center">Markdown Preview:</h3>
                        <div id="preview">
                            {this.state.markdown}
                        </div>
                    </div>
                    <div className="col-1"></div>
                </div>
            </div>
        );
    }
}

export default MarkdownPreviewer;

