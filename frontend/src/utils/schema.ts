import { z } from "zod";

export const reportSchema = z.object({
  suggestion: z.string().optional(), 
  description: z.string().min(1, "Mô tả không được để trống"), 
  conclusion: z.string().min(1, "Kết luận không được để trống"), 
});