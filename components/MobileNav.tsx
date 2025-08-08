'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { sidebarLinks } from '@/constants';
import { cn } from '@/lib/utils';

const MobileNav = () => {
  const pathname = usePathname();

  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
        {/* Hamburger Icon */}
        <SheetTrigger asChild>
          <button>
            <Image
              src="/icons/hamburger.svg"
              width={36}
              height={36}
              alt="hamburger icon"
              className="cursor-pointer sm:hidden"
            />
          </button>
        </SheetTrigger>

        {/* Sidebar Content */}
        <SheetContent side="left" className="border-none bg-dark-1">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/icons/logo.svg"
              width={32}
              height={32}
              alt="yoom logo"
              priority
            />
            <p className="text-[26px] font-extrabold text-white">YOOM</p>
          </Link>

          {/* Sidebar Links */}
          <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
            <section className="flex h-full flex-col gap-6 pt-16 text-white">
              {sidebarLinks.map((item) => {
                const isActive = pathname === item.route;

                return (
                  <SheetClose asChild key={item.route}>
                    <Link
                      href={item.route}
                      className={cn(
                        'flex gap-4 items-center p-4 rounded-lg w-full max-w-60',
                        {
                          'bg-blue-1': isActive,
                        }
                      )}
                    >
                      <Image
                        src={item.imgURL}
                        alt={item.label}
                        width={20}
                        height={20}
                      />
                      <p className="font-semibold">{item.label}</p>
                    </Link>
                  </SheetClose>
                );
              })}
            </section>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
