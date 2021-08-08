'use strict';

class Options extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const button = <button type="button" className={'btn btn-block btn-primary  '} onClick={() => {
            const newId = this.props.options.length === 0 ? 0 : Math.max(...this.props.options.map(x => x.Id)) + 1;
            this.props.onNewOption({Id: newId, Description: '?'});
        }}>New Option</button>

        if (this.props.options.length === 0) {
            return <div>
                <p>No options defined</p>
                {button}
            </div>;
        }

        const options = this.props.options.map(x => (
            <li key={x.Id} className={'list-group-item'}>
                <div className={'form-row'}>
                    <label className={'col-form-label'}>Title</label>
                    <div className={'col'}>
                        <input className={'form-control'} type="text" value={x.Name} onChange={evt => {
                            x.Name = evt.target.value;
                            this.props.onUpdateOption(x);
                        }}/>
                    </div>
                    <div className={'col'}>
                        <button type={'button'} className={'btn btn-danger btn-sm mb-2'} onClick={() => {
                            this.props.onRemoveOption(x);
                        }}>Delete
                        </button>
                    </div>
                </div>
                <div className={'form-row'}>
                    <div className={'col-8'}>
                        <label>Description</label>
                        <ReactTinymce 
                            content={x.Description || ''}
                            config={{ menubar: false }}
                            onChange={evt => {
                                x.Description = evt.target.getContent()
                                this.props.onUpdateOption(x);
                            }}/>
                    </div>
                    <div className={'col-4'}>
                        <label>SVG</label>
                        <textarea rows={7} className={'form-control'} value={x.Diagram || ''} onChange={evt => {
                            x.Diagram = evt.target.value || ''
                            this.props.onUpdateOption(x);
                        }}/>
                    </div>
                </div>
            </li>));

        return (
            <div>
                <ul className={'list-group'}>
                    {options}
                </ul>
                {button}
            </div>
        );
    }
}
