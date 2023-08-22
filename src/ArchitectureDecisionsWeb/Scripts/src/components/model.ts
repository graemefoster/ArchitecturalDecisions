export interface WithId {
    Id: number
}

export interface DecisionModel{
    DisplayName: string
    ProblemStatement: string
    SolutionCriteria: CriteriaModel[]
    Options: OptionModel[]
    Comparison: ComparisonModel[][]
    ChosenOption: number
    Stakeholders: StakeholderModel[]
}

export interface StakeholderModel {
    Id: number
    Name: string
    Role: string
    Socialised: boolean
}

export interface ComparisonModel {
    Rating: RatingModel
}

export interface RatingModel {
    Rank: number
    Commentary: string
}

export interface CriteriaModel {
    Id: number
    Index: number
    Description: string
    Definition: string
    IsPrimary: boolean
}

export interface OptionModel {
    Id: number
    Name: string
    Description: string
    Diagram: string
}
