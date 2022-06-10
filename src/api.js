export const csvURL = import.meta.env.DEV
    ? `http://${window.location.hostname}:3000/bruh.csv`
    : "bruh.csv";