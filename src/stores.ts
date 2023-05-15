import { writable } from "svelte/store";

import { defaultTeams } from "./types";

export const showWizard = writable(false);

export const teams = writable(defaultTeams);

export const wizardForm = writable();

