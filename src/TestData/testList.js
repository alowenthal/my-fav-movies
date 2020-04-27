export const testData = [
    {
        title: "Accepted",
        id: "/title/tt0384793/",
        poster:
            "https://m.media-amazon.com/images/M/MV5BMTkzNzY5OTc3Nl5BMl5BanBnXkFtZTcwNjE4NDQzMQ@@._V1_.jpg",
        actors: [
            {
                disambiguation: "I",
                id: "/name/nm0519043/",
                legacyNameText: "Long, Justin (I)",
                name: "Justin Long",
                billing: 1,
                category: "actor",
                characters: ["Bartleby Gaines"],
                roles: [
                    {
                        character: "Bartleby Gaines",
                        characterId: "/character/ch0015737/"
                    }
                ]
            },
            {
                id: "/name/nm1706767/",
                legacyNameText: "Hill, Jonah",
                name: "Jonah Hill",
                billing: 2,
                category: "actor",
                characters: ["Sherman Schrader"],
                roles: [
                    {
                        character: "Sherman Schrader",
                        characterId: "/character/ch0015736/"
                    }
                ]
            },
            {
                id: "/name/nm0515116/",
                legacyNameText: "Lively, Blake",
                name: "Blake Lively",
                billing: 7,
                category: "actress",
                characters: ["Monica Moreland"],
                roles: [
                    {
                        character: "Monica Moreland",
                        characterId: "/character/ch0214722/"
                    }
                ]
            }
        ]
    },
    {
        title: "Superbad",
        id: "/title/tt0829482/",
        poster:
            "https://m.media-amazon.com/images/M/MV5BMTc0NjIyMjA2OF5BMl5BanBnXkFtZTcwMzIxNDE1MQ@@._V1_.jpg",
        actors: [
            {
                id: "/name/nm0148418/",
                legacyNameText: "Cera, Michael",
                name: "Michael Cera",
                billing: 2,
                category: "actor",
                characters: ["Evan"],
                roles: [
                    { character: "Evan", characterId: "/character/ch0008568/" }
                ]
            },
            {
                id: "/name/nm1706767/",
                legacyNameText: "Hill, Jonah",
                name: "Jonah Hill",
                billing: 1,
                category: "actor",
                characters: ["Seth"],
                roles: [
                    { character: "Seth", characterId: "/character/ch0008566/" }
                ]
            },
            {
                id: "/name/nm2395586/",
                legacyNameText: "Mintz-Plasse, Christopher",
                name: "Christopher Mintz-Plasse",
                billing: 3,
                category: "actor",
                characters: ["Fogell"],
                roles: [
                    {
                        character: "Fogell",
                        characterId: "/character/ch0008569/"
                    }
                ]
            }
        ]
    },
    {
        title: "Anchorman: The Legend of Ron Burgundy",
        id: "/title/tt0357413/",
        poster:
            "https://m.media-amazon.com/images/M/MV5BMTQ2MzYwMzk5Ml5BMl5BanBnXkFtZTcwOTI4NzUyMw@@._V1_.jpg",
        actors: [
            {
                disambiguation: "I",
                id: "/name/nm0002071/",
                legacyNameText: "Ferrell, Will (I)",
                name: "Will Ferrell",
                billing: 1,
                category: "actor",
                characters: ["Ron Burgundy"],
                roles: [
                    {
                        character: "Ron Burgundy",
                        characterId: "/character/ch0007244/"
                    }
                ]
            },
            {
                id: "/name/nm0000775/",
                legacyNameText: "Applegate, Christina",
                name: "Christina Applegate",
                billing: 2,
                category: "actress",
                characters: ["Veronica Corningstone"],
                roles: [
                    {
                        character: "Veronica Corningstone",
                        characterId: "/character/ch0007248/"
                    }
                ]
            },
            {
                id: "/name/nm0136797/",
                legacyNameText: "Carell, Steve",
                name: "Steve Carell",
                billing: 4,
                category: "actor",
                characters: ["Brick Tamland"],
                roles: [
                    {
                        character: "Brick Tamland",
                        characterId: "/character/ch0007241/"
                    }
                ]
            }
        ]
    }
];

export const testActors = {
    "Justin Long": ["/title/tt0384793/"],
    "Jonah Hill": ["/title/tt0384793/", "/title/tt0829482/"],
    "Blake Lively": ["/title/tt0384793/"],
    "Michael Cera": ["/title/tt0829482/"],
    "Christopher Mintz-Plasse": ["/title/tt0829482/"],
    "Will Ferrell": ["/title/tt0357413/"],
    "Christina Applegate": ["/title/tt0357413/"],
    "Steve Carell": ["/title/tt0357413/"]
};
