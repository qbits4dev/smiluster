import { ROUTER } from "./env";
export const links = [
    { url: ROUTER.HOME, type: "home", name: "Home" },
    { url: ROUTER.APPOINTMENTS, type: "appointments", name: "Appointments" },
    { url: ROUTER.PATIENTS, type: "patients", name: "Patients" },
    { url: ROUTER.STOCK, type: "stock", name: "Stock" },
    { url: ROUTER.INVOICING, type: "invoicing", name: "Billing" },
    { url: ROUTER.SETTINGS, type: "settings", name: "Settings" },
];
