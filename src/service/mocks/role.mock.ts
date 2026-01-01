export interface RoleMock {
    id: string;
    label: string;
    category: string;
    synonyms: string[];
    status: 'ACTIVE' | 'PENDING_APPROVAL';
}

export const ROLE_MOCK: RoleMock[] = [
    {
        id: 'health.psychologist',
        label: 'Fonoaudiologia',
        category: 'health',
        synonyms: ['Fono', 'fonoudiologo', 'fonoudiologa'],
        status: 'ACTIVE',
    },
    {
        id: 'health.psychologist',
        label: 'Psicólogo',
        category: 'health',
        synonyms: ['sicologo', 'psicólogo', 'psicologia'],
        status: 'ACTIVE',
    },
    {
        id: 'health.psychopedagogue',
        label: 'Psicopedagogo',
        category: 'health',
        synonyms: [],
        status: 'ACTIVE',
    },
    {
        id: 'it.data_analyst',
        label: 'Data Analyst',
        category: 'it',
        synonyms: ['analista de datos'],
        status: 'ACTIVE',
    },
];
