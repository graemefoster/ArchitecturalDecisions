export interface WithId {
    Id: number
}

export interface DecisionModel{
    Id: string
    DisplayName: string
    ProblemStatement: string
    SolutionCriteria: CriteriaModel[]
    Options: OptionModel[]
    Comparison: Record<number, Record<number, ComparisonModel>>
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
    OptionId: number //unused now.
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
    DiagramFile: string | null
}
