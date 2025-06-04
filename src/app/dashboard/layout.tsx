import { ModeToggle } from "@/components/DarkModeButton";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import redirectAuth from "@/utils/auth/redirectAuth";
import { AreaChart, CircleUser, FormInputIcon, Home, Menu } from "lucide-react";
import Link from "next/link";
import { connection } from "next/server";
import { type FC, type PropsWithChildren } from "react";

const NavItem: FC<
  PropsWithChildren<{
    active?: boolean;
    className?: string;
    Icon?: typeof Home;
    isMobile?: boolean;
  }>
> = ({ active, children, className, Icon, isMobile }) => {
  const classes = cn(
    isMobile
      ? "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground"
      : "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all",
    active && "bg-muted",
    className,
  );

  return (
    <div className={classes}>
      {Icon && <Icon className="h-4 w-4" />}
      <span>{children}</span>
    </div>
  );
};

const LinkButton: FC<
  PropsWithChildren<{
    active?: boolean;
    href: string;
    Icon?: typeof Home;
    isMobile?: boolean;
  }>
> = ({ active, children, href, Icon, isMobile }) => {
  const classes = cn(isMobile ? "hover:text-foreground" : "hover:text-primary");
  return (
    <Link href={href}>
      <NavItem
        active={active}
        className={classes}
        Icon={Icon}
        isMobile={isMobile}
      >
        {children}
      </NavItem>
    </Link>
  );
};

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await connection();
  await redirectAuth();

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[200px_1fr] lg:grid-cols-[220px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link className="flex items-center gap-2 font-semibold" href="/">
              <span className="">IssueHut ⛺</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <LinkButton href="/dashboard" Icon={Home}>
                Projects
              </LinkButton>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                className="shrink-0 md:hidden"
                size="icon"
                variant="outline"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col" side="left">
              <nav className="grid gap-2 text-lg font-medium">
                <LinkButton href="/dashboard" Icon={Home} isMobile>
                  Projects
                </LinkButton>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1"></div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="rounded-full" size="icon" variant="secondary">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Open user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Profile</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href="/dashboard/perfil/cambiar-contrasena">
                <DropdownMenuItem>Change Password</DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <Link href="/auth/signout">
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
          <ModeToggle />
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
