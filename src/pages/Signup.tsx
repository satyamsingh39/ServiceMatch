// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { motion } from "framer-motion";
// import { Lock, ArrowRight, CheckCircle2 } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useToast } from "@/hooks/use-toast";
// import signupIllustration from "@/assets/signup-illustration.png";

// const signupSchema = z.object({
//   firstName: z.string().min(2, "First name must be at least 2 characters"),
//   lastName: z.string().min(2, "Last name must be at least 2 characters"),
//   email: z.string().email("Invalid email address"),
//   password: z.string().min(8, "Password must be at least 8 characters"),
//   confirmPassword: z.string(),
//   role: z.enum(["chef-waiter", "hotel-restaurant"]),
// }).refine((data) => data.password === data.confirmPassword, {
//   message: "Passwords don't match",
//   path: ["confirmPassword"],
// });

// type SignupFormData = z.infer<typeof signupSchema>;

// const Signup = () => {
//   const [selectedRole, setSelectedRole] = useState<"chef-waiter" | "hotel-restaurant">("chef-waiter");
//   const { toast } = useToast();
//   const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors, isSubmitting },
//   } = useForm<SignupFormData>({
//     resolver: zodResolver(signupSchema),
//     defaultValues: {
//       role: "chef-waiter",
//     },
//   });

//   const password = watch("password");
//   const confirmPassword = watch("confirmPassword");
//   const passwordsMatch = password && confirmPassword && password === confirmPassword;

//   const onSubmit = async (data: SignupFormData) => {
//     try {
//       // TODO: Implement actual signup logic here
//       console.log("Signup data:", data);
//       toast({
//         title: "Account created successfully!",
//         description: "Welcome to our platform.",
//       });
//       navigate("/");
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to create account. Please try again.",
//         variant: "destructive",
//       });
//     }
//   };

//   return (
//     <div className="min-h-screen flex">
//       {/* Left Side - Illustration */}
//       <motion.div
//         initial={{ opacity: 0, x: -50 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.6 }}
//         className="hidden lg:flex lg:w-1/2 bg-gradient-subtle p-12 flex-col justify-center items-center"
//       >
//         <div className="max-w-lg">
//           <img
//             src={signupIllustration}
//             alt="Digital security and account creation illustration"
//             className="w-full h-auto mb-8 rounded-lg shadow-elegant"
//           />
//           <motion.h2
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3 }}
//             className="text-4xl font-bold mb-4 text-foreground"
//           >
//             Join Today
//           </motion.h2>
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.4 }}
//             className="text-lg text-muted-foreground"
//           >
//             Create your account and connect with a wide network.
//           </motion.p>
//         </div>
//       </motion.div>

//       {/* Right Side - Form */}
//       <motion.div
//         initial={{ opacity: 0, x: 50 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.6 }}
//         className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-background"
//       >
//         <div className="w-full max-w-md space-y-8">
//           <div>
//             <h1 className="text-4xl font-bold text-foreground mb-2">
//               Create your account
//             </h1>
//             <p className="text-muted-foreground">
//               Join to connect with others and explore opportunities.
//             </p>
//           </div>

//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//             {/* Role Selector */}
//             <div>
//               <Label className="text-base mb-3 block">I am a:</Label>
//               <div className="flex gap-3">
//                 <Button
//                   type="button"
//                   variant={selectedRole === "chef-waiter" ? "default" : "outline"}
//                   className="flex-1"
//                   onClick={() => {
//                     setSelectedRole("chef-waiter");
//                   }}
//                 >
//                   Chef/Waiter
//                 </Button>
//                 <Button
//                   type="button"
//                   variant={selectedRole === "hotel-restaurant" ? "default" : "outline"}
//                   className="flex-1"
//                   onClick={() => {
//                     setSelectedRole("hotel-restaurant");
//                   }}
//                 >
//                   Hotel/Restaurant
//                 </Button>
//               </div>
//               <input type="hidden" {...register("role")} value={selectedRole} />
//             </div>

//             {/* Name Fields */}
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <Label htmlFor="firstName">First Name</Label>
//                 <Input
//                   id="firstName"
//                   {...register("firstName")}
//                   placeholder="John"
//                   className="mt-1"
//                 />
//                 {errors.firstName && (
//                   <p className="text-sm text-destructive mt-1">{errors.firstName.message}</p>
//                 )}
//               </div>
//               <div>
//                 <Label htmlFor="lastName">Last Name</Label>
//                 <Input
//                   id="lastName"
//                   {...register("lastName")}
//                   placeholder="Doe"
//                   className="mt-1"
//                 />
//                 {errors.lastName && (
//                   <p className="text-sm text-destructive mt-1">{errors.lastName.message}</p>
//                 )}
//               </div>
//             </div>

//             {/* Email Field */}
//             <div>
//               <Label htmlFor="email">Email</Label>
//               <Input
//                 id="email"
//                 type="email"
//                 {...register("email")}
//                 placeholder="username@email.com"
//                 className="mt-1"
//               />
//               {errors.email && (
//                 <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
//               )}
//             </div>

//             {/* Password Field */}
//             <div>
//               <Label htmlFor="password">Password</Label>
//               <div className="relative mt-1">
//                 <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                 <Input
//                   id="password"
//                   type="password"
//                   {...register("password")}
//                   placeholder="********"
//                   className="pl-10"
//                 />
//               </div>
//               {errors.password && (
//                 <p className="text-sm text-destructive mt-1">{errors.password.message}</p>
//               )}
//             </div>

//             {/* Confirm Password Field */}
//             <div>
//               <Label htmlFor="confirmPassword">Confirm Password</Label>
//               <div className="relative mt-1">
//                 <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                 <Input
//                   id="confirmPassword"
//                   type="password"
//                   {...register("confirmPassword")}
//                   placeholder="********"
//                   className="pl-10"
//                 />
//                 {passwordsMatch && (
//                   <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-green-500" />
//                 )}
//               </div>
//               {errors.confirmPassword && (
//                 <p className="text-sm text-destructive mt-1">{errors.confirmPassword.message}</p>
//               )}
//             </div>

//             {/* Submit Button */}
//             <Button
//               type="submit"
//               disabled={isSubmitting}
//               className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
//               size="lg"
//             >
//               Create Account
//               <ArrowRight className="ml-2 h-5 w-5" />
//             </Button>

//             {/* Login Link */}
//             <p className="text-center text-sm text-muted-foreground">
//               Already have an account?{" "}
//               <Link to="/login" className="text-primary hover:underline font-medium">
//                 Log in
//               </Link>
//             </p>
//           </form>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default Signup;

// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { toast } from "react-hot-toast";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// const Signup = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Basic validation
//     if (!formData.name || !formData.email || !formData.password) {
//       toast.error("Please fill in all fields");
//       return;
//     }

//     try {
//       setLoading(true);

//       // ✅ API Call to Backend
//       const res = await axios.post("http://localhost:5000/api/users/register", {
//         name: formData.name,
//         email: formData.email,
//         password: formData.password,
//       });

//       toast.success(res.data.message || "Signup successful! Please login.");
//       navigate("/login"); // redirect to login page after successful registration
//     } catch (err) {
//       console.error(err);
//       const errorMsg =
//         err.response?.data?.message || "Something went wrong. Try again.";
//       toast.error(errorMsg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 p-4">
//       <motion.div
//         className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8"
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//       >
//         <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
//           Create an Account ✨
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div>
//             <Label htmlFor="name">Full Name</Label>
//             <Input
//               id="name"
//               name="name"
//               type="text"
//               placeholder="Enter your full name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div>
//             <Label htmlFor="email">Email</Label>
//             <Input
//               id="email"
//               name="email"
//               type="email"
//               placeholder="Enter your email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div>
//             <Label htmlFor="password">Password</Label>
//             <Input
//               id="password"
//               name="password"
//               type="password"
//               placeholder="Enter your password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <Button
//             type="submit"
//             className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold"
//             disabled={loading}
//           >
//             {loading ? "Signing up..." : "Sign Up"}
//           </Button>
//         </form>

//         <p className="text-center mt-4 text-sm text-gray-600">
//           Already have an account?{" "}
//           <span
//             className="text-blue-600 cursor-pointer hover:underline"
//             onClick={() => navigate("/login")}
//           >
//             Log in
//           </span>
//         </p>
//       </motion.div>
//     </div>
//   );
// };

// export default Signup;

// add these imports at top
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Lock, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import signupIllustration from "@/assets/signup-illustration.png";
import api from "@/lib/api";


const signupSchema = z
  .object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    role: z.enum(["chef-waiter", "hotel-restaurant"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SignupFormData = z.infer<typeof signupSchema>;

const Signup = () => {
  const [selectedRole, setSelectedRole] = useState<
    "chef-waiter" | "hotel-restaurant"
  >("chef-waiter");

  const { toast } = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: { role: "chef-waiter" },
  });

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");
  const passwordsMatch =
    password && confirmPassword && password === confirmPassword;

  // const onSubmit = async (data: SignupFormData) => {
  //   try {
  //     const { firstName, lastName, email, password, role } = data;

  //     // 1) create firebase user
  //     const cred = await createUserWithEmailAndPassword(auth, email, password);

  //     // 2) send email verification
  //     await sendEmailVerification(cred.user);

  //     toast({
  //       title: "Verify your email",
  //       description: "We sent you a verification link. Please check your inbox."
  //     });

  //     // store user meta for later (on login we will push this to backend)
  //     localStorage.setItem("pendingProfile", JSON.stringify({ firstName, lastName, role }));

  //     navigate("/login");
  //   } catch (error: any) {
  //     toast({
  //       title: "Signup failed",
  //       description: error.message,
  //       variant: "destructive"
  //     });
  //   }
  // };

  const onSubmit = async (data: SignupFormData) => {
    try {
      const { firstName, lastName, email, password, role } = data;

      console.log("📩 Trying to create firebase user:", email);
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      console.log("✅ Firebase signup success:", cred.user.uid);

      // 1. Send verification email
      await sendEmailVerification(cred.user);

      // 2. Sync with Backend immediately
      const backendRole = role === "chef-waiter" ? "jobseeker" : "employer";
      
      await api.post("/auth/sync", {
        name: `${firstName} ${lastName}`,
        role: backendRole,
      });

      toast({
        title: "Account created! 📧",
        description: "Please check your email to verify your account before logging in.",
      });

      // No need to store pendingProfile anymore
      localStorage.removeItem("pendingProfile");

      navigate("/login");
    } catch (error: any) {
      console.error("🔥 SIGNUP ERROR:", error);
      toast({
        title: "Signup failed",
        description: error.response?.data?.message || error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Illustration */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden lg:flex lg:w-1/2 bg-gradient-subtle p-12 flex-col justify-center items-center"
      >
        <div className="max-w-lg">
          <img
            src={signupIllustration}
            alt="Digital security and account creation illustration"
            className="w-full h-auto mb-8 rounded-lg shadow-elegant"
          />
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-bold mb-4 text-foreground"
          >
            Join Today
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-muted-foreground"
          >
            Create your account and connect with a wide network.
          </motion.p>
        </div>
      </motion.div>

      {/* Right Side - Form */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-background"
      >
        <div className="w-full max-w-md space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Create your account
            </h1>
            <p className="text-muted-foreground">
              Join to connect with others and explore opportunities.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Role Selector */}
            <div>
              <Label className="text-base mb-3 block">I am a:</Label>
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant={
                    selectedRole === "chef-waiter" ? "default" : "outline"
                  }
                  className="flex-1"
                  onClick={() => {
                    setSelectedRole("chef-waiter");
                    setValue("role", "chef-waiter");
                  }}
                >
                  Chef/Waiter
                </Button>

                <Button
                  type="button"
                  variant={
                    selectedRole === "hotel-restaurant" ? "default" : "outline"
                  }
                  className="flex-1"
                  onClick={() => {
                    setSelectedRole("hotel-restaurant");
                    setValue("role", "hotel-restaurant");
                  }}
                >
                  Hotel/Restaurant
                </Button>
              </div>
              <input type="hidden" {...register("role")} value={selectedRole} />
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  {...register("firstName")}
                  placeholder="John"
                  className="mt-1"
                />
                {errors.firstName && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  {...register("lastName")}
                  placeholder="Doe"
                  className="mt-1"
                />
                {errors.lastName && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            {/* Email Field */}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder="username@email.com"
                className="mt-1"
              />
              {errors.email && (
                <p className="text-sm text-destructive mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                  placeholder="********"
                  className="pl-10"
                />
              </div>
              {errors.password && (
                <p className="text-sm text-destructive mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type="password"
                  {...register("confirmPassword")}
                  placeholder="********"
                  className="pl-10"
                />
                {passwordsMatch && (
                  <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-green-500" />
                )}
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-destructive mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
              size="lg"
            >
              Create Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            {/* Login Link */}
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary hover:underline font-medium"
              >
                Log in
              </Link>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
