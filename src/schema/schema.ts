import { z } from "zod";

export const imageSchema = z.object({
  image: z
    .any()
    .refine((file) => file?.[0]?.type === "image/jpeg", {
      message: "Only JPG files are allowed.",
    })
    .refine((file) => file?.[0]?.size <= 1024 * 1024, {
      message: "Max file size is 1MB.",
    }),
});

export type ImageType = z.infer<typeof imageSchema>;

export const userSchema = z.object({
  name: z.string(),
  role: z.enum(["user", "guide", "lead-guide", "admin"]),
  _id: z.string(),
  email: z.string().email(),
  photo: z.string().optional(),
});

export type userType = z.infer<typeof userSchema>;
