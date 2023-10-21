import React, { Component } from 'react';
import './CodeEditor.css';

class CodeEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: '// Your code here',
            isLocked: false,
        };
    }

    handleCopy = () => {
        const codeArea = document.getElementById('code-area');
        codeArea.select();
        document.execCommand('copy');
        alert('Code copied to clipboard!');
    };

    handleSave = () => {
        alert('Code saved!');
    };

    handleLock = () => {
        this.setState((prevState) => ({
            isLocked: !prevState.isLocked,
        }));
    };

    handleTabKey = (e) => {
        e.preventDefault();

        const { code } = this.state;
        const { selectionStart, selectionEnd } = e.target;
        const beforeSelection = code.slice(0, selectionStart);
        const afterSelection = code.slice(selectionEnd);
        const indentedCode = `${beforeSelection}  ${afterSelection}`;

        this.setState({ code: indentedCode }, () => {
            const newSelectionStart = selectionStart + 2;
            const newSelectionEnd = selectionEnd + 2;

            e.target.setSelectionRange(newSelectionStart, newSelectionEnd);
        });
    };

    render() {
        const { code, isLocked } = this.state;
        return (
            <div className="code-editor">
                <div className="editor-toolbar">
                    <button className="editor-button" onClick={this.handleCopy}>
                        Copy
                    </button>
                    <button className="editor-button" onClick={this.handleSave}>
                        Save
                    </button>
                    <button
                        className={`editor-button ${isLocked ? 'editor-button--lock' : ''}`}
                        onClick={this.handleLock}
                    >
                        {isLocked ? 'Unlock' : 'Lock'}
                    </button>
                </div>
                <textarea
                    id="code-area"
                    className="code-area"
                    spellCheck="false"
                    readOnly={isLocked}
                    value={code}
                    onChange={(e) => this.setState({ code: e.target.value })}
                    onKeyDown={(e) => {
                        if (e.key === 'Tab')  {
                            this.handleTabKey(e);
                        }
                    }}
                />
            </div>
        );
    }
}

export default CodeEditor;
