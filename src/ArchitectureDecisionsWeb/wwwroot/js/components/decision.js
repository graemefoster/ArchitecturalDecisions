'use strict';

class Decision extends React.Component {

    constructor(props) {
        super(props);
        this.state = {decision: props.decision};
    }

    onUpdateItem(item, list) {
        this.setState({decision: this.state.decision});
        this.onUpdate();
    }

    onNewItem(item, list) {
        list.push(item);
        this.setState({decision: this.state.decision});
        this.onUpdate();
    }

    onRemoveItem(item, list) {
        let index = list.indexOf(item);
        list.splice(index, 1);
        this.setState({decision: this.state.decision});
        this.onUpdate();
    }

    onUpdateMatrix(criteriaId, optionId, val) {
        decision.Comparison[criteriaId][optionId].Rating = val;
        this.setState({decision: this.state.decision});
        this.onUpdate();
    }

    onUpdate() {
        this.props.onUpdate(this.state.decision);
    }

    render() {

        return (
            <div>
                <hr/>
                <ReactBootstrap.Tabs defaultActiveKey="criteria" id="uncontrolled-tab-example" className="mb-3">
                    <ReactBootstrap.Tab eventKey="criteria" title="Criteria">
                        <Criteria
                            criteria={this.state.decision.SolutionCriteria}
                            onNewCriteria={x => this.onNewItem(x, this.state.decision.SolutionCriteria)}
                            onRemoveCriteria={x => this.onRemoveItem(x, this.state.decision.SolutionCriteria)}
                            onUpdateCriteria={x => this.onUpdateItem(x, this.state.decision.SolutionCriteria)}/>
                    </ReactBootstrap.Tab>
                    <ReactBootstrap.Tab eventKey="options" title="Options">
                        <Options
                            options={this.state.decision.Options}
                            onNewOption={x => this.onNewItem(x, this.state.decision.Options)}
                            onRemoveOption={x => this.onRemoveItem(x, this.state.decision.Options)}
                            onUpdateOption={x => this.onUpdateItem(x, this.state.decision.Options)}/>
                    </ReactBootstrap.Tab>
                    <ReactBootstrap.Tab eventKey="comparisons" title="Comparisons">
                        <Matrix
                            options={this.state.decision.Options}
                            criteria={this.state.decision.SolutionCriteria}
                            comparisons={this.state.decision.Comparison}
                            onUpdateMatrix={(criteria, option, val) => this.onUpdateMatrix(criteria, option, val)}
                        />
                    </ReactBootstrap.Tab>
                </ReactBootstrap.Tabs>

            </div>

        );
    }
}
