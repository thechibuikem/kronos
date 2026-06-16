import { useContext } from "react";
import { AppContext } from "@/api/Context";
import OauthBtn from "./OauthBtn";
import ErrorBanner from "../../home/components/ErrorBanner";

export default function AuthCard() {
  const context = useContext(AppContext);
  if (!context) console.log("use of context isn't permitted at Banner");
  const { authErrorMsg } = context;

  return (
    <div className="flex-1 flex items-center justify-center bg-[#0a0a0f] px-8">
      <div className="w-full max-w-sm flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold tracking-tight text-[#e2e8f0]">
            Get started
          </h2>
          <p className="text-sm text-[#64748b]">
            Connect your GitHub to start tracking your Krons.
          </p>
        </div>

        {/* Error */}
        {authErrorMsg && <ErrorBanner />}

        {/* OAuth */}
        <OauthBtn />

        {/* Feature hints */}
        <ul className="flex flex-col gap-3">
          {[
            "Webhook-driven commit tracking",
            "AI-powered risk detection across your Krons",
            "Insights delivered to your inbox",
          ].map((f) => (
            <li
              key={f}
              className="flex items-center gap-3 text-sm text-[#475569]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#06b6d4] shrink-0" />
              {f}
            </li>
          ))}
        </ul>

        {/* Terms */}
        <p className="text-xs text-[#334155] text-center leading-relaxed">
          By continuing, you agree to our{" "}
          <a
            href="#"
            className="underline text-[#475569] hover:text-[#94a3b8] transition-colors"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="#"
            className="underline text-[#475569] hover:text-[#94a3b8] transition-colors"
          >
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
