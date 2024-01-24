import Footer from "@/components/layouts/Footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      Sign in
    </div>
  );
}

export default LoginPage;

/**
 * min sizing - for setting the minimum boundary (shrinking)
 * normal sizing - setting the size default size (overwrites min and max)
 * max sizing - for setting the maximum boundary (growing).
 */
