export const modulesRouting = [
    {
        icon: 'home',
        name: 'inicio',
        route: 'home',
        isAdmin: false,
    },
    {
        icon: 'sim_card',
        name: 'Recargas',
        route: 'recharges',
        isAdmin: false,
    },
    {
        icon: 'receipt_long',
        name: 'Servicios',
        route: 'services',
        isAdmin: false,
    },
    {
        icon: 'shop',
        name: 'Pines',
        route: 'pins',
        isAdmin: false,
    },
    {
        icon: 'person',
        name : 'Usuarios',
        route: 'users',
        isAdmin: true,
    },
    {
        icon: 'storefront',
        name: 'Sucursales',
        route: 'branches',
        isAdmin: true,
    }
]