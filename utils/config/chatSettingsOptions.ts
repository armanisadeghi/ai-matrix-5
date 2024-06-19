export interface aiPreferencesMainOptions {
    value: string
    label: string
}

export const aiPreferencesMainOptions = [
    {
        value: 'direct_chat',
        label: 'Direct AI chat'
    },
    {
        value: 'ask_questions',
        label: 'Ask me Some Questions'
    },
    {
        value: 'give_options',
        label: 'Give Me a Few Options'
    },
    {
        value: 'fill_form',
        label: 'I wll Fill Out a Form'
    }
]

export interface aiPreferencesSecondOptions {
    value: string
    label: string
}

export const aiPreferencesSecondOptions = [
    {
        value: 'one_ai_chat',
        label: 'Chat With One AI'
    },
    {
        value: 'two_side_by_side',
        label: 'Two AIs Side by Side'
    },
    {
        value: 'get_a_team',
        label: 'Lets Get a Team'
    },
    {
        value: 'show_what_you_can_do',
        label: 'Show Me What You Can Do'
    },
    {
        value: 'infinity_matrix',
        label: 'Unleash Infinity Matrix!'
    }
]
