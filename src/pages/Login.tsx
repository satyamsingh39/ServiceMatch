// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { motion } from "framer-motion";
// import { Lock, ArrowRight, Mail } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useToast } from "@/hooks/use-toast";
// import signupIllustration from "@/assets/signup-illustration.png";

// const loginSchema = z.object({
//   email: z.string().email("Invalid email address"),
//   password: z.string().min(1, "Password is required"),
// });

// type LoginFormData = z.infer<typeof loginSchema>;

// const Login = () => {
//   const { toast } = useToast();
//   const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm<LoginFormData>({
//     resolver: zodResolver(loginSchema),
//   });

//   const onSubmit = async (data: LoginFormData) => {
//     try {
//       // TODO: Implement actual login logic here
//       console.log("Login data:", data);
//       toast({
//         title: "Login successful!",
//         description: "Welcome back.",
//       });
//       navigate("/");
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Invalid credentials. Please try again.",
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
//             alt="Digital security and account login illustration"
//             className="w-full h-auto mb-8 rounded-lg shadow-elegant"
//           />
//           <motion.h2
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3 }}
//             className="text-4xl font-bold mb-4 text-foreground"
//           >
//             Welcome Back
//           </motion.h2>
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.4 }}
//             className="text-lg text-muted-foreground"
//           >
//             Log in to access your account and continue your journey.
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
//               Log in to your account
//             </h1>
//             <p className="text-muted-foreground">
//               Enter your credentials to access your account.
//             </p>
//           </div>

//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//             {/* Email Field */}
//             <div>
//               <Label htmlFor="email">Email</Label>
//               <div className="relative mt-1">
//                 <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                 <Input
//                   id="email"
//                   type="email"
//                   {...register("email")}
//                   placeholder="username@email.com"
//                   className="pl-10"
//                 />
//               </div>
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

//             {/* Forgot Password Link */}
//             <div className="text-right">
//               <Link to="#" className="text-sm text-primary hover:underline">
//                 Forgot password?
//               </Link>
//             </div>

//             {/* Submit Button */}
//             <Button
//               type="submit"
//               disabled={isSubmitting}
//               className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
//               size="lg"
//             >
//               Log in
//               <ArrowRight className="ml-2 h-5 w-5" />
//             </Button>

//             {/* Signup Link */}
//             <p className="text-center text-sm text-muted-foreground">
//               Don't have an account?{" "}
//               <Link to="/signup" className="text-primary hover:underline font-medium">
//                 Sign up
//               </Link>
//             </p>
//           </form>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default Login;

// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { toast } from "react-hot-toast";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// const Login = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
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
//     if (!formData.email || !formData.password) {
//       toast.error("Please fill in all fields");
//       return;
//     }

//     try {
//       setLoading(true);

//       // ✅ API Call to Backend
//       const res = await axios.post("http://localhost:5000/api/users/login", {
//         email: formData.email,
//         password: formData.password,
//       });

//       // Success
//       toast.success(res.data.message || "Login successful!");
//       localStorage.setItem("token", res.data.token); // Save JWT token
//       navigate("/dashboard"); // redirect to your main page
//     } catch (err) {
//       console.error(err);
//       const errorMsg =
//         err.response?.data?.message || "Invalid credentials. Try again.";
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
//           Welcome Back 👋
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-5">
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
//             {loading ? "Logging in..." : "Login"}
//           </Button>
//         </form>

//         <p className="text-center mt-4 text-sm text-gray-600">
//           Don’t have an account?{" "}
//           <span
//             className="text-blue-600 cursor-pointer hover:underline"
//             onClick={() => navigate("/signup")}
//           >
//             Sign up
//           </span>
//         </p>
//       </motion.div>
//     </div>
//   );
// };

// export default Login;

// import { auth } from "@/lib/firebase";
// import { signInWithEmailAndPassword } from "firebase/auth";

// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { motion } from "framer-motion";
// import { Lock, ArrowRight, Mail } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useToast } from "@/hooks/use-toast";
// import signupIllustration from "@/assets/signup-illustration.png";
// import axios from "axios";

// const loginSchema = z.object({
//   email: z.string().email("Invalid email address"),
//   password: z.string().min(1, "Password is required"),
// });

// type LoginFormData = z.infer<typeof loginSchema>;

// const Login = () => {
//   const { toast } = useToast();
//   const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm<LoginFormData>({
//     resolver: zodResolver(loginSchema),
//   });

// const onSubmit = async (data: LoginFormData) => {
//   try {
//     const { email, password } = data;

//     // 1) login with firebase
//     const cred = await signInWithEmailAndPassword(auth, email, password);

//     if (!cred.user.emailVerified) {
//       toast({
//         title: "Email not verified",
//         description: "Please check your inbox & verify your email first.",
//         variant: "destructive",
//       });
//       return;
//     }

//     toast({
//       title: "Login successful!",
//       description: "Welcome back.",
//     });

//     // store firebase user token in localStorage
//     const token = await cred.user.getIdToken();
//     localStorage.setItem("token", token);

//     // store simple user object
//     localStorage.setItem("user", JSON.stringify({
//       email: cred.user.email,
//       uid: cred.user.uid
//     }));

//     navigate("/");
//   } catch (error: any) {
//     toast({
//       title: "Login failed",
//       description: error.message || "Invalid credentials.",
//       variant: "destructive",
//     });
//   }
// };


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
//             alt="Digital security and account login illustration"
//             className="w-full h-auto mb-8 rounded-lg shadow-elegant"
//           />
//           <motion.h2
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3 }}
//             className="text-4xl font-bold mb-4 text-foreground"
//           >
//             Welcome Back
//           </motion.h2>
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.4 }}
//             className="text-lg text-muted-foreground"
//           >
//             Log in to access your account and continue your journey.
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
//               Log in to your account
//             </h1>
//             <p className="text-muted-foreground">
//               Enter your credentials to access your account.
//             </p>
//           </div>

//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//             {/* Email Field */}
//             <div>
//               <Label htmlFor="email">Email</Label>
//               <div className="relative mt-1">
//                 <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                 <Input
//                   id="email"
//                   type="email"
//                   {...register("email")}
//                   placeholder="username@email.com"
//                   className="pl-10"
//                 />
//               </div>
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

//             {/* Forgot Password Link */}
//             <div className="text-right">
//               <Link to="#" className="text-sm text-primary hover:underline">
//                 Forgot password?
//               </Link>
//             </div>

//             {/* Submit Button */}
//             <Button
//               type="submit"
//               disabled={isSubmitting}
//               className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
//               size="lg"
//             >
//               Log in
//               <ArrowRight className="ml-2 h-5 w-5" />
//             </Button>

//             {/* Signup Link */}
//             <p className="text-center text-sm text-muted-foreground">
//               Don't have an account?{" "}
//               <Link to="/signup" className="text-primary hover:underline font-medium">
//                 Sign up
//               </Link>
//             </p>
//           </form>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default Login;


import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Lock, ArrowRight, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import signupIllustration from "@/assets/signup-illustration.png";
import axios from "axios";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const { email, password } = data;

      // 1️⃣ Firebase login
      const cred = await signInWithEmailAndPassword(auth, email, password);

      // 2️⃣ Check verification
      if (!cred.user.emailVerified) {
        toast({
          title: "Email not verified",
          description: "Please verify your email before logging in.",
          variant: "destructive",
        });
        return;
      }

      // 3️⃣ Get Firebase ID token
      const token = await cred.user.getIdToken(true);

      // 4️⃣ Save token locally
      localStorage.setItem("token", token);

      // 5️⃣ Retrieve user metadata from signup (if exists)
      const savedProfile = localStorage.getItem("pendingProfile");
      const profileData = savedProfile ? JSON.parse(savedProfile) : null;

      // 6️⃣ Send user data to backend (create/update profile)
      if (profileData) {
        const res = await axios.post(
          "http://localhost:5000/api/users/create-profile",
          {
            firstName: profileData.firstName,
            lastName: profileData.lastName,
            role: profileData.role,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("✅ Profile synced to backend:", res.data);
        localStorage.removeItem("pendingProfile"); // clean up
      } else {
        // if user already has a profile
        console.log("ℹ️ No pending profile; likely returning user");
      }

      toast({
        title: "Login successful 🎉",
        description: "Welcome back to ServiceMatch!",
      });

      // 7️⃣ Redirect to role-based dashboard
      navigate("/"); // You can replace with `/dashboard` or role-based page
    } catch (error: any) {
      console.error("🔥 Login error:", error);
      toast({
        title: "Login failed",
        description: error?.response?.data?.message || error.message,
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
            alt="Digital security and account login illustration"
            className="w-full h-auto mb-8 rounded-lg shadow-elegant"
          />
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-bold mb-4 text-foreground"
          >
            Welcome Back
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-muted-foreground"
          >
            Log in to access your account and continue your journey.
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
              Log in to your account
            </h1>
            <p className="text-muted-foreground">
              Enter your credentials to access your account.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <div>
              <Label htmlFor="email">Email</Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="username@email.com"
                  className="pl-10"
                />
              </div>
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

            {/* Forgot Password Link */}
            <div className="text-right">
              <Link to="#" className="text-sm text-primary hover:underline">
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
              size="lg"
            >
              Log in
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            {/* Signup Link */}
            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-primary hover:underline font-medium"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
