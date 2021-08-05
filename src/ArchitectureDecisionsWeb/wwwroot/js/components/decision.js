'use strict';

class Decision extends React.Component {

    constructor(props) {
        super(props);
        this.state = {decision: props.decision};
    }
    
    onUpdateCriteria(criteria) {
        this.setState({decision : decision})
    }

    onNewCriteria(newCriteria) {
        this.state.decision.SolutionCriteria.push(newCriteria);
        this.setState({decision: decision});
        this.onUpdate();
    }
    
    onRemoveCriteria(criteria) {
        let decision = this.state.decision;
        let state = decision.SolutionCriteria;
        let index = state.indexOf(criteria);
        state.splice(index, 1);
        this.setState({decision: decision});
        this.onUpdate();
    }

    onUpdate() {
        this.props.onUpdate(this.state.decision);
    }

    render() {

        return (
            <div>
                <Criteria 
                    criteria={this.state.decision.SolutionCriteria} 
                    onNewCriteria={x => this.onNewCriteria(x)} 
                    onRemoveCriteria={x => this.onRemoveCriteria(x)}
                    onUpdateCriteria={x => this.onUpdateCriteria(x)}/>
                <Options />
            </div>
        );
    }
}
