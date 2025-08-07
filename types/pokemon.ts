export interface Pokemon {
    id: number;
    name: string;
    height: number;
    weight: number;
    sprites: {
        front_default: string;
        other: {
            'official-artwork': {
                front_default: string;
            }
        }
    }
    types: {
        slot: number;
        type: {
            name: string;
            url: string;
        }
    }[];
    stats: {
        base_stat: number;
        effort: number;
        stat: {
            name: string;
            url: string;
        }
    }[];
    abilities: {
        ability: {
            name: string;
            url: string;
        };
        is_hidden: boolean;
        slot: number;
    }[];
};

export interface PokemonListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: {
        name: string;
        url: string;
    }[];
}

export interface PokemonQueryParams {
    search?: string;
    type?: string;
    sort?: 'name' | 'id';
    order?: 'asc' | 'desc';
    page?: number;
    limit?: number;
}