// routes
import { paths } from "@repo/utils/routes/paths";
// components
import { Logo } from "@repo/ui/components/logo";
import LinkTransition from "@repo/ui/components/link/link-transition.tsx";

// ----------------------------------------------------------------------

export function NavMain() {
  return (
    <div className="mr-16 hidden md:flex">
      <div className="mr-12">
        <Logo />
      </div>
      <nav className="flex items-center space-x-6 text-sm font-medium ml-1">
        <LinkTransition
          href={paths.docs.root}
          className="transition-colors hover:text-foreground/80"
        >
          Docs
        </LinkTransition>
        <LinkTransition
          href={paths.product.root}
          className="transition-colors hover:text-foreground/80"
        >
          Products
        </LinkTransition>
      </nav>
    </div>
  );
}
