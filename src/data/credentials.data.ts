import { TCredentials } from "../types/credentials.type";

export const USER_CREDENTIALS: Record<string, TCredentials> = {
    // Credentials available on the target site's login page
    standardUser: {
        username: "standard_user",
        password: "secret_sauce"
    },
    lockedOutUser: {
        username: "locked_out_user",
        password: "secret_sauce"
    },
    problemUser: {
        username: "problem_user",
        password: "secret_sauce"
    },
    visualUser: {
        username: "visual_user",
        password: "secret_sauce"
    }
}
