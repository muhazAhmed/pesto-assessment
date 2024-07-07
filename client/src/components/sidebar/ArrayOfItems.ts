export const sidebarItems = [
    { label: "Dashboard", icon: "fa-solid fa-house", path: "/" },
    { label: "About", icon: "fa-solid fa-circle-question", path: "/about" },
    { label: "Contact", icon: "fa-solid fa-phone", path: "/contact" },
    { label: "Settings", icon: "fa-solid fa-gear", path: "/settings" },
]

export const pathToIndex: { [key: string]: number } = {
    "/": 0,
    "/about": 1,
    "/contact": 2,
    "/settings": 3,
};