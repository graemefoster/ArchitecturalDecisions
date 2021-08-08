'use strict';

class ChosenOption extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        if (this.props.options.length === 0) {
            return <div />;
        }

        return (
            <div className={'form-group'}>
                <label htmlFor="chosenOption">Chosen Option</label>
                <select name="chosenOption" value={this.props.chosenOption} className={'form-select'} onChange={x => this.props.onChosenOptionChanged(x.target.value)}>
                    <option value="" />
                    {this.props.options.map(x => (<option value={x.Id}>{x.Name}</option>))}
                </select>
            </div>
        );
    }
}
