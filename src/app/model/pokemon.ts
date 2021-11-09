export class Pokemon {
    id?: number;
    name: string;
    image: string;
    type: string;
    hp: number;
    attack: number;
    defense: number;
    idAuthor: number;
    created_at?: Date;
    updated_at?: Date;

    constructor() {
        this.name = '';
        this.image = '';
        this.type = '';
        this.hp = 0;
        this.attack = 0;
        this.defense = 0;
        this.idAuthor = 1;
    }
}

export class ResultAdd {
    isNew: boolean;
    pokemon: Pokemon;

    constructor() {
        this.isNew = true;
        this.pokemon = new Pokemon();
    }
}
