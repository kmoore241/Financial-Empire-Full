import React from "react";
import dynamic from "next/dynamic";

type FC = React.FC<{ children: React.ReactNode }>;
const PassThrough: FC = ({ children }) => <>{children}</>;

function wrap(loader: () => Promise<any>) {
  return dynamic(async () => {
    try {
      const m: any = await loader();
      const comp =
        m.default ||
        m.ThemeProvider ||
        m.AppProvider ||
        m.AuthProvider ||
        m.WalletProvider ||
        m.BotProvider ||
        m.QuizProvider ||
        m.NotificationProvider;
      return { default: (comp as FC) || PassThrough };
    } catch {
      return { default: PassThrough };
    }
  }, { ssr: false }) as unknown as FC;
}

// NOTE: literal paths → avoids "Critical dependency: request of a dependency is an expression"
const ThemeProvider        = wrap(() => import("@/components/ui/theme-provider"));
const AppProvider          = wrap(() => import("@/context/AppContext"));
const AuthProvider         = wrap(() => import("@/context/AuthContext"));
const WalletProvider       = wrap(() => import("@/context/WalletContext"));
const BotProvider          = wrap(() => import("@/context/BotContext"));
const QuizProvider         = wrap(() => import("@/context/QuizContext"));
const NotificationProvider = wrap(() => import("@/context/NotificationContext"));

export default function RootProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <AuthProvider>
          <AppProvider>
            <WalletProvider>
              <BotProvider>
                <QuizProvider>{children}</QuizProvider>
              </BotProvider>
            </WalletProvider>
          </AppProvider>
        </AuthProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
}