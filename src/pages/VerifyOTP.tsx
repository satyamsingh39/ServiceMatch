import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { motion } from "framer-motion";
import { ShieldCheck, KeyRound, Mail, ArrowRight, RotateCcw } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const theme = "#646cffaa"; // requested accent color

const otpSchema = z.object({
  email: z.string().email("Enter a valid email"),
  otp: z
    .string()
    .min(6, "OTP must be 6 digits")
    .max(6, "OTP must be 6 digits")
    .regex(/^\d{6}$/, "OTP must be numeric"),
});

type OtpFormData = z.infer<typeof otpSchema>;

const VerifyOTP = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation() as any;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<OtpFormData>({ resolver: zodResolver(otpSchema) });

  useEffect(() => {
    const emailFromState = location?.state?.email as string | undefined;
    const emailFromStorage = localStorage.getItem("pendingEmail") || undefined;
    const email = emailFromState || emailFromStorage;
    if (email) setValue("email", email);
  }, [location, setValue]);

  const onSubmit = async (data: OtpFormData) => {
    try {
      await axios.post("http://localhost:5000/api/users/verify-otp", data);

      toast({
        title: "Email verified 🎉",
        description: "Your account has been activated. You can log in now.",
      });

      localStorage.removeItem("pendingEmail");

      navigate("/login");
    } catch (error: any) {
      toast({
        title: "Verification failed",
        description:
          error?.response?.data?.message || "Invalid or expired OTP. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleResend = async () => {
    const email = localStorage.getItem("pendingEmail");

    if (!email) {
      toast({ title: "Error", description: "Email not found!", variant: "destructive" });
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/users/resend-otp", { email });

      toast({
        title: "OTP Sent Again ✅",
        description: "Check your email",
      });
    } catch (error: any) {
      toast({
        title: "Failed",
        description: error?.response?.data?.message || "Unable to resend OTP",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="w-full max-w-md rounded-3xl shadow-2xl bg-card p-8"
        style={{ boxShadow: `0 20px 45px -12px ${theme}` }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div
            className="p-3 rounded-2xl"
            style={{ background: theme }}
            aria-hidden
          >
            <ShieldCheck className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Verify your email</h1>
        </div>

        <p className="text-muted-foreground mb-8">
          We’ve sent a 6-digit code to your email. Enter it below to activate your account.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <Label htmlFor="email">Email</Label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="pl-10"
                {...register("email")}
              />
            </div>
            {errors.email && (
              <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="otp">OTP</Label>
            <div className="relative mt-1">
              <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="otp"
                inputMode="numeric"
                maxLength={6}
                placeholder="______"
                className="pl-10 tracking-widest text-center text-lg"
                {...register("otp")}
              />
            </div>
            {errors.otp && (
              <p className="text-sm text-destructive mt-1">{errors.otp.message}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            size="lg"
            className="w-full font-semibold transition-opacity"
            style={{ background: theme, borderColor: theme }}
          >
            Verify & Continue
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>

          {/* RESEND OTP BUTTON */}
          <button
            type="button"
            onClick={handleResend}
            className="flex justify-center items-center w-full mt-3 text-sm font-medium"
            style={{ color: theme }}
          >
            <RotateCcw className="h-4 w-4 mr-1" /> Resend OTP
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default VerifyOTP;
