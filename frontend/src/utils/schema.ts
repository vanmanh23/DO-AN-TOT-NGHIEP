import { z } from "zod";

export const reportSchema = z.object({
  suggestion: z.string().optional(),
  description: z.string().min(1, "Mô tả không được để trống"),
  conclusion: z.string().min(1, "Kết luận không được để trống"),
  nutrirecomend: z.string().optional(),

});

export const patientSchema = z.object({
  name: z.string().min(1, "Họ tên không được để trống"),
  birthdate: z.string().min(1, "Ngày sinh không được để trống"),
  gender: z.enum(["M", "F", "O"]),
  address: z.string().min(1, "Địa chỉ không được để trống"),
  phoneNumber: z.string().regex(/^[0-9]{9,11}$/, "Số điện thoại không hợp lệ"),
});

export const serviceItemSchema = z.object({
  serviceCode: z.string().min(1, "Service code is required"),

  serviceName: z.string().min(1, "Service name is required"),

  unitPrice: z.number().min(0, "Unit price must be >= 0"),

  modalityId: z.string().min(1, "Modality is required"),
});

export const doctorSchema = z.object({
  id: z.string().optional(),

  fullName: z.string().min(3, "Full name must be at least 3 characters"),

  dateOfBirth: z
    .string()
    .min(1, "Date of birth is required")
    .refine((value) => !isNaN(Date.parse(value)), {
      message: "Invalid date format",
    }),

  // gender: z.enum(["Male", "Female", "Other", "Prefer not to say"]),
  gender: z.string().min(1, "Gender is required"),

  phoneNumber: z
    .string()
    .regex(/^(0|\+?\d{1,3})\d{8,11}$/, "Invalid phone number format"),

  email: z.string().email("Invalid email format"),

  address: z.string().min(5, "Address must be at least 5 characters"),

  doctorCode: z.string().optional(),

  specialization: z
    .string()
    .min(2, "Specialization must be at least 2 characters"),

  degree: z.string().min(2, "Degree must be at least 2 characters"),

  yearsOfExperience: z.coerce
    .number()
    .min(0, "Years of experience must be >= 0")
    .max(80, "Years of experience is too large"),

  clinicRoom: z.string().min(1, "Clinic room is required"),

  // status: z.enum(["Active", "On Leave", "Inactive"]),
  status: z.string().min(1, "Status is required"),
});

export const patientEdtSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Patient name is required"),
  birthdate: z.string().min(1, "Birth date is required"),
  gender: z.enum(["M", "F", "O"], "Gender is required"),
  address: z.string().min(1, "Address is required"),
  phoneNumber: z
    .string()
    .min(8, "Phone number must be at least 8 digits")
    .max(15, "Phone number must be at most 15 digits"),
  age: z.number().min(0, "Age must be a positive number").optional(),
});
