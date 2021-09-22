'use strict';

class Decision extends React.Component {

    constructor(props) {
        super(props);
        this.state = {decision: props.decision, undoBuffer: []};
    }
    
    
    cloneDecision() {
        return JSON.parse(JSON.stringify(this.state.decision))
    }
    
    updateClone(action) {
        let clonedDecision = this.cloneDecision()
        action(clonedDecision)
        this.onUpdate(clonedDecision)
    }

    onUpdateItem(decision, updatedItem, getList) {
        let listToRemoveFrom = getList(decision)
        let index = listToRemoveFrom.findIndex(x => x.Id == updatedItem.Id)
        listToRemoveFrom.splice(index, 1, JSON.parse(JSON.stringify(updatedItem)));
        this.onUpdate(decision);
    }

    removeItemById(decision, id, getList) {
        let listToRemoveFrom = getList(decision)
        let index = listToRemoveFrom.findIndex(x => x.Id == id)
        listToRemoveFrom.splice(index, 1);
        this.onUpdate(decision);
    }

    onUpdateMatrix(criteriaId, optionId, val) {
        let clonedDecision = this.cloneDecision()
        clonedDecision.Comparison[criteriaId][optionId].Rating = val;
        this.onUpdate(clonedDecision);
    }

    onUpdate(decision) {
        this.sanitiseDecision(decision)
        let undoBuffer = this.state.undoBuffer
        undoBuffer.push(this.state.decision)
        this.setState({decision: decision, undoBuffer: undoBuffer})
        this.props.onUpdate(decision);
    }
    
    sanitiseDecision(decision) {
        decision.SolutionCriteria.forEach(criteria => decision.Options.forEach(option => {
            let comparisonCriteria = decision.Comparison[criteria.Id]
            if (!comparisonCriteria) {
                decision.Comparison[criteria.Id] = {}
            }
            let optionCriteria = decision.Comparison[criteria.Id][option.Id]
            if (!optionCriteria) {
                decision.Comparison[criteria.Id][option.Id] = { Rating: { Commentary: '', Rank: 1 }}
            }
        }));
    }

    raiseCriteria(criteria) {
        this.updateClone(clone => {
            
            //re-index everything
            let ordered = clone.SolutionCriteria.sort((x,y) => x.Index < y.Index);
            var currentIndex = 0;
            ordered.forEach(x => x.Index = currentIndex++);
            
            let indexOfThis = clone.SolutionCriteria.findIndex(x => x.Id === criteria.Id);
            let toSwitch = clone.SolutionCriteria[indexOfThis];
            let other = clone.SolutionCriteria[indexOfThis - 1];
            let toSwitchIndex = toSwitch.Index;
            toSwitch.Index = other.Index;
            other.Index = toSwitchIndex;
            clone.SolutionCriteria[toSwitchIndex] = other;
            clone.SolutionCriteria[toSwitchIndex - 1] = toSwitch;
        })
    }

    lowerCriteria(criteria) {
        this.updateClone(clone => {

            let ordered = clone.SolutionCriteria.sort((x,y) => x.Index < y.Index);
            var currentIndex = 0;
            ordered.forEach(x => x.Index = currentIndex++);

            let indexOfThis = clone.SolutionCriteria.findIndex(x => x.Id === criteria.Id);
            let toSwitch = clone.SolutionCriteria[indexOfThis];
            let other = clone.SolutionCriteria[indexOfThis + 1];
            let toSwitchIndex = toSwitch.Index;
            toSwitch.Index = other.Index;
            other.Index = toSwitchIndex;
            clone.SolutionCriteria[toSwitchIndex] = other;
            clone.SolutionCriteria[toSwitchIndex + 1] = toSwitch;
        })
    }

    render() {
        
        const clonedDecision = JSON.parse(JSON.stringify(this.state.decision))
        clonedDecision.SolutionCriteria.sort(x => x.Index);
        
        return (
            <div>
                <hr/>
                <ChosenOption options={clonedDecision.Options} chosenOption={clonedDecision.ChosenOption} onChosenOptionChanged={x => this.updateClone(y => y.ChosenOption = x)} />
                <ReactBootstrap.Tabs defaultActiveKey="stakeholders" id="uncontrolled-tab-example" className="mb-3">
                    <ReactBootstrap.Tab eventKey="stakeholders" title="Stakeholders">
                        <Stakeholders stakeholders={this.state.decision.Stakeholders}
                                      onNewStakeholder={x => this.updateClone(c => c.Stakeholders.push(x))}
                                      onRemoveStakeholder={x => this.removeItemById(this.cloneDecision(), x.Id, x => x.Stakeholders)}
                                      onUpdateStakeholder={x => this.onUpdateItem(this.cloneDecision(), x, x => x.Stakeholders)}
                        />
                    </ReactBootstrap.Tab>
                    <ReactBootstrap.Tab eventKey="criteria" title="Criteria">
                        <Criteria
                            criteria={clonedDecision.SolutionCriteria}
                            onMoveUp={x => this.raiseCriteria(x)}
                            onMoveDown={x => this.lowerCriteria(x)}
                            onNewCriteria={x => this.updateClone(c => c.SolutionCriteria.push(x))}
                            onRemoveCriteria={x => this.removeItemById(this.cloneDecision(), x.Id, x => x.SolutionCriteria)}
                            onUpdateCriteria={x => this.onUpdateItem(this.cloneDecision(), x, x => x.SolutionCriteria)}/>
                    </ReactBootstrap.Tab>
                    <ReactBootstrap.Tab eventKey="options" title="Options">
                        <Options
                            options={this.state.decision.Options}
                            onNewOption={x => this.updateClone(c => c.Options.push(x))}
                            onRemoveOption={x => this.removeItemById(this.cloneDecision(), x.Id, x => x.Options)}
                            onUpdateOption={x => this.onUpdateItem(this.cloneDecision(), x, x => x.Options)}/>
                    </ReactBootstrap.Tab>
                    <ReactBootstrap.Tab eventKey="comparisons" title="Comparisons">
                        <Matrix
                            options={clonedDecision.Options}
                            criteria={clonedDecision.SolutionCriteria}
                            comparisons={clonedDecision.Comparison}
                            onUpdateMatrix={(criteria, option, val) => this.onUpdateMatrix(criteria, option, val)}
                        />
                    </ReactBootstrap.Tab>
                </ReactBootstrap.Tabs>
                <hr/>

            </div>

        );
    }
}
