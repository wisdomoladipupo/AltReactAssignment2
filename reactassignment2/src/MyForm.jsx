import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolver/zod";

const schema = z
  .object({
    username: z
      .string()
      .trim()
      .min(5, { message: "must contain atleast 5 characters" })
      .regex(/^\S+$/, "no spaces allowed"),
    email: z.string.email({ message: "please enter a valid email" }),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "password does not match",
    path: ["confirmPassword"],
  });
const MyForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  console.log(errors, "errors");

  return (
    <div>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data, "what is data on submit");
        })}
      >
        <label htmlFor="username">UserName :</label>
        <input type="text" {...register("username")} />
        {errors.username && <p>{errors.username.message}</p>}
        <label htmlFor="email">Email:</label>
        <input type="email" {...register("email")} />
        {errors.email && <p>{errors.email.message}</p>}
        <label htmlFor="Password">Password:</label>
        <input type="password" {...register("password")} />
        {errors.password && <p>{errors.password.message}</p>}
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input type="password" {...register("confirmPassword")}/>
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
      </form>
    </div>
  );
};

export default MyForm;
