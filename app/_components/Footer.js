import Link from "next/link";

function Footer() {
  const newDate = new Date();
  const year = newDate.getFullYear();

  return (
    <footer className="flex min-h-[6vh] flex-col items-center bg-zinc-900 py-3 pt-10 text-center text-white sm:flex-row sm:justify-center sm:py-3">
      <div className="mb-8 mt-8">
        <section className="flex items-center text-xs sm:text-sm">
          Find an issue with this page?{" "}
          <span className="pl-1 text-blue-500">
            <Link href="https://github.com/HarshS509/WanderStay">
              Fix it on GitHub
            </Link>
          </span>
          <span>
            <Link href="https://github.com/HarshS509/WanderStay">
              <img src={"/github-icon.svg"} className="h-7 w-10" />
            </Link>
          </span>
        </section>

        <section className="mt-4 flex items-center pl-16 text-xs">
          <span className="mr-2">&copy;</span>
          {year} All Rights Reserved
        </section>
      </div>
    </footer>
  );
}

export default Footer;
