import z from "zod";

export const loginSchema = z.object({
    username: z.string().min(3, {
        message: "Username is required",
    }),
    password: z.string().min(10, {
        message: "Password is required."
    })
});

export const registerSchema = z.object({
    username: z.string().min(3, {
        message: "Username is required"
    }),
    fullName: z.string().min(3, {
        message: "Full name is required"
    }),
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(10, {
        message: "Minimum of 10 characters is required"
    })
});

