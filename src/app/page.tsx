import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import redirectOnSession from "@/utils/auth/redirectOnSession";
import Link from "next/link";
import { connection } from "next/server";

export default async function Home() {
  await redirectOnSession();
  await connection();

  return (
    <div className="flex h-screen">
      <Card className="m-auto w-full max-w-sm">
        <CardHeader className="flex items-center">
          <CardTitle className="text-2xl">IssueHut ⛺</CardTitle>
        </CardHeader>
        <Link href="/auth/login">
          <CardFooter>
            <Button className="w-full">Iniciar Sesión</Button>
          </CardFooter>
        </Link>
      </Card>
    </div>
  );
}
