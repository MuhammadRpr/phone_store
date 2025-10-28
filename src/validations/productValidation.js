import z from "zod";

export const createProductSchema = z.object({
    user_id: z
        .number({
            required_error: "user_id wajib diisi",
            invalid_type_error: "user_id harus berupa angka",
        }),
    name: z.string().min(3, "name minimal 3 karakter"),
    description: z.string().min(10, "description minimal 10 karakter"),
    price: z
        .number({
            required_error: "price wajib diisi",
            invalid_type_error: "price harus berupa angka",
        })
        .positive("price harus lebih dari 0"),
    stock: z
        .number({
            required_error: "stock wajib diisi",
            invalid_type_error: "stock harus berupa angka",
        })
        .int("stock harus berupa bilangan bulat")
        .min(0, "stock minimal 0"),
});

export const updateProductSchema = z.object({
    user_id: z.number({ invalid_type_error: "user_id harus berupa angka" }).optional(),
    name: z.string().min(3, "name minimal 3 karakter").optional(),
    description: z.string().min(10, "description minimal 10 karakter").optional(),
    price: z
        .number({ invalid_type_error: "price harus berupa angka" })
        .positive("price harus lebih dari 0")
        .optional(),
    stock: z
        .number({ invalid_type_error: "stock harus berupa angka" })
        .int("stock harus berupa bilangan bulat")
        .min(0, "stock minimal 0")
        .optional(),
});
